// ## pm05 - 函数
// npx tsc --pretty
// --noImplicitThis

function funTypeDefine(){
    function add(x:number, y:number):number{
        return x + y
    }
    let myAdd = function(x:number, y:number):number{return x + y}

    // 完整书写
    let myAdd2: (baseValue: number, increment: number) => number =
        function(x: number, y: number): number { return x + y }
}

function typeInfer(){
    let myAdd2 = function(x: number, y: number): number { return x + y }
    let myAdd: (x: number, y: number) => number = function(x, y) { return x + y }
}

// 可选参数和默认参数
function kexuanCanshuMorenCanshu(){
    function buildName(firstName:string, lastName?:string){
        return firstName + " " + lastName
    }
    function buildName1(firstName: string, lastName="Smith"){
        return firstName + " " + lastName
    }
}
// 可选参数和默认参数公用类型
function kexuanMoren(){
    let fa = function (x: number, y: number) {
        return 'rrr'
    }

    let fb = function (x: number, y?: string) {
        return 'rrr'
    }

    let fc = function (x: number, y = 'a') {
        return 'rrr'
    }

    // let ft1: typeof fa = fb // error
    let ft2: typeof fb = fc
}

// 剩余参数
function shengyuCanshu(){
    function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }
    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
}

// 对this的声明
function thisType() {
    interface AddInterfack {
        a: number;
        b: number;
        fn: (this: AddInterfack) => number;
    }
    let addObj: AddInterfack = {
        a: 1,
        b: 2,
        fn: function () {
            return this.a + this.b
        }
    }
    console.log(addObj.fn())
}

funTypeDefine()
typeInfer()
kexuanCanshuMorenCanshu()
kexuanMoren()
shengyuCanshu()
thisType()

