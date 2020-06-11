
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
      let sql="call Cart_getItems('"+data.username+"');";
      sql += "select Items.id AS `itemId`,ItemSeller.id,Items.name,pricePerItem,unit,CONCAT(Users.first_name,' ',Users.last_name) AS fullname,Items.category from ItemSeller JOIN Items ON itemId=Items.id JOIN Users on sellerId=Users.id WHERE CONCAT(Users.first_name,' ',Users.last_name) IN (select fullname from CartView where itemStatus='buying' AND username='"+data.username+"' group by fullname) LIMIT 3;"
      console.log("QUERY".query,sql)
      db.query(sql,function(err,ans){
          if(err)
          {
              throw console.error("ERROR".error,err);
          } 
          console.log("WEBSOCKET".websock,"...output...");
          console.log(JSON.stringify(ans));
          socket.emit("get cart",JSON.stringify(ans));
          
      });
    });
  });
  server.listen(port, function (err) {
    if (err) throw err
    console.log(`Websockets active on port ${port}`.help)
  })
}


