'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        route,
        controller
    } = app.io;
    const {
        router
    } = app
    router.get('/', controller.home.index);
    router.get('/getFileInfo', controller.publish.getFileInfo);
    router.get('/download', controller.publish.downloadFile);
    router.get('/downloadFile', controller.publish.downloadIFile);
    router.get('/getDownloadInfo', controller.publish.getDownloadInfo);
    router.post('/getRNodeInfo', controller.afs.getRNodeInfo)
    router.post('/file_record/afid', controller.publish.getFileRecord)
    router.get('/getFileParameter', controller.publish.getFileParameter);
    router.get('/getPublicKey', controller.chat.getPublicKey);
    //router.get('/getFriendList', controller.chat.getFriendList);
    router.post('/addFriend', controller.chat.addFriend);
    app.io.route('chat', app.io.controller.chat.send);
    app.io.route('image', app.io.controller.chat.sendImage);
    app.io.route('publicKey', app.io.controller.chat.setPublicKey);
};