
const server = require('http').createServer()
const io = require('socket.io')(server);
const common = require('./common');
const port = 9001
let interval;

if(common.websockStatus){
  io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
    socket.emit('news', { hello: 'world' });
    socket.on('send userid', (data) => {
      let sql="select Cart.id,Shopper.username,Items.name,Items.description,Items.category,Cart.quantity AS 'BuyerQty',ItemSeller.quantity AS 'SellerMaxQty',Cart.itemStatus,ItemSeller.pricePerItem,ItemSeller.unit,Seller.fullname AS fullname from ((((Cart join Users AS Shopper on((Shopper.id = Cart.userid AND Shopper.username='"+data.username+"'))) join Users AS Seller on((Seller.id = Cart.itemSellerId))) join Items on((Cart.itemno = Items.id))) join ItemSeller on(((ItemSeller.sellerId = Cart.itemSellerId) and (ItemSeller.itemId = Cart.itemno)))) order by Cart.id;";
      sql += "select Items.id,Items.name,pricePerItem,unit,Users.fullname AS fullname,Items.category from ItemSeller JOIN Items ON itemId=Items.id JOIN Users on sellerId=Users.id WHERE Users.fullname IN (select fullname from CartView where itemStatus='buying' AND username='"+data.username+"' group by fullname) LIMIT 3;";
      console.log("QUERY".query,sql)
      db.query(sql,function(err,ans){
          if(err)
          {
              throw console.error("ERROR".error,err);
          } 
          console.log("WEBSOCKET".websock,"...output...");
          socket.emit("get cart",JSON.stringify(ans));
          
      });
    });
  });
  server.listen(port, function (err) {
    if (err) throw err
    console.log(`Websockets active on port ${port}`.help)
  })
}


