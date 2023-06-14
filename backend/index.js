const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = 3000;
const roomSockets = {};

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data);
    io.in(data.roomId).emit('new message', {user: data.name, message: data.message});
  });
  // socket.on('message', (data) => {
  //   const message=data.message;
  //   const user = data.name;
  //   const roomId = data.roomId;
  //   var send = false;
  //   client.send(JSON.stringify({ roomId, message: data.name + " : " + message }));
  //   // io.emit('message', `${user}: ${message}`);
  // });


  socket.on('joinRoom', ({ username, roomId }) => {
    const user = { id: socket.id, username, roomId };
    socket.join(roomId);
    // if (!roomSockets[roomId]) {
    //   roomSockets[roomId] = new Set();
    // }
    // roomSockets[roomId].add(socket);
    // io.to(roomId).emit('roomJoined', `${username} has joined the room ${roomId}`);
    socket.broadcast.to(roomId).emit('roomJoined',`${username} has joined the room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));