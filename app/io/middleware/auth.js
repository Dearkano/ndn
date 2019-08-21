module.exports = app => {
    return async (ctx, next) => {
        const {
            app,
            socket,
            logger,
            helper,
            service
        } = ctx;
        await next();
    };
};