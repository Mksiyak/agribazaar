var express = require('express');
var router = express.Router();

router.route('/:farmerId/last-sales')
.get((req,res,next)=>{
    var sql="CALL Seller_getLastSales("+req.session.userId+");"
    console.log("QUERY".query,sql);
    db.query(sql,function(err,results){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
        var sales=JSON.parse(JSON.stringify(results[0]))
        console.log("RESULT".success,sales);
        res.end(sales);
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