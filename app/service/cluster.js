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
        const name = new Name(`/chat/${cluster}/onlinelist/${d}`);
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
    class ClusterService extends app.Service {
        async updateOnlineList(){
            const result = await this.ctx.model.User.find()
            await asyncInterest(app.cluster, result)
        }

        async receiveOnlineList(cluster, list){
            const prs = await this.ctx.model.Cluster.find({cluster})
            if(!prs){
                const result = await this.ctx.model.Cluster.add({cluster, list})
            }else{
                const result = await this.ctx.model.Cluster.update({cluster}, {list})
            }
        }
    }
    return ClusterService
}