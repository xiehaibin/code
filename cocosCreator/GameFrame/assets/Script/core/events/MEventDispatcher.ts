import MEvent from "./MEvent";

class EventObject 
{
	public type:string;
	public data:any;
	public cb:Function;
}

class EventCBObject 
{
	/**
	 * 优先级
	 */
	public pripority:number;
	/**
	 * 回调函数
	 */
	public callBack:Function;
	public isClear:boolean;
	public self:any;
	constructor(self:any, cb:Function, pripority:number) 
	{
		this.self = self;
		this.callBack = cb;
		this.pripority = pripority;
		this.isClear = false;
	}
}

/**
 * 事件派送
 * @author hayden
 */
export default class MEventDispatcher
{
	private eventCallBacks:object;
	private events:Array<MEvent>;
	private lateEvents:Array<EventObject[]>;
	/**
	 * 当前延迟事件派发的索引标志，主要用于区分事件是当前帧添加的还是上一帧添加的，
     * 如果是上一帧添加的事件，则这一帧就要派发出去，否则等到下一帧才派发。
	 */
	private currentIndex:number = 1;

	private static _Instance:MEventDispatcher = null;
	public static get Instance():MEventDispatcher
	{
		if (!MEventDispatcher._Instance) MEventDispatcher._Instance = new MEventDispatcher()
		return this._Instance;
	}

	private constructor() 
	{
		this.eventCallBacks = {};
		this.events = new Array<MEvent>();
		this.lateEvents = new Array<EventObject[]>();
		this.lateEvents[1] = [];
		this.lateEvents[2] = [];
	}

	/**
	 * 监听事件
	 * @param type 事件类型
	 * @param callBack 监听回调
	 * @param priority 监听优先级 数字越大,优先级越高
	 */
	public addEventListener(type:string, callBack:(event:MEvent)=>void, self:any, priority:number = 0):void
	{
		if(this.hasEventListener(type, callBack, self)) return;
		
		let list:Array<EventCBObject> = null;
		if(!this.hasEventListener(type))
		{
			list = new Array<EventCBObject>();
			this.eventCallBacks[type] = list;
		}
		else
		{
			list = this.eventCallBacks[type];
		}

		list.push(new EventCBObject(self, callBack, priority));
		this.sortEventObjes(list);
	}

	/**
	 * 移除事件
	 * @param type 
	 * @param callBack 
	 * @param self 
	 * @returns 
	 */
	public removeEventListener(type:string, callBack:(event:MEvent)=>void, self:any):void
	{
		if(!this.hasEventListener(type, callBack, self)) return;

		let list:EventCBObject[] = this.eventCallBacks[type];
		for (let i = 0; i < list.length; i++) 
		{
			const element = list[i];
			if(element.callBack === callBack && element.self === self)
			{
				element.isClear = true;
				list.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * 移除所有事件
	 */
	public removeAllEventListeners():void
	{
		this.eventCallBacks = {};
		this.events = [];
	}

	/**
	 * 根据事件类型移除此类型所有事件
	 * @param type 事件类型
	 * @returns 
	 */
	public removeEventListeners(type:string):void
	{
		if(!this.hasEventListener(type)) return;
		delete this.eventCallBacks[type];
	}

	/**
	 * 派发事件
	 * @param type      事件类型
	 * @param data      数据
	 * @param callBack  回调方法
	 * @param self      接受对象
	 * @returns 
	 */
	public dispatchEventWith(type:string, data:any = null, callBack:Function = null, self:any = null):void
	{
		if(!this.eventCallBacks[type]) return;
		let e = this.getEvent();
		e.target = this;
		e.type = type;
		e.data = data;
		e.self = self;
		e.callBack = callBack;

		let list:Array<EventCBObject> = [];
		list = list.concat(this.eventCallBacks[type]);

		for (let i = 0; i < list.length; i++) 
		{
			const item = list[i];
			if(item.isClear) continue;
			item.callBack.apply(item.self,[e]);
		}
		e.clear();
		this.events.push(e);
	}

	// public dispatchEventNextFrameWith(type:string, data:any = null, cb:Function = null):void
	// {
	// 	var eo = new EventObject();
	// 	eo.type = type;
	// 	eo.data = data;
	// 	eo.cb = cb;
	// 	this.lateEvents[this.currentIndex].push(eo);
	// }

	// public update():void
	// {
	// 	var objs = this.lateEvents[this.currentIndex];
	// 	for (const item of objs) 
	// 	{
	// 		this.dispatchEventWith(item.type,item.data,item.cb);
	// 	}
	// 	this.lateEvents[this.currentIndex] = [];
	// 	this.currentIndex = this.currentIndex == 1 ? 2 : 1;
	// }

	public hasEventListener(type:string, callBack?:(event:MEvent)=>void,self?:any):boolean
	{
		if(!this.eventCallBacks[type]) return false;
		if(!callBack)
		{
			return true;
		}
		else
		{
			let list = this.eventCallBacks[type];
			for (const item of list) 
			{
				if(item.callBack === callBack && item.self === self) return true;
			}
		}
		return false;
	}

	/**
	 * 根据事件优先级排序
	 * @param list 
	 */
	 private sortEventObjes(list:Array<EventCBObject>):void
	 {
		 list.sort((a,b):number=>{
			 if(a.pripority <= b.pripority) return 1;
			 return -1;
		 })
	 }

	private getEvent():MEvent
	{
		if (this.events.length == 0) return new MEvent();
		else return this.events.pop();
	}

	public clear():void
	{
		this.eventCallBacks = null;
		this.events.length = 0;
		this.events = null;
	}
}