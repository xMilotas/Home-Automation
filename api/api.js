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
	var command ="sudo ./codesend "+plugcode+" -� 0 -l 184";

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
		'1': '52312313',
		'2': '23423424'
	}

	var powerOffMap = {
		'1': '23123132',
		'2': '12313223'
	}

	if (outletStatus = 0) plugcode = powerOnMap[outletID];
	else plugcode = powerOffMap[outletID];

	return plugcode;
}
