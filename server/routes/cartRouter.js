var express = require('express');
var router = express.Router();



router.route('/')
.get((req,res,next)=>{
    var sql = "CALL Cart_getItems('"+req.query.userId+"');";
    sql += "select ItemSeller.id,Items.name,pricePerItem,unit,Users.fullname from ItemSeller JOIN Items ON itemId=Items.id JOIN Users on sellerId=Users.id WHERE Users.fullname IN (select fullname from CartView where itemStatus='buying' AND username='"+req.query.userId+"' group by fullname);"
    console.log("QUERY".query,sql);
    db.query(sql,(err,ans)=>{
        if(err){
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(ans));
        res.end(JSON.stringify(ans));
    });
})
.post((req,res,next)=>{
    //TODO Procedure not added yet
    res.end(req.body.username+"XXX"+req.body.cartArr+"XCX"+typeof req.body.cartArr);
    // var sql = "CALL Cart_addToCart("+req.params.userId+")";
    // console.log("QUERY".query,sql);
    // db.query(sql,(err,ans)=>{
    //     if(err){
    //         throw console.error("ERROR".error,err);
    //     }
    //     console.log("RESULT".success,JSON.stringify(ans[0]));
    //     res.end(JSON.stringify(ans[0]));
    // })
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
};