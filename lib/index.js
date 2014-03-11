var http = require('http');
var qs = require('querystring');

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
  if(!opts.appId) {
    throw new Error('You must provide an appId!');
  }
  this.password = opts.password;
  this.appId = opts.appId;
}

App.prototype.isValidMO = function isValidMO(opt) {
  if(typeof opt != 'object') {
    throw new TypeError('Only Object can be validated!');
  }
  return ['smsId', 'from'].every(function(key) {
    return opt[key];
  });
};

App.prototype.MTUrl = function MTUrl(opts) {
  opts = opts || {};
  var query = {
    'app-id': this.appId,
    password: this.password,
    message: opts.message,
    to: opts.to,
    operator: opts.operator,
    'dlr-mask': App.MT.DLR[opts.dlr] || opts.dlr || App.MT.DLR.PHONE,
    tariff: opts.tariff,
    type: App.MT.TYPE[opts.type] || opts.type || App.MT.TYPE.SMS,
    'app-msg-id': opts.smsId
  };
  return this.url + qs.stringify(query);
};

App.MT = {
  TYPE: {
    SMS: 0,
    FLASH: 1,
  },
  DLR: {
    NONE: 0,
    SMSC: 24,
    PHONE: 27
  }
};

exports.App = App;
