var http = require('http');

var request = function(url, cb) {
  http.get(url, function(res) {
    var chunks = [];
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });
    res.once('end', function() {
      cb(null, Buffer.concat(chunks).toString());
    });
  }).once('error', cb);
}

function App(opts){
  opts = opts || {};
  this.url = opts.url || 'http://services.dimoco.at/psms/send-sms?';
  this.request = opts.request || request;
  if(!opts.password){
    throw new Error('You must provide a password!');
  }
  this.password = opts.password;
  this.appId = opts.appId;
}

App.prototype.isValidMO = function(opt) {
  if(typeof opt != 'object') {
    throw new TypeError('Only Object can be validated!');
  }
  return ['app-id', 'sms-id', 'from'].every(function(key) {
    return opt[key];
  });
}

exports.App = App;
