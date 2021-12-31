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
function thisInCallback(){
    interface UIElement {
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }
    let uiElement: UIElement = {
        addClickListener(onclick) {
            onclick(new Event('hello'));
        }
    }
    class Handler {
        info: string;
        onClickBad(this: Handler, e: Event) { // 传入注册函数后没有明确的引用关系确定this 默认是window 严格模式下是undefined
            // oops, used this here. using this callback would crash at runtime
            this.info = e.type // e.message;
        }
        onClickGood(this: void, e: Event) {
            // can't use this here because it's of type void!
            console.log('clicked!');
        }
        onClickGood1 = (e: Event) => { this.info = e.type }
    }
    let h = new Handler();
    // uiElement.addClickListener(h.onClickBad); // error!
    uiElement.addClickListener(h.onClickGood);
    uiElement.addClickListener(h.onClickGood1); 
}

function overload(){
    let suits = ["hearts", "spades", "clubs", "diamonds"];

    // 重载定义
    function pickCard(x: { suit: string; card: number; }[]): number;
    function pickCard(x: number): { suit: string; card: number; };
    // 函数体定义
    function pickCard(x: any ): any {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        // Otherwise just let them pick the card
        else if (typeof x == "number") {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }

    let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    let pickedCard1 = myDeck[pickCard(myDeck)];
    alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

    let pickedCard2 = pickCard(15);
    alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}

funTypeDefine()
typeInfer()
kexuanCanshuMorenCanshu()
kexuanMoren()
shengyuCanshu()
thisType()
thisInCallback()
overload()

