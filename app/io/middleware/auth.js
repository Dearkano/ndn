module.exports = app => {
    return async (ctx, next) => {
        const {
            app,
            socket,
            logger,
            helper,
            service
        } = ctx;
        console.log(ctx)
        const str = ctx.args[0];
        const pkt = JSON.parse(str)
        const sid = socket.id;
        const {
            sender,
            receiver,
            data
        } = pkt
        await service.socket.add(sender, receiver, sid)
        await next();
    };
};