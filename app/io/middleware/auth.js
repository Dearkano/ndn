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
            publicKey
        } = socket.handshake.query

        // check if this user exists
        const uId = await service.user.find(sender)
        if(uId){}else{
            await service.user.add(sender, publicKey)
        }

        // find if room exists
        const rId = await service.socket.find(sender, receiver)
        const roomId = sender > receiver ? `${sender}-${receiver}` : `${receiver}-${sender}`;
        console.log(`sender is ${sender}, receiver is ${receiver}, roomId is ${roomId}, publicKey is ${publicKey}`)
        logger.info('rid', rId)
        logger.info('roomId', roomId)
        if (rId) {} else {
            await service.socket.add(sender, receiver, roomId)
        }
        socket.join(roomId)
        await next();
    };
};