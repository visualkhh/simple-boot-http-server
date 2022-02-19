"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentManager = void 0;
var Intent_1 = require("./Intent");
var IntentManager = (function () {
    function IntentManager(simstanceManager) {
        this.simstanceManager = simstanceManager;
    }
    IntentManager.prototype.publish = function (it, data) {
        var _this = this;
        if (typeof it === 'string') {
            it = new Intent_1.Intent(it, data);
        }
        var intent = it;
        var r = [];
        this.simstanceManager.getSimConfig(intent.scheme).forEach(function (data) {
            var _a, _b, _c, _d;
            var orNewSim = (_a = _this.simstanceManager) === null || _a === void 0 ? void 0 : _a.getOrNewSim(data.type);
            if (orNewSim) {
                if (intent.paths.length > 0) {
                    var callthis_1 = orNewSim;
                    var lastProp_1 = '';
                    intent.paths.filter(function (i) { return i; }).forEach(function (i) {
                        callthis_1 = orNewSim;
                        orNewSim = orNewSim === null || orNewSim === void 0 ? void 0 : orNewSim[i];
                        lastProp_1 = i;
                    });
                    if (orNewSim && typeof orNewSim === 'function') {
                        if (Intent_1.PublishType.DATA_PARAMETERS === intent.publishType) {
                            r.push(orNewSim.call(callthis_1, intent.data));
                        }
                        else if (Intent_1.PublishType.INLINE_DATA_PARAMETERS === intent.publishType) {
                            r.push(orNewSim.call.apply(orNewSim, __spreadArray([callthis_1], intent.data, false)));
                        }
                        else {
                            r.push(orNewSim.call(callthis_1, intent));
                        }
                    }
                    else if (orNewSim) {
                        callthis_1[lastProp_1] = intent.data;
                        r.push(callthis_1[lastProp_1]);
                    }
                }
                else {
                    if (Intent_1.PublishType.DATA_PARAMETERS === intent.publishType) {
                        r.push((_b = orNewSim === null || orNewSim === void 0 ? void 0 : orNewSim.intentSubscribe) === null || _b === void 0 ? void 0 : _b.call(orNewSim, intent.data));
                    }
                    else if (Intent_1.PublishType.INLINE_DATA_PARAMETERS === intent.publishType) {
                        r.push((_c = orNewSim === null || orNewSim === void 0 ? void 0 : orNewSim.intentSubscribe) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([orNewSim], intent.data, false)));
                    }
                    else {
                        r.push((_d = orNewSim === null || orNewSim === void 0 ? void 0 : orNewSim.intentSubscribe) === null || _d === void 0 ? void 0 : _d.call(orNewSim, intent));
                    }
                }
            }
        });
        return r;
    };
    return IntentManager;
}());
exports.IntentManager = IntentManager;
//# sourceMappingURL=IntentManager.js.map