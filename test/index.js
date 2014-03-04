var lib = require('../');
var request = require('request');

describe('App', function() {
  describe('#constructor', function() {
    it('should set default ulr', function() {
      var d = new lib.App({
        password: 'foobar'
      });
      d.url.should.equal('http://services.dimoco.at/psms/send-sms?');
    });
    it('should accept password', function() {
      var d = new lib.App({
        password: 'foobar'
      });
      d.password.should.equal('foobar');
    });
    it('should require password', function() {
      (function(){
        new lib.App();
      }).should.throw();
    });
    it('should accept url override', function() {
      var d = new lib.App({
        password: 'foobar',
        url: 'baz'
      });
      d.url.should.equal('baz');
    });
    it('should use `request` by default', function() {
      var d = new lib.App({
        password: 'foobar'
      });
      d.request.should.equal(request);
    });
    it('should accept `request` override', function() {
      var d = new lib.App({
        password: 'foobar',
        request: 'foo'
      });
      d.request.should.equal('foo');
    });
  });
});
