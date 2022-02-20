"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataPropertyAtomic = exports.MetaDataAtomic = void 0;
require("reflect-metadata");
var MetaDataAtomic = (function () {
    function MetaDataAtomic(target, metaData) {
        this.target = target;
        this.metaData = metaData;
    }
    return MetaDataAtomic;
}());
exports.MetaDataAtomic = MetaDataAtomic;
var MetaDataPropertyAtomic = (function (_super) {
    __extends(MetaDataPropertyAtomic, _super);
    function MetaDataPropertyAtomic(target, metaData, property, parameter) {
        var _this = _super.call(this, target, metaData) || this;
        _this.property = property;
        _this.parameter = parameter;
        return _this;
    }
    MetaDataPropertyAtomic.prototype.call = function () {
        var _a;
        var parameter = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameter[_i] = arguments[_i];
        }
        return (_a = this.target)[this.property].apply(_a, parameter);
    };
    return MetaDataPropertyAtomic;
}(MetaDataAtomic));
exports.MetaDataPropertyAtomic = MetaDataPropertyAtomic;
//# sourceMappingURL=MetaDataAtomic.js.map