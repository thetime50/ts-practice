// npx tsc --pretty

// https://yqz0203.github.io/decorator-and-reflect-metadata-in-typescript/

import { ArrayLiteralExpression } from "typescript"
import "reflect-metadata"

function validateTest(){
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
    const validateDecorator = ( target:any, propertyKey: string, descriptor: PropertyDescriptor) => {
        /**
         * 1. 属性校验装饰器上绑定校验方法
         * 1. 实例化的时候记录实例 
         *    1.1 替换构造函数
         *    1.2 defineProperty 替换方法 添加校验
         */

        let types = Reflect.getMetadata('design:paramtypes', target, propertyKey) as any[] | undefined // ArrayLiteralExpression
        console.log('propertyKey', propertyKey)
        console.log('type', types)
        let res = types && types[1] && Reflect.getMetadataKeys(types[1])
        console.log('res', res)
        const baseType = ['number', 'string', 'boolean', /* null, undefined , Symbol, BigInt */]
        // if (types && types.length){
        //     function parameterValidata(instance: any){
        //         types && types.forEach((type , index:number) => {
        //             if()
        //             if (!(instance[index] instanceof type)){
        //                 throw new TypeError(`Invalid type ${type}`)
        //             }
        //         })
        //     }
        //     Reflect.defineMetadata('__parameterValidata', parameterValidata, target, propertyKey)
        // }
    }
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
    }

    const c = new C()
    c.name = "10"
    c.name = new String('10')
}

validateTest()
validateTest2()
