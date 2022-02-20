"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventListener = exports.EventListener = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var EventListenerMetadataKey = Symbol('EventListener');
var EventListener = function (option) {
    return ReflectUtils_1.ReflectUtils.metadata(EventListenerMetadataKey, option);
};
exports.EventListener = EventListener;
var getEventListener = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(EventListenerMetadataKey, target, propertyKey);
};
exports.getEventListener = getEventListener;
//# sourceMappingURL=EventListener.js.map