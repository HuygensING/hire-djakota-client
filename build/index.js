(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DjatokaClient = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],2:[function(_dereq_,module,exports){
var root = _dereq_('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":9}],3:[function(_dereq_,module,exports){
var Symbol = _dereq_('./_Symbol'),
    getRawTag = _dereq_('./_getRawTag'),
    objectToString = _dereq_('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return (symToStringTag && symToStringTag in value)
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":2,"./_getRawTag":6,"./_objectToString":7}],4:[function(_dereq_,module,exports){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],5:[function(_dereq_,module,exports){
var overArg = _dereq_('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":8}],6:[function(_dereq_,module,exports){
var Symbol = _dereq_('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":2}],7:[function(_dereq_,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],8:[function(_dereq_,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],9:[function(_dereq_,module,exports){
var freeGlobal = _dereq_('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":4}],10:[function(_dereq_,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],11:[function(_dereq_,module,exports){
var baseGetTag = _dereq_('./_baseGetTag'),
    getPrototype = _dereq_('./_getPrototype'),
    isObjectLike = _dereq_('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":3,"./_getPrototype":5,"./isObjectLike":10}],12:[function(_dereq_,module,exports){
'use strict';

var Stringify = _dereq_('./stringify');
var Parse = _dereq_('./parse');

module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":13,"./stringify":14}],13:[function(_dereq_,module,exports){
'use strict';

var Utils = _dereq_('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000,
    strictNullHandling: false,
    plainObjects: false,
    allowPrototypes: false,
    allowDots: false,
    decoder: Utils.decode
};

var parseValues = function parseValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObject(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
            if (!options.allowPrototypes) {
                continue;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj, options);
    }

    return Utils.compact(obj);
};

},{"./utils":15}],14:[function(_dereq_,module,exports){
'use strict';

var Utils = _dereq_('./utils');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var defaults = {
    delimiter: '&',
    strictNullHandling: false,
    skipNulls: false,
    encode: true,
    encoder: Utils.encode
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = obj.toISOString();
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || Utils.isBuffer(obj)) {
        if (encoder) {
            return [encoder(prefix) + '=' + encoder(obj)];
        }
        return [prefix + '=' + String(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};
    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var objKeys;
    var filter;

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        objKeys = filter = options.filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
    }

    return keys.join(delimiter);
};

},{"./utils":15}],15:[function(_dereq_,module,exports){
'use strict';

var hexTable = (function () {
    var array = new Array(256);
    for (var i = 0; i < 256; ++i) {
        array[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            target[source] = true;
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; ++j) {
        var key = keys[j];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

},{}],16:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = _dereq_('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":19}],17:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],18:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = _dereq_('./createStore');

var _isPlainObject = _dereq_('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = _dereq_('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
},{"./createStore":20,"./utils/warning":22,"lodash/isPlainObject":11}],19:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}
},{}],20:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = _dereq_('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = _dereq_('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":11,"symbol-observable":23}],21:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = _dereq_('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = _dereq_('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = _dereq_('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = _dereq_('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = _dereq_('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = _dereq_('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
},{"./applyMiddleware":16,"./bindActionCreators":17,"./combineReducers":18,"./compose":19,"./createStore":20,"./utils/warning":22}],22:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],23:[function(_dereq_,module,exports){
module.exports = _dereq_('./lib/index');

},{"./lib/index":24}],24:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = _dereq_('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
},{"./ponyfill":25}],25:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],26:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setRealViewPort = setRealViewPort;
exports.sendMouseWheel = sendMouseWheel;
exports.setFill = setFill;
exports.setFreeMovement = setFreeMovement;
exports.createNextApi = createNextApi;
function setRealViewPort(realViewPort) {
	return {
		type: "SET_REAL_VIEWPORT",
		realViewPort: realViewPort
	};
}

function sendMouseWheel(wheelState) {
	return {
		type: "SEND_MOUSEWHEEL",
		mousewheel: wheelState
	};
}

function setFill(mode) {
	return {
		type: "SET_FILL",
		mode: mode
	};
}

function setFreeMovement(mode) {
	return {
		type: "SET_FREE_MOVEMENT",
		mode: mode
	};
}

function createNextApi(config) {
	return {
		type: "CREATE_NEXT_API",
		config: config
	};
}

},{}],27:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = _dereq_('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IDX_WIDTH = 1;
var IDX_HEIGHT = 0;
var TILE_SIZE = 512;

// const downScale = function(val, times) { return times > 0 ? downScale(val / 2, --times) : val; };
// const upScale = function(val, times) { return times > 0 ? upScale(val * 2, --times) : val; };
var upScale = function upScale(val, times) {
	return Math.pow(2, times) * val;
};
var downScale = function downScale(val, times) {
	return Math.pow(2, -times) * val;
};

var Api = function () {
	function Api(service, config) {
		_classCallCheck(this, Api);

		this.service = service;
		this.config = config;
		this.params = {
			rft_id: this.config.identifier,
			url_ver: 'Z39.88-2004',
			svc_val_fmt: 'info:ofi/fmt:kev:mtx:jpeg2000',
			'svc.format': 'image/jpeg'
		};
		this.levels = parseInt(this.config.levels, 10);
		this.fullWidth = parseInt(this.config.width, 10);
		this.fullHeight = parseInt(this.config.height, 10);
		this.resolutions = [];
		this.initializeResolutions(this.levels - 1, this.fullWidth, this.fullHeight);
		this.tileMap = {};
	}

	_createClass(Api, [{
		key: 'initializeResolutions',
		value: function initializeResolutions() {
			var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.levels - 1;
			var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fullWidth;
			var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fullHeight;

			this.resolutions.unshift([h, w]);
			if (level > 0) {
				this.initializeResolutions(--level, parseInt(Math.floor(w / 2), 10), parseInt(Math.floor(h / 2), 10));
			}
		}
	}, {
		key: 'findLevel',
		value: function findLevel(dim, idx) {
			var i = void 0;
			for (i = 0; i < this.resolutions.length; i++) {
				if (this.resolutions[i][idx] > dim) {
					return i + 1;
				}
			}
			return i;
		}
	}, {
		key: 'makeTileUrl',
		value: function makeTileUrl(level, dims) {
			return this.service + '?' + _qs2.default.stringify(_extends({}, this.params, {
				'svc.region': dims.join(','),
				'svc.level': level,
				svc_id: 'info:lanl-repo/svc/getRegion'
			}));
		}
	}, {
		key: 'fetchTile',
		value: function fetchTile(tile) {
			var key = tile.realX + '-' + tile.realY + '-' + tile.level + '-' + tile.url;
			if (!this.tileMap[key]) {
				this.tileMap[key] = new Image();
				this.tileMap[key].src = tile.url;
			}
			return [this.tileMap[key], tile];
		}
	}, {
		key: 'getStart',
		value: function getStart(dim) {
			var n = 0;
			while (dim + n < -TILE_SIZE) {
				n += TILE_SIZE;
			}
			return n;
		}
	}, {
		key: 'makeTiles',
		value: function makeTiles(opts, level, scale) {
			var upscaleFactor = this.resolutions.length - level;
			var yStart = this.getStart(opts.position.y);
			var xStart = this.getStart(opts.position.x);
			var tiles = [];

			for (var y = yStart; (y - yStart) * scale - TILE_SIZE * 2 + opts.position.y < opts.viewport.h && upScale(y, upscaleFactor) < this.fullHeight; y += TILE_SIZE) {
				for (var x = xStart; (x - xStart) * scale - TILE_SIZE * 2 + opts.position.x < opts.viewport.w && upScale(x, upscaleFactor) < this.fullWidth; x += TILE_SIZE) {
					tiles.push(this.fetchTile({
						realX: x,
						realY: y,
						pos: { x: x, y: y },
						level: level,
						url: this.makeTileUrl(level, [upScale(y, upscaleFactor), upScale(x, upscaleFactor), TILE_SIZE, TILE_SIZE])
					}));
				}
			}

			return tiles;
		}
	}, {
		key: 'findLevelForScale',
		value: function findLevelForScale(s) {
			var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.levels;
			var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

			if (s > current / 2 || level === 1) return level;
			return this.findLevelForScale(s, --level, current / 2);
		}
	}, {
		key: 'determineZoomFactor',
		value: function determineZoomFactor(delta, scale, level) {
			var rev = delta > 0 ? -1 : 1;
			var rs = this.getRealScale(scale, level);
			var factor = void 0;

			if (rs >= 0.6) {
				factor = 0.04 * rev;
			} else if (rs >= 0.3) {
				factor = 0.02 * rev;
			} else if (rs >= 0.1) {
				factor = 0.01 * rev;
			} else if (rs >= 0.05) {
				factor = 0.005 * rev;
			} else {
				factor = 0.0025 * rev;
			}

			return factor;
		}
	}, {
		key: 'getZoomData',
		value: function getZoomData(delta, scale, level) {
			var factor = this.determineZoomFactor(delta, scale, level);
			var viewportScale = this.getRealScale(scale, level) + factor;
			if (viewportScale < 0.01) {
				viewportScale = 0.01;
			}
			var newLevel = this.findLevelForScale(viewportScale);
			var newScale = upScale(viewportScale, this.resolutions.length - newLevel);

			return [newScale, newLevel, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale)];
		}
	}, {
		key: 'getRealScale',
		value: function getRealScale(scale, level) {
			return downScale(scale, this.resolutions.length - level);
		}
	}, {
		key: 'getRealImagePos',
		value: function getRealImagePos(position, scale, level) {
			return {
				x: Math.floor(position.x * scale),
				y: Math.floor(position.y * scale),
				w: Math.ceil(this.fullWidth * this.getRealScale(scale, level)),
				h: Math.ceil(this.fullHeight * this.getRealScale(scale, level))
			};
		}
	}, {
		key: 'prepareMakeTiles',
		value: function prepareMakeTiles(opts, scale, level) {
			var upscaleFactor = this.resolutions.length - level;
			var viewportScale = downScale(scale, upscaleFactor);

			if (opts.onScale) {
				opts.onScale(scale, level, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale));
			}

			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: 'widthFill',
		value: function widthFill(opts) {
			var level = this.findLevel(opts.viewport.w, IDX_WIDTH);
			var scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'widthFillTop',
		value: function widthFillTop(opts) {
			var level = this.findLevel(opts.viewport.w, IDX_WIDTH);
			var scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'heightFill',
		value: function heightFill(opts) {
			var level = this.findLevel(opts.viewport.h, IDX_HEIGHT);
			var scale = opts.viewport.h / this.resolutions[level - 1][IDX_HEIGHT];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'autoFill',
		value: function autoFill(opts) {
			if (this.fullHeight > this.fullWidth) {
				return this.heightFill(opts);
			} else {
				return this.widthFill(opts);
			}
		}
	}, {
		key: 'fullZoom',
		value: function fullZoom(opts) {
			var level = this.levels;
			var scale = 1;

			if (opts.onScale) {
				opts.onScale(scale, level, this.fullWidth, this.fullHeight);
			}
			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: 'loadImage',
		value: function loadImage(opts) {
			if (opts.scaleMode) {
				return this[opts.scaleMode](opts);
			} else {
				return this.makeTiles(opts, opts.level, opts.scale);
			}
		}
	}]);

	return Api;
}();

exports.default = Api;

},{"qs":12}],28:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

var _actions = _dereq_("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DjatokaClient = function (_React$Component) {
	_inherits(DjatokaClient, _React$Component);

	function DjatokaClient(props) {
		_classCallCheck(this, DjatokaClient);

		var _this = _possibleConstructorReturn(this, (DjatokaClient.__proto__ || Object.getPrototypeOf(DjatokaClient)).call(this, props));

		_this.state = _store2.default.getState();
		return _this;
	}

	_createClass(DjatokaClient, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.unsubscribe = _store2.default.subscribe(function () {
				return _this2.setState(_store2.default.getState());
			});

			_store2.default.dispatch({
				type: "INITIAL",
				config: this.props.config,
				service: this.props.service,
				scaleMode: this.props.scaleMode
			});
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.config.identifier !== this.state.api.config.identifier) {
				_store2.default.dispatch((0, _actions.createNextApi)(nextProps.config));
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unsubscribe();
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var children = _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, _this3.state);
			});

			return _react2.default.createElement(
				"div",
				{ className: "facsimile" },
				children
			);
		}
	}]);

	return DjatokaClient;
}(_react2.default.Component);

DjatokaClient.propTypes = {
	children: _react2.default.PropTypes.array,
	config: _react2.default.PropTypes.object,
	scaleMode: _react2.default.PropTypes.string,
	service: _react2.default.PropTypes.string
};

DjatokaClient.defaultProps = {};

exports.default = DjatokaClient;

},{"../actions":26,"../store":33,"react":"react"}],29:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

var _interactionCanvas = _dereq_('./interaction-canvas');

var _interactionCanvas2 = _interopRequireDefault(_interactionCanvas);

var _actions = _dereq_('../../actions');

var _store = _dereq_('../../store');

var _store2 = _interopRequireDefault(_store);

var _requestAnimationFrame = _dereq_('../../util/request-animation-frame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_SCALE_MODES = ['heightFill', 'widthFill', 'widthFillTop', 'autoFill', 'fullZoom'];

var Viewer = function (_React$Component) {
	_inherits(Viewer, _React$Component);

	function Viewer(props) {
		_classCallCheck(this, Viewer);

		var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

		_this.loadImage = function () {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { scaleMode: _this.props.scaleMode };

			_this.notifyRealImagePos();
			_this.frameBuffer = _this.props.api.loadImage(_extends({
				viewport: {
					w: _this.state.viewportWidth,
					h: _this.state.viewportHeight
				},
				position: _this.imagePos,
				onScale: function onScale(scale, level, width, height) {
					_this.setDimensions(width, height);
					_this.setScale(scale, level);
					_this.centerImage(width, height);
					_this.notifyRealImagePos();
				}
			}, opts));
		};

		_this.setScale = function (scale, level) {
			_this.scale = scale;
			_this.level = level;
		};

		_this.setDimensions = function (width, height) {
			_this.width = width;
			_this.height = height;
		};

		_this.centerImage = function (w, h) {
			var x = w > _this.state.viewportWidth ? -((w - _this.state.viewportWidth) / 2) / _this.scale : (_this.state.viewportWidth - w) / 2 / _this.scale;

			var y = h > _this.state.viewportHeight ? -((h - _this.state.viewportHeight) / 2) / _this.scale : (_this.state.viewportHeight - h) / 2 / _this.scale;

			if (_this.props.scaleMode === 'widthFillTop') y = 0;

			_this.setImagePosition(x, y);
		};

		_this.setImagePosition = function (x, y) {
			_this.imagePos = _this.correctBounds(x, y);
		};

		_this.zoom = function (scale, level, width, height, focalPoint) {
			if (_this.width == null || _this.height == null) {
				_this.centerImage(width, height);
			} else {
				focalPoint = focalPoint || {
					x: _this.state.viewportWidth / 2,
					y: _this.state.viewportHeight / 2
				};

				// Calc Δx and Δy with previous scale, width and height
				var dX = (focalPoint.x - _this.imagePos.x * _this.scale) / _this.width;
				var dY = (focalPoint.y - _this.imagePos.y * _this.scale) / _this.height;

				var x = (focalPoint.x - dX * width) / scale;
				var y = (focalPoint.y - dY * height) / scale;

				_this.setImagePosition(x, y);
			}

			_this.loadImage({ scale: scale, level: level });

			// Set the next scale, level, width and height
			_this.setScale(scale, level);
			_this.setDimensions(width, height);
		};

		_this.handleZoom = function (delta, focalPoint) {
			var _this$props$api$getZo = _this.props.api.getZoomData(delta, _this.scale, _this.level),
			    _this$props$api$getZo2 = _slicedToArray(_this$props$api$getZo, 4),
			    scale = _this$props$api$getZo2[0],
			    level = _this$props$api$getZo2[1],
			    width = _this$props$api$getZo2[2],
			    height = _this$props$api$getZo2[3];

			_this.zoom(scale, level, width, height, focalPoint);
		};

		_this.state = {
			viewportWidth: null,
			vierwPortHeight: null
		};

		_this.imagePos = { x: 0, y: 0 };
		_this.imageCtx = null;
		_this.scale = 1.0;
		_this.level = null;
		_this.width = null;
		_this.height = null;
		_this.abortAnimationFrame = false;
		_this.animationFrameListener = _this.onAnimationFrame.bind(_this);
		_this.frameBuffer = [];
		_this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0
		};
		_this.requestAnimationFrame = _requestAnimationFrame.requestAnimationFrame;
		_this.cancelAnimationFrame = _requestAnimationFrame.cancelAnimationFrame;
		return _this;
	}

	_createClass(Viewer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.abortAnimationFrame = false;
			this.reset();
			this.imageCtx = this.refs.viewer.children[0].getContext('2d');
			this.requestAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.api.config.identifier !== this.props.api.config.identifier) {
				this.reset();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.abortAnimationFrame = true;
			this.cancelAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: 'onAnimationFrame',
		value: function onAnimationFrame() {
			if (this.frameBuffer.length) {
				this.imageCtx.clearRect(0, 0, this.state.viewportWidth, this.state.viewportHeight);
				for (var i = 0; i < this.frameBuffer.length; i++) {
					var tileIm = this.frameBuffer[i][0];
					var tile = this.frameBuffer[i][1];

					this.imageCtx.drawImage(tileIm, parseInt(Math.floor((tile.pos.x + this.imagePos.x) * this.scale), 10), parseInt(Math.floor((tile.pos.y + this.imagePos.y) * this.scale), 10), parseInt(Math.ceil(tileIm.width * this.scale), 10), parseInt(Math.ceil(tileIm.height * this.scale), 10));
				}
				if (this.frameBuffer.filter(function (x) {
					return x[0].complete && x[0].height > 0 && x[0].width > 0;
				}).length === this.frameBuffer.length) {
					this.frameBuffer = [];
				}
			}

			if (!this.abortAnimationFrame) {
				this.requestAnimationFrame(this.animationFrameListener);
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.imagePos.x = 0;
			this.imagePos.y = 0;
			this.width = null;
			this.height = null;
			var node = this.refs.viewer;
			this.setState({
				viewportWidth: node.clientWidth,
				viewportHeight: node.clientHeight
			}, this.loadImage.bind(this));
		}
	}, {
		key: 'notifyRealImagePos',
		value: function notifyRealImagePos() {
			var zoom = this.props.api.getRealScale(this.scale, this.level);
			var dims = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);

			_store2.default.dispatch((0, _actions.setRealViewPort)({
				x: -dims.x / dims.w,
				y: -dims.y / dims.h,
				w: this.state.viewportWidth / dims.w,
				h: this.state.viewportHeight / dims.h,
				zoom: zoom,
				reposition: false,
				applyZoom: false
			}));
		}
	}, {
		key: 'correctBounds',
		value: function correctBounds(x, y) {
			if (this.props.freeMovement) return { x: x, y: y };

			var correctedX = x;
			var correctedY = y;

			if (this.width <= this.state.viewportWidth) {
				if (x < 0) {
					correctedX = 0;
				}
				if (x * this.scale + this.width > this.state.viewportWidth) {
					correctedX = (this.state.viewportWidth - this.width) / this.scale;
				}
			} else if (this.width > this.state.viewportWidth) {
				if (x > 0) {
					correctedX = 0;
				}
				if (x * this.scale + this.width < this.state.viewportWidth) {
					correctedX = (this.state.viewportWidth - this.width) / this.scale;
				}
			}

			if (this.height <= this.state.viewportHeight) {
				if (y < 0) {
					correctedY = 0;
				}
				if (y * this.scale + this.height > this.state.viewportHeight) {
					correctedY = (this.state.viewportHeight - this.height) / this.scale;
				}
			} else if (this.height > this.state.viewportHeight) {
				if (y > 0) {
					correctedY = 0;
				}
				if (y * this.scale + this.height < this.state.viewportHeight) {
					correctedY = (this.state.viewportHeight - this.height) / this.scale;
				}
			}

			return { x: correctedX, y: correctedY };
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: 'hire-djatoka-client',
					ref: 'viewer'
				},
				_react2.default.createElement('canvas', {
					className: 'image',
					height: this.state.viewportHeight,
					width: this.state.viewportWidth
				}),
				_react2.default.createElement(_interactionCanvas2.default, _extends({}, this.props, this.state, {
					height: this.height,
					imagePos: this.imagePos,
					level: this.level,
					onLoadImage: this.loadImage,
					onSetImagePosition: this.setImagePosition,
					onZoom: this.handleZoom,
					scale: this.scale
				}))
			);
		}
	}]);

	return Viewer;
}(_react2.default.Component);

Viewer.propTypes = {
	api: _react2.default.PropTypes.object,
	config: _react2.default.PropTypes.object,
	scaleMode: function scaleMode(props, propName) {
		if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
			var msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
			props[propName] = 'heightFill';
			return new Error(msg);
		}
	},
	service: _react2.default.PropTypes.string
};

Viewer.defaultProps = {
	scaleMode: 'autoFill'
};

exports.default = Viewer;

},{"../../actions":26,"../../store":33,"../../util/request-animation-frame":34,"./interaction-canvas":30,"react":"react"}],30:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;
var TOUCH_END = 0;
var TOUCH_START = 1;
var TOUCH_PINCH = 2;

var InteractionCanvas = function (_Component) {
	_inherits(InteractionCanvas, _Component);

	function InteractionCanvas(props) {
		_classCallCheck(this, InteractionCanvas);

		var _this = _possibleConstructorReturn(this, (InteractionCanvas.__proto__ || Object.getPrototypeOf(InteractionCanvas)).call(this, props));

		_this.onMouseDown = function (ev) {
			_this.mousePos.x = ev.clientX;
			_this.mousePos.y = ev.clientY;
			_this.movement = { x: 0, y: 0 };
			_this.mouseState = MOUSE_DOWN;
		};

		_this.onMouseMove = function (ev) {
			switch (_this.mouseState) {
				case MOUSE_DOWN:
					_this.movement.x = _this.mousePos.x - ev.clientX;
					_this.movement.y = _this.mousePos.y - ev.clientY;

					var imgPosX = _this.props.imagePos.x - _this.movement.x / _this.props.scale;
					var imgPosY = _this.props.imagePos.y - _this.movement.y / _this.props.scale;
					_this.props.onSetImagePosition(imgPosX, imgPosY);

					_this.mousePos.x = ev.clientX;
					_this.mousePos.y = ev.clientY;
					_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
					ev.preventDefault();
					break;
				case MOUSE_UP:
					{
						var rect = _this.refs.interactionCanvas.getBoundingClientRect();
						_this.focalPoint = {
							x: ev.clientX - rect.left,
							y: ev.clientY - rect.top
						};
						break;
					}
				default:
			}
		};

		_this.onMouseUp = function () {
			if (_this.mouseState === MOUSE_DOWN) {
				_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
			}
			_this.mouseState = MOUSE_UP;
		};

		_this.onTouchStart = function (ev) {
			if (ev.touches.length > 1) {
				_this.touchState = TOUCH_PINCH;
			} else {
				_this.touchPos.x = ev.touches[0].pageX;
				_this.touchPos.y = ev.touches[0].pageY;
				_this.movement = { x: 0, y: 0 };
				_this.touchState = TOUCH_START;
			}
		};

		_this.onTouchMove = function (ev) {
			for (var i = 0; i < ev.touches.length; i++) {
				var cur = {
					x: ev.touches[i].pageX,
					y: ev.touches[i].pageY
				};
				_this.touchmap.positions[i] = cur;
			}
			if (ev.touches.length === 2 && _this.touchState === TOUCH_PINCH) {
				var oldD = _this.touchmap.pinchDistance;
				_this.touchmap.pinchDistance = parseInt(Math.sqrt((_this.touchmap.positions[0].x - _this.touchmap.positions[1].x) * (_this.touchmap.positions[0].x - _this.touchmap.positions[1].x) + (_this.touchmap.positions[0].y - _this.touchmap.positions[1].y) * (_this.touchmap.positions[0].y - _this.touchmap.positions[1].y)), 10);
				_this.touchmap.pinchDelta = oldD - _this.touchmap.pinchDistance;
				if (_this.touchmap.pinchDelta < 60 && _this.touchmap.pinchDelta > -60) {
					var delta = _this.touchmap.pinchDelta;
					_this.props.onZoom(delta, _this.focalPoint);
					// this.props.api.zoomBy(delta, this.props.scale, this.props.level, this.zoom.bind(this));
				}
			} else if (_this.touchState === TOUCH_START) {
				_this.movement.x = _this.touchPos.x - ev.touches[0].pageX;
				_this.movement.y = _this.touchPos.y - ev.touches[0].pageY;

				var imagePosX = _this.props.imagePos.x - _this.movement.x / _this.props.scale;
				var imagePosY = _this.props.imagePos.y - _this.movement.y / _this.props.scale;
				_this.props.onSetImagePosition(imagePosX, imagePosY);

				_this.touchPos.x = ev.touches[0].pageX;
				_this.touchPos.y = ev.touches[0].pageY;

				_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
			}
			ev.preventDefault();
			ev.stopPropagation();
		};

		_this.onTouchEnd = function () {
			_this.touchState = TOUCH_END;
		};

		_this.onWheel = function (ev) {
			var delta = ev.nativeEvent.deltaY;
			_this.props.onZoom(delta, _this.focalPoint);

			return ev.preventDefault();
		};

		_this.movement = { x: 0, y: 0 };
		_this.touchPos = { x: 0, y: 0 };
		_this.mousePos = { x: 0, y: 0 };
		_this.mouseState = MOUSE_UP;
		_this.focalPoint = null;
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0
		};
		return _this;
	}

	_createClass(InteractionCanvas, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('mousemove', this.mousemoveListener);
			window.addEventListener('mouseup', this.mouseupListener);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('mousemove', this.mousemoveListener);
			window.removeEventListener('mouseup', this.mouseupListener);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('canvas', {
				className: 'interaction',
				height: this.props.viewportHeight,
				onMouseDown: this.onMouseDown,
				onTouchEnd: this.onTouchEnd,
				onTouchMove: this.onTouchMove,
				onTouchStart: this.onTouchStart,
				onWheel: this.onWheel,
				ref: 'interactionCanvas',
				width: this.props.viewportWidth
			});
		}
	}]);

	return InteractionCanvas;
}(_react.Component);

InteractionCanvas.propTypes = {
	api: _react.PropTypes.object,
	imagePos: _react.PropTypes.object,
	onLoadImage: _react.PropTypes.func,
	onSetImagePosition: _react.PropTypes.func,
	onZoom: _react.PropTypes.func,
	level: _react.PropTypes.number,
	scale: _react.PropTypes.number,
	viewportHeight: _react.PropTypes.number,
	viewportWidth: _react.PropTypes.number
};

InteractionCanvas.defaultProps = {};

exports.default = InteractionCanvas;

},{"react":"react"}],31:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = exports.DjatokaClient = undefined;

var _insertCss = _dereq_('insert-css');

var _insertCss2 = _interopRequireDefault(_insertCss);

var _djatokaClient = _dereq_('./components/djatoka-client');

var _djatokaClient2 = _interopRequireDefault(_djatokaClient);

var _viewer = _dereq_('./components/viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use require() because brfs cannot handle import


var css = Buffer("LmhpcmUtZGphdG9rYS1jbGllbnQsCi5oaXJlLWRqYXRva2EtbWluaW1hcCwKI2hpcmUtZGphdG9rYS1jbGllbnQtYXBwIHsKCXdpZHRoOiAxMDAlOwoJaGVpZ2h0OiAxMDAlOwp9CgouaGlyZS1kamF0b2thLWNsaWVudCA+IC5pbnRlcmFjdGlvbiwKLmhpcmUtZGphdG9rYS1jbGllbnQgPiAuaW1hZ2UsCi5oaXJlLWRqYXRva2EtbWluaW1hcCA+IC5pbnRlcmFjdGlvbiwKLmhpcmUtZGphdG9rYS1taW5pbWFwID4gLmltYWdlIHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKfQoKLmhpcmUtZGphdG9rYS1jbGllbnQgPiAuaW50ZXJhY3Rpb24sCi5oaXJlLWRqYXRva2EtbWluaW1hcCA+IC5pbnRlcmFjdGlvbiB7Cgl6LWluZGV4OiAxOwp9CgouaGlyZS16b29tLWJhciAqIHsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOwogICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAKICAgIHVzZXItc2VsZWN0OiBub25lOyAKICAgIC13ZWJraXQtdXNlci1kcmFnOiBub25lOwogICAgdXNlci1kcmFnOiBub25lOwp9Ci5oaXJlLXpvb20tYmFyIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCW1pbi13aWR0aDogNDAwcHg7CgltaW4taGVpZ2h0OiA0NHB4Owp9CgouaGlyZS16b29tLWJhciBsYWJlbCB7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Cgl3aWR0aDogMTUlOwoJaGVpZ2h0OiAxMDAlOwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQouaGlyZS16b29tLWJhciBsYWJlbCA+ICogewoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJaGVpZ2h0OiAxMDAlOwoJbGluZS1oZWlnaHQ6IDM0cHgKfQouaGlyZS16b29tLWJhciBzdmcgewoJY3Vyc29yOiBwb2ludGVyOwoJZmlsbDogI0JEQTQ3RTsKCXN0cm9rZTogI0YxRUJFNjsKCXdpZHRoOiA4NSU7Cn0KCi5oaXJlLXpvb20tYmFyIHN2ZyBwYXRoIHsKCXN0cm9rZS13aWR0aDogNnB4Owp9CgouaGlyZS16b29tLWJhciBzdmcgY2lyY2xlIHsKCXN0cm9rZS13aWR0aDogMDsKfQoKLmhpcmUtZmlsbC1idXR0b24sCi5oaXJlLWZyZWUtbW92ZW1lbnQtYnV0dG9uIHsKCW1hcmdpbjogMDsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDA7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWZvbnQtZmFtaWx5OiBpbmhlcml0OwoJY3Vyc29yOiBwb2ludGVyOwoJb3V0bGluZTogMDsKCXdpZHRoOiA1MHB4OwoJaGVpZ2h0OiAyNHB4OwoJcGFkZGluZzogMCA2cHg7CgliYWNrZ3JvdW5kLWNvbG9yOiAjQkRBNDdFOwoJbWFyZ2luLXJpZ2h0OiA2cHg7Cglib3JkZXItcmFkaXVzOiAzcHg7Cgljb2xvcjogI0YxRUJFNjsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cgp9CgoKLmhpcmUtZmlsbC1idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsCi5oaXJlLWZyZWUtbW92ZW1lbnQtYnV0dG9uOjotbW96LWZvY3VzLWlubmVyIHsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDA7Cn0KCi5oaXJlLWZpbGwtYnV0dG9uIHN2ZywKLmhpcmUtZnJlZS1tb3ZlbWVudC1idXR0b24gc3ZnIHsKCXN0cm9rZTogI0YxRUJFNjsKCXN0cm9rZS13aWR0aDogMXB4OwoJZmlsbDogI0YxRUJFNjsKCglzdHJva2Utb3BhY2l0eTogMTsKCWhlaWdodDogMTAwJQp9CgouaGlyZS1mcmVlLW1vdmVtZW50LWJ1dHRvbi5hY3RpdmUgc3ZnIHsKCWZpbGw6ICNhZmE7Cn0=","base64");
(0, _insertCss2.default)(css, { prepend: true });

exports.DjatokaClient = _djatokaClient2.default;
exports.Viewer = _viewer2.default;
// export Minimap from './components/minimap';
// export Zoom from './components/zoom';
// export FillButton from './components/fill-button';
// export FreeMovementButton from './components/free-movement-button';

},{"./components/djatoka-client":28,"./components/viewer":29,"insert-css":1}],32:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var nextState = state;

	switch (action.type) {
		case 'INITIAL':
			nextState = _extends({}, nextState, {
				api: new _api2.default(action.service, action.config),
				scaleMode: action.scaleMode
			});
			break;

		case 'CREATE_NEXT_API':
			nextState = _extends({}, nextState, {
				api: new _api2.default(nextState.api.service, action.config)
			});
			break;

		case 'SET_REAL_VIEWPORT':
			nextState = _extends({}, nextState, {
				realViewPort: _extends({}, nextState.realViewPort, action.realViewPort)
			});
			break;

		case 'SEND_MOUSEWHEEL':
			nextState = _extends({}, nextState, {
				mousewheel: action.mousewheel
			});
			break;

		case 'SET_FILL':
			nextState = _extends({}, nextState, {
				fillMode: action.mode
			});
			break;

		case 'SET_FREE_MOVEMENT':
			nextState = _extends({}, nextState, {
				freeMovement: action.mode
			});
			break;

		default:
	}

	return nextState;
};

var _api = _dereq_('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	api: {
		config: {}
	},
	fillMode: null,
	freeMovement: false,
	mousewheel: null,
	realViewPort: {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		zoom: 0,
		reposition: false
	}
};

},{"../api":27}],33:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = _dereq_("redux");

var _reducers = _dereq_("../reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);

exports.default = store;

},{"../reducers":32,"redux":21}],34:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
The MIT License (MIT)

Copyright (c) 2015 Eryk Napierała

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
https://github.com/erykpiast/request-animation-frame-shim/
*/

var requestAnimationFrame = exports.requestAnimationFrame = 'function' === typeof global.requestAnimationFrame ? function (cb) {
    return global.requestAnimationFrame(cb);
} : 'function' === typeof global.webkitRequestAnimationFrame ? function (cb) {
    return global.webkitRequestAnimationFrame(cb);
} : 'function' === typeof global.mozRequestAnimationFrame ? function (cb) {
    return global.mozRequestAnimationFrame(cb);
} : function (cb) {
    return window.setTimeout(cb, 1000 / 60);
};

var cancelAnimationFrame = exports.cancelAnimationFrame = 'function' === typeof global.cancelAnimationFrame ? function (cb) {
    return global.cancelAnimationFrame(cb);
} : 'function' === typeof global.webkitCancelAnimationFrame ? function (cb) {
    return global.webkitCancelAnimationFrame(cb);
} : 'function' === typeof global.webkitCancelRequestAnimationFrame ? function (cb) {
    return global.webkitCancelRequestAnimationFrame(cb);
} : 'function' === typeof global.mozCancelAnimationFrame ? function (cb) {
    return global.mozCancelAnimationFrame(cb);
} : function () {
    return;
};

},{}]},{},[31])(31)
});