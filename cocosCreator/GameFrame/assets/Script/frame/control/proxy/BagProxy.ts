import { Code } from "../../../core/net/MessageType";
import BaseProxy from "../../../core/net/BaseProxy";

/**
 * 背包通信代理
 */
export default class BagProxy extends BaseProxy
{
    constructor()
    {
        super();
        this.onRegister();
    }

    public onRegister():void
	{
		this.registMessage(Code.BAG_DATA_LIST, this.onBagDataResponse, this);
	}

	public onRemove():void
	{
        this.removeMessage(Code.BAG_DATA_LIST);
	}

    /**
     * 请求背包数据
     * @param data 
     */
    public sendBagDataRequest(data:any):void
    {
        this.sendMessage(data);
    }

    /**
     * 背包数据
     * @param data 
     */
    private onBagDataResponse(data:any):void
    {
    }
}
