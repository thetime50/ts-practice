// ## pm05 - 函数
// npx tsc --pretty
// --noImplicitThis


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

kexuanMoren()