/////////////////////////////////////////////////////////////////////////
//    __  ___                _______             ___                   
//   /  |/  /__ ___ ____ _  /_  __(_)__  __ __  / _ \_______ __ ____ __
//  / /|_/ / -_) _ `/ _ `/   / / / / _ \/ // / / ___/ __/ _ \\ \ / // /
// /_/  /_/\__/\_, /\_,_/   /_/ /_/_//_/\_, / /_/  /_/  \___/_\_\\_, / 
//            /___/                    /___/                    /___/  
// 
//             A fun tiny proxy for when you barely care.
//                              v0.0.1
////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
// Setup
//////////////////////////////////////////

var express = require('express'),
    app = express(),
    httpProxy = require('http-proxy'),
    request = require('request'),
    colors = require('colors');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

function reportProxy(req, url){
    console.log('proxying', req.originalUrl.blue ,'to', url.magenta);
}


//////////////////////////////////////////
// Config
/////////////////////////////////////////

app.configure(function(){
    app.use(allowCrossDomain);
    app.set('port', process.env.PORT || 3000);
});


//////////////////////////////////////////
// Forwarding Rules
//////////////////////////////////////////

app.use('/api/collections/:collId', function(req, res) {
  var url = "http://your-really-cool-api.com/v1/collections/" + req.params.collId; 
  reportProxy(req, url);
  req.pipe(request(url)).pipe(res);
});


//////////////////////////////////////////
// Go for the Gold!
//////////////////////////////////////////

app.listen();

console.log("Hey!".red + " Welcome to ".blue + "Mega Tiny Proxy".yellow + "!".blue + "\
             \nWaiting to make your dreams come true...".green + "♡".magenta);