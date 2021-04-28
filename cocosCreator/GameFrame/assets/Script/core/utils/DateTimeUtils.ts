/**
* 日期时间工具类
* @author hayden
*/
export default class DateTimeUtils
{
    /**
     * 获取本地时间
     */
    public static get localTime():number
    {
        return new Date().getTime();
    }

    /**
     * 是否在指定时间段内
     * @param _time 
     * @returns 
     */
     public static isInTime(_time:string):boolean
     {
		let time: string[] = _time.split(",");
		let startTime = new Date(time[0]).getTime();
		let endTime = new Date(time[1]).getTime();
		let now = new Date().getTime();
		return startTime <= now && now <= endTime;
     }

    /**
	 * 时间(s)格式化
	 * @param time 时间(s)
	 * "05:00" = timeToHHMMSS(300);
	 */
	public static timeToMMSS(time:number):string
	{
        let m = Math.floor(time / 60);
        let s = Math.floor(time % 60);
		let M = m < 10 ? `0${m}` : `${m}`;
		let S = s < 10 ? `0${s}` : `${s}`;
		return `${M}:${S}`;
	}

	/**
	 * 时间(s)格式化
	 * @param time 时间(s)
	 * "01:00:00" = timeToHHMMSS(3600);
	 */
	public static timeToHHMMSS(time:number):string
	{
		let h = Math.floor(time / 60 / 60);
        let m = Math.floor(time / 60 % 60);
        let s = Math.floor(time % 60);
		let H = h < 10 ? `0${h}` : `${h}`;
		let M = m < 10 ? `0${m}` : `${m}`;
		let S = s < 10 ? `0${s}` : `${s}`;
		return `${H}:${M}:${S}`;
	}

	/**
	 * 时间(s)格式化
	 * @param time 时间(s)
	 */
	public static timeToDDHHMMSS(time:number):string
	{
		let d = Math.floor(time / (3600 * 24) );
		let h = Math.floor(time / 3600 % 24);
        let m = Math.floor(time / 60 % 60);
        let s = Math.floor(time % 60);
		let H = h < 10 ? `0${h}` : `${h}`;
		let M = m < 10 ? `0${m}` : `${m}`;
		let S = s < 10 ? `0${s}` : `${s}`;
		let D = ""
		if(d > 0)
			D = `${d}天 `
		return `${D}${H}:${M}:${S}`;
	}

	/**
	 * 时间戳格式化
	 * @param time 时间(s)
	 */
	public static timeToDate(time:number):string
	{
		let date = new Date(time * 1000);
		let Y = date.getFullYear();
		let M = date.getMonth() + 1;
		let D = date.getDate();
		let h = date.getHours();
        let m = date.getMinutes();
		let s = date.getSeconds();
		let MM = M < 10 ? `0${M}` : `${M}`;
		let DD = D < 10 ? `0${D}` : `${D}`;
		let hh = h < 10 ? `0${h}` : `${h}`;
		let mm = m < 10 ? `0${m}` : `${m}`;
		let ss = s < 10 ? `0${s}` : `${s}`;
		return `${Y}-${MM}-${DD} ${hh}:${mm}:${ss}`;
	}

	/**
	 * 时间戳格式化
	 * @param time 时间(s)
	 */
	public static timeToDate2(time:number):string
	{
		let date = new Date(time * 1000);
		let M = date.getMonth() + 1;
		let D = date.getDate();
		let h = date.getHours();
        let m = date.getMinutes();
		let s = date.getSeconds();
		let MM = M < 10 ? `0${M}` : `${M}`;
		let DD = D < 10 ? `0${D}` : `${D}`;
		let hh = h < 10 ? `0${h}` : `${h}`;
		let mm = m < 10 ? `0${m}` : `${m}`;
		let ss = s < 10 ? `0${s}` : `${s}`;
		return `${MM}-${DD} ${hh}:${mm}:${ss}`;
	}

	/**
	 * 时间戳格式化
	 * @param time 时间(s)
	 */
	public static timeToDate3(time:number):string
	{
		let date = new Date(time * 1000);
		let h = date.getHours();
        let m = date.getMinutes();
		let s = date.getSeconds();
		let hh = h < 10 ? `0${h}` : `${h}`;
		let mm = m < 10 ? `0${m}` : `${m}`;
		let ss = s < 10 ? `0${s}` : `${s}`;
		return `${hh}:${mm}:${ss}`;
	}

	/**
	 * 时间戳格式化
	 * @param time 时间(s)
	 */
	public static timeToDate4(time:number):string
	{
		let date = new Date(time * 1000);
		let Y = date.getFullYear();
		let M = date.getMonth() + 1;
		let D = date.getDate();
		let h = date.getHours();
        let m = date.getMinutes();
		let s = date.getSeconds();
		let MM = M < 10 ? `0${M}` : `${M}`;
		let DD = D < 10 ? `0${D}` : `${D}`;
		let hh = h < 10 ? `0${h}` : `${h}`;
		let mm = m < 10 ? `0${m}` : `${m}`;
		let ss = s < 10 ? `0${s}` : `${s}`;
		return `${Y}${MM}${DD}${hh}${mm}${ss}`;
	}
}
