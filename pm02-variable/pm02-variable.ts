// ## pm02-变量声明
// npx tsc --pretty


// ### let 声明
function foo() {
    // okay to capture 'a'
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a: any;


// #### 解构数组
// 解构数组
function arrFn(): void {
    let input: [number, number] = [1, 2]; // 不知道为什么这边不声明类型会有问题 类型推断不对？？
    let [first, second] = input;
    console.log(first); // outputs 1
    console.log(second); // outputs 2

    // 解构可以作用于已声明的变量
    // swap variables
    [first, second] = [second, first];

    // 作用于函数参数：
    function f([first, second]: [number, number]) {
        console.log(first);
        console.log(second);
    }
    f(input);

    // 可以在数组里使用...语法创建剩余变量
    let [first1, ...rest] = [1, 2, 3, 4];
    console.log(first); // outputs 1
    console.log(rest); // outputs [ 2, 3, 4 ]

    // 忽略多余的元素
    let [first2] = [1, 2, 3, 4];
    console.log(first); // outputs 1
}
arrFn()

// #### 对象解构
function objFn(): void {
    // 对象解构
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    let { a, b } = o;

    ({ a, b } = { a: "baz", b: 101 });

    // 可以在对象里使用...语法创建剩余变量
    // let { a, ...passthrough } = o;
    // let total = passthrough.b + passthrough.c.length;

    // 属性重命名
    let { a: newName1, b: newName2 } = o;

    // 类型指示
    // 在变量后面完整的数据结构定义
    // let { a, b }: { a: string, b: number } = o;


    // 默认值
    // 在属性为 undefined 时使用缺省值
    function keepWholeObject(wholeObject: { a: string, b?: number }) { // 参数类型指示 可选属性
        let { a, b = 1001 } = wholeObject; // 解构默认值
    }
}
objFn()

// #### 函数声明
function funcFn() {
    // 函数声明
    type C = { a: string, b?: number }
    function f1({ a, b }: C): void {
        // ...
    }

    // 指定默认值
    // 需要在默认值之前设置其格式
    function f2({ a = "", b = 0 } = {}): void { // 关于类型推断
        // ...
    }
    f2();

    // 在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：
    // 多级的默认属性
    function f3({ a, b = 0 } = { a: "" }): void {
        // ...
    }
    f3({ a: "yes" }); // ok, default b = 0
    f3(); // ok, default to {a: ""}, which then defaults b = 0
    // f3({}); // error, 'a' is required if you supply an argument
}
funcFn()

// #### 展开
// 展开
// 数组
function unfoldFn(): void {
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];

    // 对象
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" }; // 后面的会覆盖前面的
    // let search1 = { food: "rich", ...defaults }; // 会报错

    // 它仅包含对象 自身的可枚举属性
    class C {
        p = 12;
        m() {
        }
    }
    let c = new C();
    let clone = { ...c };
    clone.p; // ok
    // clone.m(); // error!
}
unfoldFn()
