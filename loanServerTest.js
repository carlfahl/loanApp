#!/usr/bin/env node

//
// Carl A. Fahlstrom
//
// This file includes all unit testing for the loanServer app.
//

// Include chai for unit testing.
//var chai = require('chai');
//var mocha = require('mocha');
//var testCase  = require('nodeunit').testCase;
//var qunit = require('qunit');

//var expect = chai.expect; // use the "expect" style
//var assert = chai.assert; 

//var loanApp = require('./loanServer.js');
var handler = require('./handlers.js');

// These tests are setup for the Mocha testing framework with Chai
//describe('loanApp', function () {
//    it ('calcLtv() handler function should return correct loan to value calculation', function () {
//        var testVal = handler.calcLtv(30000/100000);
//        var testVal2 = handler.calcLtv(50000/100000);
//        expect(testVal).to.equal(30);
//        expect(testVal2).to.equal(50);
//    });
//});

// This test is designed for nodeunit testing framework.
//exports.testCalcLtv = function (test) {
//    var testVal = handler.calcLtv(30000/100000);
//    test.equal(testVal, 30);
//    test.done();
//};

test( "CalcLtv test 2", function() {
    var loan = 100000;
    var value = 50000;
    var testVal = handler.calcLtv(loan,value);
    console.log("The value of testVal is: " + testVal);
    equal(testVal, 200, "Passed!" );
});

test( "CalcLtv test", function() {
    equal(handler.calcLtv(30000,100000), 30, "Passed!" );
});
