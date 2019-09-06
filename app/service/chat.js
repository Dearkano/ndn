'use strict'

const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js-sdk')
Interest.setDefaultCanBePrefix(true);
const face = new Face(new UnixTransport());

function asyncInterest(cluster, pkt) {
    return new Promise(function (resolve) {
        const d = JSON.stringify(pkt)
        const name = new Name(`/chat/${cluster}/afid/${d}`);
        console.log("Express name " + name.toUri());
        face.expressInterest(name, (_, data) => resolve({
            code: 0,
            data
        }), () => resolve({
            code: 1
        }));
    })
}

function asyncInterest2(cluster, pkt) {
    return new Promise(function (resolve) {
        const d = JSON.stringify(pkt)
        const name = new Name(`/chat/${cluster}/publicKey/${d}`);
        console.log("Express name " + name.toUri());
        face.expressInterest(name, (_, data) => resolve({
            code: 0,
            data
        }), () => resolve({
            code: 1
        }));
    })
}

function asyncInterest3(cluster, pkt) {
    return new Promise(function (resolve) {
        const d = JSON.stringify(pkt)
        const name = new Name(`/chat/${cluster}/image/${d}`);
        console.log("Express name " + name.toUri());
        face.expressInterest(name, (_, data) => resolve({
            code: 0,
            data
        }), () => resolve({
            code: 1
        }));
    })
}

module.exports = app => {
    class ChatService extends app.Service {
        async send(pkt) {
            console.log('service send data')
            return await asyncInterest(app.cluster, pkt)
        }
        async sendImage(pkt) {
            return await asyncInterest3(app.cluster, pkt)
        }
        async reply(msg) {
            console.log(' in service')
            this.ctx.socket.emit('res', msg)
        }
        async getPublicKey(username) {
            return await asyncInterest2(app.cluster, {
                username
            })
        }

        async getMessageList(addr) {
            const result = await this.ctx.model.Message.find({
                receiver: addr
            })
            const addrs = []
            const rs = []
            // find distinct addrs
            for (const item of result) {
                if (addrs.indexOf(item.sender) === -1) {
                    addrs.push(item.sender)
                    rs.push({
                        sender: item.sender,
                        receiver: addr,
                        messages: []
                    })
                }
            }

            // push
            for (const item of result) {
                const index = addrs.indexOf(item.sender)
                rs[index].messages.push({
                    afid: item.afid,
                    timestamp: item.timestamp || Date.now(),
                    status: item.status
                })
            }

            await this.ctx.model.Message.update(addr)

            return rs

        }
    }
    return ChatService
}