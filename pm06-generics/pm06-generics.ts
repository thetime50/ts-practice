// ## pm06 - 泛型
// npx tsc --pretty

// 使用泛型变量 对数组的处理
function genericsVariable(){

    // function loggingIdentity1<T>(arg: T): T {
    //     console.log(arg.length);  // Error: T doesn't have .length
    //     return arg;
    // }
    function loggingIdentity2<T>(arg: T[]): T[] {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
    function loggingIdentity3<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
}

// 泛型类型 泛型的类型声明
function fanxingLeixing() {
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <U>(arg: U) => U = identity;

    // 带有调用签名的对象字面量
    let myIdentity1: { <T>(arg: T): T } = identity;

    // 抽象为泛型函数接口定义
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    function identity1<T>(arg: T): T {
        return arg;
    }

    let myIdentity2: GenericIdentityFn = identity1;
}




// 泛型类
function genericsClass(){

    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) { return x + y; };

    let stringNumeric = new GenericNumber<string>();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function (x, y) { return x + y; };

    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
}

// 泛型约束 加指定字段检查
function fanxingYueshu() {
    interface Lengthwise {
        length: number;
    }
    // 检查必须是有length字段的对象
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }
    loggingIdentity({ length: 10, value: 3 });
}

// 在泛型约束中使用类型参数 getProperty
function genericsProperty(){
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    // getProperty(x, "m"); // error
}

// 在泛型里使用类类型
function genericsClassConstructor() {
    // 泛型 加 类型推断 加 构造函数签名
    function create<T>(c: { new(): T; }): T {
        return new c();
    }
    class BeeKeeper {
        hasMask: boolean;
    }

    class ZooKeeper {
        nametag: string;
    }

    class Animal {
        numLegs: number;
    }

    class Bee extends Animal {
        keeper: BeeKeeper = new BeeKeeper();
    }

    class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
    }

    // 泛型 加 类型推断 加 构造函数签名 加泛型约束
    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;  // typechecks!
    createInstance(Bee).keeper.hasMask;   // typechecks!
}

genericsVariable()
fanxingLeixing()
genericsClass()
fanxingYueshu()
genericsProperty()
genericsClassConstructor()