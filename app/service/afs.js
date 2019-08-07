const fetch = require('node-fetch')
const Service = require('egg').Service;

class AfsService extends Service {
  async getRNodeInfo(ip) {
    const res = await fetch(ip)
    const text = await res.text()
    console.log(text)
    return text;
  }
}

module.exports = AfsService;