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
    constructor(ctx){
        super(ctx)
        const fiber = Fiber.current
        console.log('in constructor')
        console.log(fiber)
        this.fiber = fiber
    }
    async getFileInfo() {
        const {
            ctx
        } = this
        var name1 = new Name("/bfs/1e000000000304a17ae21be9df24640ebf6ae2a3bd5f1be76c8056cd55beca1f5463ffcac6157e7750ddfc057629f809b61a2f40c357de65311e8ce95d052d19");
        console.log("Express name " + name1.toUri());
        let content = null
        const that = this
        var onData = function (interest, data) {
            console.log("Got data packet with name " + data.getName().toUri());
            console.log(data.getContent().buf().toString('binary'));
            content = data.getContent().buf().toString('binary')
            console.log(this)
            console.log(this.fiber)
            this.fiber.run()
            if (++callbackCount >= 3)
                // This will cause the script to quit.
                face.close();
        };

        var onTimeout = function (interest) {
            console.log("Time out for interest " + interest.getName().toUri());

            if (++callbackCount >= 3)
                // This will cause the script to quit.
                face.close();
        };
        face.expressInterest(name1, onData.bind(this), onTimeout);
        Fiber.yield()
        ctx.body = content
        ctx.status = 200
    }
}
module.exports = PublishController;