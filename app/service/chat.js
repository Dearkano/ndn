const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js-sdk')
const fetch = require('node-fetch')
const Service = require('egg').Service;
Interest.setDefaultCanBePrefix(true);
const face = new Face(new UnixTransport());
function asyncInterest(receiver, data) {
    return new Promise(function (resolve) {
        const name = new Name(`/bfs/chat/${receiver}/afid/${data}`);
        // console.log("Express name " + name.toUri());
        face.expressInterest(name, (_, data) => resolve({
            code: 0,
            data
        }), () => resolve({
            code: 1
        }));
    })
}
class ChatService extends Service {
    async send(receiver, data) {
      console.log('service send data')
      await asyncInterest(receiver, data)
    }
  }
  
  module.exports = ChatService;