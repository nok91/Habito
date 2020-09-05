"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = require("array-flatten");
var clean = function (arr) { return arr.filter(function (element) { return element; }); };
var createEvents = function (eventDefs, prevState, action, nextState) {
    return clean(flatten(clean(eventDefs).map(function (eventDef) { return eventDef(action, prevState, nextState); })));
};
exports.default = createEvents;
