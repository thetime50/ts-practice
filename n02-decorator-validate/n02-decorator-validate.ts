// npx tsc --pretty

// https://yqz0203.github.io/decorator-and-reflect-metadata-in-typescript/

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
        // @Type(String) // 给name 绑定 design:type 元数据
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


validateTest()
