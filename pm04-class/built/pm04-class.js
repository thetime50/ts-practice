// ## pm04-类
// npx tsc --pretty
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ### 继承
function extendsDemo() {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.move = function (distanceInMeters) {
            console.log(this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            return _super.call(this, name) || this;
        }
        Snake.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 5; }
            console.log('Slithering');
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Snake;
    }(Animal));
    var Horse = /** @class */ (function (_super) {
        __extends(Horse, _super);
        function Horse(name) {
            return _super.call(this, name) || this;
        }
        Horse.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 45; }
            console.log("Galloping...");
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Horse;
    }(Animal));
    var sam = new Snake("Sammy the Python");
    var tom = new Horse("Tommy the Palomino");
    sam.move();
    tom.move(34);
}
extendsDemo();
// ### 公共，私有与受保护的修饰符
function publicDemo() {
    // public
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.move = function (distanceInMeters) {
            console.log(this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Animal2 = /** @class */ (function () {
        function Animal2(name) {
            this.name = name;
        }
        Animal2.prototype.move = function (distanceInMeters) {
            console.log("animal2" + this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal2;
    }());
    var a2 = new Animal('ainit'); // 结构一样就是兼容的
}
function privateDemo() {
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    var Rhino = /** @class */ (function (_super) {
        __extends(Rhino, _super);
        function Rhino() {
            return _super.call(this, 'Rhino') || this;
        }
        return Rhino;
    }(Animal));
    var Employee = /** @class */ (function () {
        function Employee(theName) {
            this.name = theName;
        }
        return Employee;
    }());
    var animal = new Animal("Gost");
    var rhino = new Rhino();
    var employee = new Employee("Bob");
    animal = rhino;
    // animal = employee; // 错误: Animal 与 Employee 不兼容.
    // private 和 protected 要求相同的来源
}
function protectedDemo() {
    var Person = /** @class */ (function () {
        function Person(theName) {
            this.name = theName;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(name, department) {
            var _this = _super.call(this, name) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.setName = function (neme) {
            this.name = neme;
        };
        return Employee;
    }(Person));
    var howard = new Employee("howard", "Sales");
    howard.setName('coder');
    // let john = new Person("John") // 错误: Animal 与 Employee 不兼容.
}
function readonlyDemo() {
    var Octopus = /** @class */ (function () {
        function Octopus(theName) {
            this.numberOfLegs = 8;
            this.name = theName;
        }
        return Octopus;
    }());
    var dad = new Octopus("Man with the 8 strong legs");
    // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
}
function paramAttrDemo() {
    var Octopus = /** @class */ (function () {
        function Octopus(name, a, b, c) {
            this.name = name;
            this.a = a;
            this.b = b;
            this.c = c;
            this.numberOfLegs = 8;
        }
        return Octopus;
    }());
}
publicDemo();
privateDemo();
protectedDemo();
readonlyDemo();
paramAttrDemo();
// ### 存取器
function getSetDemo() {
    var passcode = "secret passcode";
    var Employee = /** @class */ (function () {
        function Employee() {
        }
        Object.defineProperty(Employee.prototype, "fullName", {
            get: function () {
                return this._fullName;
            },
            set: function (newName) {
                if (passcode == "secret passcode") {
                    this._fullName = newName;
                }
                else {
                    console.log("Error: Unauthorized update of employee!");
                }
            },
            enumerable: true,
            configurable: true
        });
        return Employee;
    }());
    var employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }
}
getSetDemo();
// ### 静态属性
function staticDemo() {
    var Grid = /** @class */ (function () {
        function Grid(scale) {
            this.scale = scale;
        }
        Grid.prototype.calculateDistanceFromOrigin = function (point) {
            var xDist = (point.x - Grid.origin.x);
            var yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        };
        Grid.origin = { x: 0, y: 0 };
        return Grid;
    }());
}
staticDemo();
function abstractDemo() {
    var Department = /** @class */ (function () {
        function Department(name) {
            this.name = name;
        }
        Department.prototype.printName = function () {
            console.log('Department name:' + this.name);
        };
        return Department;
    }());
    var AccountingDepartment = /** @class */ (function (_super) {
        __extends(AccountingDepartment, _super);
        function AccountingDepartment() {
            return _super.call(this, "Accounting and Auditing") || this;
        }
        AccountingDepartment.prototype.printMeeting = function () {
            console.log('The Accounting Department meets each Monday at 10am.');
        };
        AccountingDepartment.prototype.generateReports = function () {
            console.log('Generating accounting reports...');
        };
        return AccountingDepartment;
    }(Department));
    var department; // 允许创建一个对抽象类型的引用
    // department = new Department(); // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    department.printName();
    department.printMeeting();
    // department.generateReports(); // 错误: 方法在声明的抽象类中不存在 (变量的类型声明里不存在)
}
abstractDemo();
// ### 高级技巧
// #### 构造函数
function constructDemo() {
    var Greeter = /** @class */ (function () {
        function Greeter() {
        }
        Greeter.prototype.greet = function () {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        };
        Greeter.standardGreeting = "Hello, there";
        return Greeter;
    }());
    var greeter1;
    greeter1 = new Greeter();
    console.log(greeter1.greet());
    var greeterMaker = Greeter;
    greeterMaker.standardGreeting = "Hay there!";
    var greeter2 = new greeterMaker();
    console.log(greeter2.greet());
}
constructDemo();
// #### 把类当做接口使用
function classInterfaceDemo() {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var porint3d = { x: 1, y: 2, z: 3 };
}
classInterfaceDemo();
//# sourceMappingURL=pm04-class.js.map