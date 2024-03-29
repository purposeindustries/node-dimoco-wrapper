var lib = require('../');

describe('App', function() {
  var d, conf = {
    password: 'foo', appId: 'bar'
  };
  describe('#constructor', function() {
    beforeEach(function() {
      d = new lib.App(conf);
    });
    it('should set default ulr', function() {
      d.url.should.equal('http://services.dimoco.at/psms/send-sms?');
    });
    it('should accept password', function() {
      d.password.should.equal('foo');
    });
    it('should require password', function() {
      (function(){
        new lib.App();
      }).should.throw();
    });
    it('should accept app-id', function() {
      d.appId.should.equal('bar')
    });
    it('should require app-id', function() {
      (function(){
        new lib.App({
          password: 'foo',
        });
      }).should.throw();
    });
    it('should accept url override', function() {
      d = new lib.App({
        password: 'foobar',
        appId: 'bar',
        url: 'baz'
      });
      d.url.should.equal('baz');
    });
    it('should use default request', function() {
      d.request.should.be.an.instanceof(Function);
    });
    it('should accept `request` override', function() {
      d = new lib.App({
        password: 'foobar',
        appId: 'baz',
        request: 'foo'
      });
      d.request.should.equal('foo');
    });
  });
  describe('#isValidMO', function() {
    beforeEach(function() {
      d = new lib.App(conf);
    });
    it('should return bool', function() {
      (typeof d.isValidMO({})).should.equal('boolean')
    });
    it('should require object to validate', function() {
      (function() {
        d.isValidMO();
      }).should.throw();
    });
    it('should require `from`, `smsId` fields', function() {
      d.isValidMO({
        from: 'foo', smsId: 'bar'
      }).should.be.true;
      d.isValidMO({
        smsId: 'bar'
      }).should.be.false;
      d.isValidMO({
        from: 'foo'
      }).should.be.false;
    });
  });
  describe('#MTUrl', function() {
    beforeEach(function() {
      d = new lib.App(conf);
    });
    it('should return `string`', function() {
      d.MTUrl({}).should.be.a.String;
    });
  })
});
