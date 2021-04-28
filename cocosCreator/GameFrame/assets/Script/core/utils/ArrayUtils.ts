/**
 * 数组工具类
 * @author hayden
 */
export default class ArrayUtils 
{
    /**
	 * 获取数组中的最大值
	 */
	public static getMax(array:number[]):number 
	{
		let max:number = array[0];
		for (let index = 0 , len = array.length; index < len; index++) 
        {
			if( max < array[index]) max = array[index];
		}
		return max ;
	}

	/**
	 * 打乱数组
	 * @param array 
	 * @returns 
	 */
	public static disorderArray(array:any):number[]
	{
        var newArray = [];
        while (array.length > 0) 
		{
            var index = Math.floor(Math.random() * array.length);
            newArray.push(array[index]);
            array.splice(index, 1);
        }

        return newArray;
    }
}
