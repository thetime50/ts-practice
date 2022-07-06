
export function validateTestFunction(
    validateClass: (target: any) => any,
    validateDecorator: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
) {

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
    console.log('c.name', c.name, c.name == 'davie')
    // c.name = 10 as any // 报类型错误

    // this 测试
}
