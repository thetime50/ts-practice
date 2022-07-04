// pm19-装饰器
// npx tsc --pretty

// https://www.typescriptlang.org/docs/handbook/decorators.html

function funDecorators(){
    function first() {
        console.log("first(): factory evaluated");
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log("first(): called",...arguments);
        };
    }

    function second() {
        console.log("second(): factory evaluated");
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log("second(): called",...arguments);
        };
    }

    class ExampleClass {
        @first()
        @second()
        method() {
            console.log('method',)
        }
    }

    new ExampleClass().method();
}

function classDecorators(){
    function sealed(constructor: Function) {
        Object.seal(constructor);// 封闭对象的属性加载修改
        Object.seal(constructor.prototype);// 封闭对象的属性加载修改
    }
    @sealed
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    function classDeco<T extends {new(...args:any[]):{}}>(constructor:T){
        return class extends constructor {
            newProperty = "new property";
            hello = "override"; // 覆盖undified
        }
    }
    @classDeco
    class Greeter2 {
        property = "property";
        hello: string;
        constructor(m: string) {
            this.hello = m
        }
    }
    const greeter2 = new Greeter2("world")
    console.log('new Greeter2("world")', greeter2)
    // console.log('greeter2.newProperty', greeter2.newProperty) // 修饰器里的新属性不会修改class的类型结构
    // 虽然生成的对象里有这属性值 但是 ts 不能识别到这个属性

    function reportableClassDecorator<T extends { new (...args: any[]):{} }>(constructor: T){
        return class extends constructor {
            reportingURL = "http://www...";
        }
    };

    @reportableClassDecorator
    class BugReport{
        type="report";
        title:string;

        constructor(t: string){
            this.title = t;
        }
    }

    const bug = new BugReport("Needs dark mode")
    console.log('bug.title', bug.title)
    console.log('bug.type', bug.type)

    // console.log('bug.reportingURL', bug.reportingURL)
}

function methodDecorators(){
    class Greeter {
        greeting: string;
        constructor(message: string){
            this.greeting = message
        }

        @enumerable(false)
        greet(){
            return "Hello," + this.greeting
        }
    }

    function enumerable(value: boolean){
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
            descriptor.enumerable = value; // 属性可枚举
        }
    }

    const greeter = new Greeter("world")
    console.log('Object.keys( greeter)', Object.keys( greeter))
}

function accessorDecorators(){
    class Point{
        private _x: number;
        private _y: number;
        constructor(x:number, y:number ){
            this._x = x;
            this._y = y;
        }
        @configurable(false)
        get x(){
            return this._x;
        }
        set x(value: number){
            this._x = value;
        }

        @configurable(false)
        get y(){
            return this._y;
        }
    }

    function configurable(value: boolean){
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
            descriptor.configurable = value; // 属性可修改
        }
    }

    const point = new Point(1,2)
    console.log('point.x', point.x)
    point.x = 3; // 报错
}

funDecorators()
classDecorators()
methodDecorators()
accessorDecorators()
