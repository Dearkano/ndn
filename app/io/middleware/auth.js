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
            receiver
        } = socket.handshake.query
        const {
            sender,
            receiver,
            data
        } = pkt
        console.log(`sender is ${sender}, receiver is ${receiver}, roomId is ${rommId}`)
        // find if room exists
        const rId = await service.socket.find(sender, receiver)
        const roomId = sender > receiver ? `${sender}-${receiver}` : `${receiver}-${sender}`;
        logger.info('rid', rId)
        logger.info('roomId', roomId)
        if (rId) {} else {
            await service.socket.add(sender, receiver, roomId)
        }
        socket.join(roomId)
        await next();
    };
};