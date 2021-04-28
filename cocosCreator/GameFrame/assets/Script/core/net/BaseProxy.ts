import GameSocket from "./GameSocket";

/**
 * 消息代理基类
 * @author hayden
 */
export default class BaseProxy
{
    /**
	 * 发送消息
	 * @param msgType 消息类型
	 * @param buffer 消息数据
	 * @param cb 消息回调
	 * @param self 发消息类
	 * @param debugLog 是否打印log
	 */
	protected sendMessage(msgType:number, buffer:object = null):void
	{
		GameSocket.Instance.sendMessage(msgType, buffer);
	}

	/**
	 * 注册消息
	 * @param msgType 消息类型
	 * @param cb 消息回调函数
	 * @param self 自身
	 * @param debugLog 是否打印log 
	 */
	protected registMessage(msgType:number, cb:(buffer:any)=>void, self:any = null, debugLog:boolean = true):void
	{
		GameSocket.Instance.registMessage(msgType, cb, self, debugLog);
	}

	/**
	 * 移除消息
	 * @param msgType 消息类型
	 * @param cb 消息回调函数
	 */
	protected removeMessage(msgType:number):void
	{
		GameSocket.Instance.removeMessage(msgType);
	}
}
