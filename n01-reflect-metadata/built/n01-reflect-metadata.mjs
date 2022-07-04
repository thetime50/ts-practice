// npx tsc --pretty
// https://rbuckton.github.io/reflect-metadata/
// https://juejin.cn/post/6844904152812748807
import "reflect-metadata";
function decorateMethod() {
    const classDecorator = (target) => {
        target.prototype.sayName = () => console.log('override');
        // return target
    };
    class TestClassDecorator {
        constructor(name = "") {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }
    Reflect.decorate([classDecorator], TestClassDecorator);
    const t = new TestClassDecorator('nihao');
    t.sayName();
}
decorateMethod();
//# sourceMappingURL=n01-reflect-metadata.mjs.map