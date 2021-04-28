/**
 * 面板数据
 * @author hayden
 */
export default class StdPanelData
{
    /** 面板加载路径 */
    public path:string = "";
    /** 面板id */
    public panelId:number = 0;
    /** 打开面板的条件类型 */
    public conditionType:number = 0;
    /** 打开面板的条件 */
    public condition:number = 0;

    constructor(data)
    {
        this.path          = data.path;
        this.panelId       = data.panelId;
        this.conditionType = data.conditionType;
        this.condition     = data.condition;
    }
}
