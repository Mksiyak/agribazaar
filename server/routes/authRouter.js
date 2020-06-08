var express = require('express')
var router = express.Router();

router.route('/login')
.post((req,res,next)=>{
    var post  = req.body;
    var email_username= post.user_email;
    var pass= post.user_password;
    var sql="CALL Users_verify('"+email_username+"',SHA2('"+pass+"',256));";
    console.log("QUERY".query,sql);
    db.query(sql, function(err, results){ 
        if (err) {
            return console.error("SQL Error",err);
        }
        var json=JSON.stringify(results[0]);
        if(json.length>2){
            console.log("RESULT".success,json);
            console.log("Login Accepted!".help,req.body.user_email)
            res.end(json);
        }
        else
        {
            var sess = req.session; 
            res.statusCode=401
            console.warn("AUTH".error,"Incorrect Username "+email_username+" /Password "+pass);
            res.end("Unauthorized- Incorrect")
        }
    })
})

router.route('/signup')
.post((req,res,next)=>{
    var post  = req.body;
    var user_username= post.user_username;
    var user_pass= post.user_pass;
    var user_first_name= post.user_first_name;
    var user_last_name= post.user_last_name;
    var user_mail=post.user_mail;
    var user_role=post.user_role;
    var user_pin_code=post.user_pin_code;
    var user_house_no=post.user_house_no;
    var user_street=post.user_street;
    var user_city=post.user_city;
    var user_state=post.user_state;
    var user_country=post.user_country;
    var sql = "call Users_register('"+user_username+"',sha('"+user_pass+"'),'"+user_mail+"','"+user_role+"','"+user_first_name+"','"+user_last_name+"','"+user_pin_code+"','"+user_house_no+"','"+user_city+"','"+user_street+"','"+user_state+"','"+user_country+"');call Users_getDetailsByUsername('"+user_username+"');";
    console.log("QUERY".query,sql)
    var query = db.query(sql, function(err, result) {
        if (err) {
            return console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(result[1]))
        res.send(JSON.stringify(result[1]))
    });
})

module.exports = router;