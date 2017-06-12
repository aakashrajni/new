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
var title;
var tit = [];
var n;

restServices.use(bodyParser.json());
restServices.post('/echo', function(req , res ){
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

	var speech =  "Wonder Woman";
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
});

restServices.listen((process.env.PORT || 5000), function() {
	console.log("Server up and listening");
});
