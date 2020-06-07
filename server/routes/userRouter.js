var express = require('express');
var router = express.Router();


router.route('/:userid')
.get((req,res,next)=>{
// Verified: Works
    var sql="CALL Users_getDetails("+req.params.userid+");";
    console.log("QUERY",sql)
    db.query(sql,function(err,ans){
        if(err)
        {
            console.error("ERROR",err);
            res.statusCode = 500
        }
        else{
            console.log("RESULT",JSON.stringify(ans[0]))
            res.end(JSON.stringify(ans[0]));
        }
    });
})
.post((req,res,next)=>{
    if(!req.body.password || req.body.password=="")
    {
        var sql="CALL Users_Edit_NP('"+req.body.fullname+"','"+req.body.email+"','"+req.body.address+"','"+req.body.username+"');";
    }
    else{
        var sql="CALL Users_Edit('"+req.body.fullname+"',SHA2('"+req.body.password+"',256),'"+req.body.email+"','"+req.body.address+"','"+req.body.username+"');";
    }
    console.log("QUERY",sql);
    db.query(sql,(err,ans)=>{
        if(err){
            console.error("ERROR",err);
            res.statusCode=500;
        }
        else{
            console.log("RESULT",JSON.stringify(ans[0]));
            res.end(JSON.stringify(ans[0]));
        }
    })
})
.delete((req,res,next)=>{
    var sql="CALL Users_deleteUsers("+req.params.user_name+");";
    console.log("QUERY",sql);
    db.query(sql,(err,ans)=>{
        if(err){
            console.error("ERROR",err);
            res.statusCode=500;
        }
        else{
            console.log("RESULT",JSON.stringify(ans[0]));
            res.end(JSON.stringify(ans[0]));
        }
    })
});

module.exports = router;