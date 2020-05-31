var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    database: "agribazaar",
    user: "root",
    password: "nirmalkhedkar",
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
