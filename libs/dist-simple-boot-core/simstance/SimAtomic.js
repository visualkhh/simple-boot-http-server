"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimAtomic = void 0;
var SimDecorator_1 = require("../decorators/SimDecorator");
var ReflectUtils_1 = require("../utils/reflect/ReflectUtils");
var SimAtomic = (function () {
    function SimAtomic(type, simstanceManager) {
        this.type = type;
        this.simstanceManager = simstanceManager;
    }
    SimAtomic.prototype.getConfig = function (key) {
        if (key === void 0) { key = SimDecorator_1.SimMetadataKey; }
        return ReflectUtils_1.ReflectUtils.getMetadata(key, this.type);
    };
    SimAtomic.prototype.getConfigs = function () {
        return ReflectUtils_1.ReflectUtils.getMetadatas(this.type);
    };
    Object.defineProperty(SimAtomic.prototype, "value", {
        get: function () {
            var _a;
            return (_a = this.simstanceManager) === null || _a === void 0 ? void 0 : _a.getOrNewSim(this.type);
        },
        enumerable: false,
        configurable: true
    });
    return SimAtomic;
}());
exports.SimAtomic = SimAtomic;
//# sourceMappingURL=SimAtomic.js.map