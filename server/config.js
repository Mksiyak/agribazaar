var mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    database: "agribazaar",
    user: "root",
<<<<<<< HEAD
    password: "Yash@123",
=======
    password: process.env.MYSQL_PSWD,
>>>>>>> 0c903a05aed6401a3dac4f72828000e102ca0fad
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
