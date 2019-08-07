'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getFileInfo', controller.publish.getFileInfo);
  router.get('/download', controller.publish.downloadFile);
  router.get('/downloadFile', controller.publish.downloadIFile);
  router.get('/getRNodeInfo', controller.afs.getRNodeInfo)
};
