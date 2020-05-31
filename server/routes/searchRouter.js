var express = require('express');
var router = express.Router();

// Verified: works.
router.route('/')
.get((req,res,next)=>{
    let sql="call search_All('"+req.query.squery+"');"
    console.log("QUERY".query,sql);
    db.query(sql,function(err,ans){
        if(err){
            console.error("ERROR".error,err);
            res.statusCode=500;
        }
        else{
            console.log("RESULT".success,JSON.stringify(ans[0]));
            res.end(JSON.stringify(ans[0]));
        }
    });
});

module.exports = router;