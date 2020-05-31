var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    database: "agribazaar",
    user: "root",
    password: "Mukesh@123",
    multipleStatements : true
});

con.connect(function(err) {
    if (err)
    {
        return console.error("MySQL",err);
    }
    console.log("MySQL","Connected!");
});

module.exports=con;
