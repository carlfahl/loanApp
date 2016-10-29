//
// Carl A. Fahlstrom
//
// handlers.js - This is the file that contains the methods for calculating the 
// loan to value ratio of the loan and returning a response. of Approved or rejected.
//

// the querystring module parses values pased in by POST methods.
var qs = require('querystring');
var sm = require('./mysql_setup.js');
// Use this package for server side validation of user input.
var val = require('validator');

var index = 1;

// Sends a value to keep the browser favicon request from reloading page.
//
var favicon = function (request, response, data, get_params, post_params, params, use_db, cbf) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    console.log('This is the favicon');
    response.write('Skiped the favicon.');
    response.end();
    response.statusCode == 200;
}

// Handler functions if using post methods
//
var approval = function (request, response, data, get_params, post_params, params, use_db, cbf) {
    var tmp = qs.parse(post_params);

    // set the values and 
    var value = parseFloat(tmp['propVal']);
    var loan = parseFloat(tmp['loanAmount']);
    var ssn = parseInt(tmp['SSN']);

    var loanStatus = false;

    var response_st = '';

    //var ltv = (loan / value) * 100;
    var ltv = calcLtv(loan, value);

    // Insert values into MySQL database
    
    if (ltv > 40) {
        // Loan is Rejected
        response_st = "Rejected,";
        loanStatus = false;
    }

    else {
        // Loan is Approved
        response_st = "Approved,";
        loanStatus = true;
    }

    sm.insertToTable(use_db, 'loans', [0, loan, value, ssn, loanStatus, 'now()'],['int', 'float', 'float', 'int', 'bool', 'function'], function (data) {
        var loan_id = data[0]['LAST_INSERT_ID()'];
        response_st += loan_id+","+ssn+","+ltv;
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(response_st);
    });

    //var loan_id = index;

    // Send a plain text repsonse to the AJAX request.

    index++;

    // Use the callback function for testing purposes.
    cbf (ltv);
}

// Seperate this calculation into it own function to allow for easier unit testing.
var calcLtv = function (loan, value) {
    var ltv = (loan / value) * 100;
    return ltv;
}

var showStatus = function (request, response, data, get_params, post_params, params, use_db, cbf) {
    var tmp = qs.parse(post_params);
}

exports.favicon = favicon;
exports.approval = approval;
exports.calcLtv = calcLtv;
exports.showStatus = showStatus;
