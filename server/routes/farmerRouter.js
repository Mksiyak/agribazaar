var express = require('express');
var router = express.Router();

router.route('/analytics')
.get((req,res,next)=>{
    var sql="select itemsellerid,review,Users.username,Users.email,rating,timestampUpdated,Items.name from ItemComments JOIN ItemSeller ON itemsellerid=ItemSeller.id JOIN Users on Users.id=userid JOIN Items on Items.id=itemId WHERE itemsellerid="+req.query.userid+";"
    sql+="select SUM(BuyerQty) AS 'buy_ct',SUM(BuyerQty*pricePerItem) AS 'buy_amt' from CartView JOIN Users ON CartView.fullname=CONCAT(Users.first_name,' ',Users.last_name) WHERE Users.id="+req.query.userid+" AND itemStatus='buying';"
    sql+="select SUM(BuyerQty) AS 'bought_ct',SUM(BuyerQty*pricePerItem) AS 'bought_amt' from CartView JOIN Users ON CartView.fullname=CONCAT(Users.first_name,' ',Users.last_name) WHERE Users.id="+req.query.userid+" AND itemStatus='bought';";
    sql+="select AVG(rating) as avgr from ItemComments JOIN ItemSeller ON itemsellerid=ItemSeller.id JOIN Users on Users.id=userid JOIN Items on Items.id=itemId WHERE itemsellerid="+req.query.userid+";";
    sql+="select count(id) as hosted_ct from ItemSeller where sellerId="+req.query.userid+";";
    console.log("QUERY".query,sql);
    db.query(sql,function(err,results){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
        console.log("RESULT".success,JSON.stringify(results));
        res.end(JSON.stringify(results));
    });
});

router.route('/:farmerId/add')
.post((req,res,next)=>{
    var sess=req.session;
    if(req.session.userId!=null && req.params.username==req.session.username)
    {
        res.render('farmers/addproducts',{title:"Add Products"})
    }
    else
    {
        req.session.message="Please login to view your sales"
        req.session.level="warning"
        res.redirect('/auth')
    }
});

module.exports = router