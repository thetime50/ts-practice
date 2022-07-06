// decorator-validate-define-property
import "reflect-metadata"

export function validateDefinePropertyTest(){
    console.log('\n\n/**** validateDefineProperty ****/')

    const validateClass: any = (target: any) => {
        // if( Reflect.getO )
        const constructorValid: any = {} // 静态方法
        for (let key of Object.getOwnPropertyNames(target)) {
            let validate = Reflect.getMetadata(VALIDMDKEY, target, key)
            if (validate) {
                constructorValid[key] = validate
            }
        }
        const prototypeValid: any = {} // 原型方法
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            let validate = Reflect.getMetadata(VALIDMDKEY, target.prototype, key)
            if (validate) {
                // const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key)
                prototypeValid[key] = validate
            }
        }
        if (Object.keys(constructorValid).length || Object.keys(prototypeValid).length) {
            class ResClass extends target {
                constructor(...args: any[]) {
                    super(...args)
                    const that = this
                    for (let key in prototypeValid) {
                        let origin = Object.getOwnPropertyDescriptor(target.prototype, key)!
                        if (origin.value) { // 方法属性
                            if (that[key].prototype) { // function 函数
                                Object.defineProperty(that, key, {
                                    ...origin,
                                    value: function (...args: any[]) {
                                        (prototypeValid)[key](...args)
                                        return origin.value.apply(that, args)
                                    }
                                })
                            } else { // 箭头函数
                                Object.defineProperty(that, key, {
                                    ...origin,
                                    value: (...args: any[]) => {
                                        (prototypeValid)[key](...args)
                                        return origin.value.apply(that, args)
                                    }
                                })
                            }
                        } else if (origin.set) { // accessor
                            Object.defineProperty(that, key, {
                                ...origin,
                                set: function (...args: any[]) {
                                    (prototypeValid)[key](...args)
                                    return origin.set && origin.set.apply(that, args)
                                }
                            })
                        }
                    }
                }
            }
            if (Object.keys(constructorValid).length) {
                for (let key in constructorValid) {
                    let origin = Object.getOwnPropertyDescriptor(target, key)!
                    if (ResClass[key].prototype) { // function 函数
                        Object.defineProperty(ResClass, key, {
                            ...origin,
                            value: function (...args: any[]) {
                                (constructorValid)[key](...args)
                                return origin.value.apply(ResClass, args)
                            }
                        })
                    } else { // 箭头函数
                        Object.defineProperty(ResClass, key, {
                            ...origin,
                            value: (...args: any[]) => {
                                (constructorValid)[key](...args)
                                return origin.value.apply(ResClass, args)
                            }
                        })
                    }
                }
            }
            return ResClass
        }
    }
    const VALIDMDKEY = '__validata:parameter'
    const validateDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
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
        if (types && types.length) {
            function parameterValidata(...args: any[]) {
                types && types.forEach((type, index: number) => {
                    if (type !== Object) {
                        if (baseType.hasOwnProperty(typeof args[index])) {
                            if (type !== (<any>baseType)[typeof args[index]]) {
                                throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                            }
                        } else if (typeof type == "function") {
                            if (/^class /.test(type.toString())) { // 是类构造函数
                                if (!(args[index] instanceof type)) {
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            } else { // 一般函数
                                if (typeof args[index] !== 'function') {
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            }
                        }
                    } else { // bigint 联合类型 可变参数
                        // 
                    }
                })
            }
            Reflect.defineMetadata(VALIDMDKEY, parameterValidata, target, propertyKey)
        }
    }
    testFunction(validateClass, validateDecorator)
}



export function validateDefinePropertyTest2() {
    console.log('\n\n/**** validateDefineProperty2 ****/')

    const validateClass: any = (target: any) => {
        // if( Reflect.getO )
        const constructorValid: any = {} // 静态方法
        for (let key of Object.getOwnPropertyNames(target)) {
            let validate = Reflect.getMetadata(VALIDMDKEY, target, key)
            if (validate) {
                constructorValid[key] = validate
            }
        }
        const prototypeValid: any = {} // 原型方法
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            let validate = Reflect.getMetadata(VALIDMDKEY, target.prototype, key)
            if (validate) {
                // const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key)
                prototypeValid[key] = validate
            }
        }
        if (Object.keys(constructorValid).length || Object.keys(prototypeValid).length) {
            const prototype = target.prototype
            for (let key in prototypeValid) {
                let origin = Object.getOwnPropertyDescriptor(prototype, key)!
                if (origin.value) { // 方法属性
                    if (prototype[key].prototype) { // function 函数
                        Object.defineProperty(prototype, key, {
                            ...origin,
                            value: function (...args: any[]) {
                                (prototypeValid)[key](...args)
                                return origin.value.apply(prototype, args)
                            }
                        })
                    } else { // 箭头函数
                        Object.defineProperty(prototype, key, {
                            ...origin,
                            value: (...args: any[]) => {
                                (prototypeValid)[key](...args)
                                return origin.value.apply(prototype, args)
                            }
                        })
                    }
                } else if (origin.set) { // accessor
                    Object.defineProperty(prototype, key, {
                        ...origin,
                        set: function (...args: any[]) {
                            (prototypeValid)[key](...args)
                            return origin.set && origin.set.apply(prototype, args)
                        }
                    })
                }
            }
            if (Object.keys(constructorValid).length) {
                for (let key in constructorValid) {
                    let origin = Object.getOwnPropertyDescriptor(target, key)!
                    if (target[key].prototype) { // function 函数
                        Object.defineProperty(target, key, {
                            ...origin,
                            value: function (...args: any[]) {
                                (constructorValid)[key](...args)
                                return origin.value.apply(target, args)
                            }
                        })
                    } else { // 箭头函数
                        Object.defineProperty(target, key, {
                            ...origin,
                            value: (...args: any[]) => {
                                (constructorValid)[key](...args)
                                return origin.value.apply(target, args)
                            }
                        })
                    }
                }
            }
        }
    }
    const VALIDMDKEY = '__validata:parameter'
    const validateDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

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
        if (types && types.length) {
            function parameterValidata(...args: any[]) {
                types && types.forEach((type, index: number) => {
                    if (type !== Object) {
                        if (baseType.hasOwnProperty(typeof args[index])) {
                            if (type !== (<any>baseType)[typeof args[index]]) {
                                throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                            }
                        } else if (typeof type == "function") {
                            if (/^class /.test(type.toString())) { // 是类构造函数
                                if (!(args[index] instanceof type)) {
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            } else { // 一般函数
                                if (typeof args[index] !== 'function') {
                                    throw new TypeError(`Invalid type ${typeof args[index]},need ${type}`)
                                }
                            }
                        }
                    } else { // bigint 联合类型 可变参数
                        // 
                    }
                })
            }
            Reflect.defineMetadata(VALIDMDKEY, parameterValidata, target, propertyKey)
        }
    }
    testFunction(validateClass, validateDecorator)
}

function testFunction(
    validateClass: (target: any) => any, 
    validateDecorator: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
){

    class C0 { }
    @validateClass
    class C {
        private _name: String = '';
        constructor() {

        }

        @validateDecorator
        get name() {
            return this._name
        }
        set name(value: String) {
            console.log('this', this)
            this._name = value
        }

        @validateDecorator
        add(a: number, b: number | string) {
            return a.toString() + b
        }

        @validateDecorator
        test(
            num: number, str: string, bo: boolean,
            nu: null, un: undefined, sym: symbol,
            /* bi: BigInt, */cb: (a: number, b: number) => number, c: C0, ...attr: [number, number]) {

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

    function getParams() {
        return {
            num: <any>10,
            str: <any>'hello',
            bo: <any>true,
            nu: <any>null,
            un: <any>undefined,
            sym: <any>Symbol('symbol'),
            /* bi: <any> BigInt(3), // 3n,// new BigInt(3) */
            cb: <any>((a: number, b: number) => a + b),
            c: <any>new C0(),
            attr: <[number, number]>[3, 2]
        }
    }
    function callTest(params: any) {
        console.log('/*callTest*/')
        let res = c.test(
            params.num, params.str, params.bo,
            params.nu, params.un, params.sym,
            /* params.bi, */ params.cb, params.c, ...params.attr as [number, number]
        )
        console.log('test', res)
    }
    function callStaticTest(params: any) {
        console.log('/*callStaticTest*/')
        let res = C.staticTest(
            params.num, params.str, params.bo,
            params.nu, params.un, params.sym,
            /* params.bi, */ params.cb, params.c, ...params.attr as [number, number]
        )
        console.log('staticTest', res)
    }
    let params = getParams()
    callTest(params)
    callStaticTest(params)

    params = getParams()
    params.num = '10'
    // callTest(params) // 报类型错误
    // callStaticTest(params) // 报类型错误

    console.log('accessor test',)
    c.name = 'davie'
    console.log('c.name', c.name)
    // c.name = 10 as any // 报类型错误
}

if (require.main === module){
    // validateDefinePropertyTest()
    validateDefinePropertyTest2()
}
