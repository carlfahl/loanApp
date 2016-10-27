//
// Carl A. Fahlstrom
//
// handlers.js - This is the file that contains the methods for calculating the 
// loan to value ratio of the loan and returning a response. of Approved or rejected.
//

// the querystring module parses values pased in by POST methods.
var qs = require('querystring');
// Use this package for server side validation of user input.
var val = require('validator');

var index = 1;

// Sends a value to keep the browser favicon request from reloading page.
//
var favicon = function (request, response, data, get_params, post_params, params, cbf) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    console.log('This is the favicon');
    response.write('Skiped the favicon.');
    response.end();
    response.statusCode == 200;
}

// Handler functions if using post methods
//
var approval = function (request, response, data, get_params, post_params, params, cbf) {
    var tmp = qs.parse(post_params);

    // set the values and 
    var value = parseFloat(tmp['propVal']);
    var loan = parseFloat(tmp['loanAmount']);
    var ssn = tmp['SSN'];

    //var ltv = (loan / value) * 100;
    var ltv = calcLtv(loan, value);

    var loan_id = index;

    // Send a plain text repsonse to the AJAX request.
    response.writeHead(200, {"Content-Type": "text/plain"});

    if (ltv > 40) {
        // Loan is Rejected
        response.end("Rejected,"+loan_id+","+ssn+","+ltv);
    }

    else {
        // Loan is Approved
        response.end("Approved,"+loan_id+","+ssn+","+ltv);
    }

    index++;

    // Use the callback function for testing purposes.
    cbf (ltv);
}

// Seperate this calculation into it own function to allow for easier unit testing.
var calcLtv = function (loan, value) {
    var ltv = (loan / value) * 100;
    return ltv;
}

var showStatus = function (request, response, data, get_params, post_params, params, cbf) {
    var tmp = qs.parse(post_params);
}

exports.favicon = favicon;
exports.approval = approval;
exports.calcLtv = calcLtv;
exports.showStatus = showStatus;
