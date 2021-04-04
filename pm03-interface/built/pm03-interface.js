// ## pm03-接口
// npx tsc --pretty
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 直接在函数上定义类型
function fn1(labObj) {
    console.log(labObj.label);
}
var obj = { size: 10, label: "Size 10 object" };
fn1(obj);
var obj1 = { size: 10, label: "Size 10 object" };
fn1(obj1);
// fn1({ size: 5, label: "hello" }) // 常量传参时多出属性会报错
fn1({ size: 5, label: "hello" });
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    // config.clor // 这样会报错
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
// 数组只读
var a = [1, 2, 3, 4];
var ro = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a = ro;
// # 额外的属性检查
// error: 'colour' not expected in type 'SquareConfig'
// let mySquare1 = createSquare({ colour: "red", width: 100 }); // 直接写的常量参数多出属性会报错
// 使用类型断言 (强制转换)
var mySquare2 = createSquare({ width: 100, opacity: 0.5 });
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
var mySearch1;
mySearch1 = function (src, sub) {
    var result = src.search(sub);
    return result > -1; // 推断并验证返回值类型
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var myArray1 = ["Alice", "Bob"];
// myArray1[2] = "Mallory"; // error!
// ### 类类型
function classType() {
    var Clock = /** @class */ (function () {
        function Clock(h, m) {
        }
        return Clock;
    }());
}
classType();
function classType1() {
    var Clock1 = /** @class */ (function () {
        function Clock1(h, m) {
        }
        Clock1.prototype.setTime = function (d) {
            this.currentTime = d;
        };
        return Clock1;
    }());
}
classType1();
function classStatic() {
}
classStatic();
function testFn() {
    var test = { m: 1, n: '23' }; // 定义数据即声明数据结构
    // let test1: TestIf = {} // 类型不符
    var a = {};
    var test2 = a; // any类型是特殊的， 不会类型检查
    test2 = a;
    a = test2;
    var tif = {};
    // test2 = tif // 类型不符
    a = tif;
    test2 = a;
    var test3 = { m: 3, n: '5' };
    var test4 = {};
}
testFn();
function extendsFn() {
    var square = {};
    square.color = "blue";
    square.sideLength = 10;
    var square1 = {};
    square1.color = "blue";
    square1.sideLength = 10;
    square1.penWidth = 5.0;
}
extendsFn();
function mixinFn() {
    function getCounter() {
        var counter = function (start) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }
    var c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
}
mixinFn();
function extendsClassFn() {
    var Control = /** @class */ (function () {
        function Control() {
        }
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // 通过继承产生state属性
        Button.prototype.select = function () { };
        return Button;
    }(Control));
    var TextBox = /** @class */ (function (_super) {
        __extends(TextBox, _super);
        function TextBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBox.prototype.select = function () { };
        return TextBox;
    }(Control));
}
extendsClassFn();
//# sourceMappingURL=pm03-interface.js.map