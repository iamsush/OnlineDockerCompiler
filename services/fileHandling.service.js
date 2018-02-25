var fs = require("fs");
var { Readable } = require('stream');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: './dockerFiles/',
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})
exports.upload = multer({
  storage: storage
}).array('file-to-upload', 3);

exports.writeToFile = function(data, filename){
  var input = new Readable();
  input.push(data);
  input.push(null);
  var file = createFile(filename);
  input.pipe(file);
}

exports.createFile = function(filename){
  return createFile(filename);
}

function createFile(filename){
  var file = fs.createWriteStream(`/home/sushant/SampleProj/NodeCompiler/dockerFiles/${filename}`);
  return file;
};
