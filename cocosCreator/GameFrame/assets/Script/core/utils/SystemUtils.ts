/**
* 系统工具类
* @author hayden
*/
export default class SystemUtils
{
	/**
	 * 获取子节点
	 * @param root 根节点 
	 * @param path 子节点路径
	 * @example let child = SystemTools.getChild(node, "child1/child2");
	 */
	public static getChild(root:cc.Node, path:string):cc.Node
	{
		let parent = root;
		let child = null;
		let childs = path.split("/");
		for (let node of childs)
		{
			child = parent.getChildByName(node);
			parent = child;
		}
		return child;
	}

	/**
	 * 计算Table的长度
	 * @param table 
	 */
	public static calculationTableLength(table: any): number 
	{
		let length: number = 0;
		for (const key in table) 
		{
			length++
		}
		return length;
	}

	/**
	 * 保存本地数据
	 * @param key 需要保存数据的key
	 * @param data 需要保存数据的值
	 */
	public static saveLocalData(key:string,data:string):void
	{
		cc.sys.localStorage.setItem(key,data);
	}
	/**
	 * 获取本地数据
	 * @param key 获取本地数据的key
	 */
	public static getLocalData(key:string):string
	{
		let data = cc.sys.localStorage.getItem(key);
		if(data == "") data = null;
		return data;
	}
	/**
	 * 删除本地数据
	 * @param key 删除本地数据的key
	 */
	public static removeLocalData(key:string):void
	{
		cc.sys.localStorage.removeItem(key);
	}

	/**
	 * 打印结构体
	 * @param str 打印结构体数据
	 * @param data 
	 */
	public static logObject(str:string,data:any):void
    {
        let value:any = null;
        for (const key in data) 
        {
            value = data[key];
            if(typeof value == "object")
            {
                this.logObject(key,value);
            }
            else
            {
                SystemUtils.log(`${str}:${key}--->${value}`);
            }
        }
	}
    
	/*
	* 打印 JavaScript 函数调用堆栈	
	*/
	public static printCallStack() 
    {
		var i = 0;
		var fun = arguments.callee;
		do 
        {
            fun = fun.arguments.callee.caller;
            SystemUtils.log(`${++i}: ${fun}`);
		} while (fun);
	}

    /**
     * 是否IPhoneX
     * @returns 
     */
	public static isIPhoneX():boolean
    {
		var u = navigator.userAgent;
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isIOS) 
        {        
			if (screen.height == 812 && screen.width == 375)
            {
				return true ;
			}
            else
            {
				return false ;
			} 
		}
	}

    /**
     * 对象格式化
     * @param obj 
     * @returns 
     */
    public static postDataFormat(obj) 
    {
        var arr = new Array();
        var i = 0;
        for (var attr in obj) 
        {
            arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
            i++;
        }
        return arr.join("&");
    }

	public static log(str?: any, ...optionalParams: any[]):void
	{
		console.log(str, ...optionalParams);
		// if(!GameCommon.instance.connectingServer && cc.sys.platform == cc.sys.WECHAT_GAME) StatisticsManager.instance.reportLog(str);
		// StatisticsManager.instance.reportLog(str);
	}

	public static error(str?: any, ...optionalParams: any[]):void
	{
		// LogPanel.error(str);
		console.error(str, ...optionalParams);
		//GameFacade.instance.dispatchEventWith(AldEventType.ERROR,str);
		// if(cc.sys.platform == cc.sys.WECHAT_GAME) StatisticsManager.instance.reportError(str);
		// StatisticsManager.instance.reportError(str);
	}
}