// pm19-装饰器
// npx tsc --pretty

// https://www.typescriptlang.org/docs/handbook/decorators.html

function funDecorators(){
    console.log('\n/****funDecorators****/')
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
    console.log('\n/****classDecorators****/')
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
    console.log('\n/****methodDecorators****/')
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

function metuod2Descorators(){
    console.log('\n/****metuod2Descorators****/')
    class MethodTest{
        @methodDec('static') // 静态方法修饰器里传入的是构造函数
        static staticMethod(val: string|number){
            console.log('staticMethod',this, val)
        }

        @methodDec('instance') // 实例(原型)方法修饰器里传入的是原型对象
        instanceMethod(val: string|number){
            console.log('instanceMethod',this, val)
        }
    }
    function methodDec(type:string){ // 都是在类声明的时候调用 而不是在实例化的时候
        return function (
            target:any,
            propertyKey:string,
            descriptor:PropertyDescriptor
        ){
            target['__'+type] = type
        }
    }

    const methodTest = new MethodTest()
    MethodTest.staticMethod(2)
    methodTest.instanceMethod(1)
    console.log('methodTest', methodTest)
}

function accessorDecorators(){
    console.log('\n/****accessorDecorators****/')
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
// https://rbuckton.github.io/reflect-metadata/
import "reflect-metadata";
// require("reflect-metadata")
function propertyDecorators(){
    console.log('\n/****propertyDecorators****/')
    const formatMetadataKey = Symbol("format");
    function format(formatString: string) {
        return Reflect.metadata(formatMetadataKey, formatString);
    }
    function getFormat(target: any, propertyKey: string) {
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }
    class Greeter{
        @format("Hello,%s")
        greeting: string;

        constructor(message: string){
            this.greeting = message
        }
        greet(){
            let formatString =getFormat(this,"greeting")
            return formatString.replace("%s", this.greeting)
        }
    }
}

function parameterDecorators(){
    console.log('\n/****parameterDecorators****/')

    class BugReport{
        type = "report";
        title:string;
        constructor(t: string){
            this.title = t;
        }

        @validate
        print(@required verbose: boolean){
            if(verbose){
                return `type:${this.type}\ntitle:${this.title}`
            }else{
                return this.title
            }
        }
        
    }

    const requiredMetadataKey = Symbol("required");
    function required(target: any, propertyKey: string|symbol, parameterIndex: number){
        let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex)
        Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey)
    }

    function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>){
        let method = descriptor.value!;
        descriptor.value = function(){
            let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName) || [];
            if(requiredParameters){
                for(let parameterIndex of requiredParameters){
                    if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefined){
                        throw new Error(`Missing required argument: ${parameterIndex}`)
                    }
                }
            }
            return method.apply(this, arguments)
        }
    }
}

funDecorators()
classDecorators()
methodDecorators()
metuod2Descorators()
accessorDecorators()
propertyDecorators()
parameterDecorators()
