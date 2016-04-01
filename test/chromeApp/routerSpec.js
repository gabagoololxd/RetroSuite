var expect = chai.expect;
var should = chai.should();

describe('router.js', function () {

  var req;
  var res;

  it('router should exist', function () {
    router.should.exist;
  });

  it('router should be a function', function () {
    router.should.be.a('function');
  });

});
