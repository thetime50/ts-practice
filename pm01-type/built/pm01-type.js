// pm01-基础类型
// npx tsc --pretty
// - 布尔值
var isDone = false;
// - 数字
var decLiteral = 6; // 十进制字面量
var hexLiteral = 0xf00d; // 十六进制字面量
var binaryLiteral = 10; // ECMAScript 2015 二进制字面量
var octalLiteral = 484; // ECMAScript 2015 八进制字面量
// - 字符串
var name1 = "bob";
name1 = "smith";
var name2 = "Gene";
var age = 37;
var sentence = "Hello, my name is ".concat(name1, ".\n\nI'll be ").concat(age + 1, " years old next month.");
// - 数组
var list = [1, 2, 3]; // 元素类型后面接上 []
var list1 = [1, 2, 3]; // Array<元素类型>：
// - 元组 Tuple
// 区别于数组 允许不同类型的数据
// Declare a tuple type
var x; // 会限制长度
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error
// 当访问一个已知索引的元素会坚持类型
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
// 当访问一个越界的元素，会使用联合类型替代：
// x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
// console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
// x[6] = true; // Error, 布尔不是(string | number)类型
var x1 = ["a", false]; // 这样会有联合类型效果
// x1[3] = 4 // 类型限制
x1[2] = "b";
// x1[4] = { a: 1 } // 类型限制
console.log(x1);
// - 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 1] = "Red";
    Color1[Color1["Green"] = 2] = "Green";
    Color1[Color1["Blue"] = 4] = "Blue";
})(Color1 || (Color1 = {}));
var c1 = Color1.Green;
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 3] = "Blue";
})(Color3 || (Color3 = {}));
var colorName = Color3[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
console.log(Color3.Red, Color3[Color3.Red]);
// - Any
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
var notSure1 = 4;
// notSure1.ifItExists(); // okay, ifItExists might exist at runtime
notSure1.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
// Object类型的变量不能在上面调用任意方法
// let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object
// 不同数据类型的数组
var list2 = [1, true, "free"];
// - Void
function warnUser() {
    console.log("This is my warning message");
}
// void类型的变量只能被赋值 undefined和null
var unusable = undefined;
// - Null 和 Undefined
// 默认情况下null和undefined是所有类型的子类型。 除非使用strictNullChecks选项
// Not much else we can assign to these variables!
var u = undefined;
var n = null;
// - Never
// 永不存在的值的类型
// 表示抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// ever类型是任何类型的子类型，也可以赋值给任何类型
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(null); // OK
var obj = { a: "a" };
// - 类型断言
// “尖括号”语法：
var someValue = "this is a string";
var strLength = someValue.length;
// 另一个为as语法：
var someValue1 = "this is a string";
var strLength1 = someValue.length;
//# sourceMappingURL=pm01-type.js.map