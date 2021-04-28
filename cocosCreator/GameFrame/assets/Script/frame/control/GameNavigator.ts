import UIManager from "../../core/manage/UIManager";

/**
 * 游戏导航
 * @author hayden
 */
export default class GameNavigator
{
    /** 场景类型 */
    public static NavType = {
        UpdateScene:"updateScene", 
        LoadingScene:"loadingScene", 
        LoginScene:"loginScene", 
        GameScene:"gameScene"
    };

    private static ScenePath:string = "prefabs/scene/";
    private static CurrentNavType:string = "";
    private static CurrentNavScene:any = null;
    private static CurrentSceneAsset:cc.Asset = null;

    public static doNavigator(navType:string)
    {
        if (GameNavigator.CurrentNavType == navType) return;
        GameNavigator.LoadScene(navType);
    }

    private static LoadScene(navType:string)
    {
        let onProgress = function(a:any, b:any){
            //cc.log(">>>>>>>>>>>>>>>>>>>>> ", a/b*100, "/100");
        }

        cc.resources.load(GameNavigator.ScenePath+navType, onProgress, function(err, prefab) {
            if (err) throw new Error("加载场景错误：" + err);
            let scene = cc.instantiate(prefab);
            UIManager.Instance.showScene(scene);

            if (GameNavigator.CurrentNavScene)
            {
                GameNavigator.CurrentNavScene.destroy();
                cc.assetManager.releaseAsset(GameNavigator.CurrentSceneAsset);
                cc.log("删除loginScene: ", cc.assetManager.assets);
            }

            GameNavigator.CurrentNavType = navType;
            GameNavigator.CurrentNavScene = scene;
            GameNavigator.CurrentSceneAsset = prefab;
        });
    }
}
	