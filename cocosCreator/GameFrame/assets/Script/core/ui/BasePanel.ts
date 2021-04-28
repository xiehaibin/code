import TimerManage from "../manage/TimerManage";
import UIManager from "../manage/UIManager";

const {ccclass, property} = cc._decorator;

/**
 * 面板基类
 * 所有面板继承此类
 * @author hayden
 */
@ccclass
export default class BasePanel extends cc.Component 
{
    @property(cc.Node)
    closeBtn: cc.Node = null;

    /** 面板id */
    protected panelId:number = 0;
    protected isTweenOpen:boolean = false;

    onLoad () 
    {
        cc.log("BasePanel  -   onLoad");
    }

    onEnable()
    {
        if (this.isTweenOpen) this.playTweenAnimation();

        cc.log("BasePanel  -   onEnable");
        this.closeBtn.on("click", this.onClosePanel, this);
    }

    onDisable()
    {
        cc.log("BasePanel  -   onDisable");
        this.closeBtn.off("click", this.onClosePanel, this);
    }

    private onClosePanel():void
    {
        cc.log("BasePanel  -   onClosePanel", this.panelId);

        if(this.isTweenOpen) 
		{
			this.playCloseAnimation();
			TimerManage.Instance.addDelayCallBack(0.27, ()=>{
				UIManager.Instance.closePanel(this.panelId);
			}, this, 1);
		}
        else
		{
			UIManager.Instance.closePanel(this.panelId);
		}
    }

    /** 弹出显示 */
    protected playTweenAnimation(): void 
    {
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(0.27, 1, 1).easing(cc.easeBackOut()));
	}
	
	/** 弹出显示 */
    protected playCloseAnimation(): void 
    {
		this.node.setScale(1);
        this.node.runAction(cc.scaleTo(0.27, 0, 0).easing(cc.easeBackIn()));
	}

    onDestroy()
    {
        cc.log("BasePanel  -   onDestroy");
    }
}
