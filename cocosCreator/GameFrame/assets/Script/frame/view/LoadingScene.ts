import TimerManage from "../../core/manage/TimerManage";
import GameNavigator from "../control/GameNavigator";
import StdDataLoad from "../model/stdData/StdDataLoad";

const { ccclass, property } = cc._decorator;

/**
 * 加载场景
 * @author hayden
 */
@ccclass
export default class LoadingScene extends cc.Component 
{
    @property(cc.ProgressBar)
    loadProgressBar: cc.ProgressBar = null;

    onLoad() 
    {
    }

    start() 
    {
        cc.log("开始加载资源");
        this.loadProgressBar.progress = 0;
        let stdDataLoad:StdDataLoad = new StdDataLoad(this.loadProgressBar);
        stdDataLoad.loadJson(function () {
            GameNavigator.doNavigator(GameNavigator.NavType.LoginScene);
        });
    }
}
