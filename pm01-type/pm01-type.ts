// pm01-基础类型
// npx tsc --pretty

// - 布尔值
let isDone: boolean = false;

// - 数字
let decLiteral: number = 6; // 十进制字面量
let hexLiteral: number = 0xf00d; // 十六进制字面量
let binaryLiteral: number = 0b1010; // ECMAScript 2015 二进制字面量
let octalLiteral: number = 0o744; // ECMAScript 2015 八进制字面量

// - 字符串
let name1: string = "bob";
name1 = "smith";
let name2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name1}.

I'll be ${age + 1} years old next month.`;

// - 数组
let list: number[] = [1, 2, 3]; // 元素类型后面接上 []
let list1: Array<number> = [1, 2, 3]; // Array<元素类型>：

// - 元组 Tuple
// 区别于数组 允许不同类型的数据
// Declare a tuple type
let x: [string, number]; // 会限制长度
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
let x1 = ["a", false] // 这样会有联合类型效果
// x1[3] = 4 // 类型限制
x1[2] = "b"
// x1[4] = { a: 1 } // 类型限制
console.log(x1)

// - 枚举
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
enum Color1 { Red = 1, Green = 2, Blue = 4 }
let c1: Color1 = Color1.Green;
enum Color3 { Red = 1, Green, Blue }
let colorName: string = Color3[2];
console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
console.log(Color3.Red, Color3[Color3.Red]);

// - Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let notSure1: any = 4;
// notSure1.ifItExists(); // okay, ifItExists might exist at runtime
notSure1.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

// Object类型的变量不能在上面调用任意方法
// let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object
// 不同数据类型的数组
let list2: any[] = [1, true, "free"];

// - Void
function warnUser(): void {
    console.log("This is my warning message");
}
// void类型的变量只能被赋值 undefined和null
let unusable: void = undefined;

// - Null 和 Undefined
// 默认情况下null和undefined是所有类型的子类型。 除非使用strictNullChecks选项
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// - Never
// 永不存在的值的类型
// 表示抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// ever类型是任何类型的子类型，也可以赋值给任何类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// - Object
// 表示非原始类型
// 也就是除number，string，boolean，symbol，null或undefined之外的类型
declare function create(o: object | null): void; // 这应该是个接口描述 可能类似define

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error




// - 类型断言
// “尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 另一个为as语法：
let someValue1: any = "this is a string";
let strLength1: number = (someValue as string).length;

