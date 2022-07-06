// npx tsc --pretty

// https://yqz0203.github.io/decorator-and-reflect-metadata-in-typescript/

// import { ArrayLiteralExpression } from "typescript"
import "reflect-metadata"

function validateTest(){
    console.log("\n/****validateTest****/")
    function Type(type: any){
        return Reflect.metadata('design:type', type)
    }
    function ParamTypes(...types: any[]){
        return Reflect.metadata('design:paramtypes', types)
    }
    function ReturnType(type: PropertyDescriptor){
        return Reflect.metadata('design:returntype', type)
    }

    const validate: any = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const set = descriptor.set
        descriptor.set = function(value: any){
            let type = Reflect.getMetadata('design:type', target, propertyKey)
            console.log('type', type)
            if(!(value instanceof type)){
                throw new TypeError(`Invalid type ${type}`)
            }
            set && set(value)
        }
    }

    class C {
        @validate // 获取 design:type 元数据校验set 参数类型
        @Type(String) // 给name 绑定 design:type 元数据
        get name(): any {
            return 'text'
        }
        set name(value: any) {
            console.log(value)
        }
    }

    const c = new C()
    // c.name = 10
    // c.name = '10' // 也报错 dog 字符串值不是String的实例
    c.name = new String('10')
}

function validateTest2(){
    console.log("\n/****validateTest2****/")
    const validateClass: any = (target: any) => {
        console.log('target == C', target == C)
        // if( Reflect.getO )
        const constructorValid:any = {} // 静态方法
        for (let key of Object.getOwnPropertyNames(target)){
            let validate = Reflect.getMetadata(VALIDMDKEY, target, key)
            if (validate){
                constructorValid[key] = validate
            }
        }
        const prototypeValid:any = {} // 原型方法
        for (let key of Object.getOwnPropertyNames(target.prototype)  ){
            let validate = Reflect.getMetadata(VALIDMDKEY, target.prototype, key)
            if (validate){
                // const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key)
                prototypeValid[key] = validate
            }
        }
        if (Object.keys(constructorValid).length || Object.keys(prototypeValid).length){
            class ResClass extends target{
                constructor(...args: any[]){
                    super(...args)
                    const that = this
                    console.log('hello')
                    for (let key in prototypeValid){
                        let origin = Object.getOwnPropertyDescriptor(target.prototype , key)!
                        if (origin.value) { // 方法属性
                            if (that[key].prototype) { // function 函数
                                Object.defineProperty(that, key, {
                                    ...origin,
                                    value:function (...args: any[]) {
                                        (prototypeValid)[key](...args)
                                        origin.value.apply(that, args)
                                    }
                                })
                            } else { // 箭头函数
                                Object.defineProperty(that, key, {
                                    ...origin,
                                    value:(...args: any[]) => {
                                        (prototypeValid)[key](...args)
                                        origin.value.apply(that, args)
                                    }
                                })
                            }
                        } else if (origin.set) { // accessor
                            Object.defineProperty(that, key, {
                                ...origin,
                                set: function (...args: any[]) {
                                    (prototypeValid)[key](...args)
                                    origin.set && origin.set.apply(that, args)
                                }
                            })
                        }
                    }
                }
            }
            if (Object.keys(constructorValid).length){
                for (let key in constructorValid) {
                    let origin = Object.getOwnPropertyDescriptor(target, key)!
                    if (ResClass[key].prototype) { // function 函数
                        Object.defineProperty(ResClass, key, {
                            ...origin,
                            value: function (...args: any[]){
                                (constructorValid)[key](...args)
                                origin.value.apply(ResClass, args)
                            }
                        })
                    } else { // 箭头函数
                        Object.defineProperty(ResClass, key, {
                            ...origin,
                            value: (...args: any[]) => {
                                (constructorValid)[key](...args)
                                origin.value.apply(ResClass, args)
                            }
                        })
                    }
                }
            }
            return ResClass
        }
    }
    const VALIDMDKEY = '__validata:parameter'
    const validateDecorator = ( target:any, propertyKey: string, descriptor: PropertyDescriptor) => {
        /**
         * 1. 属性校验装饰器上绑定校验方法
         * 1. 实例化的时候记录实例 
         *    1.1 替换构造函数
         *    1.2 defineProperty 替换方法 添加校验
         */

        let types = Reflect.getMetadata('design:paramtypes', target, propertyKey) as any[] | undefined // ArrayLiteralExpression
        // 类型 bigint 联合类型 可变参数 无法通过design:paramtypes传递
        const baseType = {//['number', 'string', 'boolean', /* null, undefined , Symbol, BigInt */]
            number: Number,
            string: String,
            boolean: Boolean,
            null: undefined,// null,
            undefined: undefined,
            symbol: Symbol,
            bigint: BigInt,
            // function: Function
        }
        if (types && types.length){
            function parameterValidata(...args: any[]){
                types && types.forEach((type , index:number) => {
                    if (type !== Object ){
                        if (baseType.hasOwnProperty(typeof args[index] )){
                            if (type !==  (<any>baseType)[typeof args[index]]){
                                throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                            }
                        } else if (typeof type == "function"){
                            if (/^class /.test(type.toString())){ // 是类构造函数
                                if (!(args[index] instanceof type)){
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            }else{ // 一般函数
                                if(typeof args[index] !== 'function' ){
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            }
                        }
                    } else { // bigint 联合类型 可变参数
                        // 
                    }
                })
            }
            console.log('target == C', target == C, target == C.prototype)
            Reflect.defineMetadata(VALIDMDKEY, parameterValidata, target, propertyKey)
        }
    }

    class C0{}
    @validateClass
    class C{
        private _name: String = '';
        constructor(){

        }

        @validateDecorator
        get name(){
            return this.name
        }
        set name(value: String){
            console.log('this', this)
            this._name = value
        }

        @validateDecorator
        add( a:number, b:number|string){
            return  a.toString() + b
        }

        @validateDecorator
        test(
            num:number, str:string, bo: boolean, 
            nu:null, un:undefined, sym:symbol,
            /* bi: BigInt, */cb: (a: number, b: number) => number, c:C0, ...attr: [number,number]){

            return cb.call(this, ...attr)
        }
        @validateDecorator
        static staticTest(
            num: number, str: string, bo: boolean,
            nu: null, un: undefined, sym: symbol,
            /* bi: BigInt, */ cb: (a: number, b: number) => number, c: C0, ...attr: [number, number]) {

            return cb.call(this, ...attr)
        }
    }

    const c = new C()
    // c.name = "10"
    // c.name = new String('10')

    function getParams(){
        return {
            num: <any> 10,
            str: <any> 'hello',
            bo: <any> true,
            nu: <any> null,
            un: <any> undefined,
            sym: <any> Symbol('symbol'),
            /* bi: <any> BigInt(3), // 3n,// new BigInt(3) */
            cb: <any> ((a: number, b: number) => a + b),
            c: <any> new C0(),
            attr: <[number, number]> [3,2]
        }
    }
    function callTest(params: any){
        console.log('/*callTest*/')
        let res = c.test(
            params.num, params.str, params.bo,
            params.nu, params.un, params.sym,
            /* params.bi, */ params.cb, params.c, ...params.attr as [number, number]
        )
        console.log('test',res)
    }
    function callStaticTest(params: any){
        console.log('/*callStaticTest*/')
        let res = C.staticTest(
            params.num, params.str, params.bo,
            params.nu, params.un, params.sym,
            /* params.bi, */ params.cb, params.c, ...params.attr as [number, number]
        )
        console.log('staticTest',res)
    }
    let params = getParams()
    callTest(params)
    callStaticTest(params)

    params = getParams()
    params.num = '10'
    // callTest(params) // 报类型错误
    // callStaticTest(params) // 报类型错误
}

validateTest()
validateTest2()
