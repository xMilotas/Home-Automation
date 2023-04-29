var express = require('express');
var router = express.Router();
var url = require('url');
const {exec} = require('child_process');
const client = require('./whatsapp_client')


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

// Send notification message to private group chat 
router.get('/Notify', function(req, res, next){
  client.sendMessage("120363147865391832@g.us", 
  req.query.msg).then(e => res.send('Success'))
});


router.post('/PowerPlugs', function(req, res, next) {
  try {
    var reqObj = req.body;
    var outletID = reqObj.outletID;
    var outletStatus = reqObj.outletStatus;

    // Turn on/off everything
    if (outletID == '6') {
      var i = 1
      var repeat = setInterval(function () {
        sendCodes(readCodes(i, outletStatus))
        i++;
        if (i == 6) clearInterval(repeat);
      }, 1000);
    }
    else {
      // Timer handling
       if (req.body.timer != "false"){
          if (timerActive == 0){
             timerActive = 1;
             res.send(sendCodes(readCodes(outletID, outletStatus)));
             var timer2 = setTimeout(function() {
             timerActive = 0;
             sendCodes(readCodes(outletID, 0));
           }, Number(req.body.timer) * 60000);
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
  var command = "sudo ./codesend " + plugcode + " -l 185"
  var i = 0
  var repeat = setInterval(function () {
    exec(command, function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    })
    i++;
    if (i == 5) clearInterval(repeat);
  }, 100);
}

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
