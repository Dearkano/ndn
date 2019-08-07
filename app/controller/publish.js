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
                // console.log("Express name " + name.toUri());
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
            let {
                result,
                config
            } = json
            let arr = result.split(';')
            for (const item of arr) {
                if (item) {
                    if (item.indexOf('=') !== -1) {
                        const subArr = item.split('=')
                        rs[subArr[0]] = subArr[1]
                    }
                }
            }
            config = config.replace('\n', ' ')
            let arr1 = config.split(' ')
            for (const item of arr1) {
                if (item) {
                    if (item.indexOf('=') !== -1) {
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

    async downloadIFile() {
        console.log('gogogo')
        this.ctx.body = '21312312'
    }

    async downloadFile() {
        const {
            ctx
        } = this
        const {
            afid
        } = ctx.query
        let content = null

        async function asyncInterest(n) {
            // // console.log('in '+ n)
            return new Promise(function (resolve) {
                // console.log("Express name " + n.toUri());
                face.expressInterest(n, (interest, data) => resolve({
                    code: 0,
                    data,
                    interest
                }), () => resolve({
                    code: 1
                }));
            })
        }

        // send request to request basic information
        let start = new Date().getTime()
        const name = new Name(`/bfs/pre/afid/${afid}`);
        const res = await asyncInterest(name)
        if (!res.data) {
            ctx.body = "file not found"
            ctx.status = 404
        }
        const resStr = res.data.getContent().buf().toString()
        const blockNum = JSON.parse(resStr).blockNum
        let end = new Date().getTime()
        console.log('pre time = ' + (end - start))

        let total = new Buffer('', 'utf-8')
        let success = true
        start = new Date().getTime()
        for (let i = 0; i < blockNum; i++) {
            const name = new Name(`/bfs/download/afid/${afid}.${i}`);
            const data = await asyncInterest(name)
            // console.log(data.data.getContent())
            if (data.code === 0) {
                content = data.data.getContent().buf()
                console.log('-------------')
                total = Buffer.concat([total, content])
            } else {
                success = false
                break
            }
        }
        end = new Date().getTime()
        console.log('interest time = ' + (end - start))
        // const ps = []
        // for (let i = 0; i < blockNum; i++) {
        //     const name = new Name(`/bfs/download/afid/${afid}.${i}`);
        //     ps.push(asyncInterest(name))
        // }
        // const res1 = await Promise.all(ps)
        // console.log('loop end')
        // console.log(res1.length)
        // for (const i in res1) {
        //     const item = res1[i]
        //     if (item.code === 0) {
        //             const obj = JSON.parse(item.data.getContent().buf().toString())
        //             if (obj.data) {
        //                 total += obj.data.toString('utf8')
        //             }else{
        //                 console.log('obj data = null index = '+i)
        //             }
        //     }else{
        //         console.log('code = 1 index = '+ i)
        //     }
        // }
        if (success) {
            start = new Date().getTime()
            console.log('before return ')
            //const buffer = new Buffer(total, 'utf-8')
            const bufferStream = new stream.PassThrough();
            bufferStream.end(total);
            // fs.writeFileSync(`/root/ndn-tmp/${afid}.dat`, content)
            ctx.attachment(`${afid}.txt`)
            ctx.set('Content-Type', 'application/octet-stream')
            ctx.body = bufferStream
            ctx.status = 200
            end = new Date().getTime()
            console.log('transmit time = ' + (end - start))
        } else {
            ctx.body = "file not found"
            ctx.status = 404
        }
    }
}
module.exports = PublishController;