// npx tsc --pretty

// https://rbuckton.github.io/reflect-metadata/
// https://juejin.cn/post/6844904152812748807

// 用tsc 编译要生成 .mjs 文件给node 执行
// 使用ts-node 要用cjs 格式

import "reflect-metadata"

function decorateMethod(){
    console.log("\n/****decorateMethod****/")
    console.log('对类装饰')
    // declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
    const classDecorator: ClassDecorator = (target) => {
        target.prototype.sayName = ()=> console.log('override')
        // return target
    }

    class TestClassExample {
        constructor(public name = ""){

        }

        sayName(){
            console.log(this.name)
        }
    }

    Reflect.decorate([classDecorator], TestClassExample)
    const t =  new TestClassExample('nihao')
    t.sayName()

    // ***********************
    // function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: Object, propertyKey: string | symbol, attributes?: PropertyDescriptor): PropertyDescriptor;
    // attributes - decorator 分两种， 数据描述符和存取描述符
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    // // 数据描述符
    // {
    //     value:& emsp; 'aaa',
    //         configurable: true,
    //             writable: true,
    //                 enumerable: true
    // }
    // // 存取描述符
    // {
    //     get(){ return 1 },
    //     set() { console.log('set') },
    //     configurable: true,
    //         enumerable: true
    // }
    console.log('属性装饰器')
    // 直接在装饰器内替换属性
    const propertyDecorator: PropertyDecorator = (target: {[key:string|symbol]: any}, propertyKey) => {
        const origin = target[propertyKey]
        target[propertyKey] = () =>{
            origin.call(target)
            console.log('added override')
        }
    }
    class PropertyAndMethodExample {
        static staticProperty(){
            console.log('im static property')
        }
        method(){
            console.log('im instance method')
        }
    }

    Reflect.decorate([propertyDecorator], PropertyAndMethodExample, 'staticProperty')
    PropertyAndMethodExample.staticProperty()

    console.log("方法装饰器")
    // 要修改描述符只能先拿到描述符，然后再修改替换
    const methodDecorator: MethodDecorator = (target, propertyKey, descriptor) => {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#描述
        descriptor.configurable = false
        descriptor.writable = false
        return descriptor
    }
    // 获取原 descriptor
    let descriptor = Object.getOwnPropertyDescriptor(PropertyAndMethodExample.prototype, 'method')
    // 获取修改后的 descriptor
    descriptor = Reflect.decorate([methodDecorator], PropertyAndMethodExample.prototype, 'method', descriptor)
    // 将修改后的 descriptor 应用到对应的方法上
    Object.defineProperty(PropertyAndMethodExample.prototype, 'method', descriptor)

    Reflect.decorate([methodDecorator], PropertyAndMethodExample.prototype, 'method') // 这个也是有效的

    // test method decorator
    const example = new PropertyAndMethodExample
    // example.method = ()=> console.log('override') // 报错 属性是只读的

}

function metadataDecorator(){
    console.log('metadata')
    // 元数据装饰器可以用于 类 成员 参数
    const nameSymbol = Symbol('lorry')
    // metadata(元数据key, 元数据value)
    // 类元数据
    @Reflect.metadata('class','classValue')
    class MetaDataClass{
        // 实例属性元数据
        @Reflect.metadata(nameSymbol,'nihao')
        public name = 'origin';
        // 实例方法元数据
        @Reflect.metadata('getName','getNameValue')
        public getName(){
        }
        // 静态方法元数据
        @Reflect.metadata('static','staticValue')
        static staticMethod(){
        }
    }
    // getMetadata(元数据key, 对象, [属性名])
    const value = Reflect.getMetadata('class', MetaDataClass)
    const metadataInstance = new MetaDataClass
    const name = Reflect.getMetadata(nameSymbol, metadataInstance, 'name')
    const methodVal = Reflect.getMetadata('getName', metadataInstance, 'getName')
    const staticVal = Reflect.getMetadata('static', MetaDataClass, 'staticMethod')
    console.log('value, name, methodVal, staticVal',value, name, methodVal, staticVal)
}

function defineMetadataMethod(){
    class DefineMetadata{
        static staticMethod(){}
        static staticProperty = "static"
        getName(){}
    }

    // function defineMetadata(metadataKey: any, metadataValue: any, target: Object, propertyKey: string | symbol): void;
    // target -> propertyKey -> metadataKey = metadataValue
    const type = 'type'
    Reflect.defineMetadata(type, 'class', DefineMetadata)
    Reflect.defineMetadata(type, 'staticMethod', DefineMetadata.staticMethod)
    Reflect.defineMetadata(type, 'method', DefineMetadata.prototype.getName)
    Reflect.defineMetadata(type, 'staticProperty', DefineMetadata,'staticProperty')
    const t1 = Reflect.getMetadata(type, DefineMetadata) // 会往原型链上找
    const t2 = Reflect.getMetadata(type, DefineMetadata.staticMethod)
    const t3 = Reflect.getMetadata(type, DefineMetadata.prototype.getName)
    const t4 = Reflect.getMetadata(type, DefineMetadata, 'staticProperty')
    console.log('t1, t2, t3, t4', t1, t2, t3, t4)
    // Reflect.defineMetadata(type, 'staticMethos', DefineMetadata, 'staticMethod')
    // const t2 = Reflect.getMetadata(type, DefineMetadata, 'staticMethod')
    // define 的时候使用key值 get 的时候也要使用key 获取，define使用属性定义 获取的时候也要使用属性获取
    // .metadata 方法是使用 key 值定义的

    /**
     * getOwnMetadata
     * 同 getOwnMetadata 获取元数据，但是不会往原型链上找
     * */ 
}

function getMetadataKeysMethod(){
    console.log('\n/****getMetadataKeysMethod****/')
    const type = 'type'
    @Reflect.metadata('parent','parentValue')
    class Parent{
        getName(){}
    }
    @Reflect.metadata(type, 'classValue')
    class HasOwnMetadataClas extends Parent{
        @Reflect.metadata(type, 'instanceData')
        name="David"

        @Reflect.metadata(type, 'static')
        static staticProperty(){}
        @Reflect.metadata('bbb','bbbMethodValue')
        @Reflect.metadata('aaa','aaaMethodValue')
        method(a:string, b:symbol):object{
            return {}
        }
        method2(){}
    }
    let instance = new HasOwnMetadataClas;
    const t1_1 = Reflect.getMetadataKeys(HasOwnMetadataClas)
    const t1_2 = Reflect.getMetadataKeys(HasOwnMetadataClas.prototype, 'method')
    const t1_3 = Reflect.getMetadataKeys(instance, 'name')
    const t1_4 = Reflect.getMetadataKeys(HasOwnMetadataClas.prototype, 'method2')
    console.log('t1_1, t1_2, t1_3, t1_4', t1_1, t1_2, t1_3, t1_4)

    const t2_1 = Reflect.getOwnMetadataKeys(HasOwnMetadataClas)
    const t2_2 = Reflect.getOwnMetadataKeys(HasOwnMetadataClas.prototype, 'method')
    const t2_3 = Reflect.getOwnMetadataKeys(instance, 'name')
    console.log('t2_1, t2_2, t2_3', t2_1, t2_2, t2_3)

    const t3_1 = Reflect.getMetadata('design:type', HasOwnMetadataClas.prototype, 'method')
    const t3_2 = Reflect.getMetadata('design:returntype', HasOwnMetadataClas.prototype, 'method')
    const t3_3 = Reflect.getMetadata('design:paramtypes', HasOwnMetadataClas.prototype, 'method')
    const t3_4 = Reflect.getMetadata('aaa', HasOwnMetadataClas.prototype, 'method')
    const t3_5 = Reflect.getMetadata('type', instance, 'name', )
    console.log('t3_1, t3_2, t3_3,', t3_1, t3_2, t3_3, )
    console.log('t3_4, t3_5', t3_4, t3_5)
}

function deleteMetadataMethod(){
    console.log('\n/****deleteMetadataMethod****/')

    const type = "type"
    @Reflect.metadata(type, 'classValue')
    class DelectMetadata{
        @Reflect.metadata(type,'static')
        static staticMethod(){}
    }

    const res1 = Reflect.deleteMetadata(type, DelectMetadata,)
    const res2 = Reflect.deleteMetadata(type, DelectMetadata, 'staticMethod')
    const res3 = Reflect.deleteMetadata(type, DelectMetadata,) // 没有可以删除的元数据了 返回false
    console.log('res1, res2, res3', res1, res2, res3)
}

decorateMethod()
metadataDecorator()
defineMetadataMethod()
getMetadataKeysMethod()
deleteMetadataMethod()

