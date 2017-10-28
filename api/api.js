var express = require('express');
var router = express.Router();
var url = require('url');
const {
  exec
} = require('child_process');
module.exports = router;


router.post('/PowerPlugs', function(req, res, next) {
  try {
    console.log(req.body);
    var reqObj = req.body;
    var outletID = reqObj.outletID;
    var outletStatus = reqObj.outletStatus;
    if (outletID == '6') {
      var i = 1;
      var repeat = setInterval(function () {
          console.log(i);
          res.send(sendCodes(readCodes(i, outletStatus)));
          i++;
          if (i == 5) clearInterval(repeat);
      }, 1000);

      }
     else res.send(sendCodes(readCodes(outletID, outletStatus)));
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

function sendCodes(plugcode) {
  var command = "sudo ./codesend " + plugcode + " -l 183";
  console.log(command);
  exec(command, function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

//TODO Use MongoDB for PowerOutletCodes
function readCodes(outletID, outletStatus) {
  var powerOnMap = {
    '1': '4478259',
    '2': '4478403',
    '3': '4478723',
    '4': '4480259',
    '5': '4486403'
  }

  var powerOffMap = {
    '1': '4478268',
    '2': '4478412',
    '3': '4478732',
    '4': '4480268',
    '5': '4486412'
  }
  plugcode = powerOffMap[outletID];
  if (outletStatus == 1) plugcode = powerOnMap[outletID];
  return plugcode;
}
