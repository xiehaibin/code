import DateTimeUtils from "../utils/DateTimeUtils";
import TimerManage from "./TimerManage";

/**
 * 游戏资源管理器
 * @author hayden
 */
export default class AssetManager
{
    private static _Instance:AssetManager = null;

    /** 释放空闲资源延时时间 秒*/
    private releaseDelayedTime:number = 20;
    /** 资源的信息表 */
    private assetTab = {};
    /** 空闲资源表 */
    private idleAssetTab = {};

	public static get Instance():AssetManager
	{
		if (!AssetManager._Instance) AssetManager._Instance = new AssetManager()
		return AssetManager._Instance;
	}

    private constructor()
    {
        // 定时释放空闲资源
        TimerManage.Instance.addDelayCallBack(this.releaseDelayedTime, this.onReleaseIdleAssets, this);
    }

    /**
     * 加载资源
     * @param path        //资源路径
     * @param type        //资源类型
     * @param onComplete  //加载完成回调
     * @param onProgress  //加载进度回调
     */
    public loadAsset(path:string, type: typeof cc.Asset, onComplete:(asset:any)=>void, onProgress?:(finish: number, total: number) => void):void
    {
        let sType = type.name;
        cc.resources.load(path, type, onProgress, (err, asset)=> {
            if (err) cc.error("loadAsset error：", err);

            if (0 == asset.refCount) asset.addRef();
            asset.addRef();
     
            let assetMap = this.assetTab[sType];
            let idleAssetMap:any = this.idleAssetTab[sType];
            if (idleAssetMap && idleAssetMap.has(path)) 
            {
                // 先判断加载的资源是否空闲资源表中，如果在把它从空闲资源表中移除重新添加到资源表中
                let assetInfo: AssetInfo = idleAssetMap.get(path);
                //从空闲表中移除
                idleAssetMap.delete(path);
                //恢复空闲资源
                assetInfo.asset = asset;
                assetInfo.startIdleTime = 0;
                assetMap.set(path, assetInfo);

            }
            else
            {
                if (!assetMap)
                {
                    assetMap = new Map();
                    this.assetTab[sType] = assetMap;
                    assetMap.set(path, new AssetInfo(asset));
                }
                else
                {
                    if (assetMap.has(path)) 
                    {
                        let assetInfo:AssetInfo = assetMap.get(path);
                        assetInfo.asset = asset;
                    }
                    else
                    {
                        assetMap.set(path, new AssetInfo(asset));
                    }
                }
            }
    
            if(onComplete) onComplete(asset);
            
            // cc.log("-------------------LoadAsset--------------------");
            // cc.log("AssetTab: ", this.assetTab);
            // cc.log("IdleAssetTab: ", this.idleAssetTab);
            // cc.log("cache: ", cc.assetManager.assets);
        });
    }

    /**
     * 移除资源(将资源移除到空闲表中)
     * @param path   //资源路径
     * @param type   //资源类型
     */
    public removeAsset(path:string, type: typeof cc.Asset):void
    {
        let sType:string = type.name;
        let assetMap:any = this.assetTab[sType];
        if (!assetMap) return;

        let assetInfo:AssetInfo = assetMap.get(path);
        if (!assetInfo) return;

        if (!assetInfo.asset.isValid)
        {
            let b:boolean = assetMap.delete(path);
            cc.error("删除不可用资源：", path, b);
            return;
        } 

        if (assetInfo.asset.refCount > 1) assetInfo.asset.decRef();
        if (1 == assetInfo.asset.refCount)
        {
            assetInfo.startIdleTime = DateTimeUtils.localTime;
            let idleMap = this.idleAssetTab[sType];
            if (!idleMap)
            {
                idleMap = new Map();
                this.idleAssetTab[sType] = idleMap;
            }
            idleMap.set(path, assetInfo);
            assetMap.delete(path);
        }

        // cc.log("-------------------RemoveAsset--------------------");
        // cc.log("AssetTab: ", this.assetTab);
        // cc.log("IdleAssetTab: ", this.idleAssetTab);
        // cc.log("cache: ", cc.assetManager.assets);
    }

    /**
     * 释放空闲资源
     */
    private onReleaseIdleAssets():void
    {
        cc.log("-------------------ReleaseIdleAssets--------------------");

        let currentTime:number = DateTimeUtils.localTime;
        for (const k in this.idleAssetTab) 
        {
            let idleMap = this.idleAssetTab[k];
            let iterator = idleMap.keys();
            let r: IteratorResult<string>;
            while (r = iterator.next(), !r.done) 
            {
                let path:string = r.value;
                let value:AssetInfo = idleMap.get(path);
                if (value.startIdleTime>0 && ((currentTime-value.startIdleTime) >= this.releaseDelayedTime))
                {
                    value.asset.decRef();
                    idleMap.delete(path);
                }
            }
        }

        // cc.log("AssetTab: ", this.assetTab);
        // cc.log("IdleAssetTab: ", this.idleAssetTab);
        cc.log("cache: ", cc.assetManager.assets.count);

        cc.log("------------------- END  --------------------");
    }

    /**
     * 获取缓存资源
     * @param path 
     * @param type 
     * @returns 
     */
    private getCacheAsset(path: string, type: string): cc.Asset 
    {
        let assetMap: any = this.assetTab[type];
        if (assetMap && assetMap.has(path)) 
        {
            let assetInfo:AssetInfo = assetMap.get(path);
            if (assetInfo && assetInfo.asset.isValid) 
            {
                assetInfo.asset.addRef();
                return assetInfo.asset;
            }
        }
        else 
        {
            let idleAssetMap:any = this.idleAssetTab[type];
            if (idleAssetMap && idleAssetMap.has(path)) 
            {
                let assetInfo: AssetInfo = idleAssetMap.get(path);
                if (assetInfo && assetInfo.asset.isValid) 
                {
                    idleAssetMap.delete(path);

                    //恢复空闲资源
                    assetInfo.asset.addRef();
                    assetInfo.startIdleTime = 0;
                    assetMap.set(path, assetInfo);
                    return assetInfo.asset;
                }
            }
        }

        return null;
    }

    /**
     * 清空资源管理(从游戏中退出到登陆界面)
     */
    public clear():void
    {
        this.assetTab = {};
        this.idleAssetTab = {};
        TimerManage.Instance.removeDelayCallBack(this.onReleaseIdleAssets, this);
        //cc.assetManager.releaseUnusedAssets();
    }
}

class AssetInfo
{
    public asset:cc.Asset;       // 资源
	public startIdleTime:number; // 开始空闲的时间

    constructor(asset:cc.Asset) 
	{
        this.asset = asset;
        this.startIdleTime = 0;
    }
}
