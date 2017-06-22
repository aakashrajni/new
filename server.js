'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const restServices = express();

restServices.use(bodyParser.urlencoded({
	extended: true
	}));
var title,ttitle;
var tit = [];var ttit = [];
var n,t;
var arrt = [0,1,2,3,4];
var arr = [10,9,8,7,6];
restServices.use(bodyParser.json());

restServices.post('/echo', function(req , res ){

	if(req.body.result.parameters.movietell == "best")
	{
	var url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';	
	request(url, function(error, response, html){
	if(!error){
	var $ = cheerio.load(html);
	
	$('.overview-top').filter(function(){
	var data = $(this);
	title = data.children().first().text();
	tit.push(title);
	})
	n = tit.length;
        }
	console.log(tit[n-10]);
    })	
	var rand = arr[Math.floor(Math.random() * arr.length)];
	var speech =  tit[n-rand];
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
	}
	if(req.body.result.parameters.movietell == "tamil")
	{
	var url = 'https://www.filmipop.com/chennai/movie/moviesearch?sp=bycinema.PVR%20-%20Ampa%20Sky%20Walk%20Mall,%20Aminjikerai__bylanguage.Tamil__byrunning.1';
	request(url, function(error, response, html){
	if(!error){
	var $ = cheerio.load(html);
	$('.movie-title').filter(function(){
	var data = $(this);
	ttitle = data.children().first().text();
	ttit.push(ttitle);
	});}
	});
	var rand = arrt[Math.floor(Math.random() * arrt.length)];
	var speech =  ttit[rand];
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
	}
	if(req.body.lang == "e")
	console.log("Alive");
});

restServices.listen((process.env.PORT || 5000), function() {
	console.log("Server up and listening");
	var http = require("http");
setInterval(function() {
	var options = {
    url: 'https://serene-forest-36255.herokuapp.com/echo',
    method: 'POST',
    headers: "",
    form: {
  "id": "bfacf52c-19bb-4662-87cf-59a5a3d063c5",
  "timestamp": "2017-06-22T11:09:25.667Z",
  "lang": "e",
  "result": {
    "source": "agent",
    "resolvedQuery": "refer me a hit movie to watch",
    "action": "tell.movie",
    "actionIncomplete": false,
    "parameters": {
      "movietell": "",
      "movietell1": "",
      "movietell2": ""
    },
    "contexts": [],
    "metadata": {
      "intentId": "3c3b3cf5-22ca-4730-9c09-bb3cbc403c77",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "webhookResponseTime": 72,
      "intentName": "what movie can i see"
    },
    "fulfillment": {
      "speech": " All Eyez on Me (2017)",
      "source": "webhook-echo-sample",
      "displayText": " All Eyez on Me (2017)",
      "messages": [
        {
          "type": 0,
          "speech": " All Eyez on Me (2017)"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "b1e60396-cb73-44f9-80d3-d8c2a493ca79"
}
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})    
}, 3000);
});
