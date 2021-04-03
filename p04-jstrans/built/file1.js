"use strict";
// npx tsc --pretty
Object.defineProperty(exports, "__esModule", { value: true });
var file2 = require("./file2"); // js module.export = 
console.log('file2', file2);
file2();
var file3 = require("./file3"); // ts export = 
console.log('file3', file3);
file3('a');
var file4 = require("./file4"); // ts export xxx
console.log('file4', file4);
file4.file4fn1('b');
file4.file4fn2('c');
//# sourceMappingURL=file1.js.map