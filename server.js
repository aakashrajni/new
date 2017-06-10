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

restServices.use(bodyParser.json());

var url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';
	
	request(url, function(error, response, html){
	if(!error){
	var $ = cheerio.load(html);
	
	var title;
	var tit = [];
        var rating;
	var n = 0;
	
	$('.rating_txt').filter(function(){
	var data = $(this);
	rating = data.children().first().text();
	if(rating > 10)
	{
	n++;console.log(n);}
            })
	$('.overview-top').filter(function(){
	var data = $(this);
	title = data.children().first().text();
	tit.push(title);
	})

        }console.log(tit[n]);
    })	


restServices.post('/echo', function(req , res ){

	var speech =  JSON.stringify(tit[n]);
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
});

restServices.listen((process.env.PORT || 5000), function() {
	console.log("Server up and listening");
});
