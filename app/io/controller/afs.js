const Controller = require('egg').Controller;

class AfsController extends Controller {
    async getRNodeInfo() {
        const {
            ctx
        } = this
        const ip = ctx.request.body.ip
        const data = await this.service.afs.getRNodeInfo(ip)
        ctx.body = data
        ctx.status = 200
    }
}

module.exports = AfsController