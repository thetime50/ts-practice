// ## pm10 - 高级类型
// npx tsc --pretty

// 交叉类型
function intersectionTypes(){

    function extend<T extends object, U extends object>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (let id in second) {
            // if (!(<any>result).hasOwnProperty(id)) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    class Person {
        constructor(public name: string) { }
    }
    interface Loggable {
        log(): void;
    }
    class ConsoleLogger implements Loggable {
        log() {
            // ...
        }
    }
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    var n = jim.name;
    jim.log();
}

// 联合类型
function unionTypes(){

    function padLeft(value: string, padding: string | number) {
        // ...
    }

    // let indentedString = padLeft("Hello world", true); // errors during compilation

    interface Bird {
        fly:()=>void;
        layEggs:()=>void;
    }

    interface Fish {
        swim:()=>void;
        layEggs:()=>void;
    }

    function getSmallPet(type:boolean): Fish | Bird {
        if (type){
            return <Fish>{ swim: () => { }, layEggs: () => { },}
        }else{
            return <Bird>{ fly: () => { }, layEggs: () => { }, }

        }
    }

    let pet = getSmallPet(false);
    pet.layEggs(); // okay
    // pet.swim();    // errors

    // 类型区分
    // 用类型断言访问属性区分类型
    // let pet = getSmallPet(fa);

    // // 每一个成员访问都会报错
    // if (pet.swim) {
    //     pet.swim();
    // }
    // else if (pet.fly) {
    //     pet.fly();
    // }

    ////////////////////////////
    // 使用类型断言
    let pet1 = getSmallPet(false);

    if ((<Fish>pet1).swim) {
        (<Fish>pet1).swim();
    }
    else {
        (<Bird>pet1).fly();
    }

    /////////////////////////////
    // 类型保护机制

    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }


    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
}


// 类型断言
function leixingDuanyan(){
    // function broken(name: string | null): string {
    //     function postfix(epithet: string) {
    //         return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    //     }
    //     name = name || "Bob";
    //     return postfix("great");
    // }

    function fixed(name: string | null): string {
        function postfix(epithet: string) {
            return name!.charAt(0) + '.  the ' + epithet; // ok
        }
        name = name || "Bob";
        return postfix("great");
    }
    fixed(null)
}

intersectionTypes()
unionTypes()
leixingDuanyan()