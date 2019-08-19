    /* eslint valid-jsdoc: "off" */

    'use strict';

    /**
     * @param {Egg.EggAppInfo} appInfo app info
     */
    module.exports = appInfo => {
        /**
         * built-in config
         * @type {Egg.EggAppConfig}
         **/
        const config = exports = {};

        // use for cookie sign key, should change to your own and keep security
        config.keys = appInfo.name + '_1564978650095_509';

        // add your middleware config here
        config.middleware = [];

        // add your user config here
        const userConfig = {
            // myAppName: 'egg',
        };
        // 加载 errorHandler 中间件
        config.middleware = [];
        config.security = {
            csrf: {
                enable: false,
                ignoreJSON: true
            }
        };
        config.cors = {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        };
        config.io = {
            init: {}, // passed to engine.io
            namespace: {
                '/': {
                    connectionMiddleware: ['auth'],
                    packetMiddleware: ['filter'],
                },
            },
            redis: {
                host: '127.0.0.1',
                port: 6379
            }
        };
        config.cluster = {
            listen: {
                path: '',
                port: 10010,
                hostname: '0.0.0.0',
            }
        };
        return {
            ...config,
            ...userConfig,
        };
    };