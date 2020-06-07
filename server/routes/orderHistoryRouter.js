var express = require('express');
var router = express.Router();

router.route('/')
.get((req,res,next)=>{
    var username =  req.query.username;
    let sql="call Cart_getOrderHistory('"+username+"')";
    console.log("QUERY".query,sql)
    db.query(sql,function(err,ans){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans[0]));
        res.end(JSON.stringify(ans[0]));
    });
})
.put((req,res,next)=>{

})
.delete((req,res,next)=>{

});

module.exports = router;