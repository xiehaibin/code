import MessageBoxWin from "../../frame/view/common/MessageBoxWin";
import MultiLanguageManager from "../manage/MultiLanguageManager";
import StringUtils from "../utils/StringUtils";

export enum MessageBoxOption
{
	/**
	 * 无按钮
	 */
	NONE,
	/**
	 * 是按钮
	 */
	YES_BUTTON,
	/**
	 * 否按钮
	 */
	NO_BUTTON,
	/**
	 * 两个按钮都有
	 */
	BOTH,
}

/**
 * 提示框
 * @author hayden
 */
export default class MessageBox
{
	private static _instance:MessageBox = null;

	private win:MessageBoxWin = null;

	constructor()
	{
		this.win = cc.find("/Canvas/uiRoot/modalLayer/messageBoxWin").getComponent(MessageBoxWin);
		this.win.boxPanel.active = false;
		this.win.node.zIndex = 1000;
	}
	
	public static get instance():MessageBox
	{
		if(!MessageBox._instance) MessageBox._instance = new MessageBox();
		return MessageBox._instance;
	}

	public static showWindow(content:string, option:MessageBoxOption, cb:(result:boolean)=>void | null, self:any, title:string = null, yesBtnName:string = null, noBtnName:string = null, ...args:any[]):void
	{
		MessageBox.instance.showWindow(content, option, cb, self, title, yesBtnName, noBtnName, args);
	}

	/**
	 * 显示提示框
	 * @param content 文本内容
	 * @param option 按钮选项，用于对按钮的显示
	 * @param cb 按钮回调
	 * @param self 
	 * @param title 提示框标题
	 * @param yesBtnName 确定按钮自定义名称
	 * @param noBtnName 取消按钮自定义名称
	 * @param args 需要填写的文本内容
	 */
	private showWindow(content:string, option:MessageBoxOption, cb:(result:boolean)=>void | null, self:any, title:string = null, yesBtnName:string = null, noBtnName:string = null, ...args:any[]):void
	{
		content = MultiLanguageManager.Instance.getText(content);
		this.win.node.active = true;
		this.win.callBack = cb;
		this.win.cbSelf = self;
		this.win.title.string = !title ? MultiLanguageManager.Instance.getText("GameUI_0032") : title;
		this.win.okButton.active = option == MessageBoxOption.YES_BUTTON || option == MessageBoxOption.BOTH;
		this.win.noButton.active = option == MessageBoxOption.NO_BUTTON || option == MessageBoxOption.BOTH;
		this.win.okButtonLabel.string = !yesBtnName ? MultiLanguageManager.Instance.getText("Common_1003") : yesBtnName;
		this.win.noButtonLabel.string = !noBtnName ? MultiLanguageManager.Instance.getText("Common_1004") : noBtnName;
		this.win.okButton.x = option == MessageBoxOption.YES_BUTTON ? 0 : 140;
		this.win.noButton.x = option == MessageBoxOption.NO_BUTTON ? 0 : -140;
		this.win.content.string = StringUtils.format(content, ...args);
	}
}