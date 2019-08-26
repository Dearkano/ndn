'use strict';

const Service = require('egg').Service;
class UserService extends Service {
    async add(sender, publicKey) {
        const {
            ctx,
        } = this;
        const result = await ctx.model.User.create({
            username: sender,
            publicKey,
            online: true
        });
        return result;
    }

    async find(username) {
        const result = await this.ctx.model.User.findOne({
            username
        })
        console.log('find user')
        console.log(result)
        if (!result) {
            return null
        }
        return result
    }

    async delete(username) {
        await this.ctx.model.User.remove({
            username
        })
    }

    async connect(username) {
        await this.ctx.model.User.update({
            username
        }, {
            online: true
        })
    }

    async disconnect(username) {
        await this.ctx.model.User.update({
            username
        }, {
            online: false
        })
    }
}
module.exports = UserService;