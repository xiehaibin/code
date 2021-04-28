import MEventDispatcher from "./MEventDispatcher";

/**
 * 事件
 * @author hayden
 */
export default class MEvent 
{
	private _target:MEventDispatcher;
	private _type:string;
	private _data:any;
	private _callBack:Function;
	private _self:any;
	constructor(type:string = null, data:any = null) 
	{
		this._type = type;
		this._data = data;
	}

	public get type():string
	{
		return this._type;
	}

	public set type(value:string)
	{
		this._type = value;
	}

	public get data():any
	{
		return this._data;
	}

	public set data(value:any)
	{
		this._data = value;
	}

	public get callBack():Function
	{
		return this._callBack;
	}

	public set callBack(value:Function)
	{
		this._callBack = value;
	}

	public get self():any
	{
		return this._self;
	}

	public set self(value:any)
	{
		this._self = value;
	}

	public get target():MEventDispatcher
	{
		return this._target;
	}

	public set target(value:MEventDispatcher)
	{
		this._target = value;
	}

	public clear():void
	{
		this._callBack = null;
		this._data = null;
		this._target = null;
		this._type = null;
	}
}