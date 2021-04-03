// ## pm03-接口
// npx tsc --pretty

// 直接在函数上定义类型
function fn1(labObj: { label: string }) {
    console.log(labObj.label)
}
let obj = { size: 10, label: "Size 10 object" }
fn1(obj)
let obj1: { size: number, label: string } = { size: 10, label: "Size 10 object" }
fn1(obj1)
// fn1({ size: 5, label: "hello" }) // 常量传参时多出属性会报错
fn1({ size: 5, label: "hello" } as { label: string })

// # 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    // config.clor // 这样会报错
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black" });

// # 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!
// 数组只读
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a = ro as number[];

// # 额外的属性检查
// error: 'colour' not expected in type 'SquareConfig'
// let mySquare1 = createSquare({ colour: "red", width: 100 }); // 直接写的常量参数多出属性会报错
// 使用类型断言 (强制转换)
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// # 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
let mySearch1: SearchFunc;
mySearch1 = function (src, sub) { // 只匹配参数位置 自动匹配参数类型
    let result = src.search(sub);
    return result > -1; // 推断并验证返回值类型
}

// # 可索引的类型

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// }


interface AD extends Animal {
    breed: string;
}
interface More {
    [x: number]: AD;
    [x: string]: Animal;
}

// 范围大的的父类型 (属性少)
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

// 只读的索引签名
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
// myArray1[2] = "Mallory"; // error!


// ### 类类型
function classType() {
    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }
}
classType()

function classType1() {
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }

    class Clock1 implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
}
classType1()

function classStatic() {


}
classStatic()