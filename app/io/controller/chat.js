const Controller = require('egg').Controller;
const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js-sdk')
Interest.setDefaultCanBePrefix(true);
const face = new Face(new UnixTransport());

class ChatController extends Controller {
    // async send() {
    //     const {
    //         ctx
    //     } = this
    //     const {
    //         receiver,
    //         data
    //     } = ctx.request.body
    //     await this.service.chat.send(receiver, data)
    //     ctx.status = 200
    // }

    async test() {
        const message = this.ctx.args[0];
        console.log('chat :', message + ' : ' + process.pid);
        // const say = await this.ctx.service.user.say();
        this.ctx.socket.emit('res', say);
    }

    async receive() {

    }
}

module.exports = ChatController