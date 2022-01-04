// ## pm09 - 类型兼容性
// npx tsc --pretty

function compatibility(){
    // 兼容 interface 定义
    interface Foo {
        type: string;
        value: string;
    }
    
    interface Bar {
        type: string;
        value: string;
    }
    
    let foo: Foo
    let bar: Bar = {
        type: 'bar',
        value: 'hello',
    }
    
    foo = bar
    
    // 兼容 class 定义
    class Foo1 {
        type: string;
        value: string;
    }
    
    class Bar1 {
        type: string;
        value: string;
    }
    
    let foo1: Foo1
    let bar1: Bar1 = new Bar1()
    
    foo1 = bar1

    // type 定义 依然是兼容的
    type Foo2 = {
        type: string;
        value: string;
    }

    type Bar2 = {
        type: string;
        value: string;
    }

    let foo2: Foo2
    let bar2: Bar2 = {
        type: 'bar',
        value: 'hello',
    }

    foo2 = bar2
}

// 名义化类型
// https://jkchao.github.io/typescript-book-chinese/tips/nominalTyping.html

function nominalType(){
    // 泛型 Id 类型
    // 把类型
    // type Id<T extends string> = {
    //     type: T;
    //     value: string;
    // };
    interface Id<T extends string> {
        type: T;
        value: string;
    };
    
    // 特殊的 Id 类型
    type FooId = Id<'foo'>;
    type BarId = Id<'bar'>;
    
    // 可选：构造函数
    const createFoo = (value: string): FooId => ({ type: 'foo', value });
    const createBar = (value: string): BarId => ({ type: 'bar', value });
    
    let foo2 = createFoo('sample');
    let bar2 = createBar('sample');
    
    // foo2 = bar2; // Error
    foo2 = foo2; // Okey
    
    // 类型断言?
}

// 函数参数个数和返回值
function functionParamCntReturn() {
    let x = (a: number) => 0;
    let y = (b: number, s: string) => 0;

    y = x; // OK
    // x = y; // Error

    let x1 = () => ({ name: 'Alice' });
    let y1 = () => ({ name: 'Alice', location: 'Seattle' });

    x1 = y1; // OK
    // y1 = x1; // Error, because x() lacks a location property
}

// 函数参数双向协变
function functionParamType() {
    enum EventType { Mouse, Keyboard }

    interface Event { timestamp: number; }
    interface MouseEvent extends Event { x: number; y: number }
    interface KeyEvent extends Event { keyCode: number }

    function listenEvent(eventType: EventType, handler: (n: Event) => void) {
        /* ... */
    }

    // Unsound, but useful and common
    // 不稳妥的没有显示的声明参数类型的变化
    listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

    // Undesirable alternatives in presence of soundness
    // 参数上使用相同类型， 参数使用时转换类型
    listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
    // 对函数使用类型转换转换参数类型
    listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

    // Still disallowed (clear error). Type safety enforced for wholly incompatible types
    // 不允许使用完全不兼容的类型
    // listenEvent(EventType.Mouse, (e: number) => console.log(e));
}

// 可选参数
function kexuanCanshu(){
    function invokeLater(args: any[], callback: (...args: any[]) => void) {
        /* ... Invoke callback with 'args' ... */
    }

    // 不合理的 - invokeLater "可能" 提供任何数量的参数
    invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

    // 有疑惑的 (实际上需要x和y)但是无法被发现
    invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));

    ////
    let fn: (a?: string, b?: string, c?: string,) => void;
    fn = (a, b, c) => {
        console.log(a, b, c);
    }

    let fn1: (a: string, b: string, c: string,) => void;
    fn1 = (a?: string, b?: string, c?: string) => {
        console.log(a, b, c);
    }
}

// 枚举兼容
function enumCompatibility(){
    enum Status { Ready, Waiting };
    enum Color { Red, Blue, Green };

    let status = Status.Ready;
    // status = Color.Green;  // Error
}

function classCompatibility(){
    class Animal {
        feet: number;
        constructor(name: string, numFeet: number) { }
    }

    class Size {
        feet: number;
        constructor(numFeet: number) { }
    }

    let a: Animal;
    let s: Size;

    // a = s;  // OK
    // s = a;  // OK
    a = new Size(1)
    s = new Animal('s',2)
}

function genericsCompatibility(){

    interface Empty<T> {
    }
    let x: Empty<number> = {};
    let y: Empty<string> = {};

    x = y;  // OK, because y matches structure of x

    interface NotEmpty1<T> {
        data: T;
    }
    let x1: NotEmpty1<number>;
    let y1: NotEmpty1<string>;

    // x1 = y1;  // Error, because x and y are not compatible

    /// 
    let identity = function <T>(x: T): T {
        return x
        // ...
    }

    let reverse = function <U>(y: U): U {
        return y
        // ...
    }

    identity = reverse;


    // identity = (x: number) => x; // error
    let fn:(x:number) => number = identity;
}

compatibility()
nominalType()
functionParamCntReturn()
functionParamType()
kexuanCanshu()
enumCompatibility()
classCompatibility()
genericsCompatibility()

