const {exec} = require('child_process');
const schedule = require('node-schedule');

var j = schedule.scheduleJob({hour: 16, minute: 45}, turnLightOn);
var s = schedule.scheduleJob({hour: 16, minute: 46}, turnLightOn);
var t = schedule.scheduleJob({hour: 16, minute: 47}, turnLightOn);
var s1 = schedule.scheduleJob({hour: 16, minute: 48}, turnLightOn);
var s2 = schedule.scheduleJob({hour: 16, minute: 49}, turnLightOn);
var s3 = schedule.scheduleJob({hour: 16, minute: 50}, turnLightOn);


function sendCodes(plugcode) {
    var command = "sudo ./codesend " + plugcode
    var i = 0
    // Send Command 5 times to ensure power plug actually gets the signal
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

// Automatically turn on light at x

function turnLightOn(fireDate) {
    console.log("Running job at:"+fireDate)
    sendCodes("5571921");
}

//on:   5575761
//off:  5575764