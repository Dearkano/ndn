const Controller = require('egg').Controller;
class ChatController extends Controller {
    async send() {
        const {
            ctx
        } = this
        const str = ctx.args[0];
        const pkt = JSON.parse(str)
        const res = await this.service.chat.send(pkt)
        if (!res.data) {
            ctx.body = 'file not found'
            ctx.status = 404
            return
        }
        //this.ctx.socket.emit('res', 'send finish');
    }

    async sendImage() {
        const {
            ctx
        } = this
        const str = ctx.args[0];
        const pkt = JSON.parse(str)
        const res = await this.service.chat.sendImage(pkt)
        if (!res.data) {
            ctx.body = 'file not found'
            ctx.status = 404
            return
        }
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

    async setPublicKey() {
        const {
            ctx
        } = this
        const str = ctx.args[0];
        console.log('set public key')
        const { publicKey, username } = JSON.parse(str)
        // check if this user exists
        const uId = await this.service.user.find(username)
        console.log(uId)
        if (uId) {} else {
            await this.service.user.add(username, publicKey)
        }
    }

    async getPublicKey() {
        const {
            username
        } = this.ctx.request.query
        const result = await this.service.chat.getPublicKey(username)
        console.log(result)
        if (!result.data) {
            this.ctx.body = 'user not exist'
            this.ctx.status = 400
        } else {
            this.ctx.body = result.data.getContent().buf().toString()
            this.ctx.status = 200
        }
    }

    async getMessageList() {
        const {
            addr
        } = this.ctx.request.query
        const result = await this.service.chat.getMessageList(addr)
        this.ctx.body = result
        this.ctx.status = 200
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