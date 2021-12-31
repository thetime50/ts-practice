// ## pm07 - 枚举
// npx tsc --pretty
function enumTest() {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    var Direction1;
    (function (Direction1) {
        Direction1[Direction1["Up"] = 0] = "Up";
        Direction1[Direction1["Down"] = 1] = "Down";
        Direction1[Direction1["Left"] = 2] = "Left";
        Direction1[Direction1["Right"] = 3] = "Right";
    })(Direction1 || (Direction1 = {}));
    var Direction11;
    (function (Direction11) {
        Direction11[Direction11["Up"] = 0] = "Up";
        Direction11[Direction11["Down"] = 1] = "Down";
        Direction11[Direction11["Left"] = 4] = "Left";
        Direction11[Direction11["Right"] = 5] = "Right";
    })(Direction11 || (Direction11 = {}));
    var Direction2;
    (function (Direction2) {
        Direction2["Up"] = "UP";
        Direction2["Down"] = "DOWN";
        Direction2["Left"] = "LEFT";
        Direction2["Right"] = "RIGHT";
    })(Direction2 || (Direction2 = {}));
    console.log("Direction, Direction1, Direction11, Direction2", Direction, Direction1, Direction11, Direction2);
}
// 计算的和常量成员
function enumConstMenber() {
    var FileAccess;
    (function (FileAccess) {
        // constant members
        FileAccess[FileAccess["None"] = 0] = "None";
        FileAccess[FileAccess["Read"] = 2] = "Read";
        FileAccess[FileAccess["Write"] = 4] = "Write";
        FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
        // computed member
        FileAccess[FileAccess["G"] = "123".length] = "G";
    })(FileAccess || (FileAccess = {}));
}
// 枚举成员类型
function enumMemberTypes() {
    var ShapeKind;
    (function (ShapeKind) {
        ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
        ShapeKind[ShapeKind["Square"] = 1] = "Square";
    })(ShapeKind || (ShapeKind = {}));
    var c = {
        // kind: ShapeKind.Square, // Error!
        kind: ShapeKind.Circle,
        radius: 100,
    };
    var sq = ShapeKind.Square;
}
// 运行时的枚举
function runTime() {
    var E;
    (function (E) {
        E[E["X"] = 0] = "X";
        E[E["Y"] = 1] = "Y";
        E[E["Z"] = 2] = "Z";
    })(E || (E = {}));
    function f(obj) {
        return obj.X;
    }
    // Works, since 'E' has a property named 'X' which is a number.
    f(E);
    // 反响映射
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
        Enum[Enum["B"] = 1] = "B";
    })(Enum || (Enum = {}));
    var a = Enum.A;
    var nameOfA = Enum[a]; // "A"
    console.log('Enum.A,Enum[Enum.A],typeof Enum,Enum', Enum.A, Enum[Enum.A], typeof Enum, Enum);
}
// const枚举
function constEnum() {
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    // console.log(`Directions[Directions.Down]`, Directions[Directions.Down])// error
}
// 外部枚举
function ambientEnum() {
}
// declare enum AmbiEnum {
//     A = 1,
//     B,
//     C = 2,
// }
// console.log(`AmbiEnum`, AmbiEnum, AmbiEnum.A, AmbiEnum.B, AmbiEnum.C)
enumTest();
enumConstMenber();
enumMemberTypes();
runTime();
constEnum();
ambientEnum();
//# sourceMappingURL=pm07-enums.js.map