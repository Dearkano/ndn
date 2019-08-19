const RNStart  = require('./ndn')
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
}