"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.SimstanceManager = void 0;
require("reflect-metadata");
var SimNoSuch_1 = require("../throwable/SimNoSuch");
var SimDecorator_1 = require("../decorators/SimDecorator");
var ObjectUtils_1 = require("../utils/object/ObjectUtils");
var SimAtomic_1 = require("./SimAtomic");
var ReflectUtils_1 = require("../utils/reflect/ReflectUtils");
var FunctionUtils_1 = require("../utils/function/FunctionUtils");
var Inject_1 = require("../decorators/inject/Inject");
var SimOption_1 = require("../SimOption");
var SimProxyHandler_1 = require("../proxy/SimProxyHandler");
var SimstanceManager = (function () {
    function SimstanceManager(option) {
        this.option = option;
        this._storage = new Map();
        this._storage.set(SimstanceManager, this);
        this._storage.set(option.constructor, option);
        this._storage.set(SimOption_1.SimOption, option);
        this.simProxyHandler = new SimProxyHandler_1.SimProxyHandler(this, option);
    }
    Object.defineProperty(SimstanceManager.prototype, "storage", {
        get: function () {
            return this._storage;
        },
        enumerable: false,
        configurable: true
    });
    SimstanceManager.prototype.getSimAtomics = function () {
        var _this = this;
        return Array.from(this._storage.keys()).map(function (it) { return new SimAtomic_1.SimAtomic(it, _this); });
    };
    SimstanceManager.prototype.getSimConfig = function (scheme) {
        var newVar = this.getSimAtomics().filter(function (it) { var _a; return scheme && it && scheme === ((_a = it === null || it === void 0 ? void 0 : it.getConfig()) === null || _a === void 0 ? void 0 : _a.scheme); }) || [];
        return newVar;
    };
    SimstanceManager.prototype.findFirstSim = function (_a) {
        var scheme = _a.scheme, type = _a.type;
        if (scheme || type) {
            var simAtomics = this.getSimAtomics();
            var find = simAtomics.find(function (it) {
                var _a;
                var b = (scheme ? scheme === ((_a = it.getConfig()) === null || _a === void 0 ? void 0 : _a.scheme) : true) && (type ? it.type === type : true);
                return b;
            });
            return find;
        }
    };
    SimstanceManager.prototype.getOrNewSim = function (k) {
        if (k) {
            var newVar = this.storage.get(k);
            if (!newVar) {
                newVar = this.resolve(k);
            }
            return newVar;
        }
    };
    SimstanceManager.prototype.getOrNewSims = function (k) {
        var _this = this;
        var list = new Array(0);
        this.storage.forEach(function (value, key, mapObject) {
            var sw = false;
            if (value && value instanceof k) {
                sw = true;
            }
            else if (key === k || k.isPrototypeOf(key)) {
                sw = true;
            }
            if (sw) {
                if (!value) {
                    value = _this.resolve(key);
                }
                list.push(value);
            }
        });
        return list;
    };
    SimstanceManager.prototype.register = function (target) {
        if (!this._storage.has(target)) {
            this._storage.set(target, undefined);
        }
    };
    SimstanceManager.prototype.set = function (target, obj) {
        this._storage.set(target, obj);
    };
    SimstanceManager.prototype.resolve = function (target) {
        var _this = this;
        var _a, _b, _c;
        var registed = this._storage.get(target);
        if (registed) {
            return registed;
        }
        if (this._storage.has(target) && undefined === registed) {
            var newSim = this.newSim(target, function (data) { return _this._storage.set(target, data); });
            (_a = newSim === null || newSim === void 0 ? void 0 : newSim.onSimCreate) === null || _a === void 0 ? void 0 : _a.call(newSim);
            return newSim;
        }
        var simNoSuch = new SimNoSuch_1.SimNoSuch('SimNoSuch: no simple instance ' + 'name:' + ((_c = (_b = target === null || target === void 0 ? void 0 : target.prototype) === null || _b === void 0 ? void 0 : _b.constructor) === null || _c === void 0 ? void 0 : _c.name) + ',' + target);
        console.error(simNoSuch);
        throw simNoSuch;
    };
    SimstanceManager.prototype.newSim = function (target, simCreateAfter, otherStorage) {
        var r = new (target.bind.apply(target, __spreadArray([void 0], this.getParameterSim({ target: target }, otherStorage), false)))();
        var p = this.proxy(r);
        simCreateAfter === null || simCreateAfter === void 0 ? void 0 : simCreateAfter(p);
        this.callBindPostConstruct(p);
        return p;
    };
    SimstanceManager.prototype.callBindPostConstruct = function (obj) {
        var _this = this;
        var set = new Set(ObjectUtils_1.ObjectUtils.getAllProtoTypeName(obj));
        set.forEach(function (it) {
            var _a;
            var postConstruct = (0, SimDecorator_1.getPostConstruct)(obj, it);
            if (postConstruct) {
                (_a = obj)[it].apply(_a, _this.getParameterSim({ target: obj, targetKey: it }));
            }
        });
    };
    SimstanceManager.prototype.executeBindParameterSimPromise = function (_a, otherStorage) {
        var target = _a.target, targetKey = _a.targetKey, firstCheckMaker = _a.firstCheckMaker;
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        value = this.executeBindParameterSim({ target: target, targetKey: targetKey, firstCheckMaker: firstCheckMaker }, otherStorage);
                        if (!(value instanceof Promise)) return [3, 2];
                        return [4, value];
                    case 1:
                        value = _b.sent();
                        _b.label = 2;
                    case 2: return [2, value];
                }
            });
        });
    };
    SimstanceManager.prototype.executeBindParameterSim = function (_a, otherStorage) {
        var _b;
        var _c, _d;
        var target = _a.target, targetKey = _a.targetKey, firstCheckMaker = _a.firstCheckMaker;
        var binds = this.getParameterSim({ target: target, targetKey: targetKey, firstCheckMaker: firstCheckMaker }, otherStorage);
        if (typeof target === 'object' && targetKey) {
            return (_d = (_c = target)[targetKey]) === null || _d === void 0 ? void 0 : _d.call.apply(_d, __spreadArray([_c], binds, false));
        }
        else if (typeof target === 'function' && !targetKey) {
            return new ((_b = target).bind.apply(_b, __spreadArray([void 0], binds, false)))();
        }
    };
    SimstanceManager.prototype.getParameterSim = function (_a, otherStorage) {
        var _this = this;
        var target = _a.target, targetKey = _a.targetKey, firstCheckMaker = _a.firstCheckMaker;
        var paramTypes = ReflectUtils_1.ReflectUtils.getParameterTypes(target, targetKey);
        var paramNames = FunctionUtils_1.FunctionUtils.getParameterNames(target, targetKey);
        var injections = [];
        var injects = (0, Inject_1.getInject)(target, targetKey);
        injections = paramTypes.map(function (token, idx) {
            var _a;
            var _b, _c;
            var saveInject = injects === null || injects === void 0 ? void 0 : injects.find(function (it) { return it.index === idx; });
            for (var _i = 0, _d = firstCheckMaker !== null && firstCheckMaker !== void 0 ? firstCheckMaker : []; _i < _d.length; _i++) {
                var f = _d[_i];
                var firstCheckObj = f({ target: target, targetKey: targetKey }, token, idx, saveInject);
                if (undefined !== firstCheckObj) {
                    return firstCheckObj;
                }
            }
            if (saveInject) {
                var inject_1 = saveInject.config;
                var obj = otherStorage === null || otherStorage === void 0 ? void 0 : otherStorage.get(token);
                if (inject_1.situationType && otherStorage) {
                    var situations = otherStorage.get(Inject_1.SituationTypeContainers);
                    var situation = otherStorage.get(Inject_1.SituationTypeContainer);
                    if (inject_1.situationType === (situation === null || situation === void 0 ? void 0 : situation.situationType)) {
                        obj = situation.data;
                    }
                    else if (situations && situations.length > 0) {
                        var find = situations.find(function (a) { return a.situationType === inject_1.situationType; });
                        if (find) {
                            obj = find.data;
                        }
                    }
                }
                if (!obj) {
                    var findFirstSim = _this.findFirstSim({ scheme: inject_1.scheme, type: inject_1.type });
                    obj = findFirstSim ? _this.resolve((_b = findFirstSim === null || findFirstSim === void 0 ? void 0 : findFirstSim.type) !== null && _b !== void 0 ? _b : token) : _this.resolve(token);
                }
                if (inject_1.applyProxy) {
                    if (inject_1.applyProxy.param) {
                        obj = new Proxy(obj, new ((_a = inject_1.applyProxy.type).bind.apply(_a, __spreadArray([void 0], inject_1.applyProxy.param, false)))());
                    }
                    else {
                        obj = new Proxy(obj, new inject_1.applyProxy.type());
                    }
                }
                return obj;
            }
            else if (token) {
                return (_c = otherStorage === null || otherStorage === void 0 ? void 0 : otherStorage.get(token)) !== null && _c !== void 0 ? _c : _this.resolve(token);
            }
        });
        return injections;
    };
    SimstanceManager.prototype.proxy = function (target) {
        var _this = this;
        if ((0, SimDecorator_1.getSim)(target) && (typeof target === 'object') && (!('isProxy' in target))) {
            for (var key in target) {
                target[key] = this.proxy(target[key]);
            }
            var protoTypeName = ObjectUtils_1.ObjectUtils.getProtoTypeName(target);
            protoTypeName.filter(function (it) { return typeof target[it] === 'function'; }).forEach(function (it) {
                target[it] = new Proxy(target[it], _this.simProxyHandler);
            });
            if (this.simProxyHandler) {
                target = new Proxy(target, this.simProxyHandler);
            }
        }
        if (this.option.proxy) {
            target = this.option.proxy.onProxy(target);
        }
        return target;
    };
    SimstanceManager.prototype.run = function (otherInstanceSim) {
        var _this = this;
        var _a;
        this.otherInstanceSim = otherInstanceSim;
        (_a = this.otherInstanceSim) === null || _a === void 0 ? void 0 : _a.forEach(function (value, key) {
            _this.set(key, value);
        });
        SimDecorator_1.sims.forEach(function (data) {
            _this.register(data);
        });
        this.callBindPostConstruct(this);
    };
    return SimstanceManager;
}());
exports.SimstanceManager = SimstanceManager;
//# sourceMappingURL=SimstanceManager.js.map