var express = require('express')
var router = express.Router();


router.route('/')
.get((req,res,next)=>{
    var sql = "call Items_getRandomN("+req.query.count+");";
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            res.statusCode=500
            console.log("ERROR".error,err)
            res.end("Invalid Query");
        }
        else{
            console.log("RESULT".success,JSON.stringify(ans[0]));
            res.end(JSON.stringify(ans[0]));
        }
    })
});

router.route('/:itemid')
.get((req,res,next)=>{
    var sql = "select name,description,category,SellerCount,AvgPrice from SearchView where id="+req.params.itemid+";";
    sql += "call search_getSellers("+req.params.itemid+");";
    sql += "call Item_getComments("+req.params.itemid+");";
    sql += "select avg(rating) as avg from ItemComments JOIN ItemSeller ON itemsellerid=ItemSeller.id WHERE itemId="+req.params.itemid+";";
    var sqlsplit = sql.split(';');
    for(let i=1;i<sqlsplit.length;++i)
    {
        console.log(`QUERY ${i}`.query,sqlsplit[i-1]);
    }
    db.query(sql,(err,ans)=>{
        if(err){
            res.statusCode=500
            console.log("ERROR".error,err)
            res.end("Invalid Query");
        }
        else{
            console.log("RESULT 1".success,JSON.stringify(ans[0]));
            console.log("RESULT 2".success,JSON.stringify(ans[1]));
            console.log("RESULT 3".success,JSON.stringify(ans[3]));
            console.log("RESULT 4".success,JSON.stringify(ans[5]));
            res.json(JSON.stringify(ans));
        }
    });
    // Visible to Seller Only

})
.put((req,res,next)=>{
    console.log("Update Item Details by Farmer");
    
})
.delete((req,res,next)=>{
    console.log("Delete Item!");
})
module.exports = router