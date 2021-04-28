import MultiLanguageManager from "../../../core/manage/MultiLanguageManager";
import StdData from "../StdData";
import StdPanelProvider from "./panel/StdPanelProvider";

/**
* 游戏配置加载
* @author hayden
* 
*/	
export default class StdDataLoad
{
	private dataPaths:Array<object>;
    private reloadCont:number = 0;
	private configPath:string = "conf/JsonConfig";
	private progressBar:cc.ProgressBar = null;

	constructor(progressBar:cc.ProgressBar)
	{
		this.progressBar = progressBar;
	}

    public loadJson(cb:Function = null):void 
	{
		cc.resources.load(this.configPath, (error:Error, data:any)=>{
			if(error)
			{
				let b = this.reloadDelay(this.loadJson, self, cb);
				if(!b)  throw Error('配置文件加载失败,请检查您的网络 ' + error);
				return;
			}

			this.dataPaths = data.json;
			let paths = this.getPaths();
			this.reloadCont = 0;
			this.loadRes(paths, cb);

            cc.resources.release(this.configPath);
		});
	}

	private loadRes(paths:string[], cb:Function):void
	{
		let self = this;
		cc.loader.loadResArray(paths, (finish: number, total: number)=>{
			self.progressBar.progress = finish/total;
		},  
		(error:Error, assets:any)=>{
			if(error)  throw Error('资源加载失败, 请检查您的网络 ' + error);
			for (let index = 0; index < assets.length; index++) 
			{
				const doc = assets[index].json;
				const dataPath = this.dataPaths[index];
				const id = dataPath["id"];
				switch(id)
				{
					case "Panel": StdData.panelProvider = new StdPanelProvider(doc);                break;
					case "Common":                                                                  break;
					case "Item":                                                                    break;
					case "LanText":      MultiLanguageManager.Instance.initLanguageTextData(doc);   break;
					case "LanType":      MultiLanguageManager.Instance.initLanguageTypeData(doc);   break;
					case "LanTextError": MultiLanguageManager.Instance.initLanguageErrorData(doc);  break;
				}
			}

			for (let i = 0; i < paths.length; i++)
			{
				cc.resources.release(paths[i]);
			}

			if (cb) cb();
		})
	}

    private reloadDelay(reloadFun:Function, self:any, ...argus):boolean
	{
		if(++this.reloadCont >= 5)
		{
			return false;
		}

		return true;
	}

    private getPaths():string[]
	{
		let list:string[] = [];
		for (const item of this.dataPaths) 
		{
			let name = "conf/" + item["name"];
			list.push(name);
		}

		return list;
	}
}
