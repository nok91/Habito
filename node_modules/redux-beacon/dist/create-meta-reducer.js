"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = require("array-flatten");
var create_events_1 = require("./create-events");
var get_events_with_matching_key_1 = require("./get-events-with-matching-key");
var register_events_1 = require("./register-events");
/**
 * Create a meta reducer that synchronizes actions to analytics events.
 */
function createMetaReducer(eventsMap, target, extensions) {
    if (extensions === void 0) { extensions = {}; }
    var getEvents = typeof eventsMap === 'function'
        ? function (action) { return flatten([eventsMap(action)]); }
        : function (action) { return get_events_with_matching_key_1.default(eventsMap, action.type); };
    /* Why not arrow functions? AOT... */
    /* tslint:disable: only-arrow-functions */
    return function (reducer) {
        return function (prevState, action) {
            var nextState = reducer(prevState, action);
            var events = create_events_1.default(getEvents(action), prevState, action, nextState);
            register_events_1.default(events, target, extensions, prevState, action, nextState);
            return nextState;
        };
    };
}
exports.default = createMetaReducer;
