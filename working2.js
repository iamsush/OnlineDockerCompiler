var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var FileService = require('../services/fileHandling.service');
var DockerService = require('../services/docker.service');
var path = require('path');
//var io = require('socket.io').listen('3000');

exports.fileSave = function(req, res, next){
  FileService.upload(req, res, (err)=>{
    if(err){
      res.json({
        msg : err
      });
    }
    else{
      let data = [];
      req.files.forEach(function(item) {
        let info = {
          filename : item.filename,
          language: req.body.language,
          socket: req.body.socket,
          args : 'args.txt'
        }
        data.push(info);
      });
      io.sockets.emit('foo', 'oh yeah');
      // console.log(req.body.socket.id);
      console.log('success');
      req.specialData = data;
      // next();
    }
  })
};

exports.directSave = function(req, res, next){
  FileService.writeToFile(req.body.code, `input.${req.body.exts}`);
  FileService.writeToFile(req.body.args, 'args.txt');

  let info = {
    filename : `input.${req.body.exts}`,
    language: req.body.language,
    args : 'args.txt'
  }

  let data = [];
  data.push(info);
  req.specialData = data;
  next();
}

exports.compile = function(req,res, next) {

  req.specialData.forEach(function(data){
    let dockerArgs = DockerService.args(data);
    const image = dockerArgs[data.language]['image'];
    const command = dockerArgs[data.language]['CMD'];
    const options = dockerArgs['options'];
    let outputFile = FileService.createFile(`${data.filename}-out.txt`);

    docker.run(image, command, outputFile, options)
    .then(function(container) {
      res.download(path.join(__dirname, `../dockerFiles/${data.filename}-out.txt`));

      //socket.emit('compileComplete', `${data.filename}-out.txt`);

      return container.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
  });
  // res.json({
  //   success : 'true'
  // });
}
