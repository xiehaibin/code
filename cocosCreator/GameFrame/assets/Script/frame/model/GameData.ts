import BagDataMgr from "./gameData/BagDataMgr";

/**
 * 游戏数据
 * @author hayden
 */
export default class GameData
{
   /** 背包数据 */
   public static bagDataMgr:BagDataMgr;

   public static init():void
   {
      this.bagDataMgr = new BagDataMgr();
   }
}
