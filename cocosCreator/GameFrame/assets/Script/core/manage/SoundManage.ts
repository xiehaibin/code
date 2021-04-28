/**
* 游戏音效资源管理器
* @author hayden
*/
export default class SoundManage
{
    private static _Instance:SoundManage = null;
    public static get Instance():SoundManage
	{
		if (!SoundManage._Instance) SoundManage._Instance = new SoundManage()
		return this._Instance;
	}

    private constructor()
    {
    }
}
