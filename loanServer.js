#!/usr/bin/env node

//
// Carl A. Fahlstrom
//
// This is the server file.  The use of the express package could simplify some
// of this at the expense of adding another dependancy.  

// Include the needed modules
var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');
var h = require('./handlers.js');
var sth = require('./static_handlers.js');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'loanUser', // Database username
        password : 'loanApp~!@~!@', // Database password
        database : 'loanapp'
});

connection.connect();

handlers = [];
res_data = [];
params = [];
use_db = [];
handlers['/favicon.ico'] = h.favicon;
handlers['/approve_loan'] = h.approval;
handlers['/check_status'] = h.showStatus;

res_data['/style.css'] = fs.readFileSync('style.css', encoding='utf8');
res_data['/'] = fs.readFileSync('index.html', encoding='utf8');
res_data['/submitLoan.js'] = fs.readFileSync('submitLoan.js', encoding='utf8');
res_data['/jquery-1.11.1.min.js'] = fs.readFileSync('jquery-1.11.1.min.js', encoding='utf8');

use_db['/approve_loan'] = connection;
// This creates the http server
//
//var loanServer = http.createServer(loan);

// HTTPS configuration
var https_options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

// Create an https server.
var loanServer = https.createServer(https_options, loan);

// Callback function for the http server that processes requests.
//
function loan(request, response) {
	// This is how to map a function to an event.
	// As a test try to write the lenght of the get
	// request to the console.
	//
	// the 'data' event only exists for POST data
	// for GET data, use the length of the URL.
	//
	var urlstr = url.parse(request.url);
	var urlpath = urlstr.pathname;
	var get_params = urlstr.query;
	console.log('Got request from: '+urlpath+get_params);
	console.log(urlpath);

	//var ext = urlpath.slice(urlpath.search("\\.")+1);

	var body = '';
	var post_params ='';

	// These methods provide for GET method request.
	//
	if (!res_data[urlpath])
        {
                res_data[urlpath] = '';
        }

	if (!params[urlpath])
        {
                params[urlpath] = '';
        }

	if (!use_db[urlpath])
        {
                use_db[urlpath] = '';
        }

	if (!handlers[urlpath])
        {
                if (urlpath.split(".")[1] == "css") handlers[urlpath] = sth.writeStaticCss;
                else handlers[urlpath] = sth.writeStatic;
        }

	// These methods provide for POST method requests.
	//
	request.on('data', function (dataBytes){
		//console.log("The size of this request is %d bytes.", dataBytes.length);
		body += dataBytes;
	});

	request.on('end', function () {
		post_params = body;
		//console.log(post_params);
		handlers[urlpath](request, response, res_data[urlpath], get_params, post_params, params[urlpath], use_db[urlpath], function ()
		{
			//console.log("The handler function completed.");
		});
	});
}

//Set the server to listen on port 8124
//
loanServer.listen(8124);

console.log("Started the server");

// Provides for clean shutdown of the server
process.on('SIGINT', function () {
	console.log("Shutting down the Server");
	//sm.stopmysql(connection);
	process.exit();
});

