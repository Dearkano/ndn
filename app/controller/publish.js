const Controller = require('egg').Controller;
const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js')
const Fiber = require('fibers');
// Silence the warning from Interest wire encode.
Interest.setDefaultCanBePrefix(true);

var face = new Face(new UnixTransport());

var callbackCount = 0;




class PublishController extends Controller {
    async getFileInfo() {
        const {
            ctx
        } = this
        const {afid} = ctx.query
        let content = null
        var onTimeout = function (interest) {
            console.log("Time out for interest " + interest.getName().toUri());

            if (++callbackCount >= 3)
                // This will cause the script to quit.
                face.close();
        };

        function asyncInterest() {
            return new Promise(function (resolve) {
                const name = new Name(`/bfs/${afid}`);
                console.log("Express name " + name.toUri());
                face.expressInterest(name, (_, data) => resolve(data), onTimeout);
            })
        }
        const data = await asyncInterest()
        content = data.getContent().buf().toString('binary')
        ctx.body = content
        ctx.status = 200
    }
}
module.exports = PublishController;