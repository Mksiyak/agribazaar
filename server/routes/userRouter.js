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
    var sql="DELETE FROM Users WHERE Users.id="+req.params.userid+";";
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


router.route('/user/comments')
.get((req,res,nest)=>{
    console.log(req.params,req.query,req.body);
    var SQL="select userid,review,rating,timestampUpdated,CONCAT(Seller.first_name,' ',Seller.last_name) as sellerDetails,Items.name as itemName,Items.description,Items.category from ItemComments JOIN ItemSeller on itemsellerid=ItemSeller.id JOIN Items ON ItemSeller.itemId=Items.id JOIN Users as Seller ON sellerId=Seller.id where userid="+req.query.userid+";";
    db.query(SQL,(err,ans)=>{
        if(err){
            console.log("ERR",err);
            res.json({message:err})
        }
        else{
            console.log("RESULT",JSON.stringify(ans));
            res.end(JSON.stringify(ans));
        }
    })
})
module.exports = router;