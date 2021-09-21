import { a as _objectWithoutProperties, b as _objectSpread2 } from '../_chunks/_rollupPluginBabelHelpers.c63527b4.js';
import { m as maplibreGl } from '../_chunks/maplibre-gl.b420778b.js';
import { c as createCommonjsModule, a as commonjsGlobal } from '../_chunks/_commonjsHelpers.04bfb82e.js';
import require$$0 from 'events';
import { injectMap } from '../mixins/provide-inject-map.js';
import { bindEvents, unbindEvents } from '../utils/bind-events.js';
import { n as normalizeComponent } from '../_chunks/normalize-component.d57baabe.js';

var immutable = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

var fuzzy = createCommonjsModule(function (module, exports) {
/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

var fuzzy = {};

// Use in node or in browser
{
  module.exports = fuzzy;
}

// Return all elements of `array` that have a fuzzy
// match against `pattern`.
fuzzy.simpleFilter = function(pattern, array) {
  return array.filter(function(str) {
    return fuzzy.test(pattern, str);
  });
};

// Does `pattern` fuzzy match `str`?
fuzzy.test = function(pattern, str) {
  return fuzzy.match(pattern, str) !== null;
};

// If `pattern` matches `str`, wrap each matching character
// in `opts.pre` and `opts.post`. If no match, return null
fuzzy.match = function(pattern, str, opts) {
  opts = opts || {};
  var patternIdx = 0
    , result = []
    , len = str.length
    , totalScore = 0
    , currScore = 0
    // prefix
    , pre = opts.pre || ''
    // suffix
    , post = opts.post || ''
    // String to compare against. This might be a lowercase version of the
    // raw string
    , compareString =  opts.caseSensitive && str || str.toLowerCase()
    , ch;

  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for(var idx = 0; idx < len; idx++) {
    ch = str[idx];
    if(compareString[idx] === pattern[patternIdx]) {
      ch = pre + ch + post;
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if(patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    totalScore = (compareString === pattern) ? Infinity : totalScore;
    return {rendered: result.join(''), score: totalScore};
  }

  return null;
};

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
//
//     [{
//         string:   '<b>lah' // The rendered string
//       , index:    2        // The index of the element in `arr`
//       , original: 'blah'   // The original element in `arr`
//     }]
//
// `opts` is an optional argument bag. Details:
//
//    opts = {
//        // string to put before a matching character
//        pre:     '<b>'
//
//        // string to put after matching character
//      , post:    '</b>'
//
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  if(!arr || arr.length === 0) {
    return [];
  }
  if (typeof pattern !== 'string') {
    return arr;
  }
  opts = opts || {};
  return arr
    .reduce(function(prev, element, idx, arr) {
      var str = element;
      if(opts.extract) {
        str = opts.extract(element);
      }
      var rendered = fuzzy.match(pattern, str, opts);
      if(rendered != null) {
        prev[prev.length] = {
            string: rendered.rendered
          , score: rendered.score
          , index: idx
          , original: element
        };
      }
      return prev;
    }, [])

    // Sort by score. Browsers are inconsistent wrt stable/unstable
    // sorting, so force stable by using the index in the case of tie.
    // See http://ofb.net/~sethml/is-sort-stable.html
    .sort(function(a,b) {
      var compare = b.score - a.score;
      if(compare) return compare;
      return a.index - b.index;
    });
};


}());
});

var List = function(component) {
  this.component = component;
  this.items = [];
  this.active = 0;
  this.wrapper = document.createElement('div');
  this.wrapper.className = 'suggestions-wrapper';
  this.element = document.createElement('ul');
  this.element.className = 'suggestions';
  this.wrapper.appendChild(this.element);

  // selectingListItem is set to true in the time between the mousedown and mouseup when clicking an item in the list
  // mousedown on a list item will cause the input to blur which normally hides the list, so this flag is used to keep
  // the list open until the mouseup
  this.selectingListItem = false;

  component.el.parentNode.insertBefore(this.wrapper, component.el.nextSibling);
  return this;
};

List.prototype.show = function() {
  this.element.style.display = 'block';
};

List.prototype.hide = function() {
  this.element.style.display = 'none';
};

List.prototype.add = function(item) {
  this.items.push(item);
};

List.prototype.clear = function() {
  this.items = [];
  this.active = 0;
};

List.prototype.isEmpty = function() {
  return !this.items.length;
};

List.prototype.isVisible = function() {
  return this.element.style.display === 'block';
};

List.prototype.draw = function() {
  this.element.innerHTML = '';

  if (this.items.length === 0) {
    this.hide();
    return;
  }

  for (var i = 0; i < this.items.length; i++) {
    this.drawItem(this.items[i], this.active === i);
  }

  this.show();
};

List.prototype.drawItem = function(item, active) {
  var li = document.createElement('li'),
    a = document.createElement('a');

  if (active) li.className += ' active';

  a.innerHTML = item.string;

  li.appendChild(a);
  this.element.appendChild(li);

  li.addEventListener('mousedown', function() {
    this.selectingListItem = true;
  }.bind(this));

  li.addEventListener('mouseup', function() {
    this.handleMouseUp.call(this, item);
  }.bind(this));
};

List.prototype.handleMouseUp = function(item) {
  this.selectingListItem = false;
  this.component.value(item.original);
  this.clear();
  this.draw();
};

List.prototype.move = function(index) {
  this.active = index;
  this.draw();
};

List.prototype.previous = function() {
  this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
};

List.prototype.next = function() {
  this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
};

List.prototype.drawError = function(msg){
  var li = document.createElement('li');

  li.innerHTML = msg;

  this.element.appendChild(li);
  this.show();
};

var list = List;

var Suggestions = function(el, data, options) {
  options = options || {};

  this.options = immutable({
    minLength: 2,
    limit: 5,
    filter: true,
    hideOnBlur: true
  }, options);

  this.el = el;
  this.data = data || [];
  this.list = new list(this);

  this.query = '';
  this.selected = null;

  this.list.draw();

  this.el.addEventListener('keyup', function(e) {
    this.handleKeyUp(e.keyCode);
  }.bind(this), false);

  this.el.addEventListener('keydown', function(e) {
    this.handleKeyDown(e);
  }.bind(this));

  this.el.addEventListener('focus', function() {
    this.handleFocus();
  }.bind(this));

  this.el.addEventListener('blur', function() {
    this.handleBlur();
  }.bind(this));

  this.el.addEventListener('paste', function(e) {
    this.handlePaste(e);
  }.bind(this));

  // use user-provided render function if given, otherwise just use the default
  this.render = (this.options.render) ? this.options.render.bind(this) : this.render.bind(this);

  this.getItemValue = (this.options.getItemValue) ? this.options.getItemValue.bind(this) : this.getItemValue.bind(this);

  return this;
};

Suggestions.prototype.handleKeyUp = function(keyCode) {
  // 40 - DOWN
  // 38 - UP
  // 27 - ESC
  // 13 - ENTER
  // 9 - TAB

  if (keyCode === 40 ||
      keyCode === 38 ||
      keyCode === 27 ||
      keyCode === 13 ||
      keyCode === 9) return;

  this.handleInputChange(this.el.value);
};

Suggestions.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case 13: // ENTER
    case 9: // TAB
      if (!this.list.isEmpty()) {
        if (this.list.isVisible()) {
          e.preventDefault();
        }
        this.value(this.list.items[this.list.active].original);
        this.list.hide();
      }
    break;
    case 27: // ESC
      if (!this.list.isEmpty()) this.list.hide();
    break;
    case 38: // UP
      this.list.previous();
    break;
    case 40: // DOWN
      this.list.next();
    break;
  }
};

Suggestions.prototype.handleBlur = function() {
  if (!this.list.selectingListItem && this.options.hideOnBlur) {
    this.list.hide();
  }
};

Suggestions.prototype.handlePaste = function(e) {
  if (e.clipboardData) {
    this.handleInputChange(e.clipboardData.getData('Text'));
  } else {
    var self = this;
    setTimeout(function () {
      self.handleInputChange(e.target.value);
    }, 100);
  }
};

Suggestions.prototype.handleInputChange = function(query) {
  this.query = this.normalize(query);

  this.list.clear();

  if (this.query.length < this.options.minLength) {
    this.list.draw();
    return;
  }

  this.getCandidates(function(data) {
    for (var i = 0; i < data.length; i++) {
      this.list.add(data[i]);
      if (i === (this.options.limit - 1)) break;
    }
    this.list.draw();
  }.bind(this));
};

Suggestions.prototype.handleFocus = function() {
  if (!this.list.isEmpty()) this.list.show();
  this.list.selectingListItem = false;
};

/**
 * Update data previously passed
 *
 * @param {Array} revisedData
 */
Suggestions.prototype.update = function(revisedData) {
  this.data = revisedData;
  this.handleKeyUp();
};

/**
 * Clears data
 */
Suggestions.prototype.clear = function() {
  this.data = [];
  this.list.clear();
};

/**
 * Normalize the results list and input value for matching
 *
 * @param {String} value
 * @return {String}
 */
Suggestions.prototype.normalize = function(value) {
  value = value.toLowerCase();
  return value;
};

/**
 * Evaluates whether an array item qualifies as a match with the current query
 *
 * @param {String} candidate a possible item from the array passed
 * @param {String} query the current query
 * @return {Boolean}
 */
Suggestions.prototype.match = function(candidate, query) {
  return candidate.indexOf(query) > -1;
};

Suggestions.prototype.value = function(value) {
  this.selected = value;
  this.el.value = this.getItemValue(value);

  if (document.createEvent) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent('change', true, false);
    this.el.dispatchEvent(e);
  } else {
    this.el.fireEvent('onchange');
  }
};

Suggestions.prototype.getCandidates = function(callback) {
  var options = {
    pre: '<strong>',
    post: '</strong>',
    extract: function(d) { return this.getItemValue(d); }.bind(this)
  };
  var results;
  if(this.options.filter){
    results = fuzzy.filter(this.query, this.data, options);

    results = results.map(function(item){
      return {
        original: item.original,
        string: this.render(item.original, item.string)
      };
    }.bind(this));
  }else {
    results = this.data.map(function(d) {
      var renderedString = this.render(d);
      return {
        original: d,
        string: renderedString
      };
    }.bind(this));
  }
  callback(results);
};

/**
 * For a given item in the data array, return what should be used as the candidate string
 *
 * @param {Object|String} item an item from the data array
 * @return {String} item
 */
Suggestions.prototype.getItemValue = function(item) {
  return item;
};

/**
 * For a given item in the data array, return a string of html that should be rendered in the dropdown
 * @param {Object|String} item an item from the data array
 * @param {String} sourceFormatting a string that has pre-formatted html that should be passed directly through the render function 
 * @return {String} html
 */
Suggestions.prototype.render = function(item, sourceFormatting) {
  if (sourceFormatting){
    // use existing formatting on the source string
    return sourceFormatting;
  }
  var boldString = (item.original) ? this.getItemValue(item.original) : this.getItemValue(item);
  var indexString = this.normalize(boldString);
  var indexOfQuery = indexString.lastIndexOf(this.query);
  while (indexOfQuery > -1) {
    var endIndexOfQuery = indexOfQuery + this.query.length;
    boldString = boldString.slice(0, indexOfQuery) + '<strong>' + boldString.slice(indexOfQuery, endIndexOfQuery) + '</strong>' + boldString.slice(endIndexOfQuery);
    indexOfQuery = indexString.slice(0, indexOfQuery).lastIndexOf(this.query);
  }
  return boldString
};

/**
 * Render an custom error message in the suggestions list
 * @param {String} msg An html string to render as an error message
 */
Suggestions.prototype.renderError = function(msg){
  this.list.drawError(msg);
};

var suggestions$1 = Suggestions;

/**
 * A typeahead component for inputs
 * @class Suggestions
 *
 * @param {HTMLInputElement} el A valid HTML input element
 * @param {Array} data An array of data used for results
 * @param {Object} options
 * @param {Number} [options.limit=5] Max number of results to display in the auto suggest list.
 * @param {Number} [options.minLength=2] Number of characters typed into an input to trigger suggestions.
 * @param {Boolean} [options.hideOnBlur=true] If `true`, hides the suggestions when focus is lost.
 * @return {Suggestions} `this`
 * @example
 * // in the browser
 * var input = document.querySelector('input');
 * var data = [
 *   'Roy Eldridge',
 *   'Roy Hargrove',
 *   'Rex Stewart'
 * ];
 *
 * new Suggestions(input, data);
 *
 * // with options
 * var input = document.querySelector('input');
 * var data = [{
 *   name: 'Roy Eldridge',
 *   year: 1911
 * }, {
 *   name: 'Roy Hargrove',
 *   year: 1969
 * }, {
 *   name: 'Rex Stewart',
 *   year: 1907
 * }];
 *
 * var typeahead = new Suggestions(input, data, {
 *   filter: false, // Disable filtering
 *   minLength: 3, // Number of characters typed into an input to trigger suggestions.
 *   limit: 3, //  Max number of results to display.
 *   hideOnBlur: false // Don't hide results when input loses focus
 * });
 *
 * // As we're passing an object of an arrays as data, override
 * // `getItemValue` by specifying the specific property to search on.
 * typeahead.getItemValue = function(item) { return item.name };
 *
 * input.addEventListener('change', function() {
 *   console.log(typeahead.selected); // Current selected item.
 * });
 *
 * // With browserify
 * var Suggestions = require('suggestions');
 *
 * new Suggestions(input, data);
 */

var suggestions = suggestions$1;

if (typeof window !== 'undefined') {
  window.Suggestions = suggestions$1;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

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

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

var exceptions = {
  'fr': {
    'name': 'France',
    'bbox': [[-4.59235, 41.380007], [9.560016, 51.148506]]
  },
  'us': {
    'name': 'United States',
    'bbox': [[-171.791111, 18.91619], [-66.96466, 71.357764]]
  },
  'ru': {
    'name': 'Russia',
    'bbox': [[19.66064, 41.151416], [190.10042, 81.2504]]
  },
  'ca': {
    'name': 'Canada',
    'bbox': [[-140.99778, 41.675105], [-52.648099, 83.23324]]
  }
};

/**
 * Localized values for the placeholder string
 * 
 * @private
 */
var placeholder = {
  // list drawn from https://docs.mapbox.com/api/search/#language-coverage
  'de': 'Suche', // german
  'it': 'Ricerca', //italian
  'en': 'Search', // english
  'nl': 'Zoeken', //dutch
  'fr': 'Chercher',  //french
  'ca': 'Cerca', //catalan
  'he': 'לחפש', //hebrew
  'ja': 'サーチ',  //japanese
  'lv': 'Meklēt', //latvian
  'pt': 'Procurar', //portuguese 
  'sr': 'Претрага', //serbian
  'zh': '搜索', //chinese-simplified
  'cs': 'Vyhledávání', //czech
  'hu': 'Keresés', //hungarian
  'ka': 'ძიება', // georgian
  'nb': 'Søke', //norwegian
  'sk': 'Vyhľadávanie', //slovak
  'th': 'ค้นหา', //thai
  'fi': 'Hae',//finnish
  'is': 'Leita',//icelandic
  'ko': '수색',//korean
  'pl':  'Szukaj', //polish
  'sl': 'Iskanje', //slovenian
  'fa': 'جستجو',  //persian(aka farsi)
  'ru': 'Поиск'//russian
};

var localization = {placeholder: placeholder};

var subtag = createCommonjsModule(function (module) {
!function(root, name, make) {
  if (module.exports) module.exports = make();
  else root[name] = make();
}(commonjsGlobal, 'subtag', function() {

  var empty = '';
  var pattern = /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/;

  function match(tag) {
    return tag.match(pattern) || []
  }

  function split(tag) {
    return match(tag).filter(function(v, i) { return v && i })
  }

  function api(tag) {
    tag = match(tag);
    return {
      language: tag[1] || empty,
      extlang: tag[2] || empty,
      script: tag[3] || empty,
      region: tag[4] || empty
    }
  }

  function expose(target, key, value) {
    Object.defineProperty(target, key, {
      value: value,
      enumerable: true
    });
  }

  function part(position, pattern, type) {
    function method(tag) {
      return match(tag)[position] || empty
    }
    expose(method, 'pattern', pattern);
    expose(api, type, method);
  }

  part(1, /^[a-zA-Z]{2,3}$/, 'language');
  part(2, /^[a-zA-Z]{3}$/, 'extlang');
  part(3, /^[a-zA-Z]{4}$/, 'script');
  part(4, /^[a-zA-Z]{2}$|^[0-9]{3}$/, 'region');

  expose(api, 'split', split);

  return api
});
});

var EventEmitter = require$$0.EventEmitter;




/**
 * A geocoder component that works with maplibre
 * @class MaplibreGeocoder
 * @param {Object} geocoderApi Any geocoder api that supports the functions reverseGeocode and forwardGeocode and returns a response which includes a FeatureCollection of results
 * @param {Object} options
 * @param {Object} [options.maplibregl] A [maplibre-gl](https://github.com/maplibre/maplibre-gl-js) instance to use when creating [Markers](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker). Required if `options.marker` is `true`.
 * @param {Number} [options.zoom=16] On geocoded result what zoom level should the map animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
 * @param {Boolean|Object} [options.flyTo=true] If `false`, animating the map to a selected result is disabled. If `true`, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#flyto) or [`fitBounds`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#fitbounds) method providing control over the animation of the transition.
 * @param {String} [options.placeholder=Search] Override the default placeholder attribute value.
 * @param {Object} [options.proximity] a proximity argument: this is
 * a geographical point given as an object with `latitude` and `longitude`
 * properties. Search results closer to this point will be given
 * higher priority.
 * @param {Boolean} [options.trackProximity=true] If `true`, the geocoder proximity will automatically update based on the map view.
 * @param {Boolean} [options.collapsed=false] If `true`, the geocoder control will collapse until hovered or in focus.
 * @param {Boolean} [options.clearAndBlurOnEsc=false] If `true`, the geocoder control will clear it's contents and blur when user presses the escape key.
 * @param {Boolean} [options.clearOnBlur=false] If `true`, the geocoder control will clear its value when the input blurs.
 * @param {Array} [options.bbox] a bounding box argument: this is
 * a bounding box given as an array in the format `[minX, minY, maxX, maxY]`.
 * Search results will be limited to the bounding box.
 * @param {string} [options.countries] a comma separated list of country codes to
 * limit results to specified country or countries.
 * @param {string} [options.types] a comma seperated list of types that filter
 * results to match those specified. See https://docs.mapbox.com/api/search/#data-types
 * for available types.
 * If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
 * @param {Number} [options.minLength=2] Minimum number of characters to enter before results are shown.
 * @param {Number} [options.limit=5] Maximum number of results to show.
 * @param {string} [options.language] Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
 * @param {Function} [options.filter] A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
 * @param {Function} [options.localGeocoder] A function accepting the query string which performs local geocoding to supplement results from the Maplibre Geocoding API. Expected to return an Array of GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
 * @param {Function} [options.externalGeocoder] A function accepting the query string, current features list, and geocoder options which performs geocoding to supplement results from the Maplibre Geocoding API. Expected to return a Promise which resolves to an Array of GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
 * @param {distance|score} [options.reverseMode=distance] - Set the factors that are used to sort nearby results.
 * @param {boolean} [options.reverseGeocode=false] If `true`, enable reverse geocoding mode. In reverse geocoding, search input is expected to be coordinates in the form `lat, lon`, with suggestions being the reverse geocodes.
 * @param {Boolean} [options.enableEventLogging=true] Allow Maplibre to collect anonymous usage statistics from the plugin.
 * @param {Boolean|Object} [options.marker=true]  If `true`, a [Marker](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker) will be added to the map at the location of the user-selected result using a default set of Marker options.  If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `options.maplibregl` also be set.
 * @param {Boolean|Object} [options.popup=true]  If `true`, a [Popup](https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup) will be added to the map when clicking on a marker using a default set of popup options.  If the value is an object, the popup will be constructed using these options. If `false`, no popup will be added to the map. Requires that `options.maplibregl` also be set.
 * @param {Boolean|Object} [options.showResultMarkers=true]  If `true`, [Markers](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker) will be added to the map at the location the top results for the query.   If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `options.maplibregl` also be set.
 * @param {Function} [options.render] A function that specifies how the results should be rendered in the dropdown menu. This function should accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string. Any HTML in the returned string will be rendered.
 * @param {Function} [options.popupRender] A function that specifies how the results should be rendered in the popup menu. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string. Any HTML in the returned string will be rendered.
 * @param {Function} [options.getItemValue] A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string. HTML tags in the output string will not be rendered. Defaults to `(item) => item.place_name`.
 * @param {Boolean} [options.localGeocoderOnly=false] If `true`, indicates that the `localGeocoder` results should be the only ones returned to the user. If `false`, indicates that the `localGeocoder` results should be combined with those from the Maplibre API with the `localGeocoder` results ranked higher.
 * @param {Boolean} [options.showResultsWhileTyping=false] If `false`, indicates that search will only occur on enter key press. If `true`, indicates that the Geocoder will search on the input box being updated above the minLength option.
 * @example
 *
 * var GeoApi = {
 *   forwardGeocode: (config) => { return { features: [] } },
 *   reverseGeocode: (config) => { return { features: [] } }
 * }
 * var geocoder = new MaplibreGeocoder(GeoApi, {});
 * map.addControl(geocoder);
 * @return {MaplibreGeocoder} `this`
 *
 */

function MaplibreGeocoder(geocoderApi, options) {
  this._eventEmitter = new EventEmitter();
  this.options = immutable({}, this.options, options);
  this.inputString = "";
  this.fresh = true;
  this.lastSelected = null;
  this.geocoderApi = geocoderApi;
}

MaplibreGeocoder.prototype = {
  options: {
    zoom: 16,
    flyTo: true,
    trackProximity: true,
    showResultsWhileTyping: false,
    minLength: 2,
    reverseGeocode: false,
    limit: 5,
    enableEventLogging: true,
    marker: true,
    popup: false,
    maplibregl: null,
    collapsed: false,
    clearAndBlurOnEsc: false,
    clearOnBlur: false,
    getItemValue: function (item) {
      return item.place_name;
    },
    render: function (item) {
      var placeName = item.place_name.split(",");
      return (
        '<div class="mapboxgl-ctrl-geocoder--suggestion maplibregl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title maplibregl-ctrl-geocoder--suggestion-title">' +
        placeName[0] +
        '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address maplibregl-ctrl-geocoder--suggestion-address">' +
        placeName.splice(1, placeName.length).join(",") +
        "</div></div>"
      );
    },
    popupRender: function (item) {
      var placeName = item.place_name.split(",");
      return (
        '<div class="mapboxgl-ctrl-geocoder--suggestion maplibre-ctrl-geocoder--suggestion popup-suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title maplibre-ctrl-geocoder--suggestion-title popup-suggestion-title">' +
        placeName[0] +
        '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address maplibre-ctrl-geocoder--suggestion-address popup-suggestion-address">' +
        placeName.splice(1, placeName.length).join(",") +
        "</div></div>"
      );
    },
    showResultMarkers: false,
  },

  /**
   * Add the geocoder to a container. The container can be either a `maplibregl.Map`, an `HTMLElement` or a CSS selector string.
   *
   * If the container is a [`maplibregl.Map`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map), this function will behave identically to [`Map.addControl(geocoder)`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addcontrol).
   * If the container is an instance of [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), then the geocoder will be appended as a child of that [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
   * If the container is a [CSS selector string](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), the geocoder will be appended to the element returned from the query.
   *
   * This function will throw an error if the container is none of the above.
   * It will also throw an error if the referenced HTML element cannot be found in the `document.body`.
   *
   * For example, if the HTML body contains the element `<div id='geocoder-container'></div>`, the following script will append the geocoder to `#geocoder-container`:
   *
   * ```javascript
   * var GeoApi = {
   *   forwardGeocode: (config) => { return { features: [] } },
   *   reverseGeocode: (config) => { return { features: [] } }
   * }
   * var geocoder = new MaplibreGeocoder(GeoAPI, {});
   * geocoder.addTo('#geocoder-container');
   * ```
   * @param {String|HTMLElement|maplibregl.Map} container A reference to the container to which to add the geocoder
   */
  addTo: function (container) {
    function addToExistingContainer(geocoder, container) {
      if (!document.body.contains(container)) {
        throw new Error(
          "Element provided to #addTo() exists, but is not in the DOM"
        );
      }
      const el = geocoder.onAdd(); //returns the input elements, which are then added to the requested html container
      container.appendChild(el);
    }

    // if the container is a map, add the control like normal
    if (container._controlContainer) {
      //  it's a maplibre-gl map, add like normal
      container.addControl(this);
    }
    // if the container is an HTMLElement, then set the parent to be that element
    else if (container instanceof HTMLElement) {
      addToExistingContainer(this, container);
    }
    // if the container is a string, treat it as a CSS query
    else if (typeof container == "string") {
      const parent = document.querySelectorAll(container);
      if (parent.length === 0) {
        throw new Error("Element ", container, "not found.");
      }

      if (parent.length > 1) {
        throw new Error("Geocoder can only be added to a single html element");
      }

      addToExistingContainer(this, parent[0]);
    } else {
      throw new Error(
        "Error: addTo must be a maplibre-gl-js map, an html element, or a CSS selector query for a single html element"
      );
    }
  },

  onAdd: function (map) {
    if (map && typeof map != "string") {
      this._map = map;
    }

    this.setLanguage();

    if (this.options.localGeocoderOnly && !this.options.localGeocoder) {
      throw new Error(
        "A localGeocoder function must be specified to use localGeocoderOnly mode"
      );
    }

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onPaste = this._onPaste.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._showButton = this._showButton.bind(this);
    this._hideButton = this._hideButton.bind(this);
    this._onQueryResult = this._onQueryResult.bind(this);
    this.clear = this.clear.bind(this);
    this._updateProximity = this._updateProximity.bind(this);
    this._collapse = this._collapse.bind(this);
    this._unCollapse = this._unCollapse.bind(this);
    this._clear = this._clear.bind(this);
    this._clearOnBlur = this._clearOnBlur.bind(this);

    var el = (this.container = document.createElement("div"));
    el.className =
      "mapboxgl-ctrl-geocoder mapboxgl-ctrl maplibregl-ctrl-geocoder maplibregl-ctrl";

    var searchIcon = this.createIcon(
      "search",
      '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>'
    );

    this._inputEl = document.createElement("input");
    this._inputEl.type = "text";
    this._inputEl.className =
      "mapboxgl-ctrl-geocoder--input maplibregl-ctrl-geocoder--input";

    this.setPlaceholder();

    if (this.options.collapsed) {
      this._collapse();
      this.container.addEventListener("mouseenter", this._unCollapse);
      this.container.addEventListener("mouseleave", this._collapse);
      this._inputEl.addEventListener("focus", this._unCollapse);
    }

    if (this.options.collapsed || this.options.clearOnBlur) {
      this._inputEl.addEventListener("blur", this._onBlur);
    }

    this._inputEl.addEventListener("keydown", lodash_debounce(this._onKeyDown, 200));
    this._inputEl.addEventListener("paste", this._onPaste);
    this._inputEl.addEventListener("change", this._onChange);
    this.container.addEventListener("mouseenter", this._showButton);
    this.container.addEventListener("mouseleave", this._hideButton);

    var actions = document.createElement("div");
    actions.classList.add(
      "mapboxgl-ctrl-geocoder--pin-right",
      "maplibregl-ctrl-geocoder--pin-right"
    );

    this._clearEl = document.createElement("button");
    this._clearEl.setAttribute("aria-label", "Clear");
    this._clearEl.addEventListener("click", this.clear);
    this._clearEl.className =
      "mapboxgl-ctrl-geocoder--button maplibregl-ctrl-geocoder--button";

    var buttonIcon = this.createIcon(
      "close",
      '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>'
    );
    this._clearEl.appendChild(buttonIcon);

    this._loadingEl = this.createIcon(
      "loading",
      '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>'
    );

    actions.appendChild(this._clearEl);
    actions.appendChild(this._loadingEl);

    el.appendChild(searchIcon);
    el.appendChild(this._inputEl);
    el.appendChild(actions);

    this._typeahead = new suggestions(this._inputEl, [], {
      filter: false,
      minLength: this.options.minLength,
      limit: this.options.limit,
    });

    this.setRenderFunction(this.options.render);
    this._typeahead.getItemValue = this.options.getItemValue;

    this.mapMarker = null;
    this.resultMarkers = [];
    this._handleMarker = this._handleMarker.bind(this);
    this._handleResultMarkers = this._handleResultMarkers.bind(this);
    if (this._map) {
      if (this.options.trackProximity) {
        this._updateProximity();
        this._map.on("moveend", this._updateProximity);
      }
      this._maplibregl = this.options.maplibregl;
      if (!this._maplibregl && this.options.marker) {
        // eslint-disable-next-line no-console
        console.error(
          "No maplibregl detected in options. Map markers are disabled. Please set options.maplibregl."
        );
        this.options.marker = false;
      }
    }
    return el;
  },

  createIcon: function (name, path) {
    var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute(
      "class",
      "mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-" +
        name +
        " maplibregl-ctrl-geocoder--icon maplibregl-ctrl-geocoder--icon-" +
        name
    );
    icon.setAttribute("viewBox", "0 0 18 18");
    icon.setAttribute("xml:space", "preserve");
    icon.setAttribute("width", 18);
    icon.setAttribute("height", 18);
    // IE does not have innerHTML for SVG nodes
    if (!("innerHTML" in icon)) {
      var SVGNodeContainer = document.createElement("div");
      SVGNodeContainer.innerHTML =
        "<svg>" + path.valueOf().toString() + "</svg>";
      var SVGNode = SVGNodeContainer.firstChild,
        SVGPath = SVGNode.firstChild;
      icon.appendChild(SVGPath);
    } else {
      icon.innerHTML = path;
    }
    return icon;
  },

  onRemove: function () {
    this.container.parentNode.removeChild(this.container);

    if (this.options.trackProximity && this._map) {
      this._map.off("moveend", this._updateProximity);
    }

    this._removeMarker();

    this._map = null;

    return this;
  },

  _onPaste: function (e) {
    var value = (e.clipboardData || window.clipboardData).getData("text");
    if (
      value.length >= this.options.minLength &&
      this.options.showResultsWhileTyping
    ) {
      this._geocode(value);
    }
  },

  _onKeyDown: function (e) {
    var ESC_KEY_CODE = 27,
      TAB_KEY_CODE = 9;

    if (e.keyCode === ESC_KEY_CODE && this.options.clearAndBlurOnEsc) {
      this._clear(e);
      return this._inputEl.blur();
    }

    // if target has shadowRoot, then get the actual active element inside the shadowRoot
    var target =
      e.target && e.target.shadowRoot
        ? e.target.shadowRoot.activeElement
        : e.target;
    var value = target ? target.value : "";

    if (!value) {
      this.fresh = true;
      // the user has removed all the text
      if (e.keyCode !== TAB_KEY_CODE) this.clear(e);
      return (this._clearEl.style.display = "none");
    }

    // TAB, ESC, LEFT, RIGHT, UP, DOWN
    if (
      e.metaKey ||
      [TAB_KEY_CODE, ESC_KEY_CODE, 37, 39, 38, 40].indexOf(e.keyCode) !== -1
    )
      return;

    // ENTER
    if (e.keyCode === 13) {
      if (!this.options.showResultsWhileTyping) {
        this._geocode(target.value);
      } else {
        if (this.options.showResultMarkers) {
          this._fitBoundsForMarkers();
        }
        this._inputEl.value = this._typeahead.query;
        this.lastSelected = null;
        this._typeahead.selected = null;
        return;
      }
    }

    if (
      target.value.length >= this.options.minLength &&
      this.options.showResultsWhileTyping
    ) {
      this._geocode(target.value);
    }
  },

  _showButton: function () {
    if (this._typeahead.selected) this._clearEl.style.display = "block";
  },

  _hideButton: function () {
    if (this._typeahead.selected) this._clearEl.style.display = "none";
  },

  _onBlur: function (e) {
    if (this.options.clearOnBlur) {
      this._clearOnBlur(e);
    }
    if (this.options.collapsed) {
      this._collapse();
    }
  },
  _onChange: function () {
    var selected = this._typeahead.selected;
    if (selected && JSON.stringify(selected) !== this.lastSelected) {
      this._clearEl.style.display = "none";
      if (this.options.flyTo) {
        var flyOptions;
        this._removeResultMarkers();
        if (selected.properties && exceptions[selected.properties.short_code]) {
          // Certain geocoder search results return (and therefore zoom to fit)
          // an unexpectedly large bounding box: for example, both Russia and the
          // USA span both sides of -180/180, or France includes the island of
          // Reunion in the Indian Ocean. An incomplete list of these exceptions
          // at ./exceptions.json provides "reasonable" bounding boxes as a
          // short-term solution; this may be amended as necessary.
          flyOptions = immutable({}, this.options.flyTo);
          if (this._map) {
            this._map.fitBounds(
              exceptions[selected.properties.short_code].bbox,
              flyOptions
            );
          }
        } else if (selected.bbox) {
          var bbox = selected.bbox;
          flyOptions = immutable({}, this.options.flyTo);
          if (this._map) {
            this._map.fitBounds(
              [
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]],
              ],
              flyOptions
            );
          }
        } else {
          var defaultFlyOptions = {
            zoom: this.options.zoom,
          };
          flyOptions = immutable({}, defaultFlyOptions, this.options.flyTo);
          //  ensure that center is not overriden by custom options
          if (selected.center) {
            flyOptions.center = selected.center;
          } else if (
            selected.geometry &&
            selected.geometry.type &&
            selected.geometry.type === "Point" &&
            selected.geometry.coordinates
          ) {
            flyOptions.center = selected.geometry.coordinates;
          }

          if (this._map) {
            this._map.flyTo(flyOptions);
          }
        }
      }
      if (this.options.marker && this._maplibregl) {
        this._handleMarker(selected);
      }

      // After selecting a feature, re-focus the textarea and set
      // cursor at start.
      this._inputEl.focus();
      this._inputEl.scrollLeft = 0;
      this._inputEl.setSelectionRange(0, 0);
      this.lastSelected = JSON.stringify(selected);
      this._eventEmitter.emit("result", { result: selected });
    }
  },

  _geocode: function (searchInput) {
    this._loadingEl.style.display = "block";
    this._eventEmitter.emit("loading", { query: searchInput });
    this.inputString = searchInput;
    // Possible config proprerties to pass to client
    var keys = [
      "bbox",
      "limit",
      "proximity",
      "countries",
      "types",
      "language",
      "reverseMode",
    ];
    var self = this;
    var geocoderError = null;
    // Create config object
    var config = keys.reduce(function (config, key) {
      if (self.options[key]) {
        // countries, types, and language need to be passed in as arrays to client
        // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
        ["countries", "types", "language"].indexOf(key) > -1
          ? (config[key] = self.options[key].split(/[\s,]+/))
          : (config[key] = self.options[key]);

        if (
          key === "proximity" &&
          self.options[key] &&
          typeof self.options[key].longitude === "number" &&
          typeof self.options[key].latitude === "number"
        ) {
          config[key] = [
            self.options[key].longitude,
            self.options[key].latitude,
          ];
        }
      }
      return config;
    }, {});

    var request;
    if (this.options.localGeocoderOnly) {
      request = Promise.resolve();
    }
    // check if searchInput resembles coordinates, and if it does,
    // make the request a reverseGeocode
    else if (
      this.options.reverseGeocode &&
      /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
    ) {
      // parse coordinates
      var coords = searchInput
        .split(/[\s(,)?]+/)
        .map(function (c) {
          return parseFloat(c, 10);
        })
        .reverse();

      // client only accepts one type for reverseGeocode, so
      // use first config type if one, if not default to poi
      config.types ? [config.types[0]] : ["poi"];
      config = immutable(config, { query: coords, limit: 1 });

      // drop proximity which may have been set by trackProximity since it's not supported by the reverseGeocoder
      if ("proximity" in config) {
        delete config.proximity;
      }

      request = this.geocoderApi.reverseGeocode(config);
    } else {
      config = immutable(config, { query: searchInput });
      request = this.geocoderApi.forwardGeocode(config);
    }

    var localGeocoderRes = [];
    if (this.options.localGeocoder) {
      localGeocoderRes = this.options.localGeocoder(searchInput);
      if (!localGeocoderRes) {
        localGeocoderRes = [];
      }
    }
    var externalGeocoderRes = [];

    request
      .catch(
        function (error) {
          geocoderError = error;
        }.bind(this)
      )
      .then(
        function (response) {
          this._loadingEl.style.display = "none";

          var res = {};

          if (!response) {
            res = {
              type: "FeatureCollection",
              features: [],
            };
          } else {
            res = response;
          }

          res.config = config;

          if (this.fresh) {
            this.fresh = false;
          }

          // supplement Maplibre Geocoding API results with locally populated results
          res.features = res.features
            ? localGeocoderRes.concat(res.features)
            : localGeocoderRes;

          if (this.options.externalGeocoder) {
            externalGeocoderRes =
              this.options.externalGeocoder(
                searchInput,
                res.features,
                config
              ) || [];
            // supplement Geocoding API results with features returned by a promise
            return externalGeocoderRes.then(
              function (features) {
                res.features = res.features
                  ? features.concat(res.features)
                  : features;
                return res;
              },
              function () {
                // on error, display the original result
                return res;
              }
            );
          }
          return res;
        }.bind(this)
      )
      .then(
        function (res) {
          if (geocoderError) {
            throw geocoderError;
          }

          // apply results filter if provided
          if (this.options.filter && res.features.length) {
            res.features = res.features.filter(this.options.filter);
          }

          if (res.features.length) {
            this._clearEl.style.display = "block";
            this._eventEmitter.emit("results", res);
            this._typeahead.update(res.features);
            if (
              !this.options.showResultsWhileTyping &&
              this.options.showResultMarkers
            )
              this._fitBoundsForMarkers();
          } else {
            this._clearEl.style.display = "none";
            this._typeahead.selected = null;
            this._renderNoResults();
            this._eventEmitter.emit("results", res);
          }
        }.bind(this)
      )
      .catch(
        function (err) {
          this._loadingEl.style.display = "none";

          // in the event of an error in the Geocoding API still display results from the localGeocoder
          if (
            (localGeocoderRes.length && this.options.localGeocoder) ||
            (externalGeocoderRes.length && this.options.externalGeocoder)
          ) {
            this._clearEl.style.display = "block";
            this._typeahead.update(localGeocoderRes);
          } else {
            this._clearEl.style.display = "none";
            this._typeahead.selected = null;
            this._renderError();
          }

          this._eventEmitter.emit("results", { features: localGeocoderRes });
          this._eventEmitter.emit("error", { error: err });
        }.bind(this)
      );

    return request;
  },

  /**
   * Shared logic for clearing input
   * @param {Event} [ev] the event that triggered the clear, if available
   * @private
   *
   */
  _clear: function (ev) {
    if (ev) ev.preventDefault();
    this._inputEl.value = "";
    this._typeahead.selected = null;
    this._typeahead.clear();
    this._onChange();
    this._clearEl.style.display = "none";
    this._removeMarker();
    this._removeResultMarkers();
    this.lastSelected = null;
    this._eventEmitter.emit("clear");
    this.fresh = true;
  },

  /**
   * Clear and then focus the input.
   * @param {Event} [ev] the event that triggered the clear, if available
   *
   */
  clear: function (ev) {
    this._clear(ev);
    this._inputEl.focus();
  },

  /**
   * Clear the input, without refocusing it. Used to implement clearOnBlur
   * constructor option.
   * @param {Event} [ev] the blur event
   * @private
   */
  _clearOnBlur: function (ev) {
    var ctx = this;

    /*
     * If relatedTarget is not found, assume user targeted the suggestions list.
     * In that case, do not clear on blur. There are other edge cases where
     * ev.relatedTarget could be null. Clicking on list always results in null
     * relatedtarget because of upstream behavior in `suggestions`.
     *
     * The ideal solution would be to check if ev.relatedTarget is a child of
     * the list. See issue #258 for details on why we can't do that yet.
     */
    if (ev.relatedTarget) {
      ctx._clear(ev);
    }
  },

  _onQueryResult: function (response) {
    var results = response;
    if (!results.features.length) return;
    var result = results.features[0];
    this._typeahead.selected = result;
    this._inputEl.value = result.place_name;
    this._onChange();
  },

  _updateProximity: function () {
    // proximity is designed for local scale, if the user is looking at the whole world,
    // it doesn't make sense to factor in the arbitrary centre of the map
    if (!this._map) {
      return;
    }
    if (this._map.getZoom() > 9) {
      var center = this._map.getCenter().wrap();
      this.setProximity({ longitude: center.lng, latitude: center.lat });
    } else {
      this.setProximity(null);
    }
  },

  _collapse: function () {
    // do not collapse if input is in focus
    if (!this._inputEl.value && this._inputEl !== document.activeElement)
      this.container.classList.add(
        "mapboxgl-ctrl-geocoder--collapsed",
        "maplibregl-ctrl-geocoder--collapsed"
      );
  },

  _unCollapse: function () {
    this.container.classList.remove(
      "mapboxgl-ctrl-geocoder--collapsed",
      "maplibregl-ctrl-geocoder--collapsed"
    );
  },

  /**
   * Set & query the input
   * @param {string} searchInput location name or other search input
   * @returns {MaplibreGeocoder} this
   */
  query: function (searchInput) {
    this._geocode(searchInput).then(this._onQueryResult);
    return this;
  },

  _renderError: function () {
    var errorMessage =
      "<div class='mapbox-gl-geocoder--error maplibre-gl-geocoder--error'>There was an error reaching the server</div>";
    this._renderMessage(errorMessage);
  },

  _renderNoResults: function () {
    var errorMessage =
      "<div class='mapbox-gl-geocoder--error mapbox-gl-geocoder--no-results maplibre-gl-geocoder--error maplibre-gl-geocoder--no-results'>No results found</div>";
    this._renderMessage(errorMessage);
  },

  _renderMessage: function (msg) {
    this._typeahead.update([]);
    this._typeahead.selected = null;
    this._typeahead.clear();
    this._typeahead.renderError(msg);
  },

  /**
   * Get the text to use as the search bar placeholder
   *
   * If placeholder is provided in options, then use options.placeholder
   * Otherwise, if language is provided in options, then use the localized string of the first language if available
   * Otherwise use the default
   *
   * @returns {String} the value to use as the search bar placeholder
   * @private
   */
  _getPlaceholderText: function () {
    if (this.options.placeholder) return this.options.placeholder;
    if (this.options.language) {
      var firstLanguage = this.options.language.split(",")[0];
      var language = subtag.language(firstLanguage);
      var localizedValue = localization.placeholder[language];
      if (localizedValue) return localizedValue;
    }
    return "Search";
  },

  /**
   * Fits the map to the current bounds for the searched results
   *
   * @returns {MaplibreGeocoder} this
   * @private
   */
  _fitBoundsForMarkers: function () {
    if (this._typeahead.data.length < 1) return;

    var results = this._typeahead.data.slice(0, this.options.limit);

    this._clearEl.style.display = "none";

    if (this.options.flyTo && this._maplibregl) {
      if (this._map) {
        var defaultFlyOptions = { padding: 100 };
        var flyOptions = immutable({}, defaultFlyOptions, this.options.flyTo);
        var bounds = new this._maplibregl.LngLatBounds();
        results.forEach(function (feature) {
          bounds.extend(feature.geometry.coordinates);
        });

        this._map.fitBounds(bounds, flyOptions);
      }
    }

    if (results.length > 0 && this._maplibregl) {
      this._handleResultMarkers(results);
    }

    return this;
  },

  /**
   * Set input
   * @param {string} searchInput location name or other search input
   * @returns {MaplibreGeocoder} this
   */
  setInput: function (searchInput) {
    // Set input value to passed value and clear everything else.
    this._inputEl.value = searchInput;
    this._typeahead.selected = null;
    this._typeahead.clear();
    if (
      searchInput.length >= this.options.minLength &&
      this.options.showResultsWhileTyping
    ) {
      this._geocode(searchInput);
    }
    return this;
  },

  /**
   * Set proximity
   * @param {Object} proximity The new `options.proximity` value. This is a geographical point given as an object with `latitude` and `longitude` properties.
   * @returns {MaplibreGeocoder} this
   */
  setProximity: function (proximity) {
    this.options.proximity = proximity;
    return this;
  },

  /**
   * Get proximity
   * @returns {Object} The geocoder proximity
   */
  getProximity: function () {
    return this.options.proximity;
  },

  /**
   * Set the render function used in the results dropdown
   * @param {Function} fn The function to use as a render function. This function accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and returns a string.
   * @returns {MaplibreGeocoder} this
   */
  setRenderFunction: function (fn) {
    if (fn && typeof fn == "function") {
      this._typeahead.render = fn;
    }
    return this;
  },

  /**
   * Get the function used to render the results dropdown
   *
   * @returns {Function} the render function
   */
  getRenderFunction: function () {
    return this._typeahead.render;
  },

  /**
   * Get the language to use in UI elements and when making search requests
   *
   * Look first at the explicitly set options otherwise use the browser's language settings
   * @param {String} language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas.
   * @returns {MaplibreGeocoder} this
   */
  setLanguage: function (language) {
    var browserLocale =
      navigator.language || navigator.userLanguage || navigator.browserLanguage;
    this.options.language = language || this.options.language || browserLocale;
    return this;
  },

  /**
   * Get the language to use in UI elements and when making search requests
   * @returns {String} The language(s) used by the plugin, if any
   */
  getLanguage: function () {
    return this.options.language;
  },

  /**
   * Get the zoom level the map will move to when there is no bounding box on the selected result
   * @returns {Number} the map zoom
   */
  getZoom: function () {
    return this.options.zoom;
  },

  /**
   * Set the zoom level
   * @param {Number} zoom The zoom level that the map should animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
   * @returns {MaplibreGeocoder} this
   */
  setZoom: function (zoom) {
    this.options.zoom = zoom;
    return this;
  },

  /**
   * Get the parameters used to fly to the selected response, if any
   * @returns {Boolean|Object} The `flyTo` option
   */
  getFlyTo: function () {
    return this.options.flyTo;
  },

  /**
   * Set the flyTo options
   * @param {Boolean|Object} flyTo If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#flyto) or [`fitBounds`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#fitbounds) method providing control over the animation of the transition.
   */
  setFlyTo: function (flyTo) {
    this.options.flyTo = flyTo;
    return this;
  },

  /**
   * Get the value of the placeholder string
   * @returns {String} The input element's placeholder value
   */
  getPlaceholder: function () {
    return this.options.placeholder;
  },

  /**
   * Set the value of the input element's placeholder
   * @param {String} placeholder the text to use as the input element's placeholder
   * @returns {MaplibreGeocoder} this
   */
  setPlaceholder: function (placeholder) {
    this.placeholder = placeholder ? placeholder : this._getPlaceholderText();
    this._inputEl.placeholder = this.placeholder;
    this._inputEl.setAttribute("aria-label", this.placeholder);
    return this;
  },

  /**
   * Get the bounding box used by the plugin
   * @returns {Array<Number>} the bounding box, if any
   */
  getBbox: function () {
    return this.options.bbox;
  },

  /**
   * Set the bounding box to limit search results to
   * @param {Array<Number>} bbox a bounding box given as an array in the format [minX, minY, maxX, maxY].
   * @returns {MaplibreGeocoder} this
   */
  setBbox: function (bbox) {
    this.options.bbox = bbox;
    return this;
  },

  /**
   * Get a list of the countries to limit search results to
   * @returns {String} a comma separated list of countries to limit to, if any
   */
  getCountries: function () {
    return this.options.countries;
  },

  /**
   * Set the countries to limit search results to
   * @param {String} countries a comma separated list of countries to limit to
   * @returns {MaplibreGeocoder} this
   */
  setCountries: function (countries) {
    this.options.countries = countries;
    return this;
  },

  /**
   * Get a list of the types to limit search results to
   * @returns {String} a comma separated list of types to limit to
   */
  getTypes: function () {
    return this.options.types;
  },

  /**
   * Set the types to limit search results to
   * @param {String} countries a comma separated list of types to limit to
   * @returns {MaplibreGeocoder} this
   */
  setTypes: function (types) {
    this.options.types = types;
    return this;
  },

  /**
   * Get the minimum number of characters typed to trigger results used in the plugin
   * @returns {Number} The minimum length in characters before a search is triggered
   */
  getMinLength: function () {
    return this.options.minLength;
  },

  /**
   * Set the minimum number of characters typed to trigger results used by the plugin
   * @param {Number} minLength the minimum length in characters
   * @returns {MaplibreGeocoder} this
   */
  setMinLength: function (minLength) {
    this.options.minLength = minLength;
    if (this._typeahead) this._typeahead.options.minLength = minLength;
    return this;
  },

  /**
   * Get the limit value for the number of results to display used by the plugin
   * @returns {Number} The limit value for the number of results to display used by the plugin
   */
  getLimit: function () {
    return this.options.limit;
  },

  /**
   * Set the limit value for the number of results to display used by the plugin
   * @param {Number} limit the number of search results to return
   * @returns {MaplibreGeocoder}
   */
  setLimit: function (limit) {
    this.options.limit = limit;
    if (this._typeahead) this._typeahead.options.limit = limit;
    return this;
  },

  /**
   * Get the filter function used by the plugin
   * @returns {Function} the filter function
   */
  getFilter: function () {
    return this.options.filter;
  },

  /**
   * Set the filter function used by the plugin.
   * @param {Function} filter A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
   * @returns {MaplibreGeocoder} this
   */
  setFilter: function (filter) {
    this.options.filter = filter;
    return this;
  },

  /**
   * Set the geocoding api used by the plugin.
   * @param {Object} geocoderApi An API which contains reverseGeocode and forwardGeocode functions to be used by this plugin
   * @param {Function} geocoderApi.forwardGeocode Forward geocode function should return an object including a collection of Features in [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format
   * @param {Object} geocoderApi.forwardGeocode.config Query parameters
   * @param {String} geocoderApi.forwardGeocode.config.query Search query string
   * @param {Number} geocoderApi.forwardGeocode.config.limit Number of results to limit by
   * @param {Array} geocoderApi.forwardGeocode.config.bbox a bounding box given as an array in the format `[minX, minY, maxX, maxY]`. Search results will be limited to the bounding box.
   * @param {Object} geocoderApi.forwardGeocode.config.proximity a geographical point given as an object with `latitude` and `longitude` properties. Search results closer to this point will be given higher priority.
   * @param {Array} geocoderApi.forwardGeocode.config.countries a comma separated list of country codes to limit results to specified country or countries.
   * @param {Array} geocoderApi.forwardGeocode.config.types a comma seperated list of types that filter results to match those specified. See https://docs.mapbox.com/api/search/#data-types for available types. If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
   * @param {String} geocoderApi.forwardGeocode.config.language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
   * @param {distance|score} geocoderApi.forwardGeocode.config.reverseMode Set the factors that are used to sort nearby results.
   *
   * @param {Function} geocoderApi.reverseGeocode Reverse geocode function should return an object including a collection of Features in [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format
   * @param {Object} geocoderApi.reverseGeocode.config Query parameters
   * @param {Object} geocoderApi.reverseGeocode.config.query Search query coordinates
   * @param {Number} geocoderApi.reverseGeocode.config.limit Number of results to limit by
   * @param {Array} geocoderApi.reverseGeocode.config.bbox a bounding box given as an array in the format `[minX, minY, maxX, maxY]`. Search results will be limited to the bounding box.
   * @param {Object} geocoderApi.reverseGeocode.config.proximity a geographical point given as an object with `latitude` and `longitude` properties. Search results closer to this point will be given higher priority.
   * @param {Array} geocoderApi.reverseGeocode.config.countries a comma separated list of country codes to limit results to specified country or countries.
   * @param {Array} geocoderApi.reverseGeocode.config.types a comma seperated list of types that filter results to match those specified. See https://docs.mapbox.com/api/search/#data-types for available types. If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
   * @param {String} geocoderApi.reverseGeocode.config.language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
   * @param {distance|score} geocoderApi.reverseGeocode.config.reverseMode Set the factors that are used to sort nearby results.
   * @returns {MaplibreGeocoder} this
   */
  setGeocoderApi: function (geocoderApi) {
    this.geocoderApi = geocoderApi;
    return this;
  },

  /**
   * Get the geocoding endpoint the plugin is currently set to
   * @returns {Object} the geocoding API
   */
  getGeocoderApi: function () {
    return this.geocoderApi;
  },

  /**
   * Handle the placement of a result marking the selected result
   * @private
   * @param {Object} selected the selected geojson feature
   * @returns {MaplibreGeocoder} this
   */
  _handleMarker: function (selected) {
    // clean up any old marker that might be present
    if (!this._map) {
      return;
    }
    this._removeMarker();
    var defaultMarkerOptions = {
      color: "#4668F2",
    };
    var markerOptions = immutable({}, defaultMarkerOptions, this.options.marker);
    this.mapMarker = new this._maplibregl.Marker(markerOptions);

    var popup;
    if (this.options.popup) {
      var defaultPopupOptions = {};
      var popupOptions = immutable({}, defaultPopupOptions, this.options.popup);
      popup = new this._maplibregl.Popup(popupOptions).setHTML(
        this.options.popupRender(selected)
      );
    }

    if (selected.center) {
      this.mapMarker.setLngLat(selected.center).addTo(this._map);

      if (this.options.popup) this.mapMarker.setPopup(popup);
    } else if (
      selected.geometry &&
      selected.geometry.type &&
      selected.geometry.type === "Point" &&
      selected.geometry.coordinates
    ) {
      this.mapMarker.setLngLat(selected.geometry.coordinates).addTo(this._map);

      if (this.options.popup) this.mapMarker.setPopup(popup);
    }
    return this;
  },

  /**
   * Handle the removal of a result marker
   * @private
   */
  _removeMarker: function () {
    if (this.mapMarker) {
      this.mapMarker.remove();
      this.mapMarker = null;
    }
  },

  /**
   * Handle the placement of a result marking the selected result
   * @private
   * @param {Object[]} results the top results to display on the map
   * @returns {MaplibreGeocoder} this
   */
  _handleResultMarkers: function (results) {
    // clean up any old marker that might be present
    if (!this._map) {
      return;
    }
    this._removeResultMarkers();
    var defaultMarkerOptions = {
      color: "#4668F2",
    };
    var markerOptions = immutable(
      {},
      defaultMarkerOptions,
      this.options.showResultMarkers
    );

    results.forEach(
      function (result) {
        if (
          this.options.showResultMarkers &&
          this.options.showResultMarkers.element
        ) {
          var el = this.options.showResultMarkers.element.cloneNode(true);
          markerOptions = immutable(markerOptions, { element: el });
        }

        var marker = new this._maplibregl.Marker(
          immutable({}, markerOptions, { element: el })
        );

        var popup;
        if (this.options.popup) {
          var defaultPopupOptions = {};
          var popupOptions = immutable(
            {},
            defaultPopupOptions,
            this.options.popup
          );
          popup = new this._maplibregl.Popup(popupOptions).setHTML(
            this.options.popupRender(result)
          );
        }
        if (result.center) {
          marker.setLngLat(result.center).addTo(this._map);
          if (this.options.popup) marker.setPopup(popup);
        } else if (
          result.geometry &&
          result.geometry.type &&
          result.geometry.type === "Point" &&
          result.geometry.coordinates
        ) {
          marker.setLngLat(result.geometry.coordinates).addTo(this._map);
          if (this.options.popup) marker.setPopup(popup);
        }
        this.resultMarkers.push(marker);
      }.bind(this)
    );
    return this;
  },

  /**
   * Handle the removal of a result marker
   * @private
   */
  _removeResultMarkers: function () {
    if (this.resultMarkers && this.resultMarkers.length > 0) {
      this.resultMarkers.forEach(function (marker) {
        marker.remove();
      });
      this.resultMarkers = [];
    }
  },

  /**
   * Subscribe to events that happen within the plugin.
   * @param {String} type name of event. Available events and the data passed into their respective event objects are:
   *
   * - __clear__ `Emitted when the input is cleared`
   * - __loading__ `{ query } Emitted when the geocoder is looking up a query`
   * - __results__ `{ results } Fired when the geocoder returns a response`
   * - __result__ `{ result } Fired when input is set`
   * - __error__ `{ error } Error as string`
   * @param {Function} fn function that's called when the event is emitted.
   * @returns {MaplibreGeocoder} this;
   */
  on: function (type, fn) {
    this._eventEmitter.on(type, fn);
    return this;
  },

  /**
   * Remove an event
   * @returns {MaplibreGeocoder} this
   * @param {String} type Event name.
   * @param {Function} fn Function that should unsubscribe to the event emitted.
   */
  off: function (type, fn) {
    this._eventEmitter.removeListener(type, fn);
    return this;
  },
};

var lib = MaplibreGeocoder;

var _excluded = ["accessToken"];

if (!maplibreGl) {
  throw new Error('mapboxgl is not installed.');
}

if (!lib) {
  throw new Error('MapboxGeocoder is not installed.');
}
/**
 ** Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @see https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#parameters
 * @type {object}
 */


var props = {
  accessToken: {
    type: String,
    default: 'no-token'
  },
  zoom: {
    type: Number,
    default: function _default() {
      return 16;
    }
  },
  flyTo: {
    type: [Boolean, Object],
    default: function _default() {
      return true;
    }
  },
  placeholder: {
    type: String,
    default: function _default() {
      return 'Search';
    }
  },
  proximity: {
    type: Object,
    default: function _default() {}
  },
  trackProximity: {
    type: Boolean,
    default: function _default() {
      return true;
    }
  },
  collapsed: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  },
  clearAndBlurOnEsc: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  },
  clearOnBlur: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  },
  bbox: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  countries: {
    type: String,
    default: function _default() {
      return '';
    }
  },
  types: {
    type: String,
    default: function _default() {
      return '';
    }
  },
  minLength: {
    type: Number,
    default: function _default() {
      return 2;
    }
  },
  limit: {
    type: Number,
    default: function _default() {
      return 5;
    }
  },
  language: {
    type: String
  },
  filter: {
    type: Function
  },
  localGeocoder: {
    type: Function
  },
  reverseMode: {
    type: String,
    default: function _default() {
      return 'distance';
    }
  },
  reverseGeocode: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  },
  enableEventLogging: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  },
  marker: {
    type: Boolean,
    default: function _default() {
      return true;
    }
  },
  render: {
    type: Function
  },
  getItemValue: {
    type: Function,
    default: function _default(item) {
      return item.place_name;
    }
  },
  mode: {
    type: String,
    default: function _default() {
      return 'mapbox.places';
    }
  },
  localGeocoderOnly: {
    type: Boolean,
    default: function _default() {
      return false;
    }
  }
};
/**
 * All Map events which will be mapped/bounded to the component
 * @see  https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#on
 * @type {Array}
 */

var events = ['loading', 'results', 'result', 'error'];
var script = {
  name: 'MapboxGeocoder',
  mixins: [injectMap()],
  props: props,
  mounted: function mounted() {
    var _this$$props = this.$props,
        accessToken = _this$$props.accessToken,
        $props = _objectWithoutProperties(_this$$props, _excluded); // Delete the `reverseMode` property if we are not reverse geocoding as it is not supported by
    // the Mapbox SDK.
    //
    // The `reverseMode` option can not be supported yet as it is conditionned by the search
    // query format following a specific regex:
    //
    // ```js
    //  /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
    // ```
    //
    // @todo use the same regex as the mapbox-gl-geocoder lib or open an issue
    //
    // @see https://github.com/mapbox/mapbox-sdk-js/blob/main/services/geocoding.js (92-104)
    // @see https://github.com/mapbox/mapbox-sdk-js/blob/main/services/geocoding.js (161-172)
    // @see https://github.com/mapbox/mapbox-gl-geocoder/blob/master/lib/index.js (437-458)
    // eslint-disable-next-line no-constant-condition


    if (!$props.reverseGeocode || true) {
      delete $props.reverseMode;
    }

    this.control = new lib(_objectSpread2({
      accessToken: maplibreGl.accessToken || accessToken,
      maplibre: maplibreGl
    }, $props)); // Bind events

    bindEvents(this, this.control, events);
    this.$emit('mb-created', this.control);
    this.control.addTo(this.map || this.$el);
  },
  destroyed: function destroyed() {
    unbindEvents(this, this.control);

    if (this.map) {
      this.map.removeControl(this.control);
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

export { __vue_component__ as default };
//# sourceMappingURL=MapboxGeocoder.js.map
