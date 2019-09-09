'use strict';

const Service = require('egg').Service;
class SocketService extends Service {
    async add(user1, user2, socketId) {
        const {
            ctx,
        } = this;
        const result = await ctx.model.Socket.create({
            user1,
            user2,
            socketId
        });
        return result;
    }

    async find(user1, user2) {
        const result = await this.ctx.model.Socket.findOne({
            '$or': [{
                'user1': user1,
                'user2': user2
            }, {
                'user1': user2,
                'user2': user1
            }]
        })
        console.log('find user1 and user2')
        console.log(result)
        if (!result) {
            return null
        }
        const socketId = result.socketId
        return socketId
    }
    async disconnect(user1, user2) {
        const result = await this.ctx.model.Socket.remove({
            '$or': [{
                'user1': user1,
                'user2': user2
            }, {
                'user1': user2,
                'user2': user1
            }]
        })
        return result
    }
}
module.exports = SocketService;