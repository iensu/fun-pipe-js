(function () {
  'use strict';

  function funPipe() {
    var args = [].slice.call(arguments);
    if (typeof args[0] !== 'function') {
      return createPipe(args.slice(1))(args[0]);
    }
    return createPipe(args);
  }

  function applyFunction (x, fn) {
    if (isPromise(x)) {
      return x.then(function (result) {
        return fn(result);
      });
    }
    return fn(x);
  }

  function createPipe(fns) {
    return function (x) {
      return fns.reduce(applyFunction, x);
    };
  }

  function isPromise(x) {
    return x && typeof x.then === 'function';
  }

  if (module && module.exports) {
    module.exports = funPipe;
  } else {
    window.FunPipe = funPipe;
  }
})();
