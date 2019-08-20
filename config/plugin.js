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

exports.redis = {
    enable: true,
    package: 'egg-redis',
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};