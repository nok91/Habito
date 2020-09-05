"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(value) {
    return typeof value === 'object' && typeof value.then === 'function';
}
exports.default = isPromise;
