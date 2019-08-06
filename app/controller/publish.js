const Controller = require('egg').Controller;
const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js')
const Fiber = require('fibers');
const fs = require('fs')
const stream = require('stream');
// Silence the warning from Interest wire encode.
Interest.setDefaultCanBePrefix(true);

var face = new Face(new UnixTransport());

var callbackCount = 0;




class PublishController extends Controller {
    async getFileInfo() {
        const {
            ctx
        } = this
        const {
            afid
        } = ctx.query
        let content = null

        function asyncInterest() {
            return new Promise(function (resolve) {
                const name = new Name(`/bfs/info/afid/${afid}`);
                console.log("Express name " + name.toUri());
                face.expressInterest(name, (_, data) => resolve({
                    code: 0,
                    data
                }), () => resolve({
                    code: 1
                }));
            })
        }
        const data = await asyncInterest()
        let rs = {}
        if (data.code === 0) {
            content = data.data.getContent().buf().toString()
            const json = JSON.parse(content)
            let {result, config } = json
            let arr = result.split(';')
            for(const item of arr){
                if(item){
                    if(item.indexOf('=')!==-1){
                        const subArr = item.split('=')
                        rs[subArr[0]] = subArr[1]
                    }
                }
            }
            config = config.replace('\n', ' ')
            let arr1 = config.split(' ')
            for(const item of arr1){
                if(item){
                    if(item.indexOf('=')!==-1){
                        const subArr = item.split('=')
                        rs[subArr[0]] = subArr[1]
                    }
                }
            }
            ctx.body = JSON.stringify(rs)
            ctx.status = 200
        } else {
            ctx.body = "file not found"
            ctx.status = 404
        }
    }

    async downloadFile(){
        const {
            ctx
        } = this
        const {
            afid
        } = ctx.query
        let content = null

        function asyncInterest() {
            return new Promise(function (resolve) {
                const name = new Name(`/bfs/download/afid/${afid}`);
                console.log("Express name " + name.toUri());
                face.expressInterest(name, (_, data) => resolve({
                    code: 0,
                    data
                }), () => resolve({
                    code: 1
                }));
            })
        }
        const data = await asyncInterest()
        if (data.code === 0) {
            content = data.data.getContent().buf().toString()
            const buffer = new Buffer(content)
            const bufferStream = new stream.PassThrough();
            bufferStream.end(buffer);
            // fs.writeFileSync(`/root/ndn-tmp/${afid}.dat`, content)
            ctx.attachment(`${afid}.txt`)
            ctx.set('Content-Type', 'application/octet-stream')
            ctx.body = bufferStream
            ctx.status = 200
        } else {
            ctx.body = "file not found"
            ctx.status = 404
        }
    }
}
module.exports = PublishController;