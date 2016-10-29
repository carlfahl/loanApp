//
// Carl A. Fahlstrom
//

var fs = require('fs');

var favicon = function (request, response, data, get_params, post_params, params, use_db, cbf)
{
	response.writeHead(200, {'Content-Type': 'text/html'});
	console.log('This is the favicon');
	response.write('Skiped the favicon.');
	response.end();
	response.statusCode == 200;
	cbf();
}

var writeStatic = function (request, response, data, get_params, post_params, params, use_db, cbf)
{
	if (params[0] == 'html') response.writeHead(200, {'Content-Type': 'text/html'});
	if (params[0] == 'css') response.writeHead(200, {'Content-Type': 'text/css'});
	if (params[0] == 'png') response.writeHead(200, {'Content-Type': 'text/png'});
	response.write(data);
	response.end();
	response.statusCode == 200;
	cbf();
}

var writeStaticCss = function (request, response, data, get_params, post_params, params, use_db, cbf)
{
	response.writeHead(200, {'Content-Type': 'text/css'});
	response.write(data);
	response.end();
	response.statusCode == 200;
	cbf();
}

var writeStaticImage = function (request, response, data, get_params, post_params, params, use_db, cbf)
{
	response.writeHead(200, {'Content-Type': 'image/png'});
	response.write(data);
	response.end();
	response.statusCode == 200;
	cbf();
}

// This function will be used with URLs of type /urlpath?get_params
//
var writeStaticAjax = function (request, response, data, get_params, post_params, params, use_db, cbf)
{
	response.writeHead(200, {'Content-Type': 'text/html'});
	// If file has not already been read
	//if (data == '')
	//{
	//	fs.readFile(filename, encoding='utf8', function (data){
        //		response.end(data);
	//		cbf();
	//	});
	//}
	// Data is alread read
	//else
        response.end(data);
	cbf();
}

exports.favicon = favicon;
exports.writeStatic = writeStatic;
exports.writeStaticCss = writeStaticCss;
exports.writeStaticAjax = writeStaticAjax;
