
import "reflect-metadata"
import { validateTestFunction } from "./validate-test"

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#handler_对象的方法
export function validateProxyTest() {
    console.log( '\n\n/**** validateProxyTest ****/' )

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
                    super()
                    const that = this
                    if (Object.keys(prototypeValid).length){
                        const prototype = target.prototype
                        const thisProxy = new Proxy(that, {
                            get(target: any, p: string | symbol, receiver: any) {
                                let origin = Object.getOwnPropertyDescriptor(prototype, p)
                                if (origin && prototypeValid[p]){ 
                                    if (origin.hasOwnProperty('value')) {// 原型方法属性
                                        if (prototype[p].prototype) { // function 函数
                                            return (function(...args: any[]){
                                                prototypeValid[p](...args)
                                                return prototype[p].apply(that,args)
                                            })
                                        } else { // 箭头函数
                                            return ((...args: any[]) => {
                                                prototypeValid[p](...args)
                                                return prototype[p].apply(that, args) // ???
                                            })
                                        }

                                    }
                                }
                                return target[p]
                            },
                            set(target: any, p: string | symbol, value: any){
                                let origin = Object.getOwnPropertyDescriptor(prototype, p)
                                if (origin && prototypeValid[p] && origin.hasOwnProperty('set')) { // accessor
                                    prototypeValid[p](value)
                                    origin.set && origin.set.call(that, value)
                                    return true
                                } else {
                                    (that as any)[p] = value
                                    return true
                                }
                            },
                        })
                        return thisProxy
                    }
                }
            }

            if (Object.keys(constructorValid).length) {
                const classTarget = target
                const ResClassProxy = new Proxy(ResClass, {
                    get(target: any, p: string | symbol, receiver: any) {
                        let origin = Object.getOwnPropertyDescriptor(classTarget, p)
                        if (origin && constructorValid[p]) {
                            if (origin.hasOwnProperty('value')) {// 原型方法属性
                                if (target[p].prototype) { // function 函数
                                    return (function (...args: any[]) {
                                        constructorValid[p](...args)
                                        return target[p].apply(target, args)
                                    })
                                } else { // 箭头函数
                                    return ((...args: any[]) => {
                                        constructorValid[p](...args)
                                        return target[p].apply(target, args) // ???
                                    })
                                }

                            }
                        }
                        return target[p]
                    },
                })
                console.log('ResClassProxy', ResClassProxy)
                return ResClassProxy
            }
            return ResClass
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
    validateTestFunction(validateClass, validateDecorator)
}

if( require.main === module ){
    validateProxyTest()
}
