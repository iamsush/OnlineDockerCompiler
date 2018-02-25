//module.exports = function(io){
  var express = require('express');
  var dockerController = require('../controllers/docker.controller');
  var router = express.Router();

  router.post('/test', function(req, res, next){
    console.log(req.files);
    res.json({
      msg:'success'
    })
  });

  router.post('/file', dockerController.fileSave, dockerController.compile);
  router.post('/online', dockerController.directSave, dockerController.compile);

  module.exports = router;
//   return router;
// }
