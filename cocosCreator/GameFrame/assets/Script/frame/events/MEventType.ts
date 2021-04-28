/**
 * 系统事件
 * @ahthor hayden
 */
 export class CoreEventType 
 {
    public static ENTER_FRAME:string = "enterFrame";
 }
 
 /**
 * 网络
 */
 export class NetEventType
{
	/** 开始连接 */
	public static SOCKET_CONNECT:string = "socketconnect";
	/** 连接成功 */
	public static SOCKET_OPEN:string = "socketOpen";
	/**
	 * 服务器断开连接
	 */
	public static SERVER_DISCONNECT:string = "serverDisconnect";
	/**
	 * 断线重连成功
	 */
	public static RECONNECT_SUCCESSED:string = "reconnectSuccessed";
}