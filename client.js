'use strict';

// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://47.92.244.235:10010');

socket.on('connect', () => {
  console.log('connect!');
  const data = {
      receiver: 'Steven',
      data: 'hello, there'
  }
  socket.emit('chat', JSON.stringify(data));
});

socket.on('res', msg => {
  console.log('res from server: %s!', msg);
});