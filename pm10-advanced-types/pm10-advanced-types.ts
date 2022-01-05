// ## pm10 - 高级类型
// npx tsc --pretty

// 交叉类型
function intersectionTypes(){

    function extend<T extends object, U extends object>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (let id in second) {
            // if (!(<any>result).hasOwnProperty(id)) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    class Person {
        constructor(public name: string) { }
    }
    interface Loggable {
        log(): void;
    }
    class ConsoleLogger implements Loggable {
        log() {
            // ...
        }
    }
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    var n = jim.name;
    jim.log();
}

// 联合类型
function unionTypes(){

    function padLeft(value: string, padding: string | number) {
        // ...
    }

    // let indentedString = padLeft("Hello world", true); // errors during compilation

    interface Bird {
        fly:()=>void;
        layEggs:()=>void;
    }

    interface Fish {
        swim:()=>void;
        layEggs:()=>void;
    }

    function getSmallPet(type:boolean): Fish | Bird {
        if (type){
            return <Fish>{ swim: () => { }, layEggs: () => { },}
        }else{
            return <Bird>{ fly: () => { }, layEggs: () => { }, }

        }
    }

    let pet = getSmallPet(false);
    pet.layEggs(); // okay
    // pet.swim();    // errors

    // 类型区分
    // 用类型断言访问属性区分类型
    // let pet = getSmallPet(fa);

    // // 每一个成员访问都会报错
    // if (pet.swim) {
    //     pet.swim();
    // }
    // else if (pet.fly) {
    //     pet.fly();
    // }

    ////////////////////////////
    // 使用类型断言
    let pet1 = getSmallPet(false);

    if ((<Fish>pet1).swim) {
        (<Fish>pet1).swim();
    }
    else {
        (<Bird>pet1).fly();
    }

    /////////////////////////////
    // 类型保护机制

    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }


    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
}


// typeof类型保护

// instanceof类型保护
function instanceofType(){

    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) { }
        getPaddingString() {
            return Array(this.numSpaces + 1).join(" ");
        }
    }

    class StringPadder implements Padder {
        constructor(private value: string) { }
        getPaddingString() {
            return this.value;
        }
    }

    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }

    // 类型为SpaceRepeatingPadder | StringPadder
    let padder: Padder = getRandomPadder();

    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder instanceof StringPadder) {
        padder; // 类型细化为'StringPadder'
    }
}

// 可以为null的类型
function nullAndType(){
    // --strictNullChecks
    let s = "foo";
    // s = null; // 错误, 'null'不能赋值给'string'
    let sn: string | null = "bar";
    sn = null; // 可以

    // sn = undefined; // error, 'undefined'不能赋值给'string | null'
}

// 可选参数和可选属性
function optionalParameter(){

    // --strictNullChecks
    function f(x: number, y?: number) {
        return x + (y || 0);
    }
    f(1, 2);
    f(1);
    f(1, undefined);
    // f(1, null); // error, 'null' is not assignable to 'number | undefined'

    class C {
        a: number;
        b?: number;
    }
    let c = new C();
    c.a = 12;
    // c.a = undefined; // error, 'undefined' is not assignable to 'number'
    c.b = 13;
    c.b = undefined; // ok
// c.b = null; // error, 'null' is not assignable to 'number | undefined'}
}


// 类型断言
function leixingDuanyan() {
    // function broken(name: string | null): string {
    //     function postfix(epithet: string) {
    //         return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    //     }
    //     name = name || "Bob";
    //     return postfix("great");
    // }

    function fixed(name: string | null): string {
        function postfix(epithet: string) {
            return name!.charAt(0) + '.  the ' + epithet; // ok
        }
        name = name || "Bob";
        return postfix("great");
    }
    fixed(null)
}

function aliasName(){

    // 别名
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    function getName(n: NameOrResolver): Name {// : string {
        if (typeof n === 'string') {
            return n;
        }
        else {
            return n();
        }
    }

    // 可以用做泛型 作为属性值
    type Container<T> = { value: T };

    // 可以在属性里引用自己
    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }

    // 配合交叉类型使用

    // 可以是数据类型或 数据-链表类型
    type LinkedList<T> = T & { next: LinkedList<T>|null };

    interface Person {
        name: string;
    }

    var people: LinkedList<Person> = { name: 'a', next: null};
    people.next = { name: 'b', next: people }
    var s = people.name;
    var s = people.next.name;
    var s = people.next.next!.name;
    var s = people.next.next!.next!.name;

    // 别名不能出现在声明右侧的任何地方
    type Yikes = Array<Yikes>; // error 可是没有报错
    type MyData = { value: number };
    type StrLinkedList = LinkedList<MyData>
    let yk: Yikes = [[], [], []]
    let sll: StrLinkedList = { value:1, next: null};

    type AAA = Person | MyData
    // interface BBB extends AAA { // 接口只能扩展使用静态已知成员的对象类型或对象类型的交集。ts(2312)
    // }

    // 类型别名的报错
    type MyStr = string
    // let ms: MyStr = 1 // error TS2322: Type 'number' is not assignable to type 'string'.
    // let md: MyData = { value: 'a' } // The expected type comes from property 'value' which is declared here on type 'MyData'
}

function stringValType() {
    // 类似枚举类型的字符串
    type Easing = "ease-in" | "ease-out" | "ease-in-out";
    class UIElement {
        animate(dx: number, dy: number, easing: Easing) {
            if (easing === "ease-in") {
                // ...
            }
            else if (easing === "ease-out") {
            }
            else if (easing === "ease-in-out") {
            }
            else {
                // error! should not pass null or undefined.
            }
        }
    }

    let button = new UIElement();
    button.animate(0, 0, "ease-in");
    // button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

    // 用与函数重载
    function createElement(tagName: "img"): HTMLImageElement;
    function createElement(tagName: "input"): HTMLInputElement;
    // ... more overloads ...
    function createElement(tagName: string): Element {
        // ... code goes here ...
        return document.createElement('div');
    }
}

function numberValType(){
    function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
        // ...
        // return 8 // error
        return 1
    }

    // function foo(x: number) {
    //     if (x !== 1 || x !== 2) { // 这好像和数字字面量也没什么关系
    //         //         ~~~~~~~
    //         // Operator '!==' cannot be applied to types '1' and '2'.
    //     }
    // }

    function bar(val: 1|2):void{
        if(val !== 1 && val !== 2){ // 这里没有检查不会报错
            console.log(`有没有检查`,)
        } 
    }
    // bar(3)// error 这里会报错
}

// 可辨识联合
function discriminatedUnions(){
    interface Square {
        kind: "square"; // 可辨识的特征
        size: number;
    }
    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }
    interface Circle {
        kind: "circle";
        radius: number;
    }
    type Shape = Square | Rectangle | Circle ; // 联合

    function area(s: Shape) {
        switch (s.kind) { // 类型保护
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
        }
    }
    area({
        kind: "circle",
        radius: 3,
    })

    interface Triangle {
        kind: "triangle";
        side: number;
    }
    type Shape1 = Square | Rectangle | Circle | Triangle; // 联合
    function area1(s: Shape1): number { // Function lacks ending return statement and return type does not include 'undefined'.
        switch (s.kind) { // 类型保护
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
            /* */ case "triangle": return s.side^2 * Math.sqrt(3) / 4;
        }
    }
    area1({
        kind: "circle",
        radius: 3,
    })


    function assertNever(x: never): never {
        throw new Error("Unexpected object: " + x);
    }
    function area2(s: Shape1) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
            /* */ case "triangle": return s.side ^ 2 * Math.sqrt(3) / 4;
            // default: return assertNever(s); // error here if there are missing cases // Argument of type 'Triangle' is not assignable to parameter of type 'never'.
            default: return ((s: never): never => s)(s);
        }
    }
    area2({
        kind: "circle",
        radius: 3,
    })

}

// this的多态
function thisDuotai() {

    class BasicCalculator {
        public constructor(protected value: number = 0) { }
        public currentValue(): number {
            return this.value;
        }
        public add(operand: number): this {
            this.value += operand;
            return this;
        }
        public multiply(operand: number): this {
            this.value *= operand;
            return this;
        }
        public fun(operand: number): BasicCalculator {
            this.value *= operand;
            return this;
        }
        // ... other operations go here ...
    }

    let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();
    class ScientificCalculator extends BasicCalculator {
        public constructor(value = 0) {
            super(value);
        }
        public sin() {
            this.value = Math.sin(this.value);
            return this;
        }
        // ... other operations go here ...
    }

    let v1 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
    // 基类方法返回值没有超类的接口定义
    // let v2 = new ScientificCalculator(2).fun(5).sin() // error TS2339: Property 'sin' does not exist on type 'BasicCalculator'.
}

// 索引类型
function indexType(){

    // 从对象中选取属性的子集
    function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(n => o[n]);
    }

    interface Person {
        name: string;
        age: number;
    }
    let person: Person = {
        name: 'Jarid',
        age: 35
    };
    let strings: string[] = pluck(person, ['name']); // ok, string[]

    // 索引类型查询操作符
    let personProps: keyof Person; // 'name' | 'age'
    // let personProps1: keyof Person = 'a'; // error

    // 获取一个属性
    let name: Person['name'] = person.name; // string
    // 你返回 T[K]的结果，编译器会实例化键的真实类型
    function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
        return o[name]; // o[name] is of type T[K]
    }
    let name1: string = getProperty(person, 'name');
    let age: number = getProperty(person, 'age');
    // let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'

    //索引为字符串类型的同类型map数据字典
    interface Map<T> {
        [key: string]: T;
    }
    let keys: keyof Map<number> = 'any string'; // string
    let value: Map<number>['foo'] = 3; // number


    type DataType<T> = {
        value: T;
    }
    type V = DataType<string>
    // 索引访问测试
    function getProperty1<T, K extends keyof T>(o: T, name: K): T[K] {
        let result: T[K] = o[name];
        return result; // o[name] is of type T[K]
    }
    function getProperty2<T, K extends keyof T>(o: T, name: K): DataType<T[K]> {
        let result: DataType<T[K]> ={
            value: o[name]
        }
        return result;
    }
}

// 映射类型
function mappingType(){

    interface Person {
        name: string;
        age: number;
    }
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }

    type PersonPartial = Partial<Person>;
    type ReadonlyPerson = Readonly<Person>;

    // 一个简单的实现
    type Keys = 'option1' | 'option2';
    type Flags = { [K in Keys]: boolean };

    // 通用版本
    type Nullable<T> = { [P in keyof T]: T[P] | null }
    type Partial1<T> = { [P in keyof T]?: T[P] }
}

function mappingTypeApply(){
    type Proxy_<T> = {
        get(): T;
        set?(value: T): void;
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy_<T[P]>;
    }

    //
    let obj = {a:'a'}
    let pp: Proxy_<string> = {
        get() {
            return obj.a;
        },
        set(value) {
            obj.a = value
        }
    }
    //
    
    function proxify<T, P extends keyof T>(o: T): Proxify<T> {
        let res = {} as Proxify<T>;
        for (const key in o) {
            // let p: Proxy_<T[P]> = {
            res[key] = {
                get(){
                    return o[key];
                },
                set(value){
                    o[key] = value;
                }
            }
        }
        return res
    }

    let props = { a: 1, b: 2, c: 3 };
    let proxyProps = proxify(props);

    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    }
    type Record<K extends string, T> = {
        [P in K]: T;
    }

    type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

// K extends keyof T 传入的是对象类型
// K extends string 传入的是字面量类型
}
intersectionTypes()
unionTypes()
instanceofType()
nullAndType()
leixingDuanyan()
aliasName()
stringValType()
numberValType()
discriminatedUnions()
thisDuotai()
indexType()
mappingType()
mappingTypeApply()
