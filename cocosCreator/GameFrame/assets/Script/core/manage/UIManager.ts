import { PanelOpenConditionType } from "../../core/common/Define";
import AssetManager from "../../core/manage/AssetManager";
import StdData from "../../frame/model/StdData";
import StdPanelData from "../../frame/model/stdData/panel/StdPanelData";

/**
 * UI管理
 * @author hayden
 */
export default class UIManager
{
    /** 场景显示层 */
    private _sceneLayer:cc.Node = null;
    /** 标准显示层 */
    private _normalLayer: cc.Node = null;
    /** 指引显示层 */
    private _guideLayer: cc.Node = null;
    /** 模态显示层 */
    private _modalLayer: cc.Node = null;

    /** 游戏面板映射 */
    private _panelMapping = new Map();

    private static _Instance:UIManager = null;
    public static get Instance():UIManager
    {
        if (!UIManager._Instance) UIManager._Instance = new UIManager();
        return UIManager._Instance;
    }

    private constructor()
    {
    }

    public init(uiRoot:cc.Node, sceneLayer:cc.Node):void
    {
        this._sceneLayer  = sceneLayer;
        this._normalLayer = uiRoot.getChildByName("normalLayer");
        this._guideLayer  = uiRoot.getChildByName("guideLayer");
        this._modalLayer  = uiRoot.getChildByName("modalLayer");
    }

    /**
     * 在场景显示层显示场景
     * @param node
     */
    public showScene(secene:any):void
    {
        this._sceneLayer.addChild(secene);
    }

    /**
     * 在标准显示层显示UI对象
     * @param node
     */
    private show(node:cc.Node):void
    {
        if (node.parent == this._normalLayer)
        {
            node.active = true;
            node.zIndex = this._normalLayer.childrenCount-1;
        }
        else
        {
            this._normalLayer.addChild(node);
        }
    }
    
    /**
     * 将显示对象进行模态显示
     * @param node
     */
     public showModal(node:cc.Node):void
     {
        if (node.parent == this._modalLayer)
        {
            node.zIndex = this._modalLayer.childrenCount-1;
        }
        else
        {
            this._modalLayer.addChild(node);
        }
    }
    /**
     * 移除模态显示对象
     * @param node 
     */
    public removeModal(node:cc.Node):void
    {
        node.destroy();
    }

    /**
     * 显示引导
     * @param node 
     */
    public showGuide(node:cc.Node):void
    {
        this._guideLayer.addChild(node);
    }

    /**
     * 打开面板
     * @param panleId 
     * @returns 
     */
    public openPanel(panleId:number):void
    {
        let panel:cc.Node = this._panelMapping.get(panleId);
        if (panel)
        {
            this.show(panel);
        }
        else
        {
            if (panleId <= 0) return;
            if (!this.checkCanOpenPanel(panleId)) return;

            let panelData:StdPanelData = StdData.panelProvider.getPanelDataById(panleId);
            AssetManager.Instance.loadAsset(panelData.path, cc.Prefab, (asset)=>{
                let panel = cc.instantiate(asset);
                this.show(panel);
                this._panelMapping.set(panleId, panel);
                cc.log("打开面板：", panelData.path);
            });
        }
    }
    /**
     * 关闭面板
     * @param panleId 
     */
    public closePanel(panleId:number):void
    {
        let panel:cc.Node = this._panelMapping.get(panleId);
        if (panel && panel.active)
        {
            panel.active = false;
        }
    }
    /**
     * 获得一个面板
     * @param panleId 
     * @returns 
     */
     public getPanel(panleId:number):cc.Node
     {
         return this._panelMapping.get(panleId);
     }
    /**
     * 检测面板是否可打开
     * @param panleId 
     * @returns 
     */
    private checkCanOpenPanel(panleId:number):boolean
    {
        let panelData:StdPanelData = StdData.panelProvider.getPanelDataById(panleId);
        if (panelData.conditionType == PanelOpenConditionType.NONE) return true;
        if (panelData.conditionType == PanelOpenConditionType.LEVEL && 1 >= panelData.condition) return true;
        else if (panelData.conditionType == PanelOpenConditionType.OPENING_DAYS && 1 >= panelData.condition) return true;
        return false;
    }
}
