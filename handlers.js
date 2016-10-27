var qs = require('querystring');

var index = 1;

var sendIndex = function (request, response, data, get_params, post_params, params, cbf) {
}

var sendCss = function (request, response, data, get_params, post_params, params, cbf) {
}

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

    var value = parseFloat(tmp['propVal']);
    var loan = parseFloat(tmp['loanAmount']);
    var ssn = tmp['SSN'];

    var ltv = (loan / value) * 100;

    var loan_id = index;

    response.writeHead(200, {"Content-Type": "text/plain"});

    if (ltv > 40) {
        // Rejected
        response.end("Rejected,"+loan_id+","+ssn);
    }

    else {
        // Approved
        response.end("Approved,"+loan_id+","+ssn);
    }

    index++;
}

var showStatus = function (request, response, data, get_params, post_params, params, cbf) {
    var tmp = qs.parse(post_params);
}

exports.favicon = favicon;
exports.sendIndex = sendIndex;
exports.sendCss = sendCss;
exports.approval = approval;
exports.showStatus = showStatus;
