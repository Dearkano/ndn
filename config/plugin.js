'use strict';

/** @type Egg.EggPlugin */
exports.cors = {
    enable: true,
    package: 'egg-cors'
}
exports.io = {
    enable: true,
    package: 'egg-socket.io',
};

exports.session = {
    enable: true,
    package: 'egg-session'
}