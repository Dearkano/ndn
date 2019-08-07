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
                face.expressInterest(n, (_, data) => resolve({
                    code: 0,
                    data
                }), () => resolve({
                    code: 1
                }));
            })
        }

        // send request to request basic information
        console.log('send pre request')
        ctx.body="123"
        // const name = new Name(`/bfs/pre/afid/${afid}`);
        // const res = await asyncInterest(name)
        // if (!res.data) {
        //     ctx.body = "file not found"
        //     ctx.status = 404
        // }
        // const resStr = res.data.getContent().buf().toString()
        // const blockNum = JSON.parse(resStr).blockNum

        let total = ''
        let success = true
        // for (let i = 0;; i++) {
        //     const name = new Name(`/bfs/download/afid/${afid}.${i}`);
        //     const data = await asyncInterest(name)
        //     // console.log('receive an interest')
        //     // console.log(data)
        //     if (data.code === 0) {
        //         content = data.data.getContent().buf().toString()
        //         const obj = JSON.parse(content)
        //         total += obj.data.toString('utf8')
        //         if (obj.end === true || obj.end === 'true') break
        //     } else {
        //         success = false
        //         break
        //     }
        // }
        // console.log('out loop')
        const ps = []
        for (let i = 0; i < 26; i++) {
            const name = new Name(`/bfs/download/afid/${afid}.${i}`);
            ps.push(asyncInterest(name))
        }
        const res1 = await Promise.all(ps)
        console.log('loop end')
        console.log(res1.length)
        for (const item of res1) {
            if (item.code === 0) {
                if (item.data) {
                    const obj = JSON.parse(item.data.getContent().buf().toString())
                    if (obj.data) {
                        total += obj.data.toString('utf8')
                    }
                }
            }
        }
        if (true) {
            console.log('before return ')
            const buffer = new Buffer(total, 'utf-8')
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