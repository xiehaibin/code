import BackpackDataMgr from "../model/gameData/BagDataMgr";

/**
 * 游戏全局数据
 * @author hayden
 */
export default class GlobalData 
{
	/////////////////游戏自身相关信息/////////////////
    /** 游戏名称 */
    public static gameName:string = "《DOME》";
    /** 游戏的刷新率 */
    public static gameFrameRate:number = 48;
    
    /////////////////游戏连接登录信息/////////////////
    /** 登录主机IP */
    public static host:string = "61.144.23.107";
    /** 登录主机端口 */
    public static port:number = 8080;

    /////////////////游戏功能开关/////////////////
    /** 是否打开新手引导 */
    public static isOpenNewGuide:boolean = false;
    /** 是否打开剧情 */
    public static isOpenNewPlot:boolean = false;
}
