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
    async send() {
        const {
            ctx
        } = this
        const str = ctx.args[0];
        const pkt = JSON.parse(str)
        await this.service.chat.send(pkt)
        ctx.status = 200
    }

    async index() {
        const message = this.ctx.args[0];
        console.log('chat :', message + ' : ' + process.pid);
        // const say = await this.ctx.service.user.say();
        this.ctx.socket.emit('res', message);
    }

    async receive() {

    }
}

module.exports = ChatController
// 'use strict';

// module.exports = app => {
//   class Controller extends app.Controller {
//     async index() {
//       const message = this.ctx.args[0];
//       console.log('chat :', message + ' : ' + process.pid);
//       this.ctx.socket.emit('res', message);
//     }
//   }
//   return Controller;
// };