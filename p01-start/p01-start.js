// npx tsc p01 - start.ts
// ## 类型注解
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
// let user = [1, 2, 3]; // 参数类型错误
document.body.innerHTML = greeter(user);
function greeter1(person) {
    return "Hello," + person.firstName + person.lastNage;
}
var user1 = {
    firstName: "Jane"
};
document.body.innerHTML = greeter1(user1);
