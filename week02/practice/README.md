此目录存放课堂作业，可以在此文件添加作作业思路和对题目的看法

### js基础语法学习

#### 1、js的介绍

##### 1.1、是什么

JavaScript 是一种客户端动态脚本语言，它可以在网页上实现复杂的功能，网页展现给你的不再是简单的静态信息，而是实时的内容更新——交互式的地图、2D/3D 动画、滚动播放的视频等等。

##### 1.2、怎么使用

js不能独立使用，需要内嵌在HTML中，只要分为内嵌和外联两种方式。

内嵌方式：使用<script></script>包裹所写的js代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        alert("一个弹窗")
    </script>
</body>
</html>
```

外联方式：将js代码写在独立的js文件中，然后通过 script 标签的 src 属性引入。

在test.js文件写下如下代码：

```js
alert("外联方式下写的弹窗")
```

在html中引入该文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./test.js"></script>
</body>
</html>
```

当一个html中既有内嵌又要外联，需要使用不同的<script></script>标签来包裹或使用。如果只使用一个<script>则被包裹的js代码会失效。

##### 1.3、输入和输出语句

输出和输入可理解为人和计算机的交互，用户通过键盘、鼠标等向计算机输入信息，计算机处理后再展示结果给用户，这便是一次输入和输出的过程。

输入语句的使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // 输入语句,页面弹出输入框，输入值会被保存到name变量中
        let name = prompt("please input your name：")
    </script>
</body>
</html>
```

输出语句的使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
       // 输出语句，三个大类：弹窗，页面和调试台,将变量name的值三个方式进行输出
       const name = "html"
       // name的值通过弹窗显示出来
       alert(name)
       // 将name的值写入页面
       document.write(name)
       // 调试台,程序员使用
       console.log(name)
    </script>
</body>
</html>
```



#### 2、变量和数据类型

##### 2.1、是什么和基本使用

变量就是用来储存信息的。例如：网上商店 —— 这里的信息可能包含正在售卖的商品和购物车。聊天应用 —— 这里的信息可能包括用户和消息等等。变量本质：是程序在内存中申请的一块用来存放数据的小空间。

js创建变量：先声明再赋值。声明（定义）变量有两部分构成：声明关键字、变量名（标识）；常用的声明关键字有：let、const和var（老版，已放弃）

```js
let tomName = "tom"
const jackName = "jack"
console.log(tomName)
console.log(jackName)
var maryName = "mary" // 已放弃该声明方式
```

***let和const区别***：**只是在存储值的修改上的区别**

let通常声明可变的变量，即在声明后其存储的值会不断地进行更新。

const通常指声明的为常量，即其值只能读，不可更新其值。当程序员能确定这个变量永远不会改变的时候，就可以使用 `const` 来确保这种行为，并且清楚地向别人传递这一事实。

##### 2.2、变量名的命名规则

于变量的名称（标识符）需要遵守如下规则和规范。

> 规则（法律）
>
> 1. 只能是字母、数字、下划线、$，且不能能数字开头；
> 2. 字母区分大小写，如 Age 和 age 是不同的变量；
> 3. JavaScript 内部已占用于单词（关键字或保留字）不允许使用；例如let，const等
> 4. 尽量保证变量具有一定的语义，见字知义。
> 5. 起名要有意义；
> 6. 遵守小驼峰命名法，第一个单词首字母小写，后面每个单词首字母大写，例：userName。

##### 2.3、数据类型

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）。

**2.3.1、Number类型和字符串**

*number* 类型代表整数和浮点数。

数字可以有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括所谓的“特殊数值”也属于这种类型：`Infinity`、`-Infinity` 和 `NaN`。`Infinity `代表数学概念中的 [无穷大](https://en.wikipedia.org/wiki/Infinity) ∞。是一个比任何数字都大的特殊值。`NaN`代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果。`NaN`是粘性的。任何对 `NaN` 的进一步数学运算都会返回 `NaN`

字符串：通过单引号（''） 、双引号（ “”）或反引号( `` ) 包裹的数据都属于字符串。单引号/双引号可以互相嵌套，但是不以自已嵌套自已。

``` js
let num1 = 12
let num2 = 12.34
let computer = "联想笔记本"
let phone = '华为手机'
let tel = '12345678900'
```

模板字符串：拼接字符串和变量的使用场景。`${…}` 内的表达式会被计算，计算结果会成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如名为 `name` 的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

```js
let tomName = "tom"
console.log(`my name is ${tomName} `) // 输出my name is tom
console.log('my name is' + tomName) // 输出my name is tom
```

**2.3.2、Boolean类型**

boolean 类型仅包含两个值：`true` 和 `false`。

这种类型通常用于存储表示 yes 或 no 的值：`true` 意味着 “真，正确”，`false` 意味着 “假，不正确”。布尔值也可作为比较的结果：

```js
let isfalse = False // 假
let is true = true  // 真
```

JavaScript 中有八种基本的数据类型。

- 七种原始数据类型（基本数据类型）：
  - `number` 用于任何类型的数字：整数或浮点数，在 `±(253-1)` 范围内的整数。
  - `bigint` 用于任意长度的整数。
  - `string` 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
  - `boolean` 用于 `true` 和 `false`。
  - `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
  - `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
  - `symbol` 用于唯一的标识符。
- 以及一种非原始数据类型（复杂数据类型）：
  - `object` 用于更复杂的数据结构。

我们可以通过 `typeof` 运算符查看存储在变量中的数据类型。

- 通常用作 `typeof x`，但 `typeof(x)` 也可行。

- 以字符串的形式返回类型名称，例如 `"string"`。

- `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。

  ​


####  3、JS运算

##### 3.1、数学运算

算术运算符：也叫数学运算符，主要包括加+、减-、乘*、除/、取余（求模）%、幂**等。

> 注意：在计算失败时，显示的结果是 NaN （not a number）。

```js
// 算术运算符
console.log(1 + (2 * 3) / 2); //  4
let num = 10;
console.log(num + 10); // 20
console.log(num - num); // 0
console.log(num**2); // 100

// 1. 取模(取余数)  使用场景：  用来判断某个数是否能够被整除
console.log(4 % 2); //  0
console.log(6 % 3); //  0
console.log(5 % 3); //  2
console.log(3 % 5); //  3

// 2. 注意事项 : 如果我们计算失败，则返回的结果是 NaN (not a number)
console.log("张三" - 2);
console.log("张三" * 2);
console.log("张三" + 2); // 张三2
```

##### 3.2、赋值运算符

赋值运算符：对变量进行赋值的运算符，将等号右边的值赋予给左边的变量（容器）。

| 运算符 | 作用     |
| ------ | -------- |
| +=     | 加法赋值 |
| -+     | 减法赋值 |
| *=     | 乘法赋值 |
| /=     | 除法赋值 |
| %=     | 取余赋值 |

```js
// 加法赋值
let num = 10;
num += 10
console.log(num); // 20
// 减法赋值
num -= 10
console.log(num); // 10
// 乘法赋值
num *= 10
console.log(num); // 100
// 除法赋值
num /= 10
console.log(num); // 10
// 取余赋值
num %= 2
console.log(num); // 0
```

##### 3.3、自增自减运算符

对一个数进行加一、减一是最常见的数学运算符之一。所以，对此有一些专门的运算符：

> **自增** `++` 将变量与 1 相加  **自减** `--` 将变量与 1 相减

| 符号 | 作用 | 说明                       |
| ---- | ---- | -------------------------- |
| ++   | 自增 | 变量自身的值加1，例如：x++ |
| --   | 自减 | 变量自身的值减1，例如：x-- |

> Tips：x++ 或者 ++x，如果参与了运算二者是有区别的。

```js
// 1. 自增运算符： 可以让变量里面的值加1
// let x = 3
// // x++   // x = x + 1 或者  x += 1
// ++x
// console.log(x)

// 2. ++在前和++在后的区别。 如果单独使用，没有区别，如果参与了运算就有区别
// 2.1 ++在前  前缀式 ： 先对变量值+1， 然后拿着变量值做运算
// let x = 3
// let y = ++x
// console.log(y) // 4
// console.log(x) // 4

// 2.2 ++在后 后缀式 ： 先拿着变量值运算，再对变量值+1
let x = 3;
let y = x++;
console.log(y); // 3
console.log(x); // 4
```

##### 3.4、比较运算符

使用场景：比较两个数据大小、是否相等，根据比较结果返回一个布尔值（true / false）。

| 运算符  | 作用                                   |
| ------- | -------------------------------------- |
| >       | 左边是否大于右边                       |
| <       | 左边是否小于右边                       |
| >=      | 左边是否大于或等于右边                 |
| <=      | 左边是否小于或等于右边                 |
| **===** | **左右两边是否类型和值都相等（重点）** |
| ==      | 左右两边值是否相等                     |
| !=      | 左右值不相等                           |

```js
// 比较运算符： 根据比较结果返回 布尔值 true / false
console.log(3 > 5); // false
console.log(3 < 5); // true
console.log(3 >= 5); //  false
console.log(3 >= 3); // true
console.log(3 <= 5); // true

// console.log(3 = 3)  // 错误
// 1. 判断是否相等我们使用 ===  要求 值 和 数据类型都相等返回的结果才是 true，提倡使用三等  全等
console.log(3 === 3); // true
console.log(3 === "3"); //  false

console.log(3 !== 3); // false
console.log(3 !== "3"); // true

// 2. == 判断是否相等，使用较少, 判断值是否相等，并不判断数据类型是否相等
console.log(3 == 3); // true
console.log(3 == "3"); // true
console.log(3 != 3); // false
```

#####  3.5、逻辑运算符

JavaScript 中有四个逻辑运算符：`||`（或），`&&`（与），`!`（非），`??`（空值合并运算符）

使用场景：可以把多个布尔值放到一起运算，最终返回一个布尔值。

| 符号 | 名称     | 日常读法 | 特点                           | 口诀           |
| ---- | -------- | -------- | ------------------------------ | -------------- |
| &&   | 逻辑与   | 并且     | 符号两边有一个假的结果为假     | 一假则假       |
| \|\| | 逻辑或   | 或者     | 符号两边有一个真的结果为真     | 一真则真       |
| !    | 逻辑非   | 取反     | true变false false变true        | 真变假，假变真 |
| ??   | 空值合并 | 已定义的 | 获得两者中的第一个“已定义的”值 | 有值取值       |

```js
// 逻辑运算符: 逻辑与 &&  逻辑或 ||  逻辑非 !
// 1.逻辑与 &&  一假则假
console.log(false && false); // false
console.log(false && true); // false
console.log(true && false); // false
console.log(true && true); // true
console.log(3 > 5 && 2 < 4); // false
// 判断某个数字是否在 8096 到 36999 之间：数字大于等于 8096 并且小于等于36999
let num = 1000;
console.log(num >= 8096 && num <= 36999); // false

console.log("------");
// 2. 逻辑或 ||   一真则真
console.log(true || false); // true
console.log(false || true); // true
console.log(true || true); // true
console.log(false || false); // false
console.log("------");

// 3. 逻辑非 取反
console.log(!false); // true
console.log(!true); // false

// 4.空值合并 已定义的
let user;
console.log(user ?? "匿名"); // 匿名（user 未定义）
user = "John";
console.log(user ?? "匿名"); // John（user 已定义）
```



#### 4、类型转换

类型转换：把一种数据类型转换成另外一种数据类型

数据类型转换可以分为：显式转换和隐式转换。

##### 4.1、显式类型转换

显式转换：自己手动写代码告诉系统该转成什么类型（数据类型明确、程序员主导）。有三种常用的类型转换：转换为 string 类型、转换为 number 类型和转换为 boolean 类型。

**转换成数字类型**

1. Number（数据）
   ◦ 转换成功返回一个数字类型；
   ◦ 转换失败则返回 NaN（例如数据里面包含非数字）。

2. parseInt（数据）
   ◦ 只保留整数；
   ◦ 如果数字开头的字符串，只保留整数数字 比如 12px 返回 12。

3. parseFloat（数据）
   ◦ 可以保留小数；
   ◦ 如果数字开头的字符串，可以保留小数 比如 12.5px 返回 12.5。

   ```js
   // 第一个数字
   let num1 = prompt("请输入第一个月工资:");
   // 第二个数字
   let num2 = prompt("请输入第二个月工资:");
   //  输出结果
   alert(Number(num1) + Number(num2));

   // 通过显示转换的方式把其他类型转换为数字型
   // 1. Number() 最常用的一种方式 推荐
   // 1.1 把字符串转换为数字型
   console.log(typeof Number("1")); // 1   number
   console.log(Number("abcd")); // NaN 如果无法完成转换则返回NaN

   // 1.2 把布尔值转换为数字型 true false
   console.log(Number(true)); // 1
   console.log(Number(false)); // 0

   // 1.3 把 null undefined 转换为数字型
   console.log(Number(null)); // 0
   console.log(Number(undefined)); // NaN

   // 2. parseInt() 和 parseFloat() 固定使用场景的   100px 只要100 不要px
   // 使用场景：把以数字开头的字符串，只保留数字这种情况下就可以使用
   console.log(parseInt("100px")); // 100
   console.log(parseInt("100.5px")); // 100  parseInt() 只保留整数
   console.log(parseFloat("100.5px")); // 100.5 parseFloat() 可以返回小数
   ```

**转换为字符串和布尔型**

显式地调用 `String(value)` 来将 `value` 转换为字符串类型；或者变量.toString(进制)有进制的转换。

布尔（boolean）类型转换是最简单的一个。它发生在逻辑运算中，也可以通过调用 Boolean(value) 显式地进行转换。

转换规则如下：

- 直观上为“空”的值（如 `0`、空字符串、`null`、`undefined` 和 `NaN`）将变为 `false`。
- 其他值变成 `true`。

```js
// 1. 转换为字符串类型
// 1.1 String(数据) 开发中提倡使用这种方式
console.log(typeof String(1)); // '1'     string
console.log(String(true)); // 'true'     string

// 1.2 变量.toString(进制)
let num = 10;
console.log(typeof num.toString()); //  string
console.log(num.toString(10)); //  string   '10'
console.log(num.toString(8)); //  string   '12'

// 2. 转换为布尔型 Boolean  (重点) 因为接下来我们要学习分支语句需要用到
// 2.1 有6种情况为false： false 0 '' null undefined NaN (无，没有)
// 2.2 其余的都为true
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
```

##### 4.2、隐式转换

某些运算符被执行时，系统内部自动将数据类型进行转换，这种转换称为隐式转换。

转换成数字型：算数运算符和+作为正号时可以把字符串转换为数字型

转换成字符串：+作为正号时可以把字符串转换为数字型

转换为布尔型：!逻辑非

```js
// 1. 隐式转换为数字型的运算符
// 1.1 算术运算符 - *  /   比较运算符  >   ==
console.log(8 - "3"); // 5
console.log("1999" * "2"); //  3998
console.log(3 > "1"); // true
console.log(3 == "3"); // true

// 1.2 + 正号使用的时候，也会把字符串转换为 数字型
console.log("123"); // '123'
console.log(+"123"); // 123
console.log(typeof +"123"); // number

// 2. 隐式转换为字符串型的运算符   + 拼接字符串 两侧只要有一个是字符串，结果就是字符串
console.log("pink" + 18);
console.log("" + 18); // '18'

// 3. 隐式转换为布尔型的运算符  ！逻辑非
console.log(!true); // false
console.log(!0); // true
console.log(!""); // true
console.log(!null); // true
console.log(!undefined); // true
console.log(!NaN); // true
console.log(!false); // true
console.log(!"pink"); // false
```



#### 5、分支和循环结构

##### 5.1、分支语句

分支语句可以根据条件判定真假，来选择性的执行想要的代码，分支语句包含：

1. if 分支语句（重点）；
2. 三元运算符；
3. switch 语句。

**if 分支语句**

```js
if (条件表达式1) {
    // 需要执行的语句
} else if (条件表达式1) {
    // 需要执行的语句
} else {
    // 需要执行的语句
}
```

• 小括号内，条件表达式的结果是布尔值，为 true 则进入大括号执行代码；为 false 则不执行大括号里面代码；
• 小括号内的结果若不是布尔类型时，会发生隐式类型转换为布尔值，类似 Boolean()；
• 如果大括号只有一个语句，大括号可以省略，但是，俺们不提倡这么做~

**三元运算符**

> 使用场景： 一些简单的双分支，可以使用三元运算符（三元表达式），写起来比 if...else 双分支更简单。
> 符号：? 与 : 配合使用，语法如下：

```js
// 条件?表达式1：表达式2
// 执行过程 
// 如果条件为真，则执行表达式1
// 如果条件为假，则执行表达式2

// 验证 5 > 3 ? '真的' : '假的'
console.log(5 < 3 ? '真的' : '假的')

// 4. 练习  求2个数字的最大值
// let x = 10
let x = 100
let y = 20
console.log(x > y ? x : y)
```

**switch 语句**

> 使用场景：适合于有多个条件的时候，也属于分支语句，大部分情况下和 if 多分支语句功能相同。

1. switch...case 语句一般用于等值判断，if 适合于区间判断；
2. switch...case 一般需要配合 break 关键字使用，没有 break 会造成 case 穿透；
3. if 多分支语句开发要比 switch 更重要，使用也更多。

```js
// switch分支语句
// 1. 语法
// switch (表达式) {
//   case 值1:
//     代码1
//     break

//   case 值2:
//     代码2
//     break
//   ...
//   default:
//     代码n
// }

// 2. 体验: 查询水果价格，输入水果，得到当前水果价格
let fruits = "苹果";
switch (fruits) {
  case "香蕉":
    alert("香蕉的价格是: 3元/斤");
    break;
  case "苹果":
    alert("苹果的价格是: 4元/斤");
    break;
  case "橘子":
    alert("橘子的价格是: 2元/斤");
    break;
  default:
    alert("没有查到此水果");
}

// 3. 注意事项
// 3.1  switch适合于等值判断， if多分支适合于区间判断
// 3.2  表达式的值要求 全等于 === case的值，才是能匹配上
// 3.3  break如果落下了，容易造成case穿透
```

##### 5.2、循环语句

> 使用场景：重复执行指定的一段代码，比如我们想要输出 10 次“我学的很棒”，常见的有 while 和 for 两种循环方式。
>
> 记住循环的三要素。
>
> 1. 初始值 （经常用变量）；
> 2. 循环条件；
> 3. 变量计数（常用自增或者自减）。

**while循环**

```js
// 语法
// while (条件表达式1) {
//     //执行语句
// }
// while循环：重复执行代码

// 需求：利用循环重复打印 3 次 '月薪过万不是梦，毕业时候见英雄'
let i = 1;
while (i <= 3) {
  document.write("月薪过万不是梦，毕业时候见英雄~<br>");
  i++; // 这里千万不要忘了变量自增否则造成死循环
}
```

**for循环**

> 作用：重复执行指定的一段代码，它可以把声明初始值、循环条件、变量计数写到一起，让人一目了然，是最常使用的循环形式，语法如下

```js
// for循环：重复执行一段代码
// 1. 语法
// for(初始值; 循环条件; 变量计数) {
//   // 循环体
// }

// 2. 需求： 重复打印 3 次
// '月薪过万不是梦，毕业时候见英雄。键盘敲烂要行动，前端行业一览众'
for (let i = 1; i <= 3; i++) {
  document.write("键盘敲烂要行动，前端行业一览众~ <br>");
}
```

**终止循环**

> break 中止整个循环，一般用于结果已经得到，后续的循环不再需要进行（提高效率）。
> continue 中止本次循环，一般用于排除或者跳过某一个选项的时候。

```js
// 1. break 中止整个 for 循环，一般用于结果已经得到, 后续的循环不需要的时候可以使用
// for (let i = 1; i <= 6; i++) {
//   document.write(`我是第${i}个孩子 <br>`)
//   if (i === 3) {
//     break
//   }
// }

// 2. continue 中止本次循环，一般用于排除或者跳过某一个选项的时候
for (let i = 1; i <= 6; i++) {
  // 先验票，再进入电影院
  if (i === 3) {
    continue;
  }
  document.write(`第${i}个孩子可以进入电影院<br>`);
}
```

##### 5.3、循环嵌套

> JavaScript 中任何一种循环语句都支持循环的嵌套，语法如下所示：

```js
// for（初始化; 循环条件;变量计数） {
//   for (初始化; 循环条件；变量计数）{
//     //  要重复执行的代码
//   }
 // }

// 例如
// 1. 外面的循环 记录第n天 
for (let i = 1; i < 4; i++) {
    document.write(`第${i}天 <br>`)
    // 2. 里层的循环记录 几个单词
    for (let j = 1; j < 6; j++) {
        document.write(`记住第${j}个单词<br>`)
    }
}
// 记住，外层循环循环一次，里层循环循环全部。
```



#### 6、js数组

##### 6.1、访问数组

数组：(Array) 是一种数据类型，属于引用数据类型。其作用：可以存储多个数据，例如我要保存咱们班同学的姓名，使用数组非常方便。

**定义数组**

```js
// 1. 语法，使用 [] 来定义一个空数组
// 定义一个空数组，然后赋值给变量 classes
// let classes = []

// 2. 定义非空数组
let classes = ["小明", "小刚", "小红", "小丽", "小米"];
```

通过 [] 定义数组，数组中可以存放真正的数据，如小明、小刚、小红等这些都是数组中的数据，我们这些数据称为数组单元，数组单元之间使用英文逗号分隔。

**访问数组**

- 使用数组存放数据并不是最终目的，关键是能够随时的访问到数组中的数据（单元）；

- 其实 JavaScript 为数组中的每一个数据单元都编了号，通过数据单元在数组中的编号便可以轻松访问到数组中的数据单元，我们将数据单元在数组中的编号称为索引值，也有人称其为下标；

- 索引值实际是按照数据单元在数组中的位置依次排列的，注意是从 0 开始的.

  数组作为数据的集合，它的单元值可以是任意数据类型。

```js
// 数组： 可以单个变量下存储多个数据
// 1. 声明数组
let names = ["小明", "小刚", "小红", "小丽", "小米"];
// let names = ['小明', '小刚', true, '小丽', 1]
console.log(names);
// 1.1 数组是按照顺序来存储的，每个数据都有自己的编号
// 1.2 编号是从0开始的， 0 1 2 3... 也称为 索引 或者 下标
// 1.3 数组里面可以存放任意的数据类型

// 2. 数组取值，数组名[下标]
console.log(names[0]); // '小明'
console.log(names[1]); // '小刚'
console.log(names[2]); // '小红'
console.log(names[3]); // '小丽'
console.log(names[4]); // '小米'

// a) 数组单元值的类型为字符类型
let list = ["HTML", "CSS", "JavaScript"];
// b) 数组单元值的类型为数值类型
let scores = [78, 84, 70, 62, 75];
// c) 混合多种类型
let mixin = [true, 1, false, "hello"];
```

**遍历数组**

> - 遍历数组：把数组中每个数据都访问到；
> - 数组长度： 数组 .length

```js
let arr = ["迪丽热巴", "古力娜扎", "佟丽丫丫", "玛尔扎哈", "哈尼克孜"];
// console.log(arr[0])
// console.log(arr[1])
// console.log(arr[2])
// console.log(arr[3])
// 遍历数组： 把数组里面的数据每个都会访问到
// for (let i = 0; i < 4; i++) {
//   // console.log(i)  数组名[索引号]
//   console.log(arr[i])
// }

// 1. 数组的长度 数组.length
// console.log(arr.length)  // 4
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

##### 6.2、操作数组

数组的本质是数据集合，操作数组无非就是对数组进行增、删、改、查等操作。

**查询数组和修改数组**

1. 查询
   语法：数组[索引]；
   返回值：如果查询不到则返回 undefined。
2. 修改
   语法：数组[索引] = 新值；
   返回值：如果下标不存在，则是新增一个数组元素，并修改了数组长度（尽量避免）。

```js
// 1. 查询数组元素
let arr = ["迪丽热巴", "古丽扎娜"];
console.log(arr[0]); //  '迪丽热巴'
console.log(arr[1]); //  '古丽扎娜'
console.log(arr[2]); //  undefined

// 2. 修改数组元素   数组[索引] = 新值
arr[1] = "佟丽丫丫";
// console.log(arr)
arr[3] = "古丽扎娜"; // 如果索引号不存在，则是增加数组元素 （不提倡）
console.log(arr);
console.log(arr.length); // 4 修改了数组长度
```

**新增**

```js
// 数组新增元素
// 1. 可以向数组的末尾新增1个或者多个数组元素 数组.push(元素1...元素n)
let arr = ["迪丽热巴"];
// console.log(arr.push('佟丽丫丫'))  // 返回的是新数组的长度 2
// arr.push('佟丽丫丫', '古丽扎娜')
// console.log(arr)  // 修改原数组

// 2. 可以向数组的开头增加1个或者多个数组元素 数组.unshift(元素1,...元素n)
// console.log(arr.unshift('佟丽丫丫'))  // 返回的是新数组的长度 2
arr.unshift("佟丽丫丫", "古丽扎娜");
console.log(arr); // 修改原数组
```

**删除**

```js
// 删除元素
// 1. 删除数组中的最后一个元素  数组.pop()  修改原数组
let arr = ["red", "green"];
// arr.pop()
// console.log(arr.pop())  // 返回的是被删除的元素
// console.log(arr)

// 2. 删除数组中的第一个元素 数组.shift() 修改原数组的
arr.shift();
// console.log(arr.shift())  // 返回的是被删除的元素
console.log(arr);
```

**数组的splice方法**

数组.splice() 方法可以添加、替换、删除数组元素，注意它会修改原数组。

> splice(start,deleteCount, item1, item2...)
>
> 1. start 表示起始位置；
> 2. deleteCount 表示删除元素的个数，是可选的，如果省略则从指定的起始位置删除到最后；
> 3. item1, item2... 表示新增的元素。

```js
// splice 删除和增加数组元素
let arr = ["迪丽热巴", "古力娜扎", "佟丽丫丫", "玛尔扎哈"];
// 1. splice 删除  数组.splice(起始位置, 删除几个)
// arr.splice(1, 1) // 记住起始位置是索引号，从0 开始数
// arr.splice(1) // 如果第二个参数（删除几个）省略了，则默认删除到最后
// console.log(arr)

// 2. splice 增加  数组.splice(起始位置, 删除几个, 新增元素1,...新增元素n)
arr.splice(1, 0, "刘德华", "张学友");
// 2.1 注意如果是新增，则起始位置是目标位置的索引号， 删除几个（第二个参数）不能省略我们写为 0， 后面写新增的元素
console.log(arr);

// 3. splice 不是替换pop shift  unshift push.  arr.splice(0, 1)
// 开头结尾找前面 pop shift  unshift push
// splice管中间
```



#### 7、js函数

函数是程序的主要“构建模块”。函数使该段代码可以被调用很多次，而不需要写重复的代码。我们已经看到了内建函数的示例，如 `alert(message)`、`prompt(message, default)` 和 `confirm(question)`。但我们也可以创建自己的函数。

##### 7.1、函数的基本使用

**声明函数**

声明（定义）一个完整函数包括关键字、函数名、形式参数、函数体、返回值5个部分，利用关键字 function 定义函数 （声明函数），语法如下：

```js
// 函数： 是可以被重复使用的代码块，作用是有利于代码复用
// 声明（定义）了最简单的函数，既没有形式参数，也没有返回值
function sayHi() {
  console.log("嗨~");
}

// 注意事项
// 函数名命名跟变量一致，采用小驼峰命名法；
// 函数名经常采用 动词。
```

**调用函数**

声明（定义）的函数必须调用才会真正被执行，使用函数名 + () 调用函数。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JavaScript 基础 - 声明和调用</title>
  </head>
  <body>
    <script>
      // 声明（定义）了最简单的函数，既没有形式参数，也没有返回值
      function sayHi() {
        console.log("嗨~");
      }
      // 函数调用，这些函数体内的代码逻辑会被执行
      // 函数名()
      sayHi();
      // 可以重复被调用，多少次都可以
      sayHi();
    </script>
  </body>
</html>
```



#### 8、js的对象

##### 8.1、对象的基本使用

 数据描述性的信息称为属性，如人的姓名、身高、年龄、性别等，一般是名词性的。
• 属性都是成对出现的，包括属性名和值，它们之间使用英文 : 分隔；
• 多个属性之间使用英文 , 分隔；
• 属性就是依附在对象上的变量（对象外是变量，对象内是属性）。

**定义对象属性**

```js
// 对象也是一种数据类型，保存数据同时可以更直观的描述事物
// 定义对象属性
const pig = {
  sex: "女",
  age: 4,
  uname: "佩奇",
  weight: 12.6,
}
```

**访问对象属性**

声明对象，并添加了若干属性后，可以使用 . 获得对象中属性对应的值，我称之为属性访问。

```js
// 对象也是一种数据类型，保存数据同时可以更直观的描述事物
// 1. 定义对象属性
const pig = {
  sex: "女",
  age: 4,
  uname: "佩奇",
  weight: 12.6,
};

// 2. 访问对象属性，对象.属性
console.log(pig.age) // 4
console.log(pig.weight) // 12.6
```

**定义对象方法**

 数据行为性的信息称为方法，如跑步、唱歌等，一般是动词性的，其本质是函数。
• 方法是由方法名和函数两部分构成，它们之间使用 : 分隔；
• 多个属性之间使用英文 , 分隔；
• 方法是依附在对象中的函数（对象外是函数，对象内是方法）。

```js
// let fn = function() {}
// 定义对象方法
const pig = {
  uname: "佩奇",
  sing: function () {
    console.log("唱歌");
  },
  dance: function () {
    console.log("跳舞");
  },
}
console.log(pig)
```

**调用对象方法**

声明对象，并添加了若干方法后，可以使用 . 调用对象中函数，我称之为方法调用。

```js
// let fn = function() {}
// 对象方法
// 1. 定义对象方法
let pig = {
  uname: "佩奇",
  sing: function () {
    console.log("唱歌");
  },
  dance: function () {
    console.log("跳舞");
  },
  sum: function (x, y) {
    // 2
    // console.log(x + y)
    return x + y;
  },
};
console.log(pig);

// 2. 调用对象方法
pig.sing(); // 唱歌
pig.dance(); // 跳舞

// 3. 方法可以传递参数也可以有返回值，跟函数使用基本类似
let re = pig.sum(1, 2); // 1 实参
console.log(re);
```

##### 8.2、遍历对象

for 不能直接遍历对象的问题，因为对象没有 length 长度，而且是无序的，我们要利用 for in 遍历对象。

语法：

```js
for (let 变量 in 对象) {
  console.log(变量); // 属性名
  console.log(对象[变量]); // 属性值
}
```

-  for...in 语法中的 k 是一个变量，在循环的过程中依次代表对象的属性名；
-  由于 k 是变量，所以必须使用 [] 语法解析；
-  一定记住：k 是获得对象的属性名，对象名[k] 是获得属性值；
-  一般不用这种方式遍历数组、主要是用来遍历对象。

```js
// 遍历对象
const pig = {
  sex: "女",
  age: 4,
  uname: "佩奇",
  weight: 12.6,
}

for (let key in pig) {
  console.log(key) // key 是属性   对象.属性
  // console.log(pig.key)   // pig.key  undefined  因为key是个变量不是属性
  // key  'sex'  'age'    对象[key]  对象['sex']  对象['age']
  console.log(pig[key])
}

// 注意：数组遍历用传统for，for in 主要用来遍历对象
let arr = ["red", "green", "pink"]
for (let k in arr) {
  console.log(k) // 得到字符串类型的索引号
}
```



### js的webAPI

























