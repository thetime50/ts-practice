// ## pm05 - 函数
// npx tsc --pretty
// --noImplicitThis
function funTypeDefine() {
    function add(x, y) {
        return x + y;
    }
    var myAdd = function (x, y) { return x + y; };
    // 完整书写
    var myAdd2 = function (x, y) { return x + y; };
}
function typeInfer() {
    var myAdd2 = function (x, y) { return x + y; };
    var myAdd = function (x, y) { return x + y; };
}
// 可选参数和默认参数
function kexuanCanshuMorenCanshu() {
    function buildName(firstName, lastName) {
        return firstName + " " + lastName;
    }
    function buildName1(firstName, lastName) {
        if (lastName === void 0) { lastName = "Smith"; }
        return firstName + " " + lastName;
    }
}
// 可选参数和默认参数公用类型
function kexuanMoren() {
    var fa = function (x, y) {
        return 'rrr';
    };
    var fb = function (x, y) {
        return 'rrr';
    };
    var fc = function (x, y) {
        if (y === void 0) { y = 'a'; }
        return 'rrr';
    };
    // let ft1: typeof fa = fb // error
    var ft2 = fc;
}
// 剩余参数
function shengyuCanshu() {
    function buildName(firstName) {
        var restOfName = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restOfName[_i - 1] = arguments[_i];
        }
        return firstName + " " + restOfName.join(" ");
    }
    var employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
}
// 对this的声明
function thisType() {
    var addObj = {
        a: 1,
        b: 2,
        fn: function () {
            return this.a + this.b;
        }
    };
    console.log(addObj.fn());
}
function thisInCallback() {
    var uiElement = {
        addClickListener: function (onclick) {
            onclick(new Event('hello'));
        }
    };
    var Handler = /** @class */ (function () {
        function Handler() {
            var _this = this;
            this.onClickGood1 = function (e) { _this.info = e.type; };
        }
        Handler.prototype.onClickBad = function (e) {
            // oops, used this here. using this callback would crash at runtime
            this.info = e.type; // e.message;
        };
        Handler.prototype.onClickGood = function (e) {
            // can't use this here because it's of type void!
            console.log('clicked!');
        };
        return Handler;
    }());
    var h = new Handler();
    // uiElement.addClickListener(h.onClickBad); // error!
    uiElement.addClickListener(h.onClickGood);
    uiElement.addClickListener(h.onClickGood1);
}
function overload() {
    var suits = ["hearts", "spades", "clubs", "diamonds"];
    function pickCard(x) {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x == "object") {
            var pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        // Otherwise just let them pick the card
        else if (typeof x == "number") {
            var pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }
    var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    var pickedCard1 = myDeck[pickCard(myDeck)];
    alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
    var pickedCard2 = pickCard(15);
    alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}
funTypeDefine();
typeInfer();
kexuanCanshuMorenCanshu();
kexuanMoren();
shengyuCanshu();
thisType();
thisInCallback();
overload();
//# sourceMappingURL=pm05-function.js.map