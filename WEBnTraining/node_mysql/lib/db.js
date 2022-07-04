var mysql = require('mysql');
var db = mysql.createConnection({
    host : 'localhost',
    user     : 'root',
    password : 'dnflwlq1@',
    database : 'optt_node_sql'
  });
  db.connect(); 

module.exports = db;