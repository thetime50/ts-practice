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
    console.log('new Greeter2("world")', new Greeter2("world"))
}


funDecorators()
classDecorators()
