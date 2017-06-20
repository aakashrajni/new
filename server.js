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
var arrt = [1,2,3,4,5];
var arr = [10,9,8,7,6];
restServices.use(bodyParser.json());

restServices.post('/echo', function(req , res ){

	if(req.body.result.parameters.movietell == best)
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
	if(req.body.result.parameters.movietell == best)
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
});

restServices.listen((process.env.PORT || 5000), function() {
	console.log("Server up and listening");
	var http = require("http");
setInterval(function() {
    http.get("http://serene-forest-36255.herokuapp.com");
}, 300000);
});
