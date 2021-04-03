"use strict";
// npx tsc --pretty
Object.defineProperty(exports, "__esModule", { value: true });
var file2 = require("./file2"); // js module.export = 
console.log('file2', file2);
file2();
var file3 = require("./file3"); // ts export = 
console.log('file3', file3);
file3('a');
var file4 = require("./file4"); // ts export xxx
console.log('file4', file4);
file4.file4fn1('b');
file4.file4fn2('c');
function myCoolFunction() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
    // ...
}
myCoolFunction(function () { }, [1, 2, 3, 4]);
myCoolFunction(function () { }, 1, 2, 3, 4);
myCoolFunction(function () { }, 1);
// myCoolFunction(() => { }, ['a']) // 数据类型错误
// myCoolFunction(() => { }, 'a') // 数据类型错误
// myCoolFunction(() => { }, { a: 1 }) // 数据类型错误
// ## 连续添加属性
// ts会在定义数据时即定义数据的结构和类型
// var options = {};
// options.color = "red"; // 更改了数据结构 会报错
// options.volume = 11; // 更改了数据结构 会报错
// 初始化时赋值不会报错
var options = {
    color: "red",
    volume: 11
};
var options1 = {};
options1.color = "red";
options1.volume = 11;
// any，Object，和{} // 什么意思
var options2 = {};
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
var obj1 = {};
obj1.num = null;
obj1.str = undefined;
// 使用 ! 后缀处理可能的null 和undefinde
console.log('obj1.str!.length', obj1.str.length);
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getDistance = function (p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    };
    return Point;
}());
// Point.prototype.distanceFromOrigin = function (point: Point) {
//     return this.getDistance({ x: 0, y: 0 }); // 这样的化this没有类型检查 
// }
Point.prototype.distanceFromOrigin = function (point) {
    return this.getDistance({ x: 0, y: 0 });
};
//# sourceMappingURL=file1.js.map