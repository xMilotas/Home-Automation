
const { exec } = require('child_process');
const schedule = require('node-schedule');

// Run every minute from 16:45 to 16:59 (until 17:00)
schedule.scheduleJob(
  { hour: 16, minute: new schedule.Range(45, 59) },
  turnLightOn
);

// Run every minute from 02:00 to 02:15
schedule.scheduleJob(
  { hour: 2, minute: new schedule.Range(0, 15) },
  turnLightOff
);

function sendCodes(plugcode) {
  const command = `sudo ./codesend ${plugcode} -l 185`;
  let i = 0;

  const repeat = setInterval(() => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log('exec error: ' + error);
      }
    });
    i++;
    if (i >= 5) clearInterval(repeat);  // stop after 5 sends
  }, 200);