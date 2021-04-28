import StdPanelData from "./StdPanelData";

/**
 * 面板配置表
 * @author hayden
 */
export default class StdPanelProvider
{
    private _datas = [];
    constructor(source)
    {
        for (const key in source) 
        {
            let data = source[key];
            this._datas[data.panelId] = new StdPanelData(data);
        }
    }

    public getPanelDataById(id:number):StdPanelData
    {
        let data = this._datas[id];
        return data;
    }
}
