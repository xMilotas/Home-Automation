var express = require('express');
var router = express.Router();
var url = require('url');
const {exec} = require('child_process');
const client = require('./whatsapp_client')

// require routes
var tpRoutes = require('./tp/')
router.use('/tp', tpRoutes)

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
    console.log(req.body);
    var reqObj = req.body;
    var outletID = reqObj.outletID;
    var outletStatus = reqObj.outletStatus;

    // Turn on/off everything
    if (outletID == '6') {
      var i = 1
      var repeat = setInterval(function () {
        sendCodes(readCodes(i, outletStatus))
        i++;
        if (i == 7) clearInterval(repeat);
      }, 1000);
      res.send("Success");
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
  if (plugcode == "5575761" || plugcode == "5575764") comand = "sudo ./codesend " + plugcode + " -l 301"
  console.log(command)
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
      '4': '5575761',
      '5': '5571921',
      '6': '5575953',
    }
  
    var powerOffMap = {
      '1': '4478268',
      '2': '4478412',
      '3': '4478732',
      '4': '5575764',
      '5': '5571924',
      '6': '5575956',
    }
    plugcode = powerOffMap[outletID];
    if (outletStatus == 1) plugcode = powerOnMap[outletID];
    return plugcode;
  }

  module.exports = router;