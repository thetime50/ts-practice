// pm19-装饰器
// npx tsc --pretty
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function funDecorators() {
    function first() {
        console.log("first(): factory evaluated");
        return function (target, propertyKey, descriptor) {
            console.log("first(): called");
        };
    }
    function second() {
        console.log("second(): factory evaluated");
        return function (target, propertyKey, descriptor) {
            console.log("second(): called");
        };
    }
    class ExampleClass {
        method() {
            console.log('method');
        }
    }
    __decorate([
        first(),
        second()
    ], ExampleClass.prototype, "method", null);
    new ExampleClass().method();
}
function classDecorators() {
    function sealed(constructor) {
        Object.seal(constructor); // 封闭对象的属性加载修改
        Object.seal(constructor.prototype); // 封闭对象的属性加载修改
    }
    let Greeter = class Greeter {
        constructor(message) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    };
    Greeter = __decorate([
        sealed
    ], Greeter);
    function classDeco(constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.newProperty = "new property";
                this.hello = "override";
            }
        };
    }
    let Greeter2 = class Greeter2 {
        constructor(m) {
            this.property = "property";
            // this.hello = m
        }
    };
    Greeter2 = __decorate([
        classDeco
    ], Greeter2);
    console.log('new Greeter2("world")', new Greeter2("world"));
}
funDecorators();
classDecorators();
//# sourceMappingURL=pm19-google-vignette.js.map