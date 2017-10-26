var express = require('express');
var router = express.Router();
var url = require('url');
const { exec } = require('child_process');
module.exports = router;





router.post('/PowerPlugs', function(req, res, next){
	try{
		console.log(req.body);
		var reqObj= req.body;
		var outletID = reqObj.outletID;
		var outletStatus = reqObj.outletStatus;

		console.log("ID: "+outletID+" Status: "+outletStatus);

		res.send(sendCodes(readCodes(outletID, outletStatus)));

	} catch(ex)
	{
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

function sendCodes(plugcode){
	var command ="sudo ./codesend "+plugcode+" -l 184";
console.log(command);
exec(command, function (error, stdout, stderr){
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
	return('Success');
}

//TODO Use MongoDB for PowerOutletCodes
function readCodes(outletID, outletStatus){
	var powerOnMap = {
		'1': '4478259',
		'2': '4478403'
	}

	var powerOffMap = {
		'1': '4478268',
		'2': '4478412'
	}

	if (outletStatus = 0) plugcode = powerOffMap[outletID];
	if (outletStatus = 1) plugcode = powerOnMap[outletID];

	return plugcode;
}
