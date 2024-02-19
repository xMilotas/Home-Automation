const {exec} = require('child_process');
const schedule = require('node-schedule');

var j = schedule.scheduleJob({hour: 16, minute: 45}, turnLightOn);
var s = schedule.scheduleJob({hour: 16, minute: 46}, turnLightOn);
var t = schedule.scheduleJob({hour: 16, minute: 47}, turnLightOn);
var s1 = schedule.scheduleJob({hour: 16, minute: 48}, turnLightOn);
var s2 = schedule.scheduleJob({hour: 16, minute: 49}, turnLightOn);
var s3 = schedule.scheduleJob({hour: 16, minute: 50}, turnLightOn);
var k = schedule.scheduleJob({hour: 2, minute: 0}, turnLightOff);
var a = schedule.scheduleJob({hour: 2, minute: 1}, turnLightOff);
var t = schedule.scheduleJob({hour: 2, minute: 2}, turnLightOff);
var h = schedule.scheduleJob({hour: 2, minute: 3}, turnLightOff);
var i = schedule.scheduleJob({hour: 2, minute: 4}, turnLightOff);

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
    sendCodes("5574993");
}

function turnLightOff(fireDate) {
	console.log("Running turn of at"+fireDate)
	sendCodes("5575956");
}


//on:   5575761
//off:  5575764
