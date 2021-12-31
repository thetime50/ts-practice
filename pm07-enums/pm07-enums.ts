// ## pm07 - 枚举
// npx tsc --pretty

function enumTest(){
    enum Direction {
        Up = 1,// 使用常量枚举表达形式初始化第一个枚举
        Down,
        Left,
        Right
    }

    enum Direction1 {
        Up, // 0
        Down,
        Left,
        Right
    }
    enum Direction11 {
        Up, // 0
        Down,
        Left=4,
        Right
    }
    enum Direction2 {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }
    console.log(`Direction, Direction1, Direction11, Direction2`, Direction, Direction1, Direction11, Direction2)
}

// 计算的和常量成员
function enumConstMenber(){
    enum FileAccess {
        // constant members
        None,
        Read = 1 << 1,
        Write = 1 << 2,
        ReadWrite = Read | Write,
        // computed member
        G = "123".length
    }
}

// 枚举成员类型
function enumMemberTypes(){
    enum ShapeKind {
        Circle,
        Square,
    }

    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }

    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }

    let c: Circle = {
        // kind: ShapeKind.Square, // Error!
        kind: ShapeKind.Circle,
        radius: 100,
    }
    let sq: ShapeKind.Square = ShapeKind.Square
}

// 运行时的枚举
function runTime(){
    enum E {
        X, Y, Z
    }

    function f(obj: { X: number }) {
        return obj.X;
    }

    // Works, since 'E' has a property named 'X' which is a number.
    f(E);

    // 反响映射
    enum Enum {
        A,
        B,
    }
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
    console.log('Enum.A,Enum[Enum.A],typeof Enum,Enum',Enum.A,Enum[Enum.A],typeof Enum,Enum)
}

// const枚举
function constEnum() {
    const enum Enum {
        A = 1,
        B = A * 2
    }
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
    // console.log(`Directions[Directions.Down]`, Directions[Directions.Down])// error
}

// 外部枚举
function ambientEnum(){

}

// declare enum AmbiEnum {
//     A = 1,
//     B,
//     C = 2,
// }
// console.log(`AmbiEnum`, AmbiEnum, AmbiEnum.A, AmbiEnum.B, AmbiEnum.C)


enumTest()
enumConstMenber()
enumMemberTypes()
runTime()
constEnum()
ambientEnum()
