"use strict";
exports.__esModule = true;
var index_js_1 = require("../lib/index.js");
var myToken = new index_js_1["default"]({
    //qiniu test account
    bucket: "qtestbucket",
    accessKey: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
    secretKey: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
});
console.log(myToken.getToken());