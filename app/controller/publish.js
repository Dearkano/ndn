const Controller = require('egg').Controller;

class PublishController extends Controller {
  async getFileInfo(){
      const {ctx} = this
      ctx.body = "data"
      ctx.status = 200
  }
}
module.exports = PublishController;