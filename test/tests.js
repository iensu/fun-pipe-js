'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

var funPipe = require('../fun-pipe.js');

describe('fun-pipe', function () {

  function f(s) {
    return s.toUpperCase();
  };
  function g(s) {
    return s.replace('A', 'x');
  }

  it('should apply its functions in order', function () {
    funPipe(f, g)('hejsan').should.equal(g(f('hejsan')));
    funPipe(f, g)('hejsan').should.not.equal(f(g('hejsan')));
  });

  it('should return a function if only provided functions', () => {
    funPipe(f, g).should.be.a('function');
  });

  it('should execute the pipe line if the first argument is NOT a function', () => {
    funPipe('hejsan', f, g).should.equal(g(f('hejsan')));
  });

  it('should work with promises as its input data', () => {
    const input = 'hejsan';
    return funPipe(Promise.resolve(input), f, g).should.eventually.equal(g(f(input)));
  });

  it('should work with functions which return promises', function () {
    const gPromise = function (s) {
      return Promise.resolve(s.replace('A', 'x'));
    };

    return funPipe('hejsan', f, gPromise).should.eventually.equal('HEJSxN');
  });

  it('should propogate promise failures', () => {
    const input = 'hejsan';
    return funPipe(Promise.reject(new Error('some error')), f, g)
      .catch(function (error) {
        error.message.should.equal('some error');
      });
  });
});
