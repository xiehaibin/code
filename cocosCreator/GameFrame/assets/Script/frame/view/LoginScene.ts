import GameNavigator from "../control/GameNavigator";

const {ccclass, property} = cc._decorator;

/**
 * 登陆场景
 * @author hayden
 */
@ccclass
export default class LoginScene extends cc.Component 
{
    @property(cc.Node)
    loginBtn:cc.Node = null;

    onLoad()
    {
    }

    onEnable()
    {
        this.loginBtn.on('click', this.onLoginClickHandler, this);
    }

    onDisable()
    {
        this.loginBtn.off('click', this.onLoginClickHandler, this);
    }

    private onLoginClickHandler(e:Event)
    {
        GameNavigator.doNavigator(GameNavigator.NavType.GameScene);
    }

    onDestroy()
    {
        cc.log("Destroy");
    }
}
