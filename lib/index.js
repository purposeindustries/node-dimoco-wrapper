function App(opts){
  opts = opts || {};
  this.url = 'http://services.dimoco.at/psms/send-sms?';
  if(!opts.password){
    throw new Error('You must provide a password!');
  }
  this.password = opts.password;
}

exports.App = App;