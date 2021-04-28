import TimerManage from "../../../core/manage/TimerManage";

const {ccclass, property} = cc._decorator;

/**
 * 提示窗口
 * @author hayden
 */
@ccclass
export default class MessageBoxWin extends cc.Component
{
	@property(cc.Node)
	boxPanel: cc.Node = null;
	/**
	 * 标题
	 */
	@property(cc.Label)
	title: cc.Label = null;
	/**
	 * 确定按钮
	 */
    @property(cc.Node)
	okButton: cc.Node = null;
	/**
	 * 取消按钮
	 */
    @property(cc.Node)
	noButton: cc.Node = null;
	/**
	 * 背景遮罩
	 */
    @property(cc.Node)
	maskPanel: cc.Node = null;
	/**
	 * 确定按钮文本
	 */
    @property(cc.Label)
	okButtonLabel: cc.Label = null;
	/**
	 * 取消按钮文本
	 */
    @property(cc.Label)
	noButtonLabel: cc.Label = null;
	/**
	 * 内容
	 */
    @property(cc.RichText)
	content: cc.RichText = null;


	private _callBack:Function;
	private _cbSelf:any;

	public set callBack(cb:Function)
	{
		this._callBack = cb;
	}

	public set cbSelf(self:any)
	{
		this._cbSelf = self;
	}

	onEnable()
	{
		this.playTweenAnimation();
		this.okButton.on(cc.Node.EventType.TOUCH_END, this.onClick,this,false);
		this.noButton.on(cc.Node.EventType.TOUCH_END, this.onClick,this,false);
		this.maskPanel.on(cc.Node.EventType.TOUCH_END,this.onClickMask,this,false);
	}

	onDisable()
	{
		this.okButton.off(cc.Node.EventType.TOUCH_END,this.onClick,this,false);
		this.noButton.off(cc.Node.EventType.TOUCH_END,this.onClick,this,false);
		this.maskPanel.off(cc.Node.EventType.TOUCH_END,this.onClickMask,this,false);
	}

	private onClick(event: cc.Event.EventCustom): void 
	{
		this.playCloseAnimation();
		TimerManage.Instance.addDelayCallBack(0.27, () => {
			this.node.active = false;
			if (this._callBack) this._callBack.apply(this._cbSelf, [event.target == this.okButton]);
		}, this, 1);
	}

	private onClickMask(event:cc.Event.EventCustom):void
	{
		this.playCloseAnimation();
		TimerManage.Instance.addDelayCallBack(0.27, () => {
			this.node.active = false;
		}, this, 1);
	}

	/** 弹出显示 */
    protected playTweenAnimation(): void 
    {
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(0.27, 1, 1).easing(cc.easeBackOut()));
		TimerManage.Instance.addDelayCallBack(0.28, () => {
			this.maskPanel.active = true;
		}, this, 1);
	}
	
	/** 弹出显示 */
    protected playCloseAnimation(): void 
    {
		this.maskPanel.active = false;
		this.node.setScale(1);
        this.node.runAction(cc.scaleTo(0.28, 0, 0).easing(cc.easeBackIn()));
	}
}
