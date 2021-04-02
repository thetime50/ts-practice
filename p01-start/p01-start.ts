// npx tsc p01 - start.ts

// ## 类型注解
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";
// let user = [1, 2, 3]; // 参数类型错误

document.body.innerHTML = greeter(user);
// document.body.innerHTML = greeter(user, 3); // 参数数量错误

// ## 接口
interface Person {
    firstName: string,
    lastNage: String;
}

function greeter1(person: Person) {
    return "Hello," + person.firstName + person.lastNage
}
let user1 = {
    firstName: "Jane",
    lastNage: "User",
    test: "aaa", //缺少字段会报错 多出不影响
}
document.body.innerHTML = greeter1(user1)
