"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncBlockingQueue = void 0;
var AsyncBlockingQueue = (function () {
    function AsyncBlockingQueue() {
        this._resolvers = [];
        this._promises = [];
    }
    AsyncBlockingQueue.prototype._add = function () {
        var _this = this;
        this._promises.push(new Promise(function (resolve) {
            _this._resolvers.push(resolve);
        }));
    };
    AsyncBlockingQueue.prototype.enqueue = function (t) {
        if (!this._resolvers.length)
            this._add();
        var resolve = this._resolvers.shift();
        resolve(t);
    };
    AsyncBlockingQueue.prototype.dequeue = function () {
        if (!this._promises.length)
            this._add();
        var promise = this._promises.shift();
        return promise;
    };
    AsyncBlockingQueue.prototype.isEmpty = function () {
        return !this._promises.length;
    };
    AsyncBlockingQueue.prototype.isBlocked = function () {
        return !!this._resolvers.length;
    };
    Object.defineProperty(AsyncBlockingQueue.prototype, "length", {
        get: function () {
            return this._promises.length - this._resolvers.length;
        },
        enumerable: false,
        configurable: true
    });
    return AsyncBlockingQueue;
}());
exports.AsyncBlockingQueue = AsyncBlockingQueue;
//# sourceMappingURL=AsyncBlockingQueue.js.map