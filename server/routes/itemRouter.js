var express = require('express');
var router = express.Router();
var multer = require('multer');
var uuidv4 = require('uuid/v4');
router.route('/all')
.get((req,res,next)=>{
    var sql = `select name,id from Items`;
    db.query(sql,(err,ans)=>{
        if(err){
            res.statusCode = 500;
            console.log("ERROR".error,err);
            res.send("error occured");
        }
        else
        {
            console.log("RESULT".success,JSON.stringify(ans));
            res.end(JSON.stringify(ans));
        }
    })
});
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

const DIR = '../uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});


 var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



router.route('/')
.post(upload.single('image'),(req,res,next)=>{
    console.log("request",req.body,req.file);
    var post = req.body;
    var itemId = post.productid;
    var sellerId = post.sellerId;
    var pricePerItem = post.price;
    var unit = post.unit;
    var quantity = post.quantity;
    var itemImage = req.file.filename;
    var tags = post.tags;
     var sql = `call AddItem(${itemId},${sellerId},${pricePerItem},'${unit}',${quantity},'${itemImage}','${tags}')`;
     console.log("QUERY".query,sql);
     db.query(sql,(err,ans)=>{
         if(err){
             res.statusCode = 500;
             console.log("ERROR".error,err)
             res.end("cann't add product");
         }
         else{
             res.statusCode = 200;
            console.log("RESULT".success,JSON.stringify(ans));
            res.end(`product added successfully`);
         }
     })
});
router.route('/:itemid')
.get((req,res,next)=>{
    var sql = "select name,description,category,SellerCount,AvgPrice from SearchView where id="+req.params.itemid+";";
    sql += "call search_getSellers("+req.params.itemid+");";
   // sql += "select sellerId,Users.first_name as 'sellerName',pricePerItem,unit,quantity from ItemSeller join Users on ItemSeller.sellerId=Users.id where itemId="+req.params.itemid+";";
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