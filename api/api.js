var express = require('express');
var router = express.Router();
var url = require('url');
const {exec} = require('child_process');
module.exports = router;

var spotifyActive = 1;
var bundesligaActive = 1;
var timeActive = 1;
var weatherActive = 1;
var timerActive = 0;

router.post('/Settings', function(req, res, next){
  var widget = req.body.widget;
  var status = req.body.status;
  switch (widget) {
    case "Spotify":
      spotifyActive = req.body.status;
      break;
    case "Bundesliga":
      bundesligaActive = req.body.status;
      break;
    case "Time":
      timeActive = req.body.status;
      break;
    case "Weather":
      weatherActive = req.body.status;
      break;
  }
});

router.get('/Settings', function(req, res, next){
  res.send('{ Spotify: '+spotifyActive +", Bundesliga: "+bundesligaActive+"}");
});


router.post('/PowerPlugs', function(req, res, next) {
  try {
    var reqObj = req.body;
    var outletID = reqObj.outletID;
    var outletStatus = reqObj.outletStatus;
    if (outletID == '6') {
      var i = 1;
      var repeat = setInterval(function () {
          res.send(sendCodes(readCodes(i, outletStatus)));
          i++;
          if (i == 6) clearInterval(repeat);
        }, 1000);
      }
     else {
       if (req.body.time){
          if (timerActive == 0){
             timerActive = 1;
             console.log("Timer aktiv schalten..")
             res.send(sendCodes(readCodes(outletID, outletStatus)));
             var timer2 = setTimeout(function() {
             console.log("Timer aus")
             sendCodes(readCodes(outletID, 0)));
            }, Number(req.body.time) * 60000);#
            }
          }
       }
       else {
       res.send(sendCodes(readCodes(outletID, outletStatus)));
     }
     }
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

function sendCodes(plugcode) {
  var command = "sudo ./codesend " + plugcode + " -l 183";
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
