"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten = require("array-flatten");
var is_promise_1 = require("./is-promise");
function registerEvents(events, target, extensions, prevState, action, nextState) {
    if (extensions === void 0) { extensions = {}; }
    if (prevState === void 0) { prevState = {}; }
    if (action === void 0) { action = {}; }
    if (nextState === void 0) { nextState = {}; }
    var logger = extensions.logger, offlineStorage = extensions.offlineStorage;
    var ifLoggerLog = function (eventsToLog, actionToLog, stateToLog) {
        var rest = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            rest[_i - 3] = arguments[_i];
        }
        if (typeof logger === 'function') {
            logger.apply(void 0, [eventsToLog, actionToLog, stateToLog].concat(rest));
        }
    };
    var isEmptyArray = function (arr) { return Array.isArray(arr) && arr.length === 0; };
    var passEventsToTarget = function (e) {
        if (!isEmptyArray(e)) {
            target(e);
        }
    };
    var handleEvents = function (e) {
        if (offlineStorage === undefined) {
            passEventsToTarget(e);
            ifLoggerLog(e, action, prevState);
        }
        else if (offlineStorage.isConnected(nextState)) {
            passEventsToTarget(e);
            ifLoggerLog(e, action, prevState);
            offlineStorage.purgeEvents(function (oldEvents) {
                if (!isEmptyArray(oldEvents)) {
                    target(oldEvents);
                    ifLoggerLog(oldEvents, null, null, false, true);
                }
            });
        }
        else {
            offlineStorage.saveEvents(e);
            ifLoggerLog(e, action, prevState, true, false);
        }
    };
    var asyncEvents = events.filter(is_promise_1.default);
    var syncEvents = events.filter(function (event) { return !is_promise_1.default(event); });
    handleEvents(syncEvents);
    return Promise.all(asyncEvents)
        .then(flatten)
        .then(handleEvents);
}
exports.default = registerEvents;
