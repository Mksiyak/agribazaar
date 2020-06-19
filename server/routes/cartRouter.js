var express = require('express');
var router = express.Router();




router.route('/')
.get((req,res,next)=>{
    var sql = "CALL Cart_getItems('"+req.query.username+"');";
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        else{
            console.log("RESULT".success,JSON.stringify(ans));
        res.end(JSON.stringify(ans));
        }
    });
})
.post((req,res,next)=>{
    var sql = "CALL Cart_BuyItems("+req.body.userid+")";
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans[0]));
        res.end(JSON.stringify(ans[0]));
    })
})
.delete((req,res,next)=>{
    var sql = "CALL Cart_clearAll("+req.params.userId+")";
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans[0]));
        res.end(JSON.stringify(ans[0]));
    })
});

router.route('/:itemid')
.post((req,res,next)=>{
    console.log('Add item to Cart'.help);
    var post = req.body;
    var sql = `call cart_AddItems(${post.userId},${req.params.itemid},${post.quantity},${post.sellerId});`;
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans));
        res.end(JSON.stringify(ans[0]));
    })
})
.delete((req,res,next)=>{
    console.log('Delete item from cart',req.params.itemid);
    var sql = `delete from Cart where id = ${req.params.itemid}`;
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans));
        res.end(JSON.stringify("OK"));
    })
})
.put((req,res,next)=>{
    console.log('Change Item properties in cart',JSON.stringify(req.body));
    var sql = `update Cart set quantity = ${req.body.val} where id = ${req.params.itemid}`;
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans));
        res.end(JSON.stringify("OK"));
    })
})
module.exports = {
    cart: router,
};