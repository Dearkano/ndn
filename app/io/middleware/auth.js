'use strict';

module.exports = app => {
    return async (ctx, next) => {
        const {
            app,
            socket,
            logger,
            helper,
            service
        } = ctx;
        const {
            sender,
            receiver,
            user
        } = socket.handshake.query

        // connect 
        await service.user.connect(sender)

        // connect with server
        if (user) {
            socket.join(`server-${user}`)
        } else {
            // find if room exists
            const rId = await service.socket.find(sender, receiver)
            const roomId = `${sender}-${receiver}`;
            console.log(`sender is ${sender}, receiver is ${receiver}, roomId is ${roomId}`)
            logger.info('rid', rId)
            logger.info('roomId', roomId)
            if (rId) {} else {
                await service.socket.add(sender, receiver, roomId)
            }
            socket.join(roomId)

            // find the history message
            const result = await service.message.find(receiver, sender)
            console.log('history')
            console.log(result.length)
            socket.emit('historytest', 'test')
            if (result.length !== 0) {
                socket.emit('history', JSON.stringify(result))
                await service.message.update(receiver, sender)
            }
        }

        await next();

        // disconnect

        await service.user.disconnect(sender)
        if (user) {
            console.log(`${user} disconnect`)
            socket.leave(`server-${user}`)
        } else {
            console.log( `${sender}-${receiver} disconnected`)
            socket.leave(`${sender}-${receiver}` )
        }
    };
};