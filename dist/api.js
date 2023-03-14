"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var CongressAPI = /** @class */ (function () {
    function CongressAPI(options) {
        this._congressNumber = 116;
        this.apiVersion = 'v1';
        this.apiKey = options.apiKey;
        if (options.congressNumber) {
            this._congressNumber = options.congressNumber;
        }
        this.client = this.getApi();
    }
    CongressAPI.prototype.getApi = function () {
        return axios_1.default.create({
            baseURL: "https://api.propublica.org/congress/" + this.apiVersion,
            headers: { 'X-API-Key': this.apiKey },
        });
    };
    CongressAPI.prototype.request = function (requestParams) {
        var url = requestParams.url;
        if (requestParams.offset) {
            url += "?offset=" + requestParams.offset;
        }
        return this.client.get(url + "." + requestParams.format);
    };
    Object.defineProperty(CongressAPI.prototype, "congressNumber", {
        get: function () {
            return this._congressNumber;
        },
        enumerable: true,
        configurable: true
    });
    CongressAPI.prototype.withDefaults = function (params) {
        return __assign({ format: 'json', congressNumber: this.congressNumber }, params);
    };
    return CongressAPI;
}());
exports.CongressAPI = CongressAPI;
