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
        const res = await this.service.chat.send(pkt)
        if (!res.data) {
            ctx.body = "file not found"
            ctx.status = 404
            return
        }
        const resStr = res.data.getContent().buf().toString()
        this.ctx.socket.emit('res', 'send finish');
    }

    async index() {
        const message = this.ctx.args[0];
        console.log('chat :', message + ' : ' + process.pid);
        // const say = await this.ctx.service.user.say();
        this.ctx.socket.emit('res', message);
    }

    async reply(msg) {
        this.ctx.socket.emit('res', msg);
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