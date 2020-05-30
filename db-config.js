let express = require('express'); 
let mysql = require('mysql'); 
let app = express();
// initlize the parameters of connection tables`
let db = mysql.createConnection({
    host : process.env.RDS_HOSTNAME || 'assignment-3-cc.cm5bmufwyjtx.us-east-1.rds.amazonaws.com', 
    user : process.env.RDS_USERNAME || 'admin',
    password : process.env.RDS_PASSWORD || 'admin123',
    port : process.env.RDS_PORT || '3306'
});
let datab = process.env.RDS_MYSQL_DB || 'csci5409'; 
let table = process.env.RDS_MYSQL_TABLE || 'jobs467'; // indicate default db
let sql = "use " + datab;
db.connect(function(err) {
    if (err) throw err; 
    console.log("Connected to the AWS RDS-MySQL!"); 
    db.query(sql, (err, result)=>{
        if (err) throw err;
        console.log("Using database "+datab+"...");
    });
});

module.exports = db;