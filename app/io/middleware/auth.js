module.exports = app => {
    return async (ctx, next) => {
        const {
            app,
            socket,
            logger,
            helper,
            service
        } = ctx;
        console.log(socket.handshake.query)
        await next();
    };
};