// npx tsc p01 - start.ts
// ## 类型注解
function typeFn() {
    function greeter(person) {
        return "Hello, " + person;
    }
    var user = "Jane User";
    // let user = [1, 2, 3]; // 参数类型错误
    document.body.innerHTML = greeter(user);
    // document.body.innerHTML = greeter(user, 3); // 参数数量错误
}
typeFn();
// ## 接口
function interfaceFn() {
    function greeter(person) {
        return "Hello," + person.firstName + person.lastName;
    }
    var user = {
        firstName: "Jane",
        lastName: "User",
        test: "aaa"
    };
    document.body.innerHTML = greeter(user);
}
interfaceFn();
// ## 类
// 在构造函数的参数上使用public等同于创建了同名的成员变量。
function classFn() {
    var Student = /** @class */ (function () {
        function Student(firstName, middleInitial, lastName) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.fullName = [firstName, middleInitial, lastName].join(" ");
        }
        return Student;
    }());
    function greeter(person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    var user = new Student("Jane", "M.", "User");
    document.body.innerHTML = greeter(user);
}
classFn();
