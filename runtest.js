var testrunner = require("qunit");

testrunner.run({
    code: "./handlers.js",
    tests: "./loanServerTest.js"
}, function () {});
