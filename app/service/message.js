'use strict';

const Service = require('egg').Service;
class MessageService extends Service {
    async add(sender, receiver, afid) {
        const {
            ctx,
        } = this;
        const result = await ctx.model.message.create({
            sender,
            receiver,
            afid,
            status: 'pending'
        });
        return result;
    }

    async find(sender, receiver) {
        const result = await this.ctx.model.Message.find({
            receiver, sender
        })
        console.log('find receiver sender')
        console.log(result)
        return result
    }
}
module.exports = MessageService;