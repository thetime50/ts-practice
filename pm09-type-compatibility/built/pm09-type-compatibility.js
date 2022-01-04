// ## pm09 - 类型兼容性
// npx tsc --pretty
function compatibility() {
    var foo;
    var bar = {
        type: 'bar',
        value: 'hello',
    };
    foo = bar;
    // 兼容 class 定义
    var Foo1 = /** @class */ (function () {
        function Foo1() {
        }
        return Foo1;
    }());
    var Bar1 = /** @class */ (function () {
        function Bar1() {
        }
        return Bar1;
    }());
    var foo1;
    var bar1 = new Bar1();
    foo1 = bar1;
    var foo2;
    var bar2 = {
        type: 'bar',
        value: 'hello',
    };
    foo2 = bar2;
}
// 名义化类型
// https://jkchao.github.io/typescript-book-chinese/tips/nominalTyping.html
function nominalType() {
    ;
    // 可选：构造函数
    var createFoo = function (value) { return ({ type: 'foo', value: value }); };
    var createBar = function (value) { return ({ type: 'bar', value: value }); };
    var foo2 = createFoo('sample');
    var bar2 = createBar('sample');
    // foo2 = bar2; // Error
    foo2 = foo2; // Okey
    // 类型断言?
}
// 函数参数个数和返回值
function functionParamCntReturn() {
    var x = function (a) { return 0; };
    var y = function (b, s) { return 0; };
    y = x; // OK
    // x = y; // Error
    var x1 = function () { return ({ name: 'Alice' }); };
    var y1 = function () { return ({ name: 'Alice', location: 'Seattle' }); };
    x1 = y1; // OK
    // y1 = x1; // Error, because x() lacks a location property
}
// 函数参数双向协变
function functionParamType() {
    var EventType;
    (function (EventType) {
        EventType[EventType["Mouse"] = 0] = "Mouse";
        EventType[EventType["Keyboard"] = 1] = "Keyboard";
    })(EventType || (EventType = {}));
    function listenEvent(eventType, handler) {
        /* ... */
    }
    // Unsound, but useful and common
    // 不稳妥的没有显示的声明参数类型的变化
    listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
    // Undesirable alternatives in presence of soundness
    // 参数上使用相同类型， 参数使用时转换类型
    listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
    // 对函数使用类型转换转换参数类型
    listenEvent(EventType.Mouse, (function (e) { return console.log(e.x + ',' + e.y); }));
    // Still disallowed (clear error). Type safety enforced for wholly incompatible types
    // 不允许使用完全不兼容的类型
    // listenEvent(EventType.Mouse, (e: number) => console.log(e));
}
// 可选参数
function kexuanCanshu() {
    function invokeLater(args, callback) {
        /* ... Invoke callback with 'args' ... */
    }
    // 不合理的 - invokeLater "可能" 提供任何数量的参数
    invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
    // 有疑惑的 (实际上需要x和y)但是无法被发现
    invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
    ////
    var fn;
    fn = function (a, b, c) {
        console.log(a, b, c);
    };
    var fn1;
    fn1 = function (a, b, c) {
        console.log(a, b, c);
    };
}
// 枚举兼容
function enumCompatibility() {
    var Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    ;
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    ;
    var status = Status.Ready;
    // status = Color.Green;  // Error
}
function classCompatibility() {
    var Animal = /** @class */ (function () {
        function Animal(name, numFeet) {
        }
        return Animal;
    }());
    var Size = /** @class */ (function () {
        function Size(numFeet) {
        }
        return Size;
    }());
    var a;
    var s;
    // a = s;  // OK
    // s = a;  // OK
    a = new Size(1);
    s = new Animal('s', 2);
}
function genericsCompatibility() {
    var x = {};
    var y = {};
    x = y; // OK, because y matches structure of x
    var x1;
    var y1;
    // x1 = y1;  // Error, because x and y are not compatible
    /// 
    var identity = function (x) {
        return x;
        // ...
    };
    var reverse = function (y) {
        return y;
        // ...
    };
    identity = reverse;
    // identity = (x: number) => x; // error
    var fn = identity;
}
compatibility();
nominalType();
functionParamCntReturn();
functionParamType();
kexuanCanshu();
enumCompatibility();
classCompatibility();
genericsCompatibility();
//# sourceMappingURL=pm09-type-compatibility.js.map