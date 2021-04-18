// ## pm04-类
// npx tsc --pretty

// ### 继承

function extendsDemo() {
    class Animal {
        name: string;
        constructor(name: string) { this.name = name }
        move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
    class Snake extends Animal {
        constructor(name: string) { super(name) }
        move(distanceInMeters = 5) {
            console.log('Slithering')
            super.move(distanceInMeters)
        }
    }
    class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }

    let sam = new Snake("Sammy the Python");
    let tom: Animal = new Horse("Tommy the Palomino");

    sam.move();
    tom.move(34);
}
extendsDemo()

// ### 公共，私有与受保护的修饰符

function publicDemo() {
    // public
    class Animal {
        public name: string;
        public constructor(name: string) { this.name = name }
        public move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
    class Animal2 {
        public name: string;
        public constructor(name: string) { this.name = name }
        public move(distanceInMeters: number) {
            console.log(`animal2${this.name} moved ${distanceInMeters}m.`);
        }
    }
    let a2: Animal2 = new Animal('ainit') // 结构一样就是兼容的
}

function privateDemo() {
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName }
    }
    class Rhino extends Animal {
        constructor() { super('Rhino') }
        // setName(neme: string) {
        //     this.name = neme // private 禁止子属性访问
        // }
    }
    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Gost")
    let rhino = new Rhino()
    let employee = new Employee("Bob")

    animal = rhino;
    // animal = employee; // 错误: Animal 与 Employee 不兼容.
    // private 和 protected 要求相同的来源
}

function protectedDemo() {
    class Person {
        protected name: string;
        protected constructor(theName: string) { this.name = theName; }
    }
    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name)
            this.department = department
        }

        setName(neme: string) {
            this.name = neme
        }
    }

    let howard = new Employee("howard", "Sales")
    howard.setName('coder')
    // let john = new Person("John") // 错误: Animal 与 Employee 不兼容.
}

function readonlyDemo() {
    class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor(theName: string) {
            this.name = theName
        }
    }
    let dad = new Octopus("Man with the 8 strong legs");
    // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
}

function paramAttrDemo() {
    class Octopus {
        readonly numberOfLegs = 8;
        constructor(
            readonly name: string,
            public a: string,
            protected b: string,
            private c: string,
        ) { }
    }

}


publicDemo()
privateDemo()
protectedDemo()
readonlyDemo()
paramAttrDemo()

// ### 存取器
function getSetDemo() {
    let passcode = "secret passcode";
    class Employee {
        private _fullName: string;
        get fullName(): string {
            return this._fullName
        }
        set fullName(newName: string) {
            if (passcode == "secret passcode") {
                this._fullName = newName
            } else {
                console.log("Error: Unauthorized update of employee!")
            }
        }
    }

    let employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName)
    }
}
getSetDemo()

// ### 静态属性
function staticDemo() {
    class Grid {
        static origin = { x: 0, y: 0 };
        constructor(public scale: number) { }
        calculateDistanceFromOrigin(point: { x: number; y: number; }) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
    }
}

staticDemo()

function abstractDemo() {
    abstract class Department {
        constructor(public name: string) { }
        printName(): void {
            console.log('Department name:' + this.name)
        }

        abstract printMeeting(): void; // 类型定义
    }

    class AccountingDepartment extends Department {
        constructor() {
            super("Accounting and Auditing")
        }
        printMeeting() {
            console.log('The Accounting Department meets each Monday at 10am.')
        }
        generateReports(): void {
            console.log('Generating accounting reports...');
        }
    }
    let department: Department; // 允许创建一个对抽象类型的引用
    // department = new Department(); // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    department.printName();
    department.printMeeting();
    // department.generateReports(); // 错误: 方法在声明的抽象类中不存在 (变量的类型声明里不存在)
}


abstractDemo()

// ### 高级技巧
// #### 构造函数

function constructDemo() {
    class Greeter {
        static standardGreeting = "Hello, there";
        greeting: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }

    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet())

    let greeterMaker: typeof Greeter = Greeter
    greeterMaker.standardGreeting = "Hay there!"

    let greeter2: Greeter = new greeterMaker()
    console.log(greeter2.greet())
}
constructDemo()

// #### 把类当做接口使用
function classInterfaceDemo() {
    class Point {
        x: number;
        y: number;
    }
    interface Point3D extends Point {
        z: number;
    }

    let porint3d: Point3D = { x: 1, y: 2, z: 3 }
}
classInterfaceDemo()
