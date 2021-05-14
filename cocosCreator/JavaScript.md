## 代码风格
### 2.1 文件
**[强制] JavaScript 文件使用无 `BOM` 的 `UTF-8` 编码。**
UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰。


**[建议] 有时我们会使用一些特殊标记进行说明。特殊标记必须使用单行注释的形式。下面列举了一些常用标记：**
解释：

1. `TODO`: 有功能待实现。此时需要对将要实现的功能进行简单说明。
2. `FIXME`: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
3. `HACK`: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
4. `TF`: 该处存在陷阱。此时需要对陷阱进行描述。


## 3 语言特性
### 3.1 变量

**[强制] 变量在使用前必须先定义。**
**[建议] 采用`let`对变量进行定义**
解释：

不通过 var、let 定义变量将导致变量污染全局环境。

示例：

```javascript
// good
var name = "MyName";
let name = "MyName"

// bad
name = "MyName";
```

原则上不建议使用全局变量，对于已有的全局变量或第三方框架引入的全局变量，使用前需进行空判断。

示例：
```javascript
/* globals*/
if (typeof qq == "undefined"){
    
}
if (typeof wx == "undefined"){
    
}
```

**[强制] 每个 `var`、`let` 只能声明一个变量。**

解释：
一个 `var`、`let` 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆。

示例：
```javascript
// good
var hangModules = [];
var missModules = [];
var visited = {};

// bad
var hangModules = [],
    missModules = [],
    visited = {};
```

**[强制] 变量必须 `即用即声明`，不得在函数或其它形式的代码块起始位置统一声明所有变量。**

解释：
变量声明与使用的距离越远，出现的跨度越大，代码的阅读与维护成本越高。虽然JavaScript的变量是函数作用域，还是应该根据编程中的意图，缩小变量出现的距离空间。


### 3.2 条件

**[建议] 尽可能使用简洁的表达式。**

示例：
```javascript
// 字符串为空

// good
if (!name) {
    // ......
}

// bad
if (name == "") {
    // ......
}
```

```javascript
// 字符串非空

// good
if (name) {
    // ......
}

// bad
if (name != "") {
    // ......
}
```

```javascript
// 布尔不成立

// good
if (!notTrue) {
    // ......
}

// bad
if (notTrue == false) {
    // ......
}
```

**[建议] 按执行频率排列分支的顺序。**

解释：
按执行频率排列分支的顺序好处是：
1. 阅读的人容易找到最常见的情况，增加可读性。
2. 提高执行效率。


**[建议] 对于相同变量或表达式的多值条件，用 `switch` 代替 `if`。**

示例：
```javascript
// good
switch (typeof variable) {
    case 'object':
        // ......
        break;
    case 'number':
    case 'boolean':
    case 'string':
        // ......
        break;
}

// bad
var type = typeof variable;
if (type === 'object') {
    // ......
}
else if (type === 'number' || type === 'boolean' || type === 'string') {
    // ......
}
```

**[建议] 如果函数或全局中的 `else` 块后没有任何语句，可以删除 `else`。**

示例：
```javascript
// good
function getName() {
    if (name) {
        return name;
    }
    return 'unnamed';
}

// bad
function getName() {
    if (name) {
        return name;
    }
    else {
        return 'unnamed';
    }
}
```

### 3.3 循环

**[建议] 不要在循环体中包含函数表达式，事先将函数提取到循环体外。**

解释：
循环体中的函数表达式，运行过程中会生成循环次数个函数对象。

示例：
```javascript
// good
function clicker() {
    // ......
}

for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    addListener(element, 'click', clicker);
}


// bad
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    addListener(element, 'click', function () {});
}
```

**[建议] 对循环内多次使用的不变值，在循环外用变量缓存。**

示例：
```javascript
// good
var width = wrap.offsetWidth;
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    element.width = width;
    // ......
}


// bad
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    element.width = wrap.offsetWidth;
    // ......
}
```


**[强制] 对有序集合进行遍历时，缓存 `length`。**

解释：
虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 `length` 访问时会动态计算元素个数，此时缓存 `length` 能有效提高程序性能。


示例：
```javascript
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    // ......
}
```


### 3.4 类型

#### 3.4.1 类型检测

**[建议] 类型检测优先使用 `typeof`。对象类型检测使用 `instanceof`。`null` 或 `undefined` 的检测使用 `== null`。**

示例：
```javascript
// string
typeof variable === 'string'

// number
typeof variable === 'number'

// boolean
typeof variable === 'boolean'

// Function
typeof variable === 'function'

// Object
typeof variable === 'object'

// RegExp
variable instanceof RegExp

// Array
Array.isArray(variable)

// null
variable === null

// null or undefined
variable == null

// undefined
typeof variable === 'undefined'
```


#### 3.4.2 类型转换


**[强制] 转换成 `string` 时，使用 `+ ''`。**

示例：
```javascript
// good
num + '';

// bad
new String(num);
num.toString();
String(num);
```

**[强制] 转换成 `number` 时，使用 `+`、`|0`、`>>0`、`<<0`。**

示例：
```javascript
// good
+str;
str >> 0;
str | 0;

// bad
Number(str);
```

**[建议] `string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`。**

示例：
```javascript
var width = '200px';
parseInt(width, 10);
```

**[强制] 使用 `parseInt` 时，必须指定进制。**

示例：
```javascript
// good
parseInt(str, 10);

// bad
parseInt(str);
```

**[建议] 转换成 `boolean` 时，使用 `!!`。**

示例：
```javascript
var num = 3.14;
!!num;
```

**[强制] 范围在（2147483648，-2147483648）间的`number` 去除小数点，使用`|0`、`>>0`、`<<0`、 `~~`**

示例：
```javascript
// good
var num = 3.14;
num = num | 0;

// bad
var num = 3.14;
parseInt(num, 10);
```

### 3.5 字符串


**[强制] `纯文本`、`json`中使用双引号`"`。**
示例：
```javascript
var str = "我是一个字符串";
```

**[强制] `require`、`属性`使用单引号`'`。**
示例：
```javascript
require('./src/com/black8/game/util/AutoLayoutUtil');

var result = {
    'code': 0,
    'msg' : "成功"
};
```


**[强制] 使用 `+` 拼接字符串。**
解释：
1. 使用 `+` 拼接字符串，如果拼接的全部是 StringLiteral，压缩工具可以对其进行自动合并的优化。所以，静态字符串建议使用 `+` 拼接。
2. 在现代浏览器下，使用 `+` 拼接字符串，性能较数组的方式要高。


### 3.6 对象

**[强制] 使用对象字面量 `{}`或者`b8e.createMap()`创建新 `Object`。**
示例：
```javascript
// good
var obj = {};
var obj = b8e.createMap();

// bad
var obj = new Object();
```

**[建议] 对象创建时，如果一个对象的所有 `属性` 均可以不添加引号，建议所有 `属性` 不添加引号。**
示例：
```javascript
var info = {
    name: 'someone',
    age: 28
};
```

**[建议] 对象创建时，如果任何一个 `属性` 需要添加引号，则所有 `属性` 建议添加 `'`。**

解释：
如果属性不符合 Identifier 和 NumberLiteral 的形式，就需要以 StringLiteral 的形式提供。

示例：
```javascript
// good
var info = {
    'name': 'someone',
    'age': 28,
    'more-info': '...'
};

// bad
var info = {
    name: 'someone',
    age: 28,
    'more-info': '...'
};
```

**[强制] 属性访问时，尽量使用 `.`。**

解释：
属性名符合 Identifier 的要求，就可以通过 `.` 来访问，否则就只能通过 `[expr]` 方式访问。
通常在 JavaScript 中声明的对象，属性命名是使用 lowerCamelCase 命名法，用 `.` 来访问更清晰简洁。部分特殊的属性（比如来自后端的 JSON ），可能采用不寻常的命名方式，可以通过 `[expr]` 方式访问。

示例：
```javascript
//good
roleData.id;
skin.okBtn;

//bad
roleData['id'];
skin['okBtn'];
```

### 3.7 数组

**[强制] 使用数组字面量 `[]` 创建新数组，除非想要创建的是指定长度的数组。**

示例：
```javascript
// good
var arr = [];

// bad
var arr = new Array();
```

**[强制] 清空数组使用 `.length = 0`。**

示例：
```javascript
var arr = [0,1,2,3];

//good
arr.length = 0;

//bad
arr = []
```

**[强制] 删除数组中元素，从后往前进行遍历。**
**[建议] 有删除需求尽量采用 `b8e.HashMap`、`b8e.LinkedList` 来存储数据。**

解释：
循环中删除数据会让数组长度发生改变。

示例：

```javascript
var arr = [0,1,2,2,3];
//good
for(var i = arr.length; i > -1; i--){
    if(arr[i] == 2){
        arr.splice(i,1);
    }
}

//bad
for(var i = 0, len = arr.length; i < len; i++){
    if(arr[i] == 2){
        arr.splice(i,1);
    }
}
```


**[强制] 遍历数组不使用 `for in`、`forEach`。**

解释：
1. 数组对象可能存在数字以外的属性, 这种情况下 `for in` 不会得到正确结果。
2. 效率低。

示例：
```javascript
var arr = ['a', 'b', 'c'];

// 这里仅作演示, 实际中应使用 Object 类型
arr.other = 'other things';

// 正确的遍历方式
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(i);
}

// 错误的遍历方式
for (var i in arr) {
    console.log(i);
}
```

**[建议] 不因为性能的原因自己实现数组排序功能，尽量使用数组的 `sort` 方法。**

解释：
自己实现的常规排序算法，在性能上并不优于数组默认的 `sort` 方法。以下两种场景可以自己实现排序：

1. 需要稳定的排序算法，达到严格一致的排序结果。
2. 数据特点鲜明，适合使用桶排。


### 3.8 b8e.HashMap

**[强制] 键值为基本数据类型`Number`或者`String`。**

示例：
```javascript
var roleData = {
    id: 10,
    skin: 1837
}
var roleMap = b8e.HashMap.get();

//good
roleMap.set(roleData.id, roleData);

//bad
roleMap.set(roleData, roleData);
```

**[强制]修改引用类型数据，获取后直接修改值，不需要再调用`set`方法**

示例：
```javascript
//good
var roleData = roleMap.get(10);
if(roleData){
    roleData.skin = 2000;
}

//bad
var roleData = roleMap.get(10);
if(roleData){
    roleData.skin = 2000;
    roleMap.set(roleData.id, roleData);
}
```

### 3.9 b8e.LinkedList

**[建议] 数据插入、删除频繁，建议采用`b8e.LinkedList`。**

解释：
Array是基于索引(index)的数据结构，它使用索引在数组中搜索和读取数据是很快的。Array获取数据的时间复杂度是O(1),但是要删除数据却是开销很大的，因为这需要重排数组中的所有数据。而LinkedList中插入或删除的时间复杂度仅为O(1)。

### b8e.PoolObject

**[强制] 创建、销毁频繁的数据，继承`b8e.PoolObject`，创建时调用`get`方法，销毁时调用`release`方法，让数据回池。遵循哪里创建，哪里销毁的原则。**

```javascript
var SpriteStat = game.SpriteStat = b8e.PoolObject.extends({
    // ...
});
var pool = SpriteStat.pool = new b8e.Pool(SpriteStat, 128);
SpriteStat.get = function () {
    return pool.get();
};
SpriteStat.put = function (obj) {
    return pool.put(obj);
};
```

### 3.10 函数

#### 3.10.1 函数长度

**[建议] 一个函数的长度控制在 `50` 行以内。**

解释：
将过多的逻辑单元混在一个大函数中，易导致难以维护。一个清晰易懂的函数应该完成单一的逻辑单元。复杂的操作应进一步抽取，通过函数的调用来体现流程。
特定算法等不可分割的逻辑允许例外。


#### 3.10.2 参数设计

**[建议] 一个函数的参数控制在 `6` 个以内。**
解释：
除去不定长参数以外，函数具备不同逻辑意义的参数建议控制在 `6` 个以内，过多参数会导致维护难度增大。

**[建议] 通过 `options` 参数传递非数据输入型参数。**
解释：
有些函数的参数并不是作为算法的输入，而是对算法的某些分支条件判断之用，此类参数建议通过一个 `options` 参数传递。

如下函数：
```javascript
//good
const options = {
    id: 10000,
    icon: 'res/10000.png',
    isShowName: true,
    isShowNum: true,
    isAddEffect: false,
};
function createIcon(options) {
  // ...
}

//bad
function createIcon(id, icon, isShowName, isShowNum, isAddEffect){
  // ...
}
```

这种模式有几个显著的优势：

- `boolean` 型的配置项具备名称，从调用的代码上更易理解其表达的逻辑意义。
- 当配置项有增长时，无需无休止地增加参数个数，不会出现 `createIcon(id, true, false, false)` 这样难以理解的调用代码。
- 当部分配置参数可选时，多个参数的形式非常难处理重载逻辑，而使用一个 options 对象只需判断属性是否存在，实现得以简化。


**[强制] 具备强类型的设计。**

解释：
- 如果一个属性被设计为 `boolean` 类型，则不要使用 `1` 或 `0` 作为其值。对于标识性的属性，如对代码体积有严格要求，可以从一开始就设计为 `number` 类型且将 `0` 作为否定值。
- 变量为 `string` 类型，如果有对象或函数的接收类型为 `number` 类型，提前作好转换，而不是期望对象、函数可以处理多类型的值。

示例：
```javascript
//good
var isReady = false;

var a = '10';
var b = 5;
//a传入前，转换成number类型
function add(+a, b){
    return a + b;
}

//返回值一致
function test(){
    // ...
    if(...){
        return -1;
    }
    // ...
    if(...){
        return 1;
    }
    return 0;
}


//bad
var isReady = 0;

var a = '10';
var b = 5;
//直接把字符串传入，没有转换为number
function add(a, b){
    return a + b;
}

//返回值不一致
function test(){
    // ...
    if(...){
        return null;
    }
    // ...
    if(...){
        return true;
    }
    return 0;
}
```

#### 3.10.3 匿名函数

**[强制] 项目中非必要不允许使用匿名函数。**

示例：
```javascript
function createRole(info, callback){
    // ...    
};

//good
function _createComplete(){
    // ...
};

createRole(info, _createComplete);

//bad
createRole(info, function(){
    // ...
});

```

# 文件规范

## 1 脚本
### 1.1 文件名
**[强制] 首字母大写，不允许添加下划线，文件后缀名为小写。**

示例：

```javascript
//good
LoadingView.js

//bad
loadingView.js
loading_view.js
LoadingView.JS
```

### 1.2 文件中路径名
**[强制] 采用`Linux/Unix`文件路径风格。**
示例：

```javascript
//good
res/images/icon.png
    
//bad
res\\images\\icon.png
```

## 2 资源名、资源路径(包括ui预设)

**[强制] 小写字母数字加下划线组合，不允许出现其他字符，文件后缀名为小写。**
示例：

```javascript
//good
home.png
images/image/home/bg.png

//bad
Home.png
home.PNG
homeBg.png

home bg.png
home-bg.png

images/image/Home/bg.png
```

# git规范

## 工作流指南

### 1 分支分类
* 历史分支
master: 存储了正式发布的历史,为主分支(保护分支)，不能直接在master上进行修改代码和提交。
develop:作为功能的集成分支,开发完成需要提交测试的功能合并到该分支。
* 功能分支
feature: 大家根据不同需求创建独立的功能分支，开发完成后合并到develop分支。
* 维护分支
hotfix: 为bug修复分支，需要根据实际情况对已发布的版本进行漏洞修复，必须从master拉取。

### 2 命名规范

#### 2.1 分支命名

* 功能分支：feature/功能名称_开发者名字
* 维护分支：hotfix/功能名称_tapdid

    **例如：** (荒野探险)
    feature/hytx_xxm
    hotfix/hytx_10000
      
### 3 分支管理策略

#### 3.1 develop为集成开发分支

提交规则：
1. 自己分支自测完毕。
2. review通过再合并。
 
#### 3.2 本地分支管理

1. 本地分支要做到勤提交，分小功能提交。
2. 一个功能点一个分支(自己控制)。
3. 本地分支merge到develop分支时，必须先merge develop到本地分支，解决完冲突后再提交。

### 4 提交规范

#### 4.1 Commit
Commit message一般包括三部分：`Header`、`Body` 和 `Footer`。


**Header**

type(scope):subject

1. type：用于说明commit的类别，规定为如下几种
    * feature：新增功能；
    * fix：修复bug；
    * docs：修改文档；
    * refactor：代码重构，未新增任何功能和修复任何bug；
    * build：改变构建流程，新增依赖库、工具等（例如webpack修改）；
    * style：仅仅修改了空格、缩进等，不改变代码逻辑；
    * perf：改善性能和体现的修改；
    * chore：非src和test的修改；
    * test：测试用例的修改；
    * ci：自动化流程配置修改；
    * revert：回滚到上一个版本；
2. scope：【可选】用于说明commit的影响范围
3. subject：commit的简要说明，尽量简短

示例：
```
// feature类型实例 没有指定scope
feature: 新增荒野探险 1.0
feature: 迭代荒野探险 1.1
```

**Body**

1. 对本次commit的详细描述，可分多行

示例：
```
1、玩法规则
2、战斗系统
```

**Footer【可选】**

1. 不兼容变动：需要描述相关信息
2. 关闭指定tapd：输入tapd信息

示例：
```
关闭：#10000，#10001
```

完整实例：
```
feature：迭代荒野探险 1.1
//必须空行
1、新增xxx玩法
2、新增随机事件
```

```
fix：修复荒野探险系统bug
1、骰子数量显示不正确问题
2、战斗触发后，未进入战斗场景

关闭：#10000，#10001
```

**[强制] 同一功能的多次 `Commit`，合并成一个。**
 
解释：
 
做功能的时候，会遇到需要临时提交的情况（比如在做A任务，突然来了B任务，在A任务分支上会先commit一次，等B任务做完，再回来继续做A，做完之后会再次commit），此时一个任务有会有多个commit存在，会把整个提交历史搞混乱。
 
示例：

1. git log 查看当前的提交历史

比如需要将以下 3 个 commit 合并为一个 commit；

![](media/15950657322223/15961840463209.jpg)

2. git rebase 进行合并

    执行 git rebase -i HEAD~3 对最近的 3 个 commit 进行 rebase 操作；
    
* 进入如下图编辑界面:

![](media/15950657322223/15961841430093.jpg)

![](media/15950657322223/15961842669794.jpg)

* 根据需求，将commit内容编辑如下，保存退出

![](media/15950657322223/15961843469681.jpg)

* 继续进入编辑界面，可修改内容，保存退出

![](media/15950657322223/15961843907218.jpg)

* 看到下图信息，合并成功

![](media/15950657322223/15961844167212.jpg)

* 再次调用 git log，可看到合并后的commit

![](media/15950657322223/15961845354011.jpg)

#### 4.2 Rebase

**[建议] 用 `rebase` 代替 `merge` 来进行代码合并**

解释：

rebase可以让代码分支看起来更整洁。

示例：
```
git rebase -i develop
```

#### 4.3 Merge

代码提交`master`、`develop` 分支，请在gitlab 提交 merge request,负责人进行代码review后，才能同意合并操作，不允许直接在上述分支进行修改提交。










