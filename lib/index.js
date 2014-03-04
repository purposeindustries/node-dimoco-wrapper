var request = require('request');

function App(opts){
  opts = opts || {};
  this.url = opts.url || 'http://services.dimoco.at/psms/send-sms?';
  this.request = opts.request || request;
  if(!opts.password){
    throw new Error('You must provide a password!');
  }
  this.password = opts.password;
}

exports.App = App;
