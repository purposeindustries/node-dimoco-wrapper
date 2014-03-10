var lib = require('../');
var request = require('request');

describe('App', function() {
  describe('#constructor', function() {
    var d;
    beforeEach(function() {
      d = new lib.App({
        password: 'foobar'
      });
    });
    it('should set default ulr', function() {
      d.url.should.equal('http://services.dimoco.at/psms/send-sms?');
    });
    it('should accept password', function() {
      d.password.should.equal('foobar');
    });
    it('should require password', function() {
      (function(){
        new lib.App();
      }).should.throw();
    });
    it('should accept url override', function() {
      d = new lib.App({
        password: 'foobar',
        url: 'baz'
      });
      d.url.should.equal('baz');
    });
    it('should use `request` by default', function() {
      d.request.should.equal(request);
    });
    it('should accept `request` override', function() {
      d = new lib.App({
        password: 'foobar',
        request: 'foo'
      });
      d.request.should.equal('foo');
    });
  });
  describe('#isValidMO', function() {
    var d;
    beforeEach(function() {
      d = new lib.App({
        password: 'foobar'
      });
    });
    it('should return bool', function() {
      (typeof d.isValidMO()).should.equal('boolean')
    });
  });
});
