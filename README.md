# Mega Tiny Proxy

Ever need to get around some cross-origin resrictions and don't really care about security, correctness, or fanciness? I've got just the repo for you!

Mega Tiny Proxy just stupidly forwards anything you send it to the specified url. This is great for making AJAX requests to stingy REST APIs that don't believe in CORS or JSONP.

## Installation
Installing Mega Tiny Proxy has never been easier! Clone this repo and afterwards fetch its dependencies with `npm install`.

## Configuration
Proxy routes can be setup like this:
```js
// Specify the local route you'd like to hit
app.use('/api/collections/:collId', function(req, res) {

  // Form the actual remote url that you'd like your request forwarded to
  var url = "http://your-really-cool-api.com/v1/collections/" + req.params.collId; 
  
  // Log your request to the console, if you like
  reportProxy(req, url);

  // Pipe it there, and pipe it back. WOW!
  req.pipe(request(url)).pipe(res);
});
```

## Usage
You're gonna love how simple it is to use. Start Mega Tiny Proxy with one simple command `node proxy.js`

## Deployment
If you're feeling really wild, you can send Mega Tiny Proxy to Heroku! It comes with a convenient Heroku-friendly Procfile, and because CORS is turned on by default, anybody anywhere can take advantage of your proxy rules. Now that's what I call convenience!

## Licence
Mega Tiny Proxy licensed under the The MIT License (MIT)
Copyright (c) 2014 Mason Stewart.