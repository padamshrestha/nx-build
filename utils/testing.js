"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toPromise_1 = require("rxjs/operator/toPromise");
var toArray_1 = require("rxjs/operator/toArray");
function readAll(o) {
    return toPromise_1.toPromise.call(toArray_1.toArray.call(o));
}
exports.readAll = readAll;
