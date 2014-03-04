var lib = require('../');

describe('App', function(){
  describe('#constructor', function() {
    it('should set default ulr', function(){
      var d = new lib.App({
        password: 'foobar'
      });
      d.url.should.equal('http://services.dimoco.at/psms/send-sms?');
    });
    it('should accept password', function(){
      var d = new lib.App({
        password: 'foobar'
      });
      d.password.should.equal('foobar');
    });
    it('should require password', function(){
      (function(){
        new lib.App();
      }).should.throw();
    });
  });
});