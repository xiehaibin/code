/**
 * 计时器管理
 * @author hayden
 */
export default class TimerManage
{
	private static _instanse:TimerManage = null;

	private callBackDatas:Array<CallBackData> = [];
	private isRunning:boolean = false;

	public static get Instance():TimerManage
	{
		if(!TimerManage._instanse) TimerManage._instanse = new TimerManage();
		return TimerManage._instanse;
	}

	private start():void
	{
		this.isRunning = true;
	}

	private stop():void
	{
		this.isRunning = false;
	}

	/**
	 * 延迟回调
	 * @param time 延迟时间
	 * @param callBack 回调函数
	 * @param self 自己
	 * @param times 回调次数,-1为无限次,默认为-1
	 * @param data 回调数据
	 */
	public addDelayCallBack(time:number, callBack:(data?:any)=>void | null, self:any, times:number = -1, data:any = null):void
	{
		this.addDelayCallBack1(time, times, callBack, self, false, data);
	}

	/**
	 * 延迟到下一帧回调
	 * @param callBack  回调函数
	 * @param self 
	 * @param data      回调参数
	 */
	public addDelayCallBackNexFrame(callBack:(data?:any)=>void | null, self:any, data :any= null):void
	{
		this.addDelayCallBack1(0, 1, callBack, self, true, data);
	}

	/**
	 * 延迟回调
	 * @param time          延迟时间
	 * @param times         回调次数,-1为无限循环
	 * @param callBack      回调函数
	 * @param self 
	 * @param isNextFrame 
	 * @param data          回调参数
	 * @returns 
	 */
	private addDelayCallBack1(time:number, times:number, callBack:(data?:any)=>void | null, self:any, isNextFrame:boolean, data:any = null):void
	{
		if (0 == time && !isNextFrame)
		{
			try 
			{
				if (callBack != null) callBack.apply(self, [data]);
			} 
			catch (error) 
			{
				cc.error(error);
			}
			
			return;
		}
		
		let cbd:CallBackData = this.getCallBack(callBack, self);
		if(!cbd)
		{
			cbd = new CallBackData();
			this.callBackDatas.push(cbd);
		}
		cbd.frequence = time;
		cbd.data = data;
		cbd.nowTime = 0;
		cbd.times = times == 0 ? 1 : times;
		cbd.isNextFrame = isNextFrame;
		cbd.self = self;
		cbd.cb = callBack;
		
		if(!this.isRunning) this.start();
	}

	/**
	 * 移除延迟回调
	 */
	public removeDelayCallBack(callBack:(data?:any)=>void, self:any):void
	{
		for (let i = 0; i < this.callBackDatas.length; i++) 
		{
			const cbd = this.callBackDatas[i];
			if(cbd.cb === callBack && cbd.self === self) 
			{
				this.callBackDatas.splice(i,1);
				return;
			}
		}
	}
	/** 
	 * 移除对象的所有回调
	*/
	public removeDelayCallbackByTarget(self:any)
	{
		for (let i = this.callBackDatas.length - 1; i >=0; i--)   //for循环删除多个元素，从后面开始
		{
			const cbd = this.callBackDatas[i];
			if(cbd.self === self) 
			{
				this.callBackDatas.splice(i,1);
			}
		}
	}

	/**
	 * 移除所有回调
	 */
	public removeAllCallBacks():void
	{
		this.callBackDatas = [];
	}

	/**
	 * 游戏update
	 * @param dt 
	 * @returns 
	 */
	public loop(dt:number):void
	{
		if (0 == this.callBackDatas.length)
		{
			this.stop();
			return;
		}

		let cbs = this.callBackDatas;
		this.callBackDatas = [];
		for (let i = 0; i < cbs.length; i++) 
		{
			const cbd = cbs[i];
			if(!cbd) continue;
			if (cbd.isNextFrame) 
			{
				cbd.isNextFrame = false;
				cbd.cb.apply(cbd.self, [cbd.data]);
				continue;
			}
			
			cbd.nowTime += dt;
			if(cbd.nowTime >= cbd.frequence)
			{
				cbd.nowTime = 0;
				if(cbd.times != -1) cbd.times--;
				if(cbd.times > 0 || cbd.times == -1) this.callBackDatas.push(cbd);
				cbd.cb.apply(cbd.self, [cbd.data]);
			}
			else
			{
				this.callBackDatas.push(cbd);
			}
		}
	}

	public clear():void
	{
		this.callBackDatas = [];
		this.isRunning = false;
	}

	private getCallBack(callBack:(data?:any)=>void, self:any):CallBackData
	{
		for (const cbd of this.callBackDatas) 
		{
			if(cbd.cb === callBack && cbd.self === self) return cbd;
		}

		return null;
	}
}

class CallBackData
{
	/**
	 * 频率
	 */
	public frequence:number;
	/**
	 * 回调数据
	 */
	public data:any;
	/**
	 * 现在的时间
	 */
	public nowTime:number;
	/**
	 * 总共的回调的次数 , -1为无限次
	 */
	public times:number;
	/**
	 * 是否是下一帧回调
	 */
	public isNextFrame:boolean;

	public self:any;
	/**
	 * 回调函数
	 */
	public cb:Function;
}