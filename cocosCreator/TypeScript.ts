import Shape from "./Shape";
import Circle from "./Circle"
import TestInterface from "./TestInterface";
import TestRole from "./TestRole"

const {ccclass, property} = cc._decorator;

/**
JavaScript 与 TypeScript 的区别
TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，
TypeScript 通过类型注解提供编译时的静态类型检查。
TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。
*/

/// <reference path="Shape.ts" />

// 全局变量
const b:string = "string";
let Global_Num:number = 0;
@ccclass
export default class TypeScript extends cc.Component 
{
    // 静态变量
    public static a:number = 10;
    public b:number = 11;

    start () 
    {
        /** 基础类型 
         * 任意类型	   any	     声明为any的变量可以赋予任意类型的值。
         * 数字类型	   number	 双精度 64 位浮点值。它可以用来表示整数和分数。
         * 字符串类型  string	 一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式。let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;
         * 布尔类型	   boolean 	 表示逻辑值：true 和 false。 let flag: boolean = true;
         * 数组类型	   无	     声明变量为数组。//在元素类型后面加上[] let arr: number[] = [1, 2];  //或者使用数组泛型 let arr: Array<number> = [1, 2];
         * 元组        无	    元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。 let x: [string, number]; x = ['Runoob', 1];  
         * 枚举	      enum	    枚举类型用于定义数值集合。enum Color {Red, Green, Blue};   let c:Color = Color.Blue;  
         * void       void	    用于标识方法返回值的类型，表示该方法没有返回值。
         * null	      null	    表示对象值缺失
         * undefined  undefined	用于初始化变量为一个未定义的值
         * never	  never	    never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
        */
        let a:number = 10;
        a = null;
        a = undefined;
        console.log(a);

        /** 变量声明
         * 变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名
         * TypeScript 遵循强类型，如果将不同的类型赋值给变量会编译错误
         * 类型断言（Type Assertion） 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型
         */
        var b;
        console.log(typeof(b));

        let a1:string = '1';
        let b1:number = (a1 as any) as number;
        console.log(b1, typeof(b1), b1+10);

        /** 变量作用域
            变量作用域指定了变量定义的位置。
            程序中变量的可用性由变量作用域决定。
            TypeScript 有以下几种作用域：
            全局作用域 − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
            类作用域 − 这个变量也可以称为 字段。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
            局部作用域 − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。
            var global_num = 12          // 全局变量
            class Numbers { 
                num_val = 13;            // 实例变量
                static sval = 10;        // 静态变量
                storeNum():void { 
                    var local_num = 14;  // 局部变量
                } 
            } 
        */

        /** 运算符
         * typeof 是一元运算符，返回操作数的数据类型
         * instanceof 运算符用于判断对象是否为指定的类型，后面章节我们会具体介绍它。
         */
        
        /**  循环
         * TypeScript 还支持 for…of 、forEach、every 和 some 循环。
         * for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，
         * 并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。
         * 
         * forEach、every 和 some 是 JavaScript 的循环语法，TypeScript 作为 JavaScript 的语法超集，当然默认也是支持的。
         * 因为 forEach 在 iteration 中是无法返回的，所以可以使用 every 和 some 来取代 forEach。
         */
        let someArray = [1, "string", false];
        for (let entry of someArray) {
            console.log(entry); // 1, "string", false
        }


        /** 函数
         * 1.可选参数 funcTest1
         * 2.默认参数 funcTest2
         * 3.剩余参数 funcTest3
         * 4.匿名函数 funcTest4 匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。
         * 将匿名函数赋值给一个变量，这种表达式就成为函数表达式
         * 5.匿名函数自调用
         * 6.构造函数
         * 7.递归函数
         * 8.Lambda函数
         * 9.函数重载  没意义 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。 每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。
         */
        this.funcTest1("000");
        this.funcTest1("111", "可选参数");
        this.funcTest2("333");
        this.funcTest2("333", "444");
        this.funcTest3("000", "111");
        this.funcTest3("000", "111","222","333","444");
        let funcTest4 = function(parameter:string) {
            return parameter;
        }
        console.log(funcTest4("匿名函数"));
        //匿名函数自调用
        (function() { var x = "匿名函数自调用"; console.log(x) })()
        //构造函数
        var myFunction = new Function("a", "b", "return a * b"); 
        var x = myFunction(4, 3); 
        console.log(x);
        //Lambda函数
        var funcTest5 = (x:number)=> {    
            let v = this.b + x 
            console.log("Lambda函数: " + v)  
        } 
        funcTest5(100)

        /**
         * Number  对象是原始数值的包装对象。
         * 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。
         */
        let num:number = parseInt("11")
        if (isNaN(num))
        {
            console.log("转换失败");
        }
        else
        {
            console.log("转换成功");
        }

        if (NaN == num)
        {
            console.log("转换失败222");
        }
        else
        {
            console.log("转换成功222");
        }
        console.log("字符串转数字：", num);
        //可表示的最大的数，MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。
        console.log(Number.MAX_VALUE);
        //可表示的最小的数，即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE，MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。
        console.log(Number.MIN_VALUE);
        //负无穷大，溢出时返回该值。该值小于 MIN_VALUE。
        console.log(Number.NEGATIVE_INFINITY);
        //正无穷大，溢出时返回该值。该值大于 MAX_VALUE。
        console.log(Number.POSITIVE_INFINITY);


        /** 数组
         * 
         */
        let arrayList1:number[] = new Array(4);
        let arrayList:string[] = ["11", "22", "33"]
        for (let i = 0; i < arrayList.length; i++)
        {
            console.log("arrayList: ", arrayList[i]);
        }
        let arrayList2:number[][]=[[1,2,3],[10,20,30]]
        for (let i = 0; i < arrayList2.length; i++)
        {
            for (let j = 0; j < arrayList2[i].length; j++)
            {
                console.log("arrayList2: ", arrayList2[i][j]);
            }
        }

        /** Map
         *  let myMap = new Map([
                ["key1", "value1"],
                ["key2", "value2"]
            ]); 
         */

        /** 元组
         * var mytuple = [10,"Runoob"];
         */

        /** 联合类型
         *  var val:string|number 
            val = 12 
            console.log("数字为 "+ val) 
            val = "Runoob" 
            console.log("字符串为 " + val)

            var arr:number[]|string[]; 
            arr = [1,2,4] 
            arr = ["Runoob","Google","Taobao"] 
         */

        /** 接口
            interface IPerson { 
                firstName:string, 
                lastName:string, 
                sayHi: ()=>string 
            } 
         */

        /** 类
        即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。
        类继承使用关键字 extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。
        TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。

        public（默认） : 公有，可以在任何地方被访问。
        protected : 受保护，可以被其自身以及其子类和父类访问。
        private : 私有，只能被其定义所在的类访问。

        class Car { 
            // 字段
            engine:string; 
            // 构造函数
            constructor(engine:string) { 
                this.engine = engine 
            }  
            // 方法
            disp():void { 
                console.log("函数中显示发动机型号  :   "+this.engine) 
            } 
        } 
        // 创建一个对象
        var obj = new Car("XXSY1")
        // 访问字段
        console.log("读取发动机型号 :  "+obj.engine)  
        // 访问方法
        obj.disp()
        */

        let shape:Shape = new Circle("圆");
        shape.showName(); //Circle 形状名字： 圆
        // 类型判断
        let isCircle:boolean = shape instanceof Circle;
        console.log("isCircle: ", isCircle);
        let isShape:boolean = shape instanceof Shape;
        console.log("isShape: ", isShape);
        let isTestRole:boolean = shape instanceof TestRole;
        console.log("isTestRole: ", isTestRole);
        // 访问静态方法
        console.log(Circle.count);
        console.log(Circle.Count());
        // 接口继承
        let test:TestInterface = new TestRole("hayden");
        test.showTestName();
        //let isTestInterface:boolean = test instanceof TestInterface;
        //console.log("isTestInterface: ", isCircle);
        let isTestRole11:boolean = test instanceof TestRole;
        console.log("isTestRole: ", isTestRole11);
      

        /** 对象
         var object_name = { 
                key1: "value1", // 标量
                key2: "value",  
                key3: function() {
                    // 函数
                }, 
                key4:["content1", "content2"] //集合
            }
         */

        /** 命名空间
         namespace SomeNameSpaceName { 
            export interface ISomeInterfaceName {      }  
            export class SomeClassName {      }  
        }
         */

        /** 模块
         * import 和 export 建立
         */
    

        console.log("--------------------------", Shape.Shape_XXX);
    }

    public funcTest1(firstName: string, lastName?: string) 
    {
        console.log(firstName, lastName);
    }
    public funcTest2(firstName: string, lastName:string = "默认参数") 
    {
        console.log(firstName, lastName);
    }
    public funcTest3(firstName:string, ...lastName:string[]) 
    {
        console.log(firstName, lastName.join(" "));
        for (let i = 0; i < lastName.length; i++)
        {
            console.log(lastName[i]);
        }
    }
}
