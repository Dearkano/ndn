const io = require('socket.io')();
io.on('connection', socket => { 
    console.log('connect successfully') 
    socket.emit('res', 'this is res')
    io.emit('broadcast', 'this is broadcast')
});
io.listen(7001);