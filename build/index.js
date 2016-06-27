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
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

module.exports = getPrototype;

},{}],3:[function(_dereq_,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],4:[function(_dereq_,module,exports){
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
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],5:[function(_dereq_,module,exports){
var getPrototype = _dereq_('./_getPrototype'),
    isHostObject = _dereq_('./_isHostObject'),
    isObjectLike = _dereq_('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object,
 *  else `false`.
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
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{"./_getPrototype":2,"./_isHostObject":3,"./isObjectLike":4}],6:[function(_dereq_,module,exports){
'use strict';

var Stringify = _dereq_('./stringify');
var Parse = _dereq_('./parse');

module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":7,"./stringify":8}],7:[function(_dereq_,module,exports){
'use strict';

var Utils = _dereq_('./utils');

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

        if (pos === -1) {
            obj[options.decoder(part)] = '';

            if (options.strictNullHandling) {
                obj[options.decoder(part)] = null;
            }
        } else {
            var key = options.decoder(part.slice(0, pos));
            var val = options.decoder(part.slice(pos + 1));

            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj[key] = [].concat(obj[key]).concat(val);
            } else {
                obj[key] = val;
            }
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
        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
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
        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
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

},{"./utils":9}],8:[function(_dereq_,module,exports){
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

},{"./utils":9}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = applyMiddleware;

var _compose = _dereq_('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    return function (reducer, initialState, enhancer) {
      var store = createStore(reducer, initialState, enhancer);
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
      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":13}],11:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = bindActionCreators;
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
},{}],12:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = combineReducers;

var _createStore = _dereq_('./createStore');

var _isPlainObject = _dereq_('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = _dereq_('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2["default"])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key);
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
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

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
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
      if (warningMessage) {
        (0, _warning2["default"])(warningMessage);
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
},{"./createStore":14,"./utils/warning":16,"lodash/isPlainObject":5}],13:[function(_dereq_,module,exports){
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
  } else {
    var _ret = function () {
      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);
      return {
        v: function v() {
          return rest.reduceRight(function (composed, f) {
            return f(composed);
          }, last.apply(undefined, arguments));
        }
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
}
},{}],14:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports["default"] = createStore;

var _isPlainObject = _dereq_('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = _dereq_('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
 * @param {any} [initialState] The initial state. You may optionally specify it
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
function createStore(reducer, initialState, enhancer) {
  var _ref2;

  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, initialState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
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
    if (!(0, _isPlainObject2["default"])(action)) {
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
    }, _ref[_symbolObservable2["default"]] = function () {
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
  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
}
},{"lodash/isPlainObject":5,"symbol-observable":17}],15:[function(_dereq_,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2["default"];
exports.combineReducers = _combineReducers2["default"];
exports.bindActionCreators = _bindActionCreators2["default"];
exports.applyMiddleware = _applyMiddleware2["default"];
exports.compose = _compose2["default"];
},{"./applyMiddleware":10,"./bindActionCreators":11,"./combineReducers":12,"./compose":13,"./createStore":14,"./utils/warning":16}],16:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = warning;
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
},{}],17:[function(_dereq_,module,exports){
/* global window */
'use strict';

module.exports = _dereq_('./ponyfill')(global || window || this);

},{"./ponyfill":18}],18:[function(_dereq_,module,exports){
'use strict';

module.exports = function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

},{}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = _dereq_("qs");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IDX_WIDTH = 1;
var IDX_HEIGHT = 0;
var TILE_SIZE = 512;

var downScale = function downScale(val, times) {
	return times > 0 ? downScale(val / 2, --times) : val;
};
var upScale = function upScale(val, times) {
	return times > 0 ? upScale(val * 2, --times) : val;
};

var Api = function () {
	function Api(service, config) {
		_classCallCheck(this, Api);

		this.service = service;
		this.config = config;
		this.params = {
			"rft_id": this.config.identifier,
			"url_ver": "Z39.88-2004",
			"svc_val_fmt": "info:ofi/fmt:kev:mtx:jpeg2000",
			"svc.format": "image/jpeg"
		};
		this.levels = parseInt(this.config.levels);
		this.fullWidth = parseInt(this.config.width);
		this.fullHeight = parseInt(this.config.height);
		this.resolutions = [];
		this.initializeResolutions(this.levels - 1, this.fullWidth, this.fullHeight);
		this.tileMap = {};
	}

	_createClass(Api, [{
		key: "initializeResolutions",
		value: function initializeResolutions() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this.levels - 1 : arguments[0];
			var w = arguments.length <= 1 || arguments[1] === undefined ? this.fullWidth : arguments[1];
			var h = arguments.length <= 2 || arguments[2] === undefined ? this.fullHeight : arguments[2];

			this.resolutions.unshift([h, w]);
			if (level > 0) {
				this.initializeResolutions(--level, parseInt(Math.floor(w / 2)), parseInt(Math.floor(h / 2)));
			}
		}
	}, {
		key: "findLevel",
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
		key: "makeTileUrl",
		value: function makeTileUrl(level, dims) {
			return this.service + "?" + _qs2.default.stringify(_extends({}, this.params, {
				"svc.region": dims.join(","),
				"svc.level": level,
				"svc_id": "info:lanl-repo/svc/getRegion"
			}));
		}
	}, {
		key: "fetchTile",
		value: function fetchTile(tile) {
			var key = tile.realX + "-" + tile.realY + "-" + tile.level + "-" + tile.url;
			if (!this.tileMap[key]) {
				this.tileMap[key] = new Image();
				this.tileMap[key].src = tile.url;
			}
			return [this.tileMap[key], tile];
		}
	}, {
		key: "getStart",
		value: function getStart(dim) {
			var n = 0;
			while (dim + n < -TILE_SIZE) {
				n += TILE_SIZE;
			}
			return n;
		}
	}, {
		key: "makeTiles",
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
						pos: {
							x: x,
							y: y
						},
						level: level,
						url: this.makeTileUrl(level, [upScale(y, upscaleFactor), upScale(x, upscaleFactor), TILE_SIZE, TILE_SIZE])
					}));
				}
			}
			return tiles;
		}
	}, {
		key: "findLevelForScale",
		value: function findLevelForScale(s) {
			var level = arguments.length <= 1 || arguments[1] === undefined ? this.levels : arguments[1];
			var current = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

			if (s > current / 2 || level === 1) {
				return level;
			}
			return this.findLevelForScale(s, --level, current / 2);
		}
	}, {
		key: "zoomTo",
		value: function zoomTo(zoom, onScale) {
			var newLevel = this.findLevelForScale(zoom);
			var newScale = upScale(zoom, this.resolutions.length - newLevel);
			onScale(newScale, newLevel, Math.ceil(this.fullWidth * zoom), Math.ceil(this.fullHeight * zoom));
		}
	}, {
		key: "zoomBy",
		value: function zoomBy(factor, scale, level, onScale) {
			var viewportScale = this.getRealScale(scale, level) + factor;
			if (viewportScale < 0.01) {
				viewportScale = 0.01;
			}
			var newLevel = this.findLevelForScale(viewportScale);
			var newScale = upScale(viewportScale, this.resolutions.length - newLevel);
			onScale(newScale, newLevel, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale));
		}
	}, {
		key: "getRealScale",
		value: function getRealScale(scale, level) {
			return downScale(scale, this.resolutions.length - level);
		}
	}, {
		key: "getRealImagePos",
		value: function getRealImagePos(position, scale, level) {
			return {
				x: Math.floor(position.x * scale),
				y: Math.floor(position.y * scale),
				w: Math.ceil(this.fullWidth * this.getRealScale(scale, level)),
				h: Math.ceil(this.fullHeight * this.getRealScale(scale, level))
			};
		}
	}, {
		key: "widthFill",
		value: function widthFill(opts) {
			var level = this.findLevel(opts.viewport.w, IDX_WIDTH);
			var scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
			var upscaleFactor = this.resolutions.length - level;
			var viewportScale = downScale(scale, upscaleFactor);

			if (opts.onScale) {
				opts.onScale(scale, level, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale));
			}
			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: "fullZoom",
		value: function fullZoom(opts) {
			var level = this.levels;
			var scale = 1;

			if (opts.onScale) {
				opts.onScale(scale, level, this.fullWidth, this.fullHeight);
			}
			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: "heightFill",
		value: function heightFill(opts) {
			var level = this.findLevel(opts.viewport.h, IDX_HEIGHT);
			var scale = opts.viewport.h / this.resolutions[level - 1][IDX_HEIGHT];
			var upscaleFactor = this.resolutions.length - level;
			var viewportScale = downScale(scale, upscaleFactor);

			if (opts.onScale) {
				opts.onScale(scale, level, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale));
			}

			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: "autoFill",
		value: function autoFill(opts) {
			if (this.fullHeight > this.fullWidth) {
				return this.heightFill(opts);
			} else {
				return this.widthFill(opts);
			}
		}
	}, {
		key: "loadImage",
		value: function loadImage(opts) {
			console.log(opts);
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

},{"qs":6}],21:[function(_dereq_,module,exports){
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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DjatokaClient).call(this, props));

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

},{"../actions":19,"../store":33,"react":"react"}],22:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _heightFill = _dereq_("./icons/height-fill");

var _heightFill2 = _interopRequireDefault(_heightFill);

var _widthFill = _dereq_("./icons/width-fill");

var _widthFill2 = _interopRequireDefault(_widthFill);

var _autoFill = _dereq_("./icons/auto-fill");

var _autoFill2 = _interopRequireDefault(_autoFill);

var _actions = _dereq_("../actions");

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_SCALE_MODES = ["heightFill", "widthFill", "autoFill", "fullZoom"];

var FillButton = function (_React$Component) {
    _inherits(FillButton, _React$Component);

    function FillButton() {
        _classCallCheck(this, FillButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FillButton).apply(this, arguments));
    }

    _createClass(FillButton, [{
        key: "renderIcon",
        value: function renderIcon() {
            switch (this.props.scaleMode) {
                case "fullZoom":
                    return "100%";
                case "autoFill":
                    return _react2.default.createElement(_autoFill2.default, null);
                case "heightFill":
                    return _react2.default.createElement(_heightFill2.default, null);
                case "widthFill":
                default:
                    return _react2.default.createElement(_widthFill2.default, null);
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            _store2.default.dispatch((0, _actions.setFill)(this.props.scaleMode));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "button",
                { className: "hire-fill-button", onClick: this.onClick.bind(this) },
                this.renderIcon()
            );
        }
    }]);

    return FillButton;
}(_react2.default.Component);

FillButton.propTypes = {
    scaleMode: function scaleMode(props, propName) {
        if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
            var msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
            props[propName] = "heightFill";
            return new Error(msg);
        }
    }
};

FillButton.defaultProps = {
    scaleMode: "heightFill"
};

exports.default = FillButton;

},{"../actions":19,"../store":33,"./icons/auto-fill":24,"./icons/height-fill":26,"./icons/width-fill":27,"react":"react"}],23:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _freeMovement = _dereq_("./icons/free-movement");

var _freeMovement2 = _interopRequireDefault(_freeMovement);

var _actions = _dereq_("../actions");

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreeMovementButton = function (_React$Component) {
    _inherits(FreeMovementButton, _React$Component);

    function FreeMovementButton(props) {
        _classCallCheck(this, FreeMovementButton);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FreeMovementButton).call(this, props));

        _this.state = _store2.default.getState();
        return _this;
    }

    _createClass(FreeMovementButton, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.unsubscribe = _store2.default.subscribe(function () {
                return _this2.setState(_store2.default.getState());
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.unsubscribe();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            _store2.default.dispatch((0, _actions.setFreeMovement)(!this.state.freeMovement));
        }
    }, {
        key: "render",
        value: function render() {
            var c = "hire-free-movement-button";
            if (!this.state.freeMovement) {
                c += " active";
            }
            return _react2.default.createElement(
                "button",
                { className: c, onClick: this.onClick.bind(this) },
                _react2.default.createElement(_freeMovement2.default, null)
            );
        }
    }]);

    return FreeMovementButton;
}(_react2.default.Component);

exports.default = FreeMovementButton;

},{"../actions":19,"../store":33,"./icons/free-movement":25,"react":"react"}],24:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoFill = function (_React$Component) {
  _inherits(AutoFill, _React$Component);

  function AutoFill() {
    _classCallCheck(this, AutoFill);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoFill).apply(this, arguments));
  }

  _createClass(AutoFill, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { viewBox: "0 -2 16 20" },
        _react2.default.createElement("path", { d: "M 2.2510028,2.3999952 14.134355,13.976932", style: { strokeWidth: 2 } }),
        _react2.default.createElement("path", { d: "M 0.17726274,4.8389082 0.0558895,0.07290967 4.6198279,0.27222077", style: { strokeWidth: 0 } }),
        _react2.default.createElement("path", {
          d: "m 15.925831,11.287935 0.121374,4.765999 -4.563938,-0.199312",
          style: { strokeWidth: 0 }
        }),
        _react2.default.createElement("path", {
          d: "M 13.731112,2.2550713 2.1257829,14.110698",
          style: { strokeWidth: 2 } }),
        _react2.default.createElement("path", {
          d: "M 11.297166,0.17550349 16.063441,0.06553063 15.853214,4.6289791",
          style: { strokeWidth: 0 }
        }),
        _react2.default.createElement("path", {
          d: "M 4.8104871,15.908601 0.0442114,16.018574 0.2544395,11.455126",
          style: { strokeWidth: 0 }
        })
      );
    }
  }]);

  return AutoFill;
}(_react2.default.Component);

exports.default = AutoFill;

},{"react":"react"}],25:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreeMovement = function (_React$Component) {
  _inherits(FreeMovement, _React$Component);

  function FreeMovement() {
    _classCallCheck(this, FreeMovement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FreeMovement).apply(this, arguments));
  }

  _createClass(FreeMovement, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { viewBox: "0 0 480 480" },
        _react2.default.createElement(
          "g",
          { id: "key" },
          _react2.default.createElement("path", { d: "M294.399,196.875l10.574,10.579c2.627-3.028,4.703-6.688,6.27-10.579H294.399z" }),
          _react2.default.createElement("path", { d: "M310.743,163.658c0,0-5.346-10.467-35.785-44.875c-30.422-34.392-50.438-52.094-50.438-52.094   c-11.734-10.376-30.857-10.299-42.514,0.173c0,0-41.014,36.967-61.703,55.609c-20.688,18.626-51.484,55.873-51.484,55.873   c-9.984,12.08-10.346,32.143-0.799,44.564c0,0,13.281,17.327,50.109,48.594c36.828,31.28,47.08,37.157,47.08,37.157   c13.297,7.559,32.859,5.091,44.094-5.363l-23.5-23.842c-14.592-14.842-14.516-38.891,0.232-53.625l41.781-41.781   c7.158-7.171,16.705-11.123,26.861-11.123c10.158,0,19.719,3.952,26.875,11.123l23.42,23.405   C314.801,196.081,317.506,176.955,310.743,163.658z M160.27,196.5c-20.982,0-37.998-17.012-37.998-38.015   c0-20.981,17.016-37.998,37.998-37.998c20.984,0,38.002,17.017,38.002,37.998C198.272,179.488,181.254,196.5,160.27,196.5z" }),
          _react2.default.createElement("path", { d: "M416.598,359.407L261.397,204.206c-3.689-3.689-9.734-3.689-13.422,0l-6.283,6.247l160.033,158.609v20.223h-17.002   L223.805,228.346l-17.629,17.642c-3.703,3.685-3.703,9.764-0.061,13.482l144.625,146.767c3.654,3.749,10.938,6.796,16.172,6.796   h32.656c5.221,0,10.752-4.107,12.266-9.108l8.721-28.734C422.069,370.206,420.303,363.078,416.598,359.407z" })
        )
      );
    }
  }]);

  return FreeMovement;
}(_react2.default.Component);

exports.default = FreeMovement;

},{"react":"react"}],26:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeightFill = function (_React$Component) {
    _inherits(HeightFill, _React$Component);

    function HeightFill() {
        _classCallCheck(this, HeightFill);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeightFill).apply(this, arguments));
    }

    _createClass(HeightFill, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                { viewBox: "0 0 18 17" },
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("path", { d: "m 7.8735657,3.2305929 0.088125,9.1793421", style: { strokeWidth: 2 } }),
                    _react2.default.createElement("path", { d: "M 4.6336281,3.641452 7.9449077,0.21145225 11.004625,3.6037073", style: { strokeWidth: 0 } }),
                    _react2.default.createElement("path", { d: "m 11.229771,12.149816 -3.3112819,3.43 -3.0597154,-3.392255", style: { strokeWidth: 0 } })
                )
            );
        }
    }]);

    return HeightFill;
}(_react2.default.Component);

exports.default = HeightFill;

},{"react":"react"}],27:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidthFill = function (_React$Component) {
    _inherits(WidthFill, _React$Component);

    function WidthFill() {
        _classCallCheck(this, WidthFill);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(WidthFill).apply(this, arguments));
    }

    _createClass(WidthFill, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                { viewBox: "0 0 24 17" },
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("path", { d: "m 3.2525423,8.5338983 16.5903457,0", style: { strokeWidth: 2 } }),
                    _react2.default.createElement("path", { d: "M 3.4690633,11.727926 0.0563563,8.3988265 3.4645013,5.3568195", style: { strokeWidth: 0 } }),
                    _react2.default.createElement("path", { d: "m 19.249675,5.3577067 3.412707,3.3291 -3.408145,3.0420063", style: { strokeWidth: 0 } })
                )
            );
        }
    }]);

    return WidthFill;
}(_react2.default.Component);

exports.default = WidthFill;

},{"react":"react"}],28:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _actions = _dereq_("../actions");

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

var _requestAnimationFrame = _dereq_("../util/request-animation-frame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from "react";

// class Minimap extends React.Component {
// 	render() {
// 		return (
// 			<div>MINI</div>
// 		);
// 	}
// }

// Minimap.propTypes = {};

// Minimap.defaultProps = {};

// export default Minimap;

var RESIZE_DELAY = 5;

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Minimap = function (_React$Component) {
	_inherits(Minimap, _React$Component);

	function Minimap(props) {
		_classCallCheck(this, Minimap);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Minimap).call(this, props));

		_this.state = {
			width: null,
			height: null
		};
		_this.resizeListener = _this.onResize.bind(_this);
		_this.animationFrameListener = _this.onAnimationFrame.bind(_this);
		_this.abortAnimationFrame = false;
		_this.imageCtx = null;
		_this.interactionCtx = null;
		_this.resizeDelay = -1;
		_this.mouseState = MOUSE_UP;
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.touchMoveListener = _this.onTouchMove.bind(_this);
		_this.frameBuffer = [];
		return _this;
	}

	_createClass(Minimap, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.abortAnimationFrame = false;
			this.onResize();
			this.imageCtx = this.refs.minimap.children[0].getContext("2d");
			this.interactionCtx = this.refs.minimap.children[1].getContext("2d");
			window.addEventListener("resize", this.resizeListener);
			window.addEventListener("mousemove", this.mousemoveListener);
			window.addEventListener("mouseup", this.mouseupListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.addEventListener("touchmove", this.touchMoveListener);
			(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
		}

		// componentWillReceiveProps(nextProps) {
		// 	if(nextProps.config.identifier !== this.props.config.identifier) {
		// 		console.log(nextProps.api)
		// 		// this.props.api = new Api(this.props.service, nextProps.config);
		// 		this.commitResize();
		// 	}
		// }

	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.width !== nextState.width || this.state.height !== nextState.height;
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("resize", this.resizeListener);
			window.removeEventListener("mousemove", this.mousemoveListener);
			window.removeEventListener("mouseup", this.mouseupListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.removeEventListener("touchmove", this.touchMoveListener);
			this.abortAnimationFrame = true;
			(0, _requestAnimationFrame.cancelAnimationFrame)(this.animationFrameListener);
			// this.unsubscribe();
		}
	}, {
		key: "onAnimationFrame",
		value: function onAnimationFrame() {
			if (this.frameBuffer.length) {
				this.imageCtx.clearRect(0, 0, this.state.width, this.state.height);
				for (var i = 0; i < this.frameBuffer.length; i++) {
					var tileIm = this.frameBuffer[i][0];
					var tile = this.frameBuffer[i][1];
					this.imageCtx.drawImage(tileIm, parseInt(Math.floor(tile.pos.x * this.scale)), parseInt(Math.floor(tile.pos.y * this.scale)), parseInt(Math.ceil(tileIm.width * this.scale)), parseInt(Math.ceil(tileIm.height * this.scale)));
				}
				if (this.frameBuffer.filter(function (x) {
					return x[0].complete && x[0].height > 0 && x[0].width > 0;
				}).length === this.frameBuffer.length) {
					this.frameBuffer = [];
				}
			}

			if (this.resizeDelay === 0) {
				this.commitResize();
				this.resizeDelay = -1;
			} else if (this.resizeDelay > 0) {
				this.resizeDelay -= 1;
			}

			this.interactionCtx.strokeStyle = this.props.rectStroke;
			this.interactionCtx.fillStyle = this.props.rectFill;
			this.interactionCtx.clearRect(0, 0, this.state.width, this.state.height);
			this.interactionCtx.fillRect(Math.floor(this.props.realViewPort.x * this.state.width), Math.floor(this.props.realViewPort.y * this.state.height), Math.ceil(this.props.realViewPort.w * this.state.width), Math.ceil(this.props.realViewPort.h * this.state.height));

			this.interactionCtx.beginPath();
			this.interactionCtx.rect(Math.floor(this.props.realViewPort.x * this.state.width), Math.floor(this.props.realViewPort.y * this.state.height), Math.ceil(this.props.realViewPort.w * this.state.width), Math.ceil(this.props.realViewPort.h * this.state.height));
			this.interactionCtx.stroke();

			if (!this.abortAnimationFrame) {
				(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
			}
		}
	}, {
		key: "onResize",
		value: function onResize() {
			this.resizeDelay = RESIZE_DELAY;
		}
	}, {
		key: "commitResize",
		value: function commitResize() {
			this.resizeDelay = RESIZE_DELAY;
			var _refs$minimap = this.refs.minimap;
			var clientWidth = _refs$minimap.clientWidth;
			var clientHeight = _refs$minimap.clientHeight;

			this.frameBuffer = this.props.api.loadImage({
				viewport: { w: clientWidth, h: clientHeight },
				onScale: this.setScale.bind(this),
				scaleMode: "autoFill",
				position: { x: 0, y: 0 }
			});
		}
	}, {
		key: "setScale",
		value: function setScale(s, l) {
			this.scale = s;
			this.level = l;
			var dims = this.props.api.getRealImagePos({ x: 0, y: 0 }, this.scale, this.level);
			this.setState({ width: dims.w, height: dims.h });
			if (this.props.onDimensions) {
				this.props.onDimensions(dims.w, dims.h);
			}
		}
	}, {
		key: "dispatchReposition",
		value: function dispatchReposition(ev) {
			var doc = document.documentElement;
			var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
			var rect = this.refs.minimap.getBoundingClientRect();
			_store2.default.dispatch((0, _actions.setRealViewPort)({
				x: (ev.pageX - rect.left) / this.state.width - this.props.realViewPort.w / 2,
				y: (ev.pageY - rect.top - scrollTop) / this.state.height - this.props.realViewPort.h / 2,
				reposition: true,
				applyZoom: false
			}));
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchReposition({ pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY });
			return ev.preventDefault();
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchReposition(ev);
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchReposition(ev);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchReposition({ pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY });
				return ev.preventDefault();
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp() {
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "onWheel",
		value: function onWheel(ev) {
			_store2.default.dispatch((0, _actions.sendMouseWheel)({ deltaY: ev.deltaY }));
			return ev.preventDefault();
		}
	}, {
		key: "onTouchEnd",
		value: function onTouchEnd() {
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					className: "hire-djatoka-minimap",
					ref: "minimap"
				},
				_react2.default.createElement("canvas", { className: "image", height: this.state.height, width: this.state.width }),
				_react2.default.createElement("canvas", { className: "interaction",
					height: this.state.height,
					onMouseDown: this.onMouseDown.bind(this),
					onTouchStart: this.onTouchStart.bind(this),
					onWheel: this.onWheel.bind(this),
					width: this.state.width })
			);
		}
	}]);

	return Minimap;
}(_react2.default.Component);

Minimap.propTypes = {
	config: _react2.default.PropTypes.object,
	onDimensions: _react2.default.PropTypes.func,
	rectFill: _react2.default.PropTypes.string,
	rectStroke: _react2.default.PropTypes.string,
	service: _react2.default.PropTypes.string
};

Minimap.defaultProps = {
	rectFill: "rgba(128,128,255,0.1)",
	rectStroke: "rgba(255,255,255,0.8)"
};

exports.default = Minimap;

},{"../actions":19,"../store":33,"../util/request-animation-frame":34,"react":"react"}],29:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _actions = _dereq_("../actions");

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

var _requestAnimationFrame = _dereq_("../util/request-animation-frame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var TOUCH_END = 0;
var TOUCH_START = 1;
var TOUCH_PINCH = 2;

var RESIZE_DELAY = 5;

var SUPPORTED_SCALE_MODES = ["heightFill", "widthFill", "autoFill", "fullZoom"];

var Viewer = function (_React$Component) {
	_inherits(Viewer, _React$Component);

	function Viewer(props) {
		_classCallCheck(this, Viewer);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).call(this, props));

		_this.state = {
			width: null,
			height: null
		};

		_this.movement = { x: 0, y: 0 };
		_this.touchPos = { x: 0, y: 0 };
		_this.mousePos = { x: 0, y: 0 };
		_this.imagePos = { x: 0, y: 0 };
		_this.mouseState = MOUSE_UP;
		_this.imageCtx = null;
		_this.resizeDelay = 0;
		_this.scale = 1.0;
		_this.level = null;
		_this.width = null;
		_this.height = null;
		_this.focalPoint = null;
		_this.abortAnimationFrame = false;
		_this.resizeListener = _this.onResize.bind(_this);
		_this.animationFrameListener = _this.onAnimationFrame.bind(_this);
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.frameBuffer = [];
		_this.touchmap = { startPos: false, positions: [], tapStart: 0, lastTap: 0, pinchDelta: 0, pinchDistance: 0 };
		_this.requestAnimationFrame = _requestAnimationFrame.requestAnimationFrame;
		_this.cancelAnimationFrame = _requestAnimationFrame.cancelAnimationFrame;
		return _this;
	}

	_createClass(Viewer, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.abortAnimationFrame = false;
			this.commitResize();
			this.imageCtx = this.refs.viewer.children[0].getContext("2d");
			window.addEventListener("resize", this.resizeListener);
			window.addEventListener("mousemove", this.mousemoveListener);
			window.addEventListener("mouseup", this.mouseupListener);

			// this.unsubscribe = store.subscribe(() =>
			// 	this.setState(store.getState(), this.receiveNewState.bind(this))
			// );
			this.requestAnimationFrame(this.animationFrameListener);

			// document.addEventListener("click", (ev) => {
			// 	console.log(ev.target)
			// })
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.api.config.identifier !== this.props.api.config.identifier) {
				// this.props.api = new Api(this.props.service, nextProps.config);
				this.commitResize();
			}
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.width !== nextState.width || this.state.height !== nextState.height || this.props.api.config.identifier !== nextProps.api.config.identifier;
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("resize", this.resizeListener);
			window.removeEventListener("mousemove", this.mousemoveListener);
			window.removeEventListener("mouseup", this.mouseupListener);
			// this.unsubscribe();
			this.abortAnimationFrame = true;
			this.cancelAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: "notifyRealImagePos",
		value: function notifyRealImagePos() {
			var zoom = this.props.api.getRealScale(this.scale, this.level);
			var dims = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);
			_store2.default.dispatch((0, _actions.setRealViewPort)({
				x: -dims.x / dims.w,
				y: -dims.y / dims.h,
				w: this.state.width / dims.w,
				h: this.state.height / dims.h,
				zoom: zoom,
				reposition: false,
				applyZoom: false
			}));
		}
	}, {
		key: "receiveNewState",
		value: function receiveNewState() {
			if (this.state.realViewPort.reposition) {
				var _props$api$getRealIma = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);

				var w = _props$api$getRealIma.w;
				var h = _props$api$getRealIma.h;

				this.imagePos.x = -(w * this.state.realViewPort.x / this.scale);
				this.imagePos.y = -(h * this.state.realViewPort.y / this.scale);
				this.correctBounds();
				this.loadImage({ scale: this.scale, level: this.level });
			}

			if (this.state.realViewPort.applyZoom) {
				this.focalPoint = null;
				this.props.api.zoomTo(this.state.realViewPort.zoom, this.zoom.bind(this));
			}

			if (this.state.mousewheel) {
				this.focalPoint = null;
				_store2.default.dispatch((0, _actions.sendMouseWheel)(false));
				this.props.api.zoomBy(this.determineZoomFactor(this.state.mousewheel.deltaY), this.scale, this.level, this.zoom.bind(this));
			}

			if (this.state.fillMode) {
				_store2.default.dispatch((0, _actions.setFill)(false));
				this.imagePos.x = 0;
				this.imagePos.y = 0;
				this.loadImage({ scaleMode: this.state.fillMode });
			}
		}
	}, {
		key: "onAnimationFrame",
		value: function onAnimationFrame() {
			if (this.frameBuffer.length) {
				this.imageCtx.clearRect(0, 0, this.state.width, this.state.height);
				for (var i = 0; i < this.frameBuffer.length; i++) {
					var tileIm = this.frameBuffer[i][0];
					var tile = this.frameBuffer[i][1];
					this.imageCtx.drawImage(tileIm, parseInt(Math.floor((tile.pos.x + this.imagePos.x) * this.scale)), parseInt(Math.floor((tile.pos.y + this.imagePos.y) * this.scale)), parseInt(Math.ceil(tileIm.width * this.scale)), parseInt(Math.ceil(tileIm.height * this.scale)));
				}
				if (this.frameBuffer.filter(function (x) {
					return x[0].complete && x[0].height > 0 && x[0].width > 0;
				}).length === this.frameBuffer.length) {
					this.frameBuffer = [];
				}
			}

			if (this.resizeDelay === 0) {
				this.commitResize();
				this.resizeDelay = -1;
			} else if (this.resizeDelay > 0) {
				this.resizeDelay -= 1;
			}
			if (!this.abortAnimationFrame) {
				this.requestAnimationFrame(this.animationFrameListener);
			}
		}
	}, {
		key: "onResize",
		value: function onResize() {
			this.resizeDelay = RESIZE_DELAY;
		}
	}, {
		key: "commitResize",
		value: function commitResize() {
			this.resizeDelay = RESIZE_DELAY;
			this.imagePos.x = 0;
			this.imagePos.y = 0;
			this.width = null;
			this.height = null;
			var node = this.refs.viewer;
			this.setState({
				width: node.clientWidth,
				height: node.clientHeight
			}, this.loadImage.bind(this));
		}
	}, {
		key: "loadImage",
		value: function loadImage() {
			var opts = arguments.length <= 0 || arguments[0] === undefined ? { scaleMode: this.props.scaleMode } : arguments[0];

			this.notifyRealImagePos();
			this.frameBuffer = this.props.api.loadImage(_extends({
				viewport: { w: this.state.width, h: this.state.height },
				position: this.imagePos,
				onScale: this.onDimensions.bind(this)
			}, opts));
		}
	}, {
		key: "setScale",
		value: function setScale(s, l) {
			this.scale = s;
			this.level = l;
		}
	}, {
		key: "setDimensions",
		value: function setDimensions(w, h) {
			this.width = w;
			this.height = h;
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mousePos.x = ev.clientX;
			this.mousePos.y = ev.clientY;
			this.movement = { x: 0, y: 0 };
			this.mouseState = MOUSE_DOWN;
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			if (ev.touches.length > 1) {
				this.touchState = TOUCH_PINCH;
			} else {
				this.touchPos.x = ev.touches[0].pageX;
				this.touchPos.y = ev.touches[0].pageY;
				this.movement = { x: 0, y: 0 };
				this.touchState = TOUCH_START;
			}
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			switch (this.mouseState) {
				case MOUSE_DOWN:
					this.movement.x = this.mousePos.x - ev.clientX;
					this.movement.y = this.mousePos.y - ev.clientY;
					this.imagePos.x -= this.movement.x / this.scale;
					this.imagePos.y -= this.movement.y / this.scale;
					this.mousePos.x = ev.clientX;
					this.mousePos.y = ev.clientY;
					this.correctBounds();
					this.loadImage({ scale: this.scale, level: this.level });
					return ev.preventDefault();
				case MOUSE_UP:
					var rect = this.refs.viewer.getBoundingClientRect();
					this.focalPoint = {
						x: ev.clientX - rect.left,
						y: ev.clientY - rect.top
					};
					break;
				default:
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			for (var i = 0; i < ev.touches.length; i++) {
				var cur = { x: ev.touches[i].pageX, y: ev.touches[i].pageY };
				this.touchmap.positions[i] = cur;
			}
			if (ev.touches.length === 2 && this.touchState === TOUCH_PINCH) {
				var oldD = this.touchmap.pinchDistance;
				this.touchmap.pinchDistance = parseInt(Math.sqrt((this.touchmap.positions[0].x - this.touchmap.positions[1].x) * (this.touchmap.positions[0].x - this.touchmap.positions[1].x) + (this.touchmap.positions[0].y - this.touchmap.positions[1].y) * (this.touchmap.positions[0].y - this.touchmap.positions[1].y)), 10);
				this.touchmap.pinchDelta = oldD - this.touchmap.pinchDistance;
				if (this.touchmap.pinchDelta < 60 && this.touchmap.pinchDelta > -60) {
					this.props.api.zoomBy(this.determineZoomFactor(this.touchmap.pinchDelta), this.scale, this.level, this.zoom.bind(this));
				}
			} else if (this.touchState === TOUCH_START) {
				this.movement.x = this.touchPos.x - ev.touches[0].pageX;
				this.movement.y = this.touchPos.y - ev.touches[0].pageY;
				this.imagePos.x -= this.movement.x / this.scale;
				this.imagePos.y -= this.movement.y / this.scale;
				this.touchPos.x = ev.touches[0].pageX;
				this.touchPos.y = ev.touches[0].pageY;
				this.correctBounds();
				this.loadImage({ scale: this.scale, level: this.level });
			}
			ev.preventDefault();
			ev.stopPropagation();
		}
	}, {
		key: "onTouchEnd",
		value: function onTouchEnd() {
			this.touchState = TOUCH_END;
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp() {
			if (this.mouseState === MOUSE_DOWN) {
				this.loadImage({ scale: this.scale, level: this.level });
			}
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "center",
		value: function center(w, h) {
			if (w > this.state.width) {
				this.imagePos.x = -parseInt((w - this.state.width) / 2) / this.scale;
			} else if (w < this.state.width) {
				this.imagePos.x = parseInt((this.state.width - w) / 2) / this.scale;
			}

			if (h > this.state.height) {
				this.imagePos.y = -parseInt((h - this.state.height) / 2) / this.scale;
			} else if (h < this.state.width) {
				this.imagePos.y = parseInt((this.state.height - h) / 2) / this.scale;
			}
		}
	}, {
		key: "correctBounds",
		value: function correctBounds() {
			if (this.state.freeMovement) {
				return;
			}
			if (this.width <= this.state.width) {
				if (this.imagePos.x < 0) {
					this.imagePos.x = 0;
				}
				if (this.imagePos.x * this.scale + this.width > this.state.width) {
					this.imagePos.x = (this.state.width - this.width) / this.scale;
				}
			} else if (this.width > this.state.width) {
				if (this.imagePos.x > 0) {
					this.imagePos.x = 0;
				}
				if (this.imagePos.x * this.scale + this.width < this.state.width) {
					this.imagePos.x = (this.state.width - this.width) / this.scale;
				}
			}

			if (this.height <= this.state.height) {
				if (this.imagePos.y < 0) {
					this.imagePos.y = 0;
				}
				if (this.imagePos.y * this.scale + this.height > this.state.height) {
					this.imagePos.y = (this.state.height - this.height) / this.scale;
				}
			} else if (this.height > this.state.height) {
				if (this.imagePos.y > 0) {
					this.imagePos.y = 0;
				}
				if (this.imagePos.y * this.scale + this.height < this.state.height) {
					this.imagePos.y = (this.state.height - this.height) / this.scale;
				}
			}
		}
	}, {
		key: "onDimensions",
		value: function onDimensions(s, l, w, h) {
			this.setDimensions(w, h);
			this.setScale(s, l);
			console.log(w, h);
			this.center(w, h);
			this.notifyRealImagePos();
		}
	}, {
		key: "zoom",
		value: function zoom(s, l, w, h) {
			var focalPoint = this.focalPoint || {
				x: this.state.width / 2,
				y: this.state.height / 2
			};

			var dX = (focalPoint.x - this.imagePos.x * this.scale) / this.width;
			var dY = (focalPoint.y - this.imagePos.y * this.scale) / this.height;

			this.setDimensions(w, h);
			this.setScale(s, l);

			if (this.width === null || this.height === null) {
				this.center(w, h);
			} else {
				this.imagePos.x = (focalPoint.x - dX * this.width) / this.scale;
				this.imagePos.y = (focalPoint.y - dY * this.height) / this.scale;
				this.correctBounds();
			}
			this.loadImage({ scale: this.scale, level: this.level });
		}
	}, {
		key: "determineZoomFactor",
		value: function determineZoomFactor(delta) {
			var rev = delta > 0 ? -1 : 1;
			var rs = this.props.api.getRealScale(this.scale, this.level);
			if (rs >= 0.6) {
				return 0.04 * rev;
			} else if (rs >= 0.3) {
				return 0.02 * rev;
			} else if (rs >= 0.1) {
				return 0.01 * rev;
			} else if (rs >= 0.05) {
				return 0.005 * rev;
			} else {
				return 0.0025 * rev;
			}
		}
	}, {
		key: "onWheel",
		value: function onWheel(ev) {
			this.props.api.zoomBy(this.determineZoomFactor(ev.nativeEvent.deltaY), this.scale, this.level, this.zoom.bind(this));

			return ev.preventDefault();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					className: "hire-djatoka-client",
					ref: "viewer"
				},
				_react2.default.createElement("canvas", {
					className: "image",
					height: this.state.height,
					width: this.state.width
				}),
				_react2.default.createElement("canvas", {
					className: "interaction",
					height: this.state.height,
					onMouseDown: this.onMouseDown.bind(this),
					onTouchEnd: this.onTouchEnd.bind(this),
					onTouchMove: this.onTouchMove.bind(this),
					onTouchStart: this.onTouchStart.bind(this),
					onWheel: this.onWheel.bind(this),
					width: this.state.width
				})
			);
		}
	}]);

	return Viewer;
}(_react2.default.Component);

Viewer.propTypes = {
	config: _react2.default.PropTypes.object,
	scaleMode: function scaleMode(props, propName) {
		if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
			var msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
			props[propName] = "heightFill";
			return new Error(msg);
		}
	},
	service: _react2.default.PropTypes.string
};

Viewer.defaultProps = {
	scaleMode: "autoFill"
};

exports.default = Viewer;

},{"../actions":19,"../store":33,"../util/request-animation-frame":34,"react":"react"}],30:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _actions = _dereq_("../actions");

var _store = _dereq_("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Zoom = function (_React$Component) {
	_inherits(Zoom, _React$Component);

	function Zoom(props) {
		_classCallCheck(this, Zoom);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Zoom).call(this, props));

		_this.state = _store2.default.getState();

		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.touchMoveListener = _this.onTouchMove.bind(_this);
		return _this;
	}

	_createClass(Zoom, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			window.addEventListener("mouseup", this.mouseupListener);
			window.addEventListener("mousemove", this.mousemoveListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.addEventListener("touchmove", this.touchMoveListener);

			this.unsubscribe = _store2.default.subscribe(function () {
				return _this2.setState(_store2.default.getState());
			});
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("mouseup", this.mouseupListener);
			window.removeEventListener("mousemove", this.mousemoveListener);
			window.removeEventListener("touchend", this.mouseupListener);
			window.removeEventListener("touchmove", this.touchMoveListener);

			this.unsubscribe();
		}
	}, {
		key: "dispatchRealScale",
		value: function dispatchRealScale(pageX) {
			var rect = _react2.default.findDOMNode(this).children[0].getBoundingClientRect();

			if (rect.width > 0 && !this.state.realViewPort.applyZoom) {
				var zoom = (pageX - rect.left) / rect.width * 2;
				if (zoom < 0.01) {
					zoom = 0.01;
				} else if (zoom > 2.0) {
					zoom = 2.0;
				}
				_store2.default.dispatch((0, _actions.setRealViewPort)({
					zoom: zoom,
					applyZoom: true
				}));
			}
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchRealScale(ev.pageX);
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchRealScale(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchRealScale(ev.pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchRealScale(ev.touches[0].pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp() {
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "onWheel",
		value: function onWheel(ev) {
			_store2.default.dispatch((0, _actions.sendMouseWheel)({ deltaY: ev.deltaY }));
			return ev.preventDefault();
		}
	}, {
		key: "render",
		value: function render() {
			var zoom = parseInt(this.state.realViewPort.zoom * 100);

			return _react2.default.createElement(
				"span",
				{ className: "hire-zoom-bar", onWheel: this.onWheel.bind(this) },
				_react2.default.createElement(
					"svg",
					{
						onMouseDown: this.onMouseDown.bind(this),
						onTouchStart: this.onTouchStart.bind(this),
						viewBox: "-12 0 224 24" },
					_react2.default.createElement("path", { d: "M0 12 L 200 12 Z" }),
					_react2.default.createElement("circle", { cx: zoom > 200 ? 200 : zoom, cy: "12", r: "12" })
				),
				_react2.default.createElement(
					"label",
					null,
					zoom,
					"%"
				)
			);
		}
	}]);

	return Zoom;
}(_react2.default.Component);

Zoom.propTypes = {
	fill: _react2.default.PropTypes.string,
	stroke: _react2.default.PropTypes.string
};

Zoom.defaultProps = {
	fill: "rgba(0,0,0, 0.7)",
	stroke: "rgba(0,0,0, 1)"
};

exports.default = Zoom;

},{"../actions":19,"../store":33,"react":"react"}],31:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeMovementButton = exports.FillButton = exports.Zoom = exports.Minimap = exports.Viewer = exports.DjatokaClient = undefined;

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);

var _djatokaClient = _dereq_("./components/djatoka-client");

var _djatokaClient2 = _interopRequireDefault(_djatokaClient);

var _viewer = _dereq_("./components/viewer");

var _viewer2 = _interopRequireDefault(_viewer);

var _minimap = _dereq_("./components/minimap");

var _minimap2 = _interopRequireDefault(_minimap);

var _zoom = _dereq_("./components/zoom");

var _zoom2 = _interopRequireDefault(_zoom);

var _fillButton = _dereq_("./components/fill-button");

var _fillButton2 = _interopRequireDefault(_fillButton);

var _freeMovementButton = _dereq_("./components/free-movement-button");

var _freeMovementButton2 = _interopRequireDefault(_freeMovementButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var css = Buffer("LmhpcmUtZGphdG9rYS1jbGllbnQsCi5oaXJlLWRqYXRva2EtbWluaW1hcCwKI2hpcmUtZGphdG9rYS1jbGllbnQtYXBwIHsKCXdpZHRoOiAxMDAlOwoJaGVpZ2h0OiAxMDAlOwp9CgouaGlyZS1kamF0b2thLWNsaWVudCA+IC5pbnRlcmFjdGlvbiwKLmhpcmUtZGphdG9rYS1jbGllbnQgPiAuaW1hZ2UsCi5oaXJlLWRqYXRva2EtbWluaW1hcCA+IC5pbnRlcmFjdGlvbiwKLmhpcmUtZGphdG9rYS1taW5pbWFwID4gLmltYWdlIHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKfQoKLmhpcmUtZGphdG9rYS1jbGllbnQgPiAuaW50ZXJhY3Rpb24sCi5oaXJlLWRqYXRva2EtbWluaW1hcCA+IC5pbnRlcmFjdGlvbiB7Cgl6LWluZGV4OiAxOwp9CgouaGlyZS16b29tLWJhciAqIHsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOwogICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAKICAgIHVzZXItc2VsZWN0OiBub25lOyAKICAgIC13ZWJraXQtdXNlci1kcmFnOiBub25lOwogICAgdXNlci1kcmFnOiBub25lOwp9Ci5oaXJlLXpvb20tYmFyIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCW1pbi13aWR0aDogNDAwcHg7CgltaW4taGVpZ2h0OiA0NHB4Owp9CgouaGlyZS16b29tLWJhciBsYWJlbCB7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Cgl3aWR0aDogMTUlOwoJaGVpZ2h0OiAxMDAlOwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQouaGlyZS16b29tLWJhciBsYWJlbCA+ICogewoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJaGVpZ2h0OiAxMDAlOwoJbGluZS1oZWlnaHQ6IDM0cHgKfQouaGlyZS16b29tLWJhciBzdmcgewoJY3Vyc29yOiBwb2ludGVyOwoJZmlsbDogI0JEQTQ3RTsKCXN0cm9rZTogI0YxRUJFNjsKCXdpZHRoOiA4NSU7Cn0KCi5oaXJlLXpvb20tYmFyIHN2ZyBwYXRoIHsKCXN0cm9rZS13aWR0aDogNnB4Owp9CgouaGlyZS16b29tLWJhciBzdmcgY2lyY2xlIHsKCXN0cm9rZS13aWR0aDogMDsKfQoKLmhpcmUtZmlsbC1idXR0b24sCi5oaXJlLWZyZWUtbW92ZW1lbnQtYnV0dG9uIHsKCW1hcmdpbjogMDsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDA7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWZvbnQtZmFtaWx5OiBpbmhlcml0OwoJY3Vyc29yOiBwb2ludGVyOwoJb3V0bGluZTogMDsKCXdpZHRoOiA1MHB4OwoJaGVpZ2h0OiAyNHB4OwoJcGFkZGluZzogMCA2cHg7CgliYWNrZ3JvdW5kLWNvbG9yOiAjQkRBNDdFOwoJbWFyZ2luLXJpZ2h0OiA2cHg7Cglib3JkZXItcmFkaXVzOiAzcHg7Cgljb2xvcjogI0YxRUJFNjsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cgp9CgoKLmhpcmUtZmlsbC1idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsCi5oaXJlLWZyZWUtbW92ZW1lbnQtYnV0dG9uOjotbW96LWZvY3VzLWlubmVyIHsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDA7Cn0KCi5oaXJlLWZpbGwtYnV0dG9uIHN2ZywKLmhpcmUtZnJlZS1tb3ZlbWVudC1idXR0b24gc3ZnIHsKCXN0cm9rZTogI0YxRUJFNjsKCXN0cm9rZS13aWR0aDogMXB4OwoJZmlsbDogI0YxRUJFNjsKCglzdHJva2Utb3BhY2l0eTogMTsKCWhlaWdodDogMTAwJQp9CgouaGlyZS1mcmVlLW1vdmVtZW50LWJ1dHRvbi5hY3RpdmUgc3ZnIHsKCWZpbGw6ICNhZmE7Cn0=","base64");
(0, _insertCss2.default)(css, { prepend: true });

// import React from "react";
// React.initializeTouchEvents(true);

exports.DjatokaClient = _djatokaClient2.default;
exports.Viewer = _viewer2.default;
exports.Minimap = _minimap2.default;
exports.Zoom = _zoom2.default;
exports.FillButton = _fillButton2.default;
exports.FreeMovementButton = _freeMovementButton2.default;

// export {
// 	DjatokaClient,
// 	Viewer,
// 	Minimap,
// 	Zoom,
// 	FillButton,
// 	FreeMovementButton
// };
//
// export default DjatokaClient;

},{"./components/djatoka-client":21,"./components/fill-button":22,"./components/free-movement-button":23,"./components/minimap":28,"./components/viewer":29,"./components/zoom":30,"insert-css":1}],32:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case "INITIAL":
			state = _extends({}, state, {
				api: new _api2.default(action.service, action.config),
				scaleMode: action.scaleMode
			});
			break;

		case "CREATE_NEXT_API":
			state = _extends({}, state, { api: new _api2.default(state.api.service, action.config) });
			break;

		case "SET_REAL_VIEWPORT":
			state = _extends({}, state, { realViewPort: _extends({}, state.realViewPort, action.realViewPort) });
			break;

		case "SEND_MOUSEWHEEL":
			state = _extends({}, state, { mousewheel: action.mousewheel });
			break;

		case "SET_FILL":
			state = _extends({}, state, { fillMode: action.mode });
			break;

		case "SET_FREE_MOVEMENT":
			state = _extends({}, state, { freeMovement: action.mode });
			break;
	}

	return state;
};

var _api = _dereq_("../api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	api: {
		config: {}
	},
	fillMode: null,
	freeMovement: false,
	mousewheel: null,
	realViewPort: { x: 0, y: 0, w: 0, h: 0, zoom: 0, reposition: false }
};

},{"../api":20}],33:[function(_dereq_,module,exports){
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

},{"../reducers":32,"redux":15}],34:[function(_dereq_,module,exports){
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