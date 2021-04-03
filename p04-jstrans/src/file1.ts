// npx tsc --pretty

import file2 = require("./file2"); // js module.export = 
console.log('file2', file2)
file2()
import file3 = require("./file3"); // ts export = 
console.log('file3', file3)
file3('a')
import file4 = require("./file4"); // ts export xxx
console.log('file4', file4)
file4.file4fn1('b')
file4.file4fn2('c')
