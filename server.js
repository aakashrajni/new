'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restServices = express();

restServices.use(bodyParser.urlencoded({
	extended: true
	}));

restServices.use(bodyParser.json());

restServices.post('/echo', function(req , res ){
	var speech =  "wonder woman";
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
});

restServices.listen((process.env.PORT || 5000), function() {
	console.log("Server up and listening");
});
