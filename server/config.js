var mysql = require('mysql')
console.log(process.env,"MySQL")
var con = mysql.createConnection({
    host: "localhost",
    database: "agribazaar",
    user: "root",
    password: process.env.MYSQL_PSWD,
    multipleStatements : true
});

con.connect(function(err) {
    if (err)
    {
        return console.error("MySQL",err);
    }
    console.log("MySQL Connected!".help);
});

module.exports=con;
