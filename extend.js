"use strict";

function _instanceof(left, right) { 
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
     return !!right[Symbol.hasInstance](left); 
  } else {
     return left instanceof right; 
  }
}

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { 
  for (var i = 0; i < props.length; i++) { 
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true; 
    if ("value" in descriptor) 
      descriptor.writable = true; 
    Object.defineProperty(target, descriptor.key, descriptor); 
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var A = /*#__PURE__*/function () {
  function A() {
    _classCallCheck(this, A);

    this.name = 'A';
  }

  _createClass(A, [{
    key: "test",
    value: function test() {
      console.log('test');
    }
  }]);

  return A;
}();


const A = function() {
  function A() {
    this.name = 1;
  }
  const methods =  [{
    key: "test",
    value: function test() {
      console.log('test');
    }
  }];
  methods.forEach(method => {
    method.enumerable = false;
    method.configurable = true;
    method.writable = true;
    Object.defineProperties(A.prototype, method.key, method);
  })

  
  statics =  [{
    key: "static",
    value: function _static() {}
  }, {
    key: "static2",
    value: function static2() {}
  }];
  statics.forEach(static => {
    method.enumerable = false;
    method.configurable = true;
    method.writable = true;
    Object.defineProperties(A, method.key, method);
  })
  return A;
}()



class A {
  constructor() {
    this.name = 'A';
  }
  
  get age() {
    return 15;
  }
  set age(value) {
    console.log('set fail');
  }

  test() {
    console.log('test');
  }

  static test2() {
    console.log('test static')
  }
}



// 模拟实现
const A = function () {
  function A() {
    this.name = 'A';
  }
  
  Object.defineProperties(A.prototype, 'age', {
    get: function() {
      return 15;
    },
    set: function() {
      console.log('set fail');
    },
    enumerable: false,
    configurable: true,
  })

  Object.defineProperties(A.prototype, 'test', {
    enumerable: false,
    configurable: true,
    value: function() {
      console.log('test');
    },
    writable: true,
  })

  Object.defineProperties(A, 'test2', {
    enumerable: false,
    configurable: true,
    value: function() {
      console.log('test static')
    },
    writable: true,
  })
}()