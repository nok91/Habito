"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = require("array-flatten");
var create_events_1 = require("./create-events");
var get_events_with_matching_key_1 = require("./get-events-with-matching-key");
var register_events_1 = require("./register-events");
/**
 * Create Redux middleware that synchronizes actions to analytics events.
 */
function createMiddleware(eventsMap, target, extensions) {
    if (extensions === void 0) { extensions = {}; }
    var getEvents = typeof eventsMap === 'function'
        ? function (action) { return flatten([eventsMap(action)]); }
        : function (action) { return get_events_with_matching_key_1.default(eventsMap, action.type); };
    return function (store) { return function (next) { return function (action) {
        var prevState = store.getState();
        var result = next(action);
        var nextState = store.getState();
        var events = create_events_1.default(getEvents(action), prevState, action, nextState);
        register_events_1.default(events, target, extensions, prevState, action, nextState);
        return result;
    }; }; };
}
exports.default = createMiddleware;
