// ## pm08-类型推论
// npx tsc --pretty


class Animal { }
class Rhino extends Animal { }
class Elephant extends Animal { }
class Snake extends Animal { }

// 最佳通用类型

let zoo = [new Rhino(), new Elephant(), new Snake()]; // 没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)
let zoo1: Animal[] = [new Rhino(), new Elephant(), new Snake()]; // 生动指定类型

// 上下文类型
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
    // console.log(mouseEvent.kangaroo);
    // Property 'kangaroo' does not exist on type 'MouseEvent'.
};

// 上下文类型作为候选类型
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
