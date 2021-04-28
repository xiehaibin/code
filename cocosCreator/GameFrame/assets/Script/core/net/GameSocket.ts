import GlobalData from "../../frame/common/GlobalData";
import { NetEventType } from "../../frame/events/MEventType";
import MEventDispatcher from "../events/MEventDispatcher";
import MultiLanguageManager from "../manage/MultiLanguageManager";
import TimerManage from "../manage/TimerManage";
import MessageBox, { MessageBoxOption } from "../ui/MessageBox";
import SystemUtils from "../utils/SystemUtils";
import { Sys } from "./MessageType";

/**
 * 游戏通讯类
 * @author hayden
 */
/** 数据包头大小 */
const HEADER_BLOCK_SIZE:number = 4;
export default class GameSocket
{
    private _isInit: boolean = false;
    private _isContting: boolean = false; 
    public get isContting(): boolean 
    {
        return this._isContting;
    }

    public _socket: WebSocket; 
    private _messageObjs:any = null;
    private _seriesNum:number = 0;
    private _closeCb:object;
    private _openCb:object;
    private reconnectCount:number = 0;
    private reconnectTimes:number = 0;
    private _onKick:boolean = false;

    private static _Instance:GameSocket = null;
	public static get Instance():GameSocket
	{
		if (!GameSocket._Instance) GameSocket._Instance = new GameSocket()
		return this._Instance;
	}
	// 构造函数
	private constructor() 
	{
        this._messageObjs = {};
	}

	public connect(cb:Function, self:any): void
    {
        // 已经初始化了
        if (this._isInit == true) return;
        this._isContting = false;
        this._onKick = false;

        let ssl = "ws://";
        if(GlobalData.port == 443) ssl = "wss://";
        let host = `${ssl}${GlobalData.host}:${GlobalData.port}`;
        if(cb) this._openCb = {cb, self};
        SystemUtils.log(`Start to connect:${host}`);

        // 初始化 webSocket
        this._socket = new WebSocket(host);
        // this._socket.binaryType = 'arraybuffer'; // 表示用二进制流而不是文本（ 默认文本 ）
        this._socket.onopen    = this.onOpenSocket.bind(this);
        this._socket.onmessage = this.onMessage.bind(this);
        this._socket.onerror   = this.onError.bind(this);
        this._socket.onclose   = this.onClose.bind(this);
        this._isInit = true;
	}

    /**
     * 心跳包发送
     */
    public startHardPackage():void
    {
        this.onSendHardTick();
        TimerManage.Instance.addDelayCallBack(8, this.onSendHardTick, this);
    }
    private onSendHardTick():void
    {
        this.sendMessage(Sys.HEART_BEAT, null);
    }

    /**
     * 断开
     * @param cb 
     * @param self 
     */
    public disconnect(cb:Function, self:any):void
    {
        SystemUtils.log("正在断开服务器...");
        this._closeCb = {cb, self};
        this.closeSocket("需要重新连接其它服务器");
    }

    /**
     * 重新连接
     * @param cb 
     * @param self 
     * @returns 
     */
    public reconnect(cb:Function, self:any)
    {
        SystemUtils.log(`准备重新连接`);
        if(this._isInit) return;
        this.connect(cb, self);
    }

    /**
     * 发送数据
     * @param msgType 消息类型
     * @param buffer  数据
     */
    public sendMessage(msgType:number, buffer:any = null):void
    {
        if(!this._isContting) 
        {
            console.warn("socket has closed.can not send message to server.");
            return;
        }

        let msg = {
            type: msgType,
            protocol: buffer == null ? "{}" : buffer
        }
        let jsonTmp = JSON.stringify(msg) + "|";
        if(true) SystemUtils.log(`${new Date().toLocaleTimeString()}--发送消息:${jsonTmp}`);
        this._socket.send(jsonTmp);
    }
    /**
     * 发送数据
     * @param id 
     * @param buffer 
     */
    public sendMessage2(id:number, buffer:Uint8Array):void
    {
        let index:number = 0;
        let len:number = buffer.length;
        let dataView:DataView = new DataView(new ArrayBuffer(len+HEADER_BLOCK_SIZE));
        dataView.setUint16(index, len); index += 2;   // 包长
        dataView.setUint16(index, id);  index += 2;   // 协议号
        for (let i = 0; i < len; i++)                 // 内容
        {
            dataView.setUint8(index, buffer[i]); index++;
        }

        this._socket.send(dataView.buffer);
    }

    /**
     * 注册消息
     * @param msgType 
     * @param cb 
     * @param self 
     * @param debugLog 
     * @returns 
     */
    public registMessage(msgType:number, cb:(buffer:any)=>void, self:any = null, debugLog:boolean = true):void
    {
        if(this._messageObjs.hasOwnProperty(msgType))
        {
            SystemUtils.error(`重复注册消息 type = ${msgType}`);
            return;
        }

        var msgData = new MessageSendData(msgType, 0, cb, self, debugLog);
        this._messageObjs[msgType] = [msgData];
    }
    /**
     * 移除消息
     * @param msgType 
     */
    public removeMessage(msgType:number):void
    {
        if(this._messageObjs.hasOwnProperty(msgType))
        {
            delete this._messageObjs[msgType];
        }
    }

    /**
     * 打开Socket
     * @param event 
     */
	private onOpenSocket(event: Event): void
    {
        this.reconnectTimes = 0;
        this._isContting = true;
        SystemUtils.log("WebSocket was opened.");
        if(this._openCb)
        {
            let cb:Function = this._openCb["cb"];
            let self:any = this._openCb["cbSelf"];
            this._openCb = null;
            cb.apply(self);
        }
        MEventDispatcher.Instance.dispatchEventWith(NetEventType.SOCKET_OPEN);
    }
    
    private onMessage(event: any): void
    {
        let data = JSON.parse(event.data);
        if (data == null) 
        {
            SystemUtils.error("recive message data has not found!!");
            return;
        }

        let protocol = JSON.parse(data.protocol);
        if(!this._messageObjs.hasOwnProperty(data.type))
        {
            console.warn(`该消息没有注册;message id:${data.type}`);
            return;
        }

        let msgDatas:MessageSendData[] = this._messageObjs[data.type];
        let msgData:MessageSendData = null;
        msgData = msgDatas[0];
        if(cc.sys.platform == cc.sys.DESKTOP_BROWSER && msgData.debugLog)
        {
            SystemUtils.log(`Recive message =messageId:${data.type}->${data.protocol}`);
        }
        msgData.apply(protocol);
    }

    public onMessage1(buffer:ArrayBuffer):void
    {
        try
        {
            let pos:number = 0;
            while((buffer.byteLength - pos) > HEADER_BLOCK_SIZE)
            {
                let seveDataView:DataView = new DataView(buffer.slice(pos, pos+HEADER_BLOCK_SIZE));
                let len:number = seveDataView.getUint16(0); pos += 2;                          // 包长
                let id:number =  seveDataView.getUint16(2); pos += 2;                          // 协议号
                let datas:Uint8Array = new Uint8Array(buffer.slice(pos, pos+len)); pos += len; // 内容

                let msgDatas:MessageSendData[] = this._messageObjs[id];
                let msgData:MessageSendData = null;
                msgData = msgDatas[0];
                msgData.apply(datas);
            }
        }
        catch(e)
        {
            SystemUtils.log("数据包解析错误: ", e);
        }
    }

    private onError(event: any): void
    {
        SystemUtils.log(`socket error:${event.data}`);
    }

    private onClose(event?: Event): void
    {
        this._isInit = false;
        this._isContting = false;
        SystemUtils.log(`socket closed.`);
        this.closeSocket();
        if(this._onKick) return;
        if(++this.reconnectTimes >= 10)
        {
            MessageBox.showWindow("您的失去网络连接，请重新启动游戏再试...", MessageBoxOption.YES_BUTTON, null, null, MultiLanguageManager.Instance.getText("GameUI_0032"));
            return;
        }
        
        MEventDispatcher.Instance.dispatchEventWith(NetEventType.SERVER_DISCONNECT);
    }

    public onKick():void
    {
        this._onKick = true;
        this.closeSocket("被服务器踢掉，顶号了。");
    }

    private closeSocket(tip?:string) 
    {
        TimerManage.Instance.removeDelayCallBack(this.onSendHardTick,this);
        if(!this._socket) return;
        this._socket.onopen = null;
        this._socket.onmessage = null;
        this._socket.onerror = null;
        this._socket.onclose = null;
        this._socket.close(1000, tip);
        this._socket = null;
    }
    
    public clear():void
    {
        this.closeSocket();
        this._messageObjs = {};
        this._isInit = false;
        this._isContting = false;
    }
}

class MessageSendData
{
    public id:number;
    public seriseNum:number;
    public callBack:Function;
    public self:any;
    public debugLog:boolean;
    constructor(id:number = 0, seriseNum:number = 0, callBack:(data:any)=>void, self:any = null, debugLog:boolean = false)
    {
        this.id = id;
        this.seriseNum = seriseNum;
        this.callBack = callBack;
        this.self = self;
        this.debugLog = debugLog;
    }

    public apply(data:any):void
    {
        this.callBack.apply(this.self,[data]);
    }
}