'use strict';

const Service = require('egg').Service;
class UserService extends Service {
    async add(sender, publicKey) {
        const {
            ctx,
        } = this;
        const result = await ctx.model.User.create({
            username: sender,
            publicKey
        });
        return result;
    }

    async find(username) {
        const result = await this.ctx.model.Socket.findOne({
            username
        })
        console.log('find user')
        console.log(result)
        if (!result) {
            return null
        }
        return result
    }
}
module.exports = UserService;