import StringUtils from "../utils/StringUtils";
import SystemUtils from "../utils/SystemUtils";

/** 
 * 多语言数据管理
 * @author hayden
 */
export default class MultiLanguageManager 
{
    private _fontId: number = 1;
    private _languageTypeList: FontTypeData[] = null;
    private _languageTextList: LanData[] = null;
    private _languageErrorList: LanData[] = null;
    /**
     * 获取语言资源的回调函数
     */
    private _languageCallBacks: GetFontCbData[];
    /**
     * 当前的语言资源
     */
    private _fontAssets: cc.Font;

    private static _instance: MultiLanguageManager = null;
    public static get Instance(): MultiLanguageManager 
    {
        if (!MultiLanguageManager._instance) MultiLanguageManager._instance = new MultiLanguageManager();
        return MultiLanguageManager._instance;
    }

    public constructor() 
    {
        this._languageCallBacks = [];
    }

    /** 初始化数据 */
    public initLanguageTypeData(languageType:any): void 
    {
        this._languageTypeList = [];
        for (const id in languageType) 
        {
            let lanType = new FontTypeData(languageType[id]);
            this._languageTypeList[id] = lanType;
        }
    }

    /** 初始化数据 */
    public initLanguageTextData(languageText:any): void 
    {
        this._languageTextList = [];
        for (const id in languageText) 
        {
            let lanData = new LanData();
            lanData.setData(languageText[id]);
            this._languageTextList[id] = lanData;
        }
    }

    /** 初始化数据 */
    public initLanguageErrorData(languageError:any): void 
    {
        this._languageErrorList = [];
        for (const id in languageError) 
        {
            let lanData = new LanData();
            lanData.setData(languageError[id]);
            this._languageErrorList[id] = lanData;
        }
    }

    public initFount(): void 
    {
        let fontId = parseInt(SystemUtils.getLocalData("fontId"));
        if (!fontId) fontId = 1;
        this.fontId = fontId;
    }

    /** 语言列表 */
    public getFontTypeDatas(): FontTypeData[] 
    { 
        return this._languageTypeList; 
    }

    /**
     * 获取字体资源
     */
    public getFontAssets(cb: (assets: cc.Font) => void, self: any): void 
    {
        if (this._fontAssets) 
        {
            cb.apply(self, [this._fontAssets]);
            return;
        }

        this._languageCallBacks.push(new GetFontCbData(cb, self));
    }

    /** 当前语言 */
    public get fontId(): number { return this._fontId; }
    public set fontId(v: number) 
    {
        this._fontId = v;
        let fontData = this._languageTypeList[v] as FontTypeData;
        if (!fontData) 
        {
            SystemUtils.error(`font had not found with font type:${v}`);
            return;
        }
        SystemUtils.saveLocalData("fontId", v.toString());

        // this._fontAssets = AssetsManager.instance.getAsset(fontData.fontResId);
        // if (!this._fontAssets) 
        // {
        //     Mediator.loadResourceByIds(this, () => {
        //         this._fontAssets = AssetsManager.instance.getAsset(fontData.fontResId);
        //         if (!this._fontAssets) SystemTools.error(`加载fontAssets资源失败,red id:${fontData.fontResId}`);
        //         this.callBackGetFontAssets();
        //         GameFacade.instance.dispatchEventWith(SettingEventType.SWITCH_LANGUAGE);
        //     }, LoadPanelType.NONE, 0, fontData.fontResId);
        // } 
        // else 
        // {
        //     GameFacade.instance.dispatchEventWith(SettingEventType.SWITCH_LANGUAGE);
        // }
    }

    private callBackGetFontAssets(): void 
    {
        if (!this._fontAssets || !this._languageCallBacks || this._languageCallBacks.length == 0) return;
        let cbs = this._languageCallBacks;
        this._languageCallBacks = [];
        for (let i = 0; i < cbs.length; i++) 
        {
            const element = cbs[i];
            element.apply(this._fontAssets);
        }
    }

    /**
     * 获取文本
     * @param id 文本id
     * @param args 需要替换的参数
     */
    public getText(id:string, ...args): string 
    {
        let content: string = "";
        let fontData = this._languageTypeList[this._fontId];
        let textData = this._languageTextList[id];
        if (textData && textData.hasOwnProperty(fontData.contentId)) 
        {
            content = textData[fontData.contentId];
        }
        args = this.getArgsText(...args);
        content = StringUtils.format(content, ...args)
        return content;
    }

    /**
     * 获取错误文本
     * @param id 文本id
     * @param args 需要替换的参数
     */
    public getErrorText(id:string, ...args): string 
    {
        let content: string = "";
        let fontData = this._languageTypeList[this._fontId];
        let textData = this._languageErrorList[id];
        if (textData && textData.hasOwnProperty(fontData.contentId)) 
        {
            content = textData[fontData.contentId];
        }
        args = this.getArgsText(...args);
        content = StringUtils.format(content, ...args)
        return content;
    }

    private getArgsText(...args: any[]): any[] 
    {
        let argsList: any[] = []
        if (args.length > 0) 
        {
            let content: string = "";
            for (var key in args) 
            {
                let id = args[key];
                let fontData = this._languageTypeList[this._fontId];
                let textData = this._languageTextList[id];
                if (textData && textData.hasOwnProperty(fontData.contentId)) 
                {
                    content = textData[fontData.contentId];
                }
                else
                {
                    content = args[key];
                }
                argsList.push(content);
            }
        }

        return argsList;
    }

    public clear(): void 
    {
        this._fontAssets = null;
    }
}

/** 语言类型资料 */
export class FontTypeData 
{
    /** 文本ID */
    private _id: number = 0;
    /** 名称 */
    private _name: string = "";
    /** 内容id */
    private _contentId: string = "";
    /** 字体 */
    private _fontResId: string = "";

    constructor(data: any) 
    {
        this._id = data.id;
        this._name = data.name;
        this._contentId = data.contentId;
        this._fontResId = data.fontResId;
    }

    public get id(): number 
    {
        return this._id;
    }
    public get name(): string 
    {
        return this._name;
    }
    public get fontResId(): string 
    {
        return this._fontResId;
    }
    public get contentId(): string 
    {
        return this._contentId;
    }
}

/** 语言文本资料 */
export class LanData {
    /** 文本ID */
    public Id: number = 0;
    /** 中文 */
    public lan_zh: string = "";
    /** 英语 */
    public lan_en: string = "";
    /** 法语 */
    public lan_fr: string = "";
    /** 德语 */
    public lan_de: string = "";
    /** 西语 */
    public lan_es: string = "";
    /** 葡语 */
    public lan_po: string = "";
    /** 俄语 */
    public lan_ru: string = "";
    /** 法语 */
    public lan_th: string = "";
    /** 繁体中文 */
    public lan_gb: string = "";

    public setData(data: any): void 
    {
        for (const key in data) 
        {
            if (this[key] != null) 
            {
                this[key] = data[key];
            }
        }
    }
}

class GetFontCbData 
{
    private _cb: Function;
    private _self: any;
    constructor(cb: (assets: cc.Font) => void, self: any) 
    {
        this._cb = cb;
        this._self = self;
    }

    public apply(assets: cc.Font): void 
    {
        if (this._cb) this._cb.apply(self, [assets]);
    }
}