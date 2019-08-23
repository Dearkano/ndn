const RNStart = require('./ndn')
const fs = require('fs')
module.exports = app => {
    app.beforeStart(async () => {
        const rs = fs.readFileSync(`${__dirname}/rnode/config.json`)
        const config = JSON.parse(rs)
        const cluster = config.cluster
        console.log(`==app beforeStart, start Rnode, cluster is ${cluster}==`);
        app.cluster = cluster
        RNStart(app)
    });

    app.ready(async () => {
        setInterval(
            async () => {
                console.log('send online list')
                const ctx = app.createAnonymousContext();
                await ctx.service.cluster.updateOnlineList()
                console.log('send online list finish')
            }, 5000)
    })
    return async (ctx) => {
        console.log('in return func')
    }
}