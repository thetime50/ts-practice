// pm19-装饰器
// npx tsc --pretty

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
    let greet2 = new Greeter2("world")
    console.log('new Greeter2("world")', greet2)
    // greet2.newProperty

    function reportableClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            reportingURL = "http://www...";
        };
    }

    @reportableClassDecorator
    class BugReport {
        type = "report";
        title: string;

        constructor(t: string) {
            this.title = t;
        }
    }

    const bug = new BugReport("Needs dark mode");
    console.log(bug.title); // Prints "Needs dark mode"
    console.log(bug.type); // Prints "report"

    // 装饰器不会修改ts 类型 所以新属性不会被识别 (虽然对象上会有这属性)
    // bug.reportingURL;
}

function fun2Decorators(){
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }

        @enumerable(false)
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    function enumerable(value: boolean) {
        return function(target: any, propertyKry: string, descriptor: PropertyDescriptor) {
            descriptor.enumerable = value;
        }
    }
}
function propertyDecorators(){

}

funDecorators()
classDecorators()
fun2Decorators()
propertyDecorators()
