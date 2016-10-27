#!/usr/bin/env node

//
// Carl A. Fahlstrom
//
// This file includes all unit testing for the loanServer app.
//

// Include chai for unit testing.
var chai = require('chai');

var expect = chai.expect; // use the "expect" style
var assert = chai.assert; 

var loanApp = require('./loanServer.js');
var handler = require('./handlers.js');

describe('loanApp', function () {
    it (
