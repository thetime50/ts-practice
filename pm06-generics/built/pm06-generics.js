// ## pm05 - 函数
// npx tsc --pretty
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 使用泛型变量 对数组的处理
function genericsVariable() {
    // function loggingIdentity1<T>(arg: T): T {
    //     console.log(arg.length);  // Error: T doesn't have .length
    //     return arg;
    // }
    function loggingIdentity2(arg) {
        console.log(arg.length); // Array has a .length, so no more error
        return arg;
    }
    function loggingIdentity3(arg) {
        console.log(arg.length); // Array has a .length, so no more error
        return arg;
    }
}
// 泛型类型 泛型的类型声明
function fanxingLeixing() {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
    // 带有调用签名的对象字面量
    var myIdentity1 = identity;
    function identity1(arg) {
        return arg;
    }
    var myIdentity2 = identity1;
}
// 泛型类
function genericsClass() {
    var GenericNumber = /** @class */ (function () {
        function GenericNumber() {
        }
        return GenericNumber;
    }());
    var myGenericNumber = new GenericNumber();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) { return x + y; };
    var stringNumeric = new GenericNumber();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function (x, y) { return x + y; };
    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
}
// 泛型约束 加指定字段检查
function fanxingYueshu() {
    // 检查必须是有length字段的对象
    function loggingIdentity(arg) {
        console.log(arg.length); // Now we know it has a .length property, so no more error
        return arg;
    }
    loggingIdentity({ length: 10, value: 3 });
}
// 在泛型约束中使用类型参数 getProperty
function genericsProperty() {
    function getProperty(obj, key) {
        return obj[key];
    }
    var x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a"); // okay
    // getProperty(x, "m"); // error
}
// 在泛型里使用类类型
function genericsClassConstructor() {
    // 泛型 加 类型推断 加 构造函数签名
    function create(c) {
        return new c();
    }
    var BeeKeeper = /** @class */ (function () {
        function BeeKeeper() {
        }
        return BeeKeeper;
    }());
    var ZooKeeper = /** @class */ (function () {
        function ZooKeeper() {
        }
        return ZooKeeper;
    }());
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new BeeKeeper();
            return _this;
        }
        return Bee;
    }(Animal));
    var Lion = /** @class */ (function (_super) {
        __extends(Lion, _super);
        function Lion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.keeper = new ZooKeeper();
            return _this;
        }
        return Lion;
    }(Animal));
    // 泛型 加 类型推断 加 构造函数签名 加泛型约束
    function createInstance(c) {
        return new c();
    }
    createInstance(Lion).keeper.nametag; // typechecks!
    createInstance(Bee).keeper.hasMask; // typechecks!
}
genericsVariable();
fanxingLeixing();
genericsClass();
fanxingYueshu();
genericsProperty();
genericsClassConstructor();
//# sourceMappingURL=pm06-generics.js.map