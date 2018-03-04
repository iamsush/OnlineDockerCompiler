const Config = require('../config');
exports.args = function(data){
  return {
    'C++' : {
      'image' :  'cpp:updated',
      'CMD' : ['bash', '-c', `g++ ${data.filename} -o ${data.filename}.out && ./${data.filename}.out < ${data.args}`],
    },
    'C' : {
      'image' :  'cpp:updated',
      'CMD' : ['bash', '-c', `gcc ${data.filename} -o ${data.filename}.out && ./${data.filename}.out < ${data.args}`]
    },
    'Python' : {
      'image' : 'python:updated',
      'CMD' : ['python', `${data.filename}`]
    },
    'Node JS' : 'node:updated',
    'R' : 'r:updated',
    'options' :  {
      "WorkingDir":"/home",
      "HostConfig":{
        "Binds":[`${Config.bindPath}:/home`]
      }
    }
  }
}
