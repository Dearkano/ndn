'use strict';

// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')(`http://${process.argv[2]}`);

socket.on('connect', () => {
    console.log('connect!');
    const data = {
        sender: process.argv[3],
        receiver: process.argv[4],
        data: `Hello, ${process.argv[4]}, I am ${process.argv[3]}`
    }
    console.log('sending: ' + JSON.stringify(data));
    socket.emit('chat', JSON.stringify(data));
});

socket.on('res', msg => {
    console.log('res from server: %s!', msg);
});