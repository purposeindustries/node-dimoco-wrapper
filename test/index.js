var lib = require('../');

describe('App', function(){
  describe('#constructor', function() {
    it('should set default ulr', function(){
      var d = new lib.App();
      d.url.should.equal('http://services.dimoco.at/psms/send-sms?');
    });
  });
});
