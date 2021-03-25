/**
 * function* helloWorldGenerator() {
 *  yield 'hello';
    yield 'world';
    return 'ending';
  }
 */


  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch(error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
        args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

(function() {
  var ContinueSentinel = {};

  var mark = function(genFun) {
    var generator = Object.create({
      next: function(arg) {
        return this._invoke("next", arg);
      }
    });
    genFun.prototype = generator;
    return genFun;
  };

  function wrap(innerFn, outerFn, self) {
    var generator = Object.create(outerFn.prototype);

    var context = {
      done: false,
      method: "next",
      next: 0,
      prev: 0,
      abrupt: function(type, arg) {
        var record = {};
        record.type = type;
        record.arg = arg;

        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        }

        return ContinueSentinel;
      },
      stop: function() {
        this.done = true;
        return this.rval;
      }
    };

    generator._invoke = makeInvokeMethod(innerFn, context);

    return generator;
  }

  function makeInvokeMethod(innerFn, context) {
    var state = "start";

    return function invoke(method, arg) {
      if (state === "completed") {
        return { value: undefined, done: true };
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        state = "executing";

        var record = {
          type: "normal",
          arg: innerFn.call(self, context)
        };

        if (record.type === "normal") {
          state = context.done ? "completed" : "yield";

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        }
      }
    };
  }

  window.regeneratorRuntime = {};

  regeneratorRuntime.wrap = wrap;
  regeneratorRuntime.mark = mark;
})();

var _marked = regeneratorRuntime.mark(helloWorldGenerator);

function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return "hello";

          case 2:
            _context.next = 4;
            return "world";

          case 4:
            return _context.abrupt("return", "ending");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked,
    this
  );
}

var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
