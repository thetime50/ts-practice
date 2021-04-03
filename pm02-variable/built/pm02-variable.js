// ## pm02-变量声明
// npx tsc--pretty
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// ### let 声明
function foo() {
    // okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
var a;
// #### 解构数组
// 解构数组
function arrFn() {
    var _a;
    var input = [1, 2];
    var first = input[0], second = input[1];
    console.log(first); // outputs 1
    console.log(second); // outputs 2
    // 解构可以作用于已声明的变量
    // swap variables
    _a = [second, first], first = _a[0], second = _a[1];
    // 作用于函数参数：
    function f(_a) {
        var first = _a[0], second = _a[1];
        console.log(first);
        console.log(second);
    }
    f(input);
    // 可以在数组里使用...语法创建剩余变量
    var _b = [1, 2, 3, 4], first1 = _b[0], rest = _b.slice(1);
    console.log(first); // outputs 1
    console.log(rest); // outputs [ 2, 3, 4 ]
    // 忽略多余的元素
    var first2 = [1, 2, 3, 4][0];
    console.log(first); // outputs 1
}
arrFn();
// #### 对象解构
function objFn() {
    var _a;
    // 对象解构
    var o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    var a = o.a, b = o.b;
    (_a = { a: "baz", b: 101 }, a = _a.a, b = _a.b);
    // 可以在对象里使用...语法创建剩余变量
    // let { a, ...passthrough } = o;
    // let total = passthrough.b + passthrough.c.length;
    // 属性重命名
    var newName1 = o.a, newName2 = o.b;
    // 类型指示
    // 在变量后面完整的数据结构定义
    // let { a, b }: { a: string, b: number } = o;
    // 默认值
    // 在属性为 undefined 时使用缺省值
    function keepWholeObject(wholeObject) {
        var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a; // 解构默认值
    }
}
objFn();
// #### 函数声明
function funcFn() {
    function f1(_a) {
        var a = _a.a, b = _a.b;
        // ...
    }
    // 指定默认值
    // 需要在默认值之前设置其格式
    function f2(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? "" : _c, _d = _b.b, b = _d === void 0 ? 0 : _d;
        // ...
    }
    f2();
    // 在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：
    // 多级的默认属性
    function f3(_a) {
        var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
        // ...
    }
    f3({ a: "yes" }); // ok, default b = 0
    f3(); // ok, default to {a: ""}, which then defaults b = 0
    // f3({}); // error, 'a' is required if you supply an argument
}
funcFn();
// #### 展开
// 展开
// 数组
function unfoldFn() {
    var first = [1, 2];
    var second = [3, 4];
    var bothPlus = __spreadArray(__spreadArray(__spreadArray([0], first), second), [5]);
    // 对象
    var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    var search = __assign(__assign({}, defaults), { food: "rich" }); // 后面的会覆盖前面的
    // let search1 = { food: "rich", ...defaults }; // 会报错
    // 它仅包含对象 自身的可枚举属性
    var C = /** @class */ (function () {
        function C() {
            this.p = 12;
        }
        C.prototype.m = function () {
        };
        return C;
    }());
    var c = new C();
    var clone = __assign({}, c);
    clone.p; // ok
    // clone.m(); // error!
}
unfoldFn();
//# sourceMappingURL=pm02-variable.js.map