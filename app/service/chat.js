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

module.exports = app => {
    class ChatService extends app.Service {
        async send(pkt) {
            console.log('service send data')
            return await asyncInterest(app.cluster, pkt)
        }
        async reply(msg) {
            console.log(' in service')
            this.ctx.socket.emit('res', msg)
        }
    }
    return ChatService
}