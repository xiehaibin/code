import { PanelId } from "../../core/common/Define";
import MEvent from "../../core/events/MEvent";
import MEventDispatcher from "../../core/events/MEventDispatcher";
import TimerManage from "../../core/manage/TimerManage";
import UIManager from "../../core/manage/UIManager";
import MessageBox, { MessageBoxOption } from "../../core/ui/MessageBox";
import GlobalData from "../common/GlobalData";
import { CoreEventType } from "../events/MEventType";
import GameData from "../model/GameData";

const {ccclass, property} = cc._decorator;

/**
 * 游戏场景
 * @author hayden
 */
@ccclass
export default class GameScene extends cc.Component 
{
    @property(cc.Node)
    private testBtn:cc.Node = null;
    @property(cc.Node)
    private msgBtn:cc.Node = null;

    onLoad()
    {
        GameData.init();
    }

    onEnable()
    {
        this.testBtn.on("click", this.onOpenPanel, this);
        this.msgBtn.on("click", this.onOpenMsgBox, this);
    }

    onDisable()
    {
        this.testBtn.off("click", this.onOpenPanel, this);
        this.msgBtn.off("click", this.onOpenMsgBox, this);
    }

    private onOpenPanel(): void 
    {
        UIManager.Instance.openPanel(PanelId.TEST_PANEL);
    }

    private onOpenMsgBox(): void 
    {
        MessageBox.showWindow("RoleInfo_0304", MessageBoxOption.BOTH, null, this);
    }
}
