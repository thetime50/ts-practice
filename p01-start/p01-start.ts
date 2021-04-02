// npx tsc p01 - start.ts

// ## 类型注解
function typeFn() {
    function greeter(person: string) {
        return "Hello, " + person;
    }
    
    let user = "Jane User";
    // let user = [1, 2, 3]; // 参数类型错误
    
    document.body.innerHTML = greeter(user);
    // document.body.innerHTML = greeter(user, 3); // 参数数量错误
}
typeFn()

// ## 接口
function interfaceFn() {
    interface Person {
        firstName: string,
        lastName: String;
    }
    
    function greeter(person: Person) {
        return "Hello," + person.firstName + person.lastName
    }
    let user = {
        firstName: "Jane",
        lastName: "User",
        test: "aaa", //缺少字段会报错 多出不影响
    }
    document.body.innerHTML = greeter(user)
}
interfaceFn()

// ## 类
// 在构造函数的参数上使用public等同于创建了同名的成员变量。
function classFn() {
    class Student {
        fullName: string;
        constructor(public firstName, public middleInitial, public lastName) {
            this.fullName = [firstName, middleInitial, lastName].join(" ")
        }
    }

    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName
    }

    let user = new Student("Jane", "M.", "User")
    document.body.innerHTML = greeter(user) // 类参数使用interface检查
}
classFn()
