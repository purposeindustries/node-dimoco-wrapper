function App(opts){
  opts = opts || {};
  this.url = 'http://services.dimoco.at/psms/send-sms?';
  this.password = opts.password;
}

exports.App = App;
