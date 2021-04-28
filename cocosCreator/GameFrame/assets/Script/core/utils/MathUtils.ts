import SystemUtils from "./SystemUtils";

/**
 * 数学工具类
 * @author hayden
 */
export default class MathUtils
{
    /**
     * 弧度转换为角度
     * @param 弧度
     * @returns 
     */
    private static covertToAngle(covert:number):number
    {
        return 180/Math.PI*covert;
    }

    /**
     * 角度转换为弧度
     * @param 角度
     * @returns 
     */
     private static angleToCovert(angle:number):number
     {
        return Math.PI/180*angle;
     }

    /**
     * 随机数
     * @param minNum 最小范围
     * @param maxNum 最大范围
     * @returns 
     */
    public static randomNum(minNum: number, maxNum: number):number
    {
        return Math.random() * (maxNum - minNum + 1) + minNum;
    }

    /**
     * 计算两点之间的距离
     * @param first 
     * @param second 
     * @returns 
     */
    public static calculateDistance(first:cc.Vec2, second:cc.Vec2):number
    {
        let distance = first.sub(second).mag();
        return distance;
    }

    /**
     * 计算两点之间的中心点
     * @param first 
     * @param second 
     * @returns 
     */
    public static calculateMidpoint(first:cc.Vec2, second:cc.Vec2):cc.Vec2
    {
        let x = first.x + second.x;
        let y = first.y + second.y;
        return cc.v2(x/2, y/2);
    }

    /**
     * 计算两点之间的角度
     * @param centerPos 中心点
     * @param targetPos 目标点
     * @returns 
     */
    public static calculationAngle(centerPos:cc.Vec2, targetPos:cc.Vec2):number
    {
        let pos = centerPos.sub(targetPos);
        return Math.atan2(pos.y, pos.x) * 180 / Math.PI + 180;
    }

    /** 大数正整数比较 返回1 a>b, 返回-1 a<b, 返回0 a==b */
    public static bigUintCompare(a: string | number, b: string | number): number 
    {
        a = a += "";
        b = b += "";
        let n = a.indexOf(".");
        let a1 = a;
        let a2 = "";
        let b1 = b;
        let b2 = "";
        if (n != -1) {
            a1 = a.slice(0, n);
            a2 = a.slice(n + 1, a.length)
        }
        n = b.indexOf(".")
        if (n != -1) {
            b1 = b.slice(0, n)
            b2 = b.slice(n + 1, b.length)
        }
        if (a1.length > b1.length) return 1;
        else if (a1.length < b1.length) return -1;
        else {
            n = sameLengCompare(a1, b1);
            if (n != 0) return n;
            return compare2(a2, b2)
        }
        /**
         * 整数位对比
         */
        function sameLengCompare(a: string, b: string): number
        {
            for (let i = 0; i < a.length; i++) 
            {
                const a1 = parseInt(a[i]);
                const b1 = parseInt(b[i]);
                if (a1 > b1) return 1;
                else if (a1 < b1) return -1;
            }
            return 0;
        }
        /**
         * 小数位对比
         */
        function compare2(a: string, b: string): number 
        {
            let i = 0;
            while (1) 
            {
                let a1: string = null;
                let b1: string = null;
                if (i < a.length) a1 = a[i]
                if (i < b.length) b1 = b[i]
                if (!a1 && !b1) break;
                if (!a1) a1 = "0";//这里初始化为0，是因为下面要转换为整数的时候不会变成NaN;
                if (!b1) b1 = "0";
                let a2 = parseInt(a1);
                let b2 = parseInt(b1);
                if (a2 > b2) return 1;
                else if (a2 < b2) return -1;
                i++;
            }
            return 0;
        }
    }

    /**
     * 格式化大数值为带字母的单位
     * @param v 
     */
    public static bigNumFormat(v: string | number): string 
    {
        if (typeof (v) == "number") {
            v = Math.floor(v).toString();
        }else
        {
            let n = v.indexOf(".");
            if(n != -1) v = v.slice(0,n);
        }
        if (v == "") return v;
        let words = ["", "万", "亿", "兆", "吉"];
        if (v.length <= 5) return v;
        let i = v.length % 4;
        if (i == 0) i = 4;
        let w = Math.ceil(v.length / 4) - 1;
        let num = `${v.slice(0, i)}`;
        if (i < 3) num = `${num}.${v.slice(i, i + 1)}`
        let res = `${num}${words[w]}`
        return res;
	}

	/**
     * 目标数值跳动
     * @param a 原数值
     * @param b 目标数值
     * @param numStr 需要赋值的文本组件
     */
    public static targetNumThrob(a: string | number, b: string | number, numStr: cc.Label): void 
    {
        a = a += "";
        b = b += "";
        let restrict = 100000;  // 限制数值
        let power = 20; // 一帧跳动次数,根据游戏帧频设置
        // 数据相同则返回
        let compare = MathUtils.bigUintCompare(a, b);
        if (compare == 0 || numStr == null) 
        {
            return;
        }
    }
}
