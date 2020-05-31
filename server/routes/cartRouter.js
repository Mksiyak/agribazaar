var express = require('express');
var router = express.Router();

const getCart = (userId) =>{
    let sql="call Cart_getItems("+userId+")";
    console.log("QUERY".query,sql)
    db.query(sql,function(err,ans){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans[0]));
        return JSON.stringify(ans[0]);
    });
};

router.route('/')
.get((req,res,next)=>{
    var userId =  req.query.userId;
    let sql="call Cart_getItems("+userId+")";
    console.log("QUERY".query,sql)
    db.query(sql,function(err,ans){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans[0]));
        return JSON.stringify(ans[0]);
    });
})
.put((req,res,next)=>{
    var sql = "CALL Cart_addToCart("+req.params.userId+")";
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
    console.log('Add item to Cart');
})
.delete((req,res,next)=>{
    console.log('Delete item from cart')
})
.put((req,res,next)=>{
    console.log('Change Item properties in cart');
})

module.exports = {
    cart: router,
    cartws: getCart,
};