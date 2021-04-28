import BagProxy from "./proxy/BagProxy";

/**
 * 通信代理基类
 * @author hayden
 */
export default class ProxyProvider
{
    /** 背包代理 */
    public static bagProxy:BagProxy = new BagProxy();

    public static init():void
    {
    }
}
