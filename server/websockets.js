
const server = require('http').createServer()
const io = require('socket.io')(server);
const common = require('./common');
const port = 9001
let interval;

const getApiAndEmit = async socket => {
    userId = 2
    let sql="call Cart_getItems("+userId+")";
    //console.log("QUERY".query,sql)
    db.query(sql,function(err,ans){
        if(err)
        {
            throw console.error("ERROR".error,err);
        }
   //     console.log("WEBSOCKET".websock);
        socket.emit("FromAPI",JSON.stringify(ans[0]));
    });
};
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
      console.log(data);
      let sql="call Cart_getItems("+data.userId+")";
      console.log("QUERY".query,sql)
      db.query(sql,function(err,ans){
          if(err)
          {
              throw console.error("ERROR".error,err);
          } 
          console.log("WEBSOCKET".websock,JSON.stringify(ans[0]));
          socket.emit("get cart",JSON.stringify(ans[0]));
      });
    });
  });
  server.listen(port, function (err) {
    if (err) throw err
    console.log(`Websockets active on port ${port}`.help)
  })
}


