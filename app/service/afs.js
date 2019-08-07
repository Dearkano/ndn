const fetch = require('node-fetch')
const Service = require('egg').Service;

class AfsService extends Service {
  async getRNodeInfo(ip) {
      console.log(ip)
    const res = await fetch(ip)
    const text = await res.text()
    return text;
  }
}

module.exports = AfsService;