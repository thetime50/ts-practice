// ## pm08-类型推论
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
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rhino;
}(Animal));
var Elephant = /** @class */ (function (_super) {
    __extends(Elephant, _super);
    function Elephant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Elephant;
}(Animal));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Snake;
}(Animal));
// 最佳通用类型
var zoo = [new Rhino(), new Elephant(), new Snake()]; // 没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)
var zoo1 = [new Rhino(), new Elephant(), new Snake()]; // 生动指定类型
// 上下文类型
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
    // console.log(mouseEvent.kangaroo);
    // Property 'kangaroo' does not exist on type 'MouseEvent'.
};
// 上下文类型作为候选类型
function createZoo() {
    return [new Rhino(), new Elephant(), new Snake()];
}
//# sourceMappingURL=pm08-type-inference.js.map