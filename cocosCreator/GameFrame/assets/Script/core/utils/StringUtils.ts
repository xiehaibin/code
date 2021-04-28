/**
* 字符串工具类
* @author hayden
*/
export default class StringUtils
{
    /**
     * 格式化字符串
     * @param str  需要格式化的字符串 
     * @param args 需要更换的值
     * @example format("a=%, b=%, c=%",10,20,30); print: a=10,b=20,c=30
     */
    public static format(str: string, ...args: any[]): string 
    {
        let result = str;
        if (args.length > 0) 
        {
            let value;
            for (var key in args) 
            {
                value = args[key];
                if (value != null && value.length != 0) 
                {
                    result = result.replace("%", value);
                }
            }
        }

        return result;
    }

    /**
     * 字符串切割
     * @param v 要切割的字符串
     * @param separator 切割的符号
     */
    public static stringToArray(v: string, separator: string | RegExp): string[] 
    {
        let ary = v.split(separator);
        return ary;
    }

    /**
     * 字符串转换为number数组
     * @param v 要切割的字符串
     * @param separator 切割的符号
     */
    public static stringToNumberArray(v: string, separator: string | RegExp): number[] 
    {
        let ary = v.split(separator);
        let result = [];
        for (let i = 0; i < ary.length; i++) 
        {
            const str = ary[i];
            result.push(parseInt(str));
        }
        return result;
    }

    /**
     * 字符串转二维number数组  
     * @param str 
     * @example "1_100,2_100" =>  [2][2] = [[1, 100], [2, 100]]
     */
    public static stringToNumberTwoArray(str: string): number[][] {
        if ("" == str || null == str) return null;

        let arr: number[][] = [];
        let strArr = str.split(",");
        for (let i = 0; i < strArr.length; i++) {
            let subStrArr: string[] = strArr[i].split("_");
            arr[i] = [];
            for (let j = 0; j < subStrArr.length; j++) {
                arr[i][j] = parseInt(subStrArr[j]);
            }
        }
        return arr;
    }
    /**
     * 字符串转二维字符串数组
     * @param str 
     * @example "1_100,2_100" =>  [2][2] = [[1, 100], [2, 100]]
     */
    public static stringToTwoArray(str: string): string[][] {
        if ("" == str || null == str) return null;

        let arr: string[][] = [];
        let strArr = str.split(",");
        for (let i = 0; i < strArr.length; i++) {
            let subStrArr: string[] = strArr[i].split("_");
            arr[i] = [];
            for (let j = 0; j < subStrArr.length; j++) {
                arr[i][j] = subStrArr[j];
            }
        }
        return arr;
    }
    
    /** 
     * 横向中文转为竖向 
     */
	public static stringToVertical(str:string):string
	{
		let str1 = ``;
		for (let i = 0; i < str.length; i++)
		{
			str1 += i == str.length - 1 ? `${str[i]}` : `${str[i]}\n`;
		}
		return str1;
	}

    /**
    * 获取字符串的字节长度
    * 一个中文算2两个字节
    * @param str
    * @return 
    */
    public static strByteLen(str: String): number 
    {
        var byteLen: number;
        var strLen: number = str.length;
        for (var i: number = 0; i < strLen; i++) 
        {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    }

    /**
     * 重复指定字符串count次
     * @param str
     * @param count
     * @return 
     */
    public static repeatStr(str: String, count: number): string 
    {
        var s: string = "";
        for (var i: number = 0; i < count; i++) 
        {
            s += str;
        }
        return s;
    }
}