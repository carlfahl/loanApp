//
// Carl A. Fahlstrom
//

var startmysql = function (connection)
{
	connection.connect();
	//return connection;
}

var stopmysql = function (connection)
{
	connection.destroy();
}

var insertToTable = function (connection, table, arrayofvals, arrayoftypes, cbf)
{
	var sql_st = 'INSERT INTO ' + table + ' VALUES(';

	for (var i = 0; i < (arrayofvals.length - 1); i++)
	{
		if (arrayoftypes[i] == 'string')
		{
			sql_st += '\'' + arrayofvals[i] + '\', ';
		}
		else
		{
			sql_st += arrayofvals[i] + ', ';
		}
	}
	if (arrayoftypes[arrayoftypes.length-1] == 'string')
	{
		sql_st += '\'' + arrayofvals[arrayofvals.length-1] + '\')';
	}
	else
	{
		sql_st += arrayofvals[arrayofvals.length-1] + ')';
	}

	//if (cbf != undefined)
	//{
	//	sql_st += '; SELECT LAST_INSERT_ID();';
	//}

	console.log(sql_st);

	connection.query(sql_st, function(err, rows) {
		if (err) throw err;
		if (cbf != undefined) 
			connection.query('SELECT LAST_INSERT_ID()', function(err, rows) {
				cbf(rows);
			});
	
	});

}

var selectFromTable = function (connection, table, num_recs, feild, wherefeild, whereval, cbf)
{
	if (feild) var sql_st = 'SELECT '+feild+' FROM ' + table;
	else var sql_st = 'SELECT * FROM ' + table;

	if (wherefeild) sql_st += ' WHERE ' + wherefeild + " = \'" + whereval + "\'";

	connection.query(sql_st, function(err, rows) {
		if (err) throw err;
		console.log("The number of records is: "+rows.length);
		if (rows.length > 0)
		{
			cbf(rows);
			//if (num_recs == -1) num_recs = rows.length;
			//else if (rows.length < num_recs) num_recs = rows.length;
			//for (var j=0; j < num_recs; j++)
			//{
			//	console.log(rows[j]);
			//}
		}
	});
}

var compareFromTable = function (connection, table, comp, feild1, feild2)
{
	if (feild2) sql_st = 'SELECT '+feild2+' FROM ' + table + ' WHERE '+feild1+' = ' + comp;
	else var sql_st = 'SELECT * FROM ' + table + ' WHERE '+feild1+' = \''+comp+'\'';

	console.log(sql_st);

	connection.query(sql_st, function(err, rows) {
		if (err) throw err;
		console.log(rows.length);
		if (rows.length > 0) return false;
		else return true;
	});
}

exports.startmysql = startmysql;
exports.stopmysql = stopmysql;
exports.insertToTable = insertToTable;
exports.selectFromTable = selectFromTable;
exports.compareFromTable = compareFromTable;
