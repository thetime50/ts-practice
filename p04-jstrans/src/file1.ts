// p04-JavaScript迁移
// npx tsc --pretty
// ts-node 好像不会识别tsconfig.json文件

import file2 = require("./file2"); // js module.export = 
console.log('file2', file2)
file2()
import file3 = require("./file3"); // ts export = 
console.log('file3', file3)
file3('a')
import file4 = require("./file4"); // ts export xxx
console.log('file4', file4)
file4.file4fn1('b')
file4.file4fn2('c')

// ## 过多或过少的参数
// 使用TypeScript的函数重载声明函数调用方式
function myCoolFunction(f: (x: number) => void, nums: number[]): void; // 第一个参数是函数 第二个参数是数值数组
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void; // 第一个参数是函数 其余参数是数值
function myCoolFunction() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
    // ...
}

myCoolFunction(() => { }, [1, 2, 3, 4])
myCoolFunction(() => { }, 1, 2, 3, 4)
myCoolFunction(() => { }, 1)
// myCoolFunction(() => { }, ['a']) // 数据类型错误
// myCoolFunction(() => { }, 'a') // 数据类型错误
// myCoolFunction(() => { }, { a: 1 }) // 数据类型错误


// ## 连续添加属性
// ts会在定义数据时即定义数据的结构和类型

// var options = {};
// options.color = "red"; // 更改了数据结构 会报错
// options.volume = 11; // 更改了数据结构 会报错

// 初始化时赋值不会报错
let options = {
    color: "red",
    volume: 11
};

// 添加类型断言到对象字面量上
interface Options { color: string; volume: number }

let options1 = {} as Options;
options1.color = "red";
options1.volume = 11;

// any，Object，和{} // 什么意思

let options2 = {} as any;
options2.color = "red";
options2.volume = 11;

// let options3 = {} as Object;
// options3.color = "red";
// options3.volume = 11;

// let options4 = {} as {};
// options4.color = "red";
// options4.volume = 11;


// 使用 any 将失去TypeScript提供的错误检查和编译器支持

// ## 没有隐式的any
// noImplicitAny选项


// ## 严格的null与undefined检查
// TypeScript默认把null和undefined当做属于任何类型
// let obj = {} as {
//     num: number,
//     str: String,
// }
// obj.num = null
// obj.str = undefined

// 使用 strictNullChecks选项 null和undefined获得了它们自己各自的类型null和undefined
// 你的依赖也需要相应地启用strictNullChecks
// 需要变为如下声明

let obj1 = {} as {
    num: number | null,
    str: String | undefined,
}
obj1.num = null
obj1.str = undefined

// 使用 ! 后缀处理可能的null 和undefinde
console.log('obj1.str!.length', obj1.str!.length)

// ## this没有隐式的any
// 使用noImplicitThis选项需要明确指定this的结构


interface PointData { // interface声明会添加class interface的结构
    x: number,
    y: number,
}
class Point {
    constructor(public x: number, public y: number) { }
    getDistance(p: PointData) {
        let dx = p.x - this.x;
        let dy = p.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}
// ...

// Reopen the interface.
interface Point { // interface声明会添加class interface的结构
    distanceFromOrigin(point: Point): number;
}
// Point.prototype.distanceFromOrigin = function (point: Point) {
//     return this.getDistance({ x: 0, y: 0 }); // 这样的化this没有类型检查 
// }

Point.prototype.distanceFromOrigin = function (this: Point, point: Point) { // class也可以作为interface使用
    return this.getDistance({ x: 0, y: 0 });
}
