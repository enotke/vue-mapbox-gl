import require$$0 from 'events';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
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
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Get a prefixed or not uniq id
 * @param  {String} prefix The prefix to add to the generated id
 * @return {String}        A (prefixed) uniq id
 */
function uniqId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var uniq = new Date().getTime() + Math.floor(Math.random() * 10000 + 1);
  return prefix ? prefix + uniq.toString(16) : uniq.toString(16);
}

/**
 * Provide to children components a $map function to retrieve a map object
 *
 * @return {Object}
 */
var provideMap = function provideMap() {
  return {
    data: function data() {
      return {
        map: null
      };
    },
    provide: function provide() {
      var _this = this;

      return {
        $map: function $map() {
          return _this.map;
        }
      };
    }
  };
};
/**
 * Inject from parent component a $map function to retrieve a map object
 *
 * @return {Object}
 */

var injectMap = function injectMap() {
  return {
    inject: {
      $map: {
        default: null
      }
    },
    computed: {
      map: function map() {
        return typeof this.$map === 'function' ? this.$map() : null;
      }
    }
  };
};

/**
 * Map a mapbox element's events to the given vue element
 *
 * @param  {Vue}    vueElement    The Vue component in question
 * @param  {Mixed}  mapboxElement The Mapbox element bound to the component
 * @param  {Array}  events        The events to map
 * @param  {String} layerId       The layer on which the events are delegated
 * @return {Array}                The list of event/handler pair bounded
 */
function bindEvents(vueElement, mapboxElement) {
  var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var layerId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var vueEvents = vueElement.$listeners; // eslint-disable-next-line no-param-reassign

  vueElement.$$events = Object.keys(vueEvents).reduce(function ($$events, vueEvent) {
    var originalEvent = vueEvent.replace(/^mb-/, '');

    if (!events.includes(originalEvent)) {
      return $$events;
    }

    var handler = function handler() {
      for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
        payload[_key] = arguments[_key];
      }

      vueElement.$emit.apply(vueElement, [vueEvent].concat(payload));
    }; // If layerId is not null, all events must be
    // delegated from the map to the given layerId


    if (layerId) {
      mapboxElement.on(originalEvent, layerId, handler);
    } else {
      mapboxElement.on(originalEvent, handler);
    }

    $$events.push([originalEvent, handler]);
    return $$events;
  }, []);
}
/**
 * Unbind events from the map element
 *
 * @param  {Mixed} mapboxElement The Mapbox element which needs unbinding
 * @param  {Array}  handlers     The list of event/handler pair to unbind
 * @param  {String} layerId      The layer on which the events where delegated
 * @return {void}
 */

function unbindEvents(vueElement, mapboxElement) {
  var layerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  vueElement.$$events.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        event = _ref2[0],
        handler = _ref2[1];

    // If layerId is not null, all events must be
    // delegated from the map to the given layerId
    if (layerId) {
      mapboxElement.off(event, layerId, handler);
    } else {
      mapboxElement.off(event, handler);
    }
  });
}

/**
 * All Map events which will be mapped/bounded to the component
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#on
 * @type {Array}
 */

var events$5 = ['mousedown', 'mouseup', 'click', 'dblclick', 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'contextmenu', 'touchstart', 'touchend', 'touchcancel'];
var script$a = {
  name: 'MapboxLayer',
  mixins: [injectMap()],
  props: {
    /**
     * Id of the layer
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
     * @type {String}
     */
    id: {
      type: String,
      required: true
    },

    /**
     * Options for the layer
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
     * @see  https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
     * @type {Object}
     */
    options: {
      type: Object,
      default: function _default() {}
    },

    /**
     * The ID of an existing layer to insert the new layer before.
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
     * @type {String}
     */
    beforeId: {
      type: String,
      default: undefined
    }
  },
  mounted: function mounted() {
    // Make sure to remove any existing layer and/or source to avoid conflicts
    if (this.layerExists()) {
      this.map.removeLayer(this.id);
    }

    if (this.sourceExists()) {
      this.map.removeSource(this.id);
    } // Bind events


    bindEvents(this, this.map, events$5, this.id);

    if (this.options.paint === null || this.options.paint === undefined) {
      delete this.options.paint;
    }

    if (this.options.layout === null || this.options.layout === undefined) {
      delete this.options.layout;
    }

    this.map.addLayer(_objectSpread2(_objectSpread2({}, this.options), {}, {
      id: this.id
    }), this.beforeId);
  },
  destroyed: function destroyed() {
    if (this.layerExists()) {
      unbindEvents(this, this.map, this.id);
      this.map.removeLayer(this.id);
    }

    if (this.sourceExists()) {
      this.map.removeSource(this.id);
    }
  },
  methods: {
    /**
     * Test if the component's layer exists
     * @return {Boolean}
     */
    layerExists: function layerExists() {
      return typeof this.map.getLayer(this.id) !== 'undefined';
    },

    /**
     * Test if a source with the layer's ID exists
     * @return {Boolean}
     */
    sourceExists: function sourceExists() {
      return typeof this.map.getSource(this.id) !== 'undefined';
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  });
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

//
var script$9 = {
  name: 'MapboxSource',
  mixins: [injectMap()],
  props: {
    options: {
      type: Object,
      default: function _default() {}
    },
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    'options.data': function watchOptionsData(newData) {
      this.map.getSource(this.id).setData(newData);
    }
  },
  mounted: function mounted() {
    this.map.addSource(this.id, this.options);
  },
  destroyed: function destroyed() {
    var _this = this;

    // Remove all layers tied to the source
    var layers = this.map.style._layers;
    Object.values(layers).forEach(function (value) {
      if (value.source === _this.id) {
        _this.map.removeLayer(value.id);
      }
    }); // And remove the source

    this.map.removeSource(this.id);
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  });
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

var script$8 = {
  name: 'MapboxCluster',
  components: {
    MapboxLayer: __vue_component__$a,
    MapboxSource: __vue_component__$9
  },
  mixins: [injectMap()],
  props: {
    /**
     * The source of the data for the clustered points,
     * must be a String or an Object of GeoJSON format.
     * @type {String|GeoJSON}
     */
    data: {
      type: [String, Object],
      required: true
    },

    /**
     * The max zoom to cluster points on
     * @type {Number}
     */
    clusterMaxZoom: {
      type: Number,
      default: 14
    },

    /**
     * Radius of each cluster when clustering point
     * @type {Number}
     */
    clusterRadius: {
      type: Number,
      default: 50
    },

    /**
     * The layout configuration for the clusters circles
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    clustersLayout: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * The paint configuration for the clusters circles
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    clustersPaint: {
      type: Object,
      default: function _default() {
        return {
          'circle-color': '#000',
          'circle-radius': 40
        };
      }
    },

    /**
     * The layout configuration for the clusters count
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    clusterCountLayout: {
      type: Object,
      default: function _default() {
        return {
          'text-field': ['get', 'point_count_abbreviated']
        };
      }
    },

    /**
     * The paint configuration for the clusters count
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    clusterCountPaint: {
      type: Object,
      default: function _default() {
        return {
          'text-color': 'white'
        };
      }
    },

    /**
     * The type of the unclustered points layer
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {String}
     */
    unclusteredPointLayerType: {
      type: String,
      default: 'circle'
    },

    /**
     * The layout configuration for the unclustered points
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    unclusteredPointLayout: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * The paint configuration for the unclustered points
     * @see  https://docs.mapbox.com/mapbox-gl-js/example/cluster/
     * @type {Object}
     */
    unclusteredPointPaint: {
      type: Object,
      default: function _default() {
        return {
          'circle-color': '#000',
          'circle-radius': 4
        };
      }
    }
  },
  data: function data() {
    return {
      id: uniqId('mb-cluster-')
    };
  },
  computed: {
    /**
     * The source ID
     * @type {String}
     */
    sourceId: function sourceId() {
      return this.getId('source');
    },

    /**
     * The source configuration
     * @type {Object}
     */
    source: function source() {
      var _this$$props = this.$props,
          data = _this$$props.data,
          clusterMaxZoom = _this$$props.clusterMaxZoom,
          clusterRadius = _this$$props.clusterRadius;
      return {
        type: 'geojson',
        cluster: true,
        data: data,
        clusterMaxZoom: clusterMaxZoom,
        clusterRadius: clusterRadius
      };
    },

    /**
     * The clusters layer configuration
     * @type {Object}
     */
    clustersLayer: function clustersLayer() {
      return {
        id: this.getId('clusters'),
        type: 'circle',
        source: this.sourceId,
        filter: ['has', 'point_count'],
        layout: this.clustersLayout,
        paint: this.clustersPaint
      };
    },

    /**
     * The cluster count layer configuration
     * @type {Object}
     */
    clusterCountLayer: function clusterCountLayer() {
      return {
        id: this.getId('cluster-count'),
        type: 'symbol',
        source: this.sourceId,
        filter: ['has', 'point_count'],
        layout: this.clusterCountLayout,
        paint: this.clusterCountPaint
      };
    },

    /**
     * The unclustered points layer
     * @type {Object}
     */
    unclusteredPointLayer: function unclusteredPointLayer() {
      return {
        id: this.getId('unclustered-point'),
        type: this.unclusteredPointLayerType,
        source: this.sourceId,
        filter: ['!', ['has', 'point_count']],
        layout: this.unclusteredPointLayout,
        paint: this.unclusteredPointPaint
      };
    }
  },
  methods: {
    /**
     * Get a suffixed ID based on the instance ID
     *
     * @param  {String} suffix The suffix of the ID
     * @return {String}        The formatted ID
     */
    getId: function getId(suffix) {
      return "".concat(this.id, "-").concat(suffix);
    },

    /**
     * Click handler for the clusters layer to zoom on the clicked cluster
     *
     * @param  {Object} event The Mapbox click event's object
     * @return {void}
     */
    clustersClickHandler: function clustersClickHandler(event) {
      var _this = this;

      var feature = this.map.queryRenderedFeatures(event.point, {
        layers: [this.clustersLayer.id]
      })[0];
      var clusterId = feature.properties.cluster_id; // Emit a cluster click event

      this.$emit('mb-cluster-click', clusterId, event);
      this.map.getSource(this.sourceId).getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) {
          return;
        }

        _this.map.easeTo({
          center: feature.geometry.coordinates,
          zoom: zoom
        });
      });
    },

    /**
     * Mouseenter handler for the clusters layer to set a pointer cursor
     *
     * @return {void}
     */
    clustersMouseenterHandler: function clustersMouseenterHandler() {
      this.map.getCanvas().style.cursor = 'pointer';
    },

    /**
     * Mouseleave handler for the clusters layer to unset the pointer cursor
     *
     * @return {void}
     */
    clustersMouseleaveHandler: function clustersMouseleaveHandler() {
      this.map.getCanvas().style.cursor = '';
    },

    /**
     * Handler for the click event on a single feature, emits an event with
     * the feature object and the original event object
     *
     * @param  {Object} event The Mapbox click event's object
     * @return {void}
     */
    unclusteredPointClickHandler: function unclusteredPointClickHandler(event) {
      var _event$features = _slicedToArray(event.features, 1),
          feature = _event$features[0];

      this.$emit('mb-feature-click', feature, event);
    },

    /**
     * Handler for the mouseenter event on a single feature.
     * Emits an event with the feature object and the original event as
     * parameters, and sets the cursor style to pointer.
     *
     * @param  {Object} event The Mapbox mouseenter event's object
     * @return {void}
     */
    unclusteredPointMouseenterHandler: function unclusteredPointMouseenterHandler(event) {
      var _event$features2 = _slicedToArray(event.features, 1),
          feature = _event$features2[0];

      this.$emit('mb-feature-mouseenter', feature, event);
      this.map.getCanvas().style.cursor = 'pointer';
    },

    /**
     * Handler for the mouseleave event on a single feature.
     * Emits an event with the original event object as parameter, and resets
     * the cursor style to its default value.
     *
     * @param  {Object} event The Mapbox mouselvea event‘s object
     * @return {void}
     */
    unclusteredPointMouseleaveHandler: function unclusteredPointMouseleaveHandler(event) {
      this.$emit('mb-feature-mouseleave', event);
      this.map.getCanvas().style.cursor = '';
    }
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  }, [_c('mapbox-source', {
    attrs: {
      "id": _vm.sourceId,
      "options": _vm.source
    }
  }), _vm._v(" "), _c('mapbox-layer', {
    attrs: {
      "id": _vm.clustersLayer.id,
      "options": _vm.clustersLayer
    },
    on: {
      "click": _vm.clustersClickHandler,
      "mouseenter": _vm.clustersMouseenterHandler,
      "mouseleave": _vm.clustersMouseleaveHandler
    }
  }), _vm._v(" "), _c('mapbox-layer', {
    attrs: {
      "id": _vm.clusterCountLayer.id,
      "options": _vm.clusterCountLayer
    }
  }), _vm._v(" "), _c('mapbox-layer', {
    attrs: {
      "id": _vm.unclusteredPointLayer.id,
      "options": _vm.unclusteredPointLayer
    },
    on: {
      "click": _vm.unclusteredPointClickHandler,
      "mouseenter": _vm.unclusteredPointMouseenterHandler,
      "mouseleave": _vm.unclusteredPointMouseleaveHandler
    }
  })], 1);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var maplibreGl = createCommonjsModule(function (module, exports) {
/* MapLibre GL JS is licensed under the 3-Clause BSD License. Full text of license: https://github.com/maplibre/maplibre-gl-js/blob/v2.0.0-pre.4/LICENSE.txt */
(function (global, factory) {
module.exports = factory() ;
}(commonjsGlobal, (function () {
/* eslint-disable */

var shared, worker, maplibregl;
// define gets called three times: one for each chunk. we rely on the order
// they're imported to know which is which
function define(_, chunk) {
    if (!shared) {
        shared = chunk;
    } else if (!worker) {
        worker = chunk;
    } else {
        var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);';

        var sharedChunk = {};
        shared(sharedChunk);
        maplibregl = chunk(sharedChunk);
        if (typeof window !== 'undefined') {
            maplibregl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
        }
    }
}


define(["exports"],(function(t){var e=r;function r(t,e,r,n){this.cx=3*t,this.bx=3*(r-t)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*e,this.by=3*(n-e)-this.cy,this.ay=1-this.cy-this.by,this.p1x=t,this.p1y=n,this.p2x=r,this.p2y=n;}function n(t,r,n,i){const s=new e(t,r,n,i);return function(t){return s.solve(t)}}r.prototype.sampleCurveX=function(t){return ((this.ax*t+this.bx)*t+this.cx)*t},r.prototype.sampleCurveY=function(t){return ((this.ay*t+this.by)*t+this.cy)*t},r.prototype.sampleCurveDerivativeX=function(t){return (3*this.ax*t+2*this.bx)*t+this.cx},r.prototype.solveCurveX=function(t,e){var r,n,i,s,a;for(void 0===e&&(e=1e-6),i=t,a=0;a<8;a++){if(s=this.sampleCurveX(i)-t,Math.abs(s)<e)return i;var o=this.sampleCurveDerivativeX(i);if(Math.abs(o)<1e-6)break;i-=s/o;}if((i=t)<(r=0))return r;if(i>(n=1))return n;for(;r<n;){if(s=this.sampleCurveX(i),Math.abs(s-t)<e)return i;t>s?r=i:n=i,i=.5*(n-r)+r;}return i},r.prototype.solve=function(t,e){return this.sampleCurveY(this.solveCurveX(t,e))};const i=n(.25,.1,.25,1);function s(t,e,r){return Math.min(r,Math.max(e,t))}function a(t,e,r){const n=r-e,i=((t-e)%n+n)%n+e;return i===e?r:i}function o(t,...e){for(const r of e)for(const e in r)t[e]=r[e];return t}let l=1;function u(t,e){t.forEach((t=>{e[t]&&(e[t]=e[t].bind(e));}));}function c(t,e,r){const n={};for(const i in t)n[i]=e.call(r||this,t[i],i,t);return n}function h(t,e,r){const n={};for(const i in t)e.call(r||this,t[i],i,t)&&(n[i]=t[i]);return n}function p(t){return Array.isArray(t)?t.map(p):"object"==typeof t&&t?c(t,p):t}const f={};function d(t){f[t]||("undefined"!=typeof console&&console.warn(t),f[t]=!0);}function y(t,e,r){return (r.y-t.y)*(e.x-t.x)>(e.y-t.y)*(r.x-t.x)}function m(t){let e=0;for(let r,n,i=0,s=t.length,a=s-1;i<s;a=i++)r=t[i],n=t[a],e+=(n.x-r.x)*(r.y+n.y);return e}function g(){return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function x(t){const e={};if(t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,((t,r,n,i)=>{const s=n||i;return e[r]=!s||s.toLowerCase(),""})),e["max-age"]){const t=parseInt(e["max-age"],10);isNaN(t)?delete e["max-age"]:e["max-age"]=t;}return e}let v,b,w=null;function _(t){if(null==w){const e=t.navigator?t.navigator.userAgent:null;w=!!t.safari||!(!e||!(/\b(iPad|iPhone|iPod)\b/.test(e)||e.match("Safari")&&!e.match("Chrome")));}return w}function A(t){return "undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap}const k={now:performance&&performance.now?performance.now.bind(performance):Date.now.bind(Date),frame(t){const e=requestAnimationFrame(t);return {cancel:()=>cancelAnimationFrame(e)}},getImageData(t,e=0){const r=window.document.createElement("canvas"),n=r.getContext("2d");if(!n)throw new Error("failed to create canvas 2d context");return r.width=t.width,r.height=t.height,n.drawImage(t,0,0,t.width,t.height),n.getImageData(-e,-e,t.width+2*e,t.height+2*e)},resolveURL:t=>(v||(v=document.createElement("a")),v.href=t,v.href),hardwareConcurrency:navigator&&navigator.hardwareConcurrency||4,get prefersReducedMotion(){return !!matchMedia&&(null==b&&(b=matchMedia("(prefers-reduced-motion: reduce)")),b.matches)}};var S=z;function z(t,e,r){var n=this.cells=[];if(t instanceof ArrayBuffer){this.arrayBuffer=t;var i=new Int32Array(this.arrayBuffer);t=i[0],this.d=(e=i[1])+2*(r=i[2]);for(var s=0;s<this.d*this.d;s++){var a=i[3+s],o=i[3+s+1];n.push(a===o?null:i.subarray(a,o));}var l=i[3+n.length+1];this.keys=i.subarray(i[3+n.length],l),this.bboxes=i.subarray(l),this.insert=this._insertReadonly;}else {this.d=e+2*r;for(var u=0;u<this.d*this.d;u++)n.push([]);this.keys=[],this.bboxes=[];}this.n=e,this.extent=t,this.padding=r,this.scale=e/t,this.uid=0;var c=r/e*t;this.min=-c,this.max=t+c;}z.prototype.insert=function(t,e,r,n,i){this._forEachCell(e,r,n,i,this._insertCell,this.uid++),this.keys.push(t),this.bboxes.push(e),this.bboxes.push(r),this.bboxes.push(n),this.bboxes.push(i);},z.prototype._insertReadonly=function(){throw "Cannot insert into a GridIndex created from an ArrayBuffer."},z.prototype._insertCell=function(t,e,r,n,i,s){this.cells[i].push(s);},z.prototype.query=function(t,e,r,n,i){var s=this.min,a=this.max;if(t<=s&&e<=s&&a<=r&&a<=n&&!i)return Array.prototype.slice.call(this.keys);var o=[];return this._forEachCell(t,e,r,n,this._queryCell,o,{},i),o},z.prototype._queryCell=function(t,e,r,n,i,s,a,o){var l=this.cells[i];if(null!==l)for(var u=this.keys,c=this.bboxes,h=0;h<l.length;h++){var p=l[h];if(void 0===a[p]){var f=4*p;(o?o(c[f+0],c[f+1],c[f+2],c[f+3]):t<=c[f+2]&&e<=c[f+3]&&r>=c[f+0]&&n>=c[f+1])?(a[p]=!0,s.push(u[p])):a[p]=!1;}}},z.prototype._forEachCell=function(t,e,r,n,i,s,a,o){for(var l=this._convertToCellCoord(t),u=this._convertToCellCoord(e),c=this._convertToCellCoord(r),h=this._convertToCellCoord(n),p=l;p<=c;p++)for(var f=u;f<=h;f++){var d=this.d*f+p;if((!o||o(this._convertFromCellCoord(p),this._convertFromCellCoord(f),this._convertFromCellCoord(p+1),this._convertFromCellCoord(f+1)))&&i.call(this,t,e,r,n,d,s,a,o))return}},z.prototype._convertFromCellCoord=function(t){return (t-this.padding)/this.scale},z.prototype._convertToCellCoord=function(t){return Math.max(0,Math.min(this.d-1,Math.floor(t*this.scale)+this.padding))},z.prototype.toArrayBuffer=function(){if(this.arrayBuffer)return this.arrayBuffer;for(var t=this.cells,e=3+this.cells.length+1+1,r=0,n=0;n<this.cells.length;n++)r+=this.cells[n].length;var i=new Int32Array(e+r+this.keys.length+this.bboxes.length);i[0]=this.extent,i[1]=this.n,i[2]=this.padding;for(var s=e,a=0;a<t.length;a++){var o=t[a];i[3+a]=s,i.set(o,s),s+=o.length;}return i[3+t.length]=s,i.set(this.keys,s),i[3+t.length+1]=s+=this.keys.length,i.set(this.bboxes,s),s+=this.bboxes.length,i.buffer};var I,M={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function B(t){return (t=Math.round(t))<0?0:t>255?255:t}function C(t){return B("%"===t[t.length-1]?parseFloat(t)/100*255:parseInt(t))}function P(t){return (e="%"===t[t.length-1]?parseFloat(t)/100:parseFloat(t))<0?0:e>1?1:e;var e;}function V(t,e,r){return r<0?r+=1:r>1&&(r-=1),6*r<1?t+(e-t)*r*6:2*r<1?e:3*r<2?t+(e-t)*(2/3-r)*6:t}try{I={}.parseCSSColor=function(t){var e,r=t.replace(/ /g,"").toLowerCase();if(r in M)return M[r].slice();if("#"===r[0])return 4===r.length?(e=parseInt(r.substr(1),16))>=0&&e<=4095?[(3840&e)>>4|(3840&e)>>8,240&e|(240&e)>>4,15&e|(15&e)<<4,1]:null:7===r.length&&(e=parseInt(r.substr(1),16))>=0&&e<=16777215?[(16711680&e)>>16,(65280&e)>>8,255&e,1]:null;var n=r.indexOf("("),i=r.indexOf(")");if(-1!==n&&i+1===r.length){var s=r.substr(0,n),a=r.substr(n+1,i-(n+1)).split(","),o=1;switch(s){case"rgba":if(4!==a.length)return null;o=P(a.pop());case"rgb":return 3!==a.length?null:[C(a[0]),C(a[1]),C(a[2]),o];case"hsla":if(4!==a.length)return null;o=P(a.pop());case"hsl":if(3!==a.length)return null;var l=(parseFloat(a[0])%360+360)%360/360,u=P(a[1]),c=P(a[2]),h=c<=.5?c*(u+1):c+u-c*u,p=2*c-h;return [B(255*V(p,h,l+1/3)),B(255*V(p,h,l)),B(255*V(p,h,l-1/3)),o];default:return null}}return null};}catch(t){}class E{constructor(t,e,r,n=1){this.r=t,this.g=e,this.b=r,this.a=n;}static parse(t){if(!t)return;if(t instanceof E)return t;if("string"!=typeof t)return;const e=I(t);return e?new E(e[0]/255*e[3],e[1]/255*e[3],e[2]/255*e[3],e[3]):void 0}toString(){const[t,e,r,n]=this.toArray();return `rgba(${Math.round(t)},${Math.round(e)},${Math.round(r)},${n})`}toArray(){const{r:t,g:e,b:r,a:n}=this;return 0===n?[0,0,0,0]:[255*t/n,255*e/n,255*r/n,n]}}function F(t,...e){for(const r of e)for(const e in r)t[e]=r[e];return t}E.black=new E(0,0,0,1),E.white=new E(1,1,1,1),E.transparent=new E(0,0,0,0),E.red=new E(1,0,0,1);class T extends Error{constructor(t,e){super(e),this.message=e,this.key=t;}}class L{constructor(t,e=[]){this.parent=t,this.bindings={};for(const[t,r]of e)this.bindings[t]=r;}concat(t){return new L(this,t)}get(t){if(this.bindings[t])return this.bindings[t];if(this.parent)return this.parent.get(t);throw new Error(`${t} not found in scope.`)}has(t){return !!this.bindings[t]||!!this.parent&&this.parent.has(t)}}const D={kind:"null"},$={kind:"number"},O={kind:"string"},R={kind:"boolean"},U={kind:"color"},q={kind:"object"},j={kind:"value"},N={kind:"collator"},K={kind:"formatted"},Z={kind:"resolvedImage"};function G(t,e){return {kind:"array",itemType:t,N:e}}function J(t){if("array"===t.kind){const e=J(t.itemType);return "number"==typeof t.N?`array<${e}, ${t.N}>`:"value"===t.itemType.kind?"array":`array<${e}>`}return t.kind}const X=[D,$,O,R,U,K,q,G(j),Z];function Y(t,e){if("error"===e.kind)return null;if("array"===t.kind){if("array"===e.kind&&(0===e.N&&"value"===e.itemType.kind||!Y(t.itemType,e.itemType))&&("number"!=typeof t.N||t.N===e.N))return null}else {if(t.kind===e.kind)return null;if("value"===t.kind)for(const t of X)if(!Y(t,e))return null}return `Expected ${J(t)} but found ${J(e)} instead.`}function H(t,e){return e.some((e=>e.kind===t.kind))}function W(t,e){return e.some((e=>"null"===e?null===t:"array"===e?Array.isArray(t):"object"===e?t&&!Array.isArray(t)&&"object"==typeof t:e===typeof t))}class Q{constructor(t,e,r){this.sensitivity=t?e?"variant":"case":e?"accent":"base",this.locale=r,this.collator=new Intl.Collator(this.locale?this.locale:[],{sensitivity:this.sensitivity,usage:"search"});}compare(t,e){return this.collator.compare(t,e)}resolvedLocale(){return new Intl.Collator(this.locale?this.locale:[]).resolvedOptions().locale}}class tt{constructor(t,e,r,n,i){this.text=t,this.image=e,this.scale=r,this.fontStack=n,this.textColor=i;}}class et{constructor(t){this.sections=t;}static fromString(t){return new et([new tt(t,null,null,null,null)])}isEmpty(){return 0===this.sections.length||!this.sections.some((t=>0!==t.text.length||t.image&&0!==t.image.name.length))}static factory(t){return t instanceof et?t:et.fromString(t)}toString(){return 0===this.sections.length?"":this.sections.map((t=>t.text)).join("")}serialize(){const t=["format"];for(const e of this.sections){if(e.image){t.push(["image",e.image.name]);continue}t.push(e.text);const r={};e.fontStack&&(r["text-font"]=["literal",e.fontStack.split(",")]),e.scale&&(r["font-scale"]=e.scale),e.textColor&&(r["text-color"]=["rgba"].concat(e.textColor.toArray())),t.push(r);}return t}}class rt{constructor(t){this.name=t.name,this.available=t.available;}toString(){return this.name}static fromString(t){return t?new rt({name:t,available:!1}):null}serialize(){return ["image",this.name]}}function nt(t,e,r,n){return "number"==typeof t&&t>=0&&t<=255&&"number"==typeof e&&e>=0&&e<=255&&"number"==typeof r&&r>=0&&r<=255?void 0===n||"number"==typeof n&&n>=0&&n<=1?null:`Invalid rgba value [${[t,e,r,n].join(", ")}]: 'a' must be between 0 and 1.`:`Invalid rgba value [${("number"==typeof n?[t,e,r,n]:[t,e,r]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`}function it(t){if(null===t)return !0;if("string"==typeof t)return !0;if("boolean"==typeof t)return !0;if("number"==typeof t)return !0;if(t instanceof E)return !0;if(t instanceof Q)return !0;if(t instanceof et)return !0;if(t instanceof rt)return !0;if(Array.isArray(t)){for(const e of t)if(!it(e))return !1;return !0}if("object"==typeof t){for(const e in t)if(!it(t[e]))return !1;return !0}return !1}function st(t){if(null===t)return D;if("string"==typeof t)return O;if("boolean"==typeof t)return R;if("number"==typeof t)return $;if(t instanceof E)return U;if(t instanceof Q)return N;if(t instanceof et)return K;if(t instanceof rt)return Z;if(Array.isArray(t)){const e=t.length;let r;for(const e of t){const t=st(e);if(r){if(r===t)continue;r=j;break}r=t;}return G(r||j,e)}return q}function at(t){const e=typeof t;return null===t?"":"string"===e||"number"===e||"boolean"===e?String(t):t instanceof E||t instanceof et||t instanceof rt?t.toString():JSON.stringify(t)}class ot{constructor(t,e){this.type=t,this.value=e;}static parse(t,e){if(2!==t.length)return e.error(`'literal' expression requires exactly one argument, but found ${t.length-1} instead.`);if(!it(t[1]))return e.error("invalid value");const r=t[1];let n=st(r);const i=e.expectedType;return "array"!==n.kind||0!==n.N||!i||"array"!==i.kind||"number"==typeof i.N&&0!==i.N||(n=i),new ot(n,r)}evaluate(){return this.value}eachChild(){}outputDefined(){return !0}serialize(){return "array"===this.type.kind||"object"===this.type.kind?["literal",this.value]:this.value instanceof E?["rgba"].concat(this.value.toArray()):this.value instanceof et?this.value.serialize():this.value}}class lt{constructor(t){this.name="ExpressionEvaluationError",this.message=t;}toJSON(){return this.message}}const ut={string:O,number:$,boolean:R,object:q};class ct{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");let r,n=1;const i=t[0];if("array"===i){let i,s;if(t.length>2){const r=t[1];if("string"!=typeof r||!(r in ut)||"object"===r)return e.error('The item type argument of "array" must be one of string, number, boolean',1);i=ut[r],n++;}else i=j;if(t.length>3){if(null!==t[2]&&("number"!=typeof t[2]||t[2]<0||t[2]!==Math.floor(t[2])))return e.error('The length argument to "array" must be a positive integer literal',2);s=t[2],n++;}r=G(i,s);}else r=ut[i];const s=[];for(;n<t.length;n++){const r=e.parse(t[n],n,j);if(!r)return null;s.push(r);}return new ct(r,s)}evaluate(t){for(let e=0;e<this.args.length;e++){const r=this.args[e].evaluate(t);if(!Y(this.type,st(r)))return r;if(e===this.args.length-1)throw new lt(`Expected value to be of type ${J(this.type)}, but found ${J(st(r))} instead.`)}return null}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every((t=>t.outputDefined()))}serialize(){const t=this.type,e=[t.kind];if("array"===t.kind){const r=t.itemType;if("string"===r.kind||"number"===r.kind||"boolean"===r.kind){e.push(r.kind);const n=t.N;("number"==typeof n||this.args.length>1)&&e.push(n);}}return e.concat(this.args.map((t=>t.serialize())))}}class ht{constructor(t){this.type=K,this.sections=t;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");const r=t[1];if(!Array.isArray(r)&&"object"==typeof r)return e.error("First argument must be an image or text section.");const n=[];let i=!1;for(let r=1;r<=t.length-1;++r){const s=t[r];if(i&&"object"==typeof s&&!Array.isArray(s)){i=!1;let t=null;if(s["font-scale"]&&(t=e.parse(s["font-scale"],1,$),!t))return null;let r=null;if(s["text-font"]&&(r=e.parse(s["text-font"],1,G(O)),!r))return null;let a=null;if(s["text-color"]&&(a=e.parse(s["text-color"],1,U),!a))return null;const o=n[n.length-1];o.scale=t,o.font=r,o.textColor=a;}else {const s=e.parse(t[r],1,j);if(!s)return null;const a=s.type.kind;if("string"!==a&&"value"!==a&&"null"!==a&&"resolvedImage"!==a)return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");i=!0,n.push({content:s,scale:null,font:null,textColor:null});}}return new ht(n)}evaluate(t){return new et(this.sections.map((e=>{const r=e.content.evaluate(t);return st(r)===Z?new tt("",r,null,null,null):new tt(at(r),null,e.scale?e.scale.evaluate(t):null,e.font?e.font.evaluate(t).join(","):null,e.textColor?e.textColor.evaluate(t):null)})))}eachChild(t){for(const e of this.sections)t(e.content),e.scale&&t(e.scale),e.font&&t(e.font),e.textColor&&t(e.textColor);}outputDefined(){return !1}serialize(){const t=["format"];for(const e of this.sections){t.push(e.content.serialize());const r={};e.scale&&(r["font-scale"]=e.scale.serialize()),e.font&&(r["text-font"]=e.font.serialize()),e.textColor&&(r["text-color"]=e.textColor.serialize()),t.push(r);}return t}}class pt{constructor(t){this.type=Z,this.input=t;}static parse(t,e){if(2!==t.length)return e.error("Expected two arguments.");const r=e.parse(t[1],1,O);return r?new pt(r):e.error("No image name provided.")}evaluate(t){const e=this.input.evaluate(t),r=rt.fromString(e);return r&&t.availableImages&&(r.available=t.availableImages.indexOf(e)>-1),r}eachChild(t){t(this.input);}outputDefined(){return !1}serialize(){return ["image",this.input.serialize()]}}const ft={"to-boolean":R,"to-color":U,"to-number":$,"to-string":O};class dt{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");const r=t[0];if(("to-boolean"===r||"to-string"===r)&&2!==t.length)return e.error("Expected one argument.");const n=ft[r],i=[];for(let r=1;r<t.length;r++){const n=e.parse(t[r],r,j);if(!n)return null;i.push(n);}return new dt(n,i)}evaluate(t){if("boolean"===this.type.kind)return Boolean(this.args[0].evaluate(t));if("color"===this.type.kind){let e,r;for(const n of this.args){if(e=n.evaluate(t),r=null,e instanceof E)return e;if("string"==typeof e){const r=t.parseColor(e);if(r)return r}else if(Array.isArray(e)&&(r=e.length<3||e.length>4?`Invalid rbga value ${JSON.stringify(e)}: expected an array containing either three or four numeric values.`:nt(e[0],e[1],e[2],e[3]),!r))return new E(e[0]/255,e[1]/255,e[2]/255,e[3])}throw new lt(r||`Could not parse color from value '${"string"==typeof e?e:String(JSON.stringify(e))}'`)}if("number"===this.type.kind){let e=null;for(const r of this.args){if(e=r.evaluate(t),null===e)return 0;const n=Number(e);if(!isNaN(n))return n}throw new lt(`Could not convert ${JSON.stringify(e)} to number.`)}return "formatted"===this.type.kind?et.fromString(at(this.args[0].evaluate(t))):"resolvedImage"===this.type.kind?rt.fromString(at(this.args[0].evaluate(t))):at(this.args[0].evaluate(t))}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every((t=>t.outputDefined()))}serialize(){if("formatted"===this.type.kind)return new ht([{content:this.args[0],scale:null,font:null,textColor:null}]).serialize();if("resolvedImage"===this.type.kind)return new pt(this.args[0]).serialize();const t=[`to-${this.type.kind}`];return this.eachChild((e=>{t.push(e.serialize());})),t}}const yt=["Unknown","Point","LineString","Polygon"];class mt{constructor(){this.globals=null,this.feature=null,this.featureState=null,this.formattedSection=null,this._parseColorCache={},this.availableImages=null,this.canonical=null;}id(){return this.feature&&"id"in this.feature?this.feature.id:null}geometryType(){return this.feature?"number"==typeof this.feature.type?yt[this.feature.type]:this.feature.type:null}geometry(){return this.feature&&"geometry"in this.feature?this.feature.geometry:null}canonicalID(){return this.canonical}properties(){return this.feature&&this.feature.properties||{}}parseColor(t){let e=this._parseColorCache[t];return e||(e=this._parseColorCache[t]=E.parse(t)),e}}class gt{constructor(t,e,r,n){this.name=t,this.type=e,this._evaluate=r,this.args=n;}evaluate(t){return this._evaluate(t,this.args)}eachChild(t){this.args.forEach(t);}outputDefined(){return !1}serialize(){return [this.name].concat(this.args.map((t=>t.serialize())))}static parse(t,e){const r=t[0],n=gt.definitions[r];if(!n)return e.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`,0);const i=Array.isArray(n)?n[0]:n.type,s=Array.isArray(n)?[[n[1],n[2]]]:n.overloads,a=s.filter((([e])=>!Array.isArray(e)||e.length===t.length-1));let o=null;for(const[n,s]of a){o=new Rt(e.registry,e.path,null,e.scope);const a=[];let l=!1;for(let e=1;e<t.length;e++){const r=t[e],i=Array.isArray(n)?n[e-1]:n.type,s=o.parse(r,1+a.length,i);if(!s){l=!0;break}a.push(s);}if(!l)if(Array.isArray(n)&&n.length!==a.length)o.error(`Expected ${n.length} arguments, but found ${a.length} instead.`);else {for(let t=0;t<a.length;t++){const e=Array.isArray(n)?n[t]:n.type,r=a[t];o.concat(t+1).checkSubtype(e,r.type);}if(0===o.errors.length)return new gt(r,i,s,a)}}if(1===a.length)e.errors.push(...o.errors);else {const r=(a.length?a:s).map((([t])=>{return e=t,Array.isArray(e)?`(${e.map(J).join(", ")})`:`(${J(e.type)}...)`;var e;})).join(" | "),n=[];for(let r=1;r<t.length;r++){const i=e.parse(t[r],1+n.length);if(!i)return null;n.push(J(i.type));}e.error(`Expected arguments of type ${r}, but found (${n.join(", ")}) instead.`);}return null}static register(t,e){gt.definitions=e;for(const r in e)t[r]=gt;}}class xt{constructor(t,e,r){this.type=N,this.locale=r,this.caseSensitive=t,this.diacriticSensitive=e;}static parse(t,e){if(2!==t.length)return e.error("Expected one argument.");const r=t[1];if("object"!=typeof r||Array.isArray(r))return e.error("Collator options argument must be an object.");const n=e.parse(void 0!==r["case-sensitive"]&&r["case-sensitive"],1,R);if(!n)return null;const i=e.parse(void 0!==r["diacritic-sensitive"]&&r["diacritic-sensitive"],1,R);if(!i)return null;let s=null;return r.locale&&(s=e.parse(r.locale,1,O),!s)?null:new xt(n,i,s)}evaluate(t){return new Q(this.caseSensitive.evaluate(t),this.diacriticSensitive.evaluate(t),this.locale?this.locale.evaluate(t):null)}eachChild(t){t(this.caseSensitive),t(this.diacriticSensitive),this.locale&&t(this.locale);}outputDefined(){return !1}serialize(){const t={};return t["case-sensitive"]=this.caseSensitive.serialize(),t["diacritic-sensitive"]=this.diacriticSensitive.serialize(),this.locale&&(t.locale=this.locale.serialize()),["collator",t]}}const vt=8192;function bt(t,e){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1]);}function wt(t,e){return !(t[0]<=e[0]||t[2]>=e[2]||t[1]<=e[1]||t[3]>=e[3])}function _t(t,e){const r=(180+t[0])/360,n=(180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t[1]*Math.PI/360)))/360,i=Math.pow(2,e.z);return [Math.round(r*i*vt),Math.round(n*i*vt)]}function At(t,e,r){const n=t[0]-e[0],i=t[1]-e[1],s=t[0]-r[0],a=t[1]-r[1];return n*a-s*i==0&&n*s<=0&&i*a<=0}function kt(t,e){let r=!1;for(let a=0,o=e.length;a<o;a++){const o=e[a];for(let e=0,a=o.length;e<a-1;e++){if(At(t,o[e],o[e+1]))return !1;(i=o[e])[1]>(n=t)[1]!=(s=o[e+1])[1]>n[1]&&n[0]<(s[0]-i[0])*(n[1]-i[1])/(s[1]-i[1])+i[0]&&(r=!r);}}var n,i,s;return r}function St(t,e){for(let r=0;r<e.length;r++)if(kt(t,e[r]))return !0;return !1}function zt(t,e,r,n){const i=n[0]-r[0],s=n[1]-r[1],a=(t[0]-r[0])*s-i*(t[1]-r[1]),o=(e[0]-r[0])*s-i*(e[1]-r[1]);return a>0&&o<0||a<0&&o>0}function It(t,e,r){for(const u of r)for(let r=0;r<u.length-1;++r)if(0!=(o=[(a=u[r+1])[0]-(s=u[r])[0],a[1]-s[1]])[0]*(l=[(i=e)[0]-(n=t)[0],i[1]-n[1]])[1]-o[1]*l[0]&&zt(n,i,s,a)&&zt(s,a,n,i))return !0;var n,i,s,a,o,l;return !1}function Mt(t,e){for(let r=0;r<t.length;++r)if(!kt(t[r],e))return !1;for(let r=0;r<t.length-1;++r)if(It(t[r],t[r+1],e))return !1;return !0}function Bt(t,e){for(let r=0;r<e.length;r++)if(Mt(t,e[r]))return !0;return !1}function Ct(t,e,r){const n=[];for(let i=0;i<t.length;i++){const s=[];for(let n=0;n<t[i].length;n++){const a=_t(t[i][n],r);bt(e,a),s.push(a);}n.push(s);}return n}function Pt(t,e,r){const n=[];for(let i=0;i<t.length;i++){const s=Ct(t[i],e,r);n.push(s);}return n}function Vt(t,e,r,n){if(t[0]<r[0]||t[0]>r[2]){const e=.5*n;let i=t[0]-r[0]>e?-n:r[0]-t[0]>e?n:0;0===i&&(i=t[0]-r[2]>e?-n:r[2]-t[0]>e?n:0),t[0]+=i;}bt(e,t);}function Et(t,e,r,n){const i=Math.pow(2,n.z)*vt,s=[n.x*vt,n.y*vt],a=[];for(const n of t)for(const t of n){const n=[t.x+s[0],t.y+s[1]];Vt(n,e,r,i),a.push(n);}return a}function Ft(t,e,r,n){const i=Math.pow(2,n.z)*vt,s=[n.x*vt,n.y*vt],a=[];for(const r of t){const t=[];for(const n of r){const r=[n.x+s[0],n.y+s[1]];bt(e,r),t.push(r);}a.push(t);}if(e[2]-e[0]<=i/2){(o=e)[0]=o[1]=1/0,o[2]=o[3]=-1/0;for(const t of a)for(const n of t)Vt(n,e,r,i);}var o;return a}class Tt{constructor(t,e){this.type=R,this.geojson=t,this.geometries=e;}static parse(t,e){if(2!==t.length)return e.error(`'within' expression requires exactly one argument, but found ${t.length-1} instead.`);if(it(t[1])){const e=t[1];if("FeatureCollection"===e.type)for(let t=0;t<e.features.length;++t){const r=e.features[t].geometry.type;if("Polygon"===r||"MultiPolygon"===r)return new Tt(e,e.features[t].geometry)}else if("Feature"===e.type){const t=e.geometry.type;if("Polygon"===t||"MultiPolygon"===t)return new Tt(e,e.geometry)}else if("Polygon"===e.type||"MultiPolygon"===e.type)return new Tt(e,e)}return e.error("'within' expression requires valid geojson object that contains polygon geometry type.")}evaluate(t){if(null!=t.geometry()&&null!=t.canonicalID()){if("Point"===t.geometryType())return function(t,e){const r=[1/0,1/0,-1/0,-1/0],n=[1/0,1/0,-1/0,-1/0],i=t.canonicalID();if("Polygon"===e.type){const s=Ct(e.coordinates,n,i),a=Et(t.geometry(),r,n,i);if(!wt(r,n))return !1;for(const t of a)if(!kt(t,s))return !1}if("MultiPolygon"===e.type){const s=Pt(e.coordinates,n,i),a=Et(t.geometry(),r,n,i);if(!wt(r,n))return !1;for(const t of a)if(!St(t,s))return !1}return !0}(t,this.geometries);if("LineString"===t.geometryType())return function(t,e){const r=[1/0,1/0,-1/0,-1/0],n=[1/0,1/0,-1/0,-1/0],i=t.canonicalID();if("Polygon"===e.type){const s=Ct(e.coordinates,n,i),a=Ft(t.geometry(),r,n,i);if(!wt(r,n))return !1;for(const t of a)if(!Mt(t,s))return !1}if("MultiPolygon"===e.type){const s=Pt(e.coordinates,n,i),a=Ft(t.geometry(),r,n,i);if(!wt(r,n))return !1;for(const t of a)if(!Bt(t,s))return !1}return !0}(t,this.geometries)}return !1}eachChild(){}outputDefined(){return !0}serialize(){return ["within",this.geojson]}}function Lt(t){if(t instanceof gt){if("get"===t.name&&1===t.args.length)return !1;if("feature-state"===t.name)return !1;if("has"===t.name&&1===t.args.length)return !1;if("properties"===t.name||"geometry-type"===t.name||"id"===t.name)return !1;if(/^filter-/.test(t.name))return !1}if(t instanceof Tt)return !1;let e=!0;return t.eachChild((t=>{e&&!Lt(t)&&(e=!1);})),e}function Dt(t){if(t instanceof gt&&"feature-state"===t.name)return !1;let e=!0;return t.eachChild((t=>{e&&!Dt(t)&&(e=!1);})),e}function $t(t,e){if(t instanceof gt&&e.indexOf(t.name)>=0)return !1;let r=!0;return t.eachChild((t=>{r&&!$t(t,e)&&(r=!1);})),r}class Ot{constructor(t,e){this.type=e.type,this.name=t,this.boundExpression=e;}static parse(t,e){if(2!==t.length||"string"!=typeof t[1])return e.error("'var' expression requires exactly one string literal argument.");const r=t[1];return e.scope.has(r)?new Ot(r,e.scope.get(r)):e.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`,1)}evaluate(t){return this.boundExpression.evaluate(t)}eachChild(){}outputDefined(){return !1}serialize(){return ["var",this.name]}}class Rt{constructor(t,e=[],r,n=new L,i=[]){this.registry=t,this.path=e,this.key=e.map((t=>`[${t}]`)).join(""),this.scope=n,this.errors=i,this.expectedType=r;}parse(t,e,r,n,i={}){return e?this.concat(e,r,n)._parse(t,i):this._parse(t,i)}_parse(t,e){function r(t,e,r){return "assert"===r?new ct(e,[t]):"coerce"===r?new dt(e,[t]):t}if(null!==t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t||(t=["literal",t]),Array.isArray(t)){if(0===t.length)return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');const n=t[0];if("string"!=typeof n)return this.error(`Expression name must be a string, but found ${typeof n} instead. If you wanted a literal array, use ["literal", [...]].`,0),null;const i=this.registry[n];if(i){let n=i.parse(t,this);if(!n)return null;if(this.expectedType){const t=this.expectedType,i=n.type;if("string"!==t.kind&&"number"!==t.kind&&"boolean"!==t.kind&&"object"!==t.kind&&"array"!==t.kind||"value"!==i.kind)if("color"!==t.kind&&"formatted"!==t.kind&&"resolvedImage"!==t.kind||"value"!==i.kind&&"string"!==i.kind){if(this.checkSubtype(t,i))return null}else n=r(n,t,e.typeAnnotation||"coerce");else n=r(n,t,e.typeAnnotation||"assert");}if(!(n instanceof ot)&&"resolvedImage"!==n.type.kind&&Ut(n)){const t=new mt;try{n=new ot(n.type,n.evaluate(t));}catch(t){return this.error(t.message),null}}return n}return this.error(`Unknown expression "${n}". If you wanted a literal array, use ["literal", [...]].`,0)}return this.error(void 0===t?"'undefined' value invalid. Use null instead.":"object"==typeof t?'Bare objects invalid. Use ["literal", {...}] instead.':`Expected an array, but found ${typeof t} instead.`)}concat(t,e,r){const n="number"==typeof t?this.path.concat(t):this.path,i=r?this.scope.concat(r):this.scope;return new Rt(this.registry,n,e||null,i,this.errors)}error(t,...e){const r=`${this.key}${e.map((t=>`[${t}]`)).join("")}`;this.errors.push(new T(r,t));}checkSubtype(t,e){const r=Y(t,e);return r&&this.error(r),r}}function Ut(t){if(t instanceof Ot)return Ut(t.boundExpression);if(t instanceof gt&&"error"===t.name)return !1;if(t instanceof xt)return !1;if(t instanceof Tt)return !1;const e=t instanceof dt||t instanceof ct;let r=!0;return t.eachChild((t=>{r=e?r&&Ut(t):r&&t instanceof ot;})),!!r&&Lt(t)&&$t(t,["zoom","heatmap-density","line-progress","accumulated","is-supported-script"])}function qt(t,e){const r=t.length-1;let n,i,s=0,a=r,o=0;for(;s<=a;)if(o=Math.floor((s+a)/2),n=t[o],i=t[o+1],n<=e){if(o===r||e<i)return o;s=o+1;}else {if(!(n>e))throw new lt("Input is not a number.");a=o-1;}return 0}class jt{constructor(t,e,r){this.type=t,this.input=e,this.labels=[],this.outputs=[];for(const[t,e]of r)this.labels.push(t),this.outputs.push(e);}static parse(t,e){if(t.length-1<4)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");const r=e.parse(t[1],1,$);if(!r)return null;const n=[];let i=null;e.expectedType&&"value"!==e.expectedType.kind&&(i=e.expectedType);for(let r=1;r<t.length;r+=2){const s=1===r?-1/0:t[r],a=t[r+1],o=r,l=r+1;if("number"!=typeof s)return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',o);if(n.length&&n[n.length-1][0]>=s)return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',o);const u=e.parse(a,l,i);if(!u)return null;i=i||u.type,n.push([s,u]);}return new jt(i,r,n)}evaluate(t){const e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);const n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);const i=e.length;return n>=e[i-1]?r[i-1].evaluate(t):r[qt(e,n)].evaluate(t)}eachChild(t){t(this.input);for(const e of this.outputs)t(e);}outputDefined(){return this.outputs.every((t=>t.outputDefined()))}serialize(){const t=["step",this.input.serialize()];for(let e=0;e<this.labels.length;e++)e>0&&t.push(this.labels[e]),t.push(this.outputs[e].serialize());return t}}function Nt(t,e,r){return t*(1-r)+e*r}var Kt=Object.freeze({__proto__:null,number:Nt,color:function(t,e,r){return new E(Nt(t.r,e.r,r),Nt(t.g,e.g,r),Nt(t.b,e.b,r),Nt(t.a,e.a,r))},array:function(t,e,r){return t.map(((t,n)=>Nt(t,e[n],r)))}});const Zt=.95047,Gt=1.08883,Jt=4/29,Xt=6/29,Yt=3*Xt*Xt,Ht=Math.PI/180,Wt=180/Math.PI;function Qt(t){return t>.008856451679035631?Math.pow(t,1/3):t/Yt+Jt}function te(t){return t>Xt?t*t*t:Yt*(t-Jt)}function ee(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function re(t){return (t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function ne(t){const e=re(t.r),r=re(t.g),n=re(t.b),i=Qt((.4124564*e+.3575761*r+.1804375*n)/Zt),s=Qt((.2126729*e+.7151522*r+.072175*n)/1);return {l:116*s-16,a:500*(i-s),b:200*(s-Qt((.0193339*e+.119192*r+.9503041*n)/Gt)),alpha:t.a}}function ie(t){let e=(t.l+16)/116,r=isNaN(t.a)?e:e+t.a/500,n=isNaN(t.b)?e:e-t.b/200;return e=1*te(e),r=Zt*te(r),n=Gt*te(n),new E(ee(3.2404542*r-1.5371385*e-.4985314*n),ee(-.969266*r+1.8760108*e+.041556*n),ee(.0556434*r-.2040259*e+1.0572252*n),t.alpha)}function se(t,e,r){const n=e-t;return t+r*(n>180||n<-180?n-360*Math.round(n/360):n)}const ae={forward:ne,reverse:ie,interpolate:function(t,e,r){return {l:Nt(t.l,e.l,r),a:Nt(t.a,e.a,r),b:Nt(t.b,e.b,r),alpha:Nt(t.alpha,e.alpha,r)}}},oe={forward:function(t){const{l:e,a:r,b:n}=ne(t),i=Math.atan2(n,r)*Wt;return {h:i<0?i+360:i,c:Math.sqrt(r*r+n*n),l:e,alpha:t.a}},reverse:function(t){const e=t.h*Ht,r=t.c;return ie({l:t.l,a:Math.cos(e)*r,b:Math.sin(e)*r,alpha:t.alpha})},interpolate:function(t,e,r){return {h:se(t.h,e.h,r),c:Nt(t.c,e.c,r),l:Nt(t.l,e.l,r),alpha:Nt(t.alpha,e.alpha,r)}}};var le=Object.freeze({__proto__:null,lab:ae,hcl:oe});class ue{constructor(t,e,r,n,i){this.type=t,this.operator=e,this.interpolation=r,this.input=n,this.labels=[],this.outputs=[];for(const[t,e]of i)this.labels.push(t),this.outputs.push(e);}static interpolationFactor(t,r,n,i){let s=0;if("exponential"===t.name)s=ce(r,t.base,n,i);else if("linear"===t.name)s=ce(r,1,n,i);else if("cubic-bezier"===t.name){const a=t.controlPoints;s=new e(a[0],a[1],a[2],a[3]).solve(ce(r,1,n,i));}return s}static parse(t,e){let[r,n,i,...s]=t;if(!Array.isArray(n)||0===n.length)return e.error("Expected an interpolation type expression.",1);if("linear"===n[0])n={name:"linear"};else if("exponential"===n[0]){const t=n[1];if("number"!=typeof t)return e.error("Exponential interpolation requires a numeric base.",1,1);n={name:"exponential",base:t};}else {if("cubic-bezier"!==n[0])return e.error(`Unknown interpolation type ${String(n[0])}`,1,0);{const t=n.slice(1);if(4!==t.length||t.some((t=>"number"!=typeof t||t<0||t>1)))return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.",1);n={name:"cubic-bezier",controlPoints:t};}}if(t.length-1<4)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");if(i=e.parse(i,2,$),!i)return null;const a=[];let o=null;"interpolate-hcl"===r||"interpolate-lab"===r?o=U:e.expectedType&&"value"!==e.expectedType.kind&&(o=e.expectedType);for(let t=0;t<s.length;t+=2){const r=s[t],n=s[t+1],i=t+3,l=t+4;if("number"!=typeof r)return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',i);if(a.length&&a[a.length-1][0]>=r)return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',i);const u=e.parse(n,l,o);if(!u)return null;o=o||u.type,a.push([r,u]);}return "number"===o.kind||"color"===o.kind||"array"===o.kind&&"number"===o.itemType.kind&&"number"==typeof o.N?new ue(o,r,n,i,a):e.error(`Type ${J(o)} is not interpolatable.`)}evaluate(t){const e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);const n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);const i=e.length;if(n>=e[i-1])return r[i-1].evaluate(t);const s=qt(e,n),a=ue.interpolationFactor(this.interpolation,n,e[s],e[s+1]),o=r[s].evaluate(t),l=r[s+1].evaluate(t);return "interpolate"===this.operator?Kt[this.type.kind.toLowerCase()](o,l,a):"interpolate-hcl"===this.operator?oe.reverse(oe.interpolate(oe.forward(o),oe.forward(l),a)):ae.reverse(ae.interpolate(ae.forward(o),ae.forward(l),a))}eachChild(t){t(this.input);for(const e of this.outputs)t(e);}outputDefined(){return this.outputs.every((t=>t.outputDefined()))}serialize(){let t;t="linear"===this.interpolation.name?["linear"]:"exponential"===this.interpolation.name?1===this.interpolation.base?["linear"]:["exponential",this.interpolation.base]:["cubic-bezier"].concat(this.interpolation.controlPoints);const e=[this.operator,t,this.input.serialize()];for(let t=0;t<this.labels.length;t++)e.push(this.labels[t],this.outputs[t].serialize());return e}}function ce(t,e,r,n){const i=n-r,s=t-r;return 0===i?0:1===e?s/i:(Math.pow(e,s)-1)/(Math.pow(e,i)-1)}class he{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expectected at least one argument.");let r=null;const n=e.expectedType;n&&"value"!==n.kind&&(r=n);const i=[];for(const n of t.slice(1)){const t=e.parse(n,1+i.length,r,void 0,{typeAnnotation:"omit"});if(!t)return null;r=r||t.type,i.push(t);}const s=n&&i.some((t=>Y(n,t.type)));return new he(s?j:r,i)}evaluate(t){let e,r=null,n=0;for(const i of this.args)if(n++,r=i.evaluate(t),r&&r instanceof rt&&!r.available&&(e||(e=r.name),r=null,n===this.args.length&&(r=e)),null!==r)break;return r}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every((t=>t.outputDefined()))}serialize(){const t=["coalesce"];return this.eachChild((e=>{t.push(e.serialize());})),t}}class pe{constructor(t,e){this.type=e.type,this.bindings=[].concat(t),this.result=e;}evaluate(t){return this.result.evaluate(t)}eachChild(t){for(const e of this.bindings)t(e[1]);t(this.result);}static parse(t,e){if(t.length<4)return e.error(`Expected at least 3 arguments, but found ${t.length-1} instead.`);const r=[];for(let n=1;n<t.length-1;n+=2){const i=t[n];if("string"!=typeof i)return e.error(`Expected string, but found ${typeof i} instead.`,n);if(/[^a-zA-Z0-9_]/.test(i))return e.error("Variable names must contain only alphanumeric characters or '_'.",n);const s=e.parse(t[n+1],n+1);if(!s)return null;r.push([i,s]);}const n=e.parse(t[t.length-1],t.length-1,e.expectedType,r);return n?new pe(r,n):null}outputDefined(){return this.result.outputDefined()}serialize(){const t=["let"];for(const[e,r]of this.bindings)t.push(e,r.serialize());return t.push(this.result.serialize()),t}}class fe{constructor(t,e,r){this.type=t,this.index=e,this.input=r;}static parse(t,e){if(3!==t.length)return e.error(`Expected 2 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,$),n=e.parse(t[2],2,G(e.expectedType||j));return r&&n?new fe(n.type.itemType,r,n):null}evaluate(t){const e=this.index.evaluate(t),r=this.input.evaluate(t);if(e<0)throw new lt(`Array index out of bounds: ${e} < 0.`);if(e>=r.length)throw new lt(`Array index out of bounds: ${e} > ${r.length-1}.`);if(e!==Math.floor(e))throw new lt(`Array index must be an integer, but found ${e} instead.`);return r[e]}eachChild(t){t(this.index),t(this.input);}outputDefined(){return !1}serialize(){return ["at",this.index.serialize(),this.input.serialize()]}}class de{constructor(t,e){this.type=R,this.needle=t,this.haystack=e;}static parse(t,e){if(3!==t.length)return e.error(`Expected 2 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,j),n=e.parse(t[2],2,j);return r&&n?H(r.type,[R,O,$,D,j])?new de(r,n):e.error(`Expected first argument to be of type boolean, string, number or null, but found ${J(r.type)} instead`):null}evaluate(t){const e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!r)return !1;if(!W(e,["boolean","string","number","null"]))throw new lt(`Expected first argument to be of type boolean, string, number or null, but found ${J(st(e))} instead.`);if(!W(r,["string","array"]))throw new lt(`Expected second argument to be of type array or string, but found ${J(st(r))} instead.`);return r.indexOf(e)>=0}eachChild(t){t(this.needle),t(this.haystack);}outputDefined(){return !0}serialize(){return ["in",this.needle.serialize(),this.haystack.serialize()]}}class ye{constructor(t,e,r){this.type=$,this.needle=t,this.haystack=e,this.fromIndex=r;}static parse(t,e){if(t.length<=2||t.length>=5)return e.error(`Expected 3 or 4 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,j),n=e.parse(t[2],2,j);if(!r||!n)return null;if(!H(r.type,[R,O,$,D,j]))return e.error(`Expected first argument to be of type boolean, string, number or null, but found ${J(r.type)} instead`);if(4===t.length){const i=e.parse(t[3],3,$);return i?new ye(r,n,i):null}return new ye(r,n)}evaluate(t){const e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!W(e,["boolean","string","number","null"]))throw new lt(`Expected first argument to be of type boolean, string, number or null, but found ${J(st(e))} instead.`);if(!W(r,["string","array"]))throw new lt(`Expected second argument to be of type array or string, but found ${J(st(r))} instead.`);if(this.fromIndex){const n=this.fromIndex.evaluate(t);return r.indexOf(e,n)}return r.indexOf(e)}eachChild(t){t(this.needle),t(this.haystack),this.fromIndex&&t(this.fromIndex);}outputDefined(){return !1}serialize(){if(null!=this.fromIndex&&void 0!==this.fromIndex){const t=this.fromIndex.serialize();return ["index-of",this.needle.serialize(),this.haystack.serialize(),t]}return ["index-of",this.needle.serialize(),this.haystack.serialize()]}}class me{constructor(t,e,r,n,i,s){this.inputType=t,this.type=e,this.input=r,this.cases=n,this.outputs=i,this.otherwise=s;}static parse(t,e){if(t.length<5)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if(t.length%2!=1)return e.error("Expected an even number of arguments.");let r,n;e.expectedType&&"value"!==e.expectedType.kind&&(n=e.expectedType);const i={},s=[];for(let a=2;a<t.length-1;a+=2){let o=t[a];const l=t[a+1];Array.isArray(o)||(o=[o]);const u=e.concat(a);if(0===o.length)return u.error("Expected at least one branch label.");for(const t of o){if("number"!=typeof t&&"string"!=typeof t)return u.error("Branch labels must be numbers or strings.");if("number"==typeof t&&Math.abs(t)>Number.MAX_SAFE_INTEGER)return u.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);if("number"==typeof t&&Math.floor(t)!==t)return u.error("Numeric branch labels must be integer values.");if(r){if(u.checkSubtype(r,st(t)))return null}else r=st(t);if(void 0!==i[String(t)])return u.error("Branch labels must be unique.");i[String(t)]=s.length;}const c=e.parse(l,a,n);if(!c)return null;n=n||c.type,s.push(c);}const a=e.parse(t[1],1,j);if(!a)return null;const o=e.parse(t[t.length-1],t.length-1,n);return o?"value"!==a.type.kind&&e.concat(1).checkSubtype(r,a.type)?null:new me(r,n,a,i,s,o):null}evaluate(t){const e=this.input.evaluate(t);return (st(e)===this.inputType&&this.outputs[this.cases[e]]||this.otherwise).evaluate(t)}eachChild(t){t(this.input),this.outputs.forEach(t),t(this.otherwise);}outputDefined(){return this.outputs.every((t=>t.outputDefined()))&&this.otherwise.outputDefined()}serialize(){const t=["match",this.input.serialize()],e=Object.keys(this.cases).sort(),r=[],n={};for(const t of e){const e=n[this.cases[t]];void 0===e?(n[this.cases[t]]=r.length,r.push([this.cases[t],[t]])):r[e][1].push(t);}const i=t=>"number"===this.inputType.kind?Number(t):t;for(const[e,n]of r)t.push(1===n.length?i(n[0]):n.map(i)),t.push(this.outputs[e].serialize());return t.push(this.otherwise.serialize()),t}}class ge{constructor(t,e,r){this.type=t,this.branches=e,this.otherwise=r;}static parse(t,e){if(t.length<4)return e.error(`Expected at least 3 arguments, but found only ${t.length-1}.`);if(t.length%2!=0)return e.error("Expected an odd number of arguments.");let r;e.expectedType&&"value"!==e.expectedType.kind&&(r=e.expectedType);const n=[];for(let i=1;i<t.length-1;i+=2){const s=e.parse(t[i],i,R);if(!s)return null;const a=e.parse(t[i+1],i+1,r);if(!a)return null;n.push([s,a]),r=r||a.type;}const i=e.parse(t[t.length-1],t.length-1,r);return i?new ge(r,n,i):null}evaluate(t){for(const[e,r]of this.branches)if(e.evaluate(t))return r.evaluate(t);return this.otherwise.evaluate(t)}eachChild(t){for(const[e,r]of this.branches)t(e),t(r);t(this.otherwise);}outputDefined(){return this.branches.every((([t,e])=>e.outputDefined()))&&this.otherwise.outputDefined()}serialize(){const t=["case"];return this.eachChild((e=>{t.push(e.serialize());})),t}}class xe{constructor(t,e,r,n){this.type=t,this.input=e,this.beginIndex=r,this.endIndex=n;}static parse(t,e){if(t.length<=2||t.length>=5)return e.error(`Expected 3 or 4 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,j),n=e.parse(t[2],2,$);if(!r||!n)return null;if(!H(r.type,[G(j),O,j]))return e.error(`Expected first argument to be of type array or string, but found ${J(r.type)} instead`);if(4===t.length){const i=e.parse(t[3],3,$);return i?new xe(r.type,r,n,i):null}return new xe(r.type,r,n)}evaluate(t){const e=this.input.evaluate(t),r=this.beginIndex.evaluate(t);if(!W(e,["string","array"]))throw new lt(`Expected first argument to be of type array or string, but found ${J(st(e))} instead.`);if(this.endIndex){const n=this.endIndex.evaluate(t);return e.slice(r,n)}return e.slice(r)}eachChild(t){t(this.input),t(this.beginIndex),this.endIndex&&t(this.endIndex);}outputDefined(){return !1}serialize(){if(null!=this.endIndex&&void 0!==this.endIndex){const t=this.endIndex.serialize();return ["slice",this.input.serialize(),this.beginIndex.serialize(),t]}return ["slice",this.input.serialize(),this.beginIndex.serialize()]}}function ve(t,e){return "=="===t||"!="===t?"boolean"===e.kind||"string"===e.kind||"number"===e.kind||"null"===e.kind||"value"===e.kind:"string"===e.kind||"number"===e.kind||"value"===e.kind}function be(t,e,r,n){return 0===n.compare(e,r)}function we(t,e,r){const n="=="!==t&&"!="!==t;return class i{constructor(t,e,r){this.type=R,this.lhs=t,this.rhs=e,this.collator=r,this.hasUntypedArgument="value"===t.type.kind||"value"===e.type.kind;}static parse(t,e){if(3!==t.length&&4!==t.length)return e.error("Expected two or three arguments.");const r=t[0];let s=e.parse(t[1],1,j);if(!s)return null;if(!ve(r,s.type))return e.concat(1).error(`"${r}" comparisons are not supported for type '${J(s.type)}'.`);let a=e.parse(t[2],2,j);if(!a)return null;if(!ve(r,a.type))return e.concat(2).error(`"${r}" comparisons are not supported for type '${J(a.type)}'.`);if(s.type.kind!==a.type.kind&&"value"!==s.type.kind&&"value"!==a.type.kind)return e.error(`Cannot compare types '${J(s.type)}' and '${J(a.type)}'.`);n&&("value"===s.type.kind&&"value"!==a.type.kind?s=new ct(a.type,[s]):"value"!==s.type.kind&&"value"===a.type.kind&&(a=new ct(s.type,[a])));let o=null;if(4===t.length){if("string"!==s.type.kind&&"string"!==a.type.kind&&"value"!==s.type.kind&&"value"!==a.type.kind)return e.error("Cannot use collator to compare non-string types.");if(o=e.parse(t[3],3,N),!o)return null}return new i(s,a,o)}evaluate(i){const s=this.lhs.evaluate(i),a=this.rhs.evaluate(i);if(n&&this.hasUntypedArgument){const e=st(s),r=st(a);if(e.kind!==r.kind||"string"!==e.kind&&"number"!==e.kind)throw new lt(`Expected arguments for "${t}" to be (string, string) or (number, number), but found (${e.kind}, ${r.kind}) instead.`)}if(this.collator&&!n&&this.hasUntypedArgument){const t=st(s),r=st(a);if("string"!==t.kind||"string"!==r.kind)return e(i,s,a)}return this.collator?r(i,s,a,this.collator.evaluate(i)):e(i,s,a)}eachChild(t){t(this.lhs),t(this.rhs),this.collator&&t(this.collator);}outputDefined(){return !0}serialize(){const e=[t];return this.eachChild((t=>{e.push(t.serialize());})),e}}}const _e=we("==",(function(t,e,r){return e===r}),be),Ae=we("!=",(function(t,e,r){return e!==r}),(function(t,e,r,n){return !be(0,e,r,n)})),ke=we("<",(function(t,e,r){return e<r}),(function(t,e,r,n){return n.compare(e,r)<0})),Se=we(">",(function(t,e,r){return e>r}),(function(t,e,r,n){return n.compare(e,r)>0})),ze=we("<=",(function(t,e,r){return e<=r}),(function(t,e,r,n){return n.compare(e,r)<=0})),Ie=we(">=",(function(t,e,r){return e>=r}),(function(t,e,r,n){return n.compare(e,r)>=0}));class Me{constructor(t,e,r,n,i){this.type=O,this.number=t,this.locale=e,this.currency=r,this.minFractionDigits=n,this.maxFractionDigits=i;}static parse(t,e){if(3!==t.length)return e.error("Expected two arguments.");const r=e.parse(t[1],1,$);if(!r)return null;const n=t[2];if("object"!=typeof n||Array.isArray(n))return e.error("NumberFormat options argument must be an object.");let i=null;if(n.locale&&(i=e.parse(n.locale,1,O),!i))return null;let s=null;if(n.currency&&(s=e.parse(n.currency,1,O),!s))return null;let a=null;if(n["min-fraction-digits"]&&(a=e.parse(n["min-fraction-digits"],1,$),!a))return null;let o=null;return n["max-fraction-digits"]&&(o=e.parse(n["max-fraction-digits"],1,$),!o)?null:new Me(r,i,s,a,o)}evaluate(t){return new Intl.NumberFormat(this.locale?this.locale.evaluate(t):[],{style:this.currency?"currency":"decimal",currency:this.currency?this.currency.evaluate(t):void 0,minimumFractionDigits:this.minFractionDigits?this.minFractionDigits.evaluate(t):void 0,maximumFractionDigits:this.maxFractionDigits?this.maxFractionDigits.evaluate(t):void 0}).format(this.number.evaluate(t))}eachChild(t){t(this.number),this.locale&&t(this.locale),this.currency&&t(this.currency),this.minFractionDigits&&t(this.minFractionDigits),this.maxFractionDigits&&t(this.maxFractionDigits);}outputDefined(){return !1}serialize(){const t={};return this.locale&&(t.locale=this.locale.serialize()),this.currency&&(t.currency=this.currency.serialize()),this.minFractionDigits&&(t["min-fraction-digits"]=this.minFractionDigits.serialize()),this.maxFractionDigits&&(t["max-fraction-digits"]=this.maxFractionDigits.serialize()),["number-format",this.number.serialize(),t]}}class Be{constructor(t){this.type=$,this.input=t;}static parse(t,e){if(2!==t.length)return e.error(`Expected 1 argument, but found ${t.length-1} instead.`);const r=e.parse(t[1],1);return r?"array"!==r.type.kind&&"string"!==r.type.kind&&"value"!==r.type.kind?e.error(`Expected argument of type string or array, but found ${J(r.type)} instead.`):new Be(r):null}evaluate(t){const e=this.input.evaluate(t);if("string"==typeof e)return e.length;if(Array.isArray(e))return e.length;throw new lt(`Expected value to be of type string or array, but found ${J(st(e))} instead.`)}eachChild(t){t(this.input);}outputDefined(){return !1}serialize(){const t=["length"];return this.eachChild((e=>{t.push(e.serialize());})),t}}const Ce={"==":_e,"!=":Ae,">":Se,"<":ke,">=":Ie,"<=":ze,array:ct,at:fe,boolean:ct,case:ge,coalesce:he,collator:xt,format:ht,image:pt,in:de,"index-of":ye,interpolate:ue,"interpolate-hcl":ue,"interpolate-lab":ue,length:Be,let:pe,literal:ot,match:me,number:ct,"number-format":Me,object:ct,slice:xe,step:jt,string:ct,"to-boolean":dt,"to-color":dt,"to-number":dt,"to-string":dt,var:Ot,within:Tt};function Pe(t,[e,r,n,i]){e=e.evaluate(t),r=r.evaluate(t),n=n.evaluate(t);const s=i?i.evaluate(t):1,a=nt(e,r,n,s);if(a)throw new lt(a);return new E(e/255*s,r/255*s,n/255*s,s)}function Ve(t,e){return t in e}function Ee(t,e){const r=e[t];return void 0===r?null:r}function Fe(t){return {type:t}}function Te(t){return {result:"success",value:t}}function Le(t){return {result:"error",value:t}}function De(t){return "data-driven"===t["property-type"]||"cross-faded-data-driven"===t["property-type"]}function $e(t){return !!t.expression&&t.expression.parameters.indexOf("zoom")>-1}function Oe(t){return !!t.expression&&t.expression.interpolated}function Re(t){return t instanceof Number?"number":t instanceof String?"string":t instanceof Boolean?"boolean":Array.isArray(t)?"array":null===t?"null":typeof t}function Ue(t){return "object"==typeof t&&null!==t&&!Array.isArray(t)}function qe(t){return t}function je(t,e){const r="color"===e.type,n=t.stops&&"object"==typeof t.stops[0][0],i=n||!(n||void 0!==t.property),s=t.type||(Oe(e)?"exponential":"interval");if(r&&((t=F({},t)).stops&&(t.stops=t.stops.map((t=>[t[0],E.parse(t[1])]))),t.default=E.parse(t.default?t.default:e.default)),t.colorSpace&&"rgb"!==t.colorSpace&&!le[t.colorSpace])throw new Error(`Unknown color space: ${t.colorSpace}`);let a,o,l;if("exponential"===s)a=Ge;else if("interval"===s)a=Ze;else if("categorical"===s){a=Ke,o=Object.create(null);for(const e of t.stops)o[e[0]]=e[1];l=typeof t.stops[0][0];}else {if("identity"!==s)throw new Error(`Unknown function type "${s}"`);a=Je;}if(n){const r={},n=[];for(let e=0;e<t.stops.length;e++){const i=t.stops[e],s=i[0].zoom;void 0===r[s]&&(r[s]={zoom:s,type:t.type,property:t.property,default:t.default,stops:[]},n.push(s)),r[s].stops.push([i[0].value,i[1]]);}const i=[];for(const t of n)i.push([r[t].zoom,je(r[t],e)]);const s={name:"linear"};return {kind:"composite",interpolationType:s,interpolationFactor:ue.interpolationFactor.bind(void 0,s),zoomStops:i.map((t=>t[0])),evaluate:({zoom:r},n)=>Ge({stops:i,base:t.base},e,r).evaluate(r,n)}}if(i){const r="exponential"===s?{name:"exponential",base:void 0!==t.base?t.base:1}:null;return {kind:"camera",interpolationType:r,interpolationFactor:ue.interpolationFactor.bind(void 0,r),zoomStops:t.stops.map((t=>t[0])),evaluate:({zoom:r})=>a(t,e,r,o,l)}}return {kind:"source",evaluate(r,n){const i=n&&n.properties?n.properties[t.property]:void 0;return void 0===i?Ne(t.default,e.default):a(t,e,i,o,l)}}}function Ne(t,e,r){return void 0!==t?t:void 0!==e?e:void 0!==r?r:void 0}function Ke(t,e,r,n,i){return Ne(typeof r===i?n[r]:void 0,t.default,e.default)}function Ze(t,e,r){if("number"!==Re(r))return Ne(t.default,e.default);const n=t.stops.length;if(1===n)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[n-1][0])return t.stops[n-1][1];const i=qt(t.stops.map((t=>t[0])),r);return t.stops[i][1]}function Ge(t,e,r){const n=void 0!==t.base?t.base:1;if("number"!==Re(r))return Ne(t.default,e.default);const i=t.stops.length;if(1===i)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[i-1][0])return t.stops[i-1][1];const s=qt(t.stops.map((t=>t[0])),r),a=function(t,e,r,n){const i=n-r,s=t-r;return 0===i?0:1===e?s/i:(Math.pow(e,s)-1)/(Math.pow(e,i)-1)}(r,n,t.stops[s][0],t.stops[s+1][0]),o=t.stops[s][1],l=t.stops[s+1][1];let u=Kt[e.type]||qe;if(t.colorSpace&&"rgb"!==t.colorSpace){const e=le[t.colorSpace];u=(t,r)=>e.reverse(e.interpolate(e.forward(t),e.forward(r),a));}return "function"==typeof o.evaluate?{evaluate(...t){const e=o.evaluate.apply(void 0,t),r=l.evaluate.apply(void 0,t);if(void 0!==e&&void 0!==r)return u(e,r,a)}}:u(o,l,a)}function Je(t,e,r){return "color"===e.type?r=E.parse(r):"formatted"===e.type?r=et.fromString(r.toString()):"resolvedImage"===e.type?r=rt.fromString(r.toString()):Re(r)===e.type||"enum"===e.type&&e.values[r]||(r=void 0),Ne(r,t.default,e.default)}gt.register(Ce,{error:[{kind:"error"},[O],(t,[e])=>{throw new lt(e.evaluate(t))}],typeof:[O,[j],(t,[e])=>J(st(e.evaluate(t)))],"to-rgba":[G($,4),[U],(t,[e])=>e.evaluate(t).toArray()],rgb:[U,[$,$,$],Pe],rgba:[U,[$,$,$,$],Pe],has:{type:R,overloads:[[[O],(t,[e])=>Ve(e.evaluate(t),t.properties())],[[O,q],(t,[e,r])=>Ve(e.evaluate(t),r.evaluate(t))]]},get:{type:j,overloads:[[[O],(t,[e])=>Ee(e.evaluate(t),t.properties())],[[O,q],(t,[e,r])=>Ee(e.evaluate(t),r.evaluate(t))]]},"feature-state":[j,[O],(t,[e])=>Ee(e.evaluate(t),t.featureState||{})],properties:[q,[],t=>t.properties()],"geometry-type":[O,[],t=>t.geometryType()],id:[j,[],t=>t.id()],zoom:[$,[],t=>t.globals.zoom],"heatmap-density":[$,[],t=>t.globals.heatmapDensity||0],"line-progress":[$,[],t=>t.globals.lineProgress||0],accumulated:[j,[],t=>void 0===t.globals.accumulated?null:t.globals.accumulated],"+":[$,Fe($),(t,e)=>{let r=0;for(const n of e)r+=n.evaluate(t);return r}],"*":[$,Fe($),(t,e)=>{let r=1;for(const n of e)r*=n.evaluate(t);return r}],"-":{type:$,overloads:[[[$,$],(t,[e,r])=>e.evaluate(t)-r.evaluate(t)],[[$],(t,[e])=>-e.evaluate(t)]]},"/":[$,[$,$],(t,[e,r])=>e.evaluate(t)/r.evaluate(t)],"%":[$,[$,$],(t,[e,r])=>e.evaluate(t)%r.evaluate(t)],ln2:[$,[],()=>Math.LN2],pi:[$,[],()=>Math.PI],e:[$,[],()=>Math.E],"^":[$,[$,$],(t,[e,r])=>Math.pow(e.evaluate(t),r.evaluate(t))],sqrt:[$,[$],(t,[e])=>Math.sqrt(e.evaluate(t))],log10:[$,[$],(t,[e])=>Math.log(e.evaluate(t))/Math.LN10],ln:[$,[$],(t,[e])=>Math.log(e.evaluate(t))],log2:[$,[$],(t,[e])=>Math.log(e.evaluate(t))/Math.LN2],sin:[$,[$],(t,[e])=>Math.sin(e.evaluate(t))],cos:[$,[$],(t,[e])=>Math.cos(e.evaluate(t))],tan:[$,[$],(t,[e])=>Math.tan(e.evaluate(t))],asin:[$,[$],(t,[e])=>Math.asin(e.evaluate(t))],acos:[$,[$],(t,[e])=>Math.acos(e.evaluate(t))],atan:[$,[$],(t,[e])=>Math.atan(e.evaluate(t))],min:[$,Fe($),(t,e)=>Math.min(...e.map((e=>e.evaluate(t))))],max:[$,Fe($),(t,e)=>Math.max(...e.map((e=>e.evaluate(t))))],abs:[$,[$],(t,[e])=>Math.abs(e.evaluate(t))],round:[$,[$],(t,[e])=>{const r=e.evaluate(t);return r<0?-Math.round(-r):Math.round(r)}],floor:[$,[$],(t,[e])=>Math.floor(e.evaluate(t))],ceil:[$,[$],(t,[e])=>Math.ceil(e.evaluate(t))],"filter-==":[R,[O,j],(t,[e,r])=>t.properties()[e.value]===r.value],"filter-id-==":[R,[j],(t,[e])=>t.id()===e.value],"filter-type-==":[R,[O],(t,[e])=>t.geometryType()===e.value],"filter-<":[R,[O,j],(t,[e,r])=>{const n=t.properties()[e.value],i=r.value;return typeof n==typeof i&&n<i}],"filter-id-<":[R,[j],(t,[e])=>{const r=t.id(),n=e.value;return typeof r==typeof n&&r<n}],"filter->":[R,[O,j],(t,[e,r])=>{const n=t.properties()[e.value],i=r.value;return typeof n==typeof i&&n>i}],"filter-id->":[R,[j],(t,[e])=>{const r=t.id(),n=e.value;return typeof r==typeof n&&r>n}],"filter-<=":[R,[O,j],(t,[e,r])=>{const n=t.properties()[e.value],i=r.value;return typeof n==typeof i&&n<=i}],"filter-id-<=":[R,[j],(t,[e])=>{const r=t.id(),n=e.value;return typeof r==typeof n&&r<=n}],"filter->=":[R,[O,j],(t,[e,r])=>{const n=t.properties()[e.value],i=r.value;return typeof n==typeof i&&n>=i}],"filter-id->=":[R,[j],(t,[e])=>{const r=t.id(),n=e.value;return typeof r==typeof n&&r>=n}],"filter-has":[R,[j],(t,[e])=>e.value in t.properties()],"filter-has-id":[R,[],t=>null!==t.id()&&void 0!==t.id()],"filter-type-in":[R,[G(O)],(t,[e])=>e.value.indexOf(t.geometryType())>=0],"filter-id-in":[R,[G(j)],(t,[e])=>e.value.indexOf(t.id())>=0],"filter-in-small":[R,[O,G(j)],(t,[e,r])=>r.value.indexOf(t.properties()[e.value])>=0],"filter-in-large":[R,[O,G(j)],(t,[e,r])=>function(t,e,r,n){for(;r<=n;){const i=r+n>>1;if(e[i]===t)return !0;e[i]>t?n=i-1:r=i+1;}return !1}(t.properties()[e.value],r.value,0,r.value.length-1)],all:{type:R,overloads:[[[R,R],(t,[e,r])=>e.evaluate(t)&&r.evaluate(t)],[Fe(R),(t,e)=>{for(const r of e)if(!r.evaluate(t))return !1;return !0}]]},any:{type:R,overloads:[[[R,R],(t,[e,r])=>e.evaluate(t)||r.evaluate(t)],[Fe(R),(t,e)=>{for(const r of e)if(r.evaluate(t))return !0;return !1}]]},"!":[R,[R],(t,[e])=>!e.evaluate(t)],"is-supported-script":[R,[O],(t,[e])=>{const r=t.globals&&t.globals.isSupportedScript;return !r||r(e.evaluate(t))}],upcase:[O,[O],(t,[e])=>e.evaluate(t).toUpperCase()],downcase:[O,[O],(t,[e])=>e.evaluate(t).toLowerCase()],concat:[O,Fe(j),(t,e)=>e.map((e=>at(e.evaluate(t)))).join("")],"resolved-locale":[O,[N],(t,[e])=>e.evaluate(t).resolvedLocale()]});class Xe{constructor(t,e){this.expression=t,this._warningHistory={},this._evaluator=new mt,this._defaultValue=e?function(t){return "color"===t.type&&Ue(t.default)?new E(0,0,0,0):"color"===t.type?E.parse(t.default)||null:void 0===t.default?null:t.default}(e):null,this._enumValues=e&&"enum"===e.type?e.values:null;}evaluateWithoutErrorHandling(t,e,r,n,i,s){return this._evaluator.globals=t,this._evaluator.feature=e,this._evaluator.featureState=r,this._evaluator.canonical=n,this._evaluator.availableImages=i||null,this._evaluator.formattedSection=s,this.expression.evaluate(this._evaluator)}evaluate(t,e,r,n,i,s){this._evaluator.globals=t,this._evaluator.feature=e||null,this._evaluator.featureState=r||null,this._evaluator.canonical=n,this._evaluator.availableImages=i||null,this._evaluator.formattedSection=s||null;try{const t=this.expression.evaluate(this._evaluator);if(null==t||"number"==typeof t&&t!=t)return this._defaultValue;if(this._enumValues&&!(t in this._enumValues))throw new lt(`Expected value to be one of ${Object.keys(this._enumValues).map((t=>JSON.stringify(t))).join(", ")}, but found ${JSON.stringify(t)} instead.`);return t}catch(t){return this._warningHistory[t.message]||(this._warningHistory[t.message]=!0,"undefined"!=typeof console&&console.warn(t.message)),this._defaultValue}}}function Ye(t){return Array.isArray(t)&&t.length>0&&"string"==typeof t[0]&&t[0]in Ce}function He(t,e){const r=new Rt(Ce,[],e?function(t){const e={color:U,string:O,number:$,enum:O,boolean:R,formatted:K,resolvedImage:Z};return "array"===t.type?G(e[t.value]||j,t.length):e[t.type]}(e):void 0),n=r.parse(t,void 0,void 0,void 0,e&&"string"===e.type?{typeAnnotation:"coerce"}:void 0);return n?Te(new Xe(n,e)):Le(r.errors)}class We{constructor(t,e){this.kind=t,this._styleExpression=e,this.isStateDependent="constant"!==t&&!Dt(e.expression);}evaluateWithoutErrorHandling(t,e,r,n,i,s){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,n,i,s)}evaluate(t,e,r,n,i,s){return this._styleExpression.evaluate(t,e,r,n,i,s)}}class Qe{constructor(t,e,r,n){this.kind=t,this.zoomStops=r,this._styleExpression=e,this.isStateDependent="camera"!==t&&!Dt(e.expression),this.interpolationType=n;}evaluateWithoutErrorHandling(t,e,r,n,i,s){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,n,i,s)}evaluate(t,e,r,n,i,s){return this._styleExpression.evaluate(t,e,r,n,i,s)}interpolationFactor(t,e,r){return this.interpolationType?ue.interpolationFactor(this.interpolationType,t,e,r):0}}function tr(t,e){const r=He(t,e);if("error"===r.result)return r;const n=r.value.expression,i=Lt(n);if(!i&&!De(e))return Le([new T("","data expressions not supported")]);const s=$t(n,["zoom"]);if(!s&&!$e(e))return Le([new T("","zoom expressions not supported")]);const a=rr(n);return a||s?a instanceof T?Le([a]):a instanceof ue&&!Oe(e)?Le([new T("",'"interpolate" expressions cannot be used with this property')]):Te(a?new Qe(i?"camera":"composite",r.value,a.labels,a instanceof ue?a.interpolation:void 0):new We(i?"constant":"source",r.value)):Le([new T("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')])}class er{constructor(t,e){this._parameters=t,this._specification=e,F(this,je(this._parameters,this._specification));}static deserialize(t){return new er(t._parameters,t._specification)}static serialize(t){return {_parameters:t._parameters,_specification:t._specification}}}function rr(t){let e=null;if(t instanceof pe)e=rr(t.result);else if(t instanceof he){for(const r of t.args)if(e=rr(r),e)break}else (t instanceof jt||t instanceof ue)&&t.input instanceof gt&&"zoom"===t.input.name&&(e=t);return e instanceof T||t.eachChild((t=>{const r=rr(t);r instanceof T?e=r:!e&&r?e=new T("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.'):e&&r&&e!==r&&(e=new T("",'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));})),e}const nr={};function ir(t,e,r={}){Object.defineProperty(e,"_classRegistryKey",{value:t,writeable:!1}),nr[t]={klass:e,omit:r.omit||[],shallow:r.shallow||[]};}ir("Object",Object),S.serialize=function(t,e){const r=t.toArrayBuffer();return e&&e.push(r),{buffer:r}},S.deserialize=function(t){return new S(t.buffer)},ir("Grid",S),ir("Color",E),ir("Error",Error),ir("ResolvedImage",rt),ir("StylePropertyFunction",er),ir("StyleExpression",Xe,{omit:["_evaluator"]}),ir("ZoomDependentExpression",Qe),ir("ZoomConstantExpression",We),ir("CompoundExpression",gt,{omit:["_evaluate"]});for(const t in Ce)Ce[t]._classRegistryKey||ir(`Expression_${t}`,Ce[t]);function sr(t){return t&&"undefined"!=typeof ArrayBuffer&&(t instanceof ArrayBuffer||t.constructor&&"ArrayBuffer"===t.constructor.name)}function ar(t,e){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp)return t;if(sr(t))return e&&e.push(t),t;if(A(t))return e&&e.push(t),t;if(ArrayBuffer.isView(t)){const r=t;return e&&e.push(r.buffer),r}if(t instanceof ImageData)return e&&e.push(t.data.buffer),t;if(Array.isArray(t)){const r=[];for(const n of t)r.push(ar(n,e));return r}if("object"==typeof t){const r=t.constructor,n=r._classRegistryKey;if(!n)throw new Error("can't serialize object of unregistered class");const i=r.serialize?r.serialize(t,e):{};if(!r.serialize){for(const r in t){if(!t.hasOwnProperty(r))continue;if(nr[n].omit.indexOf(r)>=0)continue;const s=t[r];i[r]=nr[n].shallow.indexOf(r)>=0?s:ar(s,e);}t instanceof Error&&(i.message=t.message);}if(i.$name)throw new Error("$name property is reserved for worker serialization logic.");return "Object"!==n&&(i.$name=n),i}throw new Error("can't serialize object of type "+typeof t)}function or(t){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp||sr(t)||A(t)||ArrayBuffer.isView(t)||t instanceof ImageData)return t;if(Array.isArray(t))return t.map(or);if("object"==typeof t){const e=t.$name||"Object";if(!nr[e])throw new Error(`can't deserialize unregistered class ${e}`);const{klass:r}=nr[e];if(!r)throw new Error(`can't deserialize unregistered class ${e}`);if(r.deserialize)return r.deserialize(t);const n=Object.create(r.prototype);for(const r of Object.keys(t)){if("$name"===r)continue;const i=t[r];n[r]=nr[e].shallow.indexOf(r)>=0?i:or(i);}return n}throw new Error("can't deserialize object of type "+typeof t)}class lr{constructor(t,e){this.x=t,this.y=e;}clone(){return new lr(this.x,this.y)}add(t){return this.clone()._add(t)}sub(t){return this.clone()._sub(t)}multByPoint(t){return this.clone()._multByPoint(t)}divByPoint(t){return this.clone()._divByPoint(t)}mult(t){return this.clone()._mult(t)}div(t){return this.clone()._div(t)}rotate(t){return this.clone()._rotate(t)}rotateAround(t,e){return this.clone()._rotateAround(t,e)}matMult(t){return this.clone()._matMult(t)}unit(){return this.clone()._unit()}perp(){return this.clone()._perp()}round(){return this.clone()._round()}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}equals(t){return this.x===t.x&&this.y===t.y}dist(t){return Math.sqrt(this.distSqr(t))}distSqr(t){const e=t.x-this.x,r=t.y-this.y;return e*e+r*r}angle(){return Math.atan2(this.y,this.x)}angleTo(t){return Math.atan2(this.y-t.y,this.x-t.x)}angleWith(t){return this.angleWithSep(t.x,t.y)}angleWithSep(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)}_matMult(t){const e=t[2]*this.x+t[3]*this.y;return this.x=t[0]*this.x+t[1]*this.y,this.y=e,this}_add(t){return this.x+=t.x,this.y+=t.y,this}_sub(t){return this.x-=t.x,this.y-=t.y,this}_mult(t){return this.x*=t,this.y*=t,this}_div(t){return this.x/=t,this.y/=t,this}_multByPoint(t){return this.x*=t.x,this.y*=t.y,this}_divByPoint(t){return this.x/=t.x,this.y/=t.y,this}_unit(){return this._div(this.mag()),this}_perp(){const t=this.y;return this.y=this.x,this.x=-t,this}_rotate(t){const e=Math.cos(t),r=Math.sin(t),n=r*this.x+e*this.y;return this.x=e*this.x-r*this.y,this.y=n,this}_rotateAround(t,e){const r=Math.cos(t),n=Math.sin(t),i=e.y+n*(this.x-e.x)+r*(this.y-e.y);return this.x=e.x+r*(this.x-e.x)-n*(this.y-e.y),this.y=i,this}_round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}static convert(t){if(t instanceof lr)return t;if(Array.isArray(t))return new lr(t[0],t[1]);if("number"==typeof t.x)return new lr(t.x,t.y);throw new Error(`Unable to convert to point: ${JSON.stringify(t)}`)}}ir("Point",lr);const ur={MAX_PARALLEL_IMAGE_REQUESTS:16,REGISTERED_PROTOCOLS:{}},cr="mapbox-tiles";let hr,pr,fr=500,dr=50;function yr(){"undefined"==typeof caches||hr||(hr=caches.open(cr));}let mr=1/0;const gr={supported:!1,testSupport:function(t){!wr&&vr&&(_r?Ar(t):xr=t);}};let xr,vr,br,wr=!1,_r=!1;function Ar(t){const e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e);try{if(t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,vr),t.isContextLost())return;gr.supported=!0;}catch(t){}t.deleteTexture(e),wr=!0;}function kr(){return null==br&&(br="undefined"!=typeof OffscreenCanvas&&new OffscreenCanvas(1,1).getContext("2d")&&"function"==typeof createImageBitmap),br}"undefined"!=typeof document&&(vr=document.createElement("img"),vr.onload=function(){xr&&Ar(xr),xr=null,_r=!0;},vr.onerror=function(){wr=!0,xr=null;},vr.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");const Sr={Unknown:"Unknown",Style:"Style",Source:"Source",Tile:"Tile",Glyphs:"Glyphs",SpriteImage:"SpriteImage",SpriteJSON:"SpriteJSON",Image:"Image"};"function"==typeof Object.freeze&&Object.freeze(Sr);class zr extends Error{constructor(t,e,r){super(t),this.status=e,this.url=r,this.name=this.constructor.name,this.message=t;}toString(){return `${this.name}: ${this.message} (${this.status}): ${this.url}`}}const Ir=g()?()=>self.worker&&self.worker.referrer:()=>("blob:"===window.location.protocol?window.parent:window).location.href;function Mr(t,e){const r=new AbortController,n=new Request(t.url,{method:t.method||"GET",body:t.body,credentials:t.credentials,headers:t.headers,referrer:Ir(),signal:r.signal});let i=!1,s=!1;"json"===t.type&&n.headers.set("Accept","application/json");return ((r,a,o)=>{if(s)return;const l=Date.now();fetch(n).then((r=>r.ok?((r,a,o)=>{("arrayBuffer"===t.type?r.arrayBuffer():"json"===t.type?r.json():r.text()).then((t=>{s||(a&&o&&function(t,e,r){if(yr(),!hr)return;const n={status:e.status,statusText:e.statusText,headers:new Headers};e.headers.forEach(((t,e)=>n.headers.set(e,t)));const i=x(e.headers.get("Cache-Control")||"");i["no-store"]||(i["max-age"]&&n.headers.set("Expires",new Date(r+1e3*i["max-age"]).toUTCString()),new Date(n.headers.get("Expires")).getTime()-r<42e4||function(t,e){if(void 0===pr)try{new Response(new ReadableStream),pr=!0;}catch(t){pr=!1;}pr?e(t.body):t.blob().then(e);}(e,(e=>{const r=new Response(e,n);yr(),hr&&hr.then((e=>e.put(function(t){const e=t.indexOf("?");return e<0?t:t.slice(0,e)}(t.url),r))).catch((t=>d(t.message)));})));}(n,a,o),i=!0,e(null,t,r.headers.get("Cache-Control"),r.headers.get("Expires")));})).catch((t=>{s||e(new Error(t.message));}));})(r,null,l):e(new zr(r.statusText,r.status,t.url)))).catch((t=>{20!==t.code&&e(new Error(t.message));}));})(),{cancel:()=>{s=!0,i||r.abort();}}}const Br=function(t,e){if(/:\/\//.test(t.url)&&!/^https?:|^file:/.test(t.url)){if(g()&&self.worker&&self.worker.actor)return self.worker.actor.send("getResource",t,e);if(!g()){const r=t.url.substring(0,t.url.indexOf("://"));return (ur.REGISTERED_PROTOCOLS[r]||Mr)(t,e)}}if(!(/^file:/.test(r=t.url)||/^file:/.test(Ir())&&!/^\w+:/.test(r))){if(fetch&&Request&&AbortController&&Object.prototype.hasOwnProperty.call(Request.prototype,"signal"))return Mr(t,e);if(g()&&self.worker&&self.worker.actor)return self.worker.actor.send("getResource",t,e,void 0,!0)}var r;return function(t,e){const r=new XMLHttpRequest;r.open(t.method||"GET",t.url,!0),"arrayBuffer"===t.type&&(r.responseType="arraybuffer");for(const e in t.headers)r.setRequestHeader(e,t.headers[e]);return "json"===t.type&&(r.responseType="text",r.setRequestHeader("Accept","application/json")),r.withCredentials="include"===t.credentials,r.onerror=()=>{e(new Error(r.statusText));},r.onload=()=>{if((r.status>=200&&r.status<300||0===r.status)&&null!==r.response){let n=r.response;if("json"===t.type)try{n=JSON.parse(r.response);}catch(t){return e(t)}e(null,n,r.getResponseHeader("Cache-Control"),r.getResponseHeader("Expires"));}else e(new zr(r.statusText,r.status,t.url));},r.send(t.body),{cancel:()=>r.abort()}}(t,e)},Cr=function(t,e){return Br(o(t,{type:"arrayBuffer"}),e)};function Pr(t){const e=window.document.createElement("a");return e.href=t,e.protocol===window.document.location.protocol&&e.host===window.document.location.host}const Vr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";let Er,Fr;Er=[],Fr=0;const Tr=function(t,e){if(gr.supported&&(t.headers||(t.headers={}),t.headers.accept="image/webp,*/*"),Fr>=ur.MAX_PARALLEL_IMAGE_REQUESTS){const r={requestParameters:t,callback:e,cancelled:!1,cancel(){this.cancelled=!0;}};return Er.push(r),r}Fr++;let r=!1;const n=()=>{if(!r)for(r=!0,Fr--;Er.length&&Fr<ur.MAX_PARALLEL_IMAGE_REQUESTS;){const t=Er.shift(),{requestParameters:e,callback:r,cancelled:n}=t;n||(t.cancel=Tr(e,r).cancel);}},i=Cr(t,((t,r,i,s)=>{n(),t?e(t):r&&(kr()?function(t,e){const r=new Blob([new Uint8Array(t)],{type:"image/png"});createImageBitmap(r).then((t=>{e(null,t);})).catch((t=>{e(new Error(`Could not load image because of ${t.message}. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.`));}));}(r,e):function(t,e,r,n){const i=new Image;i.onload=()=>{e(null,i),URL.revokeObjectURL(i.src),i.onload=null,window.requestAnimationFrame((()=>{i.src=Vr;}));},i.onerror=()=>e(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."));const s=new Blob([new Uint8Array(t)],{type:"image/png"});i.cacheControl=r,i.expires=n,i.src=t.byteLength?URL.createObjectURL(s):Vr;}(r,e,i,s));}));return {cancel:()=>{i.cancel(),n();}}};function Lr(t,e,r){r[t]&&-1!==r[t].indexOf(e)||(r[t]=r[t]||[],r[t].push(e));}function Dr(t,e,r){if(r&&r[t]){const n=r[t].indexOf(e);-1!==n&&r[t].splice(n,1);}}class $r{constructor(t,e={}){o(this,e),this.type=t;}}class Or extends $r{constructor(t,e={}){super("error",o({error:t},e));}}class Rr{on(t,e){return this._listeners=this._listeners||{},Lr(t,e,this._listeners),this}off(t,e){return Dr(t,e,this._listeners),Dr(t,e,this._oneTimeListeners),this}once(t,e){return this._oneTimeListeners=this._oneTimeListeners||{},Lr(t,e,this._oneTimeListeners),this}fire(t,e){"string"==typeof t&&(t=new $r(t,e||{}));const r=t.type;if(this.listens(r)){t.target=this;const e=this._listeners&&this._listeners[r]?this._listeners[r].slice():[];for(const r of e)r.call(this,t);const n=this._oneTimeListeners&&this._oneTimeListeners[r]?this._oneTimeListeners[r].slice():[];for(const e of n)Dr(r,e,this._oneTimeListeners),e.call(this,t);const i=this._eventedParent;i&&(o(t,"function"==typeof this._eventedParentData?this._eventedParentData():this._eventedParentData),i.fire(t));}else t instanceof Or&&console.error(t.error);return this}listens(t){return this._listeners&&this._listeners[t]&&this._listeners[t].length>0||this._oneTimeListeners&&this._oneTimeListeners[t]&&this._oneTimeListeners[t].length>0||this._eventedParent&&this._eventedParent.listens(t)}setEventedParent(t,e){return this._eventedParent=t,this._eventedParentData=e,this}}var Ur={$version:8,$root:{version:{required:!0,type:"enum",values:[8]},name:{type:"string"},metadata:{type:"*"},center:{type:"array",value:"number"},zoom:{type:"number"},bearing:{type:"number",default:0,period:360,units:"degrees"},pitch:{type:"number",default:0,units:"degrees"},light:{type:"light"},sources:{required:!0,type:"sources"},sprite:{type:"string"},glyphs:{type:"string"},transition:{type:"transition"},layers:{required:!0,type:"array",value:"layer"}},sources:{"*":{type:"source"}},source:["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],source_vector:{type:{required:!0,type:"enum",values:{vector:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},attribution:{type:"string"},promoteId:{type:"promoteId"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster:{type:{required:!0,type:"enum",values:{raster:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},attribution:{type:"string"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster_dem:{type:{required:!0,type:"enum",values:{"raster-dem":{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},attribution:{type:"string"},encoding:{type:"enum",values:{terrarium:{},mapbox:{}},default:"mapbox"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_geojson:{type:{required:!0,type:"enum",values:{geojson:{}}},data:{type:"*"},maxzoom:{type:"number",default:18},attribution:{type:"string"},buffer:{type:"number",default:128,maximum:512,minimum:0},filter:{type:"*"},tolerance:{type:"number",default:.375},cluster:{type:"boolean",default:!1},clusterRadius:{type:"number",default:50,minimum:0},clusterMaxZoom:{type:"number"},clusterMinPoints:{type:"number"},clusterProperties:{type:"*"},lineMetrics:{type:"boolean",default:!1},generateId:{type:"boolean",default:!1},promoteId:{type:"promoteId"}},source_video:{type:{required:!0,type:"enum",values:{video:{}}},urls:{required:!0,type:"array",value:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},source_image:{type:{required:!0,type:"enum",values:{image:{}}},url:{required:!0,type:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},layer:{id:{type:"string",required:!0},type:{type:"enum",values:{fill:{},line:{},symbol:{},circle:{},heatmap:{},"fill-extrusion":{},raster:{},hillshade:{},background:{}},required:!0},metadata:{type:"*"},source:{type:"string"},"source-layer":{type:"string"},minzoom:{type:"number",minimum:0,maximum:24},maxzoom:{type:"number",minimum:0,maximum:24},filter:{type:"filter"},layout:{type:"layout"},paint:{type:"paint"}},layout:["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background"],layout_background:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_fill:{"fill-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_circle:{"circle-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_heatmap:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},"layout_fill-extrusion":{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_line:{"line-cap":{type:"enum",values:{butt:{},round:{},square:{}},default:"butt",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-join":{type:"enum",values:{bevel:{},round:{},miter:{}},default:"miter",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{type:"number",default:2,requires:[{"line-join":"miter"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-round-limit":{type:"number",default:1.05,requires:[{"line-join":"round"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_symbol:{"symbol-placement":{type:"enum",values:{point:{},line:{},"line-center":{}},default:"point",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-spacing":{type:"number",default:250,minimum:1,units:"pixels",requires:[{"symbol-placement":"line"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{type:"boolean",default:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{type:"enum",values:{auto:{},"viewport-y":{},source:{}},default:"auto",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-optional":{type:"boolean",default:!1,requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-size":{type:"number",default:1,minimum:0,units:"factor of the original icon size",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{type:"enum",values:{none:{},width:{},height:{},both:{}},default:"none",requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{type:"array",value:"number",length:4,default:[0,0,0,0],units:"pixels",requires:["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-image":{type:"resolvedImage",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{type:"boolean",default:!1,requires:["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-offset":{type:"array",value:"number",length:2,default:[0,0],requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-field":{type:"formatted",default:"",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-font":{type:"array",value:"string",default:["Open Sans Regular","Arial Unicode MS Regular"],requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-size":{type:"number",default:16,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{type:"number",default:10,minimum:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{type:"number",default:1.2,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-letter-spacing":{type:"number",default:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-justify":{type:"enum",values:{auto:{},left:{},center:{},right:{}},default:"center",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{type:"number",units:"ems",default:0,requires:["text-field"],"property-type":"data-driven",expression:{interpolated:!0,parameters:["zoom","feature"]}},"text-variable-anchor":{type:"array",value:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["text-field",{"!":"text-variable-anchor"}],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{type:"number",default:45,units:"degrees",requires:["text-field",{"symbol-placement":["line","line-center"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-writing-mode":{type:"array",value:"enum",values:{horizontal:{},vertical:{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-keep-upright":{type:"boolean",default:!0,requires:["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-transform":{type:"enum",values:{none:{},uppercase:{},lowercase:{}},default:"none",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-offset":{type:"array",value:"number",units:"ems",length:2,default:[0,0],requires:["text-field",{"!":"text-radial-offset"}],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-optional":{type:"boolean",default:!1,requires:["text-field","icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_raster:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_hillshade:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},filter:{type:"array",value:"*"},filter_operator:{type:"enum",values:{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},in:{},"!in":{},all:{},any:{},none:{},has:{},"!has":{},within:{}}},geometry_type:{type:"enum",values:{Point:{},LineString:{},Polygon:{}}},function:{expression:{type:"expression"},stops:{type:"array",value:"function_stop"},base:{type:"number",default:1,minimum:0},property:{type:"string",default:"$zoom"},type:{type:"enum",values:{identity:{},exponential:{},interval:{},categorical:{}},default:"exponential"},colorSpace:{type:"enum",values:{rgb:{},lab:{},hcl:{}},default:"rgb"},default:{type:"*",required:!1}},function_stop:{type:"array",minimum:0,maximum:24,value:["number","color"],length:2},expression:{type:"array",value:"*",minimum:1},light:{anchor:{type:"enum",default:"viewport",values:{map:{},viewport:{}},"property-type":"data-constant",transition:!1,expression:{interpolated:!1,parameters:["zoom"]}},position:{type:"array",default:[1.15,210,30],length:3,value:"number","property-type":"data-constant",transition:!0,expression:{interpolated:!0,parameters:["zoom"]}},color:{type:"color","property-type":"data-constant",default:"#ffffff",expression:{interpolated:!0,parameters:["zoom"]},transition:!0},intensity:{type:"number","property-type":"data-constant",default:.5,minimum:0,maximum:1,expression:{interpolated:!0,parameters:["zoom"]},transition:!0}},paint:["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background"],paint_fill:{"fill-antialias":{type:"boolean",default:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{type:"color",transition:!0,requires:[{"!":"fill-pattern"},{"fill-antialias":!0}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-extrusion-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-extrusion-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{type:"number",default:0,minimum:0,units:"meters",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{type:"number",default:0,minimum:0,units:"meters",transition:!0,requires:["fill-extrusion-height"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{type:"boolean",default:!0,transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_line:{"line-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"line-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["line-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-width":{type:"number",default:1,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{type:"number",default:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{type:"array",value:"number",minimum:0,transition:!0,units:"line widths",requires:[{"!":"line-pattern"}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"line-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{type:"color",transition:!1,requires:[{"!":"line-dasharray"},{"!":"line-pattern"},{source:"geojson",has:{lineMetrics:!0}}],expression:{interpolated:!0,parameters:["line-progress"]},"property-type":"color-ramp"}},paint_circle:{"circle-radius":{type:"number",default:5,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{type:"number",default:0,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["circle-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{type:"enum",values:{map:{},viewport:{}},default:"map",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"}},paint_heatmap:{"heatmap-radius":{type:"number",default:30,minimum:1,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{type:"number",default:1,minimum:0,transition:!1,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{type:"number",default:1,minimum:0,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"heatmap-color":{type:"color",default:["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",.1,"royalblue",.3,"cyan",.5,"lime",.7,"yellow",1,"red"],transition:!1,expression:{interpolated:!0,parameters:["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_symbol:{"icon-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{type:"color",default:"#000000",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["icon-image","icon-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{type:"color",default:"#000000",transition:!0,overridable:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["text-field","text-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_raster:{"raster-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{type:"number",default:0,period:360,transition:!0,units:"degrees",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{type:"number",default:0,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-saturation":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-contrast":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-resampling":{type:"enum",values:{linear:{},nearest:{}},default:"linear",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{type:"number",default:300,minimum:0,transition:!1,units:"milliseconds",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_hillshade:{"hillshade-illumination-direction":{type:"number",default:335,minimum:0,maximum:359,transition:!1,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{type:"number",default:.5,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{type:"color",default:"#FFFFFF",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_background:{"background-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"background-pattern"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"background-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"background-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},transition:{duration:{type:"number",default:300,minimum:0,units:"milliseconds"},delay:{type:"number",default:0,minimum:0,units:"milliseconds"}},"property-type":{"data-driven":{type:"property-type"},"cross-faded":{type:"property-type"},"cross-faded-data-driven":{type:"property-type"},"color-ramp":{type:"property-type"},"data-constant":{type:"property-type"},constant:{type:"property-type"}},promoteId:{"*":{type:"string"}}};class qr{constructor(t,e,r,n){this.message=(t?`${t}: `:"")+r,n&&(this.identifier=n),null!=e&&e.__line__&&(this.line=e.__line__);}}function jr(t){const e=t.value;return e?[new qr(t.key,e,"constants have been deprecated as of v8")]:[]}function Nr(t){return t instanceof Number||t instanceof String||t instanceof Boolean?t.valueOf():t}function Kr(t){if(Array.isArray(t))return t.map(Kr);if(t instanceof Object&&!(t instanceof Number||t instanceof String||t instanceof Boolean)){const e={};for(const r in t)e[r]=Kr(t[r]);return e}return Nr(t)}function Zr(t){const e=t.key,r=t.value,n=t.valueSpec||{},i=t.objectElementValidators||{},s=t.style,a=t.styleSpec;let o=[];const l=Re(r);if("object"!==l)return [new qr(e,r,`object expected, ${l} found`)];for(const t in r){const l=t.split(".")[0],u=n[l]||n["*"];let c;if(i[l])c=i[l];else if(n[l])c=bn;else if(i["*"])c=i["*"];else {if(!n["*"]){o.push(new qr(e,r[t],`unknown property "${t}"`));continue}c=bn;}o=o.concat(c({key:(e?`${e}.`:e)+t,value:r[t],valueSpec:u,style:s,styleSpec:a,object:r,objectKey:t},r));}for(const t in n)i[t]||n[t].required&&void 0===n[t].default&&void 0===r[t]&&o.push(new qr(e,r,`missing required property "${t}"`));return o}function Gr(t){const e=t.value,r=t.valueSpec,n=t.style,i=t.styleSpec,s=t.key,a=t.arrayElementValidator||bn;if("array"!==Re(e))return [new qr(s,e,`array expected, ${Re(e)} found`)];if(r.length&&e.length!==r.length)return [new qr(s,e,`array length ${r.length} expected, length ${e.length} found`)];if(r["min-length"]&&e.length<r["min-length"])return [new qr(s,e,`array length at least ${r["min-length"]} expected, length ${e.length} found`)];let o={type:r.value,values:r.values};i.$version<7&&(o.function=r.function),"object"===Re(r.value)&&(o=r.value);let l=[];for(let t=0;t<e.length;t++)l=l.concat(a({array:e,arrayIndex:t,value:e[t],valueSpec:o,style:n,styleSpec:i,key:`${s}[${t}]`}));return l}function Jr(t){const e=t.key,r=t.value,n=t.valueSpec;let i=Re(r);return "number"===i&&r!=r&&(i="NaN"),"number"!==i?[new qr(e,r,`number expected, ${i} found`)]:"minimum"in n&&r<n.minimum?[new qr(e,r,`${r} is less than the minimum value ${n.minimum}`)]:"maximum"in n&&r>n.maximum?[new qr(e,r,`${r} is greater than the maximum value ${n.maximum}`)]:[]}function Xr(t){const e=t.valueSpec,r=Nr(t.value.type);let n,i,s,a={};const o="categorical"!==r&&void 0===t.value.property,l=!o,u="array"===Re(t.value.stops)&&"array"===Re(t.value.stops[0])&&"object"===Re(t.value.stops[0][0]),c=Zr({key:t.key,value:t.value,valueSpec:t.styleSpec.function,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{stops:function(t){if("identity"===r)return [new qr(t.key,t.value,'identity function may not have a "stops" property')];let e=[];const n=t.value;return e=e.concat(Gr({key:t.key,value:n,valueSpec:t.valueSpec,style:t.style,styleSpec:t.styleSpec,arrayElementValidator:h})),"array"===Re(n)&&0===n.length&&e.push(new qr(t.key,n,"array must have at least one stop")),e},default:function(t){return bn({key:t.key,value:t.value,valueSpec:e,style:t.style,styleSpec:t.styleSpec})}}});return "identity"===r&&o&&c.push(new qr(t.key,t.value,'missing required property "property"')),"identity"===r||t.value.stops||c.push(new qr(t.key,t.value,'missing required property "stops"')),"exponential"===r&&t.valueSpec.expression&&!Oe(t.valueSpec)&&c.push(new qr(t.key,t.value,"exponential functions not supported")),t.styleSpec.$version>=8&&(l&&!De(t.valueSpec)?c.push(new qr(t.key,t.value,"property functions not supported")):o&&!$e(t.valueSpec)&&c.push(new qr(t.key,t.value,"zoom functions not supported"))),"categorical"!==r&&!u||void 0!==t.value.property||c.push(new qr(t.key,t.value,'"property" property is required')),c;function h(t){let r=[];const n=t.value,o=t.key;if("array"!==Re(n))return [new qr(o,n,`array expected, ${Re(n)} found`)];if(2!==n.length)return [new qr(o,n,`array length 2 expected, length ${n.length} found`)];if(u){if("object"!==Re(n[0]))return [new qr(o,n,`object expected, ${Re(n[0])} found`)];if(void 0===n[0].zoom)return [new qr(o,n,"object stop key must have zoom")];if(void 0===n[0].value)return [new qr(o,n,"object stop key must have value")];if(s&&s>Nr(n[0].zoom))return [new qr(o,n[0].zoom,"stop zoom values must appear in ascending order")];Nr(n[0].zoom)!==s&&(s=Nr(n[0].zoom),i=void 0,a={}),r=r.concat(Zr({key:`${o}[0]`,value:n[0],valueSpec:{zoom:{}},style:t.style,styleSpec:t.styleSpec,objectElementValidators:{zoom:Jr,value:p}}));}else r=r.concat(p({key:`${o}[0]`,value:n[0],valueSpec:{},style:t.style,styleSpec:t.styleSpec},n));return Ye(Kr(n[1]))?r.concat([new qr(`${o}[1]`,n[1],"expressions are not allowed in function stops.")]):r.concat(bn({key:`${o}[1]`,value:n[1],valueSpec:e,style:t.style,styleSpec:t.styleSpec}))}function p(t,s){const o=Re(t.value),l=Nr(t.value),u=null!==t.value?t.value:s;if(n){if(o!==n)return [new qr(t.key,u,`${o} stop domain type must match previous stop domain type ${n}`)]}else n=o;if("number"!==o&&"string"!==o&&"boolean"!==o)return [new qr(t.key,u,"stop domain value must be a number, string, or boolean")];if("number"!==o&&"categorical"!==r){let n=`number expected, ${o} found`;return De(e)&&void 0===r&&(n+='\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),[new qr(t.key,u,n)]}return "categorical"!==r||"number"!==o||isFinite(l)&&Math.floor(l)===l?"categorical"!==r&&"number"===o&&void 0!==i&&l<i?[new qr(t.key,u,"stop domain values must appear in ascending order")]:(i=l,"categorical"===r&&l in a?[new qr(t.key,u,"stop domain values must be unique")]:(a[l]=!0,[])):[new qr(t.key,u,`integer expected, found ${l}`)]}}function Yr(t){const e=("property"===t.expressionContext?tr:He)(Kr(t.value),t.valueSpec);if("error"===e.result)return e.value.map((e=>new qr(`${t.key}${e.key}`,t.value,e.message)));const r=e.value.expression||e.value._styleExpression.expression;if("property"===t.expressionContext&&"text-font"===t.propertyKey&&!r.outputDefined())return [new qr(t.key,t.value,`Invalid data expression for "${t.propertyKey}". Output values must be contained as literals within the expression.`)];if("property"===t.expressionContext&&"layout"===t.propertyType&&!Dt(r))return [new qr(t.key,t.value,'"feature-state" data expressions are not supported with layout properties.')];if("filter"===t.expressionContext&&!Dt(r))return [new qr(t.key,t.value,'"feature-state" data expressions are not supported with filters.')];if(t.expressionContext&&0===t.expressionContext.indexOf("cluster")){if(!$t(r,["zoom","feature-state"]))return [new qr(t.key,t.value,'"zoom" and "feature-state" expressions are not supported with cluster properties.')];if("cluster-initial"===t.expressionContext&&!Lt(r))return [new qr(t.key,t.value,"Feature data expressions are not supported with initial expression part of cluster properties.")]}return []}function Hr(t){const e=t.key,r=t.value,n=t.valueSpec,i=[];return Array.isArray(n.values)?-1===n.values.indexOf(Nr(r))&&i.push(new qr(e,r,`expected one of [${n.values.join(", ")}], ${JSON.stringify(r)} found`)):-1===Object.keys(n.values).indexOf(Nr(r))&&i.push(new qr(e,r,`expected one of [${Object.keys(n.values).join(", ")}], ${JSON.stringify(r)} found`)),i}function Wr(t){if(!0===t||!1===t)return !0;if(!Array.isArray(t)||0===t.length)return !1;switch(t[0]){case"has":return t.length>=2&&"$id"!==t[1]&&"$type"!==t[1];case"in":return t.length>=3&&("string"!=typeof t[1]||Array.isArray(t[2]));case"!in":case"!has":case"none":return !1;case"==":case"!=":case">":case">=":case"<":case"<=":return 3!==t.length||Array.isArray(t[1])||Array.isArray(t[2]);case"any":case"all":for(const e of t.slice(1))if(!Wr(e)&&"boolean"!=typeof e)return !1;return !0;default:return !0}}const Qr={type:"boolean",default:!1,transition:!1,"property-type":"data-driven",expression:{interpolated:!1,parameters:["zoom","feature"]}};function tn(t){if(null==t)return {filter:()=>!0,needGeometry:!1};Wr(t)||(t=nn(t));const e=He(t,Qr);if("error"===e.result)throw new Error(e.value.map((t=>`${t.key}: ${t.message}`)).join(", "));return {filter:(t,r,n)=>e.value.evaluate(t,r,{},n),needGeometry:rn(t)}}function en(t,e){return t<e?-1:t>e?1:0}function rn(t){if(!Array.isArray(t))return !1;if("within"===t[0])return !0;for(let e=1;e<t.length;e++)if(rn(t[e]))return !0;return !1}function nn(t){if(!t)return !0;const e=t[0];return t.length<=1?"any"!==e:"=="===e?sn(t[1],t[2],"=="):"!="===e?ln(sn(t[1],t[2],"==")):"<"===e||">"===e||"<="===e||">="===e?sn(t[1],t[2],e):"any"===e?(r=t.slice(1),["any"].concat(r.map(nn))):"all"===e?["all"].concat(t.slice(1).map(nn)):"none"===e?["all"].concat(t.slice(1).map(nn).map(ln)):"in"===e?an(t[1],t.slice(2)):"!in"===e?ln(an(t[1],t.slice(2))):"has"===e?on(t[1]):"!has"===e?ln(on(t[1])):"within"!==e||t;var r;}function sn(t,e,r){switch(t){case"$type":return [`filter-type-${r}`,e];case"$id":return [`filter-id-${r}`,e];default:return [`filter-${r}`,t,e]}}function an(t,e){if(0===e.length)return !1;switch(t){case"$type":return ["filter-type-in",["literal",e]];case"$id":return ["filter-id-in",["literal",e]];default:return e.length>200&&!e.some((t=>typeof t!=typeof e[0]))?["filter-in-large",t,["literal",e.sort(en)]]:["filter-in-small",t,["literal",e]]}}function on(t){switch(t){case"$type":return !0;case"$id":return ["filter-has-id"];default:return ["filter-has",t]}}function ln(t){return ["!",t]}function un(t){return Wr(Kr(t.value))?Yr(F({},t,{expressionContext:"filter",valueSpec:{value:"boolean"}})):cn(t)}function cn(t){const e=t.value,r=t.key;if("array"!==Re(e))return [new qr(r,e,`array expected, ${Re(e)} found`)];const n=t.styleSpec;let i,s=[];if(e.length<1)return [new qr(r,e,"filter array must have at least 1 element")];switch(s=s.concat(Hr({key:`${r}[0]`,value:e[0],valueSpec:n.filter_operator,style:t.style,styleSpec:t.styleSpec})),Nr(e[0])){case"<":case"<=":case">":case">=":e.length>=2&&"$type"===Nr(e[1])&&s.push(new qr(r,e,`"$type" cannot be use with operator "${e[0]}"`));case"==":case"!=":3!==e.length&&s.push(new qr(r,e,`filter array for operator "${e[0]}" must have 3 elements`));case"in":case"!in":e.length>=2&&(i=Re(e[1]),"string"!==i&&s.push(new qr(`${r}[1]`,e[1],`string expected, ${i} found`)));for(let a=2;a<e.length;a++)i=Re(e[a]),"$type"===Nr(e[1])?s=s.concat(Hr({key:`${r}[${a}]`,value:e[a],valueSpec:n.geometry_type,style:t.style,styleSpec:t.styleSpec})):"string"!==i&&"number"!==i&&"boolean"!==i&&s.push(new qr(`${r}[${a}]`,e[a],`string, number, or boolean expected, ${i} found`));break;case"any":case"all":case"none":for(let n=1;n<e.length;n++)s=s.concat(cn({key:`${r}[${n}]`,value:e[n],style:t.style,styleSpec:t.styleSpec}));break;case"has":case"!has":i=Re(e[1]),2!==e.length?s.push(new qr(r,e,`filter array for "${e[0]}" operator must have 2 elements`)):"string"!==i&&s.push(new qr(`${r}[1]`,e[1],`string expected, ${i} found`));break;case"within":i=Re(e[1]),2!==e.length?s.push(new qr(r,e,`filter array for "${e[0]}" operator must have 2 elements`)):"object"!==i&&s.push(new qr(`${r}[1]`,e[1],`object expected, ${i} found`));}return s}function hn(t,e){const r=t.key,n=t.style,i=t.styleSpec,s=t.value,a=t.objectKey,o=i[`${e}_${t.layerType}`];if(!o)return [];const l=a.match(/^(.*)-transition$/);if("paint"===e&&l&&o[l[1]]&&o[l[1]].transition)return bn({key:r,value:s,valueSpec:i.transition,style:n,styleSpec:i});const u=t.valueSpec||o[a];if(!u)return [new qr(r,s,`unknown property "${a}"`)];let c;if("string"===Re(s)&&De(u)&&!u.tokens&&(c=/^{([^}]+)}$/.exec(s)))return [new qr(r,s,`"${a}" does not support interpolation syntax\nUse an identity property function instead: \`{ "type": "identity", "property": ${JSON.stringify(c[1])} }\`.`)];const h=[];return "symbol"===t.layerType&&("text-field"===a&&n&&!n.glyphs&&h.push(new qr(r,s,'use of "text-field" requires a style "glyphs" property')),"text-font"===a&&Ue(Kr(s))&&"identity"===Nr(s.type)&&h.push(new qr(r,s,'"text-font" does not support identity functions'))),h.concat(bn({key:t.key,value:s,valueSpec:u,style:n,styleSpec:i,expressionContext:"property",propertyType:e,propertyKey:a}))}function pn(t){return hn(t,"paint")}function fn(t){return hn(t,"layout")}function dn(t){let e=[];const r=t.value,n=t.key,i=t.style,s=t.styleSpec;r.type||r.ref||e.push(new qr(n,r,'either "type" or "ref" is required'));let a=Nr(r.type);const o=Nr(r.ref);if(r.id){const s=Nr(r.id);for(let a=0;a<t.arrayIndex;a++){const t=i.layers[a];Nr(t.id)===s&&e.push(new qr(n,r.id,`duplicate layer id "${r.id}", previously used at line ${t.id.__line__}`));}}if("ref"in r){let t;["type","source","source-layer","filter","layout"].forEach((t=>{t in r&&e.push(new qr(n,r[t],`"${t}" is prohibited for ref layers`));})),i.layers.forEach((e=>{Nr(e.id)===o&&(t=e);})),t?t.ref?e.push(new qr(n,r.ref,"ref cannot reference another ref layer")):a=Nr(t.type):e.push(new qr(n,r.ref,`ref layer "${o}" not found`));}else if("background"!==a)if(r.source){const t=i.sources&&i.sources[r.source],s=t&&Nr(t.type);t?"vector"===s&&"raster"===a?e.push(new qr(n,r.source,`layer "${r.id}" requires a raster source`)):"raster"===s&&"raster"!==a?e.push(new qr(n,r.source,`layer "${r.id}" requires a vector source`)):"vector"!==s||r["source-layer"]?"raster-dem"===s&&"hillshade"!==a?e.push(new qr(n,r.source,"raster-dem source can only be used with layer type 'hillshade'.")):"line"!==a||!r.paint||!r.paint["line-gradient"]||"geojson"===s&&t.lineMetrics||e.push(new qr(n,r,`layer "${r.id}" specifies a line-gradient, which requires a GeoJSON source with \`lineMetrics\` enabled.`)):e.push(new qr(n,r,`layer "${r.id}" must specify a "source-layer"`)):e.push(new qr(n,r.source,`source "${r.source}" not found`));}else e.push(new qr(n,r,'missing required property "source"'));return e=e.concat(Zr({key:n,value:r,valueSpec:s.layer,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":()=>[],type:()=>bn({key:`${n}.type`,value:r.type,valueSpec:s.layer.type,style:t.style,styleSpec:t.styleSpec,object:r,objectKey:"type"}),filter:un,layout:t=>Zr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":t=>fn(F({layerType:a},t))}}),paint:t=>Zr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":t=>pn(F({layerType:a},t))}})}})),e}function yn(t){const e=t.value,r=t.key,n=Re(e);return "string"!==n?[new qr(r,e,`string expected, ${n} found`)]:[]}const mn={promoteId:function({key:t,value:e}){if("string"===Re(e))return yn({key:t,value:e});{const r=[];for(const n in e)r.push(...yn({key:`${t}.${n}`,value:e[n]}));return r}}};function gn(t){const e=t.value,r=t.key,n=t.styleSpec,i=t.style;if(!e.type)return [new qr(r,e,'"type" is required')];const s=Nr(e.type);let a;switch(s){case"vector":case"raster":case"raster-dem":return a=Zr({key:r,value:e,valueSpec:n[`source_${s.replace("-","_")}`],style:t.style,styleSpec:n,objectElementValidators:mn}),a;case"geojson":if(a=Zr({key:r,value:e,valueSpec:n.source_geojson,style:i,styleSpec:n,objectElementValidators:mn}),e.cluster)for(const t in e.clusterProperties){const[n,i]=e.clusterProperties[t],s="string"==typeof n?[n,["accumulated"],["get",t]]:n;a.push(...Yr({key:`${r}.${t}.map`,value:i,expressionContext:"cluster-map"})),a.push(...Yr({key:`${r}.${t}.reduce`,value:s,expressionContext:"cluster-reduce"}));}return a;case"video":return Zr({key:r,value:e,valueSpec:n.source_video,style:i,styleSpec:n});case"image":return Zr({key:r,value:e,valueSpec:n.source_image,style:i,styleSpec:n});case"canvas":return [new qr(r,null,"Please use runtime APIs to add canvas sources, rather than including them in stylesheets.","source.canvas")];default:return Hr({key:`${r}.type`,value:e.type,valueSpec:{values:["vector","raster","raster-dem","geojson","video","image"]},style:i,styleSpec:n})}}function xn(t){const e=t.value,r=t.styleSpec,n=r.light,i=t.style;let s=[];const a=Re(e);if(void 0===e)return s;if("object"!==a)return s=s.concat([new qr("light",e,`object expected, ${a} found`)]),s;for(const t in e){const a=t.match(/^(.*)-transition$/);s=s.concat(a&&n[a[1]]&&n[a[1]].transition?bn({key:t,value:e[t],valueSpec:r.transition,style:i,styleSpec:r}):n[t]?bn({key:t,value:e[t],valueSpec:n[t],style:i,styleSpec:r}):[new qr(t,e[t],`unknown property "${t}"`)]);}return s}const vn={"*":()=>[],array:Gr,boolean:function(t){const e=t.value,r=t.key,n=Re(e);return "boolean"!==n?[new qr(r,e,`boolean expected, ${n} found`)]:[]},number:Jr,color:function(t){const e=t.key,r=t.value,n=Re(r);return "string"!==n?[new qr(e,r,`color expected, ${n} found`)]:null===I(r)?[new qr(e,r,`color expected, "${r}" found`)]:[]},constants:jr,enum:Hr,filter:un,function:Xr,layer:dn,object:Zr,source:gn,light:xn,string:yn,formatted:function(t){return 0===yn(t).length?[]:Yr(t)},resolvedImage:function(t){return 0===yn(t).length?[]:Yr(t)}};function bn(t){const e=t.value,r=t.valueSpec,n=t.styleSpec;return r.expression&&Ue(Nr(e))?Xr(t):r.expression&&Ye(Kr(e))?Yr(t):r.type&&vn[r.type]?vn[r.type](t):Zr(F({},t,{valueSpec:r.type?n[r.type]:r}))}function wn(t){const e=t.value,r=t.key,n=yn(t);return n.length||(-1===e.indexOf("{fontstack}")&&n.push(new qr(r,e,'"glyphs" url must include a "{fontstack}" token')),-1===e.indexOf("{range}")&&n.push(new qr(r,e,'"glyphs" url must include a "{range}" token'))),n}function _n(t,e=Ur){let r=[];return r=r.concat(bn({key:"",value:t,valueSpec:e.$root,styleSpec:e,style:t,objectElementValidators:{glyphs:wn,"*":()=>[]}})),t.constants&&(r=r.concat(jr({key:"constants",value:t.constants,style:t,styleSpec:e}))),An(r)}function An(t){return [].concat(t).sort(((t,e)=>t.line-e.line))}function kn(t){return function(...e){return An(t.apply(this,e))}}_n.source=kn(gn),_n.light=kn(xn),_n.layer=kn(dn),_n.filter=kn(un),_n.paintProperty=kn(pn),_n.layoutProperty=kn(fn);const Sn=_n,zn=Sn.light,In=Sn.paintProperty,Mn=Sn.layoutProperty;function Bn(t,e){let r=!1;if(e&&e.length)for(const n of e)t.fire(new Or(new Error(n.message))),r=!0;return r}class Cn{constructor(){this.first=!0;}update(t,e){const r=Math.floor(t);return this.first?(this.first=!1,this.lastIntegerZoom=r,this.lastIntegerZoomTime=0,this.lastZoom=t,this.lastFloorZoom=r,!0):(this.lastFloorZoom>r?(this.lastIntegerZoom=r+1,this.lastIntegerZoomTime=e):this.lastFloorZoom<r&&(this.lastIntegerZoom=r,this.lastIntegerZoomTime=e),t!==this.lastZoom&&(this.lastZoom=t,this.lastFloorZoom=r,!0))}}const Pn={"Latin-1 Supplement":t=>t>=128&&t<=255,Arabic:t=>t>=1536&&t<=1791,"Arabic Supplement":t=>t>=1872&&t<=1919,"Arabic Extended-A":t=>t>=2208&&t<=2303,"Hangul Jamo":t=>t>=4352&&t<=4607,"Unified Canadian Aboriginal Syllabics":t=>t>=5120&&t<=5759,Khmer:t=>t>=6016&&t<=6143,"Unified Canadian Aboriginal Syllabics Extended":t=>t>=6320&&t<=6399,"General Punctuation":t=>t>=8192&&t<=8303,"Letterlike Symbols":t=>t>=8448&&t<=8527,"Number Forms":t=>t>=8528&&t<=8591,"Miscellaneous Technical":t=>t>=8960&&t<=9215,"Control Pictures":t=>t>=9216&&t<=9279,"Optical Character Recognition":t=>t>=9280&&t<=9311,"Enclosed Alphanumerics":t=>t>=9312&&t<=9471,"Geometric Shapes":t=>t>=9632&&t<=9727,"Miscellaneous Symbols":t=>t>=9728&&t<=9983,"Miscellaneous Symbols and Arrows":t=>t>=11008&&t<=11263,"CJK Radicals Supplement":t=>t>=11904&&t<=12031,"Kangxi Radicals":t=>t>=12032&&t<=12255,"Ideographic Description Characters":t=>t>=12272&&t<=12287,"CJK Symbols and Punctuation":t=>t>=12288&&t<=12351,Hiragana:t=>t>=12352&&t<=12447,Katakana:t=>t>=12448&&t<=12543,Bopomofo:t=>t>=12544&&t<=12591,"Hangul Compatibility Jamo":t=>t>=12592&&t<=12687,Kanbun:t=>t>=12688&&t<=12703,"Bopomofo Extended":t=>t>=12704&&t<=12735,"CJK Strokes":t=>t>=12736&&t<=12783,"Katakana Phonetic Extensions":t=>t>=12784&&t<=12799,"Enclosed CJK Letters and Months":t=>t>=12800&&t<=13055,"CJK Compatibility":t=>t>=13056&&t<=13311,"CJK Unified Ideographs Extension A":t=>t>=13312&&t<=19903,"Yijing Hexagram Symbols":t=>t>=19904&&t<=19967,"CJK Unified Ideographs":t=>t>=19968&&t<=40959,"Yi Syllables":t=>t>=40960&&t<=42127,"Yi Radicals":t=>t>=42128&&t<=42191,"Hangul Jamo Extended-A":t=>t>=43360&&t<=43391,"Hangul Syllables":t=>t>=44032&&t<=55215,"Hangul Jamo Extended-B":t=>t>=55216&&t<=55295,"Private Use Area":t=>t>=57344&&t<=63743,"CJK Compatibility Ideographs":t=>t>=63744&&t<=64255,"Arabic Presentation Forms-A":t=>t>=64336&&t<=65023,"Vertical Forms":t=>t>=65040&&t<=65055,"CJK Compatibility Forms":t=>t>=65072&&t<=65103,"Small Form Variants":t=>t>=65104&&t<=65135,"Arabic Presentation Forms-B":t=>t>=65136&&t<=65279,"Halfwidth and Fullwidth Forms":t=>t>=65280&&t<=65519};function Vn(t){for(const e of t)if(Tn(e.charCodeAt(0)))return !0;return !1}function En(t){for(const e of t)if(!Fn(e.charCodeAt(0)))return !1;return !0}function Fn(t){return !(Pn.Arabic(t)||Pn["Arabic Supplement"](t)||Pn["Arabic Extended-A"](t)||Pn["Arabic Presentation Forms-A"](t)||Pn["Arabic Presentation Forms-B"](t))}function Tn(t){return !(746!==t&&747!==t&&(t<4352||!(Pn["Bopomofo Extended"](t)||Pn.Bopomofo(t)||Pn["CJK Compatibility Forms"](t)&&!(t>=65097&&t<=65103)||Pn["CJK Compatibility Ideographs"](t)||Pn["CJK Compatibility"](t)||Pn["CJK Radicals Supplement"](t)||Pn["CJK Strokes"](t)||!(!Pn["CJK Symbols and Punctuation"](t)||t>=12296&&t<=12305||t>=12308&&t<=12319||12336===t)||Pn["CJK Unified Ideographs Extension A"](t)||Pn["CJK Unified Ideographs"](t)||Pn["Enclosed CJK Letters and Months"](t)||Pn["Hangul Compatibility Jamo"](t)||Pn["Hangul Jamo Extended-A"](t)||Pn["Hangul Jamo Extended-B"](t)||Pn["Hangul Jamo"](t)||Pn["Hangul Syllables"](t)||Pn.Hiragana(t)||Pn["Ideographic Description Characters"](t)||Pn.Kanbun(t)||Pn["Kangxi Radicals"](t)||Pn["Katakana Phonetic Extensions"](t)||Pn.Katakana(t)&&12540!==t||!(!Pn["Halfwidth and Fullwidth Forms"](t)||65288===t||65289===t||65293===t||t>=65306&&t<=65310||65339===t||65341===t||65343===t||t>=65371&&t<=65503||65507===t||t>=65512&&t<=65519)||!(!Pn["Small Form Variants"](t)||t>=65112&&t<=65118||t>=65123&&t<=65126)||Pn["Unified Canadian Aboriginal Syllabics"](t)||Pn["Unified Canadian Aboriginal Syllabics Extended"](t)||Pn["Vertical Forms"](t)||Pn["Yijing Hexagram Symbols"](t)||Pn["Yi Syllables"](t)||Pn["Yi Radicals"](t))))}function Ln(t){return !(Tn(t)||function(t){return !!(Pn["Latin-1 Supplement"](t)&&(167===t||169===t||174===t||177===t||188===t||189===t||190===t||215===t||247===t)||Pn["General Punctuation"](t)&&(8214===t||8224===t||8225===t||8240===t||8241===t||8251===t||8252===t||8258===t||8263===t||8264===t||8265===t||8273===t)||Pn["Letterlike Symbols"](t)||Pn["Number Forms"](t)||Pn["Miscellaneous Technical"](t)&&(t>=8960&&t<=8967||t>=8972&&t<=8991||t>=8996&&t<=9e3||9003===t||t>=9085&&t<=9114||t>=9150&&t<=9165||9167===t||t>=9169&&t<=9179||t>=9186&&t<=9215)||Pn["Control Pictures"](t)&&9251!==t||Pn["Optical Character Recognition"](t)||Pn["Enclosed Alphanumerics"](t)||Pn["Geometric Shapes"](t)||Pn["Miscellaneous Symbols"](t)&&!(t>=9754&&t<=9759)||Pn["Miscellaneous Symbols and Arrows"](t)&&(t>=11026&&t<=11055||t>=11088&&t<=11097||t>=11192&&t<=11243)||Pn["CJK Symbols and Punctuation"](t)||Pn.Katakana(t)||Pn["Private Use Area"](t)||Pn["CJK Compatibility Forms"](t)||Pn["Small Form Variants"](t)||Pn["Halfwidth and Fullwidth Forms"](t)||8734===t||8756===t||8757===t||t>=9984&&t<=10087||t>=10102&&t<=10131||65532===t||65533===t)}(t))}function Dn(t){return t>=1424&&t<=2303||Pn["Arabic Presentation Forms-A"](t)||Pn["Arabic Presentation Forms-B"](t)}function $n(t,e){return !(!e&&Dn(t)||t>=2304&&t<=3583||t>=3840&&t<=4255||Pn.Khmer(t))}function On(t){for(const e of t)if(Dn(e.charCodeAt(0)))return !0;return !1}const Rn="deferred",Un="loading",qn="loaded";let jn=null,Nn="unavailable",Kn=null;const Zn=function(t){t&&"string"==typeof t&&t.indexOf("NetworkError")>-1&&(Nn="error"),jn&&jn(t);};function Gn(){Jn.fire(new $r("pluginStateChange",{pluginStatus:Nn,pluginURL:Kn}));}const Jn=new Rr,Xn=function(){return Nn},Yn=function(){if(Nn!==Rn||!Kn)throw new Error("rtl-text-plugin cannot be downloaded unless a pluginURL is specified");Nn=Un,Gn(),Kn&&Cr({url:Kn},(t=>{t?Zn(t):(Nn=qn,Gn());}));},Hn={applyArabicShaping:null,processBidirectionalText:null,processStyledBidirectionalText:null,isLoaded:()=>Nn===qn||null!=Hn.applyArabicShaping,isLoading:()=>Nn===Un,setState(t){Nn=t.pluginStatus,Kn=t.pluginURL;},isParsed:()=>null!=Hn.applyArabicShaping&&null!=Hn.processBidirectionalText&&null!=Hn.processStyledBidirectionalText,getPluginURL:()=>Kn};class Wn{constructor(t,e){this.zoom=t,e?(this.now=e.now,this.fadeDuration=e.fadeDuration,this.zoomHistory=e.zoomHistory,this.transition=e.transition):(this.now=0,this.fadeDuration=0,this.zoomHistory=new Cn,this.transition={});}isSupportedScript(t){return function(t,e){for(const r of t)if(!$n(r.charCodeAt(0),e))return !1;return !0}(t,Hn.isLoaded())}crossFadingFactor(){return 0===this.fadeDuration?1:Math.min((this.now-this.zoomHistory.lastIntegerZoomTime)/this.fadeDuration,1)}getCrossfadeParameters(){const t=this.zoom,e=t-Math.floor(t),r=this.crossFadingFactor();return t>this.zoomHistory.lastIntegerZoom?{fromScale:2,toScale:1,t:e+(1-e)*r}:{fromScale:.5,toScale:1,t:1-(1-r)*e}}}class Qn{constructor(t,e){this.property=t,this.value=e,this.expression=function(t,e){if(Ue(t))return new er(t,e);if(Ye(t)){const r=tr(t,e);if("error"===r.result)throw new Error(r.value.map((t=>`${t.key}: ${t.message}`)).join(", "));return r.value}{let r=t;return "string"==typeof t&&"color"===e.type&&(r=E.parse(t)),{kind:"constant",evaluate:()=>r}}}(void 0===e?t.specification.default:e,t.specification);}isDataDriven(){return "source"===this.expression.kind||"composite"===this.expression.kind}possiblyEvaluate(t,e,r){return this.property.possiblyEvaluate(this,t,e,r)}}class ti{constructor(t){this.property=t,this.value=new Qn(t,void 0);}transitioned(t,e){return new ri(this.property,this.value,e,o({},t.transition,this.transition),t.now)}untransitioned(){return new ri(this.property,this.value,null,{},0)}}class ei{constructor(t){this._properties=t,this._values=Object.create(t.defaultTransitionablePropertyValues);}getValue(t){return p(this._values[t].value.value)}setValue(t,e){Object.prototype.hasOwnProperty.call(this._values,t)||(this._values[t]=new ti(this._values[t].property)),this._values[t].value=new Qn(this._values[t].property,null===e?void 0:p(e));}getTransition(t){return p(this._values[t].transition)}setTransition(t,e){Object.prototype.hasOwnProperty.call(this._values,t)||(this._values[t]=new ti(this._values[t].property)),this._values[t].transition=p(e)||void 0;}serialize(){const t={};for(const e of Object.keys(this._values)){const r=this.getValue(e);void 0!==r&&(t[e]=r);const n=this.getTransition(e);void 0!==n&&(t[`${e}-transition`]=n);}return t}transitioned(t,e){const r=new ni(this._properties);for(const n of Object.keys(this._values))r._values[n]=this._values[n].transitioned(t,e._values[n]);return r}untransitioned(){const t=new ni(this._properties);for(const e of Object.keys(this._values))t._values[e]=this._values[e].untransitioned();return t}}class ri{constructor(t,e,r,n,i){this.property=t,this.value=e,this.begin=i+n.delay||0,this.end=this.begin+n.duration||0,t.specification.transition&&(n.delay||n.duration)&&(this.prior=r);}possiblyEvaluate(t,e,r){const n=t.now||0,i=this.value.possiblyEvaluate(t,e,r),s=this.prior;if(s){if(n>this.end)return this.prior=null,i;if(this.value.isDataDriven())return this.prior=null,i;if(n<this.begin)return s.possiblyEvaluate(t,e,r);{const a=(n-this.begin)/(this.end-this.begin);return this.property.interpolate(s.possiblyEvaluate(t,e,r),i,function(t){if(t<=0)return 0;if(t>=1)return 1;const e=t*t,r=e*t;return 4*(t<.5?r:3*(t-e)+r-.75)}(a))}}return i}}class ni{constructor(t){this._properties=t,this._values=Object.create(t.defaultTransitioningPropertyValues);}possiblyEvaluate(t,e,r){const n=new ai(this._properties);for(const i of Object.keys(this._values))n._values[i]=this._values[i].possiblyEvaluate(t,e,r);return n}hasTransition(){for(const t of Object.keys(this._values))if(this._values[t].prior)return !0;return !1}}class ii{constructor(t){this._properties=t,this._values=Object.create(t.defaultPropertyValues);}getValue(t){return p(this._values[t].value)}setValue(t,e){this._values[t]=new Qn(this._values[t].property,null===e?void 0:p(e));}serialize(){const t={};for(const e of Object.keys(this._values)){const r=this.getValue(e);void 0!==r&&(t[e]=r);}return t}possiblyEvaluate(t,e,r){const n=new ai(this._properties);for(const i of Object.keys(this._values))n._values[i]=this._values[i].possiblyEvaluate(t,e,r);return n}}class si{constructor(t,e,r){this.property=t,this.value=e,this.parameters=r;}isConstant(){return "constant"===this.value.kind}constantOr(t){return "constant"===this.value.kind?this.value.value:t}evaluate(t,e,r,n){return this.property.evaluate(this.value,this.parameters,t,e,r,n)}}class ai{constructor(t){this._properties=t,this._values=Object.create(t.defaultPossiblyEvaluatedValues);}get(t){return this._values[t]}}class oi{constructor(t){this.specification=t;}possiblyEvaluate(t,e){return t.expression.evaluate(e)}interpolate(t,e,r){const n=Kt[this.specification.type];return n?n(t,e,r):t}}class li{constructor(t,e){this.specification=t,this.overrides=e;}possiblyEvaluate(t,e,r,n){return new si(this,"constant"===t.expression.kind||"camera"===t.expression.kind?{kind:"constant",value:t.expression.evaluate(e,null,{},r,n)}:t.expression,e)}interpolate(t,e,r){if("constant"!==t.value.kind||"constant"!==e.value.kind)return t;if(void 0===t.value.value||void 0===e.value.value)return new si(this,{kind:"constant",value:void 0},t.parameters);const n=Kt[this.specification.type];return n?new si(this,{kind:"constant",value:n(t.value.value,e.value.value,r)},t.parameters):t}evaluate(t,e,r,n,i,s){return "constant"===t.kind?t.value:t.evaluate(e,r,n,i,s)}}class ui extends li{possiblyEvaluate(t,e,r,n){if(void 0===t.value)return new si(this,{kind:"constant",value:void 0},e);if("constant"===t.expression.kind){const i=t.expression.evaluate(e,null,{},r,n),s="resolvedImage"===t.property.specification.type&&"string"!=typeof i?i.name:i,a=this._calculate(s,s,s,e);return new si(this,{kind:"constant",value:a},e)}if("camera"===t.expression.kind){const r=this._calculate(t.expression.evaluate({zoom:e.zoom-1}),t.expression.evaluate({zoom:e.zoom}),t.expression.evaluate({zoom:e.zoom+1}),e);return new si(this,{kind:"constant",value:r},e)}return new si(this,t.expression,e)}evaluate(t,e,r,n,i,s){if("source"===t.kind){const a=t.evaluate(e,r,n,i,s);return this._calculate(a,a,a,e)}return "composite"===t.kind?this._calculate(t.evaluate({zoom:Math.floor(e.zoom)-1},r,n),t.evaluate({zoom:Math.floor(e.zoom)},r,n),t.evaluate({zoom:Math.floor(e.zoom)+1},r,n),e):t.value}_calculate(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}}interpolate(t){return t}}class ci{constructor(t){this.specification=t;}possiblyEvaluate(t,e,r,n){if(void 0!==t.value){if("constant"===t.expression.kind){const i=t.expression.evaluate(e,null,{},r,n);return this._calculate(i,i,i,e)}return this._calculate(t.expression.evaluate(new Wn(Math.floor(e.zoom-1),e)),t.expression.evaluate(new Wn(Math.floor(e.zoom),e)),t.expression.evaluate(new Wn(Math.floor(e.zoom+1),e)),e)}}_calculate(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}}interpolate(t){return t}}class hi{constructor(t){this.specification=t;}possiblyEvaluate(t,e,r,n){return !!t.expression.evaluate(e,null,{},r,n)}interpolate(){return !1}}class pi{constructor(t){this.properties=t,this.defaultPropertyValues={},this.defaultTransitionablePropertyValues={},this.defaultTransitioningPropertyValues={},this.defaultPossiblyEvaluatedValues={},this.overridableProperties=[];for(const e in t){const r=t[e];r.specification.overridable&&this.overridableProperties.push(e);const n=this.defaultPropertyValues[e]=new Qn(r,void 0),i=this.defaultTransitionablePropertyValues[e]=new ti(r);this.defaultTransitioningPropertyValues[e]=i.untransitioned(),this.defaultPossiblyEvaluatedValues[e]=n.possiblyEvaluate({});}}}ir("DataDrivenProperty",li),ir("DataConstantProperty",oi),ir("CrossFadedDataDrivenProperty",ui),ir("CrossFadedProperty",ci),ir("ColorRampProperty",hi);const fi="-transition";class di extends Rr{constructor(t,e){if(super(),this.id=t.id,this.type=t.type,this._featureFilter={filter:()=>!0,needGeometry:!1},"custom"!==t.type&&(this.metadata=(t=t).metadata,this.minzoom=t.minzoom,this.maxzoom=t.maxzoom,"background"!==t.type&&(this.source=t.source,this.sourceLayer=t["source-layer"],this.filter=t.filter),e.layout&&(this._unevaluatedLayout=new ii(e.layout)),e.paint)){this._transitionablePaint=new ei(e.paint);for(const e in t.paint)this.setPaintProperty(e,t.paint[e],{validate:!1});for(const e in t.layout)this.setLayoutProperty(e,t.layout[e],{validate:!1});this._transitioningPaint=this._transitionablePaint.untransitioned(),this.paint=new ai(e.paint);}}getCrossfadeParameters(){return this._crossfadeParameters}getLayoutProperty(t){return "visibility"===t?this.visibility:this._unevaluatedLayout.getValue(t)}setLayoutProperty(t,e,r={}){null!=e&&this._validate(Mn,`layers.${this.id}.layout.${t}`,t,e,r)||("visibility"!==t?this._unevaluatedLayout.setValue(t,e):this.visibility=e);}getPaintProperty(t){return t.endsWith(fi)?this._transitionablePaint.getTransition(t.slice(0,-fi.length)):this._transitionablePaint.getValue(t)}setPaintProperty(t,e,r={}){if(null!=e&&this._validate(In,`layers.${this.id}.paint.${t}`,t,e,r))return !1;if(t.endsWith(fi))return this._transitionablePaint.setTransition(t.slice(0,-fi.length),e||void 0),!1;{const r=this._transitionablePaint._values[t],n="cross-faded-data-driven"===r.property.specification["property-type"],i=r.value.isDataDriven(),s=r.value;this._transitionablePaint.setValue(t,e),this._handleSpecialPaintPropertyUpdate(t);const a=this._transitionablePaint._values[t].value;return a.isDataDriven()||i||n||this._handleOverridablePaintPropertyUpdate(t,s,a)}}_handleSpecialPaintPropertyUpdate(t){}_handleOverridablePaintPropertyUpdate(t,e,r){return !1}isHidden(t){return !!(this.minzoom&&t<this.minzoom)||!!(this.maxzoom&&t>=this.maxzoom)||"none"===this.visibility}updateTransitions(t){this._transitioningPaint=this._transitionablePaint.transitioned(t,this._transitioningPaint);}hasTransition(){return this._transitioningPaint.hasTransition()}recalculate(t,e){t.getCrossfadeParameters&&(this._crossfadeParameters=t.getCrossfadeParameters()),this._unevaluatedLayout&&(this.layout=this._unevaluatedLayout.possiblyEvaluate(t,void 0,e)),this.paint=this._transitioningPaint.possiblyEvaluate(t,void 0,e);}serialize(){const t={id:this.id,type:this.type,source:this.source,"source-layer":this.sourceLayer,metadata:this.metadata,minzoom:this.minzoom,maxzoom:this.maxzoom,filter:this.filter,layout:this._unevaluatedLayout&&this._unevaluatedLayout.serialize(),paint:this._transitionablePaint&&this._transitionablePaint.serialize()};return this.visibility&&(t.layout=t.layout||{},t.layout.visibility=this.visibility),h(t,((t,e)=>!(void 0===t||"layout"===e&&!Object.keys(t).length||"paint"===e&&!Object.keys(t).length)))}_validate(t,e,r,n,i={}){return (!i||!1!==i.validate)&&Bn(this,t.call(Sn,{key:e,layerType:this.type,objectKey:r,value:n,styleSpec:Ur,style:{glyphs:!0,sprite:!0}}))}is3D(){return !1}isTileClipped(){return !1}hasOffscreenPass(){return !1}resize(){}isStateDependent(){for(const t in this.paint._values){const e=this.paint.get(t);if(e instanceof si&&De(e.property.specification)&&("source"===e.value.kind||"composite"===e.value.kind)&&e.value.isStateDependent)return !0}return !1}}const yi={Int8:Int8Array,Uint8:Uint8Array,Int16:Int16Array,Uint16:Uint16Array,Int32:Int32Array,Uint32:Uint32Array,Float32:Float32Array};class mi{constructor(t,e){this._structArray=t,this._pos1=e*this.size,this._pos2=this._pos1/2,this._pos4=this._pos1/4,this._pos8=this._pos1/8;}}class gi{constructor(){this.isTransferred=!1,this.capacity=-1,this.resize(0);}static serialize(t,e){return t._trim(),e&&(t.isTransferred=!0,e.push(t.arrayBuffer)),{length:t.length,arrayBuffer:t.arrayBuffer}}static deserialize(t){const e=Object.create(this.prototype);return e.arrayBuffer=t.arrayBuffer,e.length=t.length,e.capacity=t.arrayBuffer.byteLength/e.bytesPerElement,e._refreshViews(),e}_trim(){this.length!==this.capacity&&(this.capacity=this.length,this.arrayBuffer=this.arrayBuffer.slice(0,this.length*this.bytesPerElement),this._refreshViews());}clear(){this.length=0;}resize(t){this.reserve(t),this.length=t;}reserve(t){if(t>this.capacity){this.capacity=Math.max(t,Math.floor(5*this.capacity),128),this.arrayBuffer=new ArrayBuffer(this.capacity*this.bytesPerElement);const e=this.uint8;this._refreshViews(),e&&this.uint8.set(e);}}_refreshViews(){throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")}}function xi(t,e=1){let r=0,n=0;return {members:t.map((t=>{const i=yi[t.type].BYTES_PER_ELEMENT,s=r=vi(r,Math.max(e,i)),a=t.components||1;return n=Math.max(n,i),r+=i*a,{name:t.name,type:t.type,components:a,offset:s}})),size:vi(r,Math.max(n,e)),alignment:e}}function vi(t,e){return Math.ceil(t/e)*e}class bi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const n=2*t;return this.int16[n+0]=e,this.int16[n+1]=r,t}}bi.prototype.bytesPerElement=4,ir("StructArrayLayout2i4",bi);class wi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,n){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)}emplace(t,e,r,n,i){const s=4*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=n,this.int16[s+3]=i,t}}wi.prototype.bytesPerElement=8,ir("StructArrayLayout4i8",wi);class _i extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s){const a=this.length;return this.resize(a+1),this.emplace(a,t,e,r,n,i,s)}emplace(t,e,r,n,i,s,a){const o=6*t;return this.int16[o+0]=e,this.int16[o+1]=r,this.int16[o+2]=n,this.int16[o+3]=i,this.int16[o+4]=s,this.int16[o+5]=a,t}}_i.prototype.bytesPerElement=12,ir("StructArrayLayout2i4i12",_i);class Ai extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s){const a=this.length;return this.resize(a+1),this.emplace(a,t,e,r,n,i,s)}emplace(t,e,r,n,i,s,a){const o=4*t,l=8*t;return this.int16[o+0]=e,this.int16[o+1]=r,this.uint8[l+4]=n,this.uint8[l+5]=i,this.uint8[l+6]=s,this.uint8[l+7]=a,t}}Ai.prototype.bytesPerElement=8,ir("StructArrayLayout2i4ub8",Ai);class ki extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const n=2*t;return this.float32[n+0]=e,this.float32[n+1]=r,t}}ki.prototype.bytesPerElement=8,ir("StructArrayLayout2f8",ki);class Si extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s,a,o,l,u){const c=this.length;return this.resize(c+1),this.emplace(c,t,e,r,n,i,s,a,o,l,u)}emplace(t,e,r,n,i,s,a,o,l,u,c){const h=10*t;return this.uint16[h+0]=e,this.uint16[h+1]=r,this.uint16[h+2]=n,this.uint16[h+3]=i,this.uint16[h+4]=s,this.uint16[h+5]=a,this.uint16[h+6]=o,this.uint16[h+7]=l,this.uint16[h+8]=u,this.uint16[h+9]=c,t}}Si.prototype.bytesPerElement=20,ir("StructArrayLayout10ui20",Si);class zi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s,a,o,l,u,c,h){const p=this.length;return this.resize(p+1),this.emplace(p,t,e,r,n,i,s,a,o,l,u,c,h)}emplace(t,e,r,n,i,s,a,o,l,u,c,h,p){const f=12*t;return this.int16[f+0]=e,this.int16[f+1]=r,this.int16[f+2]=n,this.int16[f+3]=i,this.uint16[f+4]=s,this.uint16[f+5]=a,this.uint16[f+6]=o,this.uint16[f+7]=l,this.int16[f+8]=u,this.int16[f+9]=c,this.int16[f+10]=h,this.int16[f+11]=p,t}}zi.prototype.bytesPerElement=24,ir("StructArrayLayout4i4ui4i24",zi);class Ii extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)}emplace(t,e,r,n){const i=3*t;return this.float32[i+0]=e,this.float32[i+1]=r,this.float32[i+2]=n,t}}Ii.prototype.bytesPerElement=12,ir("StructArrayLayout3f12",Ii);class Mi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.uint32[1*t+0]=e,t}}Mi.prototype.bytesPerElement=4,ir("StructArrayLayout1ul4",Mi);class Bi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s,a,o,l){const u=this.length;return this.resize(u+1),this.emplace(u,t,e,r,n,i,s,a,o,l)}emplace(t,e,r,n,i,s,a,o,l,u){const c=10*t,h=5*t;return this.int16[c+0]=e,this.int16[c+1]=r,this.int16[c+2]=n,this.int16[c+3]=i,this.int16[c+4]=s,this.int16[c+5]=a,this.uint32[h+3]=o,this.uint16[c+8]=l,this.uint16[c+9]=u,t}}Bi.prototype.bytesPerElement=20,ir("StructArrayLayout6i1ul2ui20",Bi);class Ci extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s){const a=this.length;return this.resize(a+1),this.emplace(a,t,e,r,n,i,s)}emplace(t,e,r,n,i,s,a){const o=6*t;return this.int16[o+0]=e,this.int16[o+1]=r,this.int16[o+2]=n,this.int16[o+3]=i,this.int16[o+4]=s,this.int16[o+5]=a,t}}Ci.prototype.bytesPerElement=12,ir("StructArrayLayout2i2i2i12",Ci);class Pi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i){const s=this.length;return this.resize(s+1),this.emplace(s,t,e,r,n,i)}emplace(t,e,r,n,i,s){const a=4*t,o=8*t;return this.float32[a+0]=e,this.float32[a+1]=r,this.float32[a+2]=n,this.int16[o+6]=i,this.int16[o+7]=s,t}}Pi.prototype.bytesPerElement=16,ir("StructArrayLayout2f1f2i16",Pi);class Vi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,n){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)}emplace(t,e,r,n,i){const s=12*t,a=3*t;return this.uint8[s+0]=e,this.uint8[s+1]=r,this.float32[a+1]=n,this.float32[a+2]=i,t}}Vi.prototype.bytesPerElement=12,ir("StructArrayLayout2ub2f12",Vi);class Ei extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)}emplace(t,e,r,n){const i=3*t;return this.uint16[i+0]=e,this.uint16[i+1]=r,this.uint16[i+2]=n,t}}Ei.prototype.bytesPerElement=6,ir("StructArrayLayout3ui6",Ei);class Fi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m){const g=this.length;return this.resize(g+1),this.emplace(g,t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m)}emplace(t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m,g){const x=24*t,v=12*t,b=48*t;return this.int16[x+0]=e,this.int16[x+1]=r,this.uint16[x+2]=n,this.uint16[x+3]=i,this.uint32[v+2]=s,this.uint32[v+3]=a,this.uint32[v+4]=o,this.uint16[x+10]=l,this.uint16[x+11]=u,this.uint16[x+12]=c,this.float32[v+7]=h,this.float32[v+8]=p,this.uint8[b+36]=f,this.uint8[b+37]=d,this.uint8[b+38]=y,this.uint32[v+10]=m,this.int16[x+22]=g,t}}Fi.prototype.bytesPerElement=48,ir("StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48",Fi);class Ti extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m,g,x,v,b,w,_,A,k,S,z,I){const M=this.length;return this.resize(M+1),this.emplace(M,t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m,g,x,v,b,w,_,A,k,S,z,I)}emplace(t,e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m,g,x,v,b,w,_,A,k,S,z,I,M){const B=34*t,C=17*t;return this.int16[B+0]=e,this.int16[B+1]=r,this.int16[B+2]=n,this.int16[B+3]=i,this.int16[B+4]=s,this.int16[B+5]=a,this.int16[B+6]=o,this.int16[B+7]=l,this.uint16[B+8]=u,this.uint16[B+9]=c,this.uint16[B+10]=h,this.uint16[B+11]=p,this.uint16[B+12]=f,this.uint16[B+13]=d,this.uint16[B+14]=y,this.uint16[B+15]=m,this.uint16[B+16]=g,this.uint16[B+17]=x,this.uint16[B+18]=v,this.uint16[B+19]=b,this.uint16[B+20]=w,this.uint16[B+21]=_,this.uint16[B+22]=A,this.uint32[C+12]=k,this.float32[C+13]=S,this.float32[C+14]=z,this.float32[C+15]=I,this.float32[C+16]=M,t}}Ti.prototype.bytesPerElement=68,ir("StructArrayLayout8i15ui1ul4f68",Ti);class Li extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.float32[1*t+0]=e,t}}Li.prototype.bytesPerElement=4,ir("StructArrayLayout1f4",Li);class Di extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)}emplace(t,e,r,n){const i=3*t;return this.int16[i+0]=e,this.int16[i+1]=r,this.int16[i+2]=n,t}}Di.prototype.bytesPerElement=6,ir("StructArrayLayout3i6",Di);class $i extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)}emplace(t,e,r,n){const i=4*t;return this.uint32[2*t+0]=e,this.uint16[i+2]=r,this.uint16[i+3]=n,t}}$i.prototype.bytesPerElement=8,ir("StructArrayLayout1ul2ui8",$i);class Oi extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const n=2*t;return this.uint16[n+0]=e,this.uint16[n+1]=r,t}}Oi.prototype.bytesPerElement=4,ir("StructArrayLayout2ui4",Oi);class Ri extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.uint16[1*t+0]=e,t}}Ri.prototype.bytesPerElement=2,ir("StructArrayLayout1ui2",Ri);class Ui extends gi{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,n){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)}emplace(t,e,r,n,i){const s=4*t;return this.float32[s+0]=e,this.float32[s+1]=r,this.float32[s+2]=n,this.float32[s+3]=i,t}}Ui.prototype.bytesPerElement=16,ir("StructArrayLayout4f16",Ui);class qi extends mi{get anchorPointX(){return this._structArray.int16[this._pos2+0]}get anchorPointY(){return this._structArray.int16[this._pos2+1]}get x1(){return this._structArray.int16[this._pos2+2]}get y1(){return this._structArray.int16[this._pos2+3]}get x2(){return this._structArray.int16[this._pos2+4]}get y2(){return this._structArray.int16[this._pos2+5]}get featureIndex(){return this._structArray.uint32[this._pos4+3]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+8]}get bucketIndex(){return this._structArray.uint16[this._pos2+9]}get anchorPoint(){return new lr(this.anchorPointX,this.anchorPointY)}}qi.prototype.size=20;class ji extends Bi{get(t){return new qi(this,t)}}ir("CollisionBoxArray",ji);class Ni extends mi{get anchorX(){return this._structArray.int16[this._pos2+0]}get anchorY(){return this._structArray.int16[this._pos2+1]}get glyphStartIndex(){return this._structArray.uint16[this._pos2+2]}get numGlyphs(){return this._structArray.uint16[this._pos2+3]}get vertexStartIndex(){return this._structArray.uint32[this._pos4+2]}get lineStartIndex(){return this._structArray.uint32[this._pos4+3]}get lineLength(){return this._structArray.uint32[this._pos4+4]}get segment(){return this._structArray.uint16[this._pos2+10]}get lowerSize(){return this._structArray.uint16[this._pos2+11]}get upperSize(){return this._structArray.uint16[this._pos2+12]}get lineOffsetX(){return this._structArray.float32[this._pos4+7]}get lineOffsetY(){return this._structArray.float32[this._pos4+8]}get writingMode(){return this._structArray.uint8[this._pos1+36]}get placedOrientation(){return this._structArray.uint8[this._pos1+37]}set placedOrientation(t){this._structArray.uint8[this._pos1+37]=t;}get hidden(){return this._structArray.uint8[this._pos1+38]}set hidden(t){this._structArray.uint8[this._pos1+38]=t;}get crossTileID(){return this._structArray.uint32[this._pos4+10]}set crossTileID(t){this._structArray.uint32[this._pos4+10]=t;}get associatedIconIndex(){return this._structArray.int16[this._pos2+22]}}Ni.prototype.size=48;class Ki extends Fi{get(t){return new Ni(this,t)}}ir("PlacedSymbolArray",Ki);class Zi extends mi{get anchorX(){return this._structArray.int16[this._pos2+0]}get anchorY(){return this._structArray.int16[this._pos2+1]}get rightJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+2]}get centerJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+3]}get leftJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+4]}get verticalPlacedTextSymbolIndex(){return this._structArray.int16[this._pos2+5]}get placedIconSymbolIndex(){return this._structArray.int16[this._pos2+6]}get verticalPlacedIconSymbolIndex(){return this._structArray.int16[this._pos2+7]}get key(){return this._structArray.uint16[this._pos2+8]}get textBoxStartIndex(){return this._structArray.uint16[this._pos2+9]}get textBoxEndIndex(){return this._structArray.uint16[this._pos2+10]}get verticalTextBoxStartIndex(){return this._structArray.uint16[this._pos2+11]}get verticalTextBoxEndIndex(){return this._structArray.uint16[this._pos2+12]}get iconBoxStartIndex(){return this._structArray.uint16[this._pos2+13]}get iconBoxEndIndex(){return this._structArray.uint16[this._pos2+14]}get verticalIconBoxStartIndex(){return this._structArray.uint16[this._pos2+15]}get verticalIconBoxEndIndex(){return this._structArray.uint16[this._pos2+16]}get featureIndex(){return this._structArray.uint16[this._pos2+17]}get numHorizontalGlyphVertices(){return this._structArray.uint16[this._pos2+18]}get numVerticalGlyphVertices(){return this._structArray.uint16[this._pos2+19]}get numIconVertices(){return this._structArray.uint16[this._pos2+20]}get numVerticalIconVertices(){return this._structArray.uint16[this._pos2+21]}get useRuntimeCollisionCircles(){return this._structArray.uint16[this._pos2+22]}get crossTileID(){return this._structArray.uint32[this._pos4+12]}set crossTileID(t){this._structArray.uint32[this._pos4+12]=t;}get textBoxScale(){return this._structArray.float32[this._pos4+13]}get textOffset0(){return this._structArray.float32[this._pos4+14]}get textOffset1(){return this._structArray.float32[this._pos4+15]}get collisionCircleDiameter(){return this._structArray.float32[this._pos4+16]}}Zi.prototype.size=68;class Gi extends Ti{get(t){return new Zi(this,t)}}ir("SymbolInstanceArray",Gi);class Ji extends Li{getoffsetX(t){return this.float32[1*t+0]}}ir("GlyphOffsetArray",Ji);class Xi extends Di{getx(t){return this.int16[3*t+0]}gety(t){return this.int16[3*t+1]}gettileUnitDistanceFromAnchor(t){return this.int16[3*t+2]}}ir("SymbolLineVertexArray",Xi);class Yi extends mi{get featureIndex(){return this._structArray.uint32[this._pos4+0]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+2]}get bucketIndex(){return this._structArray.uint16[this._pos2+3]}}Yi.prototype.size=8;class Hi extends $i{get(t){return new Yi(this,t)}}ir("FeatureIndexArray",Hi);const Wi=xi([{name:"a_pos",components:2,type:"Int16"}],4),{members:Qi}=Wi;class ts{constructor(t=[]){this.segments=t;}prepareSegment(t,e,r,n){let i=this.segments[this.segments.length-1];return t>ts.MAX_VERTEX_ARRAY_LENGTH&&d(`Max vertices per segment is ${ts.MAX_VERTEX_ARRAY_LENGTH}: bucket requested ${t}`),(!i||i.vertexLength+t>ts.MAX_VERTEX_ARRAY_LENGTH||i.sortKey!==n)&&(i={vertexOffset:e.length,primitiveOffset:r.length,vertexLength:0,primitiveLength:0},void 0!==n&&(i.sortKey=n),this.segments.push(i)),i}get(){return this.segments}destroy(){for(const t of this.segments)for(const e in t.vaos)t.vaos[e].destroy();}static simpleSegment(t,e,r,n){return new ts([{vertexOffset:t,primitiveOffset:e,vertexLength:r,primitiveLength:n,vaos:{},sortKey:0}])}}function es(t,e){return 256*(t=s(Math.floor(t),0,255))+s(Math.floor(e),0,255)}ts.MAX_VERTEX_ARRAY_LENGTH=Math.pow(2,16)-1,ir("SegmentVector",ts);const rs=xi([{name:"a_pattern_from",components:4,type:"Uint16"},{name:"a_pattern_to",components:4,type:"Uint16"},{name:"a_pixel_ratio_from",components:1,type:"Uint16"},{name:"a_pixel_ratio_to",components:1,type:"Uint16"}]);var ns={exports:{}},is={exports:{}};is.exports=function(t,e){var r,n,i,s,a,o,l,u;for(n=t.length-(r=3&t.length),i=e,a=3432918353,o=461845907,u=0;u<n;)l=255&t.charCodeAt(u)|(255&t.charCodeAt(++u))<<8|(255&t.charCodeAt(++u))<<16|(255&t.charCodeAt(++u))<<24,++u,i=27492+(65535&(s=5*(65535&(i=(i^=l=(65535&(l=(l=(65535&l)*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*o+(((l>>>16)*o&65535)<<16)&4294967295)<<13|i>>>19))+((5*(i>>>16)&65535)<<16)&4294967295))+((58964+(s>>>16)&65535)<<16);switch(l=0,r){case 3:l^=(255&t.charCodeAt(u+2))<<16;case 2:l^=(255&t.charCodeAt(u+1))<<8;case 1:i^=l=(65535&(l=(l=(65535&(l^=255&t.charCodeAt(u)))*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*o+(((l>>>16)*o&65535)<<16)&4294967295;}return i^=t.length,i=2246822507*(65535&(i^=i>>>16))+((2246822507*(i>>>16)&65535)<<16)&4294967295,i=3266489909*(65535&(i^=i>>>13))+((3266489909*(i>>>16)&65535)<<16)&4294967295,(i^=i>>>16)>>>0};var ss={exports:{}};ss.exports=function(t,e){for(var r,n=t.length,i=e^n,s=0;n>=4;)r=1540483477*(65535&(r=255&t.charCodeAt(s)|(255&t.charCodeAt(++s))<<8|(255&t.charCodeAt(++s))<<16|(255&t.charCodeAt(++s))<<24))+((1540483477*(r>>>16)&65535)<<16),i=1540483477*(65535&i)+((1540483477*(i>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),n-=4,++s;switch(n){case 3:i^=(255&t.charCodeAt(s+2))<<16;case 2:i^=(255&t.charCodeAt(s+1))<<8;case 1:i=1540483477*(65535&(i^=255&t.charCodeAt(s)))+((1540483477*(i>>>16)&65535)<<16);}return i=1540483477*(65535&(i^=i>>>13))+((1540483477*(i>>>16)&65535)<<16),(i^=i>>>15)>>>0};var as=is.exports,os=ss.exports;ns.exports=as,ns.exports.murmur3=as,ns.exports.murmur2=os;var ls=ns.exports;class us{constructor(){this.ids=[],this.positions=[],this.indexed=!1;}add(t,e,r,n){this.ids.push(cs(t)),this.positions.push(e,r,n);}getPositions(t){const e=cs(t);let r=0,n=this.ids.length-1;for(;r<n;){const t=r+n>>1;this.ids[t]>=e?n=t:r=t+1;}const i=[];for(;this.ids[r]===e;)i.push({index:this.positions[3*r],start:this.positions[3*r+1],end:this.positions[3*r+2]}),r++;return i}static serialize(t,e){const r=new Float64Array(t.ids),n=new Uint32Array(t.positions);return hs(r,n,0,r.length-1),e&&e.push(r.buffer,n.buffer),{ids:r,positions:n}}static deserialize(t){const e=new us;return e.ids=t.ids,e.positions=t.positions,e.indexed=!0,e}}function cs(t){const e=+t;return !isNaN(e)&&e<=Number.MAX_SAFE_INTEGER?e:ls(String(t))}function hs(t,e,r,n){for(;r<n;){const i=t[r+n>>1];let s=r-1,a=n+1;for(;;){do{s++;}while(t[s]<i);do{a--;}while(t[a]>i);if(s>=a)break;ps(t,s,a),ps(e,3*s,3*a),ps(e,3*s+1,3*a+1),ps(e,3*s+2,3*a+2);}a-r<n-a?(hs(t,e,r,a),r=a+1):(hs(t,e,a+1,n),n=a);}}function ps(t,e,r){const n=t[e];t[e]=t[r],t[r]=n;}ir("FeaturePositionMap",us);class fs{constructor(t,e){this.gl=t.gl,this.location=e;}}class ds extends fs{constructor(t,e){super(t,e),this.current=0;}set(t){this.current!==t&&(this.current=t,this.gl.uniform1f(this.location,t));}}class ys extends fs{constructor(t,e){super(t,e),this.current=[0,0,0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]&&t[3]===this.current[3]||(this.current=t,this.gl.uniform4f(this.location,t[0],t[1],t[2],t[3]));}}class ms extends fs{constructor(t,e){super(t,e),this.current=E.transparent;}set(t){t.r===this.current.r&&t.g===this.current.g&&t.b===this.current.b&&t.a===this.current.a||(this.current=t,this.gl.uniform4f(this.location,t.r,t.g,t.b,t.a));}}const gs=new Float32Array(16);function xs(t){return [es(255*t.r,255*t.g),es(255*t.b,255*t.a)]}class vs{constructor(t,e,r){this.value=t,this.uniformNames=e.map((t=>`u_${t}`)),this.type=r;}setUniform(t,e,r){t.set(r.constantOr(this.value));}getBinding(t,e,r){return "color"===this.type?new ms(t,e):new ds(t,e)}}class bs{constructor(t,e){this.uniformNames=e.map((t=>`u_${t}`)),this.patternFrom=null,this.patternTo=null,this.pixelRatioFrom=1,this.pixelRatioTo=1;}setConstantPatternPositions(t,e){this.pixelRatioFrom=e.pixelRatio,this.pixelRatioTo=t.pixelRatio,this.patternFrom=e.tlbr,this.patternTo=t.tlbr;}setUniform(t,e,r,n){const i="u_pattern_to"===n?this.patternTo:"u_pattern_from"===n?this.patternFrom:"u_pixel_ratio_to"===n?this.pixelRatioTo:"u_pixel_ratio_from"===n?this.pixelRatioFrom:null;i&&t.set(i);}getBinding(t,e,r){return "u_pattern"===r.substr(0,9)?new ys(t,e):new ds(t,e)}}class ws{constructor(t,e,r,n){this.expression=t,this.type=r,this.maxValue=0,this.paintVertexAttributes=e.map((t=>({name:`a_${t}`,type:"Float32",components:"color"===r?2:1,offset:0}))),this.paintVertexArray=new n;}populatePaintArray(t,e,r,n,i){const s=this.paintVertexArray.length,a=this.expression.evaluate(new Wn(0),e,{},n,[],i);this.paintVertexArray.resize(t),this._setPaintValue(s,t,a);}updatePaintArray(t,e,r,n){const i=this.expression.evaluate({zoom:0},r,n);this._setPaintValue(t,e,i);}_setPaintValue(t,e,r){if("color"===this.type){const n=xs(r);for(let r=t;r<e;r++)this.paintVertexArray.emplace(r,n[0],n[1]);}else {for(let n=t;n<e;n++)this.paintVertexArray.emplace(n,r);this.maxValue=Math.max(this.maxValue,Math.abs(r));}}upload(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}}class _s{constructor(t,e,r,n,i,s){this.expression=t,this.uniformNames=e.map((t=>`u_${t}_t`)),this.type=r,this.useIntegerZoom=n,this.zoom=i,this.maxValue=0,this.paintVertexAttributes=e.map((t=>({name:`a_${t}`,type:"Float32",components:"color"===r?4:2,offset:0}))),this.paintVertexArray=new s;}populatePaintArray(t,e,r,n,i){const s=this.expression.evaluate(new Wn(this.zoom),e,{},n,[],i),a=this.expression.evaluate(new Wn(this.zoom+1),e,{},n,[],i),o=this.paintVertexArray.length;this.paintVertexArray.resize(t),this._setPaintValue(o,t,s,a);}updatePaintArray(t,e,r,n){const i=this.expression.evaluate({zoom:this.zoom},r,n),s=this.expression.evaluate({zoom:this.zoom+1},r,n);this._setPaintValue(t,e,i,s);}_setPaintValue(t,e,r,n){if("color"===this.type){const i=xs(r),s=xs(n);for(let r=t;r<e;r++)this.paintVertexArray.emplace(r,i[0],i[1],s[0],s[1]);}else {for(let i=t;i<e;i++)this.paintVertexArray.emplace(i,r,n);this.maxValue=Math.max(this.maxValue,Math.abs(r),Math.abs(n));}}upload(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}setUniform(t,e){const r=this.useIntegerZoom?Math.floor(e.zoom):e.zoom,n=s(this.expression.interpolationFactor(r,this.zoom,this.zoom+1),0,1);t.set(n);}getBinding(t,e,r){return new ds(t,e)}}class As{constructor(t,e,r,n,i,s){this.expression=t,this.type=e,this.useIntegerZoom=r,this.zoom=n,this.layerId=s,this.zoomInPaintVertexArray=new i,this.zoomOutPaintVertexArray=new i;}populatePaintArray(t,e,r){const n=this.zoomInPaintVertexArray.length;this.zoomInPaintVertexArray.resize(t),this.zoomOutPaintVertexArray.resize(t),this._setPaintValues(n,t,e.patterns&&e.patterns[this.layerId],r);}updatePaintArray(t,e,r,n,i){this._setPaintValues(t,e,r.patterns&&r.patterns[this.layerId],i);}_setPaintValues(t,e,r,n){if(!n||!r)return;const{min:i,mid:s,max:a}=r,o=n[i],l=n[s],u=n[a];if(o&&l&&u)for(let r=t;r<e;r++)this.zoomInPaintVertexArray.emplace(r,l.tl[0],l.tl[1],l.br[0],l.br[1],o.tl[0],o.tl[1],o.br[0],o.br[1],l.pixelRatio,o.pixelRatio),this.zoomOutPaintVertexArray.emplace(r,l.tl[0],l.tl[1],l.br[0],l.br[1],u.tl[0],u.tl[1],u.br[0],u.br[1],l.pixelRatio,u.pixelRatio);}upload(t){this.zoomInPaintVertexArray&&this.zoomInPaintVertexArray.arrayBuffer&&this.zoomOutPaintVertexArray&&this.zoomOutPaintVertexArray.arrayBuffer&&(this.zoomInPaintVertexBuffer=t.createVertexBuffer(this.zoomInPaintVertexArray,rs.members,this.expression.isStateDependent),this.zoomOutPaintVertexBuffer=t.createVertexBuffer(this.zoomOutPaintVertexArray,rs.members,this.expression.isStateDependent));}destroy(){this.zoomOutPaintVertexBuffer&&this.zoomOutPaintVertexBuffer.destroy(),this.zoomInPaintVertexBuffer&&this.zoomInPaintVertexBuffer.destroy();}}class ks{constructor(t,e,r){this.binders={},this._buffers=[];const n=[];for(const i in t.paint._values){if(!r(i))continue;const s=t.paint.get(i);if(!(s instanceof si&&De(s.property.specification)))continue;const a=zs(i,t.type),o=s.value,l=s.property.specification.type,u=s.property.useIntegerZoom,c=s.property.specification["property-type"],h="cross-faded"===c||"cross-faded-data-driven"===c;if("constant"===o.kind)this.binders[i]=h?new bs(o.value,a):new vs(o.value,a,l),n.push(`/u_${i}`);else if("source"===o.kind||h){const r=Is(i,l,"source");this.binders[i]=h?new As(o,l,u,e,r,t.id):new ws(o,a,l,r),n.push(`/a_${i}`);}else {const t=Is(i,l,"composite");this.binders[i]=new _s(o,a,l,u,e,t),n.push(`/z_${i}`);}}this.cacheKey=n.sort().join("");}getMaxValue(t){const e=this.binders[t];return e instanceof ws||e instanceof _s?e.maxValue:0}populatePaintArrays(t,e,r,n,i){for(const s in this.binders){const a=this.binders[s];(a instanceof ws||a instanceof _s||a instanceof As)&&a.populatePaintArray(t,e,r,n,i);}}setConstantPatternPositions(t,e){for(const r in this.binders){const n=this.binders[r];n instanceof bs&&n.setConstantPatternPositions(t,e);}}updatePaintArrays(t,e,r,n,i){let s=!1;for(const a in t){const o=e.getPositions(a);for(const e of o){const o=r.feature(e.index);for(const r in this.binders){const l=this.binders[r];if((l instanceof ws||l instanceof _s||l instanceof As)&&!0===l.expression.isStateDependent){const u=n.paint.get(r);l.expression=u.value,l.updatePaintArray(e.start,e.end,o,t[a],i),s=!0;}}}}return s}defines(){const t=[];for(const e in this.binders){const r=this.binders[e];(r instanceof vs||r instanceof bs)&&t.push(...r.uniformNames.map((t=>`#define HAS_UNIFORM_${t}`)));}return t}getBinderAttributes(){const t=[];for(const e in this.binders){const r=this.binders[e];if(r instanceof ws||r instanceof _s)for(let e=0;e<r.paintVertexAttributes.length;e++)t.push(r.paintVertexAttributes[e].name);else if(r instanceof As)for(let e=0;e<rs.members.length;e++)t.push(rs.members[e].name);}return t}getBinderUniforms(){const t=[];for(const e in this.binders){const r=this.binders[e];if(r instanceof vs||r instanceof bs||r instanceof _s)for(const e of r.uniformNames)t.push(e);}return t}getPaintVertexBuffers(){return this._buffers}getUniforms(t,e){const r=[];for(const n in this.binders){const i=this.binders[n];if(i instanceof vs||i instanceof bs||i instanceof _s)for(const s of i.uniformNames)if(e[s]){const a=i.getBinding(t,e[s],s);r.push({name:s,property:n,binding:a});}}return r}setUniforms(t,e,r,n){for(const{name:t,property:i,binding:s}of e)this.binders[i].setUniform(s,n,r.get(i),t);}updatePaintBuffers(t){this._buffers=[];for(const e in this.binders){const r=this.binders[e];if(t&&r instanceof As){const e=2===t.fromScale?r.zoomInPaintVertexBuffer:r.zoomOutPaintVertexBuffer;e&&this._buffers.push(e);}else (r instanceof ws||r instanceof _s)&&r.paintVertexBuffer&&this._buffers.push(r.paintVertexBuffer);}}upload(t){for(const e in this.binders){const r=this.binders[e];(r instanceof ws||r instanceof _s||r instanceof As)&&r.upload(t);}this.updatePaintBuffers();}destroy(){for(const t in this.binders){const e=this.binders[t];(e instanceof ws||e instanceof _s||e instanceof As)&&e.destroy();}}}class Ss{constructor(t,e,r=(()=>!0)){this.programConfigurations={};for(const n of t)this.programConfigurations[n.id]=new ks(n,e,r);this.needsUpload=!1,this._featureMap=new us,this._bufferOffset=0;}populatePaintArrays(t,e,r,n,i,s){for(const r in this.programConfigurations)this.programConfigurations[r].populatePaintArrays(t,e,n,i,s);void 0!==e.id&&this._featureMap.add(e.id,r,this._bufferOffset,t),this._bufferOffset=t,this.needsUpload=!0;}updatePaintArrays(t,e,r,n){for(const i of r)this.needsUpload=this.programConfigurations[i.id].updatePaintArrays(t,this._featureMap,e,i,n)||this.needsUpload;}get(t){return this.programConfigurations[t]}upload(t){if(this.needsUpload){for(const e in this.programConfigurations)this.programConfigurations[e].upload(t);this.needsUpload=!1;}}destroy(){for(const t in this.programConfigurations)this.programConfigurations[t].destroy();}}function zs(t,e){return {"text-opacity":["opacity"],"icon-opacity":["opacity"],"text-color":["fill_color"],"icon-color":["fill_color"],"text-halo-color":["halo_color"],"icon-halo-color":["halo_color"],"text-halo-blur":["halo_blur"],"icon-halo-blur":["halo_blur"],"text-halo-width":["halo_width"],"icon-halo-width":["halo_width"],"line-gap-width":["gapwidth"],"line-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-extrusion-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"]}[t]||[t.replace(`${e}-`,"").replace(/-/g,"_")]}function Is(t,e,r){const n={color:{source:ki,composite:Ui},number:{source:Li,composite:ki}},i=function(t){return {"line-pattern":{source:Si,composite:Si},"fill-pattern":{source:Si,composite:Si},"fill-extrusion-pattern":{source:Si,composite:Si}}[t]}(t);return i&&i[r]||n[e][r]}ir("ConstantBinder",vs),ir("CrossFadedConstantBinder",bs),ir("SourceExpressionBinder",ws),ir("CrossFadedCompositeBinder",As),ir("CompositeExpressionBinder",_s),ir("ProgramConfiguration",ks,{omit:["_buffers"]}),ir("ProgramConfigurationSet",Ss);var Ms=8192;const Bs=Math.pow(2,14)-1,Cs=-Bs-1;function Ps(t){const e=Ms/t.extent,r=t.loadGeometry();for(let t=0;t<r.length;t++){const n=r[t];for(let t=0;t<n.length;t++){const r=n[t],i=Math.round(r.x*e),a=Math.round(r.y*e);r.x=s(i,Cs,Bs),r.y=s(a,Cs,Bs),(i<r.x||i>r.x+1||a<r.y||a>r.y+1)&&d("Geometry exceeds allowed extent, reduce your vector tile buffer size");}}return r}function Vs(t,e){return {type:t.type,id:t.id,properties:t.properties,geometry:e?Ps(t):[]}}function Es(t,e,r,n,i){t.emplaceBack(2*e+(n+1)/2,2*r+(i+1)/2);}class Fs{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((t=>t.id)),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new bi,this.indexArray=new Ei,this.segments=new ts,this.programConfigurations=new Ss(t.layers,t.zoom),this.stateDependentLayerIds=this.layers.filter((t=>t.isStateDependent())).map((t=>t.id));}populate(t,e,r){const n=this.layers[0],i=[];let s=null,a=!1;"circle"===n.type&&(s=n.layout.get("circle-sort-key"),a=!s.isConstant());for(const{feature:e,id:n,index:o,sourceLayerIndex:l}of t){const t=this.layers[0]._featureFilter.needGeometry,u=Vs(e,t);if(!this.layers[0]._featureFilter.filter(new Wn(this.zoom),u,r))continue;const c=a?s.evaluate(u,{},r):void 0,h={id:n,properties:e.properties,type:e.type,sourceLayerIndex:l,index:o,geometry:t?u.geometry:Ps(e),patterns:{},sortKey:c};i.push(h);}a&&i.sort(((t,e)=>t.sortKey-e.sortKey));for(const n of i){const{geometry:i,index:s,sourceLayerIndex:a}=n,o=t[s].feature;this.addFeature(n,i,s,r),e.featureIndex.insert(o,i,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Qi),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}addFeature(t,e,r,n){for(const r of e)for(const e of r){const r=e.x,n=e.y;if(r<0||r>=Ms||n<0||n>=Ms)continue;const i=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray,t.sortKey),s=i.vertexLength;Es(this.layoutVertexArray,r,n,-1,-1),Es(this.layoutVertexArray,r,n,1,-1),Es(this.layoutVertexArray,r,n,1,1),Es(this.layoutVertexArray,r,n,-1,1),this.indexArray.emplaceBack(s,s+1,s+2),this.indexArray.emplaceBack(s,s+3,s+2),i.vertexLength+=4,i.primitiveLength+=2;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,{},n);}}function Ts(t,e){for(let r=0;r<t.length;r++)if(Ns(e,t[r]))return !0;for(let r=0;r<e.length;r++)if(Ns(t,e[r]))return !0;return !!Os(t,e)}function Ls(t,e,r){return !!Ns(t,e)||!!Us(e,t,r)}function Ds(t,e){if(1===t.length)return js(e,t[0]);for(let r=0;r<e.length;r++){const n=e[r];for(let e=0;e<n.length;e++)if(Ns(t,n[e]))return !0}for(let r=0;r<t.length;r++)if(js(e,t[r]))return !0;for(let r=0;r<e.length;r++)if(Os(t,e[r]))return !0;return !1}function $s(t,e,r){if(t.length>1){if(Os(t,e))return !0;for(let n=0;n<e.length;n++)if(Us(e[n],t,r))return !0}for(let n=0;n<t.length;n++)if(Us(t[n],e,r))return !0;return !1}function Os(t,e){if(0===t.length||0===e.length)return !1;for(let r=0;r<t.length-1;r++){const n=t[r],i=t[r+1];for(let t=0;t<e.length-1;t++)if(Rs(n,i,e[t],e[t+1]))return !0}return !1}function Rs(t,e,r,n){return y(t,r,n)!==y(e,r,n)&&y(t,e,r)!==y(t,e,n)}function Us(t,e,r){const n=r*r;if(1===e.length)return t.distSqr(e[0])<n;for(let r=1;r<e.length;r++)if(qs(t,e[r-1],e[r])<n)return !0;return !1}function qs(t,e,r){const n=e.distSqr(r);if(0===n)return t.distSqr(e);const i=((t.x-e.x)*(r.x-e.x)+(t.y-e.y)*(r.y-e.y))/n;return t.distSqr(i<0?e:i>1?r:r.sub(e)._mult(i)._add(e))}function js(t,e){let r,n,i,s=!1;for(let a=0;a<t.length;a++){r=t[a];for(let t=0,a=r.length-1;t<r.length;a=t++)n=r[t],i=r[a],n.y>e.y!=i.y>e.y&&e.x<(i.x-n.x)*(e.y-n.y)/(i.y-n.y)+n.x&&(s=!s);}return s}function Ns(t,e){let r=!1;for(let n=0,i=t.length-1;n<t.length;i=n++){const s=t[n],a=t[i];s.y>e.y!=a.y>e.y&&e.x<(a.x-s.x)*(e.y-s.y)/(a.y-s.y)+s.x&&(r=!r);}return r}function Ks(t,e,r){const n=r[0],i=r[2];if(t.x<n.x&&e.x<n.x||t.x>i.x&&e.x>i.x||t.y<n.y&&e.y<n.y||t.y>i.y&&e.y>i.y)return !1;const s=y(t,e,r[0]);return s!==y(t,e,r[1])||s!==y(t,e,r[2])||s!==y(t,e,r[3])}function Zs(t,e,r){const n=e.paint.get(t).value;return "constant"===n.kind?n.value:r.programConfigurations.get(e.id).getMaxValue(t)}function Gs(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function Js(t,e,r,n,i){if(!e[0]&&!e[1])return t;const s=lr.convert(e)._mult(i);"viewport"===r&&s._rotate(-n);const a=[];for(let e=0;e<t.length;e++)a.push(t[e].sub(s));return a}ir("CircleBucket",Fs,{omit:["layers"]});const Xs=new pi({"circle-sort-key":new li(Ur.layout_circle["circle-sort-key"])});var Ys={paint:new pi({"circle-radius":new li(Ur.paint_circle["circle-radius"]),"circle-color":new li(Ur.paint_circle["circle-color"]),"circle-blur":new li(Ur.paint_circle["circle-blur"]),"circle-opacity":new li(Ur.paint_circle["circle-opacity"]),"circle-translate":new oi(Ur.paint_circle["circle-translate"]),"circle-translate-anchor":new oi(Ur.paint_circle["circle-translate-anchor"]),"circle-pitch-scale":new oi(Ur.paint_circle["circle-pitch-scale"]),"circle-pitch-alignment":new oi(Ur.paint_circle["circle-pitch-alignment"]),"circle-stroke-width":new li(Ur.paint_circle["circle-stroke-width"]),"circle-stroke-color":new li(Ur.paint_circle["circle-stroke-color"]),"circle-stroke-opacity":new li(Ur.paint_circle["circle-stroke-opacity"])}),layout:Xs},Hs="undefined"!=typeof Float32Array?Float32Array:Array;function Ws(){var t=new Hs(16);return Hs!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function Qs(t,e,r){var n=e[0],i=e[1],s=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],p=e[9],f=e[10],d=e[11],y=e[12],m=e[13],g=e[14],x=e[15],v=r[0],b=r[1],w=r[2],_=r[3];return t[0]=v*n+b*o+w*h+_*y,t[1]=v*i+b*l+w*p+_*m,t[2]=v*s+b*u+w*f+_*g,t[3]=v*a+b*c+w*d+_*x,t[4]=(v=r[4])*n+(b=r[5])*o+(w=r[6])*h+(_=r[7])*y,t[5]=v*i+b*l+w*p+_*m,t[6]=v*s+b*u+w*f+_*g,t[7]=v*a+b*c+w*d+_*x,t[8]=(v=r[8])*n+(b=r[9])*o+(w=r[10])*h+(_=r[11])*y,t[9]=v*i+b*l+w*p+_*m,t[10]=v*s+b*u+w*f+_*g,t[11]=v*a+b*c+w*d+_*x,t[12]=(v=r[12])*n+(b=r[13])*o+(w=r[14])*h+(_=r[15])*y,t[13]=v*i+b*l+w*p+_*m,t[14]=v*s+b*u+w*f+_*g,t[15]=v*a+b*c+w*d+_*x,t}Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var ta=Qs;function ea(){var t=new Hs(4);return Hs!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function ra(t,e,r,n){var i=new Hs(4);return i[0]=t,i[1]=e,i[2]=r,i[3]=n,i}function na(t,e,r){var n=e[0],i=e[1],s=e[2],a=e[3];return t[0]=r[0]*n+r[4]*i+r[8]*s+r[12]*a,t[1]=r[1]*n+r[5]*i+r[9]*s+r[13]*a,t[2]=r[2]*n+r[6]*i+r[10]*s+r[14]*a,t[3]=r[3]*n+r[7]*i+r[11]*s+r[15]*a,t}function ia(t,e){const r=na(ea(),ra(t.x,t.y,0,1),e);return new lr(r[0]/r[3],r[1]/r[3])}ea();class sa extends Fs{}ir("HeatmapBucket",sa,{omit:["layers"]});var aa={paint:new pi({"heatmap-radius":new li(Ur.paint_heatmap["heatmap-radius"]),"heatmap-weight":new li(Ur.paint_heatmap["heatmap-weight"]),"heatmap-intensity":new oi(Ur.paint_heatmap["heatmap-intensity"]),"heatmap-color":new hi(Ur.paint_heatmap["heatmap-color"]),"heatmap-opacity":new oi(Ur.paint_heatmap["heatmap-opacity"])})};function oa(t,{width:e,height:r},n,i){if(i){if(i instanceof Uint8ClampedArray)i=new Uint8Array(i.buffer);else if(i.length!==e*r*n)throw new RangeError("mismatched image size")}else i=new Uint8Array(e*r*n);return t.width=e,t.height=r,t.data=i,t}function la(t,{width:e,height:r},n){if(e===t.width&&r===t.height)return;const i=oa({},{width:e,height:r},n);ua(t,i,{x:0,y:0},{x:0,y:0},{width:Math.min(t.width,e),height:Math.min(t.height,r)},n),t.width=e,t.height=r,t.data=i.data;}function ua(t,e,r,n,i,s){if(0===i.width||0===i.height)return e;if(i.width>t.width||i.height>t.height||r.x>t.width-i.width||r.y>t.height-i.height)throw new RangeError("out of range source coordinates for image copy");if(i.width>e.width||i.height>e.height||n.x>e.width-i.width||n.y>e.height-i.height)throw new RangeError("out of range destination coordinates for image copy");const a=t.data,o=e.data;for(let l=0;l<i.height;l++){const u=((r.y+l)*t.width+r.x)*s,c=((n.y+l)*e.width+n.x)*s;for(let t=0;t<i.width*s;t++)o[c+t]=a[u+t];}return e}class ca{constructor(t,e){oa(this,t,1,e);}resize(t){la(this,t,1);}clone(){return new ca({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(t,e,r,n,i){ua(t,e,r,n,i,1);}}class ha{constructor(t,e){oa(this,t,4,e);}resize(t){la(this,t,4);}replace(t,e){e?this.data.set(t):this.data=t instanceof Uint8ClampedArray?new Uint8Array(t.buffer):t;}clone(){return new ha({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(t,e,r,n,i){ua(t,e,r,n,i,4);}}function pa(t){const e={},r=t.resolution||256,n=t.clips?t.clips.length:1,i=t.image||new ha({width:r,height:n}),s=(r,n,s)=>{e[t.evaluationKey]=s;const a=t.expression.evaluate(e);i.data[r+n+0]=Math.floor(255*a.r/a.a),i.data[r+n+1]=Math.floor(255*a.g/a.a),i.data[r+n+2]=Math.floor(255*a.b/a.a),i.data[r+n+3]=Math.floor(255*a.a);};if(t.clips)for(let e=0,i=0;e<n;++e,i+=4*r)for(let n=0,a=0;n<r;n++,a+=4){const o=n/(r-1),{start:l,end:u}=t.clips[e];s(i,a,l*(1-o)+u*o);}else for(let t=0,e=0;t<r;t++,e+=4)s(0,e,t/(r-1));return i}ir("AlphaImage",ca),ir("RGBAImage",ha);var fa={paint:new pi({"hillshade-illumination-direction":new oi(Ur.paint_hillshade["hillshade-illumination-direction"]),"hillshade-illumination-anchor":new oi(Ur.paint_hillshade["hillshade-illumination-anchor"]),"hillshade-exaggeration":new oi(Ur.paint_hillshade["hillshade-exaggeration"]),"hillshade-shadow-color":new oi(Ur.paint_hillshade["hillshade-shadow-color"]),"hillshade-highlight-color":new oi(Ur.paint_hillshade["hillshade-highlight-color"]),"hillshade-accent-color":new oi(Ur.paint_hillshade["hillshade-accent-color"])})};const da=xi([{name:"a_pos",components:2,type:"Int16"}],4),{members:ya}=da;var ma={exports:{}};function ga(t,e,r){r=r||2;var n,i,s,a,o,l,u,c=e&&e.length,h=c?e[0]*r:t.length,p=xa(t,0,h,r,!0),f=[];if(!p||p.next===p.prev)return f;if(c&&(p=function(t,e,r,n){var i,s,a,o=[];for(i=0,s=e.length;i<s;i++)(a=xa(t,e[i]*n,i<s-1?e[i+1]*n:t.length,n,!1))===a.next&&(a.steiner=!0),o.push(Ba(a));for(o.sort(Sa),i=0;i<o.length;i++)r=va(r=za(o[i],r),r.next);return r}(t,e,p,r)),t.length>80*r){n=s=t[0],i=a=t[1];for(var d=r;d<h;d+=r)(o=t[d])<n&&(n=o),(l=t[d+1])<i&&(i=l),o>s&&(s=o),l>a&&(a=l);u=0!==(u=Math.max(s-n,a-i))?1/u:0;}return ba(p,f,r,n,i,u),f}function xa(t,e,r,n,i){var s,a;if(i===qa(t,e,r,n)>0)for(s=e;s<r;s+=n)a=Oa(s,t[s],t[s+1],a);else for(s=r-n;s>=e;s-=n)a=Oa(s,t[s],t[s+1],a);return a&&Ea(a,a.next)&&(Ra(a),a=a.next),a}function va(t,e){if(!t)return t;e||(e=t);var r,n=t;do{if(r=!1,n.steiner||!Ea(n,n.next)&&0!==Va(n.prev,n,n.next))n=n.next;else {if(Ra(n),(n=e=n.prev)===n.next)break;r=!0;}}while(r||n!==e);return e}function ba(t,e,r,n,i,s,a){if(t){!a&&s&&function(t,e,r,n){var i=t;do{null===i.z&&(i.z=Ma(i.x,i.y,e,r,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,function(t){var e,r,n,i,s,a,o,l,u=1;do{for(r=t,t=null,s=null,a=0;r;){for(a++,n=r,o=0,e=0;e<u&&(o++,n=n.nextZ);e++);for(l=u;o>0||l>0&&n;)0!==o&&(0===l||!n||r.z<=n.z)?(i=r,r=r.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:t=i,i.prevZ=s,s=i;r=n;}s.nextZ=null,u*=2;}while(a>1)}(i);}(t,n,i,s);for(var o,l,u=t;t.prev!==t.next;)if(o=t.prev,l=t.next,s?_a(t,n,i,s):wa(t))e.push(o.i/r),e.push(t.i/r),e.push(l.i/r),Ra(t),t=l.next,u=l.next;else if((t=l)===u){a?1===a?ba(t=Aa(va(t),e,r),e,r,n,i,s,2):2===a&&ka(t,e,r,n,i,s):ba(va(t),e,r,n,i,s,1);break}}}function wa(t){var e=t.prev,r=t,n=t.next;if(Va(e,r,n)>=0)return !1;for(var i=t.next.next;i!==t.prev;){if(Ca(e.x,e.y,r.x,r.y,n.x,n.y,i.x,i.y)&&Va(i.prev,i,i.next)>=0)return !1;i=i.next;}return !0}function _a(t,e,r,n){var i=t.prev,s=t,a=t.next;if(Va(i,s,a)>=0)return !1;for(var o=i.x>s.x?i.x>a.x?i.x:a.x:s.x>a.x?s.x:a.x,l=i.y>s.y?i.y>a.y?i.y:a.y:s.y>a.y?s.y:a.y,u=Ma(i.x<s.x?i.x<a.x?i.x:a.x:s.x<a.x?s.x:a.x,i.y<s.y?i.y<a.y?i.y:a.y:s.y<a.y?s.y:a.y,e,r,n),c=Ma(o,l,e,r,n),h=t.prevZ,p=t.nextZ;h&&h.z>=u&&p&&p.z<=c;){if(h!==t.prev&&h!==t.next&&Ca(i.x,i.y,s.x,s.y,a.x,a.y,h.x,h.y)&&Va(h.prev,h,h.next)>=0)return !1;if(h=h.prevZ,p!==t.prev&&p!==t.next&&Ca(i.x,i.y,s.x,s.y,a.x,a.y,p.x,p.y)&&Va(p.prev,p,p.next)>=0)return !1;p=p.nextZ;}for(;h&&h.z>=u;){if(h!==t.prev&&h!==t.next&&Ca(i.x,i.y,s.x,s.y,a.x,a.y,h.x,h.y)&&Va(h.prev,h,h.next)>=0)return !1;h=h.prevZ;}for(;p&&p.z<=c;){if(p!==t.prev&&p!==t.next&&Ca(i.x,i.y,s.x,s.y,a.x,a.y,p.x,p.y)&&Va(p.prev,p,p.next)>=0)return !1;p=p.nextZ;}return !0}function Aa(t,e,r){var n=t;do{var i=n.prev,s=n.next.next;!Ea(i,s)&&Fa(i,n,n.next,s)&&Da(i,s)&&Da(s,i)&&(e.push(i.i/r),e.push(n.i/r),e.push(s.i/r),Ra(n),Ra(n.next),n=t=s),n=n.next;}while(n!==t);return va(n)}function ka(t,e,r,n,i,s){var a=t;do{for(var o=a.next.next;o!==a.prev;){if(a.i!==o.i&&Pa(a,o)){var l=$a(a,o);return a=va(a,a.next),l=va(l,l.next),ba(a,e,r,n,i,s),void ba(l,e,r,n,i,s)}o=o.next;}a=a.next;}while(a!==t)}function Sa(t,e){return t.x-e.x}function za(t,e){var r=function(t,e){var r,n=e,i=t.x,s=t.y,a=-1/0;do{if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){var o=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(o<=i&&o>a){if(a=o,o===i){if(s===n.y)return n;if(s===n.next.y)return n.next}r=n.x<n.next.x?n:n.next;}}n=n.next;}while(n!==e);if(!r)return null;if(i===a)return r;var l,u=r,c=r.x,h=r.y,p=1/0;n=r;do{i>=n.x&&n.x>=c&&i!==n.x&&Ca(s<h?i:a,s,c,h,s<h?a:i,s,n.x,n.y)&&(l=Math.abs(s-n.y)/(i-n.x),Da(n,t)&&(l<p||l===p&&(n.x>r.x||n.x===r.x&&Ia(r,n)))&&(r=n,p=l)),n=n.next;}while(n!==u);return r}(t,e);if(!r)return e;var n=$a(r,t),i=va(r,r.next);return va(n,n.next),e===r?i:e}function Ia(t,e){return Va(t.prev,t,e.prev)<0&&Va(e.next,t,t.next)<0}function Ma(t,e,r,n,i){return (t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-r)*i)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-n)*i)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Ba(t){var e=t,r=t;do{(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;}while(e!==t);return r}function Ca(t,e,r,n,i,s,a,o){return (i-a)*(e-o)-(t-a)*(s-o)>=0&&(t-a)*(n-o)-(r-a)*(e-o)>=0&&(r-a)*(s-o)-(i-a)*(n-o)>=0}function Pa(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&Fa(r,r.next,t,e))return !0;r=r.next;}while(r!==t);return !1}(t,e)&&(Da(t,e)&&Da(e,t)&&function(t,e){var r=t,n=!1,i=(t.x+e.x)/2,s=(t.y+e.y)/2;do{r.y>s!=r.next.y>s&&r.next.y!==r.y&&i<(r.next.x-r.x)*(s-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next;}while(r!==t);return n}(t,e)&&(Va(t.prev,t,e.prev)||Va(t,e.prev,e))||Ea(t,e)&&Va(t.prev,t,t.next)>0&&Va(e.prev,e,e.next)>0)}function Va(t,e,r){return (e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function Ea(t,e){return t.x===e.x&&t.y===e.y}function Fa(t,e,r,n){var i=La(Va(t,e,r)),s=La(Va(t,e,n)),a=La(Va(r,n,t)),o=La(Va(r,n,e));return i!==s&&a!==o||!(0!==i||!Ta(t,r,e))||!(0!==s||!Ta(t,n,e))||!(0!==a||!Ta(r,t,n))||!(0!==o||!Ta(r,e,n))}function Ta(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function La(t){return t>0?1:t<0?-1:0}function Da(t,e){return Va(t.prev,t,t.next)<0?Va(t,e,t.next)>=0&&Va(t,t.prev,e)>=0:Va(t,e,t.prev)<0||Va(t,t.next,e)<0}function $a(t,e){var r=new Ua(t.i,t.x,t.y),n=new Ua(e.i,e.x,e.y),i=t.next,s=e.prev;return t.next=e,e.prev=t,r.next=i,i.prev=r,n.next=r,r.prev=n,s.next=n,n.prev=s,n}function Oa(t,e,r,n){var i=new Ua(t,e,r);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ra(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ);}function Ua(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1;}function qa(t,e,r,n){for(var i=0,s=e,a=r-n;s<r;s+=n)i+=(t[a]-t[s])*(t[s+1]+t[a+1]),a=s;return i}ma.exports=ga,ma.exports.default=ga,ga.deviation=function(t,e,r,n){var i=e&&e.length,s=Math.abs(qa(t,0,i?e[0]*r:t.length,r));if(i)for(var a=0,o=e.length;a<o;a++)s-=Math.abs(qa(t,e[a]*r,a<o-1?e[a+1]*r:t.length,r));var l=0;for(a=0;a<n.length;a+=3){var u=n[a]*r,c=n[a+1]*r,h=n[a+2]*r;l+=Math.abs((t[u]-t[h])*(t[c+1]-t[u+1])-(t[u]-t[c])*(t[h+1]-t[u+1]));}return 0===s&&0===l?0:Math.abs((l-s)/s)},ga.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},n=0,i=0;i<t.length;i++){for(var s=0;s<t[i].length;s++)for(var a=0;a<e;a++)r.vertices.push(t[i][s][a]);i>0&&r.holes.push(n+=t[i-1].length);}return r};var ja=ma.exports;function Na(t,e,r,n,i){Ka(t,e,r||0,n||t.length-1,i||Ga);}function Ka(t,e,r,n,i){for(;n>r;){if(n-r>600){var s=n-r+1,a=e-r+1,o=Math.log(s),l=.5*Math.exp(2*o/3),u=.5*Math.sqrt(o*l*(s-l)/s)*(a-s/2<0?-1:1);Ka(t,e,Math.max(r,Math.floor(e-a*l/s+u)),Math.min(n,Math.floor(e+(s-a)*l/s+u)),i);}var c=t[e],h=r,p=n;for(Za(t,r,e),i(t[n],c)>0&&Za(t,r,n);h<p;){for(Za(t,h,p),h++,p--;i(t[h],c)<0;)h++;for(;i(t[p],c)>0;)p--;}0===i(t[r],c)?Za(t,r,p):Za(t,++p,n),p<=e&&(r=p+1),e<=p&&(n=p-1);}}function Za(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}function Ga(t,e){return t<e?-1:t>e?1:0}function Ja(t,e){const r=t.length;if(r<=1)return [t];const n=[];let i,s;for(let e=0;e<r;e++){const r=m(t[e]);0!==r&&(t[e].area=Math.abs(r),void 0===s&&(s=r<0),s===r<0?(i&&n.push(i),i=[t[e]]):i.push(t[e]));}if(i&&n.push(i),e>1)for(let t=0;t<n.length;t++)n[t].length<=e||(Na(n[t],e,1,n[t].length-1,Xa),n[t]=n[t].slice(0,e));return n}function Xa(t,e){return e.area-t.area}function Ya(t,e,r){const n=r.patternDependencies;let i=!1;for(const r of e){const e=r.paint.get(`${t}-pattern`);e.isConstant()||(i=!0);const s=e.constantOr(null);s&&(i=!0,n[s.to]=!0,n[s.from]=!0);}return i}function Ha(t,e,r,n,i){const s=i.patternDependencies;for(const a of e){const e=a.paint.get(`${t}-pattern`).value;if("constant"!==e.kind){let t=e.evaluate({zoom:n-1},r,{},i.availableImages),o=e.evaluate({zoom:n},r,{},i.availableImages),l=e.evaluate({zoom:n+1},r,{},i.availableImages);t=t&&t.name?t.name:t,o=o&&o.name?o.name:o,l=l&&l.name?l.name:l,s[t]=!0,s[o]=!0,s[l]=!0,r.patterns[a.id]={min:t,mid:o,max:l};}}return r}class Wa{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((t=>t.id)),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.layoutVertexArray=new bi,this.indexArray=new Ei,this.indexArray2=new Oi,this.programConfigurations=new Ss(t.layers,t.zoom),this.segments=new ts,this.segments2=new ts,this.stateDependentLayerIds=this.layers.filter((t=>t.isStateDependent())).map((t=>t.id));}populate(t,e,r){this.hasPattern=Ya("fill",this.layers,e);const n=this.layers[0].layout.get("fill-sort-key"),i=!n.isConstant(),s=[];for(const{feature:a,id:o,index:l,sourceLayerIndex:u}of t){const t=this.layers[0]._featureFilter.needGeometry,c=Vs(a,t);if(!this.layers[0]._featureFilter.filter(new Wn(this.zoom),c,r))continue;const h=i?n.evaluate(c,{},r,e.availableImages):void 0,p={id:o,properties:a.properties,type:a.type,sourceLayerIndex:u,index:l,geometry:t?c.geometry:Ps(a),patterns:{},sortKey:h};s.push(p);}i&&s.sort(((t,e)=>t.sortKey-e.sortKey));for(const n of s){const{geometry:i,index:s,sourceLayerIndex:a}=n;if(this.hasPattern){const t=Ha("fill",this.layers,n,this.zoom,e);this.patternFeatures.push(t);}else this.addFeature(n,i,s,r,{});e.featureIndex.insert(t[s].feature,i,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}addFeatures(t,e,r){for(const t of this.patternFeatures)this.addFeature(t,t.geometry,t.index,e,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,ya),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.indexBuffer2=t.createIndexBuffer(this.indexArray2)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.indexBuffer2.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.segments2.destroy());}addFeature(t,e,r,n,i){for(const t of Ja(e,500)){let e=0;for(const r of t)e+=r.length;const r=this.segments.prepareSegment(e,this.layoutVertexArray,this.indexArray),n=r.vertexLength,i=[],s=[];for(const e of t){if(0===e.length)continue;e!==t[0]&&s.push(i.length/2);const r=this.segments2.prepareSegment(e.length,this.layoutVertexArray,this.indexArray2),n=r.vertexLength;this.layoutVertexArray.emplaceBack(e[0].x,e[0].y),this.indexArray2.emplaceBack(n+e.length-1,n),i.push(e[0].x),i.push(e[0].y);for(let t=1;t<e.length;t++)this.layoutVertexArray.emplaceBack(e[t].x,e[t].y),this.indexArray2.emplaceBack(n+t-1,n+t),i.push(e[t].x),i.push(e[t].y);r.vertexLength+=e.length,r.primitiveLength+=e.length;}const a=ja(i,s);for(let t=0;t<a.length;t+=3)this.indexArray.emplaceBack(n+a[t],n+a[t+1],n+a[t+2]);r.vertexLength+=e,r.primitiveLength+=a.length/3;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);}}ir("FillBucket",Wa,{omit:["layers","patternFeatures"]});const Qa=new pi({"fill-sort-key":new li(Ur.layout_fill["fill-sort-key"])});var to={paint:new pi({"fill-antialias":new oi(Ur.paint_fill["fill-antialias"]),"fill-opacity":new li(Ur.paint_fill["fill-opacity"]),"fill-color":new li(Ur.paint_fill["fill-color"]),"fill-outline-color":new li(Ur.paint_fill["fill-outline-color"]),"fill-translate":new oi(Ur.paint_fill["fill-translate"]),"fill-translate-anchor":new oi(Ur.paint_fill["fill-translate-anchor"]),"fill-pattern":new ui(Ur.paint_fill["fill-pattern"])}),layout:Qa};const eo=xi([{name:"a_pos",components:2,type:"Int16"},{name:"a_normal_ed",components:4,type:"Int16"}],4),{members:ro}=eo;var no={},io=so;function so(t,e){this.x=t,this.y=e;}so.prototype={clone:function(){return new so(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},multByPoint:function(t){return this.clone()._multByPoint(t)},divByPoint:function(t){return this.clone()._divByPoint(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},rotateAround:function(t,e){return this.clone()._rotateAround(t,e)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var e=t.x-this.x,r=t.y-this.y;return e*e+r*r},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)},_matMult:function(t){var e=t[2]*this.x+t[3]*this.y;return this.x=t[0]*this.x+t[1]*this.y,this.y=e,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_multByPoint:function(t){return this.x*=t.x,this.y*=t.y,this},_divByPoint:function(t){return this.x/=t.x,this.y/=t.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var e=Math.cos(t),r=Math.sin(t),n=r*this.x+e*this.y;return this.x=e*this.x-r*this.y,this.y=n,this},_rotateAround:function(t,e){var r=Math.cos(t),n=Math.sin(t),i=e.y+n*(this.x-e.x)+r*(this.y-e.y);return this.x=e.x+r*(this.x-e.x)-n*(this.y-e.y),this.y=i,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},so.convert=function(t){return t instanceof so?t:Array.isArray(t)?new so(t[0],t[1]):t};var ao=io,oo=lo;function lo(t,e,r,n,i){this.properties={},this.extent=r,this.type=0,this._pbf=t,this._geometry=-1,this._keys=n,this._values=i,t.readFields(uo,this,e);}function uo(t,e,r){1==t?e.id=r.readVarint():2==t?function(t,e){for(var r=t.readVarint()+t.pos;t.pos<r;){var n=e._keys[t.readVarint()],i=e._values[t.readVarint()];e.properties[n]=i;}}(r,e):3==t?e.type=r.readVarint():4==t&&(e._geometry=r.pos);}function co(t){for(var e,r,n=0,i=0,s=t.length,a=s-1;i<s;a=i++)n+=((r=t[a]).x-(e=t[i]).x)*(e.y+r.y);return n}lo.types=["Unknown","Point","LineString","Polygon"],lo.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var e,r=t.readVarint()+t.pos,n=1,i=0,s=0,a=0,o=[];t.pos<r;){if(i<=0){var l=t.readVarint();n=7&l,i=l>>3;}if(i--,1===n||2===n)s+=t.readSVarint(),a+=t.readSVarint(),1===n&&(e&&o.push(e),e=[]),e.push(new ao(s,a));else {if(7!==n)throw new Error("unknown command "+n);e&&e.push(e[0].clone());}}return e&&o.push(e),o},lo.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var e=t.readVarint()+t.pos,r=1,n=0,i=0,s=0,a=1/0,o=-1/0,l=1/0,u=-1/0;t.pos<e;){if(n<=0){var c=t.readVarint();r=7&c,n=c>>3;}if(n--,1===r||2===r)(i+=t.readSVarint())<a&&(a=i),i>o&&(o=i),(s+=t.readSVarint())<l&&(l=s),s>u&&(u=s);else if(7!==r)throw new Error("unknown command "+r)}return [a,l,o,u]},lo.prototype.toGeoJSON=function(t,e,r){var n,i,s=this.extent*Math.pow(2,r),a=this.extent*t,o=this.extent*e,l=this.loadGeometry(),u=lo.types[this.type];function c(t){for(var e=0;e<t.length;e++){var r=t[e];t[e]=[360*(r.x+a)/s-180,360/Math.PI*Math.atan(Math.exp((180-360*(r.y+o)/s)*Math.PI/180))-90];}}switch(this.type){case 1:var h=[];for(n=0;n<l.length;n++)h[n]=l[n][0];c(l=h);break;case 2:for(n=0;n<l.length;n++)c(l[n]);break;case 3:for(l=function(t){var e=t.length;if(e<=1)return [t];for(var r,n,i=[],s=0;s<e;s++){var a=co(t[s]);0!==a&&(void 0===n&&(n=a<0),n===a<0?(r&&i.push(r),r=[t[s]]):r.push(t[s]));}return r&&i.push(r),i}(l),n=0;n<l.length;n++)for(i=0;i<l[n].length;i++)c(l[n][i]);}1===l.length?l=l[0]:u="Multi"+u;var p={type:"Feature",geometry:{type:u,coordinates:l},properties:this.properties};return "id"in this&&(p.id=this.id),p};var ho=oo,po=fo;function fo(t,e){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(yo,this,e),this.length=this._features.length;}function yo(t,e,r){15===t?e.version=r.readVarint():1===t?e.name=r.readString():5===t?e.extent=r.readVarint():2===t?e._features.push(r.pos):3===t?e._keys.push(r.readString()):4===t&&e._values.push(function(t){for(var e=null,r=t.readVarint()+t.pos;t.pos<r;){var n=t.readVarint()>>3;e=1===n?t.readString():2===n?t.readFloat():3===n?t.readDouble():4===n?t.readVarint64():5===n?t.readVarint():6===n?t.readSVarint():7===n?t.readBoolean():null;}return e}(r));}fo.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var e=this._pbf.readVarint()+this._pbf.pos;return new ho(this._pbf,e,this.extent,this._keys,this._values)};var mo=po;function go(t,e,r){if(3===t){var n=new mo(r,r.readVarint()+r.pos);n.length&&(e[n.name]=n);}}no.VectorTile=function(t,e){this.layers=t.readFields(go,{},e);},no.VectorTileFeature=oo,no.VectorTileLayer=po;const xo=no.VectorTileFeature.types,vo=Math.pow(2,13);function bo(t,e,r,n,i,s,a,o){t.emplaceBack(e,r,2*Math.floor(n*vo)+a,i*vo*2,s*vo*2,Math.round(o));}class wo{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((t=>t.id)),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new _i,this.indexArray=new Ei,this.programConfigurations=new Ss(t.layers,t.zoom),this.segments=new ts,this.stateDependentLayerIds=this.layers.filter((t=>t.isStateDependent())).map((t=>t.id));}populate(t,e,r){this.features=[],this.hasPattern=Ya("fill-extrusion",this.layers,e);for(const{feature:n,id:i,index:s,sourceLayerIndex:a}of t){const t=this.layers[0]._featureFilter.needGeometry,o=Vs(n,t);if(!this.layers[0]._featureFilter.filter(new Wn(this.zoom),o,r))continue;const l={id:i,sourceLayerIndex:a,index:s,geometry:t?o.geometry:Ps(n),properties:n.properties,type:n.type,patterns:{}};this.hasPattern?this.features.push(Ha("fill-extrusion",this.layers,l,this.zoom,e)):this.addFeature(l,l.geometry,s,r,{}),e.featureIndex.insert(n,l.geometry,s,a,this.index,!0);}}addFeatures(t,e,r){for(const t of this.features){const{geometry:n}=t;this.addFeature(t,n,t.index,e,r);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,ro),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}addFeature(t,e,r,n,i){for(const r of Ja(e,500)){let e=0;for(const t of r)e+=t.length;let n=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray);for(const t of r){if(0===t.length)continue;if(Ao(t))continue;let e=0;for(let r=0;r<t.length;r++){const i=t[r];if(r>=1){const s=t[r-1];if(!_o(i,s)){n.vertexLength+4>ts.MAX_VERTEX_ARRAY_LENGTH&&(n=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray));const t=i.sub(s)._perp()._unit(),r=s.dist(i);e+r>32768&&(e=0),bo(this.layoutVertexArray,i.x,i.y,t.x,t.y,0,0,e),bo(this.layoutVertexArray,i.x,i.y,t.x,t.y,0,1,e),e+=r,bo(this.layoutVertexArray,s.x,s.y,t.x,t.y,0,0,e),bo(this.layoutVertexArray,s.x,s.y,t.x,t.y,0,1,e);const a=n.vertexLength;this.indexArray.emplaceBack(a,a+2,a+1),this.indexArray.emplaceBack(a+1,a+2,a+3),n.vertexLength+=4,n.primitiveLength+=2;}}}}if(n.vertexLength+e>ts.MAX_VERTEX_ARRAY_LENGTH&&(n=this.segments.prepareSegment(e,this.layoutVertexArray,this.indexArray)),"Polygon"!==xo[t.type])continue;const i=[],s=[],a=n.vertexLength;for(const t of r)if(0!==t.length){t!==r[0]&&s.push(i.length/2);for(let e=0;e<t.length;e++){const r=t[e];bo(this.layoutVertexArray,r.x,r.y,0,0,1,1,0),i.push(r.x),i.push(r.y);}}const o=ja(i,s);for(let t=0;t<o.length;t+=3)this.indexArray.emplaceBack(a+o[t],a+o[t+2],a+o[t+1]);n.primitiveLength+=o.length/3,n.vertexLength+=e;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);}}function _o(t,e){return t.x===e.x&&(t.x<0||t.x>Ms)||t.y===e.y&&(t.y<0||t.y>Ms)}function Ao(t){return t.every((t=>t.x<0))||t.every((t=>t.x>Ms))||t.every((t=>t.y<0))||t.every((t=>t.y>Ms))}ir("FillExtrusionBucket",wo,{omit:["layers","features"]});var ko={paint:new pi({"fill-extrusion-opacity":new oi(Ur["paint_fill-extrusion"]["fill-extrusion-opacity"]),"fill-extrusion-color":new li(Ur["paint_fill-extrusion"]["fill-extrusion-color"]),"fill-extrusion-translate":new oi(Ur["paint_fill-extrusion"]["fill-extrusion-translate"]),"fill-extrusion-translate-anchor":new oi(Ur["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),"fill-extrusion-pattern":new ui(Ur["paint_fill-extrusion"]["fill-extrusion-pattern"]),"fill-extrusion-height":new li(Ur["paint_fill-extrusion"]["fill-extrusion-height"]),"fill-extrusion-base":new li(Ur["paint_fill-extrusion"]["fill-extrusion-base"]),"fill-extrusion-vertical-gradient":new oi(Ur["paint_fill-extrusion"]["fill-extrusion-vertical-gradient"])})};function So(t,e){return t.x*e.x+t.y*e.y}function zo(t,e){if(1===t.length){let r=0;const n=e[r++];let i;for(;!i||n.equals(i);)if(i=e[r++],!i)return 1/0;for(;r<e.length;r++){const s=e[r],a=t[0],o=i.sub(n),l=s.sub(n),u=a.sub(n),c=So(o,o),h=So(o,l),p=So(l,l),f=So(u,o),d=So(u,l),y=c*p-h*h,m=(p*f-h*d)/y,g=(c*d-h*f)/y,x=n.z*(1-m-g)+i.z*m+s.z*g;if(isFinite(x))return x}return 1/0}{let t=1/0;for(const r of e)t=Math.min(t,r.z);return t}}const Io=xi([{name:"a_pos_normal",components:2,type:"Int16"},{name:"a_data",components:4,type:"Uint8"}],4),{members:Mo}=Io,Bo=xi([{name:"a_uv_x",components:1,type:"Float32"},{name:"a_split_index",components:1,type:"Float32"}]),{members:Co}=Bo,Po=no.VectorTileFeature.types,Vo=Math.cos(Math.PI/180*37.5),Eo=Math.pow(2,14)/.5;class Fo{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((t=>t.id)),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.lineClipsArray=[],this.gradients={},this.layers.forEach((t=>{this.gradients[t.id]={};})),this.layoutVertexArray=new Ai,this.layoutVertexArray2=new ki,this.indexArray=new Ei,this.programConfigurations=new Ss(t.layers,t.zoom),this.segments=new ts,this.maxLineLength=0,this.stateDependentLayerIds=this.layers.filter((t=>t.isStateDependent())).map((t=>t.id));}populate(t,e,r){this.hasPattern=Ya("line",this.layers,e);const n=this.layers[0].layout.get("line-sort-key"),i=!n.isConstant(),s=[];for(const{feature:e,id:a,index:o,sourceLayerIndex:l}of t){const t=this.layers[0]._featureFilter.needGeometry,u=Vs(e,t);if(!this.layers[0]._featureFilter.filter(new Wn(this.zoom),u,r))continue;const c=i?n.evaluate(u,{},r):void 0,h={id:a,properties:e.properties,type:e.type,sourceLayerIndex:l,index:o,geometry:t?u.geometry:Ps(e),patterns:{},sortKey:c};s.push(h);}i&&s.sort(((t,e)=>t.sortKey-e.sortKey));for(const n of s){const{geometry:i,index:s,sourceLayerIndex:a}=n;if(this.hasPattern){const t=Ha("line",this.layers,n,this.zoom,e);this.patternFeatures.push(t);}else this.addFeature(n,i,s,r,{});e.featureIndex.insert(t[s].feature,i,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}addFeatures(t,e,r){for(const t of this.patternFeatures)this.addFeature(t,t.geometry,t.index,e,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(0!==this.layoutVertexArray2.length&&(this.layoutVertexBuffer2=t.createVertexBuffer(this.layoutVertexArray2,Co)),this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Mo),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}lineFeatureClips(t){if(t.properties&&Object.prototype.hasOwnProperty.call(t.properties,"mapbox_clip_start")&&Object.prototype.hasOwnProperty.call(t.properties,"mapbox_clip_end"))return {start:+t.properties.mapbox_clip_start,end:+t.properties.mapbox_clip_end}}addFeature(t,e,r,n,i){const s=this.layers[0].layout,a=s.get("line-join").evaluate(t,{}),o=s.get("line-cap"),l=s.get("line-miter-limit"),u=s.get("line-round-limit");this.lineClips=this.lineFeatureClips(t);for(const r of e)this.addLine(r,t,a,o,l,u);this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,i,n);}addLine(t,e,r,n,i,s){if(this.distance=0,this.scaledDistance=0,this.totalDistance=0,this.lineClips){this.lineClipsArray.push(this.lineClips);for(let e=0;e<t.length-1;e++)this.totalDistance+=t[e].dist(t[e+1]);this.updateScaledDistance(),this.maxLineLength=Math.max(this.maxLineLength,this.totalDistance);}const a="Polygon"===Po[e.type];let o=t.length;for(;o>=2&&t[o-1].equals(t[o-2]);)o--;let l=0;for(;l<o-1&&t[l].equals(t[l+1]);)l++;if(o<(a?3:2))return;"bevel"===r&&(i=1.05);const u=this.overscaling<=16?122880/(512*this.overscaling):0,c=this.segments.prepareSegment(10*o,this.layoutVertexArray,this.indexArray);let h,p,f,d,y;this.e1=this.e2=-1,a&&(h=t[o-2],y=t[l].sub(h)._unit()._perp());for(let e=l;e<o;e++){if(f=e===o-1?a?t[l+1]:void 0:t[e+1],f&&t[e].equals(f))continue;y&&(d=y),h&&(p=h),h=t[e],y=f?f.sub(h)._unit()._perp():d,d=d||y;let m=d.add(y);0===m.x&&0===m.y||m._unit();const g=d.x*y.x+d.y*y.y,x=m.x*y.x+m.y*y.y,v=0!==x?1/x:1/0,b=2*Math.sqrt(2-2*x),w=x<Vo&&p&&f,_=d.x*y.y-d.y*y.x>0;if(w&&e>l){const t=h.dist(p);if(t>2*u){const e=h.sub(h.sub(p)._mult(u/t)._round());this.updateDistance(p,e),this.addCurrentVertex(e,d,0,0,c),p=e;}}const A=p&&f;let k=A?r:a?"butt":n;if(A&&"round"===k&&(v<s?k="miter":v<=2&&(k="fakeround")),"miter"===k&&v>i&&(k="bevel"),"bevel"===k&&(v>2&&(k="flipbevel"),v<i&&(k="miter")),p&&this.updateDistance(p,h),"miter"===k)m._mult(v),this.addCurrentVertex(h,m,0,0,c);else if("flipbevel"===k){if(v>100)m=y.mult(-1);else {const t=v*d.add(y).mag()/d.sub(y).mag();m._perp()._mult(t*(_?-1:1));}this.addCurrentVertex(h,m,0,0,c),this.addCurrentVertex(h,m.mult(-1),0,0,c);}else if("bevel"===k||"fakeround"===k){const t=-Math.sqrt(v*v-1),e=_?t:0,r=_?0:t;if(p&&this.addCurrentVertex(h,d,e,r,c),"fakeround"===k){const t=Math.round(180*b/Math.PI/20);for(let e=1;e<t;e++){let r=e/t;if(.5!==r){const t=r-.5;r+=r*t*(r-1)*((1.0904+g*(g*(3.55645-1.43519*g)-3.2452))*t*t+(.848013+g*(.215638*g-1.06021)));}const n=y.sub(d)._mult(r)._add(d)._unit()._mult(_?-1:1);this.addHalfVertex(h,n.x,n.y,!1,_,0,c);}}f&&this.addCurrentVertex(h,y,-e,-r,c);}else if("butt"===k)this.addCurrentVertex(h,m,0,0,c);else if("square"===k){const t=p?1:-1;this.addCurrentVertex(h,m,t,t,c);}else "round"===k&&(p&&(this.addCurrentVertex(h,d,0,0,c),this.addCurrentVertex(h,d,1,1,c,!0)),f&&(this.addCurrentVertex(h,y,-1,-1,c,!0),this.addCurrentVertex(h,y,0,0,c)));if(w&&e<o-1){const t=h.dist(f);if(t>2*u){const e=h.add(f.sub(h)._mult(u/t)._round());this.updateDistance(h,e),this.addCurrentVertex(e,y,0,0,c),h=e;}}}}addCurrentVertex(t,e,r,n,i,s=!1){const a=e.y*n-e.x,o=-e.y-e.x*n;this.addHalfVertex(t,e.x+e.y*r,e.y-e.x*r,s,!1,r,i),this.addHalfVertex(t,a,o,s,!0,-n,i),this.distance>Eo/2&&0===this.totalDistance&&(this.distance=0,this.addCurrentVertex(t,e,r,n,i,s));}addHalfVertex({x:t,y:e},r,n,i,s,a,o){const l=.5*(this.lineClips?this.scaledDistance*(Eo-1):this.scaledDistance);this.layoutVertexArray.emplaceBack((t<<1)+(i?1:0),(e<<1)+(s?1:0),Math.round(63*r)+128,Math.round(63*n)+128,1+(0===a?0:a<0?-1:1)|(63&l)<<2,l>>6),this.lineClips&&this.layoutVertexArray2.emplaceBack((this.scaledDistance-this.lineClips.start)/(this.lineClips.end-this.lineClips.start),this.lineClipsArray.length);const u=o.vertexLength++;this.e1>=0&&this.e2>=0&&(this.indexArray.emplaceBack(this.e1,this.e2,u),o.primitiveLength++),s?this.e2=u:this.e1=u;}updateScaledDistance(){this.scaledDistance=this.lineClips?this.lineClips.start+(this.lineClips.end-this.lineClips.start)*this.distance/this.totalDistance:this.distance;}updateDistance(t,e){this.distance+=t.dist(e),this.updateScaledDistance();}}ir("LineBucket",Fo,{omit:["layers","patternFeatures"]});const To=new pi({"line-cap":new oi(Ur.layout_line["line-cap"]),"line-join":new li(Ur.layout_line["line-join"]),"line-miter-limit":new oi(Ur.layout_line["line-miter-limit"]),"line-round-limit":new oi(Ur.layout_line["line-round-limit"]),"line-sort-key":new li(Ur.layout_line["line-sort-key"])});var Lo={paint:new pi({"line-opacity":new li(Ur.paint_line["line-opacity"]),"line-color":new li(Ur.paint_line["line-color"]),"line-translate":new oi(Ur.paint_line["line-translate"]),"line-translate-anchor":new oi(Ur.paint_line["line-translate-anchor"]),"line-width":new li(Ur.paint_line["line-width"]),"line-gap-width":new li(Ur.paint_line["line-gap-width"]),"line-offset":new li(Ur.paint_line["line-offset"]),"line-blur":new li(Ur.paint_line["line-blur"]),"line-dasharray":new ci(Ur.paint_line["line-dasharray"]),"line-pattern":new ui(Ur.paint_line["line-pattern"]),"line-gradient":new hi(Ur.paint_line["line-gradient"])}),layout:To};const Do=new class extends li{possiblyEvaluate(t,e){return e=new Wn(Math.floor(e.zoom),{now:e.now,fadeDuration:e.fadeDuration,zoomHistory:e.zoomHistory,transition:e.transition}),super.possiblyEvaluate(t,e)}evaluate(t,e,r,n){return e=o({},e,{zoom:Math.floor(e.zoom)}),super.evaluate(t,e,r,n)}}(Lo.paint.properties["line-width"].specification);function $o(t,e){return e>0?e+2*t:t}Do.useIntegerZoom=!0;const Oo=xi([{name:"a_pos_offset",components:4,type:"Int16"},{name:"a_data",components:4,type:"Uint16"},{name:"a_pixeloffset",components:4,type:"Int16"}],4),Ro=xi([{name:"a_projected_pos",components:3,type:"Float32"}],4);xi([{name:"a_fade_opacity",components:1,type:"Uint32"}],4);const Uo=xi([{name:"a_placed",components:2,type:"Uint8"},{name:"a_shift",components:2,type:"Float32"}]);xi([{type:"Int16",name:"anchorPointX"},{type:"Int16",name:"anchorPointY"},{type:"Int16",name:"x1"},{type:"Int16",name:"y1"},{type:"Int16",name:"x2"},{type:"Int16",name:"y2"},{type:"Uint32",name:"featureIndex"},{type:"Uint16",name:"sourceLayerIndex"},{type:"Uint16",name:"bucketIndex"}]);const qo=xi([{name:"a_pos",components:2,type:"Int16"},{name:"a_anchor_pos",components:2,type:"Int16"},{name:"a_extrude",components:2,type:"Int16"}],4),jo=xi([{name:"a_pos",components:2,type:"Float32"},{name:"a_radius",components:1,type:"Float32"},{name:"a_flags",components:2,type:"Int16"}],4);function No(t,e,r){return t.sections.forEach((t=>{t.text=function(t,e,r){const n=e.layout.get("text-transform").evaluate(r,{});return "uppercase"===n?t=t.toLocaleUpperCase():"lowercase"===n&&(t=t.toLocaleLowerCase()),Hn.applyArabicShaping&&(t=Hn.applyArabicShaping(t)),t}(t.text,e,r);})),t}xi([{name:"triangle",components:3,type:"Uint16"}]),xi([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Uint16",name:"glyphStartIndex"},{type:"Uint16",name:"numGlyphs"},{type:"Uint32",name:"vertexStartIndex"},{type:"Uint32",name:"lineStartIndex"},{type:"Uint32",name:"lineLength"},{type:"Uint16",name:"segment"},{type:"Uint16",name:"lowerSize"},{type:"Uint16",name:"upperSize"},{type:"Float32",name:"lineOffsetX"},{type:"Float32",name:"lineOffsetY"},{type:"Uint8",name:"writingMode"},{type:"Uint8",name:"placedOrientation"},{type:"Uint8",name:"hidden"},{type:"Uint32",name:"crossTileID"},{type:"Int16",name:"associatedIconIndex"}]),xi([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Int16",name:"rightJustifiedTextSymbolIndex"},{type:"Int16",name:"centerJustifiedTextSymbolIndex"},{type:"Int16",name:"leftJustifiedTextSymbolIndex"},{type:"Int16",name:"verticalPlacedTextSymbolIndex"},{type:"Int16",name:"placedIconSymbolIndex"},{type:"Int16",name:"verticalPlacedIconSymbolIndex"},{type:"Uint16",name:"key"},{type:"Uint16",name:"textBoxStartIndex"},{type:"Uint16",name:"textBoxEndIndex"},{type:"Uint16",name:"verticalTextBoxStartIndex"},{type:"Uint16",name:"verticalTextBoxEndIndex"},{type:"Uint16",name:"iconBoxStartIndex"},{type:"Uint16",name:"iconBoxEndIndex"},{type:"Uint16",name:"verticalIconBoxStartIndex"},{type:"Uint16",name:"verticalIconBoxEndIndex"},{type:"Uint16",name:"featureIndex"},{type:"Uint16",name:"numHorizontalGlyphVertices"},{type:"Uint16",name:"numVerticalGlyphVertices"},{type:"Uint16",name:"numIconVertices"},{type:"Uint16",name:"numVerticalIconVertices"},{type:"Uint16",name:"useRuntimeCollisionCircles"},{type:"Uint32",name:"crossTileID"},{type:"Float32",name:"textBoxScale"},{type:"Float32",components:2,name:"textOffset"},{type:"Float32",name:"collisionCircleDiameter"}]),xi([{type:"Float32",name:"offsetX"}]),xi([{type:"Int16",name:"x"},{type:"Int16",name:"y"},{type:"Int16",name:"tileUnitDistanceFromAnchor"}]);const Ko={"!":"︕","#":"＃",$:"＄","%":"％","&":"＆","(":"︵",")":"︶","*":"＊","+":"＋",",":"︐","-":"︲",".":"・","/":"／",":":"︓",";":"︔","<":"︿","=":"＝",">":"﹀","?":"︖","@":"＠","[":"﹇","\\":"＼","]":"﹈","^":"＾",_:"︳","`":"｀","{":"︷","|":"―","}":"︸","~":"～","¢":"￠","£":"￡","¥":"￥","¦":"￤","¬":"￢","¯":"￣","–":"︲","—":"︱","‘":"﹃","’":"﹄","“":"﹁","”":"﹂","…":"︙","‧":"・","₩":"￦","、":"︑","。":"︒","〈":"︿","〉":"﹀","《":"︽","》":"︾","「":"﹁","」":"﹂","『":"﹃","』":"﹄","【":"︻","】":"︼","〔":"︹","〕":"︺","〖":"︗","〗":"︘","！":"︕","（":"︵","）":"︶","，":"︐","－":"︲","．":"・","：":"︓","；":"︔","＜":"︿","＞":"﹀","？":"︖","［":"﹇","］":"﹈","＿":"︳","｛":"︷","｜":"―","｝":"︸","｟":"︵","｠":"︶","｡":"︒","｢":"﹁","｣":"﹂"};var Zo=24,Go=Yo,Jo=function(t,e,r,n,i){var s,a,o=8*i-n-1,l=(1<<o)-1,u=l>>1,c=-7,h=r?i-1:0,p=r?-1:1,f=t[e+h];for(h+=p,s=f&(1<<-c)-1,f>>=-c,c+=o;c>0;s=256*s+t[e+h],h+=p,c-=8);for(a=s&(1<<-c)-1,s>>=-c,c+=n;c>0;a=256*a+t[e+h],h+=p,c-=8);if(0===s)s=1-u;else {if(s===l)return a?NaN:1/0*(f?-1:1);a+=Math.pow(2,n),s-=u;}return (f?-1:1)*a*Math.pow(2,s-n)},Xo=function(t,e,r,n,i,s){var a,o,l,u=8*s-i-1,c=(1<<u)-1,h=c>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=n?0:s-1,d=n?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(o=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-a))<1&&(a--,l*=2),(e+=a+h>=1?p/l:p*Math.pow(2,1-h))*l>=2&&(a++,l/=2),a+h>=c?(o=0,a=c):a+h>=1?(o=(e*l-1)*Math.pow(2,i),a+=h):(o=e*Math.pow(2,h-1)*Math.pow(2,i),a=0));i>=8;t[r+f]=255&o,f+=d,o/=256,i-=8);for(a=a<<i|o,u+=i;u>0;t[r+f]=255&a,f+=d,a/=256,u-=8);t[r+f-d]|=128*y;};function Yo(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length;}Yo.Varint=0,Yo.Fixed64=1,Yo.Bytes=2,Yo.Fixed32=5;var Ho,Wo=4294967296,Qo=1/Wo,tl="undefined"==typeof TextDecoder?null:new TextDecoder("utf8");function el(t){return t.type===Yo.Bytes?t.readVarint()+t.pos:t.pos+1}function rl(t,e,r){return r?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function nl(t,e,r){var n=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.floor(Math.log(e)/(7*Math.LN2));r.realloc(n);for(var i=r.pos-1;i>=t;i--)r.buf[i+n]=r.buf[i];}function il(t,e){for(var r=0;r<t.length;r++)e.writeVarint(t[r]);}function sl(t,e){for(var r=0;r<t.length;r++)e.writeSVarint(t[r]);}function al(t,e){for(var r=0;r<t.length;r++)e.writeFloat(t[r]);}function ol(t,e){for(var r=0;r<t.length;r++)e.writeDouble(t[r]);}function ll(t,e){for(var r=0;r<t.length;r++)e.writeBoolean(t[r]);}function ul(t,e){for(var r=0;r<t.length;r++)e.writeFixed32(t[r]);}function cl(t,e){for(var r=0;r<t.length;r++)e.writeSFixed32(t[r]);}function hl(t,e){for(var r=0;r<t.length;r++)e.writeFixed64(t[r]);}function pl(t,e){for(var r=0;r<t.length;r++)e.writeSFixed64(t[r]);}function fl(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function dl(t,e,r){t[r]=e,t[r+1]=e>>>8,t[r+2]=e>>>16,t[r+3]=e>>>24;}function yl(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}function ml(t,e,r){1===t&&r.readMessage(gl,e);}function gl(t,e,r){if(3===t){const{id:t,bitmap:n,width:i,height:s,left:a,top:o,advance:l}=r.readMessage(xl,{});e.push({id:t,bitmap:new ca({width:i+6,height:s+6},n),metrics:{width:i,height:s,left:a,top:o,advance:l}});}}function xl(t,e,r){1===t?e.id=r.readVarint():2===t?e.bitmap=r.readBytes():3===t?e.width=r.readVarint():4===t?e.height=r.readVarint():5===t?e.left=r.readSVarint():6===t?e.top=r.readSVarint():7===t&&(e.advance=r.readVarint());}function vl(t){let e=0,r=0;for(const n of t)e+=n.w*n.h,r=Math.max(r,n.w);t.sort(((t,e)=>e.h-t.h));const n=[{x:0,y:0,w:Math.max(Math.ceil(Math.sqrt(e/.95)),r),h:1/0}];let i=0,s=0;for(const e of t)for(let t=n.length-1;t>=0;t--){const r=n[t];if(!(e.w>r.w||e.h>r.h)){if(e.x=r.x,e.y=r.y,s=Math.max(s,e.y+e.h),i=Math.max(i,e.x+e.w),e.w===r.w&&e.h===r.h){const e=n.pop();t<n.length&&(n[t]=e);}else e.h===r.h?(r.x+=e.w,r.w-=e.w):e.w===r.w?(r.y+=e.h,r.h-=e.h):(n.push({x:r.x+e.w,y:r.y,w:r.w-e.w,h:e.h}),r.y+=e.h,r.h-=e.h);break}}return {w:i,h:s,fill:e/(i*s)||0}}Yo.prototype={destroy:function(){this.buf=null;},readFields:function(t,e,r){for(r=r||this.length;this.pos<r;){var n=this.readVarint(),i=n>>3,s=this.pos;this.type=7&n,t(i,e,this),this.pos===s&&this.skip(n);}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=fl(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=yl(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=fl(this.buf,this.pos)+fl(this.buf,this.pos+4)*Wo;return this.pos+=8,t},readSFixed64:function(){var t=fl(this.buf,this.pos)+yl(this.buf,this.pos+4)*Wo;return this.pos+=8,t},readFloat:function(){var t=Jo(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=Jo(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,r,n=this.buf;return e=127&(r=n[this.pos++]),r<128?e:(e|=(127&(r=n[this.pos++]))<<7,r<128?e:(e|=(127&(r=n[this.pos++]))<<14,r<128?e:(e|=(127&(r=n[this.pos++]))<<21,r<128?e:function(t,e,r){var n,i,s=r.buf;if(n=(112&(i=s[r.pos++]))>>4,i<128)return rl(t,n,e);if(n|=(127&(i=s[r.pos++]))<<3,i<128)return rl(t,n,e);if(n|=(127&(i=s[r.pos++]))<<10,i<128)return rl(t,n,e);if(n|=(127&(i=s[r.pos++]))<<17,i<128)return rl(t,n,e);if(n|=(127&(i=s[r.pos++]))<<24,i<128)return rl(t,n,e);if(n|=(1&(i=s[r.pos++]))<<31,i<128)return rl(t,n,e);throw new Error("Expected varint not more than 10 bytes")}(e|=(15&(r=n[this.pos]))<<28,t,this))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2==1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=this.pos;return this.pos=t,t-e>=12&&tl?function(t,e,r){return tl.decode(t.subarray(e,r))}(this.buf,e,t):function(t,e,r){for(var n="",i=e;i<r;){var s,a,o,l=t[i],u=null,c=l>239?4:l>223?3:l>191?2:1;if(i+c>r)break;1===c?l<128&&(u=l):2===c?128==(192&(s=t[i+1]))&&(u=(31&l)<<6|63&s)<=127&&(u=null):3===c?(a=t[i+2],128==(192&(s=t[i+1]))&&128==(192&a)&&((u=(15&l)<<12|(63&s)<<6|63&a)<=2047||u>=55296&&u<=57343)&&(u=null)):4===c&&(a=t[i+2],o=t[i+3],128==(192&(s=t[i+1]))&&128==(192&a)&&128==(192&o)&&((u=(15&l)<<18|(63&s)<<12|(63&a)<<6|63&o)<=65535||u>=1114112)&&(u=null)),null===u?(u=65533,c=1):u>65535&&(u-=65536,n+=String.fromCharCode(u>>>10&1023|55296),u=56320|1023&u),n+=String.fromCharCode(u),i+=c;}return n}(this.buf,e,t)},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){if(this.type!==Yo.Bytes)return t.push(this.readVarint(e));var r=el(this);for(t=t||[];this.pos<r;)t.push(this.readVarint(e));return t},readPackedSVarint:function(t){if(this.type!==Yo.Bytes)return t.push(this.readSVarint());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readSVarint());return t},readPackedBoolean:function(t){if(this.type!==Yo.Bytes)return t.push(this.readBoolean());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readBoolean());return t},readPackedFloat:function(t){if(this.type!==Yo.Bytes)return t.push(this.readFloat());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readFloat());return t},readPackedDouble:function(t){if(this.type!==Yo.Bytes)return t.push(this.readDouble());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readDouble());return t},readPackedFixed32:function(t){if(this.type!==Yo.Bytes)return t.push(this.readFixed32());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readFixed32());return t},readPackedSFixed32:function(t){if(this.type!==Yo.Bytes)return t.push(this.readSFixed32());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed32());return t},readPackedFixed64:function(t){if(this.type!==Yo.Bytes)return t.push(this.readFixed64());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readFixed64());return t},readPackedSFixed64:function(t){if(this.type!==Yo.Bytes)return t.push(this.readSFixed64());var e=el(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed64());return t},skip:function(t){var e=7&t;if(e===Yo.Varint)for(;this.buf[this.pos++]>127;);else if(e===Yo.Bytes)this.pos=this.readVarint()+this.pos;else if(e===Yo.Fixed32)this.pos+=4;else {if(e!==Yo.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8;}},writeTag:function(t,e){this.writeVarint(t<<3|e);},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var r=new Uint8Array(e);r.set(this.buf),this.buf=r,this.length=e;}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),dl(this.buf,t,this.pos),this.pos+=4;},writeSFixed32:function(t){this.realloc(4),dl(this.buf,t,this.pos),this.pos+=4;},writeFixed64:function(t){this.realloc(8),dl(this.buf,-1&t,this.pos),dl(this.buf,Math.floor(t*Qo),this.pos+4),this.pos+=8;},writeSFixed64:function(t){this.realloc(8),dl(this.buf,-1&t,this.pos),dl(this.buf,Math.floor(t*Qo),this.pos+4),this.pos+=8;},writeVarint:function(t){(t=+t||0)>268435455||t<0?function(t,e){var r,n;if(t>=0?(r=t%4294967296|0,n=t/4294967296|0):(n=~(-t/4294967296),4294967295^(r=~(-t%4294967296))?r=r+1|0:(r=0,n=n+1|0)),t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,r){r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,r.buf[r.pos]=127&(t>>>=7);}(r,0,e),function(t,e){var r=(7&t)<<4;e.buf[e.pos++]|=r|((t>>>=3)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t)))));}(n,e);}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))));},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t);},writeBoolean:function(t){this.writeVarint(Boolean(t));},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=function(t,e,r){for(var n,i,s=0;s<e.length;s++){if((n=e.charCodeAt(s))>55295&&n<57344){if(!i){n>56319||s+1===e.length?(t[r++]=239,t[r++]=191,t[r++]=189):i=n;continue}if(n<56320){t[r++]=239,t[r++]=191,t[r++]=189,i=n;continue}n=i-55296<<10|n-56320|65536,i=null;}else i&&(t[r++]=239,t[r++]=191,t[r++]=189,i=null);n<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:(n<65536?t[r++]=n>>12|224:(t[r++]=n>>18|240,t[r++]=n>>12&63|128),t[r++]=n>>6&63|128),t[r++]=63&n|128);}return r}(this.buf,t,this.pos);var r=this.pos-e;r>=128&&nl(e,r,this),this.pos=e-1,this.writeVarint(r),this.pos+=r;},writeFloat:function(t){this.realloc(4),Xo(this.buf,t,this.pos,!0,23,4),this.pos+=4;},writeDouble:function(t){this.realloc(8),Xo(this.buf,t,this.pos,!0,52,8),this.pos+=8;},writeBytes:function(t){var e=t.length;this.writeVarint(e),this.realloc(e);for(var r=0;r<e;r++)this.buf[this.pos++]=t[r];},writeRawMessage:function(t,e){this.pos++;var r=this.pos;t(e,this);var n=this.pos-r;n>=128&&nl(r,n,this),this.pos=r-1,this.writeVarint(n),this.pos+=n;},writeMessage:function(t,e,r){this.writeTag(t,Yo.Bytes),this.writeRawMessage(e,r);},writePackedVarint:function(t,e){e.length&&this.writeMessage(t,il,e);},writePackedSVarint:function(t,e){e.length&&this.writeMessage(t,sl,e);},writePackedBoolean:function(t,e){e.length&&this.writeMessage(t,ll,e);},writePackedFloat:function(t,e){e.length&&this.writeMessage(t,al,e);},writePackedDouble:function(t,e){e.length&&this.writeMessage(t,ol,e);},writePackedFixed32:function(t,e){e.length&&this.writeMessage(t,ul,e);},writePackedSFixed32:function(t,e){e.length&&this.writeMessage(t,cl,e);},writePackedFixed64:function(t,e){e.length&&this.writeMessage(t,hl,e);},writePackedSFixed64:function(t,e){e.length&&this.writeMessage(t,pl,e);},writeBytesField:function(t,e){this.writeTag(t,Yo.Bytes),this.writeBytes(e);},writeFixed32Field:function(t,e){this.writeTag(t,Yo.Fixed32),this.writeFixed32(e);},writeSFixed32Field:function(t,e){this.writeTag(t,Yo.Fixed32),this.writeSFixed32(e);},writeFixed64Field:function(t,e){this.writeTag(t,Yo.Fixed64),this.writeFixed64(e);},writeSFixed64Field:function(t,e){this.writeTag(t,Yo.Fixed64),this.writeSFixed64(e);},writeVarintField:function(t,e){this.writeTag(t,Yo.Varint),this.writeVarint(e);},writeSVarintField:function(t,e){this.writeTag(t,Yo.Varint),this.writeSVarint(e);},writeStringField:function(t,e){this.writeTag(t,Yo.Bytes),this.writeString(e);},writeFloatField:function(t,e){this.writeTag(t,Yo.Fixed32),this.writeFloat(e);},writeDoubleField:function(t,e){this.writeTag(t,Yo.Fixed64),this.writeDouble(e);},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e));}};class bl{constructor(t,{pixelRatio:e,version:r,stretchX:n,stretchY:i,content:s}){this.paddedRect=t,this.pixelRatio=e,this.stretchX=n,this.stretchY=i,this.content=s,this.version=r;}get tl(){return [this.paddedRect.x+1,this.paddedRect.y+1]}get br(){return [this.paddedRect.x+this.paddedRect.w-1,this.paddedRect.y+this.paddedRect.h-1]}get tlbr(){return this.tl.concat(this.br)}get displaySize(){return [(this.paddedRect.w-2)/this.pixelRatio,(this.paddedRect.h-2)/this.pixelRatio]}}class wl{constructor(t,e){const r={},n={};this.haveRenderCallbacks=[];const i=[];this.addImages(t,r,i),this.addImages(e,n,i);const{w:s,h:a}=vl(i),o=new ha({width:s||1,height:a||1});for(const e in t){const n=t[e],i=r[e].paddedRect;ha.copy(n.data,o,{x:0,y:0},{x:i.x+1,y:i.y+1},n.data);}for(const t in e){const r=e[t],i=n[t].paddedRect,s=i.x+1,a=i.y+1,l=r.data.width,u=r.data.height;ha.copy(r.data,o,{x:0,y:0},{x:s,y:a},r.data),ha.copy(r.data,o,{x:0,y:u-1},{x:s,y:a-1},{width:l,height:1}),ha.copy(r.data,o,{x:0,y:0},{x:s,y:a+u},{width:l,height:1}),ha.copy(r.data,o,{x:l-1,y:0},{x:s-1,y:a},{width:1,height:u}),ha.copy(r.data,o,{x:0,y:0},{x:s+l,y:a},{width:1,height:u});}this.image=o,this.iconPositions=r,this.patternPositions=n;}addImages(t,e,r){for(const n in t){const i=t[n],s={x:0,y:0,w:i.data.width+2,h:i.data.height+2};r.push(s),e[n]=new bl(s,i),i.hasRenderCallback&&this.haveRenderCallbacks.push(n);}}patchUpdatedImages(t,e){t.dispatchRenderCallbacks(this.haveRenderCallbacks);for(const r in t.updatedImages)this.patchUpdatedImage(this.iconPositions[r],t.getImage(r),e),this.patchUpdatedImage(this.patternPositions[r],t.getImage(r),e);}patchUpdatedImage(t,e,r){if(!t||!e)return;if(t.version===e.version)return;t.version=e.version;const[n,i]=t.tl;r.update(e.data,void 0,{x:n,y:i});}}ir("ImagePosition",bl),ir("ImageAtlas",wl),t.WritingMode=void 0,(Ho=t.WritingMode||(t.WritingMode={}))[Ho.horizontal=1]="horizontal",Ho[Ho.vertical=2]="vertical",Ho[Ho.horizontalOnly=3]="horizontalOnly";class _l{}const Al=-17;class kl{constructor(){this.scale=1,this.fontStack="",this.imageName=null;}static forText(t,e){const r=new kl;return r.scale=t||1,r.fontStack=e,r}static forImage(t){const e=new kl;return e.imageName=t,e}}class Sl{constructor(){this.text="",this.sectionIndex=[],this.sections=[],this.imageSectionID=null;}static fromFeature(t,e){const r=new Sl;for(let n=0;n<t.sections.length;n++){const i=t.sections[n];i.image?r.addImageSection(i):r.addTextSection(i,e);}return r}length(){return this.text.length}getSection(t){return this.sections[this.sectionIndex[t]]}getSectionIndex(t){return this.sectionIndex[t]}getCharCode(t){return this.text.charCodeAt(t)}verticalizePunctuation(){this.text=function(t){let e="";for(let r=0;r<t.length;r++){const n=t.charCodeAt(r+1)||null,i=t.charCodeAt(r-1)||null;e+=n&&Ln(n)&&!Ko[t[r+1]]||i&&Ln(i)&&!Ko[t[r-1]]||!Ko[t[r]]?t[r]:Ko[t[r]];}return e}(this.text);}trim(){let t=0;for(let e=0;e<this.text.length&&Il[this.text.charCodeAt(e)];e++)t++;let e=this.text.length;for(let r=this.text.length-1;r>=0&&r>=t&&Il[this.text.charCodeAt(r)];r--)e--;this.text=this.text.substring(t,e),this.sectionIndex=this.sectionIndex.slice(t,e);}substring(t,e){const r=new Sl;return r.text=this.text.substring(t,e),r.sectionIndex=this.sectionIndex.slice(t,e),r.sections=this.sections,r}toString(){return this.text}getMaxScale(){return this.sectionIndex.reduce(((t,e)=>Math.max(t,this.sections[e].scale)),0)}addTextSection(t,e){this.text+=t.text,this.sections.push(kl.forText(t.scale,t.fontStack||e));const r=this.sections.length-1;for(let e=0;e<t.text.length;++e)this.sectionIndex.push(r);}addImageSection(t){const e=t.image?t.image.name:"";if(0===e.length)return void d("Can't add FormattedSection with an empty image.");const r=this.getNextImageSectionCharCode();r?(this.text+=String.fromCharCode(r),this.sections.push(kl.forImage(e)),this.sectionIndex.push(this.sections.length-1)):d("Reached maximum number of images 6401");}getNextImageSectionCharCode(){return this.imageSectionID?this.imageSectionID>=63743?null:++this.imageSectionID:(this.imageSectionID=57344,this.imageSectionID)}}function zl(e,r,n,i,s,a,o,l,u,c,h,p,f,d,y,m){const g=Sl.fromFeature(e,s);let x;p===t.WritingMode.vertical&&g.verticalizePunctuation();const{processBidirectionalText:v,processStyledBidirectionalText:b}=Hn;if(v&&1===g.sections.length){x=[];const t=v(g.toString(),Fl(g,c,a,r,i,d,y));for(const e of t){const t=new Sl;t.text=e,t.sections=g.sections;for(let r=0;r<e.length;r++)t.sectionIndex.push(0);x.push(t);}}else if(b){x=[];const t=b(g.text,g.sectionIndex,Fl(g,c,a,r,i,d,y));for(const e of t){const t=new Sl;t.text=e[0],t.sectionIndex=e[1],t.sections=g.sections,x.push(t);}}else x=function(t,e){const r=[],n=t.text;let i=0;for(const n of e)r.push(t.substring(i,n)),i=n;return i<n.length&&r.push(t.substring(i,n.length)),r}(g,Fl(g,c,a,r,i,d,y));const w=[],_={positionedLines:w,text:g.toString(),top:h[1],bottom:h[1],left:h[0],right:h[0],writingMode:p,iconsInText:!1,verticalizable:!1};return function(e,r,n,i,s,a,o,l,u,c,h,p){let f=0,d=Al,y=0,m=0;const g="right"===l?1:"left"===l?0:.5;let x=0;for(const o of s){o.trim();const s=o.getMaxScale(),l=(s-1)*Zo,b={positionedGlyphs:[],lineOffset:0};e.positionedLines[x]=b;const w=b.positionedGlyphs;let _=0;if(!o.length()){d+=a,++x;continue}for(let a=0;a<o.length();a++){const y=o.getSection(a),m=o.getSectionIndex(a),g=o.getCharCode(a);let x=0,b=null,A=null,k=null,S=Zo;const z=!(u===t.WritingMode.horizontal||!h&&!Tn(g)||h&&(Il[g]||(v=g,Pn.Arabic(v)||Pn["Arabic Supplement"](v)||Pn["Arabic Extended-A"](v)||Pn["Arabic Presentation Forms-A"](v)||Pn["Arabic Presentation Forms-B"](v))));if(y.imageName){const t=i[y.imageName];if(!t)continue;k=y.imageName,e.iconsInText=e.iconsInText||!0,A=t.paddedRect;const r=t.displaySize;y.scale=y.scale*Zo/p,b={width:r[0],height:r[1],left:1,top:-3,advance:z?r[1]:r[0]},x=l+(Zo-r[1]*y.scale),S=b.advance;const n=z?r[0]*y.scale-Zo*s:r[1]*y.scale-Zo*s;n>0&&n>_&&(_=n);}else {const t=n[y.fontStack],e=t&&t[g];if(e&&e.rect)A=e.rect,b=e.metrics;else {const t=r[y.fontStack],e=t&&t[g];if(!e)continue;b=e.metrics;}x=(s-y.scale)*Zo;}z?(e.verticalizable=!0,w.push({glyph:g,imageName:k,x:f,y:d+x,vertical:z,scale:y.scale,fontStack:y.fontStack,sectionIndex:m,metrics:b,rect:A}),f+=S*y.scale+c):(w.push({glyph:g,imageName:k,x:f,y:d+x,vertical:z,scale:y.scale,fontStack:y.fontStack,sectionIndex:m,metrics:b,rect:A}),f+=b.advance*y.scale+c);}0!==w.length&&(y=Math.max(f-c,y),Ll(w,0,w.length-1,g,_)),f=0;const A=a*s+_;b.lineOffset=Math.max(_,l),d+=A,m=Math.max(A,m),++x;}var v;const b=d-Al,{horizontalAlign:w,verticalAlign:_}=Tl(o);(((function(t,e,r,n,i,s,a,o,l){const u=(e-r)*i;let c=0;c=s!==a?-o*n-Al:(-n*l+.5)*a;for(const e of t)for(const t of e.positionedGlyphs)t.x+=u,t.y+=c;})))(e.positionedLines,g,w,_,y,m,a,b,s.length),e.top+=-_*b,e.bottom=e.top+b,e.left+=-w*y,e.right=e.left+y;}(_,r,n,i,x,o,l,u,p,c,f,m),!function(t){for(const e of t)if(0!==e.positionedGlyphs.length)return !1;return !0}(w)&&_}const Il={9:!0,10:!0,11:!0,12:!0,13:!0,32:!0},Ml={10:!0,32:!0,38:!0,40:!0,41:!0,43:!0,45:!0,47:!0,173:!0,183:!0,8203:!0,8208:!0,8211:!0,8231:!0};function Bl(t,e,r,n,i,s){if(e.imageName){const t=n[e.imageName];return t?t.displaySize[0]*e.scale*Zo/s+i:0}{const n=r[e.fontStack],s=n&&n[t];return s?s.metrics.advance*e.scale+i:0}}function Cl(t,e,r,n){const i=Math.pow(t-e,2);return n?t<e?i/2:2*i:i+Math.abs(r)*r}function Pl(t,e,r){let n=0;return 10===t&&(n-=1e4),r&&(n+=150),40!==t&&65288!==t||(n+=50),41!==e&&65289!==e||(n+=50),n}function Vl(t,e,r,n,i,s){let a=null,o=Cl(e,r,i,s);for(const t of n){const n=Cl(e-t.x,r,i,s)+t.badness;n<=o&&(a=t,o=n);}return {index:t,x:e,priorBreak:a,badness:o}}function El(t){return t?El(t.priorBreak).concat(t.index):[]}function Fl(t,e,r,n,i,s,a){if("point"!==s)return [];if(!t)return [];const o=[],l=function(t,e,r,n,i,s){let a=0;for(let r=0;r<t.length();r++){const o=t.getSection(r);a+=Bl(t.getCharCode(r),o,n,i,e,s);}return a/Math.max(1,Math.ceil(a/r))}(t,e,r,n,i,a),u=t.text.indexOf("​")>=0;let c=0;for(let r=0;r<t.length();r++){const s=t.getSection(r),p=t.getCharCode(r);if(Il[p]||(c+=Bl(p,s,n,i,e,a)),r<t.length()-1){const e=!((h=p)<11904||!(Pn["Bopomofo Extended"](h)||Pn.Bopomofo(h)||Pn["CJK Compatibility Forms"](h)||Pn["CJK Compatibility Ideographs"](h)||Pn["CJK Compatibility"](h)||Pn["CJK Radicals Supplement"](h)||Pn["CJK Strokes"](h)||Pn["CJK Symbols and Punctuation"](h)||Pn["CJK Unified Ideographs Extension A"](h)||Pn["CJK Unified Ideographs"](h)||Pn["Enclosed CJK Letters and Months"](h)||Pn["Halfwidth and Fullwidth Forms"](h)||Pn.Hiragana(h)||Pn["Ideographic Description Characters"](h)||Pn["Kangxi Radicals"](h)||Pn["Katakana Phonetic Extensions"](h)||Pn.Katakana(h)||Pn["Vertical Forms"](h)||Pn["Yi Radicals"](h)||Pn["Yi Syllables"](h)));(Ml[p]||e||s.imageName)&&o.push(Vl(r+1,c,l,o,Pl(p,t.getCharCode(r+1),e&&u),!1));}}var h;return El(Vl(t.length(),c,l,o,0,!0))}function Tl(t){let e=.5,r=.5;switch(t){case"right":case"top-right":case"bottom-right":e=1;break;case"left":case"top-left":case"bottom-left":e=0;}switch(t){case"bottom":case"bottom-right":case"bottom-left":r=1;break;case"top":case"top-right":case"top-left":r=0;}return {horizontalAlign:e,verticalAlign:r}}function Ll(t,e,r,n,i){if(!n&&!i)return;const s=t[r],a=(t[r].x+s.metrics.advance*s.scale)*n;for(let n=e;n<=r;n++)t[n].x-=a,t[n].y+=i;}function Dl(t,e,r){const{horizontalAlign:n,verticalAlign:i}=Tl(r),s=e[0]-t.displaySize[0]*n,a=e[1]-t.displaySize[1]*i;return {image:t,top:a,bottom:a+t.displaySize[1],left:s,right:s+t.displaySize[0]}}function $l(t,e,r,n,i,s){const a=t.image;let o;if(a.content){const t=a.content,e=a.pixelRatio||1;o=[t[0]/e,t[1]/e,a.displaySize[0]-t[2]/e,a.displaySize[1]-t[3]/e];}const l=e.left*s,u=e.right*s;let c,h,p,f;"width"===r||"both"===r?(f=i[0]+l-n[3],h=i[0]+u+n[1]):(f=i[0]+(l+u-a.displaySize[0])/2,h=f+a.displaySize[0]);const d=e.top*s,y=e.bottom*s;return "height"===r||"both"===r?(c=i[1]+d-n[0],p=i[1]+y+n[2]):(c=i[1]+(d+y-a.displaySize[1])/2,p=c+a.displaySize[1]),{image:a,top:c,right:h,bottom:p,left:f,collisionPadding:o}}const Ol=128;function Rl(t,e){const{expression:r}=e;if("constant"===r.kind)return {kind:"constant",layoutSize:r.evaluate(new Wn(t+1))};if("source"===r.kind)return {kind:"source"};{const{zoomStops:e,interpolationType:n}=r;let i=0;for(;i<e.length&&e[i]<=t;)i++;i=Math.max(0,i-1);let s=i;for(;s<e.length&&e[s]<t+1;)s++;s=Math.min(e.length-1,s);const a=e[i],o=e[s];return "composite"===r.kind?{kind:"composite",minZoom:a,maxZoom:o,interpolationType:n}:{kind:"camera",minZoom:a,maxZoom:o,minSize:r.evaluate(new Wn(a)),maxSize:r.evaluate(new Wn(o)),interpolationType:n}}}function Ul(t,{uSize:e,uSizeT:r},{lowerSize:n,upperSize:i}){return "source"===t.kind?n/Ol:"composite"===t.kind?Nt(n/Ol,i/Ol,r):e}function ql(t,e){let r=0,n=0;if("constant"===t.kind)n=t.layoutSize;else if("source"!==t.kind){const{interpolationType:i,minZoom:a,maxZoom:o}=t,l=i?s(ue.interpolationFactor(i,e,a,o),0,1):0;"camera"===t.kind?n=Nt(t.minSize,t.maxSize,l):r=l;}return {uSizeT:r,uSize:n}}var jl=Object.freeze({__proto__:null,getSizeData:Rl,evaluateSizeForFeature:Ul,evaluateSizeForZoom:ql,SIZE_PACK_FACTOR:Ol});class Nl extends lr{constructor(t,e,r,n){super(t,e),this.angle=r,void 0!==n&&(this.segment=n);}clone(){return new Nl(this.x,this.y,this.angle,this.segment)}}function Kl(t,e,r,n,i){if(void 0===e.segment)return !0;let s=e,a=Number(e.segment)+1,o=0;for(;o>-r/2;){if(a--,a<0)return !1;o-=t[a].dist(s),s=t[a];}o+=t[a].dist(t[a+1]),a++;const l=[];let u=0;for(;o<r/2;){const e=t[a],r=t[a+1];if(!r)return !1;let s=t[a-1].angleTo(e)-e.angleTo(r);for(s=Math.abs((s+3*Math.PI)%(2*Math.PI)-Math.PI),l.push({distance:o,angleDelta:s}),u+=s;o-l[0].distance>n;)u-=l.shift().angleDelta;if(u>i)return !1;a++,o+=e.dist(r);}return !0}function Zl(t){let e=0;for(let r=0;r<t.length-1;r++)e+=t[r].dist(t[r+1]);return e}function Gl(t,e,r){return t?.6*e*r:0}function Jl(t,e){return Math.max(t?t.right-t.left:0,e?e.right-e.left:0)}function Xl(t,e,r,n,i,s){const a=Gl(r,i,s),o=Jl(r,n)*s;let l=0;const u=Zl(t)/2;for(let r=0;r<t.length-1;r++){const n=t[r],i=t[r+1],s=n.dist(i);if(l+s>u){const c=(u-l)/s,h=Nt(n.x,i.x,c),p=Nt(n.y,i.y,c),f=new Nl(h,p,i.angleTo(n),r);return f._round(),!a||Kl(t,f,o,a,e)?f:void 0}l+=s;}}function Yl(t,e,r,n,i,s,a,o,l){const u=Gl(n,s,a),c=Jl(n,i),h=c*a,p=0===t[0].x||t[0].x===l||0===t[0].y||t[0].y===l;return e-h<e/4&&(e=h+e/4),Hl(t,p?e/2*o%e:(c/2+2*s)*a*o%e,e,u,r,h,p,!1,l)}function Hl(t,e,r,n,i,s,a,o,l){const u=s/2,c=Zl(t);let h=0,p=e-r,f=[];for(let e=0;e<t.length-1;e++){const a=t[e],o=t[e+1],d=a.dist(o),y=o.angleTo(a);for(;p+r<h+d;){p+=r;const m=(p-h)/d,g=Nt(a.x,o.x,m),x=Nt(a.y,o.y,m);if(g>=0&&g<l&&x>=0&&x<l&&p-u>=0&&p+u<=c){const r=new Nl(g,x,y,e);r._round(),n&&!Kl(t,r,s,n,i)||f.push(r);}}h+=d;}return o||f.length||a||(f=Hl(t,h/2,r,n,i,s,a,!0,l)),f}function Wl(t,e,r,n,i){const s=[];for(let a=0;a<t.length;a++){const o=t[a];let l;for(let t=0;t<o.length-1;t++){let a=o[t],u=o[t+1];a.x<e&&u.x<e||(a.x<e?a=new lr(e,a.y+(e-a.x)/(u.x-a.x)*(u.y-a.y))._round():u.x<e&&(u=new lr(e,a.y+(e-a.x)/(u.x-a.x)*(u.y-a.y))._round()),a.y<r&&u.y<r||(a.y<r?a=new lr(a.x+(r-a.y)/(u.y-a.y)*(u.x-a.x),r)._round():u.y<r&&(u=new lr(a.x+(r-a.y)/(u.y-a.y)*(u.x-a.x),r)._round()),a.x>=n&&u.x>=n||(a.x>=n?a=new lr(n,a.y+(n-a.x)/(u.x-a.x)*(u.y-a.y))._round():u.x>=n&&(u=new lr(n,a.y+(n-a.x)/(u.x-a.x)*(u.y-a.y))._round()),a.y>=i&&u.y>=i||(a.y>=i?a=new lr(a.x+(i-a.y)/(u.y-a.y)*(u.x-a.x),i)._round():u.y>=i&&(u=new lr(a.x+(i-a.y)/(u.y-a.y)*(u.x-a.x),i)._round()),l&&a.equals(l[l.length-1])||(l=[a],s.push(l)),l.push(u)))));}}return s}function Ql(t,e,r,n){const i=[],s=t.image,a=s.pixelRatio,o=s.paddedRect.w-2,l=s.paddedRect.h-2,u=t.right-t.left,c=t.bottom-t.top,h=s.stretchX||[[0,o]],p=s.stretchY||[[0,l]],f=(t,e)=>t+e[1]-e[0],d=h.reduce(f,0),y=p.reduce(f,0),m=o-d,g=l-y;let x=0,v=d,b=0,w=y,_=0,A=m,k=0,S=g;if(s.content&&n){const t=s.content;x=tu(h,0,t[0]),b=tu(p,0,t[1]),v=tu(h,t[0],t[2]),w=tu(p,t[1],t[3]),_=t[0]-x,k=t[1]-b,A=t[2]-t[0]-v,S=t[3]-t[1]-w;}const z=(n,i,o,l)=>{const h=ru(n.stretch-x,v,u,t.left),p=nu(n.fixed-_,A,n.stretch,d),f=ru(i.stretch-b,w,c,t.top),m=nu(i.fixed-k,S,i.stretch,y),g=ru(o.stretch-x,v,u,t.left),z=nu(o.fixed-_,A,o.stretch,d),I=ru(l.stretch-b,w,c,t.top),M=nu(l.fixed-k,S,l.stretch,y),B=new lr(h,f),C=new lr(g,f),P=new lr(g,I),V=new lr(h,I),E=new lr(p/a,m/a),F=new lr(z/a,M/a),T=e*Math.PI/180;if(T){const t=Math.sin(T),e=Math.cos(T),r=[e,-t,t,e];B._matMult(r),C._matMult(r),V._matMult(r),P._matMult(r);}const L=n.stretch+n.fixed,D=i.stretch+i.fixed;return {tl:B,tr:C,bl:V,br:P,tex:{x:s.paddedRect.x+1+L,y:s.paddedRect.y+1+D,w:o.stretch+o.fixed-L,h:l.stretch+l.fixed-D},writingMode:void 0,glyphOffset:[0,0],sectionIndex:0,pixelOffsetTL:E,pixelOffsetBR:F,minFontScaleX:A/a/u,minFontScaleY:S/a/c,isSDF:r}};if(n&&(s.stretchX||s.stretchY)){const t=eu(h,m,d),e=eu(p,g,y);for(let r=0;r<t.length-1;r++){const n=t[r],s=t[r+1];for(let t=0;t<e.length-1;t++)i.push(z(n,e[t],s,e[t+1]));}}else i.push(z({fixed:0,stretch:-1},{fixed:0,stretch:-1},{fixed:0,stretch:o+1},{fixed:0,stretch:l+1}));return i}function tu(t,e,r){let n=0;for(const i of t)n+=Math.max(e,Math.min(r,i[1]))-Math.max(e,Math.min(r,i[0]));return n}function eu(t,e,r){const n=[{fixed:-1,stretch:0}];for(const[e,r]of t){const t=n[n.length-1];n.push({fixed:e-t.stretch,stretch:t.stretch}),n.push({fixed:e-t.stretch,stretch:t.stretch+(r-e)});}return n.push({fixed:e+1,stretch:r}),n}function ru(t,e,r,n){return t/e*r+n}function nu(t,e,r,n){return t-e*r/n}ir("Anchor",Nl);class iu{constructor(t,e,r,n,i,s,a,o,l,u){if(this.boxStartIndex=t.length,l){let t=s.top,e=s.bottom;const r=s.collisionPadding;r&&(t-=r[1],e+=r[3]);let n=e-t;n>0&&(n=Math.max(10,n),this.circleDiameter=n);}else {let l=s.top*a-o,c=s.bottom*a+o,h=s.left*a-o,p=s.right*a+o;const f=s.collisionPadding;if(f&&(h-=f[0]*a,l-=f[1]*a,p+=f[2]*a,c+=f[3]*a),u){const t=new lr(h,l),e=new lr(p,l),r=new lr(h,c),n=new lr(p,c),i=u*Math.PI/180;t._rotate(i),e._rotate(i),r._rotate(i),n._rotate(i),h=Math.min(t.x,e.x,r.x,n.x),p=Math.max(t.x,e.x,r.x,n.x),l=Math.min(t.y,e.y,r.y,n.y),c=Math.max(t.y,e.y,r.y,n.y);}t.emplaceBack(e.x,e.y,h,l,p,c,r,n,i);}this.boxEndIndex=t.length;}}class su{constructor(t=[],e=au){if(this.data=t,this.length=this.data.length,this.compare=e,this.length>0)for(let t=(this.length>>1)-1;t>=0;t--)this._down(t);}push(t){this.data.push(t),this.length++,this._up(this.length-1);}pop(){if(0===this.length)return;const t=this.data[0],e=this.data.pop();return this.length--,this.length>0&&(this.data[0]=e,this._down(0)),t}peek(){return this.data[0]}_up(t){const{data:e,compare:r}=this,n=e[t];for(;t>0;){const i=t-1>>1,s=e[i];if(r(n,s)>=0)break;e[t]=s,t=i;}e[t]=n;}_down(t){const{data:e,compare:r}=this,n=this.length>>1,i=e[t];for(;t<n;){let n=1+(t<<1),s=e[n];const a=n+1;if(a<this.length&&r(e[a],s)<0&&(n=a,s=e[a]),r(s,i)>=0)break;e[t]=s,t=n;}e[t]=i;}}function au(t,e){return t<e?-1:t>e?1:0}function ou(t,e=1,r=!1){let n=1/0,i=1/0,s=-1/0,a=-1/0;const o=t[0];for(let t=0;t<o.length;t++){const e=o[t];(!t||e.x<n)&&(n=e.x),(!t||e.y<i)&&(i=e.y),(!t||e.x>s)&&(s=e.x),(!t||e.y>a)&&(a=e.y);}const l=Math.min(s-n,a-i);let u=l/2;const c=new su([],lu);if(0===l)return new lr(n,i);for(let e=n;e<s;e+=l)for(let r=i;r<a;r+=l)c.push(new uu(e+u,r+u,u,t));let h=function(t){let e=0,r=0,n=0;const i=t[0];for(let t=0,s=i.length,a=s-1;t<s;a=t++){const s=i[t],o=i[a],l=s.x*o.y-o.x*s.y;r+=(s.x+o.x)*l,n+=(s.y+o.y)*l,e+=3*l;}return new uu(r/e,n/e,0,t)}(t),p=c.length;for(;c.length;){const n=c.pop();(n.d>h.d||!h.d)&&(h=n,r&&console.log("found best %d after %d probes",Math.round(1e4*n.d)/1e4,p)),n.max-h.d<=e||(u=n.h/2,c.push(new uu(n.p.x-u,n.p.y-u,u,t)),c.push(new uu(n.p.x+u,n.p.y-u,u,t)),c.push(new uu(n.p.x-u,n.p.y+u,u,t)),c.push(new uu(n.p.x+u,n.p.y+u,u,t)),p+=4);}return r&&(console.log(`num probes: ${p}`),console.log(`best distance: ${h.d}`)),h.p}function lu(t,e){return e.max-t.max}function uu(t,e,r,n){this.p=new lr(t,e),this.h=r,this.d=function(t,e){let r=!1,n=1/0;for(let i=0;i<e.length;i++){const s=e[i];for(let e=0,i=s.length,a=i-1;e<i;a=e++){const i=s[e],o=s[a];i.y>t.y!=o.y>t.y&&t.x<(o.x-i.x)*(t.y-i.y)/(o.y-i.y)+i.x&&(r=!r),n=Math.min(n,qs(t,i,o));}}return (r?1:-1)*Math.sqrt(n)}(this.p,n),this.max=this.d+this.h*Math.SQRT2;}const cu=Number.POSITIVE_INFINITY;function hu(t,e){return e[1]!==cu?function(t,e,r){let n=0,i=0;switch(e=Math.abs(e),r=Math.abs(r),t){case"top-right":case"top-left":case"top":i=r-7;break;case"bottom-right":case"bottom-left":case"bottom":i=7-r;}switch(t){case"top-right":case"bottom-right":case"right":n=-e;break;case"top-left":case"bottom-left":case"left":n=e;}return [n,i]}(t,e[0],e[1]):function(t,e){let r=0,n=0;e<0&&(e=0);const i=e/Math.sqrt(2);switch(t){case"top-right":case"top-left":n=i-7;break;case"bottom-right":case"bottom-left":n=7-i;break;case"bottom":n=7-e;break;case"top":n=e-7;}switch(t){case"top-right":case"bottom-right":r=-i;break;case"top-left":case"bottom-left":r=i;break;case"left":r=e;break;case"right":r=-e;}return [r,n]}(t,e[0])}function pu(t){switch(t){case"right":case"top-right":case"bottom-right":return "right";case"left":case"top-left":case"bottom-left":return "left"}return "center"}function fu(e,r,n,i,s,a,o,l,u,c,h){let p=a.textMaxSize.evaluate(r,{});void 0===p&&(p=o);const f=e.layers[0].layout,y=f.get("icon-offset").evaluate(r,{},h),m=mu(n.horizontal),g=o/24,x=e.tilePixelRatio*g,v=e.tilePixelRatio*p/24,b=e.tilePixelRatio*l,w=e.tilePixelRatio*f.get("symbol-spacing"),_=f.get("text-padding")*e.tilePixelRatio,A=f.get("icon-padding")*e.tilePixelRatio,k=f.get("text-max-angle")/180*Math.PI,S="map"===f.get("text-rotation-alignment")&&"point"!==f.get("symbol-placement"),z="map"===f.get("icon-rotation-alignment")&&"point"!==f.get("symbol-placement"),I=f.get("symbol-placement"),M=w/2,B=f.get("icon-text-fit");let C;i&&"none"!==B&&(e.allowVerticalPlacement&&n.vertical&&(C=$l(i,n.vertical,B,f.get("icon-text-fit-padding"),y,g)),m&&(i=$l(i,m,B,f.get("icon-text-fit-padding"),y,g)));const P=(l,p)=>{p.x<0||p.x>=Ms||p.y<0||p.y>=Ms||function(e,r,n,i,s,a,o,l,u,c,h,p,f,y,m,g,x,v,b,w,_,A,k,S,z){const I=e.addToLineVertexArray(r,n);let M,B,C,P,V=0,E=0,F=0,T=0,L=-1,D=-1;const $={};let O=ls(""),R=0,U=0;if(void 0===l._unevaluatedLayout.getValue("text-radial-offset")?[R,U]=l.layout.get("text-offset").evaluate(_,{},S).map((t=>t*Zo)):(R=l.layout.get("text-radial-offset").evaluate(_,{},S)*Zo,U=cu),e.allowVerticalPlacement&&i.vertical){const t=l.layout.get("text-rotate").evaluate(_,{},S)+90;C=new iu(u,r,c,h,p,i.vertical,f,y,m,t),o&&(P=new iu(u,r,c,h,p,o,x,v,m,t));}if(s){const n=l.layout.get("icon-rotate").evaluate(_,{}),i="none"!==l.layout.get("icon-text-fit"),a=Ql(s,n,k,i),f=o?Ql(o,n,k,i):void 0;B=new iu(u,r,c,h,p,s,x,v,!1,n),V=4*a.length;const y=e.iconSizeData;let m=null;"source"===y.kind?(m=[Ol*l.layout.get("icon-size").evaluate(_,{})],m[0]>du&&d(`${e.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`)):"composite"===y.kind&&(m=[Ol*A.compositeIconSizes[0].evaluate(_,{},S),Ol*A.compositeIconSizes[1].evaluate(_,{},S)],(m[0]>du||m[1]>du)&&d(`${e.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`)),e.addSymbols(e.icon,a,m,w,b,_,!1,r,I.lineStartIndex,I.lineLength,-1,S),L=e.icon.placedSymbolArray.length-1,f&&(E=4*f.length,e.addSymbols(e.icon,f,m,w,b,_,t.WritingMode.vertical,r,I.lineStartIndex,I.lineLength,-1,S),D=e.icon.placedSymbolArray.length-1);}for(const n in i.horizontal){const s=i.horizontal[n];if(!M){O=ls(s.text);const t=l.layout.get("text-rotate").evaluate(_,{},S);M=new iu(u,r,c,h,p,s,f,y,m,t);}const o=1===s.positionedLines.length;if(F+=yu(e,r,s,a,l,m,_,g,I,i.vertical?t.WritingMode.horizontal:t.WritingMode.horizontalOnly,o?Object.keys(i.horizontal):[n],$,L,A,S),o)break}i.vertical&&(T+=yu(e,r,i.vertical,a,l,m,_,g,I,t.WritingMode.vertical,["vertical"],$,D,A,S));const q=M?M.boxStartIndex:e.collisionBoxArray.length,j=M?M.boxEndIndex:e.collisionBoxArray.length,N=C?C.boxStartIndex:e.collisionBoxArray.length,K=C?C.boxEndIndex:e.collisionBoxArray.length,Z=B?B.boxStartIndex:e.collisionBoxArray.length,G=B?B.boxEndIndex:e.collisionBoxArray.length,J=P?P.boxStartIndex:e.collisionBoxArray.length,X=P?P.boxEndIndex:e.collisionBoxArray.length;let Y=-1;const H=(t,e)=>t&&t.circleDiameter?Math.max(t.circleDiameter,e):e;Y=H(M,Y),Y=H(C,Y),Y=H(B,Y),Y=H(P,Y);const W=Y>-1?1:0;W&&(Y*=z/Zo),e.glyphOffsetArray.length>=Su.MAX_GLYPHS&&d("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907"),void 0!==_.sortKey&&e.addToSortKeyRanges(e.symbolInstances.length,_.sortKey),e.symbolInstances.emplaceBack(r.x,r.y,$.right>=0?$.right:-1,$.center>=0?$.center:-1,$.left>=0?$.left:-1,$.vertical||-1,L,D,O,q,j,N,K,Z,G,J,X,c,F,T,V,E,W,0,f,R,U,Y);}(e,p,l,n,i,s,C,e.layers[0],e.collisionBoxArray,r.index,r.sourceLayerIndex,e.index,x,_,S,u,b,A,z,y,r,a,c,h,o);};if("line"===I)for(const t of Wl(r.geometry,0,0,Ms,Ms)){const r=Yl(t,w,k,n.vertical||m,i,24,v,e.overscaling,Ms);for(const n of r){const r=m;r&&gu(e,r.text,M,n)||P(t,n);}}else if("line-center"===I){for(const t of r.geometry)if(t.length>1){const e=Xl(t,k,n.vertical||m,i,24,v);e&&P(t,e);}}else if("Polygon"===r.type)for(const t of Ja(r.geometry,0)){const e=ou(t,16);P(t[0],new Nl(e.x,e.y,0));}else if("LineString"===r.type)for(const t of r.geometry)P(t,new Nl(t[0].x,t[0].y,0));else if("Point"===r.type)for(const t of r.geometry)for(const e of t)P([e],new Nl(e.x,e.y,0));}const du=32640;function yu(t,e,r,n,i,s,a,o,l,u,c,h,p,f,y){const m=function(t,e,r,n,i,s,a,o){const l=n.layout.get("text-rotate").evaluate(s,{})*Math.PI/180,u=[];for(const t of e.positionedLines)for(const n of t.positionedGlyphs){if(!n.rect)continue;const s=n.rect||{};let c=4,h=!0,p=1,f=0;const d=(i||o)&&n.vertical,y=n.metrics.advance*n.scale/2;if(o&&e.verticalizable){const e=(n.scale-1)*Zo,r=(Zo-n.metrics.width*n.scale)/2;f=t.lineOffset/2-(n.imageName?-r:e);}if(n.imageName){const t=a[n.imageName];h=t.sdf,p=t.pixelRatio,c=1/p;}const m=i?[n.x+y,n.y]:[0,0];let g=i?[0,0]:[n.x+y+r[0],n.y+r[1]-f],x=[0,0];d&&(x=g,g=[0,0]);const v=(n.metrics.left-c)*n.scale-y+g[0],b=(-n.metrics.top-c)*n.scale+g[1],w=v+s.w*n.scale/p,_=b+s.h*n.scale/p,A=new lr(v,b),k=new lr(w,b),S=new lr(v,_),z=new lr(w,_);if(d){const t=new lr(-y,y-Al),e=-Math.PI/2,r=12-y,i=new lr(22-r,-(n.imageName?r:0)),s=new lr(...x);A._rotateAround(e,t)._add(i)._add(s),k._rotateAround(e,t)._add(i)._add(s),S._rotateAround(e,t)._add(i)._add(s),z._rotateAround(e,t)._add(i)._add(s);}if(l){const t=Math.sin(l),e=Math.cos(l),r=[e,-t,t,e];A._matMult(r),k._matMult(r),S._matMult(r),z._matMult(r);}const I=new lr(0,0),M=new lr(0,0);u.push({tl:A,tr:k,bl:S,br:z,tex:s,writingMode:e.writingMode,glyphOffset:m,sectionIndex:n.sectionIndex,isSDF:h,pixelOffsetTL:I,pixelOffsetBR:M,minFontScaleX:0,minFontScaleY:0});}return u}(0,r,o,i,s,a,n,t.allowVerticalPlacement),g=t.textSizeData;let x=null;"source"===g.kind?(x=[Ol*i.layout.get("text-size").evaluate(a,{})],x[0]>du&&d(`${t.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`)):"composite"===g.kind&&(x=[Ol*f.compositeTextSizes[0].evaluate(a,{},y),Ol*f.compositeTextSizes[1].evaluate(a,{},y)],(x[0]>du||x[1]>du)&&d(`${t.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`)),t.addSymbols(t.text,m,x,o,s,a,u,e,l.lineStartIndex,l.lineLength,p,y);for(const e of c)h[e]=t.text.placedSymbolArray.length-1;return 4*m.length}function mu(t){for(const e in t)return t[e];return null}function gu(t,e,r,n){const i=t.compareText;if(e in i){const t=i[e];for(let e=t.length-1;e>=0;e--)if(n.dist(t[e])<r)return !0}else i[e]=[];return i[e].push(n),!1}const xu=no.VectorTileFeature.types,vu=[{name:"a_fade_opacity",components:1,type:"Uint8",offset:0}];function bu(t,e,r,n,i,s,a,o,l,u,c,h,p){const f=o?Math.min(du,Math.round(o[0])):0,d=o?Math.min(du,Math.round(o[1])):0;t.emplaceBack(e,r,Math.round(32*n),Math.round(32*i),s,a,(f<<1)+(l?1:0),d,16*u,16*c,256*h,256*p);}function wu(t,e,r){t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r);}function _u(t){for(const e of t.sections)if(On(e.text))return !0;return !1}class Au{constructor(t){this.layoutVertexArray=new zi,this.indexArray=new Ei,this.programConfigurations=t,this.segments=new ts,this.dynamicLayoutVertexArray=new Ii,this.opacityVertexArray=new Mi,this.placedSymbolArray=new Ki;}isEmpty(){return 0===this.layoutVertexArray.length&&0===this.indexArray.length&&0===this.dynamicLayoutVertexArray.length&&0===this.opacityVertexArray.length}upload(t,e,r,n){this.isEmpty()||(r&&(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Oo.members),this.indexBuffer=t.createIndexBuffer(this.indexArray,e),this.dynamicLayoutVertexBuffer=t.createVertexBuffer(this.dynamicLayoutVertexArray,Ro.members,!0),this.opacityVertexBuffer=t.createVertexBuffer(this.opacityVertexArray,vu,!0),this.opacityVertexBuffer.itemSize=1),(r||n)&&this.programConfigurations.upload(t));}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.dynamicLayoutVertexBuffer.destroy(),this.opacityVertexBuffer.destroy());}}ir("SymbolBuffers",Au);class ku{constructor(t,e,r){this.layoutVertexArray=new t,this.layoutAttributes=e,this.indexArray=new r,this.segments=new ts,this.collisionVertexArray=new Vi;}upload(t){this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,this.layoutAttributes),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.collisionVertexBuffer=t.createVertexBuffer(this.collisionVertexArray,Uo.members,!0);}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.segments.destroy(),this.collisionVertexBuffer.destroy());}}ir("CollisionBuffers",ku);class Su{constructor(t){this.collisionBoxArray=t.collisionBoxArray,this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map((t=>t.id)),this.index=t.index,this.pixelRatio=t.pixelRatio,this.sourceLayerIndex=t.sourceLayerIndex,this.hasPattern=!1,this.hasRTLText=!1,this.sortKeyRanges=[],this.collisionCircleArray=[],this.placementInvProjMatrix=Ws(),this.placementViewportMatrix=Ws();const e=this.layers[0]._unevaluatedLayout._values;this.textSizeData=Rl(this.zoom,e["text-size"]),this.iconSizeData=Rl(this.zoom,e["icon-size"]);const r=this.layers[0].layout,n=r.get("symbol-sort-key"),i=r.get("symbol-z-order");this.canOverlap=r.get("text-allow-overlap")||r.get("icon-allow-overlap")||r.get("text-ignore-placement")||r.get("icon-ignore-placement"),this.sortFeaturesByKey="viewport-y"!==i&&!n.isConstant(),this.sortFeaturesByY=("viewport-y"===i||"auto"===i&&!this.sortFeaturesByKey)&&this.canOverlap,"point"===r.get("symbol-placement")&&(this.writingModes=r.get("text-writing-mode").map((t=>_l[t]))),this.stateDependentLayerIds=this.layers.filter((t=>t.isStateDependent())).map((t=>t.id)),this.sourceID=t.sourceID;}createArrays(){this.text=new Au(new Ss(this.layers,this.zoom,(t=>/^text/.test(t)))),this.icon=new Au(new Ss(this.layers,this.zoom,(t=>/^icon/.test(t)))),this.glyphOffsetArray=new Ji,this.lineVertexArray=new Xi,this.symbolInstances=new Gi;}calculateGlyphDependencies(t,e,r,n,i){for(let s=0;s<t.length;s++)if(e[t.charCodeAt(s)]=!0,(r||n)&&i){const r=Ko[t.charAt(s)];r&&(e[r.charCodeAt(0)]=!0);}}populate(e,r,n){const i=this.layers[0],s=i.layout,a=s.get("text-font"),o=s.get("text-field"),l=s.get("icon-image"),u=("constant"!==o.value.kind||o.value.value instanceof et&&!o.value.value.isEmpty()||o.value.value.toString().length>0)&&("constant"!==a.value.kind||a.value.value.length>0),c="constant"!==l.value.kind||!!l.value.value||Object.keys(l.parameters).length>0,h=s.get("symbol-sort-key");if(this.features=[],!u&&!c)return;const p=r.iconDependencies,f=r.glyphDependencies,d=r.availableImages,y=new Wn(this.zoom);for(const{feature:r,id:o,index:l,sourceLayerIndex:m}of e){const e=i._featureFilter.needGeometry,g=Vs(r,e);if(!i._featureFilter.filter(y,g,n))continue;let x,v;if(e||(g.geometry=Ps(r)),u){const t=i.getValueAndResolveTokens("text-field",g,n,d),e=et.factory(t);_u(e)&&(this.hasRTLText=!0),(!this.hasRTLText||"unavailable"===Xn()||this.hasRTLText&&Hn.isParsed())&&(x=No(e,i,g));}if(c){const t=i.getValueAndResolveTokens("icon-image",g,n,d);v=t instanceof rt?t:rt.fromString(t);}if(!x&&!v)continue;const b=this.sortFeaturesByKey?h.evaluate(g,{},n):void 0;if(this.features.push({id:o,text:x,icon:v,index:l,sourceLayerIndex:m,geometry:g.geometry,properties:r.properties,type:xu[r.type],sortKey:b}),v&&(p[v.name]=!0),x){const e=a.evaluate(g,{},n).join(","),r="map"===s.get("text-rotation-alignment")&&"point"!==s.get("symbol-placement");this.allowVerticalPlacement=this.writingModes&&this.writingModes.indexOf(t.WritingMode.vertical)>=0;for(const t of x.sections)if(t.image)p[t.image.name]=!0;else {const n=Vn(x.toString()),i=t.fontStack||e,s=f[i]=f[i]||{};this.calculateGlyphDependencies(t.text,s,r,this.allowVerticalPlacement,n);}}}"line"===s.get("symbol-placement")&&(this.features=function(t){const e={},r={},n=[];let i=0;function s(e){n.push(t[e]),i++;}function a(t,e,i){const s=r[t];return delete r[t],r[e]=s,n[s].geometry[0].pop(),n[s].geometry[0]=n[s].geometry[0].concat(i[0]),s}function o(t,r,i){const s=e[r];return delete e[r],e[t]=s,n[s].geometry[0].shift(),n[s].geometry[0]=i[0].concat(n[s].geometry[0]),s}function l(t,e,r){const n=r?e[0][e[0].length-1]:e[0][0];return `${t}:${n.x}:${n.y}`}for(let u=0;u<t.length;u++){const c=t[u],h=c.geometry,p=c.text?c.text.toString():null;if(!p){s(u);continue}const f=l(p,h),d=l(p,h,!0);if(f in r&&d in e&&r[f]!==e[d]){const t=o(f,d,h),i=a(f,d,n[t].geometry);delete e[f],delete r[d],r[l(p,n[i].geometry,!0)]=i,n[t].geometry=null;}else f in r?a(f,d,h):d in e?o(f,d,h):(s(u),e[f]=i-1,r[d]=i-1);}return n.filter((t=>t.geometry))}(this.features)),this.sortFeaturesByKey&&this.features.sort(((t,e)=>t.sortKey-e.sortKey));}update(t,e,r){this.stateDependentLayers.length&&(this.text.programConfigurations.updatePaintArrays(t,e,this.layers,r),this.icon.programConfigurations.updatePaintArrays(t,e,this.layers,r));}isEmpty(){return 0===this.symbolInstances.length&&!this.hasRTLText}uploadPending(){return !this.uploaded||this.text.programConfigurations.needsUpload||this.icon.programConfigurations.needsUpload}upload(t){!this.uploaded&&this.hasDebugData()&&(this.textCollisionBox.upload(t),this.iconCollisionBox.upload(t)),this.text.upload(t,this.sortFeaturesByY,!this.uploaded,this.text.programConfigurations.needsUpload),this.icon.upload(t,this.sortFeaturesByY,!this.uploaded,this.icon.programConfigurations.needsUpload),this.uploaded=!0;}destroyDebugData(){this.textCollisionBox.destroy(),this.iconCollisionBox.destroy();}destroy(){this.text.destroy(),this.icon.destroy(),this.hasDebugData()&&this.destroyDebugData();}addToLineVertexArray(t,e){const r=this.lineVertexArray.length;if(void 0!==t.segment){let r=t.dist(e[t.segment+1]),n=t.dist(e[t.segment]);const i={};for(let n=t.segment+1;n<e.length;n++)i[n]={x:e[n].x,y:e[n].y,tileUnitDistanceFromAnchor:r},n<e.length-1&&(r+=e[n+1].dist(e[n]));for(let r=t.segment||0;r>=0;r--)i[r]={x:e[r].x,y:e[r].y,tileUnitDistanceFromAnchor:n},r>0&&(n+=e[r-1].dist(e[r]));for(let t=0;t<e.length;t++){const e=i[t];this.lineVertexArray.emplaceBack(e.x,e.y,e.tileUnitDistanceFromAnchor);}}return {lineStartIndex:r,lineLength:this.lineVertexArray.length-r}}addSymbols(e,r,n,i,s,a,o,l,u,c,h,p){const f=e.indexArray,d=e.layoutVertexArray,y=e.segments.prepareSegment(4*r.length,d,f,this.canOverlap?a.sortKey:void 0),m=this.glyphOffsetArray.length,g=y.vertexLength,x=this.allowVerticalPlacement&&o===t.WritingMode.vertical?Math.PI/2:0,v=a.text&&a.text.sections;for(let t=0;t<r.length;t++){const{tl:i,tr:s,bl:o,br:u,tex:c,pixelOffsetTL:h,pixelOffsetBR:m,minFontScaleX:g,minFontScaleY:b,glyphOffset:w,isSDF:_,sectionIndex:A}=r[t],k=y.vertexLength,S=w[1];bu(d,l.x,l.y,i.x,S+i.y,c.x,c.y,n,_,h.x,h.y,g,b),bu(d,l.x,l.y,s.x,S+s.y,c.x+c.w,c.y,n,_,m.x,h.y,g,b),bu(d,l.x,l.y,o.x,S+o.y,c.x,c.y+c.h,n,_,h.x,m.y,g,b),bu(d,l.x,l.y,u.x,S+u.y,c.x+c.w,c.y+c.h,n,_,m.x,m.y,g,b),wu(e.dynamicLayoutVertexArray,l,x),f.emplaceBack(k,k+1,k+2),f.emplaceBack(k+1,k+2,k+3),y.vertexLength+=4,y.primitiveLength+=2,this.glyphOffsetArray.emplaceBack(w[0]),t!==r.length-1&&A===r[t+1].sectionIndex||e.programConfigurations.populatePaintArrays(d.length,a,a.index,{},p,v&&v[A]);}e.placedSymbolArray.emplaceBack(l.x,l.y,m,this.glyphOffsetArray.length-m,g,u,c,l.segment,n?n[0]:0,n?n[1]:0,i[0],i[1],o,0,!1,0,h);}_addCollisionDebugVertex(t,e,r,n,i,s){return e.emplaceBack(0,0),t.emplaceBack(r.x,r.y,n,i,Math.round(s.x),Math.round(s.y))}addCollisionDebugVertices(t,e,r,n,i,s,a){const o=i.segments.prepareSegment(4,i.layoutVertexArray,i.indexArray),l=o.vertexLength,u=i.layoutVertexArray,c=i.collisionVertexArray,h=a.anchorX,p=a.anchorY;this._addCollisionDebugVertex(u,c,s,h,p,new lr(t,e)),this._addCollisionDebugVertex(u,c,s,h,p,new lr(r,e)),this._addCollisionDebugVertex(u,c,s,h,p,new lr(r,n)),this._addCollisionDebugVertex(u,c,s,h,p,new lr(t,n)),o.vertexLength+=4;const f=i.indexArray;f.emplaceBack(l,l+1),f.emplaceBack(l+1,l+2),f.emplaceBack(l+2,l+3),f.emplaceBack(l+3,l),o.primitiveLength+=4;}addDebugCollisionBoxes(t,e,r,n){for(let i=t;i<e;i++){const t=this.collisionBoxArray.get(i);this.addCollisionDebugVertices(t.x1,t.y1,t.x2,t.y2,n?this.textCollisionBox:this.iconCollisionBox,t.anchorPoint,r);}}generateCollisionDebugBuffers(){this.hasDebugData()&&this.destroyDebugData(),this.textCollisionBox=new ku(Ci,qo.members,Oi),this.iconCollisionBox=new ku(Ci,qo.members,Oi);for(let t=0;t<this.symbolInstances.length;t++){const e=this.symbolInstances.get(t);this.addDebugCollisionBoxes(e.textBoxStartIndex,e.textBoxEndIndex,e,!0),this.addDebugCollisionBoxes(e.verticalTextBoxStartIndex,e.verticalTextBoxEndIndex,e,!0),this.addDebugCollisionBoxes(e.iconBoxStartIndex,e.iconBoxEndIndex,e,!1),this.addDebugCollisionBoxes(e.verticalIconBoxStartIndex,e.verticalIconBoxEndIndex,e,!1);}}_deserializeCollisionBoxesForSymbol(t,e,r,n,i,s,a,o,l){const u={};for(let n=e;n<r;n++){const e=t.get(n);u.textBox={x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,anchorPointX:e.anchorPointX,anchorPointY:e.anchorPointY},u.textFeatureIndex=e.featureIndex;break}for(let e=n;e<i;e++){const r=t.get(e);u.verticalTextBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.verticalTextFeatureIndex=r.featureIndex;break}for(let e=s;e<a;e++){const r=t.get(e);u.iconBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.iconFeatureIndex=r.featureIndex;break}for(let e=o;e<l;e++){const r=t.get(e);u.verticalIconBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.verticalIconFeatureIndex=r.featureIndex;break}return u}deserializeCollisionBoxes(t){this.collisionArrays=[];for(let e=0;e<this.symbolInstances.length;e++){const r=this.symbolInstances.get(e);this.collisionArrays.push(this._deserializeCollisionBoxesForSymbol(t,r.textBoxStartIndex,r.textBoxEndIndex,r.verticalTextBoxStartIndex,r.verticalTextBoxEndIndex,r.iconBoxStartIndex,r.iconBoxEndIndex,r.verticalIconBoxStartIndex,r.verticalIconBoxEndIndex));}}hasTextData(){return this.text.segments.get().length>0}hasIconData(){return this.icon.segments.get().length>0}hasDebugData(){return this.textCollisionBox&&this.iconCollisionBox}hasTextCollisionBoxData(){return this.hasDebugData()&&this.textCollisionBox.segments.get().length>0}hasIconCollisionBoxData(){return this.hasDebugData()&&this.iconCollisionBox.segments.get().length>0}addIndicesForPlacedSymbol(t,e){const r=t.placedSymbolArray.get(e),n=r.vertexStartIndex+4*r.numGlyphs;for(let e=r.vertexStartIndex;e<n;e+=4)t.indexArray.emplaceBack(e,e+1,e+2),t.indexArray.emplaceBack(e+1,e+2,e+3);}getSortedSymbolIndexes(t){if(this.sortedAngle===t&&void 0!==this.symbolInstanceIndexes)return this.symbolInstanceIndexes;const e=Math.sin(t),r=Math.cos(t),n=[],i=[],s=[];for(let t=0;t<this.symbolInstances.length;++t){s.push(t);const a=this.symbolInstances.get(t);n.push(0|Math.round(e*a.anchorX+r*a.anchorY)),i.push(a.featureIndex);}return s.sort(((t,e)=>n[t]-n[e]||i[e]-i[t])),s}addToSortKeyRanges(t,e){const r=this.sortKeyRanges[this.sortKeyRanges.length-1];r&&r.sortKey===e?r.symbolInstanceEnd=t+1:this.sortKeyRanges.push({sortKey:e,symbolInstanceStart:t,symbolInstanceEnd:t+1});}sortFeatures(t){if(this.sortFeaturesByY&&this.sortedAngle!==t&&!(this.text.segments.get().length>1||this.icon.segments.get().length>1)){this.symbolInstanceIndexes=this.getSortedSymbolIndexes(t),this.sortedAngle=t,this.text.indexArray.clear(),this.icon.indexArray.clear(),this.featureSortOrder=[];for(const t of this.symbolInstanceIndexes){const e=this.symbolInstances.get(t);this.featureSortOrder.push(e.featureIndex),[e.rightJustifiedTextSymbolIndex,e.centerJustifiedTextSymbolIndex,e.leftJustifiedTextSymbolIndex].forEach(((t,e,r)=>{t>=0&&r.indexOf(t)===e&&this.addIndicesForPlacedSymbol(this.text,t);})),e.verticalPlacedTextSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.text,e.verticalPlacedTextSymbolIndex),e.placedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,e.placedIconSymbolIndex),e.verticalPlacedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,e.verticalPlacedIconSymbolIndex);}this.text.indexBuffer&&this.text.indexBuffer.updateData(this.text.indexArray),this.icon.indexBuffer&&this.icon.indexBuffer.updateData(this.icon.indexArray);}}}ir("SymbolBucket",Su,{omit:["layers","collisionBoxArray","features","compareText"]}),Su.MAX_GLYPHS=65535,Su.addDynamicAttributes=wu;const zu=new pi({"symbol-placement":new oi(Ur.layout_symbol["symbol-placement"]),"symbol-spacing":new oi(Ur.layout_symbol["symbol-spacing"]),"symbol-avoid-edges":new oi(Ur.layout_symbol["symbol-avoid-edges"]),"symbol-sort-key":new li(Ur.layout_symbol["symbol-sort-key"]),"symbol-z-order":new oi(Ur.layout_symbol["symbol-z-order"]),"icon-allow-overlap":new oi(Ur.layout_symbol["icon-allow-overlap"]),"icon-ignore-placement":new oi(Ur.layout_symbol["icon-ignore-placement"]),"icon-optional":new oi(Ur.layout_symbol["icon-optional"]),"icon-rotation-alignment":new oi(Ur.layout_symbol["icon-rotation-alignment"]),"icon-size":new li(Ur.layout_symbol["icon-size"]),"icon-text-fit":new oi(Ur.layout_symbol["icon-text-fit"]),"icon-text-fit-padding":new oi(Ur.layout_symbol["icon-text-fit-padding"]),"icon-image":new li(Ur.layout_symbol["icon-image"]),"icon-rotate":new li(Ur.layout_symbol["icon-rotate"]),"icon-padding":new oi(Ur.layout_symbol["icon-padding"]),"icon-keep-upright":new oi(Ur.layout_symbol["icon-keep-upright"]),"icon-offset":new li(Ur.layout_symbol["icon-offset"]),"icon-anchor":new li(Ur.layout_symbol["icon-anchor"]),"icon-pitch-alignment":new oi(Ur.layout_symbol["icon-pitch-alignment"]),"text-pitch-alignment":new oi(Ur.layout_symbol["text-pitch-alignment"]),"text-rotation-alignment":new oi(Ur.layout_symbol["text-rotation-alignment"]),"text-field":new li(Ur.layout_symbol["text-field"]),"text-font":new li(Ur.layout_symbol["text-font"]),"text-size":new li(Ur.layout_symbol["text-size"]),"text-max-width":new li(Ur.layout_symbol["text-max-width"]),"text-line-height":new oi(Ur.layout_symbol["text-line-height"]),"text-letter-spacing":new li(Ur.layout_symbol["text-letter-spacing"]),"text-justify":new li(Ur.layout_symbol["text-justify"]),"text-radial-offset":new li(Ur.layout_symbol["text-radial-offset"]),"text-variable-anchor":new oi(Ur.layout_symbol["text-variable-anchor"]),"text-anchor":new li(Ur.layout_symbol["text-anchor"]),"text-max-angle":new oi(Ur.layout_symbol["text-max-angle"]),"text-writing-mode":new oi(Ur.layout_symbol["text-writing-mode"]),"text-rotate":new li(Ur.layout_symbol["text-rotate"]),"text-padding":new oi(Ur.layout_symbol["text-padding"]),"text-keep-upright":new oi(Ur.layout_symbol["text-keep-upright"]),"text-transform":new li(Ur.layout_symbol["text-transform"]),"text-offset":new li(Ur.layout_symbol["text-offset"]),"text-allow-overlap":new oi(Ur.layout_symbol["text-allow-overlap"]),"text-ignore-placement":new oi(Ur.layout_symbol["text-ignore-placement"]),"text-optional":new oi(Ur.layout_symbol["text-optional"])});var Iu={paint:new pi({"icon-opacity":new li(Ur.paint_symbol["icon-opacity"]),"icon-color":new li(Ur.paint_symbol["icon-color"]),"icon-halo-color":new li(Ur.paint_symbol["icon-halo-color"]),"icon-halo-width":new li(Ur.paint_symbol["icon-halo-width"]),"icon-halo-blur":new li(Ur.paint_symbol["icon-halo-blur"]),"icon-translate":new oi(Ur.paint_symbol["icon-translate"]),"icon-translate-anchor":new oi(Ur.paint_symbol["icon-translate-anchor"]),"text-opacity":new li(Ur.paint_symbol["text-opacity"]),"text-color":new li(Ur.paint_symbol["text-color"],{runtimeType:U,getOverride:t=>t.textColor,hasOverride:t=>!!t.textColor}),"text-halo-color":new li(Ur.paint_symbol["text-halo-color"]),"text-halo-width":new li(Ur.paint_symbol["text-halo-width"]),"text-halo-blur":new li(Ur.paint_symbol["text-halo-blur"]),"text-translate":new oi(Ur.paint_symbol["text-translate"]),"text-translate-anchor":new oi(Ur.paint_symbol["text-translate-anchor"])}),layout:zu};class Mu{constructor(t){this.type=t.property.overrides?t.property.overrides.runtimeType:D,this.defaultValue=t;}evaluate(t){if(t.formattedSection){const e=this.defaultValue.property.overrides;if(e&&e.hasOverride(t.formattedSection))return e.getOverride(t.formattedSection)}return t.feature&&t.featureState?this.defaultValue.evaluate(t.feature,t.featureState):this.defaultValue.property.specification.default}eachChild(t){this.defaultValue.isConstant()||t(this.defaultValue.value._styleExpression.expression);}outputDefined(){return !1}serialize(){return null}}ir("FormatSectionOverride",Mu,{omit:["defaultValue"]});class Bu extends di{constructor(t){super(t,Iu),this.queryRadius=()=>0,this.queryIntersectsFeature=()=>!1;}recalculate(t,e){if(super.recalculate(t,e),"auto"===this.layout.get("icon-rotation-alignment")&&(this.layout._values["icon-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-rotation-alignment")&&(this.layout._values["text-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-pitch-alignment")&&(this.layout._values["text-pitch-alignment"]=this.layout.get("text-rotation-alignment")),"auto"===this.layout.get("icon-pitch-alignment")&&(this.layout._values["icon-pitch-alignment"]=this.layout.get("icon-rotation-alignment")),"point"===this.layout.get("symbol-placement")){const t=this.layout.get("text-writing-mode");if(t){const e=[];for(const r of t)e.indexOf(r)<0&&e.push(r);this.layout._values["text-writing-mode"]=e;}else this.layout._values["text-writing-mode"]=["horizontal"];}this._setPaintOverrides();}getValueAndResolveTokens(t,e,r,n){const i=this.layout.get(t).evaluate(e,{},r,n),s=this._unevaluatedLayout._values[t];return s.isDataDriven()||Ye(s.value)||!i?i:function(t,e){return e.replace(/{([^{}]+)}/g,((e,r)=>r in t?String(t[r]):""))}(e.properties,i)}createBucket(t){return new Su(t)}_setPaintOverrides(){for(const t of Iu.paint.overridableProperties){if(!Bu.hasPaintOverride(this.layout,t))continue;const e=this.paint.get(t),r=new Mu(e),n=new Xe(r,e.property.specification);let i=null;i="constant"===e.value.kind||"source"===e.value.kind?new We("source",n):new Qe("composite",n,e.value.zoomStops,e.value._interpolationType),this.paint._values[t]=new si(e.property,i,e.parameters);}}_handleOverridablePaintPropertyUpdate(t,e,r){return !(!this.layout||e.isDataDriven()||r.isDataDriven())&&Bu.hasPaintOverride(this.layout,t)}static hasPaintOverride(t,e){const r=t.get("text-field"),n=Iu.paint.properties[e];let i=!1;const s=t=>{for(const e of t)if(n.overrides&&n.overrides.hasOverride(e))return void(i=!0)};if("constant"===r.value.kind&&r.value.value instanceof et)s(r.value.value.sections);else if("source"===r.value.kind){const t=e=>{i||(e instanceof ot&&st(e.value)===K?s(e.value.sections):e instanceof ht?s(e.sections):e.eachChild(t));},e=r.value;e._styleExpression&&t(e._styleExpression.expression);}return i}}var Cu={paint:new pi({"background-color":new oi(Ur.paint_background["background-color"]),"background-pattern":new ci(Ur.paint_background["background-pattern"]),"background-opacity":new oi(Ur.paint_background["background-opacity"])})},Pu={paint:new pi({"raster-opacity":new oi(Ur.paint_raster["raster-opacity"]),"raster-hue-rotate":new oi(Ur.paint_raster["raster-hue-rotate"]),"raster-brightness-min":new oi(Ur.paint_raster["raster-brightness-min"]),"raster-brightness-max":new oi(Ur.paint_raster["raster-brightness-max"]),"raster-saturation":new oi(Ur.paint_raster["raster-saturation"]),"raster-contrast":new oi(Ur.paint_raster["raster-contrast"]),"raster-resampling":new oi(Ur.paint_raster["raster-resampling"]),"raster-fade-duration":new oi(Ur.paint_raster["raster-fade-duration"])})};class Vu extends di{constructor(t){super(t,{}),this.onAdd=t=>{this.implementation.onAdd&&this.implementation.onAdd(t,t.painter.context.gl);},this.onRemove=t=>{this.implementation.onRemove&&this.implementation.onRemove(t,t.painter.context.gl);},this.implementation=t;}is3D(){return "3d"===this.implementation.renderingMode}hasOffscreenPass(){return void 0!==this.implementation.prerender}recalculate(){}updateTransitions(){}hasTransition(){return !1}serialize(){}}const Eu={circle:class extends di{constructor(t){super(t,Ys),this.queryRadius=t=>{const e=t;return Zs("circle-radius",this,e)+Zs("circle-stroke-width",this,e)+Gs(this.paint.get("circle-translate"))},this.queryIntersectsFeature=(t,e,r,n,i,s,a,o)=>{const l=Js(t,this.paint.get("circle-translate"),this.paint.get("circle-translate-anchor"),s.angle,a),u=this.paint.get("circle-radius").evaluate(e,r)+this.paint.get("circle-stroke-width").evaluate(e,r),c="map"===this.paint.get("circle-pitch-alignment"),h=c?l:function(t,e){return t.map((t=>ia(t,e)))}(l,o),p=c?u*a:u;for(const t of n)for(const e of t){const t=c?e:ia(e,o);let r=p;const n=na(ea(),ra(e.x,e.y,0,1),o);if("viewport"===this.paint.get("circle-pitch-scale")&&"map"===this.paint.get("circle-pitch-alignment")?r*=n[3]/s.cameraToCenterDistance:"map"===this.paint.get("circle-pitch-scale")&&"viewport"===this.paint.get("circle-pitch-alignment")&&(r*=s.cameraToCenterDistance/n[3]),Ls(h,t,r))return !0}return !1};}createBucket(t){return new Fs(t)}},heatmap:class extends di{constructor(t){super(t,aa),this.queryRadius=()=>0,this.queryIntersectsFeature=()=>!1,this._updateColorRamp();}createBucket(t){return new sa(t)}_handleSpecialPaintPropertyUpdate(t){"heatmap-color"===t&&this._updateColorRamp();}_updateColorRamp(){this.colorRamp=pa({expression:this._transitionablePaint._values["heatmap-color"].value.expression,evaluationKey:"heatmapDensity",image:this.colorRamp}),this.colorRampTexture=null;}resize(){this.heatmapFbo&&(this.heatmapFbo.destroy(),this.heatmapFbo=null);}hasOffscreenPass(){return 0!==this.paint.get("heatmap-opacity")&&"none"!==this.visibility}},hillshade:class extends di{constructor(t){super(t,fa);}hasOffscreenPass(){return 0!==this.paint.get("hillshade-exaggeration")&&"none"!==this.visibility}},fill:class extends di{constructor(t){super(t,to),this.queryRadius=()=>Gs(this.paint.get("fill-translate")),this.queryIntersectsFeature=(t,e,r,n,i,s,a)=>Ds(Js(t,this.paint.get("fill-translate"),this.paint.get("fill-translate-anchor"),s.angle,a),n);}recalculate(t,e){super.recalculate(t,e);const r=this.paint._values["fill-outline-color"];"constant"===r.value.kind&&void 0===r.value.value&&(this.paint._values["fill-outline-color"]=this.paint._values["fill-color"]);}createBucket(t){return new Wa(t)}isTileClipped(){return !0}},"fill-extrusion":class extends di{constructor(t){super(t,ko),this.queryRadius=()=>Gs(this.paint.get("fill-extrusion-translate")),this.queryIntersectsFeature=(t,e,r,n,i,s,a,o)=>{const l=Js(t,this.paint.get("fill-extrusion-translate"),this.paint.get("fill-extrusion-translate-anchor"),s.angle,a),u=this.paint.get("fill-extrusion-height").evaluate(e,r),c=this.paint.get("fill-extrusion-base").evaluate(e,r),h=function(t,e,r,n){const i=[];for(const r of t){const t=ra(r.x,r.y,0,1);na(t,t,e),i.push(new lr(t[0]/t[3],t[1]/t[3]));}return i}(l,o),p=function(t,e,r,n){const i=[],s=[],a=n[8]*e,o=n[9]*e,l=n[10]*e,u=n[11]*e,c=n[8]*r,h=n[9]*r,p=n[10]*r,f=n[11]*r;for(const e of t){const t=[],r=[];for(const i of e){const e=i.x,s=i.y,d=n[0]*e+n[4]*s+n[12],y=n[1]*e+n[5]*s+n[13],m=n[2]*e+n[6]*s+n[14],g=n[3]*e+n[7]*s+n[15],x=m+l,v=g+u,b=d+c,w=y+h,_=m+p,A=g+f,k=new lr((d+a)/v,(y+o)/v);k.z=x/v,t.push(k);const S=new lr(b/A,w/A);S.z=_/A,r.push(S);}i.push(t),s.push(r);}return [i,s]}(n,c,u,o);return function(t,e,r){let n=1/0;Ds(r,e)&&(n=zo(r,e[0]));for(let i=0;i<e.length;i++){const s=e[i],a=t[i];for(let t=0;t<s.length-1;t++){const e=s[t],i=[e,s[t+1],a[t+1],a[t],e];Ts(r,i)&&(n=Math.min(n,zo(r,i)));}}return n!==1/0&&n}(p[0],p[1],h)};}createBucket(t){return new wo(t)}is3D(){return !0}},line:class extends di{constructor(t){super(t,Lo),this.queryRadius=t=>{const e=t,r=$o(Zs("line-width",this,e),Zs("line-gap-width",this,e)),n=Zs("line-offset",this,e);return r/2+Math.abs(n)+Gs(this.paint.get("line-translate"))},this.queryIntersectsFeature=(t,e,r,n,i,s,a)=>{const o=Js(t,this.paint.get("line-translate"),this.paint.get("line-translate-anchor"),s.angle,a),l=a/2*$o(this.paint.get("line-width").evaluate(e,r),this.paint.get("line-gap-width").evaluate(e,r)),u=this.paint.get("line-offset").evaluate(e,r);return u&&(n=function(t,e){const r=[],n=new lr(0,0);for(let i=0;i<t.length;i++){const s=t[i],a=[];for(let t=0;t<s.length;t++){const r=s[t-1],i=s[t],o=s[t+1],l=0===t?n:i.sub(r)._unit()._perp(),u=t===s.length-1?n:o.sub(i)._unit()._perp(),c=l._add(u)._unit();c._mult(1/(c.x*u.x+c.y*u.y)),a.push(c._mult(e)._add(i));}r.push(a);}return r}(n,u*a)),function(t,e,r){for(let n=0;n<e.length;n++){const i=e[n];if(t.length>=3)for(let e=0;e<i.length;e++)if(Ns(t,i[e]))return !0;if($s(t,i,r))return !0}return !1}(o,n,l)},this.gradientVersion=0;}_handleSpecialPaintPropertyUpdate(t){"line-gradient"===t&&(this.stepInterpolant=this._transitionablePaint._values["line-gradient"].value.expression._styleExpression.expression instanceof jt,this.gradientVersion=(this.gradientVersion+1)%Number.MAX_SAFE_INTEGER);}gradientExpression(){return this._transitionablePaint._values["line-gradient"].value.expression}recalculate(t,e){super.recalculate(t,e),this.paint._values["line-floorwidth"]=Do.possiblyEvaluate(this._transitioningPaint._values["line-width"].value,t);}createBucket(t){return new Fo(t)}isTileClipped(){return !0}},symbol:Bu,background:class extends di{constructor(t){super(t,Cu);}},raster:class extends di{constructor(t){super(t,Pu);}}};class Fu{constructor(t){this._callback=t,this._triggered=!1,"undefined"!=typeof MessageChannel&&(this._channel=new MessageChannel,this._channel.port2.onmessage=()=>{this._triggered=!1,this._callback();});}trigger(){this._triggered||(this._triggered=!0,this._channel?this._channel.port1.postMessage(!0):setTimeout((()=>{this._triggered=!1,this._callback();}),0));}remove(){delete this._channel,this._callback=()=>{};}}const Tu=6371008.8;class Lu{constructor(t,e){if(isNaN(t)||isNaN(e))throw new Error(`Invalid LngLat object: (${t}, ${e})`);if(this.lng=+t,this.lat=+e,this.lat>90||this.lat<-90)throw new Error("Invalid LngLat latitude value: must be between -90 and 90")}wrap(){return new Lu(a(this.lng,-180,180),this.lat)}toArray(){return [this.lng,this.lat]}toString(){return `LngLat(${this.lng}, ${this.lat})`}distanceTo(t){const e=Math.PI/180,r=this.lat*e,n=t.lat*e,i=Math.sin(r)*Math.sin(n)+Math.cos(r)*Math.cos(n)*Math.cos((t.lng-this.lng)*e);return Tu*Math.acos(Math.min(i,1))}toBounds(t=0){const e=360*t/40075017,r=e/Math.cos(Math.PI/180*this.lat);return new Du(new Lu(this.lng-r,this.lat-e),new Lu(this.lng+r,this.lat+e))}static convert(t){if(t instanceof Lu)return t;if(Array.isArray(t)&&(2===t.length||3===t.length))return new Lu(Number(t[0]),Number(t[1]));if(!Array.isArray(t)&&"object"==typeof t&&null!==t)return new Lu(Number("lng"in t?t.lng:t.lon),Number(t.lat));throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")}}class Du{constructor(t,e){t&&(e?this.setSouthWest(t).setNorthEast(e):4===t.length?this.setSouthWest([t[0],t[1]]).setNorthEast([t[2],t[3]]):this.setSouthWest(t[0]).setNorthEast(t[1]));}setNorthEast(t){return this._ne=t instanceof Lu?new Lu(t.lng,t.lat):Lu.convert(t),this}setSouthWest(t){return this._sw=t instanceof Lu?new Lu(t.lng,t.lat):Lu.convert(t),this}extend(t){const e=this._sw,r=this._ne;let n,i;if(t instanceof Lu)n=t,i=t;else {if(!(t instanceof Du))return Array.isArray(t)?4===t.length||t.every(Array.isArray)?this.extend(Du.convert(t)):this.extend(Lu.convert(t)):this;if(n=t._sw,i=t._ne,!n||!i)return this}return e||r?(e.lng=Math.min(n.lng,e.lng),e.lat=Math.min(n.lat,e.lat),r.lng=Math.max(i.lng,r.lng),r.lat=Math.max(i.lat,r.lat)):(this._sw=new Lu(n.lng,n.lat),this._ne=new Lu(i.lng,i.lat)),this}getCenter(){return new Lu((this._sw.lng+this._ne.lng)/2,(this._sw.lat+this._ne.lat)/2)}getSouthWest(){return this._sw}getNorthEast(){return this._ne}getNorthWest(){return new Lu(this.getWest(),this.getNorth())}getSouthEast(){return new Lu(this.getEast(),this.getSouth())}getWest(){return this._sw.lng}getSouth(){return this._sw.lat}getEast(){return this._ne.lng}getNorth(){return this._ne.lat}toArray(){return [this._sw.toArray(),this._ne.toArray()]}toString(){return `LngLatBounds(${this._sw.toString()}, ${this._ne.toString()})`}isEmpty(){return !(this._sw&&this._ne)}contains(t){const{lng:e,lat:r}=Lu.convert(t);let n=this._sw.lng<=e&&e<=this._ne.lng;return this._sw.lng>this._ne.lng&&(n=this._sw.lng>=e&&e>=this._ne.lng),this._sw.lat<=r&&r<=this._ne.lat&&n}static convert(t){return t instanceof Du?t:t?new Du(t):t}}const $u=2*Math.PI*Tu;function Ou(t){return $u*Math.cos(t*Math.PI/180)}function Ru(t){return (180+t)/360}function Uu(t){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t*Math.PI/360)))/360}function qu(t,e){return t/Ou(e)}function ju(t){return 360/Math.PI*Math.atan(Math.exp((180-360*t)*Math.PI/180))-90}class Nu{constructor(t,e,r=0){this.x=+t,this.y=+e,this.z=+r;}static fromLngLat(t,e=0){const r=Lu.convert(t);return new Nu(Ru(r.lng),Uu(r.lat),qu(e,r.lat))}toLngLat(){return new Lu(360*this.x-180,ju(this.y))}toAltitude(){return this.z*Ou(ju(this.y))}meterInMercatorCoordinateUnits(){return 1/$u*(t=ju(this.y),1/Math.cos(t*Math.PI/180));var t;}}function Ku(t,e,r){var n=2*Math.PI*6378137/256/Math.pow(2,r);return [t*n-2*Math.PI*6378137/2,e*n-2*Math.PI*6378137/2]}class Zu{constructor(t,e,r){this.z=t,this.x=e,this.y=r,this.key=Xu(0,t,t,e,r);}equals(t){return this.z===t.z&&this.x===t.x&&this.y===t.y}url(t,e){const r=(i=this.y,s=this.z,a=Ku(256*(n=this.x),256*(i=Math.pow(2,s)-i-1),s),o=Ku(256*(n+1),256*(i+1),s),a[0]+","+a[1]+","+o[0]+","+o[1]);var n,i,s,a,o;const l=function(t,e,r){let n,i="";for(let s=t;s>0;s--)n=1<<s-1,i+=(e&n?1:0)+(r&n?2:0);return i}(this.z,this.x,this.y);return t[(this.x+this.y)%t.length].replace(/{prefix}/g,(this.x%16).toString(16)+(this.y%16).toString(16)).replace(/{z}/g,String(this.z)).replace(/{x}/g,String(this.x)).replace(/{y}/g,String("tms"===e?Math.pow(2,this.z)-this.y-1:this.y)).replace(/{quadkey}/g,l).replace(/{bbox-epsg-3857}/g,r)}getTilePoint(t){const e=Math.pow(2,this.z);return new lr((t.x*e-this.x)*Ms,(t.y*e-this.y)*Ms)}toString(){return `${this.z}/${this.x}/${this.y}`}}class Gu{constructor(t,e){this.wrap=t,this.canonical=e,this.key=Xu(t,e.z,e.z,e.x,e.y);}}class Ju{constructor(t,e,r,n,i){this.overscaledZ=t,this.wrap=e,this.canonical=new Zu(r,+n,+i),this.key=Xu(e,t,r,n,i);}equals(t){return this.overscaledZ===t.overscaledZ&&this.wrap===t.wrap&&this.canonical.equals(t.canonical)}scaledTo(t){const e=this.canonical.z-t;return t>this.canonical.z?new Ju(t,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y):new Ju(t,this.wrap,t,this.canonical.x>>e,this.canonical.y>>e)}calculateScaledKey(t,e){const r=this.canonical.z-t;return t>this.canonical.z?Xu(this.wrap*+e,t,this.canonical.z,this.canonical.x,this.canonical.y):Xu(this.wrap*+e,t,t,this.canonical.x>>r,this.canonical.y>>r)}isChildOf(t){if(t.wrap!==this.wrap)return !1;const e=this.canonical.z-t.canonical.z;return 0===t.overscaledZ||t.overscaledZ<this.overscaledZ&&t.canonical.x===this.canonical.x>>e&&t.canonical.y===this.canonical.y>>e}children(t){if(this.overscaledZ>=t)return [new Ju(this.overscaledZ+1,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y)];const e=this.canonical.z+1,r=2*this.canonical.x,n=2*this.canonical.y;return [new Ju(e,this.wrap,e,r,n),new Ju(e,this.wrap,e,r+1,n),new Ju(e,this.wrap,e,r,n+1),new Ju(e,this.wrap,e,r+1,n+1)]}isLessThan(t){return this.wrap<t.wrap||!(this.wrap>t.wrap)&&(this.overscaledZ<t.overscaledZ||!(this.overscaledZ>t.overscaledZ)&&(this.canonical.x<t.canonical.x||!(this.canonical.x>t.canonical.x)&&this.canonical.y<t.canonical.y))}wrapped(){return new Ju(this.overscaledZ,0,this.canonical.z,this.canonical.x,this.canonical.y)}unwrapTo(t){return new Ju(this.overscaledZ,t,this.canonical.z,this.canonical.x,this.canonical.y)}overscaleFactor(){return Math.pow(2,this.overscaledZ-this.canonical.z)}toUnwrapped(){return new Gu(this.wrap,this.canonical)}toString(){return `${this.overscaledZ}/${this.canonical.x}/${this.canonical.y}`}getTilePoint(t){return this.canonical.getTilePoint(new Nu(t.x-this.wrap,t.y))}}function Xu(t,e,r,n,i){(t*=2)<0&&(t=-1*t-1);const s=1<<r;return (s*s*t+s*i+n).toString(36)+r.toString(36)+e.toString(36)}ir("CanonicalTileID",Zu),ir("OverscaledTileID",Ju,{omit:["posMatrix"]});class Yu{constructor(t,e,r){if(this.uid=t,e.height!==e.width)throw new RangeError("DEM tiles must be square");if(r&&"mapbox"!==r&&"terrarium"!==r)return void d(`"${r}" is not a valid encoding type. Valid types include "mapbox" and "terrarium".`);this.stride=e.height;const n=this.dim=e.height-2;this.data=new Uint32Array(e.data.buffer),this.encoding=r||"mapbox";for(let t=0;t<n;t++)this.data[this._idx(-1,t)]=this.data[this._idx(0,t)],this.data[this._idx(n,t)]=this.data[this._idx(n-1,t)],this.data[this._idx(t,-1)]=this.data[this._idx(t,0)],this.data[this._idx(t,n)]=this.data[this._idx(t,n-1)];this.data[this._idx(-1,-1)]=this.data[this._idx(0,0)],this.data[this._idx(n,-1)]=this.data[this._idx(n-1,0)],this.data[this._idx(-1,n)]=this.data[this._idx(0,n-1)],this.data[this._idx(n,n)]=this.data[this._idx(n-1,n-1)];}get(t,e){const r=new Uint8Array(this.data.buffer),n=4*this._idx(t,e);return ("terrarium"===this.encoding?this._unpackTerrarium:this._unpackMapbox)(r[n],r[n+1],r[n+2])}getUnpackVector(){return "terrarium"===this.encoding?[256,1,1/256,32768]:[6553.6,25.6,.1,1e4]}_idx(t,e){if(t<-1||t>=this.dim+1||e<-1||e>=this.dim+1)throw new RangeError("out of range source coordinates for DEM data");return (e+1)*this.stride+(t+1)}_unpackMapbox(t,e,r){return (256*t*256+256*e+r)/10-1e4}_unpackTerrarium(t,e,r){return 256*t+e+r/256-32768}getPixels(){return new ha({width:this.stride,height:this.stride},new Uint8Array(this.data.buffer))}backfillBorder(t,e,r){if(this.dim!==t.dim)throw new Error("dem dimension mismatch");let n=e*this.dim,i=e*this.dim+this.dim,s=r*this.dim,a=r*this.dim+this.dim;switch(e){case-1:n=i-1;break;case 1:i=n+1;}switch(r){case-1:s=a-1;break;case 1:a=s+1;}const o=-e*this.dim,l=-r*this.dim;for(let e=s;e<a;e++)for(let r=n;r<i;r++)this.data[this._idx(r,e)]=t.data[this._idx(r+o,e+l)];}}ir("DEMData",Yu);class Hu{constructor(t){this._stringToNumber={},this._numberToString=[];for(let e=0;e<t.length;e++){const r=t[e];this._stringToNumber[r]=e,this._numberToString[e]=r;}}encode(t){return this._stringToNumber[t]}decode(t){return this._numberToString[t]}}var Wu;class Qu{constructor(t,e,r,n,i){this.type="Feature",this._vectorTileFeature=t,t._z=e,t._x=r,t._y=n,this.properties=t.properties,this.id=i;}get geometry(){return void 0===this._geometry&&(this._geometry=this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x,this._vectorTileFeature._y,this._vectorTileFeature._z).geometry),this._geometry}set geometry(t){this._geometry=t;}toJSON(){const t=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(r[n[i]]=t[n[i]]);}return r}(this,["_geometry","_vectorTileFeature"]);return t.geometry=this.geometry,t}}class tc{constructor(t,e){this.tileID=t,this.x=t.canonical.x,this.y=t.canonical.y,this.z=t.canonical.z,this.grid=new S(Ms,16,0),this.grid3D=new S(Ms,16,0),this.featureIndexArray=new Hi,this.promoteId=e;}insert(t,e,r,n,i,s){const a=this.featureIndexArray.length;this.featureIndexArray.emplaceBack(r,n,i);const o=s?this.grid3D:this.grid;for(let t=0;t<e.length;t++){const r=e[t],n=[1/0,1/0,-1/0,-1/0];for(let t=0;t<r.length;t++){const e=r[t];n[0]=Math.min(n[0],e.x),n[1]=Math.min(n[1],e.y),n[2]=Math.max(n[2],e.x),n[3]=Math.max(n[3],e.y);}n[0]<Ms&&n[1]<Ms&&n[2]>=0&&n[3]>=0&&o.insert(a,n[0],n[1],n[2],n[3]);}}loadVTLayers(){return this.vtLayers||(this.vtLayers=new no.VectorTile(new Go(this.rawTileData)).layers,this.sourceLayerCoder=new Hu(this.vtLayers?Object.keys(this.vtLayers).sort():["_geojsonTileLayer"])),this.vtLayers}query(t,e,r,n){this.loadVTLayers();const i=t.params||{},s=Ms/t.tileSize/t.scale,a=tn(i.filter),o=t.queryGeometry,l=t.queryPadding*s,u=rc(o),c=this.grid.query(u.minX-l,u.minY-l,u.maxX+l,u.maxY+l),h=rc(t.cameraQueryGeometry),p=this.grid3D.query(h.minX-l,h.minY-l,h.maxX+l,h.maxY+l,((e,r,n,i)=>function(t,e,r,n,i){for(const s of t)if(e<=s.x&&r<=s.y&&n>=s.x&&i>=s.y)return !0;const s=[new lr(e,r),new lr(e,i),new lr(n,i),new lr(n,r)];if(t.length>2)for(const e of s)if(Ns(t,e))return !0;for(let e=0;e<t.length-1;e++)if(Ks(t[e],t[e+1],s))return !0;return !1}(t.cameraQueryGeometry,e-l,r-l,n+l,i+l)));for(const t of p)c.push(t);c.sort(nc);const f={};let d;for(let l=0;l<c.length;l++){const u=c[l];if(u===d)continue;d=u;const h=this.featureIndexArray.get(u);let p=null;this.loadMatchingFeature(f,h.bucketIndex,h.sourceLayerIndex,h.featureIndex,a,i.layers,i.availableImages,e,r,n,((e,r,n)=>(p||(p=Ps(e)),r.queryIntersectsFeature(o,e,n,p,this.z,t.transform,s,t.pixelPosMatrix))));}return f}loadMatchingFeature(t,e,r,n,i,s,a,l,u,c,h){const p=this.bucketLayerIDs[e];if(s&&!function(t,e){for(let r=0;r<t.length;r++)if(e.indexOf(t[r])>=0)return !0;return !1}(s,p))return;const f=this.sourceLayerCoder.decode(r),d=this.vtLayers[f].feature(n);if(i.needGeometry){const t=Vs(d,!0);if(!i.filter(new Wn(this.tileID.overscaledZ),t,this.tileID.canonical))return}else if(!i.filter(new Wn(this.tileID.overscaledZ),d))return;const y=this.getId(d,f);for(let e=0;e<p.length;e++){const r=p[e];if(s&&s.indexOf(r)<0)continue;const i=l[r];if(!i)continue;let f={};y&&c&&(f=c.getState(i.sourceLayer||"_geojsonTileLayer",y));const m=o({},u[r]);m.paint=ec(m.paint,i.paint,d,f,a),m.layout=ec(m.layout,i.layout,d,f,a);const g=!h||h(d,i,f);if(!g)continue;const x=new Qu(d,this.z,this.x,this.y,y);x.layer=m;let v=t[r];void 0===v&&(v=t[r]=[]),v.push({featureIndex:n,feature:x,intersectionZ:g});}}lookupSymbolFeatures(t,e,r,n,i,s,a,o){const l={};this.loadVTLayers();const u=tn(i);for(const i of t)this.loadMatchingFeature(l,r,n,i,u,s,a,o,e);return l}hasLayer(t){for(const e of this.bucketLayerIDs)for(const r of e)if(t===r)return !0;return !1}getId(t,e){let r=t.id;return this.promoteId&&(r=t.properties["string"==typeof this.promoteId?this.promoteId:this.promoteId[e]],"boolean"==typeof r&&(r=Number(r))),r}}function ec(t,e,r,n,i){return c(t,((t,s)=>{const a=e instanceof ai?e.get(s):null;return a&&a.evaluate?a.evaluate(r,n,i):a}))}function rc(t){let e=1/0,r=1/0,n=-1/0,i=-1/0;for(const s of t)e=Math.min(e,s.x),r=Math.min(r,s.y),n=Math.max(n,s.x),i=Math.max(i,s.y);return {minX:e,minY:r,maxX:n,maxY:i}}function nc(t,e){return e-t}ir("FeatureIndex",tc,{omit:["rawTileData","sourceLayerCoder"]}),function(t){t.create="create",t.load="load",t.fullLoad="fullLoad";}(Wu||(Wu={})),t.ARRAY_TYPE=Hs,t.Actor=class{constructor(t,e,r){this.target=t,this.parent=e,this.mapId=r,this.callbacks={},this.tasks={},this.taskQueue=[],this.cancelCallbacks={},u(["receive","process"],this),this.invoker=new Fu(this.process),this.target.addEventListener("message",this.receive,!1),this.globalScope=g()?t:window;}send(t,e,r,n,i=!1){const s=Math.round(1e18*Math.random()).toString(36).substring(0,10);r&&(this.callbacks[s]=r);const a=_(this.globalScope)?void 0:[];return this.target.postMessage({id:s,type:t,hasCallback:!!r,targetMapId:n,mustQueue:i,sourceMapId:this.mapId,data:ar(e,a)},a),{cancel:()=>{r&&delete this.callbacks[s],this.target.postMessage({id:s,type:"<cancel>",targetMapId:n,sourceMapId:this.mapId});}}}receive(t){const e=t.data,r=e.id;if(r&&(!e.targetMapId||this.mapId===e.targetMapId))if("<cancel>"===e.type){delete this.tasks[r];const t=this.cancelCallbacks[r];delete this.cancelCallbacks[r],t&&t();}else g()||e.mustQueue?(this.tasks[r]=e,this.taskQueue.push(r),this.invoker.trigger()):this.processTask(r,e);}process(){if(!this.taskQueue.length)return;const t=this.taskQueue.shift(),e=this.tasks[t];delete this.tasks[t],this.taskQueue.length&&this.invoker.trigger(),e&&this.processTask(t,e);}processTask(t,e){if("<response>"===e.type){const r=this.callbacks[t];delete this.callbacks[t],r&&(e.error?r(or(e.error)):r(null,or(e.data)));}else {let r=!1;const n=_(this.globalScope)?void 0:[],i=e.hasCallback?(e,i)=>{r=!0,delete this.cancelCallbacks[t],this.target.postMessage({id:t,type:"<response>",sourceMapId:this.mapId,error:e?ar(e):null,data:ar(i,n)},n);}:t=>{r=!0;};let s=null;const a=or(e.data);if(this.parent[e.type])s=this.parent[e.type](e.sourceMapId,a,i);else if(this.parent.getWorkerSource){const t=e.type.split(".");s=this.parent.getWorkerSource(e.sourceMapId,t[0],a.source)[t[1]](a,i);}else i(new Error(`Could not find function ${e.type}`));!r&&s&&s.cancel&&(this.cancelCallbacks[t]=s.cancel);}}remove(){this.invoker.remove(),this.target.removeEventListener("message",this.receive,!1);}},t.AlphaImage=ca,t.CanonicalTileID=Zu,t.CollisionBoxArray=ji,t.Color=E,t.DEMData=Yu,t.DataConstantProperty=oi,t.DictionaryCoder=Hu,t.EXTENT=Ms,t.ErrorEvent=Or,t.EvaluationParameters=Wn,t.Event=$r,t.Evented=Rr,t.Feature=Qu,t.FeatureIndex=tc,t.FillBucket=Wa,t.FillExtrusionBucket=wo,t.ImageAtlas=wl,t.ImagePosition=bl,t.LineBucket=Fo,t.LngLat=Lu,t.LngLatBounds=Du,t.MercatorCoordinate=Nu,t.ONE_EM=Zo,t.OverscaledTileID=Ju,t.Point=lr,t.Properties=pi,t.RGBAImage=ha,t.RequestPerformance=class{constructor(t){this._marks={start:[t.url,"start"].join("#"),end:[t.url,"end"].join("#"),measure:t.url.toString()},performance.mark(this._marks.start);}finish(){performance.mark(this._marks.end);let t=performance.getEntriesByName(this._marks.measure);return 0===t.length&&(performance.measure(this._marks.measure,this._marks.start,this._marks.end),t=performance.getEntriesByName(this._marks.measure),performance.clearMarks(this._marks.start),performance.clearMarks(this._marks.end),performance.clearMeasures(this._marks.measure)),t}},t.ResourceType=Sr,t.SegmentVector=ts,t.StructArrayLayout1ui2=Ri,t.StructArrayLayout2f1f2i16=Pi,t.StructArrayLayout2i4=bi,t.StructArrayLayout3ui6=Ei,t.StructArrayLayout4i8=wi,t.SymbolBucket=Su,t.Transitionable=ei,t.Uniform1f=ds,t.Uniform1i=class extends fs{constructor(t,e){super(t,e),this.current=0;}set(t){this.current!==t&&(this.current=t,this.gl.uniform1i(this.location,t));}},t.Uniform2f=class extends fs{constructor(t,e){super(t,e),this.current=[0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]||(this.current=t,this.gl.uniform2f(this.location,t[0],t[1]));}},t.Uniform3f=class extends fs{constructor(t,e){super(t,e),this.current=[0,0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]||(this.current=t,this.gl.uniform3f(this.location,t[0],t[1],t[2]));}},t.Uniform4f=ys,t.UniformColor=ms,t.UniformMatrix4f=class extends fs{constructor(t,e){super(t,e),this.current=gs;}set(t){if(t[12]!==this.current[12]||t[0]!==this.current[0])return this.current=t,void this.gl.uniformMatrix4fv(this.location,!1,t);for(let e=1;e<16;e++)if(t[e]!==this.current[e]){this.current=t,this.gl.uniformMatrix4fv(this.location,!1,t);break}}},t.UnwrappedTileID=Gu,t.ValidationError=qr,t.ZoomHistory=Cn,t.addDynamicAttributes=wu,t.asyncAll=function(t,e,r){if(!t.length)return r(null,[]);let n=t.length;const i=new Array(t.length);let s=null;t.forEach(((t,a)=>{e(t,((t,e)=>{t&&(s=t),i[a]=e,0==--n&&r(s,i);}));}));},t.bezier=n,t.bindAll=u,t.cacheEntryPossiblyAdded=function(t){mr++,mr>dr&&(t.getActor().send("enforceCacheSizeLimit",fr),mr=0);},t.clamp=s,t.clearTileCache=function(t){const e=caches.delete(cr);t&&e.catch(t).then((()=>t()));},t.clipLine=Wl,t.clone=function(t){var e=new Hs(16);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},t.clone$1=p,t.collisionCircleLayout=jo,t.config=ur,t.create=Ws,t.create$1=ea,t.createExpression=He,t.createFilter=tn,t.createLayout=xi,t.createStyleLayer=function(t){return "custom"===t.type?new Vu(t):new Eu[t.type](t)},t.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]},t.ease=i,t.emitValidationErrors=Bn,t.enforceCacheSizeLimit=function(t){yr(),hr&&hr.then((e=>{e.keys().then((r=>{for(let n=0;n<r.length-t;n++)e.delete(r[n]);}));}));},t.evaluateSizeForFeature=Ul,t.evaluateSizeForZoom=ql,t.evaluateVariableOffset=hu,t.evented=Jn,t.exported=k,t.exported$1=gr,t.extend=o,t.filterObject=h,t.fromValues=ra,t.getAnchorAlignment=Tl,t.getAnchorJustification=pu,t.getArrayBuffer=Cr,t.getImage=Tr,t.getJSON=function(t,e){return Br(o(t,{type:"json"}),e)},t.getRTLTextPluginStatus=Xn,t.getReferrer=Ir,t.getVideo=function(t,e){const r=window.document.createElement("video");r.muted=!0,r.onloadstart=function(){e(null,r);};for(let e=0;e<t.length;e++){const n=window.document.createElement("source");Pr(t[e])||(r.crossOrigin="Anonymous"),n.src=t[e],r.appendChild(n);}return {cancel:()=>{}}},t.invert=function(t,e){var r=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=e[9],p=e[10],f=e[11],d=e[12],y=e[13],m=e[14],g=e[15],x=r*o-n*a,v=r*l-i*a,b=r*u-s*a,w=n*l-i*o,_=n*u-s*o,A=i*u-s*l,k=c*y-h*d,S=c*m-p*d,z=c*g-f*d,I=h*m-p*y,M=h*g-f*y,B=p*g-f*m,C=x*B-v*M+b*I+w*z-_*S+A*k;return C?(t[0]=(o*B-l*M+u*I)*(C=1/C),t[1]=(i*M-n*B-s*I)*C,t[2]=(y*A-m*_+g*w)*C,t[3]=(p*_-h*A-f*w)*C,t[4]=(l*z-a*B-u*S)*C,t[5]=(r*B-i*z+s*S)*C,t[6]=(m*b-d*A-g*v)*C,t[7]=(c*A-p*b+f*v)*C,t[8]=(a*M-o*z+u*k)*C,t[9]=(n*z-r*M-s*k)*C,t[10]=(d*_-y*b+g*x)*C,t[11]=(h*b-c*_-f*x)*C,t[12]=(o*S-a*I-l*k)*C,t[13]=(r*I-n*S+i*k)*C,t[14]=(y*v-d*w-m*x)*C,t[15]=(c*w-h*v+p*x)*C,t):null},t.isImageBitmap=A,t.keysDifference=function(t,e){const r=[];for(const n in t)n in e||r.push(n);return r},t.lazyLoadRTLTextPlugin=function(){Hn.isLoading()||Hn.isLoaded()||"deferred"!==Xn()||Yn();},t.makeRequest=Br,t.mapObject=c,t.mercatorXfromLng=Ru,t.mercatorYfromLat=Uu,t.mercatorZfromAltitude=qu,t.mul=ta,t.multiply=Qs,t.nextPowerOfTwo=function(t){return t<=1?1:Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},t.number=Nt,t.offscreenCanvasSupported=kr,t.ortho=function(t,e,r,n,i,s,a){var o=1/(e-r),l=1/(n-i),u=1/(s-a);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*l,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(e+r)*o,t[13]=(i+n)*l,t[14]=(a+s)*u,t[15]=1,t},t.parseCacheControl=x,t.parseGlyphPBF=function(t){return new Go(t).readFields(ml,[])},t.pbf=Go,t.performSymbolLayout=function(e,r,n,i,s,a,o){e.createArrays(),e.tilePixelRatio=Ms/(512*e.overscaling),e.compareText={},e.iconsNeedLinear=!1;const l=e.layers[0].layout,u=e.layers[0]._unevaluatedLayout._values,c={};if("composite"===e.textSizeData.kind){const{minZoom:t,maxZoom:r}=e.textSizeData;c.compositeTextSizes=[u["text-size"].possiblyEvaluate(new Wn(t),o),u["text-size"].possiblyEvaluate(new Wn(r),o)];}if("composite"===e.iconSizeData.kind){const{minZoom:t,maxZoom:r}=e.iconSizeData;c.compositeIconSizes=[u["icon-size"].possiblyEvaluate(new Wn(t),o),u["icon-size"].possiblyEvaluate(new Wn(r),o)];}c.layoutTextSize=u["text-size"].possiblyEvaluate(new Wn(e.zoom+1),o),c.layoutIconSize=u["icon-size"].possiblyEvaluate(new Wn(e.zoom+1),o),c.textMaxSize=u["text-size"].possiblyEvaluate(new Wn(18));const h=l.get("text-line-height")*Zo,p="map"===l.get("text-rotation-alignment")&&"point"!==l.get("symbol-placement"),f=l.get("text-keep-upright"),y=l.get("text-size");for(const a of e.features){const u=l.get("text-font").evaluate(a,{},o).join(","),m=y.evaluate(a,{},o),g=c.layoutTextSize.evaluate(a,{},o),x=c.layoutIconSize.evaluate(a,{},o),v={horizontal:{},vertical:void 0},b=a.text;let w,_=[0,0];if(b){const i=b.toString(),c=l.get("text-letter-spacing").evaluate(a,{},o)*Zo,d=En(i)?c:0,y=l.get("text-anchor").evaluate(a,{},o),x=l.get("text-variable-anchor");if(!x){const t=l.get("text-radial-offset").evaluate(a,{},o);_=t?hu(y,[t*Zo,cu]):l.get("text-offset").evaluate(a,{},o).map((t=>t*Zo));}let w=p?"center":l.get("text-justify").evaluate(a,{},o);const A=l.get("symbol-placement"),k="point"===A?l.get("text-max-width").evaluate(a,{},o)*Zo:0,S=()=>{e.allowVerticalPlacement&&Vn(i)&&(v.vertical=zl(b,r,n,s,u,k,h,y,"left",d,_,t.WritingMode.vertical,!0,A,g,m));};if(!p&&x){const e="auto"===w?x.map((t=>pu(t))):[w];let i=!1;for(let a=0;a<e.length;a++){const o=e[a];if(!v.horizontal[o])if(i)v.horizontal[o]=v.horizontal[0];else {const e=zl(b,r,n,s,u,k,h,"center",o,d,_,t.WritingMode.horizontal,!1,A,g,m);e&&(v.horizontal[o]=e,i=1===e.positionedLines.length);}}S();}else {"auto"===w&&(w=pu(y));const e=zl(b,r,n,s,u,k,h,y,w,d,_,t.WritingMode.horizontal,!1,A,g,m);e&&(v.horizontal[w]=e),S(),Vn(i)&&p&&f&&(v.vertical=zl(b,r,n,s,u,k,h,y,w,d,_,t.WritingMode.vertical,!1,A,g,m));}}let A=!1;if(a.icon&&a.icon.name){const t=i[a.icon.name];t&&(w=Dl(s[a.icon.name],l.get("icon-offset").evaluate(a,{},o),l.get("icon-anchor").evaluate(a,{},o)),A=!!t.sdf,void 0===e.sdfIcons?e.sdfIcons=A:e.sdfIcons!==A&&d("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"),(t.pixelRatio!==e.pixelRatio||0!==l.get("icon-rotate").constantOr(1))&&(e.iconsNeedLinear=!0));}const k=mu(v.horizontal)||v.vertical;e.iconsInText=!!k&&k.iconsInText,(k||w)&&fu(e,a,v,w,i,c,g,x,_,A,o);}a&&e.generateCollisionDebugBuffers();},t.perspective=function(t,e,r,n,i){var s,a=1/Math.tan(e/2);return t[0]=a/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=i&&i!==1/0?(t[10]=(i+n)*(s=1/(n-i)),t[14]=2*i*n*s):(t[10]=-1,t[14]=-2*n),t},t.pick=function(t,e){const r={};for(let n=0;n<e.length;n++){const i=e[n];i in t&&(r[i]=t[i]);}return r},t.plugin=Hn,t.pointGeometry=io,t.polygonIntersectsPolygon=Ts,t.potpack=vl,t.refProperties=["type","source","source-layer","minzoom","maxzoom","filter","layout"],t.register=ir,t.registerForPluginStateChange=function(t){return t({pluginStatus:Nn,pluginURL:Kn}),Jn.on("pluginStateChange",t),t},t.renderColorRamp=pa,t.rotateX=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),s=e[4],a=e[5],o=e[6],l=e[7],u=e[8],c=e[9],h=e[10],p=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=s*i+u*n,t[5]=a*i+c*n,t[6]=o*i+h*n,t[7]=l*i+p*n,t[8]=u*i-s*n,t[9]=c*i-a*n,t[10]=h*i-o*n,t[11]=p*i-l*n,t},t.rotateZ=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),s=e[0],a=e[1],o=e[2],l=e[3],u=e[4],c=e[5],h=e[6],p=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=s*i+u*n,t[1]=a*i+c*n,t[2]=o*i+h*n,t[3]=l*i+p*n,t[4]=u*i-s*n,t[5]=c*i-a*n,t[6]=h*i-o*n,t[7]=p*i-l*n,t},t.scale=function(t,e,r){var n=r[0],i=r[1],s=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*s,t[9]=e[9]*s,t[10]=e[10]*s,t[11]=e[11]*s,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},t.scale$1=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t},t.setCacheLimits=function(t,e){fr=t,dr=e;},t.setRTLTextPlugin=function(t,e,r=!1){if(Nn===Rn||Nn===Un||Nn===qn)throw new Error("setRTLTextPlugin cannot be called multiple times.");Kn=k.resolveURL(t),Nn=Rn,jn=e,Gn(),r||Yn();},t.spec=Ur,t.sphericalToCartesian=function([t,e,r]){return e+=90,e*=Math.PI/180,r*=Math.PI/180,{x:t*Math.cos(e)*Math.sin(r),y:t*Math.sin(e)*Math.sin(r),z:t*Math.cos(r)}},t.symbolSize=jl,t.toEvaluationFeature=Vs,t.transformMat4=na,t.translate=function(t,e,r){var n,i,s,a,o,l,u,c,h,p,f,d,y=r[0],m=r[1],g=r[2];return e===t?(t[12]=e[0]*y+e[4]*m+e[8]*g+e[12],t[13]=e[1]*y+e[5]*m+e[9]*g+e[13],t[14]=e[2]*y+e[6]*m+e[10]*g+e[14],t[15]=e[3]*y+e[7]*m+e[11]*g+e[15]):(i=e[1],s=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],p=e[9],f=e[10],d=e[11],t[0]=n=e[0],t[1]=i,t[2]=s,t[3]=a,t[4]=o,t[5]=l,t[6]=u,t[7]=c,t[8]=h,t[9]=p,t[10]=f,t[11]=d,t[12]=n*y+o*m+h*g+e[12],t[13]=i*y+l*m+p*g+e[13],t[14]=s*y+u*m+f*g+e[14],t[15]=a*y+c*m+d*g+e[15]),t},t.triggerPluginCompletionEvent=Zn,t.unicodeBlockLookup=Pn,t.uniqueId=function(){return l++},t.validateCustomStyleLayer=function(t){const e=[],r=t.id;return void 0===r&&e.push({message:`layers.${r}: missing required property "id"`}),void 0===t.render&&e.push({message:`layers.${r}: missing required method "render"`}),t.renderingMode&&"2d"!==t.renderingMode&&"3d"!==t.renderingMode&&e.push({message:`layers.${r}: property "renderingMode" must be either "2d" or "3d"`}),e},t.validateLight=zn,t.validateStyle=Sn,t.vectorTile=no,t.warnOnce=d,t.wrap=a;}));

define(["./shared"],(function(e){function t(e){const o=typeof e;if("number"===o||"boolean"===o||"string"===o||null==e)return JSON.stringify(e);if(Array.isArray(e)){let o="[";for(const i of e)o+=`${t(i)},`;return `${o}]`}const i=Object.keys(e).sort();let r="{";for(let o=0;o<i.length;o++)r+=`${JSON.stringify(i[o])}:${t(e[i[o]])},`;return `${r}}`}function o(o){let i="";for(const r of e.refProperties)i+=`/${t(o[r])}`;return i}class i{constructor(e){this.keyCache={},e&&this.replace(e);}replace(e){this._layerConfigs={},this._layers={},this.update(e,[]);}update(t,i){for(const o of t){this._layerConfigs[o.id]=o;const t=this._layers[o.id]=e.createStyleLayer(o);t._featureFilter=e.createFilter(t.filter),this.keyCache[o.id]&&delete this.keyCache[o.id];}for(const e of i)delete this.keyCache[e],delete this._layerConfigs[e],delete this._layers[e];this.familiesBySource={};const r=function(e,t){const i={};for(let r=0;r<e.length;r++){const n=t&&t[e[r].id]||o(e[r]);t&&(t[e[r].id]=n);let s=i[n];s||(s=i[n]=[]),s.push(e[r]);}const r=[];for(const e in i)r.push(i[e]);return r}(Object.values(this._layerConfigs),this.keyCache);for(const e of r){const t=e.map((e=>this._layers[e.id])),o=t[0];if("none"===o.visibility)continue;const i=o.source||"";let r=this.familiesBySource[i];r||(r=this.familiesBySource[i]={});const n=o.sourceLayer||"_geojsonTileLayer";let s=r[n];s||(s=r[n]=[]),s.push(t);}}}class r{constructor(t){const o={},i=[];for(const e in t){const r=t[e],n=o[e]={};for(const e in r){const t=r[+e];if(!t||0===t.bitmap.width||0===t.bitmap.height)continue;const o={x:0,y:0,w:t.bitmap.width+2,h:t.bitmap.height+2};i.push(o),n[e]={rect:o,metrics:t.metrics};}}const{w:r,h:n}=e.potpack(i),s=new e.AlphaImage({width:r||1,height:n||1});for(const i in t){const r=t[i];for(const t in r){const n=r[+t];if(!n||0===n.bitmap.width||0===n.bitmap.height)continue;const a=o[i][t].rect;e.AlphaImage.copy(n.bitmap,s,{x:0,y:0},{x:a.x+1,y:a.y+1},n.bitmap);}}this.image=s,this.positions=o;}}e.register("GlyphAtlas",r);class n{constructor(t){this.tileID=new e.OverscaledTileID(t.tileID.overscaledZ,t.tileID.wrap,t.tileID.canonical.z,t.tileID.canonical.x,t.tileID.canonical.y),this.uid=t.uid,this.zoom=t.zoom,this.pixelRatio=t.pixelRatio,this.tileSize=t.tileSize,this.source=t.source,this.overscaling=this.tileID.overscaleFactor(),this.showCollisionBoxes=t.showCollisionBoxes,this.collectResourceTiming=!!t.collectResourceTiming,this.returnDependencies=!!t.returnDependencies,this.promoteId=t.promoteId;}parse(t,o,i,n,a){this.status="parsing",this.data=t,this.collisionBoxArray=new e.CollisionBoxArray;const l=new e.DictionaryCoder(Object.keys(t.layers).sort()),c=new e.FeatureIndex(this.tileID,this.promoteId);c.bucketLayerIDs=[];const u={},h={featureIndex:c,iconDependencies:{},patternDependencies:{},glyphDependencies:{},availableImages:i},p=o.familiesBySource[this.source];for(const o in p){const r=t.layers[o];if(!r)continue;1===r.version&&e.warnOnce(`Vector tile source "${this.source}" layer "${o}" does not use vector tile spec v2 and therefore may have some rendering errors.`);const n=l.encode(o),a=[];for(let e=0;e<r.length;e++){const t=r.feature(e),i=c.getId(t,o);a.push({feature:t,id:i,index:e,sourceLayerIndex:n});}for(const e of p[o]){const t=e[0];t.minzoom&&this.zoom<Math.floor(t.minzoom)||t.maxzoom&&this.zoom>=t.maxzoom||"none"!==t.visibility&&(s(e,this.zoom,i),(u[t.id]=t.createBucket({index:c.bucketLayerIDs.length,layers:e,zoom:this.zoom,pixelRatio:this.pixelRatio,overscaling:this.overscaling,collisionBoxArray:this.collisionBoxArray,sourceLayerIndex:n,sourceID:this.source})).populate(a,h,this.tileID.canonical),c.bucketLayerIDs.push(e.map((e=>e.id))));}}let f,d,g,m;const y=e.mapObject(h.glyphDependencies,(e=>Object.keys(e).map(Number)));Object.keys(y).length?n.send("getGlyphs",{uid:this.uid,stacks:y},((e,t)=>{f||(f=e,d=t,w.call(this));})):d={};const v=Object.keys(h.iconDependencies);v.length?n.send("getImages",{icons:v,source:this.source,tileID:this.tileID,type:"icons"},((e,t)=>{f||(f=e,g=t,w.call(this));})):g={};const x=Object.keys(h.patternDependencies);function w(){if(f)return a(f);if(d&&g&&m){const t=new r(d),o=new e.ImageAtlas(g,m);for(const r in u){const n=u[r];n instanceof e.SymbolBucket?(s(n.layers,this.zoom,i),e.performSymbolLayout(n,d,t.positions,g,o.iconPositions,this.showCollisionBoxes,this.tileID.canonical)):n.hasPattern&&(n instanceof e.LineBucket||n instanceof e.FillBucket||n instanceof e.FillExtrusionBucket)&&(s(n.layers,this.zoom,i),n.addFeatures(h,this.tileID.canonical,o.patternPositions));}this.status="done",a(null,{buckets:Object.values(u).filter((e=>!e.isEmpty())),featureIndex:c,collisionBoxArray:this.collisionBoxArray,glyphAtlasImage:t.image,imageAtlas:o,glyphMap:this.returnDependencies?d:null,iconMap:this.returnDependencies?g:null,glyphPositions:this.returnDependencies?t.positions:null});}}x.length?n.send("getImages",{icons:x,source:this.source,tileID:this.tileID,type:"patterns"},((e,t)=>{f||(f=e,m=t,w.call(this));})):m={},w.call(this);}}function s(t,o,i){const r=new e.EvaluationParameters(o);for(const e of t)e.recalculate(r,i);}function a(t,o){const i=e.getArrayBuffer(t.request,((t,i,r,n)=>{t?o(t):i&&o(null,{vectorTile:new e.vectorTile.VectorTile(new e.pbf(i)),rawData:i,cacheControl:r,expires:n});}));return ()=>{i.cancel(),o();}}class l{constructor(e,t,o,i){this.actor=e,this.layerIndex=t,this.availableImages=o,this.loadVectorData=i||a,this.loading={},this.loaded={};}loadTile(t,o){const i=t.uid;this.loading||(this.loading={});const r=!!(t&&t.request&&t.request.collectResourceTiming)&&new e.RequestPerformance(t.request),s=this.loading[i]=new n(t);s.abort=this.loadVectorData(t,((t,n)=>{if(delete this.loading[i],t||!n)return s.status="done",this.loaded[i]=s,o(t);const a=n.rawData,l={};n.expires&&(l.expires=n.expires),n.cacheControl&&(l.cacheControl=n.cacheControl);const c={};if(r){const e=r.finish();e&&(c.resourceTiming=JSON.parse(JSON.stringify(e)));}s.vectorTile=n.vectorTile,s.parse(n.vectorTile,this.layerIndex,this.availableImages,this.actor,((t,i)=>{if(t||!i)return o(t);o(null,e.extend({rawTileData:a.slice(0)},i,l,c));})),this.loaded=this.loaded||{},this.loaded[i]=s;}));}reloadTile(e,t){const o=this.loaded,i=e.uid,r=this;if(o&&o[i]){const n=o[i];n.showCollisionBoxes=e.showCollisionBoxes;const s=(e,o)=>{const i=n.reloadCallback;i&&(delete n.reloadCallback,n.parse(n.vectorTile,r.layerIndex,this.availableImages,r.actor,i)),t(e,o);};"parsing"===n.status?n.reloadCallback=s:"done"===n.status&&(n.vectorTile?n.parse(n.vectorTile,this.layerIndex,this.availableImages,this.actor,s):s());}}abortTile(e,t){const o=this.loading,i=e.uid;o&&o[i]&&o[i].abort&&(o[i].abort(),delete o[i]),t();}removeTile(e,t){const o=this.loaded,i=e.uid;o&&o[i]&&delete o[i],t();}}class c{constructor(){this.loaded={};}loadTile(t,o){const{uid:i,encoding:r,rawImageData:n}=t,s=e.isImageBitmap(n)?this.getImageData(n):n,a=new e.DEMData(i,s,r);this.loaded=this.loaded||{},this.loaded[i]=a,o(null,a);}getImageData(t){this.offscreenCanvas&&this.offscreenCanvasContext||(this.offscreenCanvas=new OffscreenCanvas(t.width,t.height),this.offscreenCanvasContext=this.offscreenCanvas.getContext("2d")),this.offscreenCanvas.width=t.width,this.offscreenCanvas.height=t.height,this.offscreenCanvasContext.drawImage(t,0,0,t.width,t.height);const o=this.offscreenCanvasContext.getImageData(-1,-1,t.width+2,t.height+2);return this.offscreenCanvasContext.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),new e.RGBAImage({width:o.width,height:o.height},o.data)}removeTile(e){const t=this.loaded,o=e.uid;t&&t[o]&&delete t[o];}}var u=function e(t,o){var i,r=t&&t.type;if("FeatureCollection"===r)for(i=0;i<t.features.length;i++)e(t.features[i],o);else if("GeometryCollection"===r)for(i=0;i<t.geometries.length;i++)e(t.geometries[i],o);else if("Feature"===r)e(t.geometry,o);else if("Polygon"===r)h(t.coordinates,o);else if("MultiPolygon"===r)for(i=0;i<t.coordinates.length;i++)h(t.coordinates[i],o);return t};function h(e,t){if(0!==e.length){p(e[0],t);for(var o=1;o<e.length;o++)p(e[o],!t);}}function p(e,t){for(var o=0,i=0,r=0,n=e.length,s=n-1;r<n;s=r++){var a=(e[r][0]-e[s][0])*(e[s][1]+e[r][1]),l=o+a;i+=Math.abs(o)>=Math.abs(a)?o-l+a:a-l+o,o=l;}o+i>=0!=!!t&&e.reverse();}const f=e.vectorTile.VectorTileFeature.prototype.toGeoJSON;class d{constructor(t){this._feature=t,this.extent=e.EXTENT,this.type=t.type,this.properties=t.tags,"id"in t&&!isNaN(t.id)&&(this.id=parseInt(t.id,10));}loadGeometry(){if(1===this._feature.type){const t=[];for(const o of this._feature.geometry)t.push([new e.Point(o[0],o[1])]);return t}{const t=[];for(const o of this._feature.geometry){const i=[];for(const t of o)i.push(new e.Point(t[0],t[1]));t.push(i);}return t}}toGeoJSON(e,t,o){return f.call(this,e,t,o)}}class g{constructor(t){this.layers={_geojsonTileLayer:this},this.name="_geojsonTileLayer",this.extent=e.EXTENT,this.length=t.length,this._features=t;}feature(e){return new d(this._features[e])}}var m={exports:{}},y=e.pointGeometry,v=e.vectorTile.VectorTileFeature,x=w;function w(e,t){this.options=t||{},this.features=e,this.length=e.length;}function S(e,t){this.id="number"==typeof e.id?e.id:void 0,this.type=e.type,this.rawGeometry=1===e.type?[e.geometry]:e.geometry,this.properties=e.tags,this.extent=t||4096;}w.prototype.feature=function(e){return new S(this.features[e],this.options.extent)},S.prototype.loadGeometry=function(){var e=this.rawGeometry;this.geometry=[];for(var t=0;t<e.length;t++){for(var o=e[t],i=[],r=0;r<o.length;r++)i.push(new y(o[r][0],o[r][1]));this.geometry.push(i);}return this.geometry},S.prototype.bbox=function(){this.geometry||this.loadGeometry();for(var e=this.geometry,t=1/0,o=-1/0,i=1/0,r=-1/0,n=0;n<e.length;n++)for(var s=e[n],a=0;a<s.length;a++){var l=s[a];t=Math.min(t,l.x),o=Math.max(o,l.x),i=Math.min(i,l.y),r=Math.max(r,l.y);}return [t,i,o,r]},S.prototype.toGeoJSON=v.prototype.toGeoJSON;var I=e.pbf,M=x;function b(e){var t=new I;return function(e,t){for(var o in e.layers)t.writeMessage(3,k,e.layers[o]);}(e,t),t.finish()}function k(e,t){var o;t.writeVarintField(15,e.version||1),t.writeStringField(1,e.name||""),t.writeVarintField(5,e.extent||4096);var i={keys:[],values:[],keycache:{},valuecache:{}};for(o=0;o<e.length;o++)i.feature=e.feature(o),t.writeMessage(2,P,i);var r=i.keys;for(o=0;o<r.length;o++)t.writeStringField(3,r[o]);var n=i.values;for(o=0;o<n.length;o++)t.writeMessage(4,L,n[o]);}function P(e,t){var o=e.feature;void 0!==o.id&&t.writeVarintField(1,o.id),t.writeMessage(2,_,e),t.writeVarintField(3,o.type),t.writeMessage(4,D,o);}function _(e,t){var o=e.feature,i=e.keys,r=e.values,n=e.keycache,s=e.valuecache;for(var a in o.properties){var l=o.properties[a],c=n[a];if(null!==l){void 0===c&&(i.push(a),n[a]=c=i.length-1),t.writeVarint(c);var u=typeof l;"string"!==u&&"boolean"!==u&&"number"!==u&&(l=JSON.stringify(l));var h=u+":"+l,p=s[h];void 0===p&&(r.push(l),s[h]=p=r.length-1),t.writeVarint(p);}}}function T(e,t){return (t<<3)+(7&e)}function C(e){return e<<1^e>>31}function D(e,t){for(var o=e.loadGeometry(),i=e.type,r=0,n=0,s=o.length,a=0;a<s;a++){var l=o[a],c=1;1===i&&(c=l.length),t.writeVarint(T(1,c));for(var u=3===i?l.length-1:l.length,h=0;h<u;h++){1===h&&1!==i&&t.writeVarint(T(2,u-1));var p=l[h].x-r,f=l[h].y-n;t.writeVarint(C(p)),t.writeVarint(C(f)),r+=p,n+=f;}3===i&&t.writeVarint(T(7,1));}}function L(e,t){var o=typeof e;"string"===o?t.writeStringField(1,e):"boolean"===o?t.writeBooleanField(7,e):"number"===o&&(e%1!=0?t.writeDoubleField(3,e):e<0?t.writeSVarintField(6,e):t.writeVarintField(5,e));}m.exports=b,m.exports.fromVectorTileJs=b,m.exports.fromGeojsonVt=function(e,t){t=t||{};var o={};for(var i in e)o[i]=new M(e[i].features,t),o[i].name=i,o[i].version=t.version,o[i].extent=t.extent;return b({layers:o})},m.exports.GeoJSONWrapper=M;var z=m.exports;function O(e,t,o,i,r,n){if(r-i<=o)return;const s=i+r>>1;E(e,t,s,i,r,n%2),O(e,t,o,i,s-1,n+1),O(e,t,o,s+1,r,n+1);}function E(e,t,o,i,r,n){for(;r>i;){if(r-i>600){const s=r-i+1,a=o-i+1,l=Math.log(s),c=.5*Math.exp(2*l/3),u=.5*Math.sqrt(l*c*(s-c)/s)*(a-s/2<0?-1:1);E(e,t,o,Math.max(i,Math.floor(o-a*c/s+u)),Math.min(r,Math.floor(o+(s-a)*c/s+u)),n);}const s=t[2*o+n];let a=i,l=r;for(F(e,t,i,o),t[2*r+n]>s&&F(e,t,i,r);a<l;){for(F(e,t,a,l),a++,l--;t[2*a+n]<s;)a++;for(;t[2*l+n]>s;)l--;}t[2*i+n]===s?F(e,t,i,l):(l++,F(e,t,l,r)),l<=o&&(i=l+1),o<=l&&(r=l-1);}}function F(e,t,o,i){N(e,o,i),N(t,2*o,2*i),N(t,2*o+1,2*i+1);}function N(e,t,o){const i=e[t];e[t]=e[o],e[o]=i;}function A(e,t,o,i){const r=e-o,n=t-i;return r*r+n*n}const J=e=>e[0],Z=e=>e[1];class B{constructor(e,t=J,o=Z,i=64,r=Float64Array){this.nodeSize=i,this.points=e;const n=e.length<65536?Uint16Array:Uint32Array,s=this.ids=new n(e.length),a=this.coords=new r(2*e.length);for(let i=0;i<e.length;i++)s[i]=i,a[2*i]=t(e[i]),a[2*i+1]=o(e[i]);O(s,a,i,0,s.length-1,0);}range(e,t,o,i){return function(e,t,o,i,r,n,s){const a=[0,e.length-1,0],l=[];let c,u;for(;a.length;){const h=a.pop(),p=a.pop(),f=a.pop();if(p-f<=s){for(let s=f;s<=p;s++)c=t[2*s],u=t[2*s+1],c>=o&&c<=r&&u>=i&&u<=n&&l.push(e[s]);continue}const d=Math.floor((f+p)/2);c=t[2*d],u=t[2*d+1],c>=o&&c<=r&&u>=i&&u<=n&&l.push(e[d]);const g=(h+1)%2;(0===h?o<=c:i<=u)&&(a.push(f),a.push(d-1),a.push(g)),(0===h?r>=c:n>=u)&&(a.push(d+1),a.push(p),a.push(g));}return l}(this.ids,this.coords,e,t,o,i,this.nodeSize)}within(e,t,o){return function(e,t,o,i,r,n){const s=[0,e.length-1,0],a=[],l=r*r;for(;s.length;){const c=s.pop(),u=s.pop(),h=s.pop();if(u-h<=n){for(let r=h;r<=u;r++)A(t[2*r],t[2*r+1],o,i)<=l&&a.push(e[r]);continue}const p=Math.floor((h+u)/2),f=t[2*p],d=t[2*p+1];A(f,d,o,i)<=l&&a.push(e[p]);const g=(c+1)%2;(0===c?o-r<=f:i-r<=d)&&(s.push(h),s.push(p-1),s.push(g)),(0===c?o+r>=f:i+r>=d)&&(s.push(p+1),s.push(u),s.push(g));}return a}(this.ids,this.coords,e,t,o,this.nodeSize)}}const G={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:e=>e},j=Math.fround||(Y=new Float32Array(1),e=>(Y[0]=+e,Y[0]));var Y;class V{constructor(e){this.options=K(Object.create(G),e),this.trees=new Array(this.options.maxZoom+1);}load(e){const{log:t,minZoom:o,maxZoom:i,nodeSize:r}=this.options;t&&console.time("total time");const n=`prepare ${e.length} points`;t&&console.time(n),this.points=e;let s=[];for(let t=0;t<e.length;t++)e[t].geometry&&s.push(W(e[t],t));this.trees[i+1]=new B(s,Q,ee,r,Float32Array),t&&console.timeEnd(n);for(let e=i;e>=o;e--){const o=+Date.now();s=this._cluster(s,e),this.trees[e]=new B(s,Q,ee,r,Float32Array),t&&console.log("z%d: %d clusters in %dms",e,s.length,+Date.now()-o);}return t&&console.timeEnd("total time"),this}getClusters(e,t){let o=((e[0]+180)%360+360)%360-180;const i=Math.max(-90,Math.min(90,e[1]));let r=180===e[2]?180:((e[2]+180)%360+360)%360-180;const n=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)o=-180,r=180;else if(o>r){const e=this.getClusters([o,i,180,n],t),s=this.getClusters([-180,i,r,n],t);return e.concat(s)}const s=this.trees[this._limitZoom(t)],a=s.range(q(o),U(n),q(r),U(i)),l=[];for(const e of a){const t=s.points[e];l.push(t.numPoints?R(t):this.points[t.index]);}return l}getChildren(e){const t=this._getOriginId(e),o=this._getOriginZoom(e),i="No cluster with the specified id.",r=this.trees[o];if(!r)throw new Error(i);const n=r.points[t];if(!n)throw new Error(i);const s=this.options.radius/(this.options.extent*Math.pow(2,o-1)),a=r.within(n.x,n.y,s),l=[];for(const t of a){const o=r.points[t];o.parentId===e&&l.push(o.numPoints?R(o):this.points[o.index]);}if(0===l.length)throw new Error(i);return l}getLeaves(e,t,o){const i=[];return this._appendLeaves(i,e,t=t||10,o=o||0,0),i}getTile(e,t,o){const i=this.trees[this._limitZoom(e)],r=Math.pow(2,e),{extent:n,radius:s}=this.options,a=s/n,l=(o-a)/r,c=(o+1+a)/r,u={features:[]};return this._addTileFeatures(i.range((t-a)/r,l,(t+1+a)/r,c),i.points,t,o,r,u),0===t&&this._addTileFeatures(i.range(1-a/r,l,1,c),i.points,r,o,r,u),t===r-1&&this._addTileFeatures(i.range(0,l,a/r,c),i.points,-1,o,r,u),u.features.length?u:null}getClusterExpansionZoom(e){let t=this._getOriginZoom(e)-1;for(;t<=this.options.maxZoom;){const o=this.getChildren(e);if(t++,1!==o.length)break;e=o[0].properties.cluster_id;}return t}_appendLeaves(e,t,o,i,r){const n=this.getChildren(t);for(const t of n){const n=t.properties;if(n&&n.cluster?r+n.point_count<=i?r+=n.point_count:r=this._appendLeaves(e,n.cluster_id,o,i,r):r<i?r++:e.push(t),e.length===o)break}return r}_addTileFeatures(e,t,o,i,r,n){for(const s of e){const e=t[s],a=e.numPoints;let l,c,u;if(a)l=$(e),c=e.x,u=e.y;else {const t=this.points[e.index];l=t.properties,c=q(t.geometry.coordinates[0]),u=U(t.geometry.coordinates[1]);}const h={type:1,geometry:[[Math.round(this.options.extent*(c*r-o)),Math.round(this.options.extent*(u*r-i))]],tags:l};let p;a?p=e.id:this.options.generateId?p=e.index:this.points[e.index].id&&(p=this.points[e.index].id),void 0!==p&&(h.id=p),n.features.push(h);}}_limitZoom(e){return Math.max(this.options.minZoom,Math.min(+e,this.options.maxZoom+1))}_cluster(e,t){const o=[],{radius:i,extent:r,reduce:n,minPoints:s}=this.options,a=i/(r*Math.pow(2,t));for(let i=0;i<e.length;i++){const r=e[i];if(r.zoom<=t)continue;r.zoom=t;const l=this.trees[t+1],c=l.within(r.x,r.y,a),u=r.numPoints||1;let h=u;for(const e of c){const o=l.points[e];o.zoom>t&&(h+=o.numPoints||1);}if(h>=s){let e=r.x*u,s=r.y*u,a=n&&u>1?this._map(r,!0):null;const p=(i<<5)+(t+1)+this.points.length;for(const o of c){const i=l.points[o];if(i.zoom<=t)continue;i.zoom=t;const c=i.numPoints||1;e+=i.x*c,s+=i.y*c,i.parentId=p,n&&(a||(a=this._map(r,!0)),n(a,this._map(i)));}r.parentId=p,o.push(X(e/h,s/h,p,h,a));}else if(o.push(r),h>1)for(const e of c){const i=l.points[e];i.zoom<=t||(i.zoom=t,o.push(i));}}return o}_getOriginId(e){return e-this.points.length>>5}_getOriginZoom(e){return (e-this.points.length)%32}_map(e,t){if(e.numPoints)return t?K({},e.properties):e.properties;const o=this.points[e.index].properties,i=this.options.map(o);return t&&i===o?K({},i):i}}function X(e,t,o,i,r){return {x:j(e),y:j(t),zoom:1/0,id:o,parentId:-1,numPoints:i,properties:r}}function W(e,t){const[o,i]=e.geometry.coordinates;return {x:j(q(o)),y:j(U(i)),zoom:1/0,index:t,parentId:-1}}function R(e){return {type:"Feature",id:e.id,properties:$(e),geometry:{type:"Point",coordinates:[(t=e.x,360*(t-.5)),H(e.y)]}};var t;}function $(e){const t=e.numPoints,o=t>=1e4?`${Math.round(t/1e3)}k`:t>=1e3?Math.round(t/100)/10+"k":t;return K(K({},e.properties),{cluster:!0,cluster_id:e.id,point_count:t,point_count_abbreviated:o})}function q(e){return e/360+.5}function U(e){const t=Math.sin(e*Math.PI/180),o=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return o<0?0:o>1?1:o}function H(e){const t=(180-360*e)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}function K(e,t){for(const o in t)e[o]=t[o];return e}function Q(e){return e.x}function ee(e){return e.y}function te(e,t,o,i){for(var r,n=i,s=o-t>>1,a=o-t,l=e[t],c=e[t+1],u=e[o],h=e[o+1],p=t+3;p<o;p+=3){var f=oe(e[p],e[p+1],l,c,u,h);if(f>n)r=p,n=f;else if(f===n){var d=Math.abs(p-s);d<a&&(r=p,a=d);}}n>i&&(r-t>3&&te(e,t,r,i),e[r+2]=n,o-r>3&&te(e,r,o,i));}function oe(e,t,o,i,r,n){var s=r-o,a=n-i;if(0!==s||0!==a){var l=((e-o)*s+(t-i)*a)/(s*s+a*a);l>1?(o=r,i=n):l>0&&(o+=s*l,i+=a*l);}return (s=e-o)*s+(a=t-i)*a}function ie(e,t,o,i){var r={id:void 0===e?null:e,type:t,geometry:o,tags:i,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return function(e){var t=e.geometry,o=e.type;if("Point"===o||"MultiPoint"===o||"LineString"===o)re(e,t);else if("Polygon"===o||"MultiLineString"===o)for(var i=0;i<t.length;i++)re(e,t[i]);else if("MultiPolygon"===o)for(i=0;i<t.length;i++)for(var r=0;r<t[i].length;r++)re(e,t[i][r]);}(r),r}function re(e,t){for(var o=0;o<t.length;o+=3)e.minX=Math.min(e.minX,t[o]),e.minY=Math.min(e.minY,t[o+1]),e.maxX=Math.max(e.maxX,t[o]),e.maxY=Math.max(e.maxY,t[o+1]);}function ne(e,t,o,i){if(t.geometry){var r=t.geometry.coordinates,n=t.geometry.type,s=Math.pow(o.tolerance/((1<<o.maxZoom)*o.extent),2),a=[],l=t.id;if(o.promoteId?l=t.properties[o.promoteId]:o.generateId&&(l=i||0),"Point"===n)se(r,a);else if("MultiPoint"===n)for(var c=0;c<r.length;c++)se(r[c],a);else if("LineString"===n)ae(r,a,s,!1);else if("MultiLineString"===n){if(o.lineMetrics){for(c=0;c<r.length;c++)ae(r[c],a=[],s,!1),e.push(ie(l,"LineString",a,t.properties));return}le(r,a,s,!1);}else if("Polygon"===n)le(r,a,s,!0);else {if("MultiPolygon"!==n){if("GeometryCollection"===n){for(c=0;c<t.geometry.geometries.length;c++)ne(e,{id:l,geometry:t.geometry.geometries[c],properties:t.properties},o,i);return}throw new Error("Input data is not a valid GeoJSON object.")}for(c=0;c<r.length;c++){var u=[];le(r[c],u,s,!0),a.push(u);}}e.push(ie(l,n,a,t.properties));}}function se(e,t){t.push(ce(e[0])),t.push(ue(e[1])),t.push(0);}function ae(e,t,o,i){for(var r,n,s=0,a=0;a<e.length;a++){var l=ce(e[a][0]),c=ue(e[a][1]);t.push(l),t.push(c),t.push(0),a>0&&(s+=i?(r*c-l*n)/2:Math.sqrt(Math.pow(l-r,2)+Math.pow(c-n,2))),r=l,n=c;}var u=t.length-3;t[2]=1,te(t,0,u,o),t[u+2]=1,t.size=Math.abs(s),t.start=0,t.end=t.size;}function le(e,t,o,i){for(var r=0;r<e.length;r++){var n=[];ae(e[r],n,o,i),t.push(n);}}function ce(e){return e/360+.5}function ue(e){var t=Math.sin(e*Math.PI/180),o=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return o<0?0:o>1?1:o}function he(e,t,o,i,r,n,s,a){if(i/=t,n>=(o/=t)&&s<i)return e;if(s<o||n>=i)return null;for(var l=[],c=0;c<e.length;c++){var u=e[c],h=u.geometry,p=u.type,f=0===r?u.minX:u.minY,d=0===r?u.maxX:u.maxY;if(f>=o&&d<i)l.push(u);else if(!(d<o||f>=i)){var g=[];if("Point"===p||"MultiPoint"===p)pe(h,g,o,i,r);else if("LineString"===p)fe(h,g,o,i,r,!1,a.lineMetrics);else if("MultiLineString"===p)ge(h,g,o,i,r,!1);else if("Polygon"===p)ge(h,g,o,i,r,!0);else if("MultiPolygon"===p)for(var m=0;m<h.length;m++){var y=[];ge(h[m],y,o,i,r,!0),y.length&&g.push(y);}if(g.length){if(a.lineMetrics&&"LineString"===p){for(m=0;m<g.length;m++)l.push(ie(u.id,p,g[m],u.tags));continue}"LineString"!==p&&"MultiLineString"!==p||(1===g.length?(p="LineString",g=g[0]):p="MultiLineString"),"Point"!==p&&"MultiPoint"!==p||(p=3===g.length?"Point":"MultiPoint"),l.push(ie(u.id,p,g,u.tags));}}}return l.length?l:null}function pe(e,t,o,i,r){for(var n=0;n<e.length;n+=3){var s=e[n+r];s>=o&&s<=i&&(t.push(e[n]),t.push(e[n+1]),t.push(e[n+2]));}}function fe(e,t,o,i,r,n,s){for(var a,l,c=de(e),u=0===r?ye:ve,h=e.start,p=0;p<e.length-3;p+=3){var f=e[p],d=e[p+1],g=e[p+2],m=e[p+3],y=e[p+4],v=0===r?f:d,x=0===r?m:y,w=!1;s&&(a=Math.sqrt(Math.pow(f-m,2)+Math.pow(d-y,2))),v<o?x>o&&(l=u(c,f,d,m,y,o),s&&(c.start=h+a*l)):v>i?x<i&&(l=u(c,f,d,m,y,i),s&&(c.start=h+a*l)):me(c,f,d,g),x<o&&v>=o&&(l=u(c,f,d,m,y,o),w=!0),x>i&&v<=i&&(l=u(c,f,d,m,y,i),w=!0),!n&&w&&(s&&(c.end=h+a*l),t.push(c),c=de(e)),s&&(h+=a);}var S=e.length-3;f=e[S],d=e[S+1],g=e[S+2],(v=0===r?f:d)>=o&&v<=i&&me(c,f,d,g),S=c.length-3,n&&S>=3&&(c[S]!==c[0]||c[S+1]!==c[1])&&me(c,c[0],c[1],c[2]),c.length&&t.push(c);}function de(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function ge(e,t,o,i,r,n){for(var s=0;s<e.length;s++)fe(e[s],t,o,i,r,n,!1);}function me(e,t,o,i){e.push(t),e.push(o),e.push(i);}function ye(e,t,o,i,r,n){var s=(n-t)/(i-t);return e.push(n),e.push(o+(r-o)*s),e.push(1),s}function ve(e,t,o,i,r,n){var s=(n-o)/(r-o);return e.push(t+(i-t)*s),e.push(n),e.push(1),s}function xe(e,t){for(var o=[],i=0;i<e.length;i++){var r,n=e[i],s=n.type;if("Point"===s||"MultiPoint"===s||"LineString"===s)r=we(n.geometry,t);else if("MultiLineString"===s||"Polygon"===s){r=[];for(var a=0;a<n.geometry.length;a++)r.push(we(n.geometry[a],t));}else if("MultiPolygon"===s)for(r=[],a=0;a<n.geometry.length;a++){for(var l=[],c=0;c<n.geometry[a].length;c++)l.push(we(n.geometry[a][c],t));r.push(l);}o.push(ie(n.id,s,r,n.tags));}return o}function we(e,t){var o=[];o.size=e.size,void 0!==e.start&&(o.start=e.start,o.end=e.end);for(var i=0;i<e.length;i+=3)o.push(e[i]+t,e[i+1],e[i+2]);return o}function Se(e,t){if(e.transformed)return e;var o,i,r,n=1<<e.z,s=e.x,a=e.y;for(o=0;o<e.features.length;o++){var l=e.features[o],c=l.geometry,u=l.type;if(l.geometry=[],1===u)for(i=0;i<c.length;i+=2)l.geometry.push(Ie(c[i],c[i+1],t,n,s,a));else for(i=0;i<c.length;i++){var h=[];for(r=0;r<c[i].length;r+=2)h.push(Ie(c[i][r],c[i][r+1],t,n,s,a));l.geometry.push(h);}}return e.transformed=!0,e}function Ie(e,t,o,i,r,n){return [Math.round(o*(e*i-r)),Math.round(o*(t*i-n))]}function Me(e,t,o,i,r){for(var n=t===r.maxZoom?0:r.tolerance/((1<<t)*r.extent),s={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:o,y:i,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0;a<e.length;a++){s.numFeatures++,be(s,e[a],n,r);var l=e[a].minX,c=e[a].minY,u=e[a].maxX,h=e[a].maxY;l<s.minX&&(s.minX=l),c<s.minY&&(s.minY=c),u>s.maxX&&(s.maxX=u),h>s.maxY&&(s.maxY=h);}return s}function be(e,t,o,i){var r=t.geometry,n=t.type,s=[];if("Point"===n||"MultiPoint"===n)for(var a=0;a<r.length;a+=3)s.push(r[a]),s.push(r[a+1]),e.numPoints++,e.numSimplified++;else if("LineString"===n)ke(s,r,e,o,!1,!1);else if("MultiLineString"===n||"Polygon"===n)for(a=0;a<r.length;a++)ke(s,r[a],e,o,"Polygon"===n,0===a);else if("MultiPolygon"===n)for(var l=0;l<r.length;l++){var c=r[l];for(a=0;a<c.length;a++)ke(s,c[a],e,o,!0,0===a);}if(s.length){var u=t.tags||null;if("LineString"===n&&i.lineMetrics){for(var h in u={},t.tags)u[h]=t.tags[h];u.mapbox_clip_start=r.start/r.size,u.mapbox_clip_end=r.end/r.size;}var p={geometry:s,type:"Polygon"===n||"MultiPolygon"===n?3:"LineString"===n||"MultiLineString"===n?2:1,tags:u};null!==t.id&&(p.id=t.id),e.features.push(p);}}function ke(e,t,o,i,r,n){var s=i*i;if(i>0&&t.size<(r?s:i))o.numPoints+=t.length/3;else {for(var a=[],l=0;l<t.length;l+=3)(0===i||t[l+2]>s)&&(o.numSimplified++,a.push(t[l]),a.push(t[l+1])),o.numPoints++;r&&function(e,t){for(var o=0,i=0,r=e.length,n=r-2;i<r;n=i,i+=2)o+=(e[i]-e[n])*(e[i+1]+e[n+1]);if(o>0===t)for(i=0,r=e.length;i<r/2;i+=2){var s=e[i],a=e[i+1];e[i]=e[r-2-i],e[i+1]=e[r-1-i],e[r-2-i]=s,e[r-1-i]=a;}}(a,n),e.push(a);}}function Pe(e,t){var o=(t=this.options=function(e,t){for(var o in t)e[o]=t[o];return e}(Object.create(this.options),t)).debug;if(o&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(e,t){var o=[];if("FeatureCollection"===e.type)for(var i=0;i<e.features.length;i++)ne(o,e.features[i],t,i);else ne(o,"Feature"===e.type?e:{geometry:e},t);return o}(e,t);this.tiles={},this.tileCoords=[],o&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(i=function(e,t){var o=t.buffer/t.extent,i=e,r=he(e,1,-1-o,o,0,-1,2,t),n=he(e,1,1-o,2+o,0,-1,2,t);return (r||n)&&(i=he(e,1,-o,1+o,0,-1,2,t)||[],r&&(i=xe(r,1).concat(i)),n&&(i=i.concat(xe(n,-1)))),i}(i,t)).length&&this.splitTile(i,0,0,0),o&&(i.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)));}function _e(e,t,o){return 32*((1<<e)*o+t)+e}function Te(e,t){const o=e.tileID.canonical;if(!this._geoJSONIndex)return t(null,null);const i=this._geoJSONIndex.getTile(o.z,o.x,o.y);if(!i)return t(null,null);const r=new g(i.features);let n=z(r);0===n.byteOffset&&n.byteLength===n.buffer.byteLength||(n=new Uint8Array(n)),t(null,{vectorTile:r,rawData:n.buffer});}Pe.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},Pe.prototype.splitTile=function(e,t,o,i,r,n,s){for(var a=[e,t,o,i],l=this.options,c=l.debug;a.length;){i=a.pop(),o=a.pop(),t=a.pop(),e=a.pop();var u=1<<t,h=_e(t,o,i),p=this.tiles[h];if(!p&&(c>1&&console.time("creation"),p=this.tiles[h]=Me(e,t,o,i,l),this.tileCoords.push({z:t,x:o,y:i}),c)){c>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,o,i,p.numFeatures,p.numPoints,p.numSimplified),console.timeEnd("creation"));var f="z"+t;this.stats[f]=(this.stats[f]||0)+1,this.total++;}if(p.source=e,r){if(t===l.maxZoom||t===r)continue;var d=1<<r-t;if(o!==Math.floor(n/d)||i!==Math.floor(s/d))continue}else if(t===l.indexMaxZoom||p.numPoints<=l.indexMaxPoints)continue;if(p.source=null,0!==e.length){c>1&&console.time("clipping");var g,m,y,v,x,w,S=.5*l.buffer/l.extent,I=.5-S,M=.5+S,b=1+S;g=m=y=v=null,x=he(e,u,o-S,o+M,0,p.minX,p.maxX,l),w=he(e,u,o+I,o+b,0,p.minX,p.maxX,l),e=null,x&&(g=he(x,u,i-S,i+M,1,p.minY,p.maxY,l),m=he(x,u,i+I,i+b,1,p.minY,p.maxY,l),x=null),w&&(y=he(w,u,i-S,i+M,1,p.minY,p.maxY,l),v=he(w,u,i+I,i+b,1,p.minY,p.maxY,l),w=null),c>1&&console.timeEnd("clipping"),a.push(g||[],t+1,2*o,2*i),a.push(m||[],t+1,2*o,2*i+1),a.push(y||[],t+1,2*o+1,2*i),a.push(v||[],t+1,2*o+1,2*i+1);}}},Pe.prototype.getTile=function(e,t,o){var i=this.options,r=i.extent,n=i.debug;if(e<0||e>24)return null;var s=1<<e,a=_e(e,t=(t%s+s)%s,o);if(this.tiles[a])return Se(this.tiles[a],r);n>1&&console.log("drilling down to z%d-%d-%d",e,t,o);for(var l,c=e,u=t,h=o;!l&&c>0;)c--,u=Math.floor(u/2),h=Math.floor(h/2),l=this.tiles[_e(c,u,h)];return l&&l.source?(n>1&&console.log("found parent tile z%d-%d-%d",c,u,h),n>1&&console.time("drilling down"),this.splitTile(l.source,c,u,h,e,t,o),n>1&&console.timeEnd("drilling down"),this.tiles[a]?Se(this.tiles[a],r):null):null};class Ce extends l{constructor(e,t,o,i){super(e,t,o,Te),i&&(this.loadGeoJSON=i);}loadData(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),this._pendingCallback=t,this._pendingLoadDataParams=e,this._state&&"Idle"!==this._state?this._state="NeedsLoadData":(this._state="Coalescing",this._loadData());}_loadData(){if(!this._pendingCallback||!this._pendingLoadDataParams)return;const t=this._pendingCallback,o=this._pendingLoadDataParams;delete this._pendingCallback,delete this._pendingLoadDataParams;const i=!!(o&&o.request&&o.request.collectResourceTiming)&&new e.RequestPerformance(o.request);this.loadGeoJSON(o,((r,n)=>{if(r||!n)return t(r);if("object"!=typeof n)return t(new Error(`Input data given to '${o.source}' is not a valid GeoJSON object.`));{u(n,!0);try{if(o.filter){const t=e.createExpression(o.filter,{type:"boolean","property-type":"data-driven",overridable:!1,transition:!1});if("error"===t.result)throw new Error(t.value.map((e=>`${e.key}: ${e.message}`)).join(", "));const i=n.features.filter((e=>t.value.evaluate({zoom:0},e)));n={type:"FeatureCollection",features:i};}this._geoJSONIndex=o.cluster?new V(function({superclusterOptions:t,clusterProperties:o}){if(!o||!t)return t;const i={},r={},n={accumulated:null,zoom:0},s={properties:null},a=Object.keys(o);for(const t of a){const[n,s]=o[t],a=e.createExpression(s),l=e.createExpression("string"==typeof n?[n,["accumulated"],["get",t]]:n);i[t]=a.value,r[t]=l.value;}return t.map=e=>{s.properties=e;const t={};for(const e of a)t[e]=i[e].evaluate(n,s);return t},t.reduce=(e,t)=>{s.properties=t;for(const t of a)n.accumulated=e[t],e[t]=r[t].evaluate(n,s);},t}(o)).load(n.features):function(e,t){return new Pe(e,t)}(n,o.geojsonVtOptions);}catch(r){return t(r)}this.loaded={};const s={};if(i){const e=i.finish();e&&(s.resourceTiming={},s.resourceTiming[o.source]=JSON.parse(JSON.stringify(e)));}t(null,s);}}));}coalesce(){"Coalescing"===this._state?this._state="Idle":"NeedsLoadData"===this._state&&(this._state="Coalescing",this._loadData());}reloadTile(e,t){const o=this.loaded;return o&&o[e.uid]?super.reloadTile(e,t):this.loadTile(e,t)}loadGeoJSON(t,o){if(t.request)e.getJSON(t.request,o);else {if("string"!=typeof t.data)return o(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`));try{return o(null,JSON.parse(t.data))}catch(e){return o(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`))}}}removeSource(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),t();}getClusterExpansionZoom(e,t){try{t(null,this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));}catch(e){t(e);}}getClusterChildren(e,t){try{t(null,this._geoJSONIndex.getChildren(e.clusterId));}catch(e){t(e);}}getClusterLeaves(e,t){try{t(null,this._geoJSONIndex.getLeaves(e.clusterId,e.limit,e.offset));}catch(e){t(e);}}}class De{constructor(t){this.self=t,this.actor=new e.Actor(t,this),this.layerIndexes={},this.availableImages={},this.workerSourceTypes={vector:l,geojson:Ce},this.workerSources={},this.demWorkerSources={},this.self.registerWorkerSource=(e,t)=>{if(this.workerSourceTypes[e])throw new Error(`Worker source with name "${e}" already registered.`);this.workerSourceTypes[e]=t;},this.self.registerRTLTextPlugin=t=>{if(e.plugin.isParsed())throw new Error("RTL text plugin already registered.");e.plugin.applyArabicShaping=t.applyArabicShaping,e.plugin.processBidirectionalText=t.processBidirectionalText,e.plugin.processStyledBidirectionalText=t.processStyledBidirectionalText;};}setReferrer(e,t){this.referrer=t;}setImages(e,t,o){this.availableImages[e]=t;for(const o in this.workerSources[e]){const i=this.workerSources[e][o];for(const e in i)i[e].availableImages=t;}o();}setLayers(e,t,o){this.getLayerIndex(e).replace(t),o();}updateLayers(e,t,o){this.getLayerIndex(e).update(t.layers,t.removedIds),o();}loadTile(e,t,o){this.getWorkerSource(e,t.type,t.source).loadTile(t,o);}loadDEMTile(e,t,o){this.getDEMWorkerSource(e,t.source).loadTile(t,o);}reloadTile(e,t,o){this.getWorkerSource(e,t.type,t.source).reloadTile(t,o);}abortTile(e,t,o){this.getWorkerSource(e,t.type,t.source).abortTile(t,o);}removeTile(e,t,o){this.getWorkerSource(e,t.type,t.source).removeTile(t,o);}removeDEMTile(e,t){this.getDEMWorkerSource(e,t.source).removeTile(t);}removeSource(e,t,o){if(!this.workerSources[e]||!this.workerSources[e][t.type]||!this.workerSources[e][t.type][t.source])return;const i=this.workerSources[e][t.type][t.source];delete this.workerSources[e][t.type][t.source],void 0!==i.removeSource?i.removeSource(t,o):o();}loadWorkerSource(e,t,o){try{this.self.importScripts(t.url),o();}catch(e){o(e.toString());}}syncRTLPluginState(t,o,i){try{e.plugin.setState(o);const t=e.plugin.getPluginURL();if(e.plugin.isLoaded()&&!e.plugin.isParsed()&&null!=t){this.self.importScripts(t);const o=e.plugin.isParsed();i(o?void 0:new Error(`RTL Text Plugin failed to import scripts from ${t}`),o);}}catch(e){i(e.toString());}}getAvailableImages(e){let t=this.availableImages[e];return t||(t=[]),t}getLayerIndex(e){let t=this.layerIndexes[e];return t||(t=this.layerIndexes[e]=new i),t}getWorkerSource(e,t,o){return this.workerSources[e]||(this.workerSources[e]={}),this.workerSources[e][t]||(this.workerSources[e][t]={}),this.workerSources[e][t][o]||(this.workerSources[e][t][o]=new this.workerSourceTypes[t]({send:(t,o,i)=>{this.actor.send(t,o,i,e);}},this.getLayerIndex(e),this.getAvailableImages(e))),this.workerSources[e][t][o]}getDEMWorkerSource(e,t){return this.demWorkerSources[e]||(this.demWorkerSources[e]={}),this.demWorkerSources[e][t]||(this.demWorkerSources[e][t]=new c),this.demWorkerSources[e][t]}enforceCacheSizeLimit(t,o){e.enforceCacheSizeLimit(o);}}return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope&&(self.worker=new De(self)),De}));

define(["./shared"],(function(t){var e={};function i(t){return !o(t)}function o(t){return "undefined"==typeof window||"undefined"==typeof document?"not a browser":Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray?Function.prototype&&Function.prototype.bind?Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions?"JSON"in window&&"parse"in JSON&&"stringify"in JSON?function(){if(!("Worker"in window&&"Blob"in window&&"URL"in window))return !1;var t,e,i=new Blob([""],{type:"text/javascript"}),o=URL.createObjectURL(i);try{e=new Worker(o),t=!0;}catch(e){t=!1;}return e&&e.terminate(),URL.revokeObjectURL(o),t}()?"Uint8ClampedArray"in window?ArrayBuffer.isView?function(){var t=document.createElement("canvas");t.width=t.height=1;var e=t.getContext("2d");if(!e)return !1;var i=e.getImageData(0,0,1,1);return i&&i.width===t.width}()?(void 0===s[e=t&&t.failIfMajorPerformanceCaveat]&&(s[e]=function(t){var e,o=function(t){var e=document.createElement("canvas"),o=Object.create(i.webGLContextAttributes);return o.failIfMajorPerformanceCaveat=t,e.getContext("webgl",o)||e.getContext("experimental-webgl",o)}(t);if(!o)return !1;try{e=o.createShader(o.VERTEX_SHADER);}catch(t){return !1}return !(!e||o.isContextLost())&&(o.shaderSource(e,"void main() {}"),o.compileShader(e),!0===o.getShaderParameter(e,o.COMPILE_STATUS))}(e)),s[e]?document.documentMode?"insufficient ECMAScript 6 support":void 0:"insufficient WebGL support"):"insufficient Canvas/getImageData support":"insufficient ArrayBuffer support":"insufficient Uint8ClampedArray support":"insufficient worker support":"insufficient JSON support":"insufficient Object support":"insufficient Function support":"insufficent Array support";var e;}e.supported=i,e.notSupportedReason=o;var s={};function a(t,e){if(Array.isArray(t)){if(!Array.isArray(e)||t.length!==e.length)return !1;for(let i=0;i<t.length;i++)if(!a(t[i],e[i]))return !1;return !0}if("object"==typeof t&&null!==t&&null!==e){if("object"!=typeof e)return !1;if(Object.keys(t).length!==Object.keys(e).length)return !1;for(const i in t)if(!a(t[i],e[i]))return !1;return !0}return t===e}i.webGLContextAttributes={antialias:!1,alpha:!0,stencil:!0,depth:!0};const r={create:function(t,e,i){const o=window.document.createElement(t);return void 0!==e&&(o.className=e),i&&i.appendChild(o),o},createNS:function(t,e){return window.document.createElementNS(t,e)}},n=window.document&&window.document.documentElement.style;function l(t){if(!n)return t[0];for(let e=0;e<t.length;e++)if(t[e]in n)return t[e];return t[0]}const c=l(["userSelect","MozUserSelect","WebkitUserSelect","msUserSelect"]);let h;r.disableDrag=function(){n&&c&&(h=n[c],n[c]="none");},r.enableDrag=function(){n&&c&&(n[c]=h);};const u=l(["transform","WebkitTransform"]);r.setTransform=function(t,e){t.style[u]=e;},r.addEventListener=function(t,e,i,o={}){t.addEventListener(e,i,"passive"in o?o:o.capture);},r.removeEventListener=function(t,e,i,o={}){t.removeEventListener(e,i,"passive"in o?o:o.capture);};const d=function(t){t.preventDefault(),t.stopPropagation(),window.removeEventListener("click",d,!0);};r.suppressClick=function(){window.addEventListener("click",d,!0),window.setTimeout((()=>{window.removeEventListener("click",d,!0);}),0);},r.mousePos=function(e,i){const o=e.getBoundingClientRect();return new t.Point(i.clientX-o.left-e.clientLeft,i.clientY-o.top-e.clientTop)},r.touchPos=function(e,i){const o=e.getBoundingClientRect(),s=[];for(let a=0;a<i.length;a++)s.push(new t.Point(i[a].clientX-o.left-e.clientLeft,i[a].clientY-o.top-e.clientTop));return s},r.mouseButton=function(t){return t.button},r.remove=function(t){t.parentNode&&t.parentNode.removeChild(t);};class _{constructor(t){this._transformRequestFn=t;}transformRequest(t,e){return this._transformRequestFn&&this._transformRequestFn(t,e)||{url:t}}normalizeSpriteURL(t,e,i){const o=function(t){const e=t.match(m);if(!e)throw new Error("Unable to parse URL object");return {protocol:e[1],authority:e[2],path:e[3]||"/",params:e[4]?e[4].split("&"):[]}}(t);return o.path+=`${e}${i}`,function(t){const e=t.params.length?`?${t.params.join("&")}`:"";return `${t.protocol}://${t.authority}${t.path}${e}`}(o)}setTransformRequest(t){this._transformRequestFn=t;}}const m=/^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;function p(){var e=new t.ARRAY_TYPE(3);return t.ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function f(e){var i=new t.ARRAY_TYPE(3);return i[0]=e[0],i[1]=e[1],i[2]=e[2],i}function g(e,i,o){var s=new t.ARRAY_TYPE(3);return s[0]=e,s[1]=i,s[2]=o,s}var x=function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t};p();var v,y=function(t){var e=t[0],i=t[1];return e*e+i*i};v=new t.ARRAY_TYPE(2),t.ARRAY_TYPE!=Float32Array&&(v[0]=0,v[1]=0);class b{constructor(t,e,i,o){this.context=t,this.format=i,this.texture=t.gl.createTexture(),this.update(e,o);}update(e,i,o){const{width:s,height:a}=e,r=!(this.size&&this.size[0]===s&&this.size[1]===a||o),{context:n}=this,{gl:l}=n;if(this.useMipmap=Boolean(i&&i.useMipmap),l.bindTexture(l.TEXTURE_2D,this.texture),n.pixelStoreUnpackFlipY.set(!1),n.pixelStoreUnpack.set(1),n.pixelStoreUnpackPremultiplyAlpha.set(this.format===l.RGBA&&(!i||!1!==i.premultiply)),r)this.size=[s,a],e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement||e instanceof ImageData||t.isImageBitmap(e)?l.texImage2D(l.TEXTURE_2D,0,this.format,this.format,l.UNSIGNED_BYTE,e):l.texImage2D(l.TEXTURE_2D,0,this.format,s,a,0,this.format,l.UNSIGNED_BYTE,e.data);else {const{x:i,y:r}=o||{x:0,y:0};e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement||e instanceof ImageData||t.isImageBitmap(e)?l.texSubImage2D(l.TEXTURE_2D,0,i,r,l.RGBA,l.UNSIGNED_BYTE,e):l.texSubImage2D(l.TEXTURE_2D,0,i,r,s,a,l.RGBA,l.UNSIGNED_BYTE,e.data);}this.useMipmap&&this.isSizePowerOfTwo()&&l.generateMipmap(l.TEXTURE_2D);}bind(t,e,i){const{context:o}=this,{gl:s}=o;s.bindTexture(s.TEXTURE_2D,this.texture),i!==s.LINEAR_MIPMAP_NEAREST||this.isSizePowerOfTwo()||(i=s.LINEAR),t!==this.filter&&(s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,t),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,i||t),this.filter=t),e!==this.wrap&&(s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,e),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,e),this.wrap=e);}isSizePowerOfTwo(){return this.size[0]===this.size[1]&&Math.log(this.size[0])/Math.LN2%1==0}destroy(){const{gl:t}=this.context;t.deleteTexture(this.texture),this.texture=null;}}function w(t){const{userImage:e}=t;return !!(e&&e.render&&e.render())&&(t.data.replace(new Uint8Array(e.data.buffer)),!0)}class T extends t.Evented{constructor(){super(),this.images={},this.updatedImages={},this.callbackDispatchedThisFrame={},this.loaded=!1,this.requestors=[],this.patterns={},this.atlasImage=new t.RGBAImage({width:1,height:1}),this.dirty=!0;}isLoaded(){return this.loaded}setLoaded(t){if(this.loaded!==t&&(this.loaded=t,t)){for(const{ids:t,callback:e}of this.requestors)this._notify(t,e);this.requestors=[];}}getImage(t){return this.images[t]}addImage(t,e){this._validate(t,e)&&(this.images[t]=e);}_validate(e,i){let o=!0;return this._validateStretch(i.stretchX,i.data&&i.data.width)||(this.fire(new t.ErrorEvent(new Error(`Image "${e}" has invalid "stretchX" value`))),o=!1),this._validateStretch(i.stretchY,i.data&&i.data.height)||(this.fire(new t.ErrorEvent(new Error(`Image "${e}" has invalid "stretchY" value`))),o=!1),this._validateContent(i.content,i)||(this.fire(new t.ErrorEvent(new Error(`Image "${e}" has invalid "content" value`))),o=!1),o}_validateStretch(t,e){if(!t)return !0;let i=0;for(const o of t){if(o[0]<i||o[1]<o[0]||e<o[1])return !1;i=o[1];}return !0}_validateContent(t,e){return !(t&&(4!==t.length||t[0]<0||e.data.width<t[0]||t[1]<0||e.data.height<t[1]||t[2]<0||e.data.width<t[2]||t[3]<0||e.data.height<t[3]||t[2]<t[0]||t[3]<t[1]))}updateImage(t,e){e.version=this.images[t].version+1,this.images[t]=e,this.updatedImages[t]=!0;}removeImage(t){const e=this.images[t];delete this.images[t],delete this.patterns[t],e.userImage&&e.userImage.onRemove&&e.userImage.onRemove();}listImages(){return Object.keys(this.images)}getImages(t,e){let i=!0;if(!this.isLoaded())for(const e of t)this.images[e]||(i=!1);this.isLoaded()||i?this._notify(t,e):this.requestors.push({ids:t,callback:e});}_notify(e,i){const o={};for(const i of e){this.images[i]||this.fire(new t.Event("styleimagemissing",{id:i}));const e=this.images[i];e?o[i]={data:e.data.clone(),pixelRatio:e.pixelRatio,sdf:e.sdf,version:e.version,stretchX:e.stretchX,stretchY:e.stretchY,content:e.content,hasRenderCallback:Boolean(e.userImage&&e.userImage.render)}:t.warnOnce(`Image "${i}" could not be loaded. Please make sure you have added the image with map.addImage() or a "sprite" property in your style. You can provide missing images by listening for the "styleimagemissing" map event.`);}i(null,o);}getPixelSize(){const{width:t,height:e}=this.atlasImage;return {width:t,height:e}}getPattern(e){const i=this.patterns[e],o=this.getImage(e);if(!o)return null;if(i&&i.position.version===o.version)return i.position;if(i)i.position.version=o.version;else {const i={w:o.data.width+2,h:o.data.height+2,x:0,y:0},s=new t.ImagePosition(i,o);this.patterns[e]={bin:i,position:s};}return this._updatePatternAtlas(),this.patterns[e].position}bind(t){const e=t.gl;this.atlasTexture?this.dirty&&(this.atlasTexture.update(this.atlasImage),this.dirty=!1):this.atlasTexture=new b(t,this.atlasImage,e.RGBA),this.atlasTexture.bind(e.LINEAR,e.CLAMP_TO_EDGE);}_updatePatternAtlas(){const e=[];for(const t in this.patterns)e.push(this.patterns[t].bin);const{w:i,h:o}=t.potpack(e),s=this.atlasImage;s.resize({width:i||1,height:o||1});for(const e in this.patterns){const{bin:i}=this.patterns[e],o=i.x+1,a=i.y+1,r=this.images[e].data,n=r.width,l=r.height;t.RGBAImage.copy(r,s,{x:0,y:0},{x:o,y:a},{width:n,height:l}),t.RGBAImage.copy(r,s,{x:0,y:l-1},{x:o,y:a-1},{width:n,height:1}),t.RGBAImage.copy(r,s,{x:0,y:0},{x:o,y:a+l},{width:n,height:1}),t.RGBAImage.copy(r,s,{x:n-1,y:0},{x:o-1,y:a},{width:1,height:l}),t.RGBAImage.copy(r,s,{x:0,y:0},{x:o+n,y:a},{width:1,height:l});}this.dirty=!0;}beginFrame(){this.callbackDispatchedThisFrame={};}dispatchRenderCallbacks(t){for(const e of t){if(this.callbackDispatchedThisFrame[e])continue;this.callbackDispatchedThisFrame[e]=!0;const t=this.images[e];w(t)&&this.updateImage(e,t);}}}var E={exports:{}};E.exports=P,E.exports.default=P;var I=1e20;function P(t,e,i,o,s,a){this.fontSize=t||24,this.buffer=void 0===e?3:e,this.cutoff=o||.25,this.fontFamily=s||"sans-serif",this.fontWeight=a||"normal",this.radius=i||8;var r=this.size=this.fontSize+2*this.buffer,n=r+2*this.buffer;this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=r,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.fontWeight+" "+this.fontSize+"px "+this.fontFamily,this.ctx.textAlign="left",this.ctx.fillStyle="black",this.gridOuter=new Float64Array(n*n),this.gridInner=new Float64Array(n*n),this.f=new Float64Array(n),this.z=new Float64Array(n+1),this.v=new Uint16Array(n),this.useMetrics=void 0!==this.ctx.measureText("A").actualBoundingBoxLeft,this.middle=Math.round(r/2*(navigator.userAgent.indexOf("Gecko/")>=0?1.2:1));}function S(t,e,i,o,s,a){for(var r=0;r<e;r++)C(t,r,e,i,o,s,a);for(var n=0;n<i;n++)C(t,n*e,1,e,o,s,a);}function C(t,e,i,o,s,a,r){var n,l,c,h;for(a[0]=0,r[0]=-I,r[1]=I,n=0;n<o;n++)s[n]=t[e+n*i];for(n=1,l=0,c=0;n<o;n++){do{c=(s[n]-s[h=a[l]]+n*n-h*h)/(n-h)/2;}while(c<=r[l]&&--l>-1);a[++l]=n,r[l]=c,r[l+1]=I;}for(n=0,l=0;n<o;n++){for(;r[l+1]<n;)l++;t[e+n*i]=s[h=a[l]]+(n-h)*(n-h);}}P.prototype._draw=function(t,e){var i,o,s,a,r,n,l,c,h,u=this.ctx.measureText(t),d=u.width,_=2*this.buffer;e&&this.useMetrics?(r=Math.floor(u.actualBoundingBoxAscent),c=this.buffer+Math.ceil(u.actualBoundingBoxAscent),n=this.buffer,l=this.buffer,i=(o=Math.min(this.size,Math.ceil(u.actualBoundingBoxRight-u.actualBoundingBoxLeft)))+_,s=(a=Math.min(this.size-n,Math.ceil(u.actualBoundingBoxAscent+u.actualBoundingBoxDescent)))+_,this.ctx.textBaseline="alphabetic"):(i=o=this.size,s=a=this.size,r=19*this.fontSize/24,n=l=0,c=this.middle,this.ctx.textBaseline="middle"),o&&a&&(this.ctx.clearRect(l,n,o,a),this.ctx.fillText(t,this.buffer,c),h=this.ctx.getImageData(l,n,o,a));var m=new Uint8ClampedArray(i*s);return function(t,e,i,o,s,a,r){a.fill(I,0,e*i),r.fill(0,0,e*i);for(var n=(e-o)/2,l=0;l<s;l++)for(var c=0;c<o;c++){var h=(l+n)*e+c+n,u=t.data[4*(l*o+c)+3]/255;if(1===u)a[h]=0,r[h]=I;else if(0===u)a[h]=I,r[h]=0;else {var d=Math.max(0,.5-u),_=Math.max(0,u-.5);a[h]=d*d,r[h]=_*_;}}}(h,i,s,o,a,this.gridOuter,this.gridInner),S(this.gridOuter,i,s,this.f,this.v,this.z),S(this.gridInner,i,s,this.f,this.v,this.z),function(t,e,i,o,s,a,r){for(var n=0;n<e*i;n++){var l=Math.sqrt(o[n])-Math.sqrt(s[n]);t[n]=Math.round(255-255*(l/a+r));}}(m,i,s,this.gridOuter,this.gridInner,this.radius,this.cutoff),{data:m,metrics:{width:o,height:a,sdfWidth:i,sdfHeight:s,top:r,left:0,advance:d}}},P.prototype.draw=function(t){return this._draw(t,!1).data},P.prototype.drawWithMetrics=function(t){return this._draw(t,!0)};var z=E.exports;class D{constructor(t,e){this.requestManager=t,this.localIdeographFontFamily=e,this.entries={};}setURL(t){this.url=t;}getGlyphs(e,i){const o=[];for(const t in e)for(const i of e[t])o.push({stack:t,id:i});t.asyncAll(o,(({stack:t,id:e},i)=>{let o=this.entries[t];o||(o=this.entries[t]={glyphs:{},requests:{},ranges:{}});let s=o.glyphs[e];if(void 0!==s)return void i(null,{stack:t,id:e,glyph:s});if(s=this._tinySDF(o,t,e),s)return o.glyphs[e]=s,void i(null,{stack:t,id:e,glyph:s});const a=Math.floor(e/256);if(256*a>65535)return void i(new Error("glyphs > 65535 not supported"));if(o.ranges[a])return void i(null,{stack:t,id:e,glyph:s});let r=o.requests[a];r||(r=o.requests[a]=[],D.loadGlyphRange(t,a,this.url,this.requestManager,((t,e)=>{if(e){for(const t in e)this._doesCharSupportLocalGlyph(+t)||(o.glyphs[+t]=e[+t]);o.ranges[a]=!0;}for(const i of r)i(t,e);delete o.requests[a];}))),r.push(((o,s)=>{o?i(o):s&&i(null,{stack:t,id:e,glyph:s[e]||null});}));}),((t,e)=>{if(t)i(t);else if(e){const t={};for(const{stack:i,id:o,glyph:s}of e)(t[i]||(t[i]={}))[o]=s&&{id:s.id,bitmap:s.bitmap.clone(),metrics:s.metrics};i(null,t);}}));}_doesCharSupportLocalGlyph(e){return !!this.localIdeographFontFamily&&(t.unicodeBlockLookup["CJK Unified Ideographs"](e)||t.unicodeBlockLookup["Hangul Syllables"](e)||t.unicodeBlockLookup.Hiragana(e)||t.unicodeBlockLookup.Katakana(e))}_tinySDF(e,i,o){const s=this.localIdeographFontFamily;if(!s)return;if(!this._doesCharSupportLocalGlyph(o))return;let a=e.tinySDF;if(!a){let t="400";/bold/i.test(i)?t="900":/medium/i.test(i)?t="500":/light/i.test(i)&&(t="200"),a=e.tinySDF=new D.TinySDF(24,3,8,.25,s,t);}return {id:o,bitmap:new t.AlphaImage({width:30,height:30},a.draw(String.fromCharCode(o))),metrics:{width:24,height:24,left:0,top:-8,advance:24}}}}D.loadGlyphRange=function(e,i,o,s,a){const r=256*i,n=r+255,l=s.transformRequest(o.replace("{fontstack}",e).replace("{range}",`${r}-${n}`),t.ResourceType.Glyphs);t.getArrayBuffer(l,((e,i)=>{if(e)a(e);else if(i){const e={};for(const o of t.parseGlyphPBF(i))e[o.id]=o;a(null,e);}}));},D.TinySDF=z;const A=new t.Properties({anchor:new t.DataConstantProperty(t.spec.light.anchor),position:new class{constructor(){this.specification=t.spec.light.position;}possiblyEvaluate(e,i){return t.sphericalToCartesian(e.expression.evaluate(i))}interpolate(e,i,o){return {x:t.number(e.x,i.x,o),y:t.number(e.y,i.y,o),z:t.number(e.z,i.z,o)}}},color:new t.DataConstantProperty(t.spec.light.color),intensity:new t.DataConstantProperty(t.spec.light.intensity)}),M="-transition";class L extends t.Evented{constructor(e){super(),this._transitionable=new t.Transitionable(A),this.setLight(e),this._transitioning=this._transitionable.untransitioned();}getLight(){return this._transitionable.serialize()}setLight(e,i={}){if(!this._validate(t.validateLight,e,i))for(const t in e){const i=e[t];t.endsWith(M)?this._transitionable.setTransition(t.slice(0,-M.length),i):this._transitionable.setValue(t,i);}}updateTransitions(t){this._transitioning=this._transitionable.transitioned(t,this._transitioning);}hasTransition(){return this._transitioning.hasTransition()}recalculate(t){this.properties=this._transitioning.possiblyEvaluate(t);}_validate(e,i,o){return (!o||!1!==o.validate)&&t.emitValidationErrors(this,e.call(t.validateStyle,t.extend({value:i,style:{glyphs:!0,sprite:!0},styleSpec:t.spec})))}}class R{constructor(t,e){this.width=t,this.height=e,this.nextRow=0,this.data=new Uint8Array(this.width*this.height),this.dashEntry={};}getDash(t,e){const i=t.join(",")+String(e);return this.dashEntry[i]||(this.dashEntry[i]=this.addDash(t,e)),this.dashEntry[i]}getDashRanges(t,e,i){const o=[];let s=t.length%2==1?-t[t.length-1]*i:0,a=t[0]*i,r=!0;o.push({left:s,right:a,isDash:r,zeroLength:0===t[0]});let n=t[0];for(let e=1;e<t.length;e++){r=!r;const l=t[e];s=n*i,n+=l,a=n*i,o.push({left:s,right:a,isDash:r,zeroLength:0===l});}return o}addRoundDash(t,e,i){const o=e/2;for(let e=-i;e<=i;e++){const s=this.width*(this.nextRow+i+e);let a=0,r=t[a];for(let n=0;n<this.width;n++){n/r.right>1&&(r=t[++a]);const l=Math.abs(n-r.left),c=Math.abs(n-r.right),h=Math.min(l,c);let u;const d=e/i*(o+1);if(r.isDash){const t=o-Math.abs(d);u=Math.sqrt(h*h+t*t);}else u=o-Math.sqrt(h*h+d*d);this.data[s+n]=Math.max(0,Math.min(255,u+128));}}}addRegularDash(t){for(let e=t.length-1;e>=0;--e){const i=t[e],o=t[e+1];i.zeroLength?t.splice(e,1):o&&o.isDash===i.isDash&&(o.left=i.left,t.splice(e,1));}const e=t[0],i=t[t.length-1];e.isDash===i.isDash&&(e.left=i.left-this.width,i.right=e.right+this.width);const o=this.width*this.nextRow;let s=0,a=t[s];for(let e=0;e<this.width;e++){e/a.right>1&&(a=t[++s]);const i=Math.abs(e-a.left),r=Math.abs(e-a.right),n=Math.min(i,r);this.data[o+e]=Math.max(0,Math.min(255,(a.isDash?n:-n)+128));}}addDash(e,i){const o=i?7:0,s=2*o+1;if(this.nextRow+s>this.height)return t.warnOnce("LineAtlas out of space"),null;let a=0;for(let t=0;t<e.length;t++)a+=e[t];if(0!==a){const t=this.width/a,s=this.getDashRanges(e,this.width,t);i?this.addRoundDash(s,t,o):this.addRegularDash(s);}const r={y:(this.nextRow+o+.5)/this.height,height:2*o/this.height,width:a};return this.nextRow+=s,this.dirty=!0,r}bind(t){const e=t.gl;this.texture?(e.bindTexture(e.TEXTURE_2D,this.texture),this.dirty&&(this.dirty=!1,e.texSubImage2D(e.TEXTURE_2D,0,0,0,this.width,this.height,e.ALPHA,e.UNSIGNED_BYTE,this.data))):(this.texture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.ALPHA,this.width,this.height,0,e.ALPHA,e.UNSIGNED_BYTE,this.data));}}class k{constructor(e,i){this.workerPool=e,this.actors=[],this.currentActor=0,this.id=t.uniqueId();const o=this.workerPool.acquire(this.id);for(let t=0;t<o.length;t++){const e=new k.Actor(o[t],i,this.id);e.name=`Worker ${t}`,this.actors.push(e);}}broadcast(e,i,o){t.asyncAll(this.actors,((t,o)=>{t.send(e,i,o);}),o=o||function(){});}getActor(){return this.currentActor=(this.currentActor+1)%this.actors.length,this.actors[this.currentActor]}remove(){this.actors.forEach((t=>{t.remove();})),this.actors=[],this.workerPool.release(this.id);}}function B(e,i,o){const s=function(i,s){if(i)return o(i);if(s){const i=t.pick(t.extend(s,e),["tiles","minzoom","maxzoom","attribution","maplibreLogo","bounds","scheme","tileSize","encoding"]);s.vector_layers&&(i.vectorLayers=s.vector_layers,i.vectorLayerIds=i.vectorLayers.map((t=>t.id))),o(null,i);}};return e.url?t.getJSON(i.transformRequest(e.url,t.ResourceType.Source),s):t.exported.frame((()=>s(null,e)))}k.Actor=t.Actor;class F{constructor(e,i,o){this.bounds=t.LngLatBounds.convert(this.validateBounds(e)),this.minzoom=i||0,this.maxzoom=o||24;}validateBounds(t){return Array.isArray(t)&&4===t.length?[Math.max(-180,t[0]),Math.max(-90,t[1]),Math.min(180,t[2]),Math.min(90,t[3])]:[-180,-90,180,90]}contains(e){const i=Math.pow(2,e.z),o=Math.floor(t.mercatorXfromLng(this.bounds.getWest())*i),s=Math.floor(t.mercatorYfromLat(this.bounds.getNorth())*i),a=Math.ceil(t.mercatorXfromLng(this.bounds.getEast())*i),r=Math.ceil(t.mercatorYfromLat(this.bounds.getSouth())*i);return e.x>=o&&e.x<a&&e.y>=s&&e.y<r}}class O extends t.Evented{constructor(e,i,o,s){super(),this.id=e,this.dispatcher=o,this.setEventedParent(s),this.type="raster",this.minzoom=0,this.maxzoom=22,this.roundZoom=!0,this.scheme="xyz",this.tileSize=512,this._loaded=!1,this._options=t.extend({type:"raster"},i),t.extend(this,t.pick(i,["url","scheme","tileSize"]));}load(){this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=B(this._options,this.map._requestManager,((e,i)=>{this._tileJSONRequest=null,this._loaded=!0,e?this.fire(new t.ErrorEvent(e)):i&&(t.extend(this,i),i.bounds&&(this.tileBounds=new F(i.bounds,this.minzoom,this.maxzoom)),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));}));}loaded(){return this._loaded}onAdd(t){this.map=t,this.load();}onRemove(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);}serialize(){return t.extend({},this._options)}hasTile(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)}loadTile(e,i){const o=e.tileID.canonical.url(this.tiles,this.scheme);e.request=t.getImage(this.map._requestManager.transformRequest(o,t.ResourceType.Tile),((o,s)=>{if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(o)e.state="errored",i(o);else if(s){this.map._refreshExpiredTiles&&e.setExpiryData(s),delete s.cacheControl,delete s.expires;const o=this.map.painter.context,a=o.gl;e.texture=this.map.painter.getTileTexture(s.width),e.texture?e.texture.update(s,{useMipmap:!0}):(e.texture=new b(o,s,a.RGBA,{useMipmap:!0}),e.texture.bind(a.LINEAR,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),o.extTextureFilterAnisotropic&&a.texParameterf(a.TEXTURE_2D,o.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,o.extTextureFilterAnisotropicMax)),e.state="loaded",t.cacheEntryPossiblyAdded(this.dispatcher),i(null);}}));}abortTile(t,e){t.request&&(t.request.cancel(),delete t.request),e();}unloadTile(t,e){t.texture&&this.map.painter.saveTileTexture(t.texture),e();}hasTransition(){return !1}}var U=t.createLayout([{name:"a_pos",type:"Int16",components:2},{name:"a_texture_pos",type:"Int16",components:2}]);class N extends t.Evented{constructor(t,e,i,o){super(),this.id=t,this.dispatcher=i,this.coordinates=e.coordinates,this.type="image",this.minzoom=0,this.maxzoom=22,this.tileSize=512,this.tiles={},this._loaded=!1,this.setEventedParent(o),this.options=e;}load(e,i){this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this.url=this.options.url,t.getImage(this.map._requestManager.transformRequest(this.url,t.ResourceType.Image),((o,s)=>{this._loaded=!0,o?this.fire(new t.ErrorEvent(o)):s&&(this.image=s,e&&(this.coordinates=e),i&&i(),this._finishLoading());}));}loaded(){return this._loaded}updateImage(t){return this.image&&t.url?(this.options.url=t.url,this.load(t.coordinates,(()=>{this.texture=null;})),this):this}_finishLoading(){this.map&&(this.setCoordinates(this.coordinates),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})));}onAdd(t){this.map=t,this.load();}setCoordinates(e){this.coordinates=e;const i=e.map(t.MercatorCoordinate.fromLngLat);this.tileID=function(e){let i=1/0,o=1/0,s=-1/0,a=-1/0;for(const t of e)i=Math.min(i,t.x),o=Math.min(o,t.y),s=Math.max(s,t.x),a=Math.max(a,t.y);const r=Math.max(s-i,a-o),n=Math.max(0,Math.floor(-Math.log(r)/Math.LN2)),l=Math.pow(2,n);return new t.CanonicalTileID(n,Math.floor((i+s)/2*l),Math.floor((o+a)/2*l))}(i),this.minzoom=this.maxzoom=this.tileID.z;const o=i.map((t=>this.tileID.getTilePoint(t)._round()));return this._boundsArray=new t.StructArrayLayout4i8,this._boundsArray.emplaceBack(o[0].x,o[0].y,0,0),this._boundsArray.emplaceBack(o[1].x,o[1].y,t.EXTENT,0),this._boundsArray.emplaceBack(o[3].x,o[3].y,0,t.EXTENT),this._boundsArray.emplaceBack(o[2].x,o[2].y,t.EXTENT,t.EXTENT),this.boundsBuffer&&(this.boundsBuffer.destroy(),delete this.boundsBuffer),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})),this}prepare(){if(0===Object.keys(this.tiles).length||!this.image)return;const e=this.map.painter.context,i=e.gl;this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,U.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture||(this.texture=new b(e,this.image,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE));for(const t in this.tiles){const e=this.tiles[t];"loaded"!==e.state&&(e.state="loaded",e.texture=this.texture);}}loadTile(t,e){this.tileID&&this.tileID.equals(t.tileID.canonical)?(this.tiles[String(t.tileID.wrap)]=t,t.buckets={},e(null)):(t.state="errored",e(null));}serialize(){return {type:"image",url:this.options.url,coordinates:this.coordinates}}hasTransition(){return !1}}const Z={vector:class extends t.Evented{constructor(e,i,o,s){if(super(),this.id=e,this.dispatcher=o,this.type="vector",this.minzoom=0,this.maxzoom=22,this.scheme="xyz",this.tileSize=512,this.reparseOverscaled=!0,this.isTileClipped=!0,this._loaded=!1,t.extend(this,t.pick(i,["url","scheme","tileSize","promoteId"])),this._options=t.extend({type:"vector"},i),this._collectResourceTiming=i.collectResourceTiming,512!==this.tileSize)throw new Error("vector tile sources must have a tileSize of 512");this.setEventedParent(s);}load(){this._loaded=!1,this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=B(this._options,this.map._requestManager,((e,i)=>{this._tileJSONRequest=null,this._loaded=!0,e?this.fire(new t.ErrorEvent(e)):i&&(t.extend(this,i),i.bounds&&(this.tileBounds=new F(i.bounds,this.minzoom,this.maxzoom)),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));}));}loaded(){return this._loaded}hasTile(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)}onAdd(t){this.map=t,this.load();}setSourceProperty(t){this._tileJSONRequest&&this._tileJSONRequest.cancel(),t(),this.map.style.sourceCaches[this.id].clearTiles(),this.load();}setTiles(t){return this.setSourceProperty((()=>{this._options.tiles=t;})),this}setUrl(t){return this.setSourceProperty((()=>{this.url=t,this._options.url=t;})),this}onRemove(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);}serialize(){return t.extend({},this._options)}loadTile(e,i){const o=e.tileID.canonical.url(this.tiles,this.scheme),s={request:this.map._requestManager.transformRequest(o,t.ResourceType.Tile),uid:e.uid,tileID:e.tileID,zoom:e.tileID.overscaledZ,tileSize:this.tileSize*e.tileID.overscaleFactor(),type:this.type,source:this.id,pixelRatio:devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes,promoteId:this.promoteId};function a(o,s){return delete e.request,e.aborted?i(null):o&&404!==o.status?i(o):(s&&s.resourceTiming&&(e.resourceTiming=s.resourceTiming),this.map._refreshExpiredTiles&&s&&e.setExpiryData(s),e.loadVectorData(s,this.map.painter),t.cacheEntryPossiblyAdded(this.dispatcher),i(null),void(e.reloadCallback&&(this.loadTile(e,e.reloadCallback),e.reloadCallback=null)))}s.request.collectResourceTiming=this._collectResourceTiming,e.actor&&"expired"!==e.state?"loading"===e.state?e.reloadCallback=i:e.request=e.actor.send("reloadTile",s,a.bind(this)):(e.actor=this.dispatcher.getActor(),e.request=e.actor.send("loadTile",s,a.bind(this)));}abortTile(t){t.request&&(t.request.cancel(),delete t.request),t.actor&&t.actor.send("abortTile",{uid:t.uid,type:this.type,source:this.id},void 0);}unloadTile(t){t.unloadVectorData(),t.actor&&t.actor.send("removeTile",{uid:t.uid,type:this.type,source:this.id},void 0);}hasTransition(){return !1}},raster:O,"raster-dem":class extends O{constructor(e,i,o,s){super(e,i,o,s),this.type="raster-dem",this.maxzoom=22,this._options=t.extend({type:"raster-dem"},i),this.encoding=i.encoding||"mapbox";}serialize(){return {type:"raster-dem",url:this.url,tileSize:this.tileSize,tiles:this.tiles,bounds:this.bounds,encoding:this.encoding}}loadTile(e,i){const o=e.tileID.canonical.url(this.tiles,this.scheme);function s(t,o){t&&(e.state="errored",i(t)),o&&(e.dem=o,e.needsHillshadePrepare=!0,e.state="loaded",i(null));}e.request=t.getImage(this.map._requestManager.transformRequest(o,t.ResourceType.Tile),function(o,a){if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(o)e.state="errored",i(o);else if(a){this.map._refreshExpiredTiles&&e.setExpiryData(a),delete a.cacheControl,delete a.expires;const i=t.isImageBitmap(a)&&t.offscreenCanvasSupported()?a:t.exported.getImageData(a,1),o={uid:e.uid,coord:e.tileID,source:this.id,rawImageData:i,encoding:this.encoding};e.actor&&"expired"!==e.state||(e.actor=this.dispatcher.getActor(),e.actor.send("loadDEMTile",o,s.bind(this)));}}.bind(this)),e.neighboringTiles=this._getNeighboringTiles(e.tileID);}_getNeighboringTiles(e){const i=e.canonical,o=Math.pow(2,i.z),s=(i.x-1+o)%o,a=0===i.x?e.wrap-1:e.wrap,r=(i.x+1+o)%o,n=i.x+1===o?e.wrap+1:e.wrap,l={};return l[new t.OverscaledTileID(e.overscaledZ,a,i.z,s,i.y).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,n,i.z,r,i.y).key]={backfilled:!1},i.y>0&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,s,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,n,i.z,r,i.y-1).key]={backfilled:!1}),i.y+1<o&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,s,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,n,i.z,r,i.y+1).key]={backfilled:!1}),l}unloadTile(t){t.demTexture&&this.map.painter.saveTileTexture(t.demTexture),t.fbo&&(t.fbo.destroy(),delete t.fbo),t.dem&&delete t.dem,delete t.neighboringTiles,t.state="unloaded",t.actor&&t.actor.send("removeDEMTile",{uid:t.uid,source:this.id});}},geojson:class extends t.Evented{constructor(e,i,o,s){super(),this.id=e,this.type="geojson",this.minzoom=0,this.maxzoom=18,this.tileSize=512,this.isTileClipped=!0,this.reparseOverscaled=!0,this._removed=!1,this._loaded=!1,this.actor=o.getActor(),this.setEventedParent(s),this._data=i.data,this._options=t.extend({},i),this._collectResourceTiming=i.collectResourceTiming,this._resourceTiming=[],void 0!==i.maxzoom&&(this.maxzoom=i.maxzoom),i.type&&(this.type=i.type),i.attribution&&(this.attribution=i.attribution),this.promoteId=i.promoteId;const a=t.EXTENT/this.tileSize;this.workerOptions=t.extend({source:this.id,cluster:i.cluster||!1,geojsonVtOptions:{buffer:(void 0!==i.buffer?i.buffer:128)*a,tolerance:(void 0!==i.tolerance?i.tolerance:.375)*a,extent:t.EXTENT,maxZoom:this.maxzoom,lineMetrics:i.lineMetrics||!1,generateId:i.generateId||!1},superclusterOptions:{maxZoom:void 0!==i.clusterMaxZoom?Math.min(i.clusterMaxZoom,this.maxzoom-1):this.maxzoom-1,minPoints:Math.max(2,i.clusterMinPoints||2),extent:t.EXTENT,radius:(i.clusterRadius||50)*a,log:!1,generateId:i.generateId||!1},clusterProperties:i.clusterProperties,filter:i.filter},i.workerOptions);}load(){this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData((e=>{if(e)return void this.fire(new t.ErrorEvent(e));const i={dataType:"source",sourceDataType:"metadata"};this._collectResourceTiming&&this._resourceTiming&&this._resourceTiming.length>0&&(i.resourceTiming=this._resourceTiming,this._resourceTiming=[]),this.fire(new t.Event("data",i));}));}onAdd(t){this.map=t,this.load();}setData(e){return this._data=e,this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData((e=>{if(e)return void this.fire(new t.ErrorEvent(e));const i={dataType:"source",sourceDataType:"content"};this._collectResourceTiming&&this._resourceTiming&&this._resourceTiming.length>0&&(i.resourceTiming=this._resourceTiming,this._resourceTiming=[]),this.fire(new t.Event("data",i));})),this}getClusterExpansionZoom(t,e){return this.actor.send("geojson.getClusterExpansionZoom",{clusterId:t,source:this.id},e),this}getClusterChildren(t,e){return this.actor.send("geojson.getClusterChildren",{clusterId:t,source:this.id},e),this}getClusterLeaves(t,e,i,o){return this.actor.send("geojson.getClusterLeaves",{source:this.id,clusterId:t,limit:e,offset:i},o),this}_updateWorkerData(e){this._loaded=!1;const i=t.extend({},this.workerOptions),o=this._data;"string"==typeof o?(i.request=this.map._requestManager.transformRequest(t.exported.resolveURL(o),t.ResourceType.Source),i.request.collectResourceTiming=this._collectResourceTiming):i.data=JSON.stringify(o),this.actor.send(`${this.type}.loadData`,i,((t,o)=>{this._removed||o&&o.abandoned||(this._loaded=!0,o&&o.resourceTiming&&o.resourceTiming[this.id]&&(this._resourceTiming=o.resourceTiming[this.id].slice(0)),this.actor.send(`${this.type}.coalesce`,{source:i.source},null),e(t));}));}loaded(){return this._loaded}loadTile(t,e){const i=t.actor?"reloadTile":"loadTile";t.actor=this.actor;const o={type:this.type,uid:t.uid,tileID:t.tileID,zoom:t.tileID.overscaledZ,maxZoom:this.maxzoom,tileSize:this.tileSize,source:this.id,pixelRatio:devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes,promoteId:this.promoteId};t.request=this.actor.send(i,o,((o,s)=>(delete t.request,t.unloadVectorData(),t.aborted?e(null):o?e(o):(t.loadVectorData(s,this.map.painter,"reloadTile"===i),e(null)))));}abortTile(t){t.request&&(t.request.cancel(),delete t.request),t.aborted=!0;}unloadTile(t){t.unloadVectorData(),this.actor.send("removeTile",{uid:t.uid,type:this.type,source:this.id});}onRemove(){this._removed=!0,this.actor.send("removeSource",{type:this.type,source:this.id});}serialize(){return t.extend({},this._options,{type:this.type,data:this._data})}hasTransition(){return !1}},video:class extends N{constructor(t,e,i,o){super(t,e,i,o),this.roundZoom=!0,this.type="video",this.options=e;}load(){this._loaded=!1;const e=this.options;this.urls=[];for(const i of e.urls)this.urls.push(this.map._requestManager.transformRequest(i,t.ResourceType.Source).url);t.getVideo(this.urls,((e,i)=>{this._loaded=!0,e?this.fire(new t.ErrorEvent(e)):i&&(this.video=i,this.video.loop=!0,this.video.addEventListener("playing",(()=>{this.map.triggerRepaint();})),this.map&&this.video.play(),this._finishLoading());}));}pause(){this.video&&this.video.pause();}play(){this.video&&this.video.play();}seek(e){if(this.video){const i=this.video.seekable;e<i.start(0)||e>i.end(0)?this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${this.id}`,null,`Playback for this video can be set only between the ${i.start(0)} and ${i.end(0)}-second mark.`))):this.video.currentTime=e;}}getVideo(){return this.video}onAdd(t){this.map||(this.map=t,this.load(),this.video&&(this.video.play(),this.setCoordinates(this.coordinates)));}prepare(){if(0===Object.keys(this.tiles).length||this.video.readyState<2)return;const e=this.map.painter.context,i=e.gl;this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,U.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?this.video.paused||(this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE),i.texSubImage2D(i.TEXTURE_2D,0,0,0,i.RGBA,i.UNSIGNED_BYTE,this.video)):(this.texture=new b(e,this.video,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE));for(const t in this.tiles){const e=this.tiles[t];"loaded"!==e.state&&(e.state="loaded",e.texture=this.texture);}}serialize(){return {type:"video",urls:this.urls,coordinates:this.coordinates}}hasTransition(){return this.video&&!this.video.paused}},image:N,canvas:class extends N{constructor(e,i,o,s){super(e,i,o,s),i.coordinates?Array.isArray(i.coordinates)&&4===i.coordinates.length&&!i.coordinates.some((t=>!Array.isArray(t)||2!==t.length||t.some((t=>"number"!=typeof t))))||this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${e}`,null,'"coordinates" property must be an array of 4 longitude/latitude array pairs'))):this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${e}`,null,'missing required property "coordinates"'))),i.animate&&"boolean"!=typeof i.animate&&this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${e}`,null,'optional "animate" property must be a boolean value'))),i.canvas?"string"==typeof i.canvas||i.canvas instanceof HTMLCanvasElement||this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${e}`,null,'"canvas" must be either a string representing the ID of the canvas element from which to read, or an HTMLCanvasElement instance'))):this.fire(new t.ErrorEvent(new t.ValidationError(`sources.${e}`,null,'missing required property "canvas"'))),this.options=i,this.animate=void 0===i.animate||i.animate;}load(){this._loaded=!0,this.canvas||(this.canvas=this.options.canvas instanceof HTMLCanvasElement?this.options.canvas:document.getElementById(this.options.canvas)),this.width=this.canvas.width,this.height=this.canvas.height,this._hasInvalidDimensions()?this.fire(new t.ErrorEvent(new Error("Canvas dimensions cannot be less than or equal to zero."))):(this.play=function(){this._playing=!0,this.map.triggerRepaint();},this.pause=function(){this._playing&&(this.prepare(),this._playing=!1);},this._finishLoading());}getCanvas(){return this.canvas}onAdd(t){this.map=t,this.load(),this.canvas&&this.animate&&this.play();}onRemove(){this.pause();}prepare(){let e=!1;if(this.canvas.width!==this.width&&(this.width=this.canvas.width,e=!0),this.canvas.height!==this.height&&(this.height=this.canvas.height,e=!0),this._hasInvalidDimensions())return;if(0===Object.keys(this.tiles).length)return;const i=this.map.painter.context,o=i.gl;this.boundsBuffer||(this.boundsBuffer=i.createVertexBuffer(this._boundsArray,U.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?(e||this._playing)&&this.texture.update(this.canvas,{premultiply:!0}):this.texture=new b(i,this.canvas,o.RGBA,{premultiply:!0});for(const t in this.tiles){const e=this.tiles[t];"loaded"!==e.state&&(e.state="loaded",e.texture=this.texture);}}serialize(){return {type:"canvas",coordinates:this.coordinates}}hasTransition(){return this._playing}_hasInvalidDimensions(){for(const t of [this.canvas.width,this.canvas.height])if(isNaN(t)||t<=0)return !0;return !1}}};function V(e,i){const o=t.create();return t.translate(o,o,[1,1,0]),t.scale(o,o,[.5*e.width,.5*e.height,1]),t.multiply(o,o,e.calculatePosMatrix(i.toUnwrapped()))}function q(t,e,i,o,s,a){const r=function(t,e,i){if(t)for(const o of t){const t=e[o];if(t&&t.source===i&&"fill-extrusion"===t.type)return !0}else for(const t in e){const o=e[t];if(o.source===i&&"fill-extrusion"===o.type)return !0}return !1}(s&&s.layers,e,t.id),n=a.maxPitchScaleFactor(),l=t.tilesIn(o,n,r);l.sort(G);const c=[];for(const o of l)c.push({wrappedTileID:o.tileID.wrapped().key,queryResults:o.tile.queryRenderedFeatures(e,i,t._state,o.queryGeometry,o.cameraQueryGeometry,o.scale,s,a,n,V(t.transform,o.tileID))});const h=function(t){const e={},i={};for(const o of t){const t=o.queryResults,s=o.wrappedTileID,a=i[s]=i[s]||{};for(const i in t){const o=t[i],s=a[i]=a[i]||{},r=e[i]=e[i]||[];for(const t of o)s[t.featureIndex]||(s[t.featureIndex]=!0,r.push(t));}}return e}(c);for(const e in h)h[e].forEach((e=>{const i=e.feature,o=t.getFeatureState(i.layer["source-layer"],i.id);i.source=i.layer.source,i.layer["source-layer"]&&(i.sourceLayer=i.layer["source-layer"]),i.state=o;}));return h}function G(t,e){const i=t.tileID,o=e.tileID;return i.overscaledZ-o.overscaledZ||i.canonical.y-o.canonical.y||i.wrap-o.wrap||i.canonical.x-o.canonical.x}class j{constructor(e,i){this.tileID=e,this.uid=t.uniqueId(),this.uses=0,this.tileSize=i,this.buckets={},this.expirationTime=null,this.queryPadding=0,this.hasSymbolBuckets=!1,this.hasRTLText=!1,this.dependencies={},this.expiredRequestCount=0,this.state="loading";}registerFadeDuration(e){const i=e+this.timeAdded;i<t.exported.now()||this.fadeEndTime&&i<this.fadeEndTime||(this.fadeEndTime=i);}wasRequested(){return "errored"===this.state||"loaded"===this.state||"reloading"===this.state}loadVectorData(e,i,o){if(this.hasData()&&this.unloadVectorData(),this.state="loaded",e){e.featureIndex&&(this.latestFeatureIndex=e.featureIndex,e.rawTileData?(this.latestRawTileData=e.rawTileData,this.latestFeatureIndex.rawTileData=e.rawTileData):this.latestRawTileData&&(this.latestFeatureIndex.rawTileData=this.latestRawTileData)),this.collisionBoxArray=e.collisionBoxArray,this.buckets=function(t,e){const i={};if(!e)return i;for(const o of t){const t=o.layerIds.map((t=>e.getLayer(t))).filter(Boolean);if(0!==t.length){o.layers=t,o.stateDependentLayerIds&&(o.stateDependentLayers=o.stateDependentLayerIds.map((e=>t.filter((t=>t.id===e))[0])));for(const e of t)i[e.id]=o;}}return i}(e.buckets,i.style),this.hasSymbolBuckets=!1;for(const e in this.buckets){const i=this.buckets[e];if(i instanceof t.SymbolBucket){if(this.hasSymbolBuckets=!0,!o)break;i.justReloaded=!0;}}if(this.hasRTLText=!1,this.hasSymbolBuckets)for(const e in this.buckets){const i=this.buckets[e];if(i instanceof t.SymbolBucket&&i.hasRTLText){this.hasRTLText=!0,t.lazyLoadRTLTextPlugin();break}}this.queryPadding=0;for(const t in this.buckets){const e=this.buckets[t];this.queryPadding=Math.max(this.queryPadding,i.style.getLayer(t).queryRadius(e));}e.imageAtlas&&(this.imageAtlas=e.imageAtlas),e.glyphAtlasImage&&(this.glyphAtlasImage=e.glyphAtlasImage);}else this.collisionBoxArray=new t.CollisionBoxArray;}unloadVectorData(){for(const t in this.buckets)this.buckets[t].destroy();this.buckets={},this.imageAtlasTexture&&this.imageAtlasTexture.destroy(),this.imageAtlas&&(this.imageAtlas=null),this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy(),this.latestFeatureIndex=null,this.state="unloaded";}getBucket(t){return this.buckets[t.id]}upload(t){for(const e in this.buckets){const i=this.buckets[e];i.uploadPending()&&i.upload(t);}const e=t.gl;this.imageAtlas&&!this.imageAtlas.uploaded&&(this.imageAtlasTexture=new b(t,this.imageAtlas.image,e.RGBA),this.imageAtlas.uploaded=!0),this.glyphAtlasImage&&(this.glyphAtlasTexture=new b(t,this.glyphAtlasImage,e.ALPHA),this.glyphAtlasImage=null);}prepare(t){this.imageAtlas&&this.imageAtlas.patchUpdatedImages(t,this.imageAtlasTexture);}queryRenderedFeatures(t,e,i,o,s,a,r,n,l,c){return this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData?this.latestFeatureIndex.query({queryGeometry:o,cameraQueryGeometry:s,scale:a,tileSize:this.tileSize,pixelPosMatrix:c,transform:n,params:r,queryPadding:this.queryPadding*l},t,e,i):{}}querySourceFeatures(e,i){const o=this.latestFeatureIndex;if(!o||!o.rawTileData)return;const s=o.loadVTLayers(),a=i?i.sourceLayer:"",r=s._geojsonTileLayer||s[a];if(!r)return;const n=t.createFilter(i&&i.filter),{z:l,x:c,y:h}=this.tileID.canonical,u={z:l,x:c,y:h};for(let i=0;i<r.length;i++){const s=r.feature(i);if(n.needGeometry){const e=t.toEvaluationFeature(s,!0);if(!n.filter(new t.EvaluationParameters(this.tileID.overscaledZ),e,this.tileID.canonical))continue}else if(!n.filter(new t.EvaluationParameters(this.tileID.overscaledZ),s))continue;const d=o.getId(s,a),_=new t.Feature(s,l,c,h,d);_.tile=u,e.push(_);}}hasData(){return "loaded"===this.state||"reloading"===this.state||"expired"===this.state}patternsLoaded(){return this.imageAtlas&&!!Object.keys(this.imageAtlas.patternPositions).length}setExpiryData(e){const i=this.expirationTime;if(e.cacheControl){const i=t.parseCacheControl(e.cacheControl);i["max-age"]&&(this.expirationTime=Date.now()+1e3*i["max-age"]);}else e.expires&&(this.expirationTime=new Date(e.expires).getTime());if(this.expirationTime){const t=Date.now();let e=!1;if(this.expirationTime>t)e=!1;else if(i)if(this.expirationTime<i)e=!0;else {const o=this.expirationTime-i;o?this.expirationTime=t+Math.max(o,3e4):e=!0;}else e=!0;e?(this.expiredRequestCount++,this.state="expired"):this.expiredRequestCount=0;}}getExpiryTimeout(){if(this.expirationTime)return this.expiredRequestCount?1e3*(1<<Math.min(this.expiredRequestCount-1,31)):Math.min(this.expirationTime-(new Date).getTime(),Math.pow(2,31)-1)}setFeatureState(t,e){if(!this.latestFeatureIndex||!this.latestFeatureIndex.rawTileData||0===Object.keys(t).length)return;const i=this.latestFeatureIndex.loadVTLayers();for(const o in this.buckets){if(!e.style.hasLayer(o))continue;const s=this.buckets[o],a=s.layers[0].sourceLayer||"_geojsonTileLayer",r=i[a],n=t[a];if(!r||!n||0===Object.keys(n).length)continue;s.update(n,r,this.imageAtlas&&this.imageAtlas.patternPositions||{});const l=e&&e.style&&e.style.getLayer(o);l&&(this.queryPadding=Math.max(this.queryPadding,l.queryRadius(s)));}}holdingForFade(){return void 0!==this.symbolFadeHoldUntil}symbolFadeFinished(){return !this.symbolFadeHoldUntil||this.symbolFadeHoldUntil<t.exported.now()}clearFadeHold(){this.symbolFadeHoldUntil=void 0;}setHoldDuration(e){this.symbolFadeHoldUntil=t.exported.now()+e;}setDependencies(t,e){const i={};for(const t of e)i[t]=!0;this.dependencies[t]=i;}hasDependency(t,e){for(const i of t){const t=this.dependencies[i];if(t)for(const i of e)if(t[i])return !0}return !1}}class ${constructor(t,e){this.max=t,this.onRemove=e,this.reset();}reset(){for(const t in this.data)for(const e of this.data[t])e.timeout&&clearTimeout(e.timeout),this.onRemove(e.value);return this.data={},this.order=[],this}add(t,e,i){const o=t.wrapped().key;void 0===this.data[o]&&(this.data[o]=[]);const s={value:e,timeout:void 0};if(void 0!==i&&(s.timeout=setTimeout((()=>{this.remove(t,s);}),i)),this.data[o].push(s),this.order.push(o),this.order.length>this.max){const t=this._getAndRemoveByKey(this.order[0]);t&&this.onRemove(t);}return this}has(t){return t.wrapped().key in this.data}getAndRemove(t){return this.has(t)?this._getAndRemoveByKey(t.wrapped().key):null}_getAndRemoveByKey(t){const e=this.data[t].shift();return e.timeout&&clearTimeout(e.timeout),0===this.data[t].length&&delete this.data[t],this.order.splice(this.order.indexOf(t),1),e.value}getByKey(t){const e=this.data[t];return e?e[0].value:null}get(t){return this.has(t)?this.data[t.wrapped().key][0].value:null}remove(t,e){if(!this.has(t))return this;const i=t.wrapped().key,o=void 0===e?0:this.data[i].indexOf(e),s=this.data[i][o];return this.data[i].splice(o,1),s.timeout&&clearTimeout(s.timeout),0===this.data[i].length&&delete this.data[i],this.onRemove(s.value),this.order.splice(this.order.indexOf(i),1),this}setMaxSize(t){for(this.max=t;this.order.length>this.max;){const t=this._getAndRemoveByKey(this.order[0]);t&&this.onRemove(t);}return this}filter(t){const e=[];for(const i in this.data)for(const o of this.data[i])t(o.value)||e.push(o);for(const t of e)this.remove(t.value.tileID,t);}}class W{constructor(){this.state={},this.stateChanges={},this.deletedStates={};}updateState(e,i,o){const s=String(i);if(this.stateChanges[e]=this.stateChanges[e]||{},this.stateChanges[e][s]=this.stateChanges[e][s]||{},t.extend(this.stateChanges[e][s],o),null===this.deletedStates[e]){this.deletedStates[e]={};for(const t in this.state[e])t!==s&&(this.deletedStates[e][t]=null);}else if(this.deletedStates[e]&&null===this.deletedStates[e][s]){this.deletedStates[e][s]={};for(const t in this.state[e][s])o[t]||(this.deletedStates[e][s][t]=null);}else for(const t in o)this.deletedStates[e]&&this.deletedStates[e][s]&&null===this.deletedStates[e][s][t]&&delete this.deletedStates[e][s][t];}removeFeatureState(t,e,i){if(null===this.deletedStates[t])return;const o=String(e);if(this.deletedStates[t]=this.deletedStates[t]||{},i&&void 0!==e)null!==this.deletedStates[t][o]&&(this.deletedStates[t][o]=this.deletedStates[t][o]||{},this.deletedStates[t][o][i]=null);else if(void 0!==e)if(this.stateChanges[t]&&this.stateChanges[t][o])for(i in this.deletedStates[t][o]={},this.stateChanges[t][o])this.deletedStates[t][o][i]=null;else this.deletedStates[t][o]=null;else this.deletedStates[t]=null;}getState(e,i){const o=String(i),s=t.extend({},(this.state[e]||{})[o],(this.stateChanges[e]||{})[o]);if(null===this.deletedStates[e])return {};if(this.deletedStates[e]){const t=this.deletedStates[e][i];if(null===t)return {};for(const e in t)delete s[e];}return s}initializeTileState(t,e){t.setFeatureState(this.state,e);}coalesceChanges(e,i){const o={};for(const e in this.stateChanges){this.state[e]=this.state[e]||{};const i={};for(const o in this.stateChanges[e])this.state[e][o]||(this.state[e][o]={}),t.extend(this.state[e][o],this.stateChanges[e][o]),i[o]=this.state[e][o];o[e]=i;}for(const e in this.deletedStates){this.state[e]=this.state[e]||{};const i={};if(null===this.deletedStates[e])for(const t in this.state[e])i[t]={},this.state[e][t]={};else for(const t in this.deletedStates[e]){if(null===this.deletedStates[e][t])this.state[e][t]={};else for(const i of Object.keys(this.deletedStates[e][t]))delete this.state[e][t][i];i[t]=this.state[e][t];}o[e]=o[e]||{},t.extend(o[e],i);}if(this.stateChanges={},this.deletedStates={},0!==Object.keys(o).length)for(const t in e)e[t].setFeatureState(o,i);}}class X extends t.Evented{constructor(e,i,o){super(),this.id=e,this.dispatcher=o,this.on("data",(t=>{"source"===t.dataType&&"metadata"===t.sourceDataType&&(this._sourceLoaded=!0),this._sourceLoaded&&!this._paused&&"source"===t.dataType&&"content"===t.sourceDataType&&(this.reload(),this.transform&&this.update(this.transform));})),this.on("error",(()=>{this._sourceErrored=!0;})),this._source=function(e,i,o,s){const a=new Z[i.type](e,i,o,s);if(a.id!==e)throw new Error(`Expected Source id to be ${e} instead of ${a.id}`);return t.bindAll(["load","abort","unload","serialize","prepare"],a),a}(e,i,o,this),this._tiles={},this._cache=new $(0,this._unloadTile.bind(this)),this._timers={},this._cacheTimers={},this._maxTileCacheSize=null,this._loadedParentTiles={},this._coveredTiles={},this._state=new W;}onAdd(t){this.map=t,this._maxTileCacheSize=t?t._maxTileCacheSize:null,this._source&&this._source.onAdd&&this._source.onAdd(t);}onRemove(t){this._source&&this._source.onRemove&&this._source.onRemove(t);}loaded(){if(this._sourceErrored)return !0;if(!this._sourceLoaded)return !1;if(!this._source.loaded())return !1;for(const t in this._tiles){const e=this._tiles[t];if("loaded"!==e.state&&"errored"!==e.state)return !1}return !0}getSource(){return this._source}pause(){this._paused=!0;}resume(){if(!this._paused)return;const t=this._shouldReloadOnResume;this._paused=!1,this._shouldReloadOnResume=!1,t&&this.reload(),this.transform&&this.update(this.transform);}_loadTile(t,e){return this._source.loadTile(t,e)}_unloadTile(t){if(this._source.unloadTile)return this._source.unloadTile(t,(()=>{}))}_abortTile(t){if(this._source.abortTile)return this._source.abortTile(t,(()=>{}))}serialize(){return this._source.serialize()}prepare(t){this._source.prepare&&this._source.prepare(),this._state.coalesceChanges(this._tiles,this.map?this.map.painter:null);for(const e in this._tiles){const i=this._tiles[e];i.upload(t),i.prepare(this.map.style.imageManager);}}getIds(){return Object.values(this._tiles).map((t=>t.tileID)).sort(H).map((t=>t.key))}getRenderableIds(e){const i=[];for(const t in this._tiles)this._isIdRenderable(t,e)&&i.push(this._tiles[t]);return e?i.sort(((e,i)=>{const o=e.tileID,s=i.tileID,a=new t.Point(o.canonical.x,o.canonical.y)._rotate(this.transform.angle),r=new t.Point(s.canonical.x,s.canonical.y)._rotate(this.transform.angle);return o.overscaledZ-s.overscaledZ||r.y-a.y||r.x-a.x})).map((t=>t.tileID.key)):i.map((t=>t.tileID)).sort(H).map((t=>t.key))}hasRenderableParent(t){const e=this.findLoadedParent(t,0);return !!e&&this._isIdRenderable(e.tileID.key)}_isIdRenderable(t,e){return this._tiles[t]&&this._tiles[t].hasData()&&!this._coveredTiles[t]&&(e||!this._tiles[t].holdingForFade())}reload(){if(this._paused)this._shouldReloadOnResume=!0;else {this._cache.reset();for(const t in this._tiles)"errored"!==this._tiles[t].state&&this._reloadTile(t,"reloading");}}_reloadTile(t,e){const i=this._tiles[t];i&&("loading"!==i.state&&(i.state=e),this._loadTile(i,this._tileLoaded.bind(this,i,t,e)));}_tileLoaded(e,i,o,s){if(s)return e.state="errored",void(404!==s.status?this._source.fire(new t.ErrorEvent(s,{tile:e})):this.update(this.transform));e.timeAdded=t.exported.now(),"expired"===o&&(e.refreshedUponExpiration=!0),this._setTileReloadTimer(i,e),"raster-dem"===this.getSource().type&&e.dem&&this._backfillDEM(e),this._state.initializeTileState(e,this.map?this.map.painter:null),this._source.fire(new t.Event("data",{dataType:"source",tile:e,coord:e.tileID}));}_backfillDEM(t){const e=this.getRenderableIds();for(let o=0;o<e.length;o++){const s=e[o];if(t.neighboringTiles&&t.neighboringTiles[s]){const e=this.getTileByID(s);i(t,e),i(e,t);}}function i(t,e){t.needsHillshadePrepare=!0;let i=e.tileID.canonical.x-t.tileID.canonical.x;const o=e.tileID.canonical.y-t.tileID.canonical.y,s=Math.pow(2,t.tileID.canonical.z),a=e.tileID.key;0===i&&0===o||Math.abs(o)>1||(Math.abs(i)>1&&(1===Math.abs(i+s)?i+=s:1===Math.abs(i-s)&&(i-=s)),e.dem&&t.dem&&(t.dem.backfillBorder(e.dem,i,o),t.neighboringTiles&&t.neighboringTiles[a]&&(t.neighboringTiles[a].backfilled=!0)));}}getTile(t){return this.getTileByID(t.key)}getTileByID(t){return this._tiles[t]}_retainLoadedChildren(t,e,i,o){for(const s in this._tiles){let a=this._tiles[s];if(o[s]||!a.hasData()||a.tileID.overscaledZ<=e||a.tileID.overscaledZ>i)continue;let r=a.tileID;for(;a&&a.tileID.overscaledZ>e+1;){const t=a.tileID.scaledTo(a.tileID.overscaledZ-1);a=this._tiles[t.key],a&&a.hasData()&&(r=t);}let n=r;for(;n.overscaledZ>e;)if(n=n.scaledTo(n.overscaledZ-1),t[n.key]){o[r.key]=r;break}}}findLoadedParent(t,e){if(t.key in this._loadedParentTiles){const i=this._loadedParentTiles[t.key];return i&&i.tileID.overscaledZ>=e?i:null}for(let i=t.overscaledZ-1;i>=e;i--){const e=t.scaledTo(i),o=this._getLoadedTile(e);if(o)return o}}_getLoadedTile(t){const e=this._tiles[t.key];return e&&e.hasData()?e:this._cache.getByKey(t.wrapped().key)}updateCacheSize(t){const e=Math.ceil(t.width/this._source.tileSize)+1,i=Math.ceil(t.height/this._source.tileSize)+1,o=Math.floor(e*i*5),s="number"==typeof this._maxTileCacheSize?Math.min(this._maxTileCacheSize,o):o;this._cache.setMaxSize(s);}handleWrapJump(t){const e=Math.round((t-(void 0===this._prevLng?t:this._prevLng))/360);if(this._prevLng=t,e){const t={};for(const i in this._tiles){const o=this._tiles[i];o.tileID=o.tileID.unwrapTo(o.tileID.wrap+e),t[o.tileID.key]=o;}this._tiles=t;for(const t in this._timers)clearTimeout(this._timers[t]),delete this._timers[t];for(const t in this._tiles)this._setTileReloadTimer(t,this._tiles[t]);}}update(e){if(this.transform=e,!this._sourceLoaded||this._paused)return;let i;this.updateCacheSize(e),this.handleWrapJump(this.transform.center.lng),this._coveredTiles={},this.used?this._source.tileID?i=e.getVisibleUnwrappedCoordinates(this._source.tileID).map((e=>new t.OverscaledTileID(e.canonical.z,e.wrap,e.canonical.z,e.canonical.x,e.canonical.y))):(i=e.coveringTiles({tileSize:this._source.tileSize,minzoom:this._source.minzoom,maxzoom:this._source.maxzoom,roundZoom:this._source.roundZoom,reparseOverscaled:this._source.reparseOverscaled}),this._source.hasTile&&(i=i.filter((t=>this._source.hasTile(t))))):i=[];const o=e.coveringZoomLevel(this._source),s=Math.max(o-X.maxOverzooming,this._source.minzoom),a=Math.max(o+X.maxUnderzooming,this._source.minzoom),r=this._updateRetainedTiles(i,o);if(K(this._source.type)){const e={},i={},n=Object.keys(r);for(const o of n){const a=r[o],n=this._tiles[o];if(!n||n.fadeEndTime&&n.fadeEndTime<=t.exported.now())continue;const l=this.findLoadedParent(a,s);l&&(this._addTile(l.tileID),e[l.tileID.key]=l.tileID),i[o]=a;}this._retainLoadedChildren(i,o,a,r);for(const t in e)r[t]||(this._coveredTiles[t]=!0,r[t]=e[t]);}for(const t in r)this._tiles[t].clearFadeHold();const n=t.keysDifference(this._tiles,r);for(const t of n){const e=this._tiles[t];e.hasSymbolBuckets&&!e.holdingForFade()?e.setHoldDuration(this.map._fadeDuration):e.hasSymbolBuckets&&!e.symbolFadeFinished()||this._removeTile(t);}this._updateLoadedParentTileCache();}releaseSymbolFadeTiles(){for(const t in this._tiles)this._tiles[t].holdingForFade()&&this._removeTile(t);}_updateRetainedTiles(t,e){const i={},o={},s=Math.max(e-X.maxOverzooming,this._source.minzoom),a=Math.max(e+X.maxUnderzooming,this._source.minzoom),r={};for(const o of t){const t=this._addTile(o);i[o.key]=o,t.hasData()||e<this._source.maxzoom&&(r[o.key]=o);}this._retainLoadedChildren(r,e,a,i);for(const a of t){let t=this._tiles[a.key];if(t.hasData())continue;if(e+1>this._source.maxzoom){const t=a.children(this._source.maxzoom)[0],e=this.getTile(t);if(e&&e.hasData()){i[t.key]=t;continue}}else {const t=a.children(this._source.maxzoom);if(i[t[0].key]&&i[t[1].key]&&i[t[2].key]&&i[t[3].key])continue}let r=t.wasRequested();for(let e=a.overscaledZ-1;e>=s;--e){const s=a.scaledTo(e);if(o[s.key])break;if(o[s.key]=!0,t=this.getTile(s),!t&&r&&(t=this._addTile(s)),t&&(i[s.key]=s,r=t.wasRequested(),t.hasData()))break}}return i}_updateLoadedParentTileCache(){this._loadedParentTiles={};for(const t in this._tiles){const e=[];let i,o=this._tiles[t].tileID;for(;o.overscaledZ>0;){if(o.key in this._loadedParentTiles){i=this._loadedParentTiles[o.key];break}e.push(o.key);const t=o.scaledTo(o.overscaledZ-1);if(i=this._getLoadedTile(t),i)break;o=t;}for(const t of e)this._loadedParentTiles[t]=i;}}_addTile(e){let i=this._tiles[e.key];if(i)return i;i=this._cache.getAndRemove(e),i&&(this._setTileReloadTimer(e.key,i),i.tileID=e,this._state.initializeTileState(i,this.map?this.map.painter:null),this._cacheTimers[e.key]&&(clearTimeout(this._cacheTimers[e.key]),delete this._cacheTimers[e.key],this._setTileReloadTimer(e.key,i)));const o=i;return i||(i=new j(e,this._source.tileSize*e.overscaleFactor()),this._loadTile(i,this._tileLoaded.bind(this,i,e.key,i.state))),i.uses++,this._tiles[e.key]=i,o||this._source.fire(new t.Event("dataloading",{tile:i,coord:i.tileID,dataType:"source"})),i}_setTileReloadTimer(t,e){t in this._timers&&(clearTimeout(this._timers[t]),delete this._timers[t]);const i=e.getExpiryTimeout();i&&(this._timers[t]=setTimeout((()=>{this._reloadTile(t,"expired"),delete this._timers[t];}),i));}_removeTile(t){const e=this._tiles[t];e&&(e.uses--,delete this._tiles[t],this._timers[t]&&(clearTimeout(this._timers[t]),delete this._timers[t]),e.uses>0||(e.hasData()&&"reloading"!==e.state?this._cache.add(e.tileID,e,e.getExpiryTimeout()):(e.aborted=!0,this._abortTile(e),this._unloadTile(e))));}clearTiles(){this._shouldReloadOnResume=!1,this._paused=!1;for(const t in this._tiles)this._removeTile(t);this._cache.reset();}tilesIn(e,i,o){const s=[],a=this.transform;if(!a)return s;const r=o?a.getCameraQueryGeometry(e):e,n=e.map((t=>a.pointCoordinate(t))),l=r.map((t=>a.pointCoordinate(t))),c=this.getIds();let h=1/0,u=1/0,d=-1/0,_=-1/0;for(const t of l)h=Math.min(h,t.x),u=Math.min(u,t.y),d=Math.max(d,t.x),_=Math.max(_,t.y);for(let e=0;e<c.length;e++){const o=this._tiles[c[e]];if(o.holdingForFade())continue;const r=o.tileID,m=Math.pow(2,a.zoom-o.tileID.overscaledZ),p=i*o.queryPadding*t.EXTENT/o.tileSize/m,f=[r.getTilePoint(new t.MercatorCoordinate(h,u)),r.getTilePoint(new t.MercatorCoordinate(d,_))];if(f[0].x-p<t.EXTENT&&f[0].y-p<t.EXTENT&&f[1].x+p>=0&&f[1].y+p>=0){const t=n.map((t=>r.getTilePoint(t))),e=l.map((t=>r.getTilePoint(t)));s.push({tile:o,tileID:r,queryGeometry:t,cameraQueryGeometry:e,scale:m});}}return s}getVisibleCoordinates(t){const e=this.getRenderableIds(t).map((t=>this._tiles[t].tileID));for(const t of e)t.posMatrix=this.transform.calculatePosMatrix(t.toUnwrapped());return e}hasTransition(){if(this._source.hasTransition())return !0;if(K(this._source.type))for(const e in this._tiles){const i=this._tiles[e];if(void 0!==i.fadeEndTime&&i.fadeEndTime>=t.exported.now())return !0}return !1}setFeatureState(t,e,i){this._state.updateState(t=t||"_geojsonTileLayer",e,i);}removeFeatureState(t,e,i){this._state.removeFeatureState(t=t||"_geojsonTileLayer",e,i);}getFeatureState(t,e){return this._state.getState(t=t||"_geojsonTileLayer",e)}setDependencies(t,e,i){const o=this._tiles[t];o&&o.setDependencies(e,i);}reloadTilesForDependencies(t,e){for(const i in this._tiles)this._tiles[i].hasDependency(t,e)&&this._reloadTile(i,"reloading");this._cache.filter((i=>!i.hasDependency(t,e)));}}function H(t,e){const i=Math.abs(2*t.wrap)-+(t.wrap<0),o=Math.abs(2*e.wrap)-+(e.wrap<0);return t.overscaledZ-e.overscaledZ||o-i||e.canonical.y-t.canonical.y||e.canonical.x-t.canonical.x}function K(t){return "raster"===t||"image"===t||"video"===t}X.maxOverzooming=10,X.maxUnderzooming=3;const Y="mapboxgl_preloaded_worker_pool";class J{constructor(){this.active={};}acquire(t){if(!this.workers)for(this.workers=[];this.workers.length<J.workerCount;)this.workers.push(new Worker(Es.workerUrl));return this.active[t]=!0,this.workers.slice()}release(t){delete this.active[t],0===this.numActive()&&(this.workers.forEach((t=>{t.terminate();})),this.workers=null);}isPreloaded(){return !!this.active[Y]}numActive(){return Object.keys(this.active).length}}const Q=Math.floor(t.exported.hardwareConcurrency/2);let tt;function et(){return tt||(tt=new J),tt}function it(e,i){const o={};for(const t in e)"ref"!==t&&(o[t]=e[t]);return t.refProperties.forEach((t=>{t in i&&(o[t]=i[t]);})),o}function ot(t){t=t.slice();const e=Object.create(null);for(let i=0;i<t.length;i++)e[t[i].id]=t[i];for(let i=0;i<t.length;i++)"ref"in t[i]&&(t[i]=it(t[i],e[t[i].ref]));return t}J.workerCount=Math.max(Math.min(Q,6),1);const st={setStyle:"setStyle",addLayer:"addLayer",removeLayer:"removeLayer",setPaintProperty:"setPaintProperty",setLayoutProperty:"setLayoutProperty",setFilter:"setFilter",addSource:"addSource",removeSource:"removeSource",setGeoJSONSourceData:"setGeoJSONSourceData",setLayerZoomRange:"setLayerZoomRange",setLayerProperty:"setLayerProperty",setCenter:"setCenter",setZoom:"setZoom",setBearing:"setBearing",setPitch:"setPitch",setSprite:"setSprite",setGlyphs:"setGlyphs",setTransition:"setTransition",setLight:"setLight"};function at(t,e,i){i.push({command:st.addSource,args:[t,e[t]]});}function rt(t,e,i){e.push({command:st.removeSource,args:[t]}),i[t]=!0;}function nt(t,e,i,o){rt(t,i,o),at(t,e,i);}function lt(t,e,i){let o;for(o in t[i])if(Object.prototype.hasOwnProperty.call(t[i],o)&&"data"!==o&&!a(t[i][o],e[i][o]))return !1;for(o in e[i])if(Object.prototype.hasOwnProperty.call(e[i],o)&&"data"!==o&&!a(t[i][o],e[i][o]))return !1;return !0}function ct(t,e,i,o,s,r){let n;for(n in e=e||{},t=t||{})Object.prototype.hasOwnProperty.call(t,n)&&(a(t[n],e[n])||i.push({command:r,args:[o,n,e[n],s]}));for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&!Object.prototype.hasOwnProperty.call(t,n)&&(a(t[n],e[n])||i.push({command:r,args:[o,n,e[n],s]}));}function ht(t){return t.id}function ut(t,e){return t[e.id]=e,t}class dt{constructor(t,e){this.reset(t,e);}reset(t,e){this.points=t||[],this._distances=[0];for(let t=1;t<this.points.length;t++)this._distances[t]=this._distances[t-1]+this.points[t].dist(this.points[t-1]);this.length=this._distances[this._distances.length-1],this.padding=Math.min(e||0,.5*this.length),this.paddedLength=this.length-2*this.padding;}lerp(e){if(1===this.points.length)return this.points[0];e=t.clamp(e,0,1);let i=1,o=this._distances[i];const s=e*this.paddedLength+this.padding;for(;o<s&&i<this._distances.length;)o=this._distances[++i];const a=i-1,r=this._distances[a],n=o-r,l=n>0?(s-r)/n:0;return this.points[a].mult(1-l).add(this.points[i].mult(l))}}class _t{constructor(t,e,i){const o=this.boxCells=[],s=this.circleCells=[];this.xCellCount=Math.ceil(t/i),this.yCellCount=Math.ceil(e/i);for(let t=0;t<this.xCellCount*this.yCellCount;t++)o.push([]),s.push([]);this.circleKeys=[],this.boxKeys=[],this.bboxes=[],this.circles=[],this.width=t,this.height=e,this.xScale=this.xCellCount/t,this.yScale=this.yCellCount/e,this.boxUid=0,this.circleUid=0;}keysLength(){return this.boxKeys.length+this.circleKeys.length}insert(t,e,i,o,s){this._forEachCell(e,i,o,s,this._insertBoxCell,this.boxUid++),this.boxKeys.push(t),this.bboxes.push(e),this.bboxes.push(i),this.bboxes.push(o),this.bboxes.push(s);}insertCircle(t,e,i,o){this._forEachCell(e-o,i-o,e+o,i+o,this._insertCircleCell,this.circleUid++),this.circleKeys.push(t),this.circles.push(e),this.circles.push(i),this.circles.push(o);}_insertBoxCell(t,e,i,o,s,a){this.boxCells[s].push(a);}_insertCircleCell(t,e,i,o,s,a){this.circleCells[s].push(a);}_query(t,e,i,o,s,a){if(i<0||t>this.width||o<0||e>this.height)return !s&&[];const r=[];if(t<=0&&e<=0&&this.width<=i&&this.height<=o){if(s)return !0;for(let t=0;t<this.boxKeys.length;t++)r.push({key:this.boxKeys[t],x1:this.bboxes[4*t],y1:this.bboxes[4*t+1],x2:this.bboxes[4*t+2],y2:this.bboxes[4*t+3]});for(let t=0;t<this.circleKeys.length;t++){const e=this.circles[3*t],i=this.circles[3*t+1],o=this.circles[3*t+2];r.push({key:this.circleKeys[t],x1:e-o,y1:i-o,x2:e+o,y2:i+o});}return a?r.filter(a):r}return this._forEachCell(t,e,i,o,this._queryCell,r,{hitTest:s,seenUids:{box:{},circle:{}}},a),s?r.length>0:r}_queryCircle(t,e,i,o,s){const a=t-i,r=t+i,n=e-i,l=e+i;if(r<0||a>this.width||l<0||n>this.height)return !o&&[];const c=[];return this._forEachCell(a,n,r,l,this._queryCellCircle,c,{hitTest:o,circle:{x:t,y:e,radius:i},seenUids:{box:{},circle:{}}},s),o?c.length>0:c}query(t,e,i,o,s){return this._query(t,e,i,o,!1,s)}hitTest(t,e,i,o,s){return this._query(t,e,i,o,!0,s)}hitTestCircle(t,e,i,o){return this._queryCircle(t,e,i,!0,o)}_queryCell(t,e,i,o,s,a,r,n){const l=r.seenUids,c=this.boxCells[s];if(null!==c){const s=this.bboxes;for(const h of c)if(!l.box[h]){l.box[h]=!0;const c=4*h;if(t<=s[c+2]&&e<=s[c+3]&&i>=s[c+0]&&o>=s[c+1]&&(!n||n(this.boxKeys[h]))){if(r.hitTest)return a.push(!0),!0;a.push({key:this.boxKeys[h],x1:s[c],y1:s[c+1],x2:s[c+2],y2:s[c+3]});}}}const h=this.circleCells[s];if(null!==h){const s=this.circles;for(const c of h)if(!l.circle[c]){l.circle[c]=!0;const h=3*c;if(this._circleAndRectCollide(s[h],s[h+1],s[h+2],t,e,i,o)&&(!n||n(this.circleKeys[c]))){if(r.hitTest)return a.push(!0),!0;{const t=s[h],e=s[h+1],i=s[h+2];a.push({key:this.circleKeys[c],x1:t-i,y1:e-i,x2:t+i,y2:e+i});}}}}}_queryCellCircle(t,e,i,o,s,a,r,n){const l=r.circle,c=r.seenUids,h=this.boxCells[s];if(null!==h){const t=this.bboxes;for(const e of h)if(!c.box[e]){c.box[e]=!0;const i=4*e;if(this._circleAndRectCollide(l.x,l.y,l.radius,t[i+0],t[i+1],t[i+2],t[i+3])&&(!n||n(this.boxKeys[e])))return a.push(!0),!0}}const u=this.circleCells[s];if(null!==u){const t=this.circles;for(const e of u)if(!c.circle[e]){c.circle[e]=!0;const i=3*e;if(this._circlesCollide(t[i],t[i+1],t[i+2],l.x,l.y,l.radius)&&(!n||n(this.circleKeys[e])))return a.push(!0),!0}}}_forEachCell(t,e,i,o,s,a,r,n){const l=this._convertToXCellCoord(t),c=this._convertToYCellCoord(e),h=this._convertToXCellCoord(i),u=this._convertToYCellCoord(o);for(let d=l;d<=h;d++)for(let l=c;l<=u;l++)if(s.call(this,t,e,i,o,this.xCellCount*l+d,a,r,n))return}_convertToXCellCoord(t){return Math.max(0,Math.min(this.xCellCount-1,Math.floor(t*this.xScale)))}_convertToYCellCoord(t){return Math.max(0,Math.min(this.yCellCount-1,Math.floor(t*this.yScale)))}_circlesCollide(t,e,i,o,s,a){const r=o-t,n=s-e,l=i+a;return l*l>r*r+n*n}_circleAndRectCollide(t,e,i,o,s,a,r){const n=(a-o)/2,l=Math.abs(t-(o+n));if(l>n+i)return !1;const c=(r-s)/2,h=Math.abs(e-(s+c));if(h>c+i)return !1;if(l<=n||h<=c)return !0;const u=l-n,d=h-c;return u*u+d*d<=i*i}}function mt(e,i,o,s,a){const r=t.create();return i?(t.scale(r,r,[1/a,1/a,1]),o||t.rotateZ(r,r,s.angle)):t.multiply(r,s.labelPlaneMatrix,e),r}function pt(e,i,o,s,a){if(i){const i=t.clone(e);return t.scale(i,i,[a,a,1]),o||t.rotateZ(i,i,-s.angle),i}return s.glCoordMatrix}function ft(e,i){const o=t.fromValues(e.x,e.y,0,1);St(o,o,i);const s=o[3];return {point:new t.Point(o[0]/s,o[1]/s),signedDistanceFromCamera:s}}function gt(t,e){return .5+t/e*.5}function xt(t,e){const i=t[0]/t[3],o=t[1]/t[3];return i>=-e[0]&&i<=e[0]&&o>=-e[1]&&o<=e[1]}function vt(e,i,o,s,a,r,n,l){const c=s?e.textSizeData:e.iconSizeData,h=t.evaluateSizeForZoom(c,o.transform.zoom),u=[256/o.width*2+1,256/o.height*2+1],d=s?e.text.dynamicLayoutVertexArray:e.icon.dynamicLayoutVertexArray;d.clear();const _=e.lineVertexArray,m=s?e.text.placedSymbolArray:e.icon.placedSymbolArray,p=o.transform.width/o.transform.height;let f=!1;for(let s=0;s<m.length;s++){const g=m.get(s);if(g.hidden||g.writingMode===t.WritingMode.vertical&&!f){Pt(g.numGlyphs,d);continue}f=!1;const x=t.fromValues(g.anchorX,g.anchorY,0,1);if(t.transformMat4(x,x,i),!xt(x,u)){Pt(g.numGlyphs,d);continue}const v=gt(o.transform.cameraToCenterDistance,x[3]),y=t.evaluateSizeForFeature(c,h,g),b=n?y/v:y*v,w=new t.Point(g.anchorX,g.anchorY),T=ft(w,a).point,E={},I=wt(g,b,!1,l,i,a,r,e.glyphOffsetArray,_,d,T,w,E,p);f=I.useVertical,(I.notEnoughRoom||f||I.needsFlipping&&wt(g,b,!0,l,i,a,r,e.glyphOffsetArray,_,d,T,w,E,p).notEnoughRoom)&&Pt(g.numGlyphs,d);}s?e.text.dynamicLayoutVertexBuffer.updateData(d):e.icon.dynamicLayoutVertexBuffer.updateData(d);}function yt(t,e,i,o,s,a,r,n,l,c,h){const u=n.glyphStartIndex+n.numGlyphs,d=n.lineStartIndex,_=n.lineStartIndex+n.lineLength,m=e.getoffsetX(n.glyphStartIndex),p=e.getoffsetX(u-1),f=Et(t*m,i,o,s,a,r,n.segment,d,_,l,c,h);if(!f)return null;const g=Et(t*p,i,o,s,a,r,n.segment,d,_,l,c,h);return g?{first:f,last:g}:null}function bt(e,i,o,s){return e===t.WritingMode.horizontal&&Math.abs(o.y-i.y)>Math.abs(o.x-i.x)*s?{useVertical:!0}:(e===t.WritingMode.vertical?i.y<o.y:i.x>o.x)?{needsFlipping:!0}:null}function wt(e,i,o,s,a,r,n,l,c,h,u,d,_,m){const p=i/24,f=e.lineOffsetX*p,g=e.lineOffsetY*p;let x;if(e.numGlyphs>1){const t=e.glyphStartIndex+e.numGlyphs,i=e.lineStartIndex,a=e.lineStartIndex+e.lineLength,h=yt(p,l,f,g,o,u,d,e,c,r,_);if(!h)return {notEnoughRoom:!0};const v=ft(h.first.point,n).point,y=ft(h.last.point,n).point;if(s&&!o){const t=bt(e.writingMode,v,y,m);if(t)return t}x=[h.first];for(let s=e.glyphStartIndex+1;s<t-1;s++)x.push(Et(p*l.getoffsetX(s),f,g,o,u,d,e.segment,i,a,c,r,_));x.push(h.last);}else {if(s&&!o){const i=ft(d,a).point,o=e.lineStartIndex+e.segment+1,s=new t.Point(c.getx(o),c.gety(o)),r=ft(s,a),n=r.signedDistanceFromCamera>0?r.point:Tt(d,s,i,1,a),l=bt(e.writingMode,i,n,m);if(l)return l}const i=Et(p*l.getoffsetX(e.glyphStartIndex),f,g,o,u,d,e.segment,e.lineStartIndex,e.lineStartIndex+e.lineLength,c,r,_);if(!i)return {notEnoughRoom:!0};x=[i];}for(const e of x)t.addDynamicAttributes(h,e.point,e.angle);return {}}function Tt(t,e,i,o,s){const a=ft(t.add(t.sub(e)._unit()),s).point,r=i.sub(a);return i.add(r._mult(o/r.mag()))}function Et(e,i,o,s,a,r,n,l,c,h,u,d){const _=s?e-i:e+i;let m=_>0?1:-1,p=0;s&&(m*=-1,p=Math.PI),m<0&&(p+=Math.PI);let f=m>0?l+n:l+n+1,g=a,x=a,v=0,y=0;const b=Math.abs(_),w=[];for(;v+y<=b;){if(f+=m,f<l||f>=c)return null;if(x=g,w.push(g),g=d[f],void 0===g){const e=new t.Point(h.getx(f),h.gety(f)),i=ft(e,u);if(i.signedDistanceFromCamera>0)g=d[f]=i.point;else {const i=f-m;g=Tt(0===v?r:new t.Point(h.getx(i),h.gety(i)),e,x,b-v+1,u);}}v+=y,y=x.dist(g);}const T=(b-v)/y,E=g.sub(x),I=E.mult(T)._add(x);I._add(E._unit()._perp()._mult(o*m));const P=p+Math.atan2(g.y-x.y,g.x-x.x);return w.push(I),{point:I,angle:P,path:w}}const It=new Float32Array([-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0]);function Pt(t,e){for(let i=0;i<t;i++){const t=e.length;e.resize(t+4),e.float32.set(It,3*t);}}function St(t,e,i){const o=e[0],s=e[1];return t[0]=i[0]*o+i[4]*s+i[12],t[1]=i[1]*o+i[5]*s+i[13],t[3]=i[3]*o+i[7]*s+i[15],t}const Ct=100;class zt{constructor(t,e=new _t(t.width+200,t.height+200,25),i=new _t(t.width+200,t.height+200,25)){this.transform=t,this.grid=e,this.ignoredGrid=i,this.pitchfactor=Math.cos(t._pitch)*t.cameraToCenterDistance,this.screenRightBoundary=t.width+Ct,this.screenBottomBoundary=t.height+Ct,this.gridRightBoundary=t.width+200,this.gridBottomBoundary=t.height+200;}placeCollisionBox(t,e,i,o,s){const a=this.projectAndGetPerspectiveRatio(o,t.anchorPointX,t.anchorPointY),r=i*a.perspectiveRatio,n=t.x1*r+a.point.x,l=t.y1*r+a.point.y,c=t.x2*r+a.point.x,h=t.y2*r+a.point.y;return !this.isInsideGrid(n,l,c,h)||!e&&this.grid.hitTest(n,l,c,h,s)?{box:[],offscreen:!1}:{box:[n,l,c,h],offscreen:this.isOffscreen(n,l,c,h)}}placeCollisionCircles(e,i,o,s,a,r,n,l,c,h,u,d,_){const m=[],p=new t.Point(i.anchorX,i.anchorY),f=ft(p,r),g=gt(this.transform.cameraToCenterDistance,f.signedDistanceFromCamera),x=(h?a/g:a*g)/t.ONE_EM,v=ft(p,n).point,y=yt(x,s,i.lineOffsetX*x,i.lineOffsetY*x,!1,v,p,i,o,n,{});let b=!1,w=!1,T=!0;if(y){const i=.5*d*g+_,o=new t.Point(-100,-100),s=new t.Point(this.screenRightBoundary,this.screenBottomBoundary),a=new dt,r=y.first,n=y.last;let h=[];for(let t=r.path.length-1;t>=1;t--)h.push(r.path[t]);for(let t=1;t<n.path.length;t++)h.push(n.path[t]);const p=2.5*i;if(l){const t=h.map((t=>ft(t,l)));h=t.some((t=>t.signedDistanceFromCamera<=0))?[]:t.map((t=>t.point));}let f=[];if(h.length>0){const e=h[0].clone(),i=h[0].clone();for(let t=1;t<h.length;t++)e.x=Math.min(e.x,h[t].x),e.y=Math.min(e.y,h[t].y),i.x=Math.max(i.x,h[t].x),i.y=Math.max(i.y,h[t].y);f=e.x>=o.x&&i.x<=s.x&&e.y>=o.y&&i.y<=s.y?[h]:i.x<o.x||e.x>s.x||i.y<o.y||e.y>s.y?[]:t.clipLine([h],o.x,o.y,s.x,s.y);}for(const t of f){a.reset(t,.25*i);let o=0;o=a.length<=.5*i?1:Math.ceil(a.paddedLength/p)+1;for(let t=0;t<o;t++){const s=t/Math.max(o-1,1),r=a.lerp(s),n=r.x+Ct,l=r.y+Ct;m.push(n,l,i,0);const h=n-i,d=l-i,_=n+i,p=l+i;if(T=T&&this.isOffscreen(h,d,_,p),w=w||this.isInsideGrid(h,d,_,p),!e&&this.grid.hitTestCircle(n,l,i,u)&&(b=!0,!c))return {circles:[],offscreen:!1,collisionDetected:b}}}}return {circles:!c&&b||!w?[]:m,offscreen:T,collisionDetected:b}}queryRenderedSymbols(e){if(0===e.length||0===this.grid.keysLength()&&0===this.ignoredGrid.keysLength())return {};const i=[];let o=1/0,s=1/0,a=-1/0,r=-1/0;for(const n of e){const e=new t.Point(n.x+Ct,n.y+Ct);o=Math.min(o,e.x),s=Math.min(s,e.y),a=Math.max(a,e.x),r=Math.max(r,e.y),i.push(e);}const n=this.grid.query(o,s,a,r).concat(this.ignoredGrid.query(o,s,a,r)),l={},c={};for(const e of n){const o=e.key;if(void 0===l[o.bucketInstanceId]&&(l[o.bucketInstanceId]={}),l[o.bucketInstanceId][o.featureIndex])continue;const s=[new t.Point(e.x1,e.y1),new t.Point(e.x2,e.y1),new t.Point(e.x2,e.y2),new t.Point(e.x1,e.y2)];t.polygonIntersectsPolygon(i,s)&&(l[o.bucketInstanceId][o.featureIndex]=!0,void 0===c[o.bucketInstanceId]&&(c[o.bucketInstanceId]=[]),c[o.bucketInstanceId].push(o.featureIndex));}return c}insertCollisionBox(t,e,i,o,s){(e?this.ignoredGrid:this.grid).insert({bucketInstanceId:i,featureIndex:o,collisionGroupID:s},t[0],t[1],t[2],t[3]);}insertCollisionCircles(t,e,i,o,s){const a=e?this.ignoredGrid:this.grid,r={bucketInstanceId:i,featureIndex:o,collisionGroupID:s};for(let e=0;e<t.length;e+=4)a.insertCircle(r,t[e],t[e+1],t[e+2]);}projectAndGetPerspectiveRatio(e,i,o){const s=t.fromValues(i,o,0,1);return St(s,s,e),{point:new t.Point((s[0]/s[3]+1)/2*this.transform.width+Ct,(-s[1]/s[3]+1)/2*this.transform.height+Ct),perspectiveRatio:.5+this.transform.cameraToCenterDistance/s[3]*.5}}isOffscreen(t,e,i,o){return i<Ct||t>=this.screenRightBoundary||o<Ct||e>this.screenBottomBoundary}isInsideGrid(t,e,i,o){return i>=0&&t<this.gridRightBoundary&&o>=0&&e<this.gridBottomBoundary}getViewportMatrix(){const e=t.create();return t.translate(e,e,[-100,-100,0]),e}}function Dt(e,i,o){return i*(t.EXTENT/(e.tileSize*Math.pow(2,o-e.tileID.overscaledZ)))}class At{constructor(t,e,i,o){this.opacity=t?Math.max(0,Math.min(1,t.opacity+(t.placed?e:-e))):o&&i?1:0,this.placed=i;}isHidden(){return 0===this.opacity&&!this.placed}}class Mt{constructor(t,e,i,o,s){this.text=new At(t?t.text:null,e,i,s),this.icon=new At(t?t.icon:null,e,o,s);}isHidden(){return this.text.isHidden()&&this.icon.isHidden()}}class Lt{constructor(t,e,i){this.text=t,this.icon=e,this.skipFade=i;}}class Rt{constructor(){this.invProjMatrix=t.create(),this.viewportMatrix=t.create(),this.circles=[];}}class kt{constructor(t,e,i,o,s){this.bucketInstanceId=t,this.featureIndex=e,this.sourceLayerIndex=i,this.bucketIndex=o,this.tileID=s;}}class Bt{constructor(t){this.crossSourceCollisions=t,this.maxGroupID=0,this.collisionGroups={};}get(t){if(this.crossSourceCollisions)return {ID:0,predicate:null};if(!this.collisionGroups[t]){const e=++this.maxGroupID;this.collisionGroups[t]={ID:e,predicate:t=>t.collisionGroupID===e};}return this.collisionGroups[t]}}function Ft(e,i,o,s,a){const{horizontalAlign:r,verticalAlign:n}=t.getAnchorAlignment(e),l=-(r-.5)*i,c=-(n-.5)*o,h=t.evaluateVariableOffset(e,s);return new t.Point(l+h[0]*a,c+h[1]*a)}function Ot(e,i,o,s,a,r){const{x1:n,x2:l,y1:c,y2:h,anchorPointX:u,anchorPointY:d}=e,_=new t.Point(i,o);return s&&_._rotate(a?r:-r),{x1:n+_.x,y1:c+_.y,x2:l+_.x,y2:h+_.y,anchorPointX:u,anchorPointY:d}}class Ut{constructor(t,e,i,o){this.transform=t.clone(),this.collisionIndex=new zt(this.transform),this.placements={},this.opacities={},this.variableOffsets={},this.stale=!1,this.commitTime=0,this.fadeDuration=e,this.retainedQueryData={},this.collisionGroups=new Bt(i),this.collisionCircleArrays={},this.prevPlacement=o,o&&(o.prevPlacement=void 0),this.placedOrientations={};}getBucketParts(e,i,o,s){const a=o.getBucket(i),r=o.latestFeatureIndex;if(!a||!r||i.id!==a.layerIds[0])return;const n=o.collisionBoxArray,l=a.layers[0].layout,c=Math.pow(2,this.transform.zoom-o.tileID.overscaledZ),h=o.tileSize/t.EXTENT,u=this.transform.calculatePosMatrix(o.tileID.toUnwrapped()),d="map"===l.get("text-pitch-alignment"),_="map"===l.get("text-rotation-alignment"),m=Dt(o,1,this.transform.zoom),p=mt(u,d,_,this.transform,m);let f=null;if(d){const e=pt(u,d,_,this.transform,m);f=t.multiply(t.create(),this.transform.labelPlaneMatrix,e);}this.retainedQueryData[a.bucketInstanceId]=new kt(a.bucketInstanceId,r,a.sourceLayerIndex,a.index,o.tileID);const g={bucket:a,layout:l,posMatrix:u,textLabelPlaneMatrix:p,labelToScreenMatrix:f,scale:c,textPixelRatio:h,holdingForFade:o.holdingForFade(),collisionBoxArray:n,partiallyEvaluatedTextSize:t.evaluateSizeForZoom(a.textSizeData,this.transform.zoom),collisionGroup:this.collisionGroups.get(a.sourceID)};if(s)for(const t of a.sortKeyRanges){const{sortKey:i,symbolInstanceStart:o,symbolInstanceEnd:s}=t;e.push({sortKey:i,symbolInstanceStart:o,symbolInstanceEnd:s,parameters:g});}else e.push({symbolInstanceStart:0,symbolInstanceEnd:a.symbolInstances.length,parameters:g});}attemptAnchorPlacement(t,e,i,o,s,a,r,n,l,c,h,u,d,_,m){const p=[u.textOffset0,u.textOffset1],f=Ft(t,i,o,p,s),g=this.collisionIndex.placeCollisionBox(Ot(e,f.x,f.y,a,r,this.transform.angle),h,n,l,c.predicate);if((!m||0!==this.collisionIndex.placeCollisionBox(Ot(m,f.x,f.y,a,r,this.transform.angle),h,n,l,c.predicate).box.length)&&g.box.length>0){let e;return this.prevPlacement&&this.prevPlacement.variableOffsets[u.crossTileID]&&this.prevPlacement.placements[u.crossTileID]&&this.prevPlacement.placements[u.crossTileID].text&&(e=this.prevPlacement.variableOffsets[u.crossTileID].anchor),this.variableOffsets[u.crossTileID]={textOffset:p,width:i,height:o,anchor:t,textBoxScale:s,prevAnchor:e},this.markUsedJustification(d,t,u,_),d.allowVerticalPlacement&&(this.markUsedOrientation(d,_,u),this.placedOrientations[u.crossTileID]=_),{shift:f,placedGlyphBoxes:g}}}placeLayerBucketPart(e,i,o){const{bucket:s,layout:a,posMatrix:r,textLabelPlaneMatrix:n,labelToScreenMatrix:l,textPixelRatio:c,holdingForFade:h,collisionBoxArray:u,partiallyEvaluatedTextSize:d,collisionGroup:_}=e.parameters,m=a.get("text-optional"),p=a.get("icon-optional"),f=a.get("text-allow-overlap"),g=a.get("icon-allow-overlap"),x="map"===a.get("text-rotation-alignment"),v="map"===a.get("text-pitch-alignment"),y="none"!==a.get("icon-text-fit"),b="viewport-y"===a.get("symbol-z-order"),w=f&&(g||!s.hasIconData()||p),T=g&&(f||!s.hasTextData()||m);!s.collisionArrays&&u&&s.deserializeCollisionBoxes(u);const E=(e,u)=>{if(i[e.crossTileID])return;if(h)return void(this.placements[e.crossTileID]=new Lt(!1,!1,!1));let b=!1,E=!1,I=!0,P=null,S={box:null,offscreen:null},C={box:null,offscreen:null},z=null,D=null,A=null,M=0,L=0,R=0;u.textFeatureIndex?M=u.textFeatureIndex:e.useRuntimeCollisionCircles&&(M=e.featureIndex),u.verticalTextFeatureIndex&&(L=u.verticalTextFeatureIndex);const k=u.textBox;if(k){const i=i=>{let o=t.WritingMode.horizontal;if(s.allowVerticalPlacement&&!i&&this.prevPlacement){const t=this.prevPlacement.placedOrientations[e.crossTileID];t&&(this.placedOrientations[e.crossTileID]=t,o=t,this.markUsedOrientation(s,o,e));}return o},o=(i,o)=>{if(s.allowVerticalPlacement&&e.numVerticalGlyphVertices>0&&u.verticalTextBox){for(const e of s.writingModes)if(e===t.WritingMode.vertical?(S=o(),C=S):S=i(),S&&S.box&&S.box.length)break}else S=i();};if(a.get("text-variable-anchor")){let n=a.get("text-variable-anchor");if(this.prevPlacement&&this.prevPlacement.variableOffsets[e.crossTileID]){const t=this.prevPlacement.variableOffsets[e.crossTileID];n.indexOf(t.anchor)>0&&(n=n.filter((e=>e!==t.anchor)),n.unshift(t.anchor));}const l=(t,i,o)=>{const a=t.x2-t.x1,l=t.y2-t.y1,h=e.textBoxScale,u=y&&!g?i:null;let d={box:[],offscreen:!1};const m=f?2*n.length:n.length;for(let i=0;i<m;++i){const m=this.attemptAnchorPlacement(n[i%n.length],t,a,l,h,x,v,c,r,_,i>=n.length,e,s,o,u);if(m&&(d=m.placedGlyphBoxes,d&&d.box&&d.box.length)){b=!0,P=m.shift;break}}return d};o((()=>l(k,u.iconBox,t.WritingMode.horizontal)),(()=>{const i=u.verticalTextBox;return s.allowVerticalPlacement&&!(S&&S.box&&S.box.length)&&e.numVerticalGlyphVertices>0&&i?l(i,u.verticalIconBox,t.WritingMode.vertical):{box:null,offscreen:null}})),S&&(b=S.box,I=S.offscreen);const h=i(S&&S.box);if(!b&&this.prevPlacement){const t=this.prevPlacement.variableOffsets[e.crossTileID];t&&(this.variableOffsets[e.crossTileID]=t,this.markUsedJustification(s,t.anchor,e,h));}}else {const a=(t,i)=>{const o=this.collisionIndex.placeCollisionBox(t,f,c,r,_.predicate);return o&&o.box&&o.box.length&&(this.markUsedOrientation(s,i,e),this.placedOrientations[e.crossTileID]=i),o};o((()=>a(k,t.WritingMode.horizontal)),(()=>{const i=u.verticalTextBox;return s.allowVerticalPlacement&&e.numVerticalGlyphVertices>0&&i?a(i,t.WritingMode.vertical):{box:null,offscreen:null}})),i(S&&S.box&&S.box.length);}}if(z=S,b=z&&z.box&&z.box.length>0,I=z&&z.offscreen,e.useRuntimeCollisionCircles){const i=s.text.placedSymbolArray.get(e.centerJustifiedTextSymbolIndex),c=t.evaluateSizeForFeature(s.textSizeData,d,i),h=a.get("text-padding");D=this.collisionIndex.placeCollisionCircles(f,i,s.lineVertexArray,s.glyphOffsetArray,c,r,n,l,o,v,_.predicate,e.collisionCircleDiameter,h),b=f||D.circles.length>0&&!D.collisionDetected,I=I&&D.offscreen;}if(u.iconFeatureIndex&&(R=u.iconFeatureIndex),u.iconBox){const t=t=>{const e=y&&P?Ot(t,P.x,P.y,x,v,this.transform.angle):t;return this.collisionIndex.placeCollisionBox(e,g,c,r,_.predicate)};C&&C.box&&C.box.length&&u.verticalIconBox?(A=t(u.verticalIconBox),E=A.box.length>0):(A=t(u.iconBox),E=A.box.length>0),I=I&&A.offscreen;}const B=m||0===e.numHorizontalGlyphVertices&&0===e.numVerticalGlyphVertices,F=p||0===e.numIconVertices;if(B||F?F?B||(E=E&&b):b=E&&b:E=b=E&&b,b&&z&&z.box&&this.collisionIndex.insertCollisionBox(z.box,a.get("text-ignore-placement"),s.bucketInstanceId,C&&C.box&&L?L:M,_.ID),E&&A&&this.collisionIndex.insertCollisionBox(A.box,a.get("icon-ignore-placement"),s.bucketInstanceId,R,_.ID),D&&(b&&this.collisionIndex.insertCollisionCircles(D.circles,a.get("text-ignore-placement"),s.bucketInstanceId,M,_.ID),o)){const t=s.bucketInstanceId;let e=this.collisionCircleArrays[t];void 0===e&&(e=this.collisionCircleArrays[t]=new Rt);for(let t=0;t<D.circles.length;t+=4)e.circles.push(D.circles[t+0]),e.circles.push(D.circles[t+1]),e.circles.push(D.circles[t+2]),e.circles.push(D.collisionDetected?1:0);}this.placements[e.crossTileID]=new Lt(b||w,E||T,I||s.justReloaded),i[e.crossTileID]=!0;};if(b){const t=s.getSortedSymbolIndexes(this.transform.angle);for(let e=t.length-1;e>=0;--e){const i=t[e];E(s.symbolInstances.get(i),s.collisionArrays[i]);}}else for(let t=e.symbolInstanceStart;t<e.symbolInstanceEnd;t++)E(s.symbolInstances.get(t),s.collisionArrays[t]);if(o&&s.bucketInstanceId in this.collisionCircleArrays){const e=this.collisionCircleArrays[s.bucketInstanceId];t.invert(e.invProjMatrix,r),e.viewportMatrix=this.collisionIndex.getViewportMatrix();}s.justReloaded=!1;}markUsedJustification(e,i,o,s){let a;a=s===t.WritingMode.vertical?o.verticalPlacedTextSymbolIndex:{left:o.leftJustifiedTextSymbolIndex,center:o.centerJustifiedTextSymbolIndex,right:o.rightJustifiedTextSymbolIndex}[t.getAnchorJustification(i)];const r=[o.leftJustifiedTextSymbolIndex,o.centerJustifiedTextSymbolIndex,o.rightJustifiedTextSymbolIndex,o.verticalPlacedTextSymbolIndex];for(const t of r)t>=0&&(e.text.placedSymbolArray.get(t).crossTileID=a>=0&&t!==a?0:o.crossTileID);}markUsedOrientation(e,i,o){const s=i===t.WritingMode.horizontal||i===t.WritingMode.horizontalOnly?i:0,a=i===t.WritingMode.vertical?i:0,r=[o.leftJustifiedTextSymbolIndex,o.centerJustifiedTextSymbolIndex,o.rightJustifiedTextSymbolIndex];for(const t of r)e.text.placedSymbolArray.get(t).placedOrientation=s;o.verticalPlacedTextSymbolIndex&&(e.text.placedSymbolArray.get(o.verticalPlacedTextSymbolIndex).placedOrientation=a);}commit(t){this.commitTime=t,this.zoomAtLastRecencyCheck=this.transform.zoom;const e=this.prevPlacement;let i=!1;this.prevZoomAdjustment=e?e.zoomAdjustment(this.transform.zoom):0;const o=e?e.symbolFadeChange(t):1,s=e?e.opacities:{},a=e?e.variableOffsets:{},r=e?e.placedOrientations:{};for(const t in this.placements){const e=this.placements[t],a=s[t];a?(this.opacities[t]=new Mt(a,o,e.text,e.icon),i=i||e.text!==a.text.placed||e.icon!==a.icon.placed):(this.opacities[t]=new Mt(null,o,e.text,e.icon,e.skipFade),i=i||e.text||e.icon);}for(const t in s){const e=s[t];if(!this.opacities[t]){const s=new Mt(e,o,!1,!1);s.isHidden()||(this.opacities[t]=s,i=i||e.text.placed||e.icon.placed);}}for(const t in a)this.variableOffsets[t]||!this.opacities[t]||this.opacities[t].isHidden()||(this.variableOffsets[t]=a[t]);for(const t in r)this.placedOrientations[t]||!this.opacities[t]||this.opacities[t].isHidden()||(this.placedOrientations[t]=r[t]);i?this.lastPlacementChangeTime=t:"number"!=typeof this.lastPlacementChangeTime&&(this.lastPlacementChangeTime=e?e.lastPlacementChangeTime:t);}updateLayerOpacities(t,e){const i={};for(const o of e){const e=o.getBucket(t);e&&o.latestFeatureIndex&&t.id===e.layerIds[0]&&this.updateBucketOpacities(e,i,o.collisionBoxArray);}}updateBucketOpacities(e,i,o){e.hasTextData()&&e.text.opacityVertexArray.clear(),e.hasIconData()&&e.icon.opacityVertexArray.clear(),e.hasIconCollisionBoxData()&&e.iconCollisionBox.collisionVertexArray.clear(),e.hasTextCollisionBoxData()&&e.textCollisionBox.collisionVertexArray.clear();const s=e.layers[0].layout,a=new Mt(null,0,!1,!1,!0),r=s.get("text-allow-overlap"),n=s.get("icon-allow-overlap"),l=s.get("text-variable-anchor"),c="map"===s.get("text-rotation-alignment"),h="map"===s.get("text-pitch-alignment"),u="none"!==s.get("icon-text-fit"),d=new Mt(null,0,r&&(n||!e.hasIconData()||s.get("icon-optional")),n&&(r||!e.hasTextData()||s.get("text-optional")),!0);!e.collisionArrays&&o&&(e.hasIconCollisionBoxData()||e.hasTextCollisionBoxData())&&e.deserializeCollisionBoxes(o);const _=(t,e,i)=>{for(let o=0;o<e/4;o++)t.opacityVertexArray.emplaceBack(i);};for(let o=0;o<e.symbolInstances.length;o++){const s=e.symbolInstances.get(o),{numHorizontalGlyphVertices:r,numVerticalGlyphVertices:n,crossTileID:m}=s;let p=this.opacities[m];i[m]?p=a:p||(p=d,this.opacities[m]=p),i[m]=!0;const f=s.numIconVertices>0,g=this.placedOrientations[s.crossTileID],x=g===t.WritingMode.vertical,v=g===t.WritingMode.horizontal||g===t.WritingMode.horizontalOnly;if(r>0||n>0){const t=Xt(p.text);_(e.text,r,x?Ht:t),_(e.text,n,v?Ht:t);const i=p.text.isHidden();[s.rightJustifiedTextSymbolIndex,s.centerJustifiedTextSymbolIndex,s.leftJustifiedTextSymbolIndex].forEach((t=>{t>=0&&(e.text.placedSymbolArray.get(t).hidden=i||x?1:0);})),s.verticalPlacedTextSymbolIndex>=0&&(e.text.placedSymbolArray.get(s.verticalPlacedTextSymbolIndex).hidden=i||v?1:0);const o=this.variableOffsets[s.crossTileID];o&&this.markUsedJustification(e,o.anchor,s,g);const a=this.placedOrientations[s.crossTileID];a&&(this.markUsedJustification(e,"left",s,a),this.markUsedOrientation(e,a,s));}if(f){const t=Xt(p.icon),i=!(u&&s.verticalPlacedIconSymbolIndex&&x);s.placedIconSymbolIndex>=0&&(_(e.icon,s.numIconVertices,i?t:Ht),e.icon.placedSymbolArray.get(s.placedIconSymbolIndex).hidden=p.icon.isHidden()),s.verticalPlacedIconSymbolIndex>=0&&(_(e.icon,s.numVerticalIconVertices,i?Ht:t),e.icon.placedSymbolArray.get(s.verticalPlacedIconSymbolIndex).hidden=p.icon.isHidden());}if(e.hasIconCollisionBoxData()||e.hasTextCollisionBoxData()){const i=e.collisionArrays[o];if(i){let o=new t.Point(0,0);if(i.textBox||i.verticalTextBox){let t=!0;if(l){const e=this.variableOffsets[m];e?(o=Ft(e.anchor,e.width,e.height,e.textOffset,e.textBoxScale),c&&o._rotate(h?this.transform.angle:-this.transform.angle)):t=!1;}i.textBox&&Nt(e.textCollisionBox.collisionVertexArray,p.text.placed,!t||x,o.x,o.y),i.verticalTextBox&&Nt(e.textCollisionBox.collisionVertexArray,p.text.placed,!t||v,o.x,o.y);}const s=Boolean(!v&&i.verticalIconBox);i.iconBox&&Nt(e.iconCollisionBox.collisionVertexArray,p.icon.placed,s,u?o.x:0,u?o.y:0),i.verticalIconBox&&Nt(e.iconCollisionBox.collisionVertexArray,p.icon.placed,!s,u?o.x:0,u?o.y:0);}}}if(e.sortFeatures(this.transform.angle),this.retainedQueryData[e.bucketInstanceId]&&(this.retainedQueryData[e.bucketInstanceId].featureSortOrder=e.featureSortOrder),e.hasTextData()&&e.text.opacityVertexBuffer&&e.text.opacityVertexBuffer.updateData(e.text.opacityVertexArray),e.hasIconData()&&e.icon.opacityVertexBuffer&&e.icon.opacityVertexBuffer.updateData(e.icon.opacityVertexArray),e.hasIconCollisionBoxData()&&e.iconCollisionBox.collisionVertexBuffer&&e.iconCollisionBox.collisionVertexBuffer.updateData(e.iconCollisionBox.collisionVertexArray),e.hasTextCollisionBoxData()&&e.textCollisionBox.collisionVertexBuffer&&e.textCollisionBox.collisionVertexBuffer.updateData(e.textCollisionBox.collisionVertexArray),e.bucketInstanceId in this.collisionCircleArrays){const t=this.collisionCircleArrays[e.bucketInstanceId];e.placementInvProjMatrix=t.invProjMatrix,e.placementViewportMatrix=t.viewportMatrix,e.collisionCircleArray=t.circles,delete this.collisionCircleArrays[e.bucketInstanceId];}}symbolFadeChange(t){return 0===this.fadeDuration?1:(t-this.commitTime)/this.fadeDuration+this.prevZoomAdjustment}zoomAdjustment(t){return Math.max(0,(this.transform.zoom-t)/1.5)}hasTransitions(t){return this.stale||t-this.lastPlacementChangeTime<this.fadeDuration}stillRecent(t,e){const i=this.zoomAtLastRecencyCheck===e?1-this.zoomAdjustment(e):1;return this.zoomAtLastRecencyCheck=e,this.commitTime+this.fadeDuration*i>t}setStale(){this.stale=!0;}}function Nt(t,e,i,o,s){t.emplaceBack(e?1:0,i?1:0,o||0,s||0),t.emplaceBack(e?1:0,i?1:0,o||0,s||0),t.emplaceBack(e?1:0,i?1:0,o||0,s||0),t.emplaceBack(e?1:0,i?1:0,o||0,s||0);}const Zt=Math.pow(2,25),Vt=Math.pow(2,24),qt=Math.pow(2,17),Gt=Math.pow(2,16),jt=Math.pow(2,9),$t=Math.pow(2,8),Wt=Math.pow(2,1);function Xt(t){if(0===t.opacity&&!t.placed)return 0;if(1===t.opacity&&t.placed)return 4294967295;const e=t.placed?1:0,i=Math.floor(127*t.opacity);return i*Zt+e*Vt+i*qt+e*Gt+i*jt+e*$t+i*Wt+e}const Ht=0;class Kt{constructor(t){this._sortAcrossTiles="viewport-y"!==t.layout.get("symbol-z-order")&&!t.layout.get("symbol-sort-key").isConstant(),this._currentTileIndex=0,this._currentPartIndex=0,this._seenCrossTileIDs={},this._bucketParts=[];}continuePlacement(t,e,i,o,s){const a=this._bucketParts;for(;this._currentTileIndex<t.length;)if(e.getBucketParts(a,o,t[this._currentTileIndex],this._sortAcrossTiles),this._currentTileIndex++,s())return !0;for(this._sortAcrossTiles&&(this._sortAcrossTiles=!1,a.sort(((t,e)=>t.sortKey-e.sortKey)));this._currentPartIndex<a.length;)if(e.placeLayerBucketPart(a[this._currentPartIndex],this._seenCrossTileIDs,i),this._currentPartIndex++,s())return !0;return !1}}class Yt{constructor(t,e,i,o,s,a,r){this.placement=new Ut(t,s,a,r),this._currentPlacementIndex=e.length-1,this._forceFullPlacement=i,this._showCollisionBoxes=o,this._done=!1;}isDone(){return this._done}continuePlacement(e,i,o){const s=t.exported.now(),a=()=>{const e=t.exported.now()-s;return !this._forceFullPlacement&&e>2};for(;this._currentPlacementIndex>=0;){const t=i[e[this._currentPlacementIndex]],s=this.placement.collisionIndex.transform.zoom;if("symbol"===t.type&&(!t.minzoom||t.minzoom<=s)&&(!t.maxzoom||t.maxzoom>s)){if(this._inProgressLayer||(this._inProgressLayer=new Kt(t)),this._inProgressLayer.continuePlacement(o[t.source],this.placement,this._showCollisionBoxes,t,a))return;delete this._inProgressLayer;}this._currentPlacementIndex--;}this._done=!0;}commit(t){return this.placement.commit(t),this.placement}}const Jt=512/t.EXTENT/2;class Qt{constructor(t,e,i){this.tileID=t,this.indexedSymbolInstances={},this.bucketInstanceId=i;for(let i=0;i<e.length;i++){const o=e.get(i),s=o.key;this.indexedSymbolInstances[s]||(this.indexedSymbolInstances[s]=[]),this.indexedSymbolInstances[s].push({crossTileID:o.crossTileID,coord:this.getScaledCoordinates(o,t)});}}getScaledCoordinates(e,i){const o=Jt/Math.pow(2,i.canonical.z-this.tileID.canonical.z);return {x:Math.floor((i.canonical.x*t.EXTENT+e.anchorX)*o),y:Math.floor((i.canonical.y*t.EXTENT+e.anchorY)*o)}}findMatches(t,e,i){const o=this.tileID.canonical.z<e.canonical.z?1:Math.pow(2,this.tileID.canonical.z-e.canonical.z);for(let s=0;s<t.length;s++){const a=t.get(s);if(a.crossTileID)continue;const r=this.indexedSymbolInstances[a.key];if(!r)continue;const n=this.getScaledCoordinates(a,e);for(const t of r)if(Math.abs(t.coord.x-n.x)<=o&&Math.abs(t.coord.y-n.y)<=o&&!i[t.crossTileID]){i[t.crossTileID]=!0,a.crossTileID=t.crossTileID;break}}}}class te{constructor(){this.maxCrossTileID=0;}generate(){return ++this.maxCrossTileID}}class ee{constructor(){this.indexes={},this.usedCrossTileIDs={},this.lng=0;}handleWrapJump(t){const e=Math.round((t-this.lng)/360);if(0!==e)for(const t in this.indexes){const i=this.indexes[t],o={};for(const t in i){const s=i[t];s.tileID=s.tileID.unwrapTo(s.tileID.wrap+e),o[s.tileID.key]=s;}this.indexes[t]=o;}this.lng=t;}addBucket(t,e,i){if(this.indexes[t.overscaledZ]&&this.indexes[t.overscaledZ][t.key]){if(this.indexes[t.overscaledZ][t.key].bucketInstanceId===e.bucketInstanceId)return !1;this.removeBucketCrossTileIDs(t.overscaledZ,this.indexes[t.overscaledZ][t.key]);}for(let t=0;t<e.symbolInstances.length;t++)e.symbolInstances.get(t).crossTileID=0;this.usedCrossTileIDs[t.overscaledZ]||(this.usedCrossTileIDs[t.overscaledZ]={});const o=this.usedCrossTileIDs[t.overscaledZ];for(const i in this.indexes){const s=this.indexes[i];if(Number(i)>t.overscaledZ)for(const i in s){const a=s[i];a.tileID.isChildOf(t)&&a.findMatches(e.symbolInstances,t,o);}else {const a=s[t.scaledTo(Number(i)).key];a&&a.findMatches(e.symbolInstances,t,o);}}for(let t=0;t<e.symbolInstances.length;t++){const s=e.symbolInstances.get(t);s.crossTileID||(s.crossTileID=i.generate(),o[s.crossTileID]=!0);}return void 0===this.indexes[t.overscaledZ]&&(this.indexes[t.overscaledZ]={}),this.indexes[t.overscaledZ][t.key]=new Qt(t,e.symbolInstances,e.bucketInstanceId),!0}removeBucketCrossTileIDs(t,e){for(const i in e.indexedSymbolInstances)for(const o of e.indexedSymbolInstances[i])delete this.usedCrossTileIDs[t][o.crossTileID];}removeStaleBuckets(t){let e=!1;for(const i in this.indexes){const o=this.indexes[i];for(const s in o)t[o[s].bucketInstanceId]||(this.removeBucketCrossTileIDs(i,o[s]),delete o[s],e=!0);}return e}}class ie{constructor(){this.layerIndexes={},this.crossTileIDs=new te,this.maxBucketInstanceId=0,this.bucketsInCurrentPlacement={};}addLayer(t,e,i){let o=this.layerIndexes[t.id];void 0===o&&(o=this.layerIndexes[t.id]=new ee);let s=!1;const a={};o.handleWrapJump(i);for(const i of e){const e=i.getBucket(t);e&&t.id===e.layerIds[0]&&(e.bucketInstanceId||(e.bucketInstanceId=++this.maxBucketInstanceId),o.addBucket(i.tileID,e,this.crossTileIDs)&&(s=!0),a[e.bucketInstanceId]=!0);}return o.removeStaleBuckets(a)&&(s=!0),s}pruneUnusedLayers(t){const e={};t.forEach((t=>{e[t]=!0;}));for(const t in this.layerIndexes)e[t]||delete this.layerIndexes[t];}}const oe=(e,i)=>t.emitValidationErrors(e,i&&i.filter((t=>"source.canvas"!==t.identifier))),se=t.pick(st,["addLayer","removeLayer","setPaintProperty","setLayoutProperty","setFilter","addSource","removeSource","setLayerZoomRange","setLight","setTransition","setGeoJSONSourceData"]),ae=t.pick(st,["setCenter","setZoom","setBearing","setPitch"]),re=function(){const e={},i=t.spec.$version;for(const o in t.spec.$root){const s=t.spec.$root[o];if(s.required){let t=null;t="version"===o?i:"array"===s.type?[]:{},null!=t&&(e[o]=t);}}return e}();class ne extends t.Evented{constructor(e,i={}){super(),this.map=e,this.dispatcher=new k(et(),this),this.imageManager=new T,this.imageManager.setEventedParent(this),this.glyphManager=new D(e._requestManager,i.localIdeographFontFamily),this.lineAtlas=new R(256,512),this.crossTileSymbolIndex=new ie,this._layers={},this._serializedLayers={},this._order=[],this.sourceCaches={},this.zoomHistory=new t.ZoomHistory,this._loaded=!1,this._availableImages=[],this._resetUpdates(),this.dispatcher.broadcast("setReferrer",t.getReferrer());const o=this;this._rtlTextPluginCallback=ne.registerForPluginStateChange((e=>{o.dispatcher.broadcast("syncRTLPluginState",{pluginStatus:e.pluginStatus,pluginURL:e.pluginURL},((e,i)=>{if(t.triggerPluginCompletionEvent(e),i&&i.every((t=>t)))for(const t in o.sourceCaches)o.sourceCaches[t].reload();}));})),this.on("data",(t=>{if("source"!==t.dataType||"metadata"!==t.sourceDataType)return;const e=this.sourceCaches[t.sourceId];if(!e)return;const i=e.getSource();if(i&&i.vectorLayerIds)for(const t in this._layers){const e=this._layers[t];e.source===i.id&&this._validateLayer(e);}}));}loadURL(e,i={}){this.fire(new t.Event("dataloading",{dataType:"style"}));const o="boolean"!=typeof i.validate||i.validate,s=this.map._requestManager.transformRequest(e,t.ResourceType.Style);this._request=t.getJSON(s,((e,i)=>{this._request=null,e?this.fire(new t.ErrorEvent(e)):i&&this._load(i,o);}));}loadJSON(e,i={}){this.fire(new t.Event("dataloading",{dataType:"style"})),this._request=t.exported.frame((()=>{this._request=null,this._load(e,!1!==i.validate);}));}loadEmpty(){this.fire(new t.Event("dataloading",{dataType:"style"})),this._load(re,!1);}_load(e,i){if(i&&oe(this,t.validateStyle(e)))return;this._loaded=!0,this.stylesheet=e;for(const t in e.sources)this.addSource(t,e.sources[t],{validate:!1});e.sprite?this._loadSprite(e.sprite):this.imageManager.setLoaded(!0),this.glyphManager.setURL(e.glyphs);const o=ot(this.stylesheet.layers);this._order=o.map((t=>t.id)),this._layers={},this._serializedLayers={};for(let e of o)e=t.createStyleLayer(e),e.setEventedParent(this,{layer:{id:e.id}}),this._layers[e.id]=e,this._serializedLayers[e.id]=e.serialize();this.dispatcher.broadcast("setLayers",this._serializeLayers(this._order)),this.light=new L(this.stylesheet.light),this.fire(new t.Event("data",{dataType:"style"})),this.fire(new t.Event("style.load"));}_loadSprite(e){this._spriteRequest=function(e,i,o){let s,a,r;const n=devicePixelRatio>1?"@2x":"";let l=t.getJSON(i.transformRequest(i.normalizeSpriteURL(e,n,".json"),t.ResourceType.SpriteJSON),((t,e)=>{l=null,r||(r=t,s=e,h());})),c=t.getImage(i.transformRequest(i.normalizeSpriteURL(e,n,".png"),t.ResourceType.SpriteImage),((t,e)=>{c=null,r||(r=t,a=e,h());}));function h(){if(r)o(r);else if(s&&a){const e=t.exported.getImageData(a),i={};for(const o in s){const{width:a,height:r,x:n,y:l,sdf:c,pixelRatio:h,stretchX:u,stretchY:d,content:_}=s[o],m=new t.RGBAImage({width:a,height:r});t.RGBAImage.copy(e,m,{x:n,y:l},{x:0,y:0},{width:a,height:r}),i[o]={data:m,pixelRatio:h,sdf:c,stretchX:u,stretchY:d,content:_};}o(null,i);}}return {cancel(){l&&(l.cancel(),l=null),c&&(c.cancel(),c=null);}}}(e,this.map._requestManager,((e,i)=>{if(this._spriteRequest=null,e)this.fire(new t.ErrorEvent(e));else if(i)for(const t in i)this.imageManager.addImage(t,i[t]);this.imageManager.setLoaded(!0),this._availableImages=this.imageManager.listImages(),this.dispatcher.broadcast("setImages",this._availableImages),this.fire(new t.Event("data",{dataType:"style"}));}));}_validateLayer(e){const i=this.sourceCaches[e.source];if(!i)return;const o=e.sourceLayer;if(!o)return;const s=i.getSource();("geojson"===s.type||s.vectorLayerIds&&-1===s.vectorLayerIds.indexOf(o))&&this.fire(new t.ErrorEvent(new Error(`Source layer "${o}" does not exist on source "${s.id}" as specified by style layer "${e.id}"`)));}loaded(){if(!this._loaded)return !1;if(Object.keys(this._updatedSources).length)return !1;for(const t in this.sourceCaches)if(!this.sourceCaches[t].loaded())return !1;return !!this.imageManager.isLoaded()}_serializeLayers(t){const e=[];for(const i of t){const t=this._layers[i];"custom"!==t.type&&e.push(t.serialize());}return e}hasTransitions(){if(this.light&&this.light.hasTransition())return !0;for(const t in this.sourceCaches)if(this.sourceCaches[t].hasTransition())return !0;for(const t in this._layers)if(this._layers[t].hasTransition())return !0;return !1}_checkLoaded(){if(!this._loaded)throw new Error("Style is not done loading")}update(e){if(!this._loaded)return;const i=this._changed;if(this._changed){const t=Object.keys(this._updatedLayers),i=Object.keys(this._removedLayers);(t.length||i.length)&&this._updateWorkerLayers(t,i);for(const t in this._updatedSources){const e=this._updatedSources[t];"reload"===e?this._reloadSource(t):"clear"===e&&this._clearSource(t);}this._updateTilesForChangedImages();for(const t in this._updatedPaintProps)this._layers[t].updateTransitions(e);this.light.updateTransitions(e),this._resetUpdates();}const o={};for(const t in this.sourceCaches){const e=this.sourceCaches[t];o[t]=e.used,e.used=!1;}for(const t of this._order){const i=this._layers[t];i.recalculate(e,this._availableImages),!i.isHidden(e.zoom)&&i.source&&(this.sourceCaches[i.source].used=!0);}for(const e in o){const i=this.sourceCaches[e];o[e]!==i.used&&i.fire(new t.Event("data",{sourceDataType:"visibility",dataType:"source",sourceId:e}));}this.light.recalculate(e),this.z=e.zoom,i&&this.fire(new t.Event("data",{dataType:"style"}));}_updateTilesForChangedImages(){const t=Object.keys(this._changedImages);if(t.length){for(const e in this.sourceCaches)this.sourceCaches[e].reloadTilesForDependencies(["icons","patterns"],t);this._changedImages={};}}_updateWorkerLayers(t,e){this.dispatcher.broadcast("updateLayers",{layers:this._serializeLayers(t),removedIds:e});}_resetUpdates(){this._changed=!1,this._updatedLayers={},this._removedLayers={},this._updatedSources={},this._updatedPaintProps={},this._changedImages={};}setState(e){if(this._checkLoaded(),oe(this,t.validateStyle(e)))return !1;(e=t.clone$1(e)).layers=ot(e.layers);const i=function(t,e){if(!t)return [{command:st.setStyle,args:[e]}];let i=[];try{if(!a(t.version,e.version))return [{command:st.setStyle,args:[e]}];a(t.center,e.center)||i.push({command:st.setCenter,args:[e.center]}),a(t.zoom,e.zoom)||i.push({command:st.setZoom,args:[e.zoom]}),a(t.bearing,e.bearing)||i.push({command:st.setBearing,args:[e.bearing]}),a(t.pitch,e.pitch)||i.push({command:st.setPitch,args:[e.pitch]}),a(t.sprite,e.sprite)||i.push({command:st.setSprite,args:[e.sprite]}),a(t.glyphs,e.glyphs)||i.push({command:st.setGlyphs,args:[e.glyphs]}),a(t.transition,e.transition)||i.push({command:st.setTransition,args:[e.transition]}),a(t.light,e.light)||i.push({command:st.setLight,args:[e.light]});const o={},s=[];!function(t,e,i,o){let s;for(s in e=e||{},t=t||{})Object.prototype.hasOwnProperty.call(t,s)&&(Object.prototype.hasOwnProperty.call(e,s)||rt(s,i,o));for(s in e)Object.prototype.hasOwnProperty.call(e,s)&&(Object.prototype.hasOwnProperty.call(t,s)?a(t[s],e[s])||("geojson"===t[s].type&&"geojson"===e[s].type&&lt(t,e,s)?i.push({command:st.setGeoJSONSourceData,args:[s,e[s].data]}):nt(s,e,i,o)):at(s,e,i));}(t.sources,e.sources,s,o);const r=[];t.layers&&t.layers.forEach((t=>{o[t.source]?i.push({command:st.removeLayer,args:[t.id]}):r.push(t);})),i=i.concat(s),function(t,e,i){e=e||[];const o=(t=t||[]).map(ht),s=e.map(ht),r=t.reduce(ut,{}),n=e.reduce(ut,{}),l=o.slice(),c=Object.create(null);let h,u,d,_,m,p,f;for(h=0,u=0;h<o.length;h++)d=o[h],Object.prototype.hasOwnProperty.call(n,d)?u++:(i.push({command:st.removeLayer,args:[d]}),l.splice(l.indexOf(d,u),1));for(h=0,u=0;h<s.length;h++)d=s[s.length-1-h],l[l.length-1-h]!==d&&(Object.prototype.hasOwnProperty.call(r,d)?(i.push({command:st.removeLayer,args:[d]}),l.splice(l.lastIndexOf(d,l.length-u),1)):u++,p=l[l.length-h],i.push({command:st.addLayer,args:[n[d],p]}),l.splice(l.length-h,0,d),c[d]=!0);for(h=0;h<s.length;h++)if(d=s[h],_=r[d],m=n[d],!c[d]&&!a(_,m))if(a(_.source,m.source)&&a(_["source-layer"],m["source-layer"])&&a(_.type,m.type)){for(f in ct(_.layout,m.layout,i,d,null,st.setLayoutProperty),ct(_.paint,m.paint,i,d,null,st.setPaintProperty),a(_.filter,m.filter)||i.push({command:st.setFilter,args:[d,m.filter]}),a(_.minzoom,m.minzoom)&&a(_.maxzoom,m.maxzoom)||i.push({command:st.setLayerZoomRange,args:[d,m.minzoom,m.maxzoom]}),_)Object.prototype.hasOwnProperty.call(_,f)&&"layout"!==f&&"paint"!==f&&"filter"!==f&&"metadata"!==f&&"minzoom"!==f&&"maxzoom"!==f&&(0===f.indexOf("paint.")?ct(_[f],m[f],i,d,f.slice(6),st.setPaintProperty):a(_[f],m[f])||i.push({command:st.setLayerProperty,args:[d,f,m[f]]}));for(f in m)Object.prototype.hasOwnProperty.call(m,f)&&!Object.prototype.hasOwnProperty.call(_,f)&&"layout"!==f&&"paint"!==f&&"filter"!==f&&"metadata"!==f&&"minzoom"!==f&&"maxzoom"!==f&&(0===f.indexOf("paint.")?ct(_[f],m[f],i,d,f.slice(6),st.setPaintProperty):a(_[f],m[f])||i.push({command:st.setLayerProperty,args:[d,f,m[f]]}));}else i.push({command:st.removeLayer,args:[d]}),p=l[l.lastIndexOf(d)+1],i.push({command:st.addLayer,args:[m,p]});}(r,e.layers,i);}catch(t){console.warn("Unable to compute style diff:",t),i=[{command:st.setStyle,args:[e]}];}return i}(this.serialize(),e).filter((t=>!(t.command in ae)));if(0===i.length)return !1;const o=i.filter((t=>!(t.command in se)));if(o.length>0)throw new Error(`Unimplemented: ${o.map((t=>t.command)).join(", ")}.`);return i.forEach((t=>{"setTransition"!==t.command&&this[t.command].apply(this,t.args);})),this.stylesheet=e,!0}addImage(e,i){if(this.getImage(e))return this.fire(new t.ErrorEvent(new Error("An image with this name already exists.")));this.imageManager.addImage(e,i),this._afterImageUpdated(e);}updateImage(t,e){this.imageManager.updateImage(t,e);}getImage(t){return this.imageManager.getImage(t)}removeImage(e){if(!this.getImage(e))return this.fire(new t.ErrorEvent(new Error("No image with this name exists.")));this.imageManager.removeImage(e),this._afterImageUpdated(e);}_afterImageUpdated(e){this._availableImages=this.imageManager.listImages(),this._changedImages[e]=!0,this._changed=!0,this.dispatcher.broadcast("setImages",this._availableImages),this.fire(new t.Event("data",{dataType:"style"}));}listImages(){return this._checkLoaded(),this.imageManager.listImages()}addSource(e,i,o={}){if(this._checkLoaded(),void 0!==this.sourceCaches[e])throw new Error("There is already a source with this ID");if(!i.type)throw new Error(`The type property must be defined, but only the following properties were given: ${Object.keys(i).join(", ")}.`);if(["vector","raster","geojson","video","image"].indexOf(i.type)>=0&&this._validate(t.validateStyle.source,`sources.${e}`,i,null,o))return;this.map&&this.map._collectResourceTiming&&(i.collectResourceTiming=!0);const s=this.sourceCaches[e]=new X(e,i,this.dispatcher);s.style=this,s.setEventedParent(this,(()=>({isSourceLoaded:this.loaded(),source:s.serialize(),sourceId:e}))),s.onAdd(this.map),this._changed=!0;}removeSource(e){if(this._checkLoaded(),void 0===this.sourceCaches[e])throw new Error("There is no source with this ID");for(const i in this._layers)if(this._layers[i].source===e)return this.fire(new t.ErrorEvent(new Error(`Source "${e}" cannot be removed while layer "${i}" is using it.`)));const i=this.sourceCaches[e];delete this.sourceCaches[e],delete this._updatedSources[e],i.fire(new t.Event("data",{sourceDataType:"metadata",dataType:"source",sourceId:e})),i.setEventedParent(null),i.clearTiles(),i.onRemove&&i.onRemove(this.map),this._changed=!0;}setGeoJSONSourceData(t,e){this._checkLoaded(),this.sourceCaches[t].getSource().setData(e),this._changed=!0;}getSource(t){return this.sourceCaches[t]&&this.sourceCaches[t].getSource()}addLayer(e,i,o={}){this._checkLoaded();const s=e.id;if(this.getLayer(s))return void this.fire(new t.ErrorEvent(new Error(`Layer with id "${s}" already exists on this map`)));let a;if("custom"===e.type){if(oe(this,t.validateCustomStyleLayer(e)))return;a=t.createStyleLayer(e);}else {if("object"==typeof e.source&&(this.addSource(s,e.source),e=t.clone$1(e),e=t.extend(e,{source:s})),this._validate(t.validateStyle.layer,`layers.${s}`,e,{arrayIndex:-1},o))return;a=t.createStyleLayer(e),this._validateLayer(a),a.setEventedParent(this,{layer:{id:s}}),this._serializedLayers[a.id]=a.serialize();}const r=i?this._order.indexOf(i):this._order.length;if(i&&-1===r)this.fire(new t.ErrorEvent(new Error(`Layer with id "${i}" does not exist on this map.`)));else {if(this._order.splice(r,0,s),this._layerOrderChanged=!0,this._layers[s]=a,this._removedLayers[s]&&a.source&&"custom"!==a.type){const t=this._removedLayers[s];delete this._removedLayers[s],t.type!==a.type?this._updatedSources[a.source]="clear":(this._updatedSources[a.source]="reload",this.sourceCaches[a.source].pause());}this._updateLayer(a),a.onAdd&&a.onAdd(this.map);}}moveLayer(e,i){if(this._checkLoaded(),this._changed=!0,!this._layers[e])return void this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be moved.`)));if(e===i)return;const o=this._order.indexOf(e);this._order.splice(o,1);const s=i?this._order.indexOf(i):this._order.length;i&&-1===s?this.fire(new t.ErrorEvent(new Error(`Layer with id "${i}" does not exist on this map.`))):(this._order.splice(s,0,e),this._layerOrderChanged=!0);}removeLayer(e){this._checkLoaded();const i=this._layers[e];if(!i)return void this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be removed.`)));i.setEventedParent(null);const o=this._order.indexOf(e);this._order.splice(o,1),this._layerOrderChanged=!0,this._changed=!0,this._removedLayers[e]=i,delete this._layers[e],delete this._serializedLayers[e],delete this._updatedLayers[e],delete this._updatedPaintProps[e],i.onRemove&&i.onRemove(this.map);}getLayer(t){return this._layers[t]}hasLayer(t){return t in this._layers}setLayerZoomRange(e,i,o){this._checkLoaded();const s=this.getLayer(e);s?s.minzoom===i&&s.maxzoom===o||(null!=i&&(s.minzoom=i),null!=o&&(s.maxzoom=o),this._updateLayer(s)):this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot have zoom extent.`)));}setFilter(e,i,o={}){this._checkLoaded();const s=this.getLayer(e);if(s){if(!a(s.filter,i))return null==i?(s.filter=void 0,void this._updateLayer(s)):void(this._validate(t.validateStyle.filter,`layers.${s.id}.filter`,i,null,o)||(s.filter=t.clone$1(i),this._updateLayer(s)))}else this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be filtered.`)));}getFilter(e){return t.clone$1(this.getLayer(e).filter)}setLayoutProperty(e,i,o,s={}){this._checkLoaded();const r=this.getLayer(e);r?a(r.getLayoutProperty(i),o)||(r.setLayoutProperty(i,o,s),this._updateLayer(r)):this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be styled.`)));}getLayoutProperty(e,i){const o=this.getLayer(e);if(o)return o.getLayoutProperty(i);this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style.`)));}setPaintProperty(e,i,o,s={}){this._checkLoaded();const r=this.getLayer(e);r?a(r.getPaintProperty(i),o)||(r.setPaintProperty(i,o,s)&&this._updateLayer(r),this._changed=!0,this._updatedPaintProps[e]=!0):this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be styled.`)));}getPaintProperty(t,e){return this.getLayer(t).getPaintProperty(e)}setFeatureState(e,i){this._checkLoaded();const o=e.source,s=e.sourceLayer,a=this.sourceCaches[o];if(void 0===a)return void this.fire(new t.ErrorEvent(new Error(`The source '${o}' does not exist in the map's style.`)));const r=a.getSource().type;"geojson"===r&&s?this.fire(new t.ErrorEvent(new Error("GeoJSON sources cannot have a sourceLayer parameter."))):"vector"!==r||s?(void 0===e.id&&this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided."))),a.setFeatureState(s,e.id,i)):this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));}removeFeatureState(e,i){this._checkLoaded();const o=e.source,s=this.sourceCaches[o];if(void 0===s)return void this.fire(new t.ErrorEvent(new Error(`The source '${o}' does not exist in the map's style.`)));const a=s.getSource().type,r="vector"===a?e.sourceLayer:void 0;"vector"!==a||r?i&&"string"!=typeof e.id&&"number"!=typeof e.id?this.fire(new t.ErrorEvent(new Error("A feature id is required to remove its specific state property."))):s.removeFeatureState(r,e.id,i):this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));}getFeatureState(e){this._checkLoaded();const i=e.source,o=e.sourceLayer,s=this.sourceCaches[i];if(void 0!==s)return "vector"!==s.getSource().type||o?(void 0===e.id&&this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided."))),s.getFeatureState(o,e.id)):void this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));this.fire(new t.ErrorEvent(new Error(`The source '${i}' does not exist in the map's style.`)));}getTransition(){return t.extend({duration:300,delay:0},this.stylesheet&&this.stylesheet.transition)}serialize(){return t.filterObject({version:this.stylesheet.version,name:this.stylesheet.name,metadata:this.stylesheet.metadata,light:this.stylesheet.light,center:this.stylesheet.center,zoom:this.stylesheet.zoom,bearing:this.stylesheet.bearing,pitch:this.stylesheet.pitch,sprite:this.stylesheet.sprite,glyphs:this.stylesheet.glyphs,transition:this.stylesheet.transition,sources:t.mapObject(this.sourceCaches,(t=>t.serialize())),layers:this._serializeLayers(this._order)},(t=>void 0!==t))}_updateLayer(t){this._updatedLayers[t.id]=!0,t.source&&!this._updatedSources[t.source]&&"raster"!==this.sourceCaches[t.source].getSource().type&&(this._updatedSources[t.source]="reload",this.sourceCaches[t.source].pause()),this._changed=!0;}_flattenAndSortRenderedFeatures(t){const e=t=>"fill-extrusion"===this._layers[t].type,i={},o=[];for(let s=this._order.length-1;s>=0;s--){const a=this._order[s];if(e(a)){i[a]=s;for(const e of t){const t=e[a];if(t)for(const e of t)o.push(e);}}}o.sort(((t,e)=>e.intersectionZ-t.intersectionZ));const s=[];for(let a=this._order.length-1;a>=0;a--){const r=this._order[a];if(e(r))for(let t=o.length-1;t>=0;t--){const e=o[t].feature;if(i[e.layer.id]<a)break;s.push(e),o.pop();}else for(const e of t){const t=e[r];if(t)for(const e of t)s.push(e.feature);}}return s}queryRenderedFeatures(e,i,o){i&&i.filter&&this._validate(t.validateStyle.filter,"queryRenderedFeatures.filter",i.filter,null,i);const s={};if(i&&i.layers){if(!Array.isArray(i.layers))return this.fire(new t.ErrorEvent(new Error("parameters.layers must be an Array."))),[];for(const e of i.layers){const i=this._layers[e];if(!i)return this.fire(new t.ErrorEvent(new Error(`The layer '${e}' does not exist in the map's style and cannot be queried for features.`))),[];s[i.source]=!0;}}const a=[];i.availableImages=this._availableImages;for(const t in this.sourceCaches)i.layers&&!s[t]||a.push(q(this.sourceCaches[t],this._layers,this._serializedLayers,e,i,o));return this.placement&&a.push(function(t,e,i,o,s,a,r){const n={},l=a.queryRenderedSymbols(o),c=[];for(const t of Object.keys(l).map(Number))c.push(r[t]);c.sort(G);for(const i of c){const o=i.featureIndex.lookupSymbolFeatures(l[i.bucketInstanceId],e,i.bucketIndex,i.sourceLayerIndex,s.filter,s.layers,s.availableImages,t);for(const t in o){const e=n[t]=n[t]||[],s=o[t];s.sort(((t,e)=>{const o=i.featureSortOrder;if(o){const i=o.indexOf(t.featureIndex);return o.indexOf(e.featureIndex)-i}return e.featureIndex-t.featureIndex}));for(const t of s)e.push(t);}}for(const e in n)n[e].forEach((o=>{const s=o.feature,a=i[t[e].source].getFeatureState(s.layer["source-layer"],s.id);s.source=s.layer.source,s.layer["source-layer"]&&(s.sourceLayer=s.layer["source-layer"]),s.state=a;}));return n}(this._layers,this._serializedLayers,this.sourceCaches,e,i,this.placement.collisionIndex,this.placement.retainedQueryData)),this._flattenAndSortRenderedFeatures(a)}querySourceFeatures(e,i){i&&i.filter&&this._validate(t.validateStyle.filter,"querySourceFeatures.filter",i.filter,null,i);const o=this.sourceCaches[e];return o?function(t,e){const i=t.getRenderableIds().map((e=>t.getTileByID(e))),o=[],s={};for(let t=0;t<i.length;t++){const a=i[t],r=a.tileID.canonical.key;s[r]||(s[r]=!0,a.querySourceFeatures(o,e));}return o}(o,i):[]}addSourceType(t,e,i){return ne.getSourceType(t)?i(new Error(`A source type called "${t}" already exists.`)):(ne.setSourceType(t,e),e.workerSourceURL?void this.dispatcher.broadcast("loadWorkerSource",{name:t,url:e.workerSourceURL},i):i(null,null))}getLight(){return this.light.getLight()}setLight(e,i={}){this._checkLoaded();const o=this.light.getLight();let s=!1;for(const t in e)if(!a(e[t],o[t])){s=!0;break}if(!s)return;const r={now:t.exported.now(),transition:t.extend({duration:300,delay:0},this.stylesheet.transition)};this.light.setLight(e,i),this.light.updateTransitions(r);}_validate(e,i,o,s,a={}){return (!a||!1!==a.validate)&&oe(this,e.call(t.validateStyle,t.extend({key:i,style:this.serialize(),value:o,styleSpec:t.spec},s)))}_remove(){this._request&&(this._request.cancel(),this._request=null),this._spriteRequest&&(this._spriteRequest.cancel(),this._spriteRequest=null),t.evented.off("pluginStateChange",this._rtlTextPluginCallback);for(const t in this._layers)this._layers[t].setEventedParent(null);for(const t in this.sourceCaches)this.sourceCaches[t].clearTiles(),this.sourceCaches[t].setEventedParent(null);this.imageManager.setEventedParent(null),this.setEventedParent(null),this.dispatcher.remove();}_clearSource(t){this.sourceCaches[t].clearTiles();}_reloadSource(t){this.sourceCaches[t].resume(),this.sourceCaches[t].reload();}_updateSources(t){for(const e in this.sourceCaches)this.sourceCaches[e].update(t);}_generateCollisionBoxes(){for(const t in this.sourceCaches)this._reloadSource(t);}_updatePlacement(e,i,o,s,a=!1){let r=!1,n=!1;const l={};for(const t of this._order){const i=this._layers[t];if("symbol"!==i.type)continue;if(!l[i.source]){const t=this.sourceCaches[i.source];l[i.source]=t.getRenderableIds(!0).map((e=>t.getTileByID(e))).sort(((t,e)=>e.tileID.overscaledZ-t.tileID.overscaledZ||(t.tileID.isLessThan(e.tileID)?-1:1)));}const o=this.crossTileSymbolIndex.addLayer(i,l[i.source],e.center.lng);r=r||o;}if(this.crossTileSymbolIndex.pruneUnusedLayers(this._order),((a=a||this._layerOrderChanged||0===o)||!this.pauseablePlacement||this.pauseablePlacement.isDone()&&!this.placement.stillRecent(t.exported.now(),e.zoom))&&(this.pauseablePlacement=new Yt(e,this._order,a,i,o,s,this.placement),this._layerOrderChanged=!1),this.pauseablePlacement.isDone()?this.placement.setStale():(this.pauseablePlacement.continuePlacement(this._order,this._layers,l),this.pauseablePlacement.isDone()&&(this.placement=this.pauseablePlacement.commit(t.exported.now()),n=!0),r&&this.pauseablePlacement.placement.setStale()),n||r)for(const t of this._order){const e=this._layers[t];"symbol"===e.type&&this.placement.updateLayerOpacities(e,l[e.source]);}return !this.pauseablePlacement.isDone()||this.placement.hasTransitions(t.exported.now())}_releaseSymbolFadeTiles(){for(const t in this.sourceCaches)this.sourceCaches[t].releaseSymbolFadeTiles();}getImages(t,e,i){this.imageManager.getImages(e.icons,i),this._updateTilesForChangedImages();const o=this.sourceCaches[e.source];o&&o.setDependencies(e.tileID.key,e.type,e.icons);}getGlyphs(t,e,i){this.glyphManager.getGlyphs(e.stacks,i);}getResource(e,i,o){return t.makeRequest(i,o)}}ne.getSourceType=function(t){return Z[t]},ne.setSourceType=function(t,e){Z[t]=e;},ne.registerForPluginStateChange=t.registerForPluginStateChange;var le=t.createLayout([{name:"a_pos",type:"Int16",components:2}]),ce={prelude:he("#ifdef GL_ES\nprecision mediump float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif","#ifdef GL_ES\nprecision highp float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif\nvec2 unpack_float(const float packedValue) {int packedIntValue=int(packedValue);int v0=packedIntValue/256;return vec2(v0,packedIntValue-v0*256);}vec2 unpack_opacity(const float packedOpacity) {int intOpacity=int(packedOpacity)/2;return vec2(float(intOpacity)/127.0,mod(packedOpacity,2.0));}vec4 decode_color(const vec2 encodedColor) {return vec4(unpack_float(encodedColor[0])/255.0,unpack_float(encodedColor[1])/255.0\n);}float unpack_mix_vec2(const vec2 packedValue,const float t) {return mix(packedValue[0],packedValue[1],t);}vec4 unpack_mix_color(const vec4 packedColors,const float t) {vec4 minColor=decode_color(vec2(packedColors[0],packedColors[1]));vec4 maxColor=decode_color(vec2(packedColors[2],packedColors[3]));return mix(minColor,maxColor,t);}vec2 get_pattern_pos(const vec2 pixel_coord_upper,const vec2 pixel_coord_lower,const vec2 pattern_size,const float tile_units_to_pixels,const vec2 pos) {vec2 offset=mod(mod(mod(pixel_coord_upper,pattern_size)*256.0,pattern_size)*256.0+pixel_coord_lower,pattern_size);return (tile_units_to_pixels*pos+offset)/pattern_size;}"),background:he("uniform vec4 u_color;uniform float u_opacity;void main() {gl_FragColor=u_color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),backgroundPattern:he("uniform vec2 u_pattern_tl_a;uniform vec2 u_pattern_br_a;uniform vec2 u_pattern_tl_b;uniform vec2 u_pattern_br_b;uniform vec2 u_texsize;uniform float u_mix;uniform float u_opacity;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(u_pattern_tl_a/u_texsize,u_pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(u_pattern_tl_b/u_texsize,u_pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_mix)*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pattern_size_a;uniform vec2 u_pattern_size_b;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_scale_a;uniform float u_scale_b;uniform float u_tile_units_to_pixels;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_a*u_pattern_size_a,u_tile_units_to_pixels,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_b*u_pattern_size_b,u_tile_units_to_pixels,a_pos);}"),circle:he("varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=v_data.xy;float extrude_length=length(extrude);lowp float antialiasblur=v_data.z;float antialiased_blur=-max(blur,antialiasblur);float opacity_t=smoothstep(0.0,antialiased_blur,extrude_length-1.0);float color_t=stroke_width < 0.01 ? 0.0 : smoothstep(antialiased_blur,0.0,extrude_length-radius/(radius+stroke_width));gl_FragColor=opacity_t*mix(color*opacity,stroke_color*stroke_opacity,color_t);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform bool u_scale_with_map;uniform bool u_pitch_with_map;uniform vec2 u_extrude_scale;uniform lowp float u_device_pixel_ratio;uniform highp float u_camera_to_center_distance;attribute vec2 a_pos;varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main(void) {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=vec2(mod(a_pos,2.0)*2.0-1.0);vec2 circle_center=floor(a_pos*0.5);if (u_pitch_with_map) {vec2 corner_position=circle_center;if (u_scale_with_map) {corner_position+=extrude*(radius+stroke_width)*u_extrude_scale;} else {vec4 projected_center=u_matrix*vec4(circle_center,0,1);corner_position+=extrude*(radius+stroke_width)*u_extrude_scale*(projected_center.w/u_camera_to_center_distance);}gl_Position=u_matrix*vec4(corner_position,0,1);} else {gl_Position=u_matrix*vec4(circle_center,0,1);if (u_scale_with_map) {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*u_camera_to_center_distance;} else {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*gl_Position.w;}}lowp float antialiasblur=1.0/u_device_pixel_ratio/(radius+stroke_width);v_data=vec3(extrude.x,extrude.y,antialiasblur);}"),clippingMask:he("void main() {gl_FragColor=vec4(1.0);}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),heatmap:he("uniform highp float u_intensity;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#define GAUSS_COEF 0.3989422804014327\nvoid main() {\n#pragma mapbox: initialize highp float weight\nfloat d=-0.5*3.0*3.0*dot(v_extrude,v_extrude);float val=weight*u_intensity*GAUSS_COEF*exp(d);gl_FragColor=vec4(val,1.0,1.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform float u_extrude_scale;uniform float u_opacity;uniform float u_intensity;attribute vec2 a_pos;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#pragma mapbox: define mediump float radius\nconst highp float ZERO=1.0/255.0/16.0;\n#define GAUSS_COEF 0.3989422804014327\nvoid main(void) {\n#pragma mapbox: initialize highp float weight\n#pragma mapbox: initialize mediump float radius\nvec2 unscaled_extrude=vec2(mod(a_pos,2.0)*2.0-1.0);float S=sqrt(-2.0*log(ZERO/weight/u_intensity/GAUSS_COEF))/3.0;v_extrude=S*unscaled_extrude;vec2 extrude=v_extrude*radius*u_extrude_scale;vec4 pos=vec4(floor(a_pos*0.5)+extrude,0,1);gl_Position=u_matrix*pos;}"),heatmapTexture:he("uniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform float u_opacity;varying vec2 v_pos;void main() {float t=texture2D(u_image,v_pos).r;vec4 color=texture2D(u_color_ramp,vec2(t,0.5));gl_FragColor=color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(0.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;attribute vec2 a_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos*u_world,0,1);v_pos.x=a_pos.x;v_pos.y=1.0-a_pos.y;}"),collisionBox:he("varying float v_placed;varying float v_notUsed;void main() {float alpha=0.5;gl_FragColor=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {gl_FragColor=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {gl_FragColor*=.1;}}","attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;attribute vec2 a_shift;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);gl_Position.xy+=(a_extrude+a_shift)*u_extrude_scale*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;}"),collisionCircle:he("varying float v_radius;varying vec2 v_extrude;varying float v_perspective_ratio;varying float v_collision;void main() {float alpha=0.5*min(v_perspective_ratio,1.0);float stroke_radius=0.9*max(v_perspective_ratio,1.0);float distance_to_center=length(v_extrude);float distance_to_edge=abs(distance_to_center-v_radius);float opacity_t=smoothstep(-stroke_radius,0.0,-distance_to_edge);vec4 color=mix(vec4(0.0,0.0,1.0,0.5),vec4(1.0,0.0,0.0,1.0),v_collision);gl_FragColor=color*alpha*opacity_t;}","attribute vec2 a_pos;attribute float a_radius;attribute vec2 a_flags;uniform mat4 u_matrix;uniform mat4 u_inv_matrix;uniform vec2 u_viewport_size;uniform float u_camera_to_center_distance;varying float v_radius;varying vec2 v_extrude;varying float v_perspective_ratio;varying float v_collision;vec3 toTilePosition(vec2 screenPos) {vec4 rayStart=u_inv_matrix*vec4(screenPos,-1.0,1.0);vec4 rayEnd  =u_inv_matrix*vec4(screenPos, 1.0,1.0);rayStart.xyz/=rayStart.w;rayEnd.xyz  /=rayEnd.w;highp float t=(0.0-rayStart.z)/(rayEnd.z-rayStart.z);return mix(rayStart.xyz,rayEnd.xyz,t);}void main() {vec2 quadCenterPos=a_pos;float radius=a_radius;float collision=a_flags.x;float vertexIdx=a_flags.y;vec2 quadVertexOffset=vec2(mix(-1.0,1.0,float(vertexIdx >=2.0)),mix(-1.0,1.0,float(vertexIdx >=1.0 && vertexIdx <=2.0)));vec2 quadVertexExtent=quadVertexOffset*radius;vec3 tilePos=toTilePosition(quadCenterPos);vec4 clipPos=u_matrix*vec4(tilePos,1.0);highp float camera_to_anchor_distance=clipPos.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);float padding_factor=1.2;v_radius=radius;v_extrude=quadVertexExtent*padding_factor;v_perspective_ratio=collision_perspective_ratio;v_collision=collision;gl_Position=vec4(clipPos.xyz/clipPos.w,1.0)+vec4(quadVertexExtent*padding_factor/u_viewport_size*2.0,0.0,0.0);}"),debug:he("uniform highp vec4 u_color;uniform sampler2D u_overlay;varying vec2 v_uv;void main() {vec4 overlay_color=texture2D(u_overlay,v_uv);gl_FragColor=mix(u_color,overlay_color,overlay_color.a);}","attribute vec2 a_pos;varying vec2 v_uv;uniform mat4 u_matrix;uniform float u_overlay_scale;void main() {v_uv=a_pos/8192.0;gl_Position=u_matrix*vec4(a_pos*u_overlay_scale,0,1);}"),fill:he("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_FragColor=color*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);}"),fillOutline:he("varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=outline_color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;uniform vec2 u_world;varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),fillOutlinePattern:he("uniform vec2 u_texsize;uniform sampler2D u_image;uniform float u_fade;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);float dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=mix(color1,color2,u_fade)*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec3 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;gl_Position=u_matrix*vec4(a_pos,0,1);vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,a_pos);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),fillPattern:he("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_fade)*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec3 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileZoomRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileZoomRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileZoomRatio,a_pos);}"),fillExtrusion:he("varying vec4 v_color;void main() {gl_FragColor=v_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;uniform float u_vertical_gradient;uniform lowp float u_opacity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec4 v_color;\n#pragma mapbox: define highp float base\n#pragma mapbox: define highp float height\n#pragma mapbox: define highp vec4 color\nvoid main() {\n#pragma mapbox: initialize highp float base\n#pragma mapbox: initialize highp float height\n#pragma mapbox: initialize highp vec4 color\nvec3 normal=a_normal_ed.xyz;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);gl_Position=u_matrix*vec4(a_pos,t > 0.0 ? height : base,1);float colorvalue=color.r*0.2126+color.g*0.7152+color.b*0.0722;v_color=vec4(0.0,0.0,0.0,1.0);vec4 ambientlight=vec4(0.03,0.03,0.03,1.0);color+=ambientlight;float directional=clamp(dot(normal/16384.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((1.0-colorvalue+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_color.r+=clamp(color.r*directional*u_lightcolor.r,mix(0.0,0.3,1.0-u_lightcolor.r),1.0);v_color.g+=clamp(color.g*directional*u_lightcolor.g,mix(0.0,0.3,1.0-u_lightcolor.g),1.0);v_color.b+=clamp(color.b*directional*u_lightcolor.b,mix(0.0,0.3,1.0-u_lightcolor.b),1.0);v_color*=u_opacity;}"),fillExtrusionPattern:he("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);vec4 mixedColor=mix(color1,color2,u_fade);gl_FragColor=mixedColor*v_lighting;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_height_factor;uniform vec3 u_scale;uniform float u_vertical_gradient;uniform lowp float u_opacity;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec3 normal=a_normal_ed.xyz;float edgedistance=a_normal_ed.w;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);float z=t > 0.0 ? height : base;gl_Position=u_matrix*vec4(a_pos,z,1);vec2 pos=normal.x==1.0 && normal.y==0.0 && normal.z==16384.0\n? a_pos\n: vec2(edgedistance,z*u_height_factor);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,pos);v_lighting=vec4(0.0,0.0,0.0,1.0);float directional=clamp(dot(normal/16383.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((0.5+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_lighting.rgb+=clamp(directional*u_lightcolor,mix(vec3(0.0),vec3(0.3),1.0-u_lightcolor),vec3(1.0));v_lighting*=u_opacity;}"),hillshadePrepare:he("#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_dimension;uniform float u_zoom;uniform vec4 u_unpack;float getElevation(vec2 coord,float bias) {vec4 data=texture2D(u_image,coord)*255.0;data.a=-1.0;return dot(data,u_unpack)/4.0;}void main() {vec2 epsilon=1.0/u_dimension;float a=getElevation(v_pos+vec2(-epsilon.x,-epsilon.y),0.0);float b=getElevation(v_pos+vec2(0,-epsilon.y),0.0);float c=getElevation(v_pos+vec2(epsilon.x,-epsilon.y),0.0);float d=getElevation(v_pos+vec2(-epsilon.x,0),0.0);float e=getElevation(v_pos,0.0);float f=getElevation(v_pos+vec2(epsilon.x,0),0.0);float g=getElevation(v_pos+vec2(-epsilon.x,epsilon.y),0.0);float h=getElevation(v_pos+vec2(0,epsilon.y),0.0);float i=getElevation(v_pos+vec2(epsilon.x,epsilon.y),0.0);float exaggerationFactor=u_zoom < 2.0 ? 0.4 : u_zoom < 4.5 ? 0.35 : 0.3;float exaggeration=u_zoom < 15.0 ? (u_zoom-15.0)*exaggerationFactor : 0.0;vec2 deriv=vec2((c+f+f+i)-(a+d+d+g),(g+h+h+i)-(a+b+b+c))/pow(2.0,exaggeration+(19.2562-u_zoom));gl_FragColor=clamp(vec4(deriv.x/2.0+0.5,deriv.y/2.0+0.5,1.0,1.0),0.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_dimension;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);highp vec2 epsilon=1.0/u_dimension;float scale=(u_dimension.x-2.0)/u_dimension.x;v_pos=(a_texture_pos/8192.0)*scale+epsilon;}"),hillshade:he("uniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_latrange;uniform vec2 u_light;uniform vec4 u_shadow;uniform vec4 u_highlight;uniform vec4 u_accent;\n#define PI 3.141592653589793\nvoid main() {vec4 pixel=texture2D(u_image,v_pos);vec2 deriv=((pixel.rg*2.0)-1.0);float scaleFactor=cos(radians((u_latrange[0]-u_latrange[1])*(1.0-v_pos.y)+u_latrange[1]));float slope=atan(1.25*length(deriv)/scaleFactor);float aspect=deriv.x !=0.0 ? atan(deriv.y,-deriv.x) : PI/2.0*(deriv.y > 0.0 ? 1.0 :-1.0);float intensity=u_light.x;float azimuth=u_light.y+PI;float base=1.875-intensity*1.75;float maxValue=0.5*PI;float scaledSlope=intensity !=0.5 ? ((pow(base,slope)-1.0)/(pow(base,maxValue)-1.0))*maxValue : slope;float accent=cos(scaledSlope);vec4 accent_color=(1.0-accent)*u_accent*clamp(intensity*2.0,0.0,1.0);float shade=abs(mod((aspect+azimuth)/PI+0.5,2.0)-1.0);vec4 shade_color=mix(u_shadow,u_highlight,shade)*sin(scaledSlope)*clamp(intensity*2.0,0.0,1.0);gl_FragColor=accent_color*(1.0-shade_color.a)+shade_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos=a_texture_pos/8192.0;}"),line:he("uniform lowp float u_device_pixel_ratio;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_units_to_pixels;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_linesofar;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),lineGradient:he("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;varying highp vec2 v_uv;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);vec4 color=texture2D(u_image,v_uv);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;attribute float a_uv_x;attribute float a_split_index;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_units_to_pixels;uniform float u_image_height;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp vec2 v_uv;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;highp float texel_height=1.0/u_image_height;highp float half_texel_height=0.5*texel_height;v_uv=vec2(a_uv_x,a_split_index*texel_height-half_texel_height);vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),linePattern:he("uniform lowp float u_device_pixel_ratio;uniform vec2 u_texsize;uniform float u_fade;uniform mediump vec3 u_scale;uniform sampler2D u_image;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;varying float v_width;\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float tileZoomRatio=u_scale.x;float fromScale=u_scale.y;float toScale=u_scale.z;vec2 display_size_a=(pattern_br_a-pattern_tl_a)/pixel_ratio_from;vec2 display_size_b=(pattern_br_b-pattern_tl_b)/pixel_ratio_to;vec2 pattern_size_a=vec2(display_size_a.x*fromScale/tileZoomRatio,display_size_a.y);vec2 pattern_size_b=vec2(display_size_b.x*toScale/tileZoomRatio,display_size_b.y);float aspect_a=display_size_a.y/v_width;float aspect_b=display_size_b.y/v_width;float dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float x_a=mod(v_linesofar/pattern_size_a.x*aspect_a,1.0);float x_b=mod(v_linesofar/pattern_size_b.x*aspect_b,1.0);float y=0.5*v_normal.y+0.5;vec2 texel_size=1.0/u_texsize;vec2 pos_a=mix(pattern_tl_a*texel_size-texel_size,pattern_br_a*texel_size+texel_size,vec2(x_a,y));vec2 pos_b=mix(pattern_tl_b*texel_size-texel_size,pattern_br_b*texel_size+texel_size,vec2(x_b,y));vec4 color=mix(texture2D(u_image,pos_a),texture2D(u_image,pos_b),u_fade);gl_FragColor=color*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform vec2 u_units_to_pixels;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;varying float v_width;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float pixel_ratio_from\n#pragma mapbox: define lowp float pixel_ratio_to\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float pixel_ratio_from\n#pragma mapbox: initialize lowp float pixel_ratio_to\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_linesofar=a_linesofar;v_width2=vec2(outset,inset);v_width=floorwidth;}"),lineSDF:he("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;uniform float u_sdfgamma;uniform float u_mix;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float sdfdist_a=texture2D(u_image,v_tex_a).a;float sdfdist_b=texture2D(u_image,v_tex_b).a;float sdfdist=mix(sdfdist_a,sdfdist_b,u_mix);alpha*=smoothstep(0.5-u_sdfgamma/floorwidth,0.5+u_sdfgamma/floorwidth,sdfdist);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_patternscale_a;uniform float u_tex_y_a;uniform vec2 u_patternscale_b;uniform float u_tex_y_b;uniform vec2 u_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_tex_a=vec2(a_linesofar*u_patternscale_a.x/floorwidth,normal.y*u_patternscale_a.y+u_tex_y_a);v_tex_b=vec2(a_linesofar*u_patternscale_b.x/floorwidth,normal.y*u_patternscale_b.y+u_tex_y_b);v_width2=vec2(outset,inset);}"),raster:he("uniform float u_fade_t;uniform float u_opacity;uniform sampler2D u_image0;uniform sampler2D u_image1;varying vec2 v_pos0;varying vec2 v_pos1;uniform float u_brightness_low;uniform float u_brightness_high;uniform float u_saturation_factor;uniform float u_contrast_factor;uniform vec3 u_spin_weights;void main() {vec4 color0=texture2D(u_image0,v_pos0);vec4 color1=texture2D(u_image1,v_pos1);if (color0.a > 0.0) {color0.rgb=color0.rgb/color0.a;}if (color1.a > 0.0) {color1.rgb=color1.rgb/color1.a;}vec4 color=mix(color0,color1,u_fade_t);color.a*=u_opacity;vec3 rgb=color.rgb;rgb=vec3(dot(rgb,u_spin_weights.xyz),dot(rgb,u_spin_weights.zxy),dot(rgb,u_spin_weights.yzx));float average=(color.r+color.g+color.b)/3.0;rgb+=(average-rgb)*u_saturation_factor;rgb=(rgb-0.5)*u_contrast_factor+0.5;vec3 u_high_vec=vec3(u_brightness_low,u_brightness_low,u_brightness_low);vec3 u_low_vec=vec3(u_brightness_high,u_brightness_high,u_brightness_high);gl_FragColor=vec4(mix(u_high_vec,u_low_vec,rgb)*color.a,color.a);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_tl_parent;uniform float u_scale_parent;uniform float u_buffer_scale;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos0;varying vec2 v_pos1;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos0=(((a_texture_pos/8192.0)-0.5)/u_buffer_scale )+0.5;v_pos1=(v_pos0*u_scale_parent)+u_tl_parent;}"),symbolIcon:he("uniform sampler2D u_texture;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nlowp float alpha=opacity*v_fade_opacity;gl_FragColor=texture2D(u_texture,v_tex)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec4 a_pixeloffset;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform highp float u_camera_to_center_distance;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform float u_fade_change;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform vec2 u_texsize;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);vec2 a_pxoffset=a_pixeloffset.xy;vec2 a_minFontScale=a_pixeloffset.zw/256.0;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*max(a_minFontScale,fontScale)+a_pxoffset/16.0),0.0,1.0);v_tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;v_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));}"),symbolSDF:he("#define SDF_PX 8.0\nuniform bool u_is_halo;uniform sampler2D u_texture;uniform highp float u_gamma_scale;uniform lowp float u_device_pixel_ratio;uniform bool u_is_text;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nfloat EDGE_GAMMA=0.105/u_device_pixel_ratio;vec2 tex=v_data0.xy;float gamma_scale=v_data1.x;float size=v_data1.y;float fade_opacity=v_data1[2];float fontScale=u_is_text ? size/24.0 : size;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec4 a_pixeloffset;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);vec2 a_pxoffset=a_pixeloffset.xy;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale+a_pxoffset),0.0,1.0);float gamma_scale=gl_Position.w;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0=a_tex/u_texsize;v_data1=vec3(gamma_scale,size,interpolated_fade_opacity);}"),symbolTextAndIcon:he("#define SDF_PX 8.0\n#define SDF 1.0\n#define ICON 0.0\nuniform bool u_is_halo;uniform sampler2D u_texture;uniform sampler2D u_texture_icon;uniform highp float u_gamma_scale;uniform lowp float u_device_pixel_ratio;varying vec4 v_data0;varying vec4 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nfloat fade_opacity=v_data1[2];if (v_data1.w==ICON) {vec2 tex_icon=v_data0.zw;lowp float alpha=opacity*fade_opacity;gl_FragColor=texture2D(u_texture_icon,tex_icon)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\nreturn;}vec2 tex=v_data0.xy;float EDGE_GAMMA=0.105/u_device_pixel_ratio;float gamma_scale=v_data1.x;float size=v_data1.y;float fontScale=size/24.0;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;uniform vec2 u_texsize_icon;varying vec4 v_data0;varying vec4 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;float a_size_min=floor(a_size[0]*0.5);float is_sdf=a_size[0]-2.0*a_size_min;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size_min,a_size[1],u_size_t)/128.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size_min/128.0;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=size/24.0;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);float gamma_scale=gl_Position.w;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0.xy=a_tex/u_texsize;v_data0.zw=a_tex/u_texsize_icon;v_data1=vec4(gamma_scale,size,interpolated_fade_opacity,is_sdf);}")};function he(t,e){const i=/#pragma mapbox: ([\w]+) ([\w]+) ([\w]+) ([\w]+)/g,o=e.match(/attribute ([\w]+) ([\w]+)/g),s=t.match(/uniform ([\w]+) ([\w]+)([\s]*)([\w]*)/g),a=e.match(/uniform ([\w]+) ([\w]+)([\s]*)([\w]*)/g),r=a?a.concat(s):s,n={};return {fragmentSource:t=t.replace(i,((t,e,i,o,s)=>(n[s]=!0,"define"===e?`\n#ifndef HAS_UNIFORM_u_${s}\nvarying ${i} ${o} ${s};\n#else\nuniform ${i} ${o} u_${s};\n#endif\n`:`\n#ifdef HAS_UNIFORM_u_${s}\n    ${i} ${o} ${s} = u_${s};\n#endif\n`))),vertexSource:e=e.replace(i,((t,e,i,o,s)=>{const a="float"===o?"vec2":"vec4",r=s.match(/color/)?"color":a;return n[s]?"define"===e?`\n#ifndef HAS_UNIFORM_u_${s}\nuniform lowp float u_${s}_t;\nattribute ${i} ${a} a_${s};\nvarying ${i} ${o} ${s};\n#else\nuniform ${i} ${o} u_${s};\n#endif\n`:"vec4"===r?`\n#ifndef HAS_UNIFORM_u_${s}\n    ${s} = a_${s};\n#else\n    ${i} ${o} ${s} = u_${s};\n#endif\n`:`\n#ifndef HAS_UNIFORM_u_${s}\n    ${s} = unpack_mix_${r}(a_${s}, u_${s}_t);\n#else\n    ${i} ${o} ${s} = u_${s};\n#endif\n`:"define"===e?`\n#ifndef HAS_UNIFORM_u_${s}\nuniform lowp float u_${s}_t;\nattribute ${i} ${a} a_${s};\n#else\nuniform ${i} ${o} u_${s};\n#endif\n`:"vec4"===r?`\n#ifndef HAS_UNIFORM_u_${s}\n    ${i} ${o} ${s} = a_${s};\n#else\n    ${i} ${o} ${s} = u_${s};\n#endif\n`:`\n#ifndef HAS_UNIFORM_u_${s}\n    ${i} ${o} ${s} = unpack_mix_${r}(a_${s}, u_${s}_t);\n#else\n    ${i} ${o} ${s} = u_${s};\n#endif\n`})),staticAttributes:o,staticUniforms:r}}class ue{constructor(){this.boundProgram=null,this.boundLayoutVertexBuffer=null,this.boundPaintVertexBuffers=[],this.boundIndexBuffer=null,this.boundVertexOffset=null,this.boundDynamicVertexBuffer=null,this.vao=null;}bind(t,e,i,o,s,a,r,n){this.context=t;let l=this.boundPaintVertexBuffers.length!==o.length;for(let t=0;!l&&t<o.length;t++)this.boundPaintVertexBuffers[t]!==o[t]&&(l=!0);t.extVertexArrayObject&&this.vao&&this.boundProgram===e&&this.boundLayoutVertexBuffer===i&&!l&&this.boundIndexBuffer===s&&this.boundVertexOffset===a&&this.boundDynamicVertexBuffer===r&&this.boundDynamicVertexBuffer2===n?(t.bindVertexArrayOES.set(this.vao),r&&r.bind(),s&&s.dynamicDraw&&s.bind(),n&&n.bind()):this.freshBind(e,i,o,s,a,r,n);}freshBind(t,e,i,o,s,a,r){let n;const l=t.numAttributes,c=this.context,h=c.gl;if(c.extVertexArrayObject)this.vao&&this.destroy(),this.vao=c.extVertexArrayObject.createVertexArrayOES(),c.bindVertexArrayOES.set(this.vao),n=0,this.boundProgram=t,this.boundLayoutVertexBuffer=e,this.boundPaintVertexBuffers=i,this.boundIndexBuffer=o,this.boundVertexOffset=s,this.boundDynamicVertexBuffer=a,this.boundDynamicVertexBuffer2=r;else {n=c.currentNumAttributes||0;for(let t=l;t<n;t++)h.disableVertexAttribArray(t);}e.enableAttributes(h,t);for(const e of i)e.enableAttributes(h,t);a&&a.enableAttributes(h,t),r&&r.enableAttributes(h,t),e.bind(),e.setVertexAttribPointers(h,t,s);for(const e of i)e.bind(),e.setVertexAttribPointers(h,t,s);a&&(a.bind(),a.setVertexAttribPointers(h,t,s)),o&&o.bind(),r&&(r.bind(),r.setVertexAttribPointers(h,t,s)),c.currentNumAttributes=l;}destroy(){this.vao&&(this.context.extVertexArrayObject.deleteVertexArrayOES(this.vao),this.vao=null);}}function de(t){const e=[];for(let i=0;i<t.length;i++){if(null===t[i])continue;const o=t[i].split(" ");e.push(o.pop());}return e}class _e{constructor(t,e,i,o,s,a){const r=t.gl;this.program=r.createProgram();const n=de(i.staticAttributes),l=o?o.getBinderAttributes():[],c=n.concat(l),h=i.staticUniforms?de(i.staticUniforms):[],u=o?o.getBinderUniforms():[],d=h.concat(u),_=[];for(const t of d)_.indexOf(t)<0&&_.push(t);const m=o?o.defines():[];a&&m.push("#define OVERDRAW_INSPECTOR;");const p=m.concat(ce.prelude.fragmentSource,i.fragmentSource).join("\n"),f=m.concat(ce.prelude.vertexSource,i.vertexSource).join("\n"),g=r.createShader(r.FRAGMENT_SHADER);if(r.isContextLost())return void(this.failedToCreate=!0);r.shaderSource(g,p),r.compileShader(g),r.attachShader(this.program,g);const x=r.createShader(r.VERTEX_SHADER);if(r.isContextLost())return void(this.failedToCreate=!0);r.shaderSource(x,f),r.compileShader(x),r.attachShader(this.program,x),this.attributes={};const v={};this.numAttributes=c.length;for(let t=0;t<this.numAttributes;t++)c[t]&&(r.bindAttribLocation(this.program,t,c[t]),this.attributes[c[t]]=t);r.linkProgram(this.program),r.deleteShader(x),r.deleteShader(g);for(let t=0;t<_.length;t++){const e=_[t];if(e&&!v[e]){const t=r.getUniformLocation(this.program,e);t&&(v[e]=t);}}this.fixedUniforms=s(t,v),this.binderUniforms=o?o.getUniforms(t,v):[];}draw(t,e,i,o,s,a,r,n,l,c,h,u,d,_,m,p){const f=t.gl;if(this.failedToCreate)return;t.program.set(this.program),t.setDepthMode(i),t.setStencilMode(o),t.setColorMode(s),t.setCullFace(a);for(const t in this.fixedUniforms)this.fixedUniforms[t].set(r[t]);_&&_.setUniforms(t,this.binderUniforms,u,{zoom:d});const g={[f.LINES]:2,[f.TRIANGLES]:3,[f.LINE_STRIP]:1}[e];for(const i of h.get()){const o=i.vaos||(i.vaos={});(o[n]||(o[n]=new ue)).bind(t,this,l,_?_.getPaintVertexBuffers():[],c,i.vertexOffset,m,p),f.drawElements(e,i.primitiveLength*g,f.UNSIGNED_SHORT,i.primitiveOffset*g*2);}}}function me(t,e,i){const o=1/Dt(i,1,e.transform.tileZoom),s=Math.pow(2,i.tileID.overscaledZ),a=i.tileSize*Math.pow(2,e.transform.tileZoom)/s,r=a*(i.tileID.canonical.x+i.tileID.wrap*s),n=a*i.tileID.canonical.y;return {u_image:0,u_texsize:i.imageAtlasTexture.size,u_scale:[o,t.fromScale,t.toScale],u_fade:t.t,u_pixel_coord_upper:[r>>16,n>>16],u_pixel_coord_lower:[65535&r,65535&n]}}const pe=(e,i,o,s)=>{const a=i.style.light,r=a.properties.get("position"),n=g(r.x,r.y,r.z),l=(c=new t.ARRAY_TYPE(9),t.ARRAY_TYPE!=Float32Array&&(c[1]=0,c[2]=0,c[3]=0,c[5]=0,c[6]=0,c[7]=0),c[0]=1,c[4]=1,c[8]=1,c);var c;"viewport"===a.properties.get("anchor")&&function(t,e){var i=Math.sin(e),o=Math.cos(e);t[0]=o,t[1]=i,t[2]=0,t[3]=-i,t[4]=o,t[5]=0,t[6]=0,t[7]=0,t[8]=1;}(l,-i.transform.angle),function(t,e,i){var o=e[0],s=e[1],a=e[2];t[0]=o*i[0]+s*i[3]+a*i[6],t[1]=o*i[1]+s*i[4]+a*i[7],t[2]=o*i[2]+s*i[5]+a*i[8];}(n,n,l);const h=a.properties.get("color");return {u_matrix:e,u_lightpos:n,u_lightintensity:a.properties.get("intensity"),u_lightcolor:[h.r,h.g,h.b],u_vertical_gradient:+o,u_opacity:s}},fe=(e,i,o,s,a,r,n)=>t.extend(pe(e,i,o,s),me(r,i,n),{u_height_factor:-Math.pow(2,a.overscaledZ)/n.tileSize/8}),ge=t=>({u_matrix:t}),xe=(e,i,o,s)=>t.extend(ge(e),me(o,i,s)),ve=(t,e)=>({u_matrix:t,u_world:e}),ye=(e,i,o,s,a)=>t.extend(xe(e,i,o,s),{u_world:a}),be=(t,e,i,o)=>{const s=t.transform;let a,r;if("map"===o.paint.get("circle-pitch-alignment")){const t=Dt(i,1,s.zoom);a=!0,r=[t,t];}else a=!1,r=s.pixelsToGLUnits;return {u_camera_to_center_distance:s.cameraToCenterDistance,u_scale_with_map:+("map"===o.paint.get("circle-pitch-scale")),u_matrix:t.translatePosMatrix(e.posMatrix,i,o.paint.get("circle-translate"),o.paint.get("circle-translate-anchor")),u_pitch_with_map:+a,u_device_pixel_ratio:devicePixelRatio,u_extrude_scale:r}},we=(t,e,i)=>{const o=Dt(i,1,e.zoom),s=Math.pow(2,e.zoom-i.tileID.overscaledZ),a=i.tileID.overscaleFactor();return {u_matrix:t,u_camera_to_center_distance:e.cameraToCenterDistance,u_pixels_to_tile_units:o,u_extrude_scale:[e.pixelsToGLUnits[0]/(o*s),e.pixelsToGLUnits[1]/(o*s)],u_overscale_factor:a}},Te=(t,e,i=1)=>({u_matrix:t,u_color:e,u_overlay:0,u_overlay_scale:i}),Ee=t=>({u_matrix:t}),Ie=(t,e,i,o)=>({u_matrix:t,u_extrude_scale:Dt(e,1,i),u_intensity:o});function Pe(e,i){const o=Math.pow(2,i.canonical.z),s=i.canonical.y;return [new t.MercatorCoordinate(0,s/o).toLngLat().lat,new t.MercatorCoordinate(0,(s+1)/o).toLngLat().lat]}const Se=(t,e,i)=>{const o=t.transform;return {u_matrix:Me(t,e,i),u_ratio:1/Dt(e,1,o.zoom),u_device_pixel_ratio:devicePixelRatio,u_units_to_pixels:[1/o.pixelsToGLUnits[0],1/o.pixelsToGLUnits[1]]}},Ce=(e,i,o,s)=>t.extend(Se(e,i,o),{u_image:0,u_image_height:s}),ze=(t,e,i,o)=>{const s=t.transform,a=Ae(e,s);return {u_matrix:Me(t,e,i),u_texsize:e.imageAtlasTexture.size,u_ratio:1/Dt(e,1,s.zoom),u_device_pixel_ratio:devicePixelRatio,u_image:0,u_scale:[a,o.fromScale,o.toScale],u_fade:o.t,u_units_to_pixels:[1/s.pixelsToGLUnits[0],1/s.pixelsToGLUnits[1]]}},De=(e,i,o,s,a)=>{const r=e.lineAtlas,n=Ae(i,e.transform),l="round"===o.layout.get("line-cap"),c=r.getDash(s.from,l),h=r.getDash(s.to,l),u=c.width*a.fromScale,d=h.width*a.toScale;return t.extend(Se(e,i,o),{u_patternscale_a:[n/u,-c.height/2],u_patternscale_b:[n/d,-h.height/2],u_sdfgamma:r.width/(256*Math.min(u,d)*devicePixelRatio)/2,u_image:0,u_tex_y_a:c.y,u_tex_y_b:h.y,u_mix:a.t})};function Ae(t,e){return 1/Dt(t,1,e.tileZoom)}function Me(t,e,i){return t.translatePosMatrix(e.tileID.posMatrix,e,i.paint.get("line-translate"),i.paint.get("line-translate-anchor"))}const Le=(t,e,i,o,s)=>{return {u_matrix:t,u_tl_parent:e,u_scale_parent:i,u_buffer_scale:1,u_fade_t:o.mix,u_opacity:o.opacity*s.paint.get("raster-opacity"),u_image0:0,u_image1:1,u_brightness_low:s.paint.get("raster-brightness-min"),u_brightness_high:s.paint.get("raster-brightness-max"),u_saturation_factor:(r=s.paint.get("raster-saturation"),r>0?1-1/(1.001-r):-r),u_contrast_factor:(a=s.paint.get("raster-contrast"),a>0?1/(1-a):1+a),u_spin_weights:Re(s.paint.get("raster-hue-rotate"))};var a,r;};function Re(t){t*=Math.PI/180;const e=Math.sin(t),i=Math.cos(t);return [(2*i+1)/3,(-Math.sqrt(3)*e-i+1)/3,(Math.sqrt(3)*e-i+1)/3]}const ke=(t,e,i,o,s,a,r,n,l,c)=>{const h=s.transform;return {u_is_size_zoom_constant:+("constant"===t||"source"===t),u_is_size_feature_constant:+("constant"===t||"camera"===t),u_size_t:e?e.uSizeT:0,u_size:e?e.uSize:0,u_camera_to_center_distance:h.cameraToCenterDistance,u_pitch:h.pitch/360*2*Math.PI,u_rotate_symbol:+i,u_aspect_ratio:h.width/h.height,u_fade_change:s.options.fadeDuration?s.symbolFadeChange:1,u_matrix:a,u_label_plane_matrix:r,u_coord_matrix:n,u_is_text:+l,u_pitch_with_map:+o,u_texsize:c,u_texture:0}},Be=(e,i,o,s,a,r,n,l,c,h,u)=>{const d=a.transform;return t.extend(ke(e,i,o,s,a,r,n,l,c,h),{u_gamma_scale:s?Math.cos(d._pitch)*d.cameraToCenterDistance:1,u_device_pixel_ratio:devicePixelRatio,u_is_halo:+u})},Fe=(e,i,o,s,a,r,n,l,c,h)=>t.extend(Be(e,i,o,s,a,r,n,l,!0,c,!0),{u_texsize_icon:h,u_texture_icon:1}),Oe=(t,e,i)=>({u_matrix:t,u_opacity:e,u_color:i}),Ue=(e,i,o,s,a,r)=>t.extend(function(t,e,i,o){const s=i.imageManager.getPattern(t.from.toString()),a=i.imageManager.getPattern(t.to.toString()),{width:r,height:n}=i.imageManager.getPixelSize(),l=Math.pow(2,o.tileID.overscaledZ),c=o.tileSize*Math.pow(2,i.transform.tileZoom)/l,h=c*(o.tileID.canonical.x+o.tileID.wrap*l),u=c*o.tileID.canonical.y;return {u_image:0,u_pattern_tl_a:s.tl,u_pattern_br_a:s.br,u_pattern_tl_b:a.tl,u_pattern_br_b:a.br,u_texsize:[r,n],u_mix:e.t,u_pattern_size_a:s.displaySize,u_pattern_size_b:a.displaySize,u_scale_a:e.fromScale,u_scale_b:e.toScale,u_tile_units_to_pixels:1/Dt(o,1,i.transform.tileZoom),u_pixel_coord_upper:[h>>16,u>>16],u_pixel_coord_lower:[65535&h,65535&u]}}(s,r,o,a),{u_matrix:e,u_opacity:i}),Ne={fillExtrusion:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient),u_opacity:new t.Uniform1f(e,i.u_opacity)}),fillExtrusionPattern:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient),u_height_factor:new t.Uniform1f(e,i.u_height_factor),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade),u_opacity:new t.Uniform1f(e,i.u_opacity)}),fill:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}),fillPattern:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}),fillOutline:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world)}),fillOutlinePattern:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}),circle:(e,i)=>({u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_scale_with_map:new t.Uniform1i(e,i.u_scale_with_map),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}),collisionBox:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pixels_to_tile_units:new t.Uniform1f(e,i.u_pixels_to_tile_units),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_overscale_factor:new t.Uniform1f(e,i.u_overscale_factor)}),collisionCircle:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_inv_matrix:new t.UniformMatrix4f(e,i.u_inv_matrix),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_viewport_size:new t.Uniform2f(e,i.u_viewport_size)}),debug:(e,i)=>({u_color:new t.UniformColor(e,i.u_color),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_overlay:new t.Uniform1i(e,i.u_overlay),u_overlay_scale:new t.Uniform1f(e,i.u_overlay_scale)}),clippingMask:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}),heatmap:(e,i)=>({u_extrude_scale:new t.Uniform1f(e,i.u_extrude_scale),u_intensity:new t.Uniform1f(e,i.u_intensity),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}),heatmapTexture:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_color_ramp:new t.Uniform1i(e,i.u_color_ramp),u_opacity:new t.Uniform1f(e,i.u_opacity)}),hillshade:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_latrange:new t.Uniform2f(e,i.u_latrange),u_light:new t.Uniform2f(e,i.u_light),u_shadow:new t.UniformColor(e,i.u_shadow),u_highlight:new t.UniformColor(e,i.u_highlight),u_accent:new t.UniformColor(e,i.u_accent)}),hillshadePrepare:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_dimension:new t.Uniform2f(e,i.u_dimension),u_zoom:new t.Uniform1f(e,i.u_zoom),u_unpack:new t.Uniform4f(e,i.u_unpack)}),line:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels)}),lineGradient:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_image:new t.Uniform1i(e,i.u_image),u_image_height:new t.Uniform1f(e,i.u_image_height)}),linePattern:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_texsize:new t.Uniform2f(e,i.u_texsize),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_image:new t.Uniform1i(e,i.u_image),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_scale:new t.Uniform3f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}),lineSDF:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_units_to_pixels:new t.Uniform2f(e,i.u_units_to_pixels),u_patternscale_a:new t.Uniform2f(e,i.u_patternscale_a),u_patternscale_b:new t.Uniform2f(e,i.u_patternscale_b),u_sdfgamma:new t.Uniform1f(e,i.u_sdfgamma),u_image:new t.Uniform1i(e,i.u_image),u_tex_y_a:new t.Uniform1f(e,i.u_tex_y_a),u_tex_y_b:new t.Uniform1f(e,i.u_tex_y_b),u_mix:new t.Uniform1f(e,i.u_mix)}),raster:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_tl_parent:new t.Uniform2f(e,i.u_tl_parent),u_scale_parent:new t.Uniform1f(e,i.u_scale_parent),u_buffer_scale:new t.Uniform1f(e,i.u_buffer_scale),u_fade_t:new t.Uniform1f(e,i.u_fade_t),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image0:new t.Uniform1i(e,i.u_image0),u_image1:new t.Uniform1i(e,i.u_image1),u_brightness_low:new t.Uniform1f(e,i.u_brightness_low),u_brightness_high:new t.Uniform1f(e,i.u_brightness_high),u_saturation_factor:new t.Uniform1f(e,i.u_saturation_factor),u_contrast_factor:new t.Uniform1f(e,i.u_contrast_factor),u_spin_weights:new t.Uniform3f(e,i.u_spin_weights)}),symbolIcon:(e,i)=>({u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture)}),symbolSDF:(e,i)=>({u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture),u_gamma_scale:new t.Uniform1f(e,i.u_gamma_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_is_halo:new t.Uniform1i(e,i.u_is_halo)}),symbolTextAndIcon:(e,i)=>({u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_coord_matrix:new t.UniformMatrix4f(e,i.u_coord_matrix),u_is_text:new t.Uniform1i(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texsize_icon:new t.Uniform2f(e,i.u_texsize_icon),u_texture:new t.Uniform1i(e,i.u_texture),u_texture_icon:new t.Uniform1i(e,i.u_texture_icon),u_gamma_scale:new t.Uniform1f(e,i.u_gamma_scale),u_device_pixel_ratio:new t.Uniform1f(e,i.u_device_pixel_ratio),u_is_halo:new t.Uniform1i(e,i.u_is_halo)}),background:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_color:new t.UniformColor(e,i.u_color)}),backgroundPattern:(e,i)=>({u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image:new t.Uniform1i(e,i.u_image),u_pattern_tl_a:new t.Uniform2f(e,i.u_pattern_tl_a),u_pattern_br_a:new t.Uniform2f(e,i.u_pattern_br_a),u_pattern_tl_b:new t.Uniform2f(e,i.u_pattern_tl_b),u_pattern_br_b:new t.Uniform2f(e,i.u_pattern_br_b),u_texsize:new t.Uniform2f(e,i.u_texsize),u_mix:new t.Uniform1f(e,i.u_mix),u_pattern_size_a:new t.Uniform2f(e,i.u_pattern_size_a),u_pattern_size_b:new t.Uniform2f(e,i.u_pattern_size_b),u_scale_a:new t.Uniform1f(e,i.u_scale_a),u_scale_b:new t.Uniform1f(e,i.u_scale_b),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_tile_units_to_pixels:new t.Uniform1f(e,i.u_tile_units_to_pixels)})};class Ze{constructor(t,e,i){this.context=t;const o=t.gl;this.buffer=o.createBuffer(),this.dynamicDraw=Boolean(i),this.context.unbindVAO(),t.bindElementBuffer.set(this.buffer),o.bufferData(o.ELEMENT_ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?o.DYNAMIC_DRAW:o.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;}bind(){this.context.bindElementBuffer.set(this.buffer);}updateData(t){const e=this.context.gl;this.context.unbindVAO(),this.bind(),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t.arrayBuffer);}destroy(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);}}const Ve={Int8:"BYTE",Uint8:"UNSIGNED_BYTE",Int16:"SHORT",Uint16:"UNSIGNED_SHORT",Int32:"INT",Uint32:"UNSIGNED_INT",Float32:"FLOAT"};class qe{constructor(t,e,i,o){this.length=e.length,this.attributes=i,this.itemSize=e.bytesPerElement,this.dynamicDraw=o,this.context=t;const s=t.gl;this.buffer=s.createBuffer(),t.bindVertexBuffer.set(this.buffer),s.bufferData(s.ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?s.DYNAMIC_DRAW:s.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;}bind(){this.context.bindVertexBuffer.set(this.buffer);}updateData(t){const e=this.context.gl;this.bind(),e.bufferSubData(e.ARRAY_BUFFER,0,t.arrayBuffer);}enableAttributes(t,e){for(let i=0;i<this.attributes.length;i++){const o=e.attributes[this.attributes[i].name];void 0!==o&&t.enableVertexAttribArray(o);}}setVertexAttribPointers(t,e,i){for(let o=0;o<this.attributes.length;o++){const s=this.attributes[o],a=e.attributes[s.name];void 0!==a&&t.vertexAttribPointer(a,s.components,t[Ve[s.type]],!1,this.itemSize,s.offset+this.itemSize*(i||0));}}destroy(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);}}class Ge{constructor(t){this.gl=t.gl,this.default=this.getDefault(),this.current=this.default,this.dirty=!1;}get(){return this.current}set(t){}getDefault(){return this.default}setDefault(){this.set(this.default);}}class je extends Ge{getDefault(){return t.Color.transparent}set(t){const e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.clearColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);}}class $e extends Ge{getDefault(){return 1}set(t){(t!==this.current||this.dirty)&&(this.gl.clearDepth(t),this.current=t,this.dirty=!1);}}class We extends Ge{getDefault(){return 0}set(t){(t!==this.current||this.dirty)&&(this.gl.clearStencil(t),this.current=t,this.dirty=!1);}}class Xe extends Ge{getDefault(){return [!0,!0,!0,!0]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.colorMask(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);}}class He extends Ge{getDefault(){return !0}set(t){(t!==this.current||this.dirty)&&(this.gl.depthMask(t),this.current=t,this.dirty=!1);}}class Ke extends Ge{getDefault(){return 255}set(t){(t!==this.current||this.dirty)&&(this.gl.stencilMask(t),this.current=t,this.dirty=!1);}}class Ye extends Ge{getDefault(){return {func:this.gl.ALWAYS,ref:0,mask:255}}set(t){const e=this.current;(t.func!==e.func||t.ref!==e.ref||t.mask!==e.mask||this.dirty)&&(this.gl.stencilFunc(t.func,t.ref,t.mask),this.current=t,this.dirty=!1);}}class Je extends Ge{getDefault(){const t=this.gl;return [t.KEEP,t.KEEP,t.KEEP]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||this.dirty)&&(this.gl.stencilOp(t[0],t[1],t[2]),this.current=t,this.dirty=!1);}}class Qe extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.STENCIL_TEST):e.disable(e.STENCIL_TEST),this.current=t,this.dirty=!1;}}class ti extends Ge{getDefault(){return [0,1]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.depthRange(t[0],t[1]),this.current=t,this.dirty=!1);}}class ei extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST),this.current=t,this.dirty=!1;}}class ii extends Ge{getDefault(){return this.gl.LESS}set(t){(t!==this.current||this.dirty)&&(this.gl.depthFunc(t),this.current=t,this.dirty=!1);}}class oi extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.BLEND):e.disable(e.BLEND),this.current=t,this.dirty=!1;}}class si extends Ge{getDefault(){const t=this.gl;return [t.ONE,t.ZERO]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.blendFunc(t[0],t[1]),this.current=t,this.dirty=!1);}}class ai extends Ge{getDefault(){return t.Color.transparent}set(t){const e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.blendColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);}}class ri extends Ge{getDefault(){return this.gl.FUNC_ADD}set(t){(t!==this.current||this.dirty)&&(this.gl.blendEquation(t),this.current=t,this.dirty=!1);}}class ni extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),this.current=t,this.dirty=!1;}}class li extends Ge{getDefault(){return this.gl.BACK}set(t){(t!==this.current||this.dirty)&&(this.gl.cullFace(t),this.current=t,this.dirty=!1);}}class ci extends Ge{getDefault(){return this.gl.CCW}set(t){(t!==this.current||this.dirty)&&(this.gl.frontFace(t),this.current=t,this.dirty=!1);}}class hi extends Ge{getDefault(){return null}set(t){(t!==this.current||this.dirty)&&(this.gl.useProgram(t),this.current=t,this.dirty=!1);}}class ui extends Ge{getDefault(){return this.gl.TEXTURE0}set(t){(t!==this.current||this.dirty)&&(this.gl.activeTexture(t),this.current=t,this.dirty=!1);}}class di extends Ge{getDefault(){const t=this.gl;return [0,0,t.drawingBufferWidth,t.drawingBufferHeight]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.viewport(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);}}class _i extends Ge{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,t),this.current=t,this.dirty=!1;}}class mi extends Ge{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindRenderbuffer(e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}}class pi extends Ge{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindTexture(e.TEXTURE_2D,t),this.current=t,this.dirty=!1;}}class fi extends Ge{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}}class gi extends Ge{getDefault(){return null}set(t){const e=this.gl;e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}}class xi extends Ge{constructor(t){super(t),this.vao=t.extVertexArrayObject;}getDefault(){return null}set(t){this.vao&&(t!==this.current||this.dirty)&&(this.vao.bindVertexArrayOES(t),this.current=t,this.dirty=!1);}}class vi extends Ge{getDefault(){return 4}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_ALIGNMENT,t),this.current=t,this.dirty=!1;}}class yi extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t),this.current=t,this.dirty=!1;}}class bi extends Ge{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t),this.current=t,this.dirty=!1;}}class wi extends Ge{constructor(t,e){super(t),this.context=t,this.parent=e;}getDefault(){return null}}class Ti extends wi{setDirty(){this.dirty=!0;}set(t){if(t===this.current&&!this.dirty)return;this.context.bindFramebuffer.set(this.parent);const e=this.gl;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),this.current=t,this.dirty=!1;}}class Ei extends wi{set(t){if(t===this.current&&!this.dirty)return;this.context.bindFramebuffer.set(this.parent);const e=this.gl;e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}}class Ii{constructor(t,e,i,o){this.context=t,this.width=e,this.height=i;const s=this.framebuffer=t.gl.createFramebuffer();this.colorAttachment=new Ti(t,s),o&&(this.depthAttachment=new Ei(t,s));}destroy(){const t=this.context.gl,e=this.colorAttachment.get();if(e&&t.deleteTexture(e),this.depthAttachment){const e=this.depthAttachment.get();e&&t.deleteRenderbuffer(e);}t.deleteFramebuffer(this.framebuffer);}}class Pi{constructor(t,e,i){this.blendFunction=t,this.blendColor=e,this.mask=i;}}Pi.Replace=[1,0],Pi.disabled=new Pi(Pi.Replace,t.Color.transparent,[!1,!1,!1,!1]),Pi.unblended=new Pi(Pi.Replace,t.Color.transparent,[!0,!0,!0,!0]),Pi.alphaBlended=new Pi([1,771],t.Color.transparent,[!0,!0,!0,!0]);class Si{constructor(t){this.gl=t,this.extVertexArrayObject=this.gl.getExtension("OES_vertex_array_object"),this.clearColor=new je(this),this.clearDepth=new $e(this),this.clearStencil=new We(this),this.colorMask=new Xe(this),this.depthMask=new He(this),this.stencilMask=new Ke(this),this.stencilFunc=new Ye(this),this.stencilOp=new Je(this),this.stencilTest=new Qe(this),this.depthRange=new ti(this),this.depthTest=new ei(this),this.depthFunc=new ii(this),this.blend=new oi(this),this.blendFunc=new si(this),this.blendColor=new ai(this),this.blendEquation=new ri(this),this.cullFace=new ni(this),this.cullFaceSide=new li(this),this.frontFace=new ci(this),this.program=new hi(this),this.activeTexture=new ui(this),this.viewport=new di(this),this.bindFramebuffer=new _i(this),this.bindRenderbuffer=new mi(this),this.bindTexture=new pi(this),this.bindVertexBuffer=new fi(this),this.bindElementBuffer=new gi(this),this.bindVertexArrayOES=this.extVertexArrayObject&&new xi(this),this.pixelStoreUnpack=new vi(this),this.pixelStoreUnpackPremultiplyAlpha=new yi(this),this.pixelStoreUnpackFlipY=new bi(this),this.extTextureFilterAnisotropic=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),this.extTextureFilterAnisotropic&&(this.extTextureFilterAnisotropicMax=t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),this.extTextureHalfFloat=t.getExtension("OES_texture_half_float"),this.extTextureHalfFloat&&(t.getExtension("OES_texture_half_float_linear"),this.extRenderToTextureHalfFloat=t.getExtension("EXT_color_buffer_half_float")),this.extTimerQuery=t.getExtension("EXT_disjoint_timer_query"),this.maxTextureSize=t.getParameter(t.MAX_TEXTURE_SIZE);}setDefault(){this.unbindVAO(),this.clearColor.setDefault(),this.clearDepth.setDefault(),this.clearStencil.setDefault(),this.colorMask.setDefault(),this.depthMask.setDefault(),this.stencilMask.setDefault(),this.stencilFunc.setDefault(),this.stencilOp.setDefault(),this.stencilTest.setDefault(),this.depthRange.setDefault(),this.depthTest.setDefault(),this.depthFunc.setDefault(),this.blend.setDefault(),this.blendFunc.setDefault(),this.blendColor.setDefault(),this.blendEquation.setDefault(),this.cullFace.setDefault(),this.cullFaceSide.setDefault(),this.frontFace.setDefault(),this.program.setDefault(),this.activeTexture.setDefault(),this.bindFramebuffer.setDefault(),this.pixelStoreUnpack.setDefault(),this.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.pixelStoreUnpackFlipY.setDefault();}setDirty(){this.clearColor.dirty=!0,this.clearDepth.dirty=!0,this.clearStencil.dirty=!0,this.colorMask.dirty=!0,this.depthMask.dirty=!0,this.stencilMask.dirty=!0,this.stencilFunc.dirty=!0,this.stencilOp.dirty=!0,this.stencilTest.dirty=!0,this.depthRange.dirty=!0,this.depthTest.dirty=!0,this.depthFunc.dirty=!0,this.blend.dirty=!0,this.blendFunc.dirty=!0,this.blendColor.dirty=!0,this.blendEquation.dirty=!0,this.cullFace.dirty=!0,this.cullFaceSide.dirty=!0,this.frontFace.dirty=!0,this.program.dirty=!0,this.activeTexture.dirty=!0,this.viewport.dirty=!0,this.bindFramebuffer.dirty=!0,this.bindRenderbuffer.dirty=!0,this.bindTexture.dirty=!0,this.bindVertexBuffer.dirty=!0,this.bindElementBuffer.dirty=!0,this.extVertexArrayObject&&(this.bindVertexArrayOES.dirty=!0),this.pixelStoreUnpack.dirty=!0,this.pixelStoreUnpackPremultiplyAlpha.dirty=!0,this.pixelStoreUnpackFlipY.dirty=!0;}createIndexBuffer(t,e){return new Ze(this,t,e)}createVertexBuffer(t,e,i){return new qe(this,t,e,i)}createRenderbuffer(t,e,i){const o=this.gl,s=o.createRenderbuffer();return this.bindRenderbuffer.set(s),o.renderbufferStorage(o.RENDERBUFFER,t,e,i),this.bindRenderbuffer.set(null),s}createFramebuffer(t,e,i){return new Ii(this,t,e,i)}clear({color:t,depth:e}){const i=this.gl;let o=0;t&&(o|=i.COLOR_BUFFER_BIT,this.clearColor.set(t),this.colorMask.set([!0,!0,!0,!0])),void 0!==e&&(o|=i.DEPTH_BUFFER_BIT,this.depthRange.set([0,1]),this.clearDepth.set(e),this.depthMask.set(!0)),i.clear(o);}setCullFace(t){!1===t.enable?this.cullFace.set(!1):(this.cullFace.set(!0),this.cullFaceSide.set(t.mode),this.frontFace.set(t.frontFace));}setDepthMode(t){t.func!==this.gl.ALWAYS||t.mask?(this.depthTest.set(!0),this.depthFunc.set(t.func),this.depthMask.set(t.mask),this.depthRange.set(t.range)):this.depthTest.set(!1);}setStencilMode(t){t.test.func!==this.gl.ALWAYS||t.mask?(this.stencilTest.set(!0),this.stencilMask.set(t.mask),this.stencilOp.set([t.fail,t.depthFail,t.pass]),this.stencilFunc.set({func:t.test.func,ref:t.ref,mask:t.test.mask})):this.stencilTest.set(!1);}setColorMode(t){a(t.blendFunction,Pi.Replace)?this.blend.set(!1):(this.blend.set(!0),this.blendFunc.set(t.blendFunction),this.blendColor.set(t.blendColor)),this.colorMask.set(t.mask);}unbindVAO(){this.extVertexArrayObject&&this.bindVertexArrayOES.set(null);}}class Ci{constructor(t,e,i){this.func=t,this.mask=e,this.range=i;}}Ci.ReadOnly=!1,Ci.ReadWrite=!0,Ci.disabled=new Ci(519,Ci.ReadOnly,[0,1]);const zi=7680;class Di{constructor(t,e,i,o,s,a){this.test=t,this.ref=e,this.mask=i,this.fail=o,this.depthFail=s,this.pass=a;}}Di.disabled=new Di({func:519,mask:0},0,0,zi,zi,zi);class Ai{constructor(t,e,i){this.enable=t,this.mode=e,this.frontFace=i;}}let Mi;function Li(e,i,o,s,a,r,n){const l=e.context,c=l.gl,h=e.useProgram("collisionBox"),u=[];let d=0,_=0;for(let m=0;m<s.length;m++){const p=s[m],f=i.getTile(p),g=f.getBucket(o);if(!g)continue;let x=p.posMatrix;0===a[0]&&0===a[1]||(x=e.translatePosMatrix(p.posMatrix,f,a,r));const v=n?g.textCollisionBox:g.iconCollisionBox,y=g.collisionCircleArray;if(y.length>0){const i=t.create(),o=x;t.mul(i,g.placementInvProjMatrix,e.transform.glCoordMatrix),t.mul(i,i,g.placementViewportMatrix),u.push({circleArray:y,circleOffset:_,transform:o,invTransform:i}),d+=y.length/4,_=d;}v&&h.draw(l,c.LINES,Ci.disabled,Di.disabled,e.colorModeForRenderPass(),Ai.disabled,we(x,e.transform,f),o.id,v.layoutVertexBuffer,v.indexBuffer,v.segments,null,e.transform.zoom,null,null,v.collisionVertexBuffer);}if(!n||!u.length)return;const m=e.useProgram("collisionCircle"),p=new t.StructArrayLayout2f1f2i16;p.resize(4*d),p._trim();let f=0;for(const t of u)for(let e=0;e<t.circleArray.length/4;e++){const i=4*e,o=t.circleArray[i+0],s=t.circleArray[i+1],a=t.circleArray[i+2],r=t.circleArray[i+3];p.emplace(f++,o,s,a,r,0),p.emplace(f++,o,s,a,r,1),p.emplace(f++,o,s,a,r,2),p.emplace(f++,o,s,a,r,3);}(!Mi||Mi.length<2*d)&&(Mi=function(e){const i=2*e,o=new t.StructArrayLayout3ui6;o.resize(i),o._trim();for(let t=0;t<i;t++){const e=6*t;o.uint16[e+0]=4*t+0,o.uint16[e+1]=4*t+1,o.uint16[e+2]=4*t+2,o.uint16[e+3]=4*t+2,o.uint16[e+4]=4*t+3,o.uint16[e+5]=4*t+0;}return o}(d));const g=l.createIndexBuffer(Mi,!0),x=l.createVertexBuffer(p,t.collisionCircleLayout.members,!0);for(const i of u){const s={u_matrix:i.transform,u_inv_matrix:i.invTransform,u_camera_to_center_distance:(v=e.transform).cameraToCenterDistance,u_viewport_size:[v.width,v.height]};m.draw(l,c.TRIANGLES,Ci.disabled,Di.disabled,e.colorModeForRenderPass(),Ai.disabled,s,o.id,x,g,t.SegmentVector.simpleSegment(0,2*i.circleOffset,i.circleArray.length,i.circleArray.length/2),null,e.transform.zoom,null,null,null);}var v;x.destroy(),g.destroy();}Ai.disabled=new Ai(!1,1029,2305),Ai.backCCW=new Ai(!0,1029,2305);const Ri=t.create();function ki(e,i,o,s,a,r){const{horizontalAlign:n,verticalAlign:l}=t.getAnchorAlignment(e),c=-(n-.5)*i,h=-(l-.5)*o,u=t.evaluateVariableOffset(e,s);return new t.Point((c/a+u[0])*r,(h/a+u[1])*r)}function Bi(e,i,o,s,a,r,n,l,c,h,u){const d=e.text.placedSymbolArray,_=e.text.dynamicLayoutVertexArray,m=e.icon.dynamicLayoutVertexArray,p={};_.clear();for(let m=0;m<d.length;m++){const f=d.get(m),g=e.allowVerticalPlacement&&!f.placedOrientation,x=f.hidden||!f.crossTileID||g?null:s[f.crossTileID];if(x){const s=new t.Point(f.anchorX,f.anchorY),d=ft(s,o?l:n),m=gt(r.cameraToCenterDistance,d.signedDistanceFromCamera);let g=a.evaluateSizeForFeature(e.textSizeData,h,f)*m/t.ONE_EM;o&&(g*=e.tilePixelRatio/c);const{width:v,height:y,anchor:b,textOffset:w,textBoxScale:T}=x,E=ki(b,v,y,w,T,g),I=o?ft(s.add(E),n).point:d.point.add(i?E.rotate(-r.angle):E),P=e.allowVerticalPlacement&&f.placedOrientation===t.WritingMode.vertical?Math.PI/2:0;for(let e=0;e<f.numGlyphs;e++)t.addDynamicAttributes(_,I,P);u&&f.associatedIconIndex>=0&&(p[f.associatedIconIndex]={shiftedAnchor:I,angle:P});}else Pt(f.numGlyphs,_);}if(u){m.clear();const i=e.icon.placedSymbolArray;for(let e=0;e<i.length;e++){const o=i.get(e);if(o.hidden)Pt(o.numGlyphs,m);else {const i=p[e];if(i)for(let e=0;e<o.numGlyphs;e++)t.addDynamicAttributes(m,i.shiftedAnchor,i.angle);else Pt(o.numGlyphs,m);}}e.icon.dynamicLayoutVertexBuffer.updateData(m);}e.text.dynamicLayoutVertexBuffer.updateData(_);}function Fi(t,e,i){return i.iconsInText&&e?"symbolTextAndIcon":t?"symbolSDF":"symbolIcon"}function Oi(e,i,o,s,a,r,n,l,c,h,u,d){const _=e.context,m=_.gl,p=e.transform,f="map"===l,g="map"===c,x=f&&"point"!==o.layout.get("symbol-placement"),v=f&&!g&&!x,y=!o.layout.get("symbol-sort-key").isConstant();let b=!1;const w=e.depthModeForSublayer(0,Ci.ReadOnly),T=o.layout.get("text-variable-anchor"),E=[];for(const l of s){const s=i.getTile(l),c=s.getBucket(o);if(!c)continue;const u=a?c.text:c.icon;if(!u||!u.segments.get().length)continue;const d=u.programConfigurations.get(o.id),_=a||c.sdfIcons,w=a?c.textSizeData:c.iconSizeData,I=g||0!==p.pitch,P=e.useProgram(Fi(_,a,c),d),S=t.evaluateSizeForZoom(w,p.zoom);let C,z,D,A,M=[0,0],L=null;if(a){if(z=s.glyphAtlasTexture,D=m.LINEAR,C=s.glyphAtlasTexture.size,c.iconsInText){M=s.imageAtlasTexture.size,L=s.imageAtlasTexture;const t="composite"===w.kind||"camera"===w.kind;A=I||e.options.rotating||e.options.zooming||t?m.LINEAR:m.NEAREST;}}else {const t=1!==o.layout.get("icon-size").constantOr(0)||c.iconsNeedLinear;z=s.imageAtlasTexture,D=_||e.options.rotating||e.options.zooming||t||I?m.LINEAR:m.NEAREST,C=s.imageAtlasTexture.size;}const R=Dt(s,1,e.transform.zoom),k=mt(l.posMatrix,g,f,e.transform,R),B=pt(l.posMatrix,g,f,e.transform,R),F=T&&c.hasTextData(),O="none"!==o.layout.get("icon-text-fit")&&F&&c.hasIconData();x&&vt(c,l.posMatrix,e,a,k,B,g,h);const U=e.translatePosMatrix(l.posMatrix,s,r,n),N=x||a&&T||O?Ri:k,Z=e.translatePosMatrix(B,s,r,n,!0),V=_&&0!==o.paint.get(a?"text-halo-width":"icon-halo-width").constantOr(1);let q;q=_?c.iconsInText?Fe(w.kind,S,v,g,e,U,N,Z,C,M):Be(w.kind,S,v,g,e,U,N,Z,a,C,!0):ke(w.kind,S,v,g,e,U,N,Z,a,C);const G={program:P,buffers:u,uniformValues:q,atlasTexture:z,atlasTextureIcon:L,atlasInterpolation:D,atlasInterpolationIcon:A,isSDF:_,hasHalo:V};if(y&&c.canOverlap){b=!0;const e=u.segments.get();for(const i of e)E.push({segments:new t.SegmentVector([i]),sortKey:i.sortKey,state:G});}else E.push({segments:u.segments,sortKey:0,state:G});}b&&E.sort(((t,e)=>t.sortKey-e.sortKey));for(const t of E){const i=t.state;if(_.activeTexture.set(m.TEXTURE0),i.atlasTexture.bind(i.atlasInterpolation,m.CLAMP_TO_EDGE),i.atlasTextureIcon&&(_.activeTexture.set(m.TEXTURE1),i.atlasTextureIcon&&i.atlasTextureIcon.bind(i.atlasInterpolationIcon,m.CLAMP_TO_EDGE)),i.isSDF){const s=i.uniformValues;i.hasHalo&&(s.u_is_halo=1,Ui(i.buffers,t.segments,o,e,i.program,w,u,d,s)),s.u_is_halo=0;}Ui(i.buffers,t.segments,o,e,i.program,w,u,d,i.uniformValues);}}function Ui(t,e,i,o,s,a,r,n,l){const c=o.context;s.draw(c,c.gl.TRIANGLES,a,r,n,Ai.disabled,l,i.id,t.layoutVertexBuffer,t.indexBuffer,e,i.paint,o.transform.zoom,t.programConfigurations.get(i.id),t.dynamicLayoutVertexBuffer,t.opacityVertexBuffer);}function Ni(t,e,i,o,s,a,r){const n=t.context.gl,l=i.paint.get("fill-pattern"),c=l&&l.constantOr(1),h=i.getCrossfadeParameters();let u,d,_,m,p;r?(d=c&&!i.getPaintProperty("fill-outline-color")?"fillOutlinePattern":"fillOutline",u=n.LINES):(d=c?"fillPattern":"fill",u=n.TRIANGLES);for(const f of o){const o=e.getTile(f);if(c&&!o.patternsLoaded())continue;const g=o.getBucket(i);if(!g)continue;const x=g.programConfigurations.get(i.id),v=t.useProgram(d,x);c&&(t.context.activeTexture.set(n.TEXTURE0),o.imageAtlasTexture.bind(n.LINEAR,n.CLAMP_TO_EDGE),x.updatePaintBuffers(h));const y=l.constantOr(null);if(y&&o.imageAtlas){const t=o.imageAtlas,e=t.patternPositions[y.to.toString()],i=t.patternPositions[y.from.toString()];e&&i&&x.setConstantPatternPositions(e,i);}const b=t.translatePosMatrix(f.posMatrix,o,i.paint.get("fill-translate"),i.paint.get("fill-translate-anchor"));if(r){m=g.indexBuffer2,p=g.segments2;const e=[n.drawingBufferWidth,n.drawingBufferHeight];_="fillOutlinePattern"===d&&c?ye(b,t,h,o,e):ve(b,e);}else m=g.indexBuffer,p=g.segments,_=c?xe(b,t,h,o):ge(b);v.draw(t.context,u,s,t.stencilModeForClipping(f),a,Ai.disabled,_,i.id,g.layoutVertexBuffer,m,p,i.paint,t.transform.zoom,x);}}function Zi(t,e,i,o,s,a,r){const n=t.context,l=n.gl,c=i.paint.get("fill-extrusion-pattern"),h=c.constantOr(1),u=i.getCrossfadeParameters(),d=i.paint.get("fill-extrusion-opacity");for(const _ of o){const o=e.getTile(_),m=o.getBucket(i);if(!m)continue;const p=m.programConfigurations.get(i.id),f=t.useProgram(h?"fillExtrusionPattern":"fillExtrusion",p);h&&(t.context.activeTexture.set(l.TEXTURE0),o.imageAtlasTexture.bind(l.LINEAR,l.CLAMP_TO_EDGE),p.updatePaintBuffers(u));const g=c.constantOr(null);if(g&&o.imageAtlas){const t=o.imageAtlas,e=t.patternPositions[g.to.toString()],i=t.patternPositions[g.from.toString()];e&&i&&p.setConstantPatternPositions(e,i);}const x=t.translatePosMatrix(_.posMatrix,o,i.paint.get("fill-extrusion-translate"),i.paint.get("fill-extrusion-translate-anchor")),v=i.paint.get("fill-extrusion-vertical-gradient"),y=h?fe(x,t,v,d,_,u,o):pe(x,t,v,d);f.draw(n,n.gl.TRIANGLES,s,a,r,Ai.backCCW,y,i.id,m.layoutVertexBuffer,m.indexBuffer,m.segments,i.paint,t.transform.zoom,p);}}function Vi(t,e,i,o,s,a){const r=t.context,n=r.gl,l=e.fbo;if(!l)return;const c=t.useProgram("hillshade");r.activeTexture.set(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,l.colorAttachment.get());const h=((t,e,i)=>{const o=i.paint.get("hillshade-shadow-color"),s=i.paint.get("hillshade-highlight-color"),a=i.paint.get("hillshade-accent-color");let r=i.paint.get("hillshade-illumination-direction")*(Math.PI/180);"viewport"===i.paint.get("hillshade-illumination-anchor")&&(r-=t.transform.angle);const n=!t.options.moving;return {u_matrix:t.transform.calculatePosMatrix(e.tileID.toUnwrapped(),n),u_image:0,u_latrange:Pe(0,e.tileID),u_light:[i.paint.get("hillshade-exaggeration"),r],u_shadow:o,u_highlight:s,u_accent:a}})(t,e,i);c.draw(r,n.TRIANGLES,o,s,a,Ai.disabled,h,i.id,t.rasterBoundsBuffer,t.quadTriangleIndexBuffer,t.rasterBoundsSegments);}function qi(e,i,o,s,a,r){const n=e.context,l=n.gl,c=i.dem;if(c&&c.data){const h=c.dim,u=c.stride,d=c.getPixels();if(n.activeTexture.set(l.TEXTURE1),n.pixelStoreUnpackPremultiplyAlpha.set(!1),i.demTexture=i.demTexture||e.getTileTexture(u),i.demTexture){const t=i.demTexture;t.update(d,{premultiply:!1}),t.bind(l.NEAREST,l.CLAMP_TO_EDGE);}else i.demTexture=new b(n,d,l.RGBA,{premultiply:!1}),i.demTexture.bind(l.NEAREST,l.CLAMP_TO_EDGE);n.activeTexture.set(l.TEXTURE0);let _=i.fbo;if(!_){const t=new b(n,{width:h,height:h,data:null},l.RGBA);t.bind(l.LINEAR,l.CLAMP_TO_EDGE),_=i.fbo=n.createFramebuffer(h,h,!0),_.colorAttachment.set(t.texture);}n.bindFramebuffer.set(_.framebuffer),n.viewport.set([0,0,h,h]),e.useProgram("hillshadePrepare").draw(n,l.TRIANGLES,s,a,r,Ai.disabled,((e,i)=>{const o=i.stride,s=t.create();return t.ortho(s,0,t.EXTENT,-t.EXTENT,0,0,1),t.translate(s,s,[0,-t.EXTENT,0]),{u_matrix:s,u_image:1,u_dimension:[o,o],u_zoom:e.overscaledZ,u_unpack:i.getUnpackVector()}})(i.tileID,c),o.id,e.rasterBoundsBuffer,e.quadTriangleIndexBuffer,e.rasterBoundsSegments),i.needsHillshadePrepare=!1;}}function Gi(e,i,o,s,a){const r=s.paint.get("raster-fade-duration");if(r>0){const s=t.exported.now(),n=(s-e.timeAdded)/r,l=i?(s-i.timeAdded)/r:-1,c=o.getSource(),h=a.coveringZoomLevel({tileSize:c.tileSize,roundZoom:c.roundZoom}),u=!i||Math.abs(i.tileID.overscaledZ-h)>Math.abs(e.tileID.overscaledZ-h),d=u&&e.refreshedUponExpiration?1:t.clamp(u?n:1-l,0,1);return e.refreshedUponExpiration&&n>=1&&(e.refreshedUponExpiration=!1),i?{opacity:1,mix:1-d}:{opacity:d,mix:0}}return {opacity:1,mix:0}}const ji=new t.Color(1,0,0,1),$i=new t.Color(0,1,0,1),Wi=new t.Color(0,0,1,1),Xi=new t.Color(1,0,1,1),Hi=new t.Color(0,1,1,1);function Ki(t,e,i,o){Ji(t,0,e+i/2,t.transform.width,i,o);}function Yi(t,e,i,o){Ji(t,e-i/2,0,i,t.transform.height,o);}function Ji(t,e,i,o,s,a){const r=t.context,n=r.gl;n.enable(n.SCISSOR_TEST),n.scissor(e*devicePixelRatio,i*devicePixelRatio,o*devicePixelRatio,s*devicePixelRatio),r.clear({color:a}),n.disable(n.SCISSOR_TEST);}function Qi(e,i,o){const s=e.context,a=s.gl,r=o.posMatrix,n=e.useProgram("debug"),l=Ci.disabled,c=Di.disabled,h=e.colorModeForRenderPass(),u="$debug";s.activeTexture.set(a.TEXTURE0),e.emptyTexture.bind(a.LINEAR,a.CLAMP_TO_EDGE),n.draw(s,a.LINE_STRIP,l,c,h,Ai.disabled,Te(r,t.Color.red),u,e.debugBuffer,e.tileBorderIndexBuffer,e.debugSegments);const d=i.getTileByID(o.key).latestRawTileData,_=Math.floor((d&&d.byteLength||0)/1024),m=i.getTile(o).tileSize,p=512/Math.min(m,512)*(o.overscaledZ/e.transform.zoom)*.5;let f=o.canonical.toString();o.overscaledZ!==o.canonical.z&&(f+=` => ${o.overscaledZ}`),function(t,e){t.initDebugOverlayCanvas();const i=t.debugOverlayCanvas,o=t.context.gl,s=t.debugOverlayCanvas.getContext("2d");s.clearRect(0,0,i.width,i.height),s.shadowColor="white",s.shadowBlur=2,s.lineWidth=1.5,s.strokeStyle="white",s.textBaseline="top",s.font="bold 36px Open Sans, sans-serif",s.fillText(e,5,5),s.strokeText(e,5,5),t.debugOverlayTexture.update(i),t.debugOverlayTexture.bind(o.LINEAR,o.CLAMP_TO_EDGE);}(e,`${f} ${_}kb`),n.draw(s,a.TRIANGLES,l,c,Pi.alphaBlended,Ai.disabled,Te(r,t.Color.transparent,p),u,e.debugBuffer,e.quadTriangleIndexBuffer,e.debugSegments);}const to={symbol:function(e,i,o,s,a){if("translucent"!==e.renderPass)return;const r=Di.disabled,n=e.colorModeForRenderPass();o.layout.get("text-variable-anchor")&&function(e,i,o,s,a,r,n){const l=i.transform,c="map"===a,h="map"===r;for(const a of e){const e=s.getTile(a),r=e.getBucket(o);if(!r||!r.text||!r.text.segments.get().length)continue;const u=t.evaluateSizeForZoom(r.textSizeData,l.zoom),d=Dt(e,1,i.transform.zoom),_=mt(a.posMatrix,h,c,i.transform,d),m="none"!==o.layout.get("icon-text-fit")&&r.hasIconData();if(u){const i=Math.pow(2,l.zoom-e.tileID.overscaledZ);Bi(r,c,h,n,t.symbolSize,l,_,a.posMatrix,i,u,m);}}}(s,e,o,i,o.layout.get("text-rotation-alignment"),o.layout.get("text-pitch-alignment"),a),0!==o.paint.get("icon-opacity").constantOr(1)&&Oi(e,i,o,s,!1,o.paint.get("icon-translate"),o.paint.get("icon-translate-anchor"),o.layout.get("icon-rotation-alignment"),o.layout.get("icon-pitch-alignment"),o.layout.get("icon-keep-upright"),r,n),0!==o.paint.get("text-opacity").constantOr(1)&&Oi(e,i,o,s,!0,o.paint.get("text-translate"),o.paint.get("text-translate-anchor"),o.layout.get("text-rotation-alignment"),o.layout.get("text-pitch-alignment"),o.layout.get("text-keep-upright"),r,n),i.map.showCollisionBoxes&&(Li(e,i,o,s,o.paint.get("text-translate"),o.paint.get("text-translate-anchor"),!0),Li(e,i,o,s,o.paint.get("icon-translate"),o.paint.get("icon-translate-anchor"),!1));},circle:function(e,i,o,s){if("translucent"!==e.renderPass)return;const a=o.paint.get("circle-opacity"),r=o.paint.get("circle-stroke-width"),n=o.paint.get("circle-stroke-opacity"),l=!o.layout.get("circle-sort-key").isConstant();if(0===a.constantOr(1)&&(0===r.constantOr(1)||0===n.constantOr(1)))return;const c=e.context,h=c.gl,u=e.depthModeForSublayer(0,Ci.ReadOnly),d=Di.disabled,_=e.colorModeForRenderPass(),m=[];for(let a=0;a<s.length;a++){const r=s[a],n=i.getTile(r),c=n.getBucket(o);if(!c)continue;const h=c.programConfigurations.get(o.id),u={programConfiguration:h,program:e.useProgram("circle",h),layoutVertexBuffer:c.layoutVertexBuffer,indexBuffer:c.indexBuffer,uniformValues:be(e,r,n,o)};if(l){const e=c.segments.get();for(const i of e)m.push({segments:new t.SegmentVector([i]),sortKey:i.sortKey,state:u});}else m.push({segments:c.segments,sortKey:0,state:u});}l&&m.sort(((t,e)=>t.sortKey-e.sortKey));for(const t of m){const{programConfiguration:i,program:s,layoutVertexBuffer:a,indexBuffer:r,uniformValues:n}=t.state;s.draw(c,h.TRIANGLES,u,d,_,Ai.disabled,n,o.id,a,r,t.segments,o.paint,e.transform.zoom,i);}},heatmap:function(e,i,o,s){if(0!==o.paint.get("heatmap-opacity"))if("offscreen"===e.renderPass){const a=e.context,r=a.gl,n=Di.disabled,l=new Pi([r.ONE,r.ONE],t.Color.transparent,[!0,!0,!0,!0]);!function(t,e,i){const o=t.gl;t.activeTexture.set(o.TEXTURE1),t.viewport.set([0,0,e.width/4,e.height/4]);let s=i.heatmapFbo;if(s)o.bindTexture(o.TEXTURE_2D,s.colorAttachment.get()),t.bindFramebuffer.set(s.framebuffer);else {const a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),s=i.heatmapFbo=t.createFramebuffer(e.width/4,e.height/4,!1),function(t,e,i,o){const s=t.gl;s.texImage2D(s.TEXTURE_2D,0,s.RGBA,e.width/4,e.height/4,0,s.RGBA,t.extRenderToTextureHalfFloat?t.extTextureHalfFloat.HALF_FLOAT_OES:s.UNSIGNED_BYTE,null),o.colorAttachment.set(i);}(t,e,a,s);}}(a,e,o),a.clear({color:t.Color.transparent});for(let t=0;t<s.length;t++){const c=s[t];if(i.hasRenderableParent(c))continue;const h=i.getTile(c),u=h.getBucket(o);if(!u)continue;const d=u.programConfigurations.get(o.id),_=e.useProgram("heatmap",d),{zoom:m}=e.transform;_.draw(a,r.TRIANGLES,Ci.disabled,n,l,Ai.disabled,Ie(c.posMatrix,h,m,o.paint.get("heatmap-intensity")),o.id,u.layoutVertexBuffer,u.indexBuffer,u.segments,o.paint,e.transform.zoom,d);}a.viewport.set([0,0,e.width,e.height]);}else "translucent"===e.renderPass&&(e.context.setColorMode(e.colorModeForRenderPass()),function(e,i){const o=e.context,s=o.gl,a=i.heatmapFbo;if(!a)return;o.activeTexture.set(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,a.colorAttachment.get()),o.activeTexture.set(s.TEXTURE1);let r=i.colorRampTexture;r||(r=i.colorRampTexture=new b(o,i.colorRamp,s.RGBA)),r.bind(s.LINEAR,s.CLAMP_TO_EDGE),e.useProgram("heatmapTexture").draw(o,s.TRIANGLES,Ci.disabled,Di.disabled,e.colorModeForRenderPass(),Ai.disabled,((e,i,o,s)=>{const a=t.create();t.ortho(a,0,e.width,e.height,0,0,1);const r=e.context.gl;return {u_matrix:a,u_world:[r.drawingBufferWidth,r.drawingBufferHeight],u_image:0,u_color_ramp:1,u_opacity:i.paint.get("heatmap-opacity")}})(e,i),i.id,e.viewportBuffer,e.quadTriangleIndexBuffer,e.viewportSegments,i.paint,e.transform.zoom);}(e,o));},line:function(e,i,o,s){if("translucent"!==e.renderPass)return;const a=o.paint.get("line-opacity"),r=o.paint.get("line-width");if(0===a.constantOr(1)||0===r.constantOr(1))return;const n=e.depthModeForSublayer(0,Ci.ReadOnly),l=e.colorModeForRenderPass(),c=o.paint.get("line-dasharray"),h=o.paint.get("line-pattern"),u=h.constantOr(1),d=o.paint.get("line-gradient"),_=o.getCrossfadeParameters(),m=u?"linePattern":c?"lineSDF":d?"lineGradient":"line",p=e.context,f=p.gl;let g=!0;for(const a of s){const s=i.getTile(a);if(u&&!s.patternsLoaded())continue;const r=s.getBucket(o);if(!r)continue;const x=r.programConfigurations.get(o.id),v=e.context.program.get(),y=e.useProgram(m,x),w=g||y.program!==v,T=h.constantOr(null);if(T&&s.imageAtlas){const t=s.imageAtlas,e=t.patternPositions[T.to.toString()],i=t.patternPositions[T.from.toString()];e&&i&&x.setConstantPatternPositions(e,i);}const E=u?ze(e,s,o,_):c?De(e,s,o,c,_):d?Ce(e,s,o,r.lineClipsArray.length):Se(e,s,o);if(u)p.activeTexture.set(f.TEXTURE0),s.imageAtlasTexture.bind(f.LINEAR,f.CLAMP_TO_EDGE),x.updatePaintBuffers(_);else if(c&&(w||e.lineAtlas.dirty))p.activeTexture.set(f.TEXTURE0),e.lineAtlas.bind(p);else if(d){const s=r.gradients[o.id];let n=s.texture;if(o.gradientVersion!==s.version){let l=256;if(o.stepInterpolant){const o=i.getSource().maxzoom,s=a.canonical.z===o?Math.ceil(1<<e.transform.maxZoom-a.canonical.z):1;l=t.clamp(t.nextPowerOfTwo(r.maxLineLength/t.EXTENT*1024*s),256,p.maxTextureSize);}s.gradient=t.renderColorRamp({expression:o.gradientExpression(),evaluationKey:"lineProgress",resolution:l,image:s.gradient||void 0,clips:r.lineClipsArray}),s.texture?s.texture.update(s.gradient):s.texture=new b(p,s.gradient,f.RGBA),s.version=o.gradientVersion,n=s.texture;}p.activeTexture.set(f.TEXTURE0),n.bind(o.stepInterpolant?f.NEAREST:f.LINEAR,f.CLAMP_TO_EDGE);}y.draw(p,f.TRIANGLES,n,e.stencilModeForClipping(a),l,Ai.disabled,E,o.id,r.layoutVertexBuffer,r.indexBuffer,r.segments,o.paint,e.transform.zoom,x,r.layoutVertexBuffer2),g=!1;}},fill:function(e,i,o,s){const a=o.paint.get("fill-color"),r=o.paint.get("fill-opacity");if(0===r.constantOr(1))return;const n=e.colorModeForRenderPass(),l=o.paint.get("fill-pattern"),c=e.opaquePassEnabledForLayer()&&!l.constantOr(1)&&1===a.constantOr(t.Color.transparent).a&&1===r.constantOr(0)?"opaque":"translucent";if(e.renderPass===c){const t=e.depthModeForSublayer(1,"opaque"===e.renderPass?Ci.ReadWrite:Ci.ReadOnly);Ni(e,i,o,s,t,n,!1);}if("translucent"===e.renderPass&&o.paint.get("fill-antialias")){const t=e.depthModeForSublayer(o.getPaintProperty("fill-outline-color")?2:0,Ci.ReadOnly);Ni(e,i,o,s,t,n,!0);}},"fill-extrusion":function(t,e,i,o){const s=i.paint.get("fill-extrusion-opacity");if(0!==s&&"translucent"===t.renderPass){const a=new Ci(t.context.gl.LEQUAL,Ci.ReadWrite,t.depthRangeFor3D);if(1!==s||i.paint.get("fill-extrusion-pattern").constantOr(1))Zi(t,e,i,o,a,Di.disabled,Pi.disabled),Zi(t,e,i,o,a,t.stencilModeFor3D(),t.colorModeForRenderPass());else {const s=t.colorModeForRenderPass();Zi(t,e,i,o,a,Di.disabled,s);}}},hillshade:function(t,e,i,o){if("offscreen"!==t.renderPass&&"translucent"!==t.renderPass)return;const s=t.context,a=t.depthModeForSublayer(0,Ci.ReadOnly),r=t.colorModeForRenderPass(),[n,l]="translucent"===t.renderPass?t.stencilConfigForOverlap(o):[{},o];for(const o of l){const s=e.getTile(o);s.needsHillshadePrepare&&"offscreen"===t.renderPass?qi(t,s,i,a,Di.disabled,r):"translucent"===t.renderPass&&Vi(t,s,i,a,n[o.overscaledZ],r);}s.viewport.set([0,0,t.width,t.height]);},raster:function(t,e,i,o){if("translucent"!==t.renderPass)return;if(0===i.paint.get("raster-opacity"))return;if(!o.length)return;const s=t.context,a=s.gl,r=e.getSource(),n=t.useProgram("raster"),l=t.colorModeForRenderPass(),[c,h]=r instanceof N?[{},o]:t.stencilConfigForOverlap(o),u=h[h.length-1].overscaledZ,d=!t.options.moving;for(const o of h){const h=t.depthModeForSublayer(o.overscaledZ-u,1===i.paint.get("raster-opacity")?Ci.ReadWrite:Ci.ReadOnly,a.LESS),_=e.getTile(o),m=t.transform.calculatePosMatrix(o.toUnwrapped(),d);_.registerFadeDuration(i.paint.get("raster-fade-duration"));const p=e.findLoadedParent(o,0),f=Gi(_,p,e,i,t.transform);let g,x;const v="nearest"===i.paint.get("raster-resampling")?a.NEAREST:a.LINEAR;s.activeTexture.set(a.TEXTURE0),_.texture.bind(v,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),s.activeTexture.set(a.TEXTURE1),p?(p.texture.bind(v,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),g=Math.pow(2,p.tileID.overscaledZ-_.tileID.overscaledZ),x=[_.tileID.canonical.x*g%1,_.tileID.canonical.y*g%1]):_.texture.bind(v,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST);const y=Le(m,x||[0,0],g||1,f,i);r instanceof N?n.draw(s,a.TRIANGLES,h,Di.disabled,l,Ai.disabled,y,i.id,r.boundsBuffer,t.quadTriangleIndexBuffer,r.boundsSegments):n.draw(s,a.TRIANGLES,h,c[o.overscaledZ],l,Ai.disabled,y,i.id,t.rasterBoundsBuffer,t.quadTriangleIndexBuffer,t.rasterBoundsSegments);}},background:function(t,e,i){const o=i.paint.get("background-color"),s=i.paint.get("background-opacity");if(0===s)return;const a=t.context,r=a.gl,n=t.transform,l=n.tileSize,c=i.paint.get("background-pattern");if(t.isPatternMissing(c))return;const h=!c&&1===o.a&&1===s&&t.opaquePassEnabledForLayer()?"opaque":"translucent";if(t.renderPass!==h)return;const u=Di.disabled,d=t.depthModeForSublayer(0,"opaque"===h?Ci.ReadWrite:Ci.ReadOnly),_=t.colorModeForRenderPass(),m=t.useProgram(c?"backgroundPattern":"background"),p=n.coveringTiles({tileSize:l});c&&(a.activeTexture.set(r.TEXTURE0),t.imageManager.bind(t.context));const f=i.getCrossfadeParameters();for(const e of p){const n=t.transform.calculatePosMatrix(e.toUnwrapped()),h=c?Ue(n,s,t,c,{tileID:e,tileSize:l},f):Oe(n,s,o);m.draw(a,r.TRIANGLES,d,u,_,Ai.disabled,h,i.id,t.tileExtentBuffer,t.quadTriangleIndexBuffer,t.tileExtentSegments);}},debug:function(t,e,i){for(let o=0;o<i.length;o++)Qi(t,e,i[o]);},custom:function(t,e,i){const o=t.context,s=i.implementation;if("offscreen"===t.renderPass){const e=s.prerender;e&&(t.setCustomLayerDefaults(),o.setColorMode(t.colorModeForRenderPass()),e.call(s,o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState());}else if("translucent"===t.renderPass){t.setCustomLayerDefaults(),o.setColorMode(t.colorModeForRenderPass()),o.setStencilMode(Di.disabled);const e="3d"===s.renderingMode?new Ci(t.context.gl.LEQUAL,Ci.ReadWrite,t.depthRangeFor3D):t.depthModeForSublayer(0,Ci.ReadOnly);o.setDepthMode(e),s.render(o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState(),o.bindFramebuffer.set(null);}}};class eo{constructor(t,e){this.context=new Si(t),this.transform=e,this._tileTextures={},this.setup(),this.numSublayers=X.maxUnderzooming+X.maxOverzooming+1,this.depthEpsilon=1/Math.pow(2,16),this.crossTileSymbolIndex=new ie,this.gpuTimers={};}resize(t,e){if(this.width=t*devicePixelRatio,this.height=e*devicePixelRatio,this.context.viewport.set([0,0,this.width,this.height]),this.style)for(const t of this.style._order)this.style._layers[t].resize();}setup(){const e=this.context,i=new t.StructArrayLayout2i4;i.emplaceBack(0,0),i.emplaceBack(t.EXTENT,0),i.emplaceBack(0,t.EXTENT),i.emplaceBack(t.EXTENT,t.EXTENT),this.tileExtentBuffer=e.createVertexBuffer(i,le.members),this.tileExtentSegments=t.SegmentVector.simpleSegment(0,0,4,2);const o=new t.StructArrayLayout2i4;o.emplaceBack(0,0),o.emplaceBack(t.EXTENT,0),o.emplaceBack(0,t.EXTENT),o.emplaceBack(t.EXTENT,t.EXTENT),this.debugBuffer=e.createVertexBuffer(o,le.members),this.debugSegments=t.SegmentVector.simpleSegment(0,0,4,5);const s=new t.StructArrayLayout4i8;s.emplaceBack(0,0,0,0),s.emplaceBack(t.EXTENT,0,t.EXTENT,0),s.emplaceBack(0,t.EXTENT,0,t.EXTENT),s.emplaceBack(t.EXTENT,t.EXTENT,t.EXTENT,t.EXTENT),this.rasterBoundsBuffer=e.createVertexBuffer(s,U.members),this.rasterBoundsSegments=t.SegmentVector.simpleSegment(0,0,4,2);const a=new t.StructArrayLayout2i4;a.emplaceBack(0,0),a.emplaceBack(1,0),a.emplaceBack(0,1),a.emplaceBack(1,1),this.viewportBuffer=e.createVertexBuffer(a,le.members),this.viewportSegments=t.SegmentVector.simpleSegment(0,0,4,2);const r=new t.StructArrayLayout1ui2;r.emplaceBack(0),r.emplaceBack(1),r.emplaceBack(3),r.emplaceBack(2),r.emplaceBack(0),this.tileBorderIndexBuffer=e.createIndexBuffer(r);const n=new t.StructArrayLayout3ui6;n.emplaceBack(0,1,2),n.emplaceBack(2,1,3),this.quadTriangleIndexBuffer=e.createIndexBuffer(n),this.emptyTexture=new b(e,{width:1,height:1,data:new Uint8Array([0,0,0,0])},e.gl.RGBA);const l=this.context.gl;this.stencilClearMode=new Di({func:l.ALWAYS,mask:0},0,255,l.ZERO,l.ZERO,l.ZERO);}clearStencil(){const e=this.context,i=e.gl;this.nextStencilID=1,this.currentStencilSource=void 0;const o=t.create();t.ortho(o,0,this.width,this.height,0,0,1),t.scale(o,o,[i.drawingBufferWidth,i.drawingBufferHeight,0]),this.useProgram("clippingMask").draw(e,i.TRIANGLES,Ci.disabled,this.stencilClearMode,Pi.disabled,Ai.disabled,Ee(o),"$clipping",this.viewportBuffer,this.quadTriangleIndexBuffer,this.viewportSegments);}_renderTileClippingMasks(t,e){if(this.currentStencilSource===t.source||!t.isTileClipped()||!e||!e.length)return;this.currentStencilSource=t.source;const i=this.context,o=i.gl;this.nextStencilID+e.length>256&&this.clearStencil(),i.setColorMode(Pi.disabled),i.setDepthMode(Ci.disabled);const s=this.useProgram("clippingMask");this._tileClippingMaskIDs={};for(const t of e){const e=this._tileClippingMaskIDs[t.key]=this.nextStencilID++;s.draw(i,o.TRIANGLES,Ci.disabled,new Di({func:o.ALWAYS,mask:0},e,255,o.KEEP,o.KEEP,o.REPLACE),Pi.disabled,Ai.disabled,Ee(t.posMatrix),"$clipping",this.tileExtentBuffer,this.quadTriangleIndexBuffer,this.tileExtentSegments);}}stencilModeFor3D(){this.currentStencilSource=void 0,this.nextStencilID+1>256&&this.clearStencil();const t=this.nextStencilID++,e=this.context.gl;return new Di({func:e.NOTEQUAL,mask:255},t,255,e.KEEP,e.KEEP,e.REPLACE)}stencilModeForClipping(t){const e=this.context.gl;return new Di({func:e.EQUAL,mask:255},this._tileClippingMaskIDs[t.key],0,e.KEEP,e.KEEP,e.REPLACE)}stencilConfigForOverlap(t){const e=this.context.gl,i=t.sort(((t,e)=>e.overscaledZ-t.overscaledZ)),o=i[i.length-1].overscaledZ,s=i[0].overscaledZ-o+1;if(s>1){this.currentStencilSource=void 0,this.nextStencilID+s>256&&this.clearStencil();const t={};for(let i=0;i<s;i++)t[i+o]=new Di({func:e.GEQUAL,mask:255},i+this.nextStencilID,255,e.KEEP,e.KEEP,e.REPLACE);return this.nextStencilID+=s,[t,i]}return [{[o]:Di.disabled},i]}colorModeForRenderPass(){const e=this.context.gl;if(this._showOverdrawInspector){const i=1/8;return new Pi([e.CONSTANT_COLOR,e.ONE],new t.Color(i,i,i,0),[!0,!0,!0,!0])}return "opaque"===this.renderPass?Pi.unblended:Pi.alphaBlended}depthModeForSublayer(t,e,i){if(!this.opaquePassEnabledForLayer())return Ci.disabled;const o=1-((1+this.currentLayer)*this.numSublayers+t)*this.depthEpsilon;return new Ci(i||this.context.gl.LEQUAL,e,[o,o])}opaquePassEnabledForLayer(){return this.currentLayer<this.opaquePassCutoff}render(e,i){this.style=e,this.options=i,this.lineAtlas=e.lineAtlas,this.imageManager=e.imageManager,this.glyphManager=e.glyphManager,this.symbolFadeChange=e.placement.symbolFadeChange(t.exported.now()),this.imageManager.beginFrame();const o=this.style._order,s=this.style.sourceCaches;for(const t in s){const e=s[t];e.used&&e.prepare(this.context);}const a={},r={},n={};for(const t in s){const e=s[t];a[t]=e.getVisibleCoordinates(),r[t]=a[t].slice().reverse(),n[t]=e.getVisibleCoordinates(!0).reverse();}this.opaquePassCutoff=1/0;for(let t=0;t<o.length;t++)if(this.style._layers[o[t]].is3D()){this.opaquePassCutoff=t;break}this.renderPass="offscreen";for(const t of o){const e=this.style._layers[t];if(!e.hasOffscreenPass()||e.isHidden(this.transform.zoom))continue;const i=r[e.source];("custom"===e.type||i.length)&&this.renderLayer(this,s[e.source],e,i);}for(this.context.bindFramebuffer.set(null),this.context.clear({color:i.showOverdrawInspector?t.Color.black:t.Color.transparent,depth:1}),this.clearStencil(),this._showOverdrawInspector=i.showOverdrawInspector,this.depthRangeFor3D=[0,1-(e._order.length+2)*this.numSublayers*this.depthEpsilon],this.renderPass="opaque",this.currentLayer=o.length-1;this.currentLayer>=0;this.currentLayer--){const t=this.style._layers[o[this.currentLayer]],e=s[t.source],i=a[t.source];this._renderTileClippingMasks(t,i),this.renderLayer(this,e,t,i);}for(this.renderPass="translucent",this.currentLayer=0;this.currentLayer<o.length;this.currentLayer++){const t=this.style._layers[o[this.currentLayer]],e=s[t.source],i=("symbol"===t.type?n:r)[t.source];this._renderTileClippingMasks(t,a[t.source]),this.renderLayer(this,e,t,i);}if(this.options.showTileBoundaries){let t,e;Object.values(this.style._layers).forEach((i=>{i.source&&!i.isHidden(this.transform.zoom)&&(i.source!==(e&&e.id)&&(e=this.style.sourceCaches[i.source]),(!t||t.getSource().maxzoom<e.getSource().maxzoom)&&(t=e));})),t&&to.debug(this,t,t.getVisibleCoordinates());}this.options.showPadding&&function(t){const e=t.transform.padding;Ki(t,t.transform.height-(e.top||0),3,ji),Ki(t,e.bottom||0,3,$i),Yi(t,e.left||0,3,Wi),Yi(t,t.transform.width-(e.right||0),3,Xi);const i=t.transform.centerPoint;!function(t,e,i,o){Ji(t,e-1,i-10,2,20,o),Ji(t,e-10,i-1,20,2,o);}(t,i.x,t.transform.height-i.y,Hi);}(this),this.context.setDefault();}renderLayer(t,e,i,o){i.isHidden(this.transform.zoom)||("background"===i.type||"custom"===i.type||o.length)&&(this.id=i.id,this.gpuTimingStart(i),to[i.type](t,e,i,o,this.style.placement.variableOffsets),this.gpuTimingEnd());}gpuTimingStart(t){if(!this.options.gpuTiming)return;const e=this.context.extTimerQuery;let i=this.gpuTimers[t.id];i||(i=this.gpuTimers[t.id]={calls:0,cpuTime:0,query:e.createQueryEXT()}),i.calls++,e.beginQueryEXT(e.TIME_ELAPSED_EXT,i.query);}gpuTimingEnd(){if(!this.options.gpuTiming)return;const t=this.context.extTimerQuery;t.endQueryEXT(t.TIME_ELAPSED_EXT);}collectGpuTimers(){const t=this.gpuTimers;return this.gpuTimers={},t}queryGpuTimers(t){const e={};for(const i in t){const o=t[i],s=this.context.extTimerQuery,a=s.getQueryObjectEXT(o.query,s.QUERY_RESULT_EXT)/1e6;s.deleteQueryEXT(o.query),e[i]=a;}return e}translatePosMatrix(e,i,o,s,a){if(!o[0]&&!o[1])return e;const r=a?"map"===s?this.transform.angle:0:"viewport"===s?-this.transform.angle:0;if(r){const t=Math.sin(r),e=Math.cos(r);o=[o[0]*e-o[1]*t,o[0]*t+o[1]*e];}const n=g(a?o[0]:Dt(i,o[0],this.transform.zoom),a?o[1]:Dt(i,o[1],this.transform.zoom),0),l=t.create();return t.translate(l,e,n),l}saveTileTexture(t){const e=this._tileTextures[t.size[0]];e?e.push(t):this._tileTextures[t.size[0]]=[t];}getTileTexture(t){const e=this._tileTextures[t];return e&&e.length>0?e.pop():null}isPatternMissing(t){if(!t)return !1;if(!t.from||!t.to)return !0;const e=this.imageManager.getPattern(t.from.toString()),i=this.imageManager.getPattern(t.to.toString());return !e||!i}useProgram(t,e){this.cache=this.cache||{};const i=`${t}${e?e.cacheKey:""}${this._showOverdrawInspector?"/overdraw":""}`;return this.cache[i]||(this.cache[i]=new _e(this.context,t,ce[t],e,Ne[t],this._showOverdrawInspector)),this.cache[i]}setCustomLayerDefaults(){this.context.unbindVAO(),this.context.cullFace.setDefault(),this.context.activeTexture.setDefault(),this.context.pixelStoreUnpack.setDefault(),this.context.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.context.pixelStoreUnpackFlipY.setDefault();}setBaseState(){const t=this.context.gl;this.context.cullFace.set(!1),this.context.viewport.set([0,0,this.width,this.height]),this.context.blendEquation.set(t.FUNC_ADD);}initDebugOverlayCanvas(){null==this.debugOverlayCanvas&&(this.debugOverlayCanvas=document.createElement("canvas"),this.debugOverlayCanvas.width=512,this.debugOverlayCanvas.height=512,this.debugOverlayTexture=new b(this.context,this.debugOverlayCanvas,this.context.gl.RGBA));}destroy(){this.emptyTexture.destroy(),this.debugOverlayTexture&&this.debugOverlayTexture.destroy();}}class io{constructor(t,e){this.points=t,this.planes=e;}static fromInvProjectionMatrix(e,i,o){const s=[t.fromValues(-1,1,-1,1),t.fromValues(1,1,-1,1),t.fromValues(1,-1,-1,1),t.fromValues(-1,-1,-1,1),t.fromValues(-1,1,1,1),t.fromValues(1,1,1,1),t.fromValues(1,-1,1,1),t.fromValues(-1,-1,1,1)],a=Math.pow(2,o),r=s.map((i=>t.transformMat4(t.create$1(),i,e))).map((e=>t.scale$1([],e,1/e[3]/i*a))),n=[[0,1,2],[6,5,4],[0,3,7],[2,1,5],[3,2,6],[0,4,5]].map((t=>{const e=x(p(),r[t[0]],r[t[1]]),i=x(p(),r[t[2]],r[t[1]]),o=function(t,e){var i=e[0],o=e[1],s=e[2],a=i*i+o*o+s*s;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t}(p(),function(t,e,i){var o=e[0],s=e[1],a=e[2],r=i[0],n=i[1],l=i[2];return t[0]=s*l-a*n,t[1]=a*r-o*l,t[2]=o*n-s*r,t}(p(),e,i)),s=-function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}(o,r[t[1]]);return [o[0],o[1],o[2],s]}));return new io(r,n)}}class oo{constructor(t,e){var i,o,s;this.min=t,this.max=e,this.center=function(t,e,i){return t[0]=.5*e[0],t[1]=.5*e[1],t[2]=.5*e[2],t}(p(),((i=p())[0]=(o=this.min)[0]+(s=this.max)[0],i[1]=o[1]+s[1],i[2]=o[2]+s[2],i));}quadrant(t){const e=[t%2==0,t<2],i=f(this.min),o=f(this.max);for(let t=0;t<e.length;t++)i[t]=e[t]?this.min[t]:this.center[t],o[t]=e[t]?this.center[t]:this.max[t];return o[2]=this.max[2],new oo(i,o)}distanceX(t){return Math.max(Math.min(this.max[0],t[0]),this.min[0])-t[0]}distanceY(t){return Math.max(Math.min(this.max[1],t[1]),this.min[1])-t[1]}intersects(e){const i=[t.fromValues(this.min[0],this.min[1],0,1),t.fromValues(this.max[0],this.min[1],0,1),t.fromValues(this.max[0],this.max[1],0,1),t.fromValues(this.min[0],this.max[1],0,1)];let o=!0;for(let s=0;s<e.planes.length;s++){const a=e.planes[s];let r=0;for(let e=0;e<i.length;e++)t.dot(a,i[e])>=0&&r++;if(0===r)return 0;r!==i.length&&(o=!1);}if(o)return 2;for(let t=0;t<3;t++){let i=Number.MAX_VALUE,o=-Number.MAX_VALUE;for(let s=0;s<e.points.length;s++){const a=e.points[s][t]-this.min[t];i=Math.min(i,a),o=Math.max(o,a);}if(o<0||i>this.max[t]-this.min[t])return 0}return 1}}class so{constructor(t=0,e=0,i=0,o=0){if(isNaN(t)||t<0||isNaN(e)||e<0||isNaN(i)||i<0||isNaN(o)||o<0)throw new Error("Invalid value for edge-insets, top, bottom, left and right must all be numbers");this.top=t,this.bottom=e,this.left=i,this.right=o;}interpolate(e,i,o){return null!=i.top&&null!=e.top&&(this.top=t.number(e.top,i.top,o)),null!=i.bottom&&null!=e.bottom&&(this.bottom=t.number(e.bottom,i.bottom,o)),null!=i.left&&null!=e.left&&(this.left=t.number(e.left,i.left,o)),null!=i.right&&null!=e.right&&(this.right=t.number(e.right,i.right,o)),this}getCenter(e,i){const o=t.clamp((this.left+e-this.right)/2,0,e),s=t.clamp((this.top+i-this.bottom)/2,0,i);return new t.Point(o,s)}equals(t){return this.top===t.top&&this.bottom===t.bottom&&this.left===t.left&&this.right===t.right}clone(){return new so(this.top,this.bottom,this.left,this.right)}toJSON(){return {top:this.top,bottom:this.bottom,left:this.left,right:this.right}}}class ao{constructor(e,i,o,s,a){this.tileSize=512,this.maxValidLatitude=85.051129,this._renderWorldCopies=void 0===a||!!a,this._minZoom=e||0,this._maxZoom=i||22,this._minPitch=null==o?0:o,this._maxPitch=null==s?60:s,this.setMaxBounds(),this.width=0,this.height=0,this._center=new t.LngLat(0,0),this.zoom=0,this.angle=0,this._fov=.6435011087932844,this._pitch=0,this._unmodified=!0,this._edgeInsets=new so,this._posMatrixCache={},this._alignedPosMatrixCache={};}clone(){const t=new ao(this._minZoom,this._maxZoom,this._minPitch,this.maxPitch,this._renderWorldCopies);return t.tileSize=this.tileSize,t.latRange=this.latRange,t.width=this.width,t.height=this.height,t._center=this._center,t.zoom=this.zoom,t.angle=this.angle,t._fov=this._fov,t._pitch=this._pitch,t._unmodified=this._unmodified,t._edgeInsets=this._edgeInsets.clone(),t._calcMatrices(),t}get minZoom(){return this._minZoom}set minZoom(t){this._minZoom!==t&&(this._minZoom=t,this.zoom=Math.max(this.zoom,t));}get maxZoom(){return this._maxZoom}set maxZoom(t){this._maxZoom!==t&&(this._maxZoom=t,this.zoom=Math.min(this.zoom,t));}get minPitch(){return this._minPitch}set minPitch(t){this._minPitch!==t&&(this._minPitch=t,this.pitch=Math.max(this.pitch,t));}get maxPitch(){return this._maxPitch}set maxPitch(t){this._maxPitch!==t&&(this._maxPitch=t,this.pitch=Math.min(this.pitch,t));}get renderWorldCopies(){return this._renderWorldCopies}set renderWorldCopies(t){void 0===t?t=!0:null===t&&(t=!1),this._renderWorldCopies=t;}get worldSize(){return this.tileSize*this.scale}get centerOffset(){return this.centerPoint._sub(this.size._div(2))}get size(){return new t.Point(this.width,this.height)}get bearing(){return -this.angle/Math.PI*180}set bearing(e){const i=-t.wrap(e,-180,180)*Math.PI/180;var o;this.angle!==i&&(this._unmodified=!1,this.angle=i,this._calcMatrices(),this.rotationMatrix=(o=new t.ARRAY_TYPE(4),t.ARRAY_TYPE!=Float32Array&&(o[1]=0,o[2]=0),o[0]=1,o[3]=1,o),function(t,e,i){var o=e[0],s=e[1],a=e[2],r=e[3],n=Math.sin(i),l=Math.cos(i);t[0]=o*l+a*n,t[1]=s*l+r*n,t[2]=o*-n+a*l,t[3]=s*-n+r*l;}(this.rotationMatrix,this.rotationMatrix,this.angle));}get pitch(){return this._pitch/Math.PI*180}set pitch(e){const i=t.clamp(e,this.minPitch,this.maxPitch)/180*Math.PI;this._pitch!==i&&(this._unmodified=!1,this._pitch=i,this._calcMatrices());}get fov(){return this._fov/Math.PI*180}set fov(t){t=Math.max(.01,Math.min(60,t)),this._fov!==t&&(this._unmodified=!1,this._fov=t/180*Math.PI,this._calcMatrices());}get zoom(){return this._zoom}set zoom(t){const e=Math.min(Math.max(t,this.minZoom),this.maxZoom);this._zoom!==e&&(this._unmodified=!1,this._zoom=e,this.scale=this.zoomScale(e),this.tileZoom=Math.floor(e),this.zoomFraction=e-this.tileZoom,this._constrain(),this._calcMatrices());}get center(){return this._center}set center(t){t.lat===this._center.lat&&t.lng===this._center.lng||(this._unmodified=!1,this._center=t,this._constrain(),this._calcMatrices());}get padding(){return this._edgeInsets.toJSON()}set padding(t){this._edgeInsets.equals(t)||(this._unmodified=!1,this._edgeInsets.interpolate(this._edgeInsets,t,1),this._calcMatrices());}get centerPoint(){return this._edgeInsets.getCenter(this.width,this.height)}isPaddingEqual(t){return this._edgeInsets.equals(t)}interpolatePadding(t,e,i){this._unmodified=!1,this._edgeInsets.interpolate(t,e,i),this._constrain(),this._calcMatrices();}coveringZoomLevel(t){const e=(t.roundZoom?Math.round:Math.floor)(this.zoom+this.scaleZoom(this.tileSize/t.tileSize));return Math.max(0,e)}getVisibleUnwrappedCoordinates(e){const i=[new t.UnwrappedTileID(0,e)];if(this._renderWorldCopies){const o=this.pointCoordinate(new t.Point(0,0)),s=this.pointCoordinate(new t.Point(this.width,0)),a=this.pointCoordinate(new t.Point(this.width,this.height)),r=this.pointCoordinate(new t.Point(0,this.height)),n=Math.floor(Math.min(o.x,s.x,a.x,r.x)),l=Math.floor(Math.max(o.x,s.x,a.x,r.x)),c=1;for(let o=n-c;o<=l+c;o++)0!==o&&i.push(new t.UnwrappedTileID(o,e));}return i}coveringTiles(e){let i=this.coveringZoomLevel(e);const o=i;if(void 0!==e.minzoom&&i<e.minzoom)return [];void 0!==e.maxzoom&&i>e.maxzoom&&(i=e.maxzoom);const s=t.MercatorCoordinate.fromLngLat(this.center),a=Math.pow(2,i),r=[a*s.x,a*s.y,0],n=io.fromInvProjectionMatrix(this.invProjMatrix,this.worldSize,i);let l=e.minzoom||0;this.pitch<=60&&this._edgeInsets.top<.1&&(l=i);const c=t=>({aabb:new oo([t*a,0,0],[(t+1)*a,a,0]),zoom:0,x:0,y:0,wrap:t,fullyVisible:!1}),h=[],u=[],d=i,_=e.reparseOverscaled?o:i;if(this._renderWorldCopies)for(let t=1;t<=3;t++)h.push(c(-t)),h.push(c(t));for(h.push(c(0));h.length>0;){const e=h.pop(),i=e.x,o=e.y;let s=e.fullyVisible;if(!s){const t=e.aabb.intersects(n);if(0===t)continue;s=2===t;}const a=e.aabb.distanceX(r),c=e.aabb.distanceY(r),m=Math.max(Math.abs(a),Math.abs(c)),p=3+(1<<d-e.zoom)-2;if(e.zoom===d||m>p&&e.zoom>=l)u.push({tileID:new t.OverscaledTileID(e.zoom===d?_:e.zoom,e.wrap,e.zoom,i,o),distanceSq:y([r[0]-.5-i,r[1]-.5-o])});else for(let t=0;t<4;t++){const a=(i<<1)+t%2,r=(o<<1)+(t>>1);h.push({aabb:e.aabb.quadrant(t),zoom:e.zoom+1,x:a,y:r,wrap:e.wrap,fullyVisible:s});}}return u.sort(((t,e)=>t.distanceSq-e.distanceSq)).map((t=>t.tileID))}resize(t,e){this.width=t,this.height=e,this.pixelsToGLUnits=[2/t,-2/e],this._constrain(),this._calcMatrices();}get unmodified(){return this._unmodified}zoomScale(t){return Math.pow(2,t)}scaleZoom(t){return Math.log(t)/Math.LN2}project(e){const i=t.clamp(e.lat,-this.maxValidLatitude,this.maxValidLatitude);return new t.Point(t.mercatorXfromLng(e.lng)*this.worldSize,t.mercatorYfromLat(i)*this.worldSize)}unproject(e){return new t.MercatorCoordinate(e.x/this.worldSize,e.y/this.worldSize).toLngLat()}get point(){return this.project(this.center)}setLocationAtPoint(e,i){const o=this.pointCoordinate(i),s=this.pointCoordinate(this.centerPoint),a=this.locationCoordinate(e),r=new t.MercatorCoordinate(a.x-(o.x-s.x),a.y-(o.y-s.y));this.center=this.coordinateLocation(r),this._renderWorldCopies&&(this.center=this.center.wrap());}locationPoint(t){return this.coordinatePoint(this.locationCoordinate(t))}pointLocation(t){return this.coordinateLocation(this.pointCoordinate(t))}locationCoordinate(e){return t.MercatorCoordinate.fromLngLat(e)}coordinateLocation(t){return t.toLngLat()}pointCoordinate(e){const i=[e.x,e.y,0,1],o=[e.x,e.y,1,1];t.transformMat4(i,i,this.pixelMatrixInverse),t.transformMat4(o,o,this.pixelMatrixInverse);const s=i[3],a=o[3],r=i[1]/s,n=o[1]/a,l=i[2]/s,c=o[2]/a,h=l===c?0:(0-l)/(c-l);return new t.MercatorCoordinate(t.number(i[0]/s,o[0]/a,h)/this.worldSize,t.number(r,n,h)/this.worldSize)}coordinatePoint(e){const i=[e.x*this.worldSize,e.y*this.worldSize,0,1];return t.transformMat4(i,i,this.pixelMatrix),new t.Point(i[0]/i[3],i[1]/i[3])}getBounds(){return (new t.LngLatBounds).extend(this.pointLocation(new t.Point(0,0))).extend(this.pointLocation(new t.Point(this.width,0))).extend(this.pointLocation(new t.Point(this.width,this.height))).extend(this.pointLocation(new t.Point(0,this.height)))}getMaxBounds(){return this.latRange&&2===this.latRange.length&&this.lngRange&&2===this.lngRange.length?new t.LngLatBounds([this.lngRange[0],this.latRange[0]],[this.lngRange[1],this.latRange[1]]):null}setMaxBounds(t){t?(this.lngRange=[t.getWest(),t.getEast()],this.latRange=[t.getSouth(),t.getNorth()],this._constrain()):(this.lngRange=null,this.latRange=[-this.maxValidLatitude,this.maxValidLatitude]);}calculatePosMatrix(e,i=!1){const o=e.key,s=i?this._alignedPosMatrixCache:this._posMatrixCache;if(s[o])return s[o];const a=e.canonical,r=this.worldSize/this.zoomScale(a.z),n=a.x+Math.pow(2,a.z)*e.wrap,l=t.create();return t.translate(l,l,[n*r,a.y*r,0]),t.scale(l,l,[r/t.EXTENT,r/t.EXTENT,1]),t.multiply(l,i?this.alignedProjMatrix:this.projMatrix,l),s[o]=t.clone(l),s[o]}customLayerMatrix(){return t.clone(this.mercatorMatrix)}_constrain(){if(!this.center||!this.width||!this.height||this._constraining)return;this._constraining=!0;let e,i,o,s,a=-90,r=90,n=-180,l=180;const c=this.size,h=this._unmodified;if(this.latRange){const i=this.latRange;a=t.mercatorYfromLat(i[1])*this.worldSize,r=t.mercatorYfromLat(i[0])*this.worldSize,e=r-a<c.y?c.y/(r-a):0;}if(this.lngRange){const e=this.lngRange;n=t.mercatorXfromLng(e[0])*this.worldSize,l=t.mercatorXfromLng(e[1])*this.worldSize,i=l-n<c.x?c.x/(l-n):0;}const u=this.point,d=Math.max(i||0,e||0);if(d)return this.center=this.unproject(new t.Point(i?(l+n)/2:u.x,e?(r+a)/2:u.y)),this.zoom+=this.scaleZoom(d),this._unmodified=h,void(this._constraining=!1);if(this.latRange){const t=u.y,e=c.y/2;t-e<a&&(s=a+e),t+e>r&&(s=r-e);}if(this.lngRange){const t=u.x,e=c.x/2;t-e<n&&(o=n+e),t+e>l&&(o=l-e);}void 0===o&&void 0===s||(this.center=this.unproject(new t.Point(void 0!==o?o:u.x,void 0!==s?s:u.y))),this._unmodified=h,this._constraining=!1;}_calcMatrices(){if(!this.height)return;const e=this.centerOffset;this.cameraToCenterDistance=.5/Math.tan(this._fov/2)*this.height;const i=Math.PI/2+this._pitch,o=this._fov*(.5+e.y/this.height),s=Math.sin(o)*this.cameraToCenterDistance/Math.sin(t.clamp(Math.PI-i-o,.01,Math.PI-.01)),a=this.point,r=a.x,n=a.y,l=1.01*(Math.cos(Math.PI/2-this._pitch)*s+this.cameraToCenterDistance),c=this.height/50;let h=new Float64Array(16);t.perspective(h,this._fov,this.width/this.height,c,l),h[8]=2*-e.x/this.width,h[9]=2*e.y/this.height,t.scale(h,h,[1,-1,1]),t.translate(h,h,[0,0,-this.cameraToCenterDistance]),t.rotateX(h,h,this._pitch),t.rotateZ(h,h,this.angle),t.translate(h,h,[-r,-n,0]),this.mercatorMatrix=t.scale(t.create(),h,g(this.worldSize,this.worldSize,this.worldSize)),t.scale(h,h,g(1,1,t.mercatorZfromAltitude(1,this.center.lat)*this.worldSize)),this.projMatrix=h,this.invProjMatrix=t.invert(t.create(),this.projMatrix);const u=this.width%2/2,d=this.height%2/2,_=Math.cos(this.angle),m=Math.sin(this.angle),p=r-Math.round(r)+_*u+m*d,f=n-Math.round(n)+_*d+m*u,x=t.clone(h);if(t.translate(x,x,[p>.5?p-1:p,f>.5?f-1:f,0]),this.alignedProjMatrix=x,h=t.create(),t.scale(h,h,[this.width/2,-this.height/2,1]),t.translate(h,h,[1,-1,0]),this.labelPlaneMatrix=h,h=t.create(),t.scale(h,h,[1,-1,1]),t.translate(h,h,[-1,-1,0]),t.scale(h,h,[2/this.width,2/this.height,1]),this.glCoordMatrix=h,this.pixelMatrix=t.multiply(new Float64Array(16),this.labelPlaneMatrix,this.projMatrix),h=t.invert(new Float64Array(16),this.pixelMatrix),!h)throw new Error("failed to invert matrix");this.pixelMatrixInverse=h,this._posMatrixCache={},this._alignedPosMatrixCache={};}maxPitchScaleFactor(){if(!this.pixelMatrixInverse)return 1;const e=this.pointCoordinate(new t.Point(0,0)),i=t.fromValues(e.x*this.worldSize,e.y*this.worldSize,0,1);return t.transformMat4(i,i,this.pixelMatrix)[3]/this.cameraToCenterDistance}getCameraPoint(){const e=Math.tan(this._pitch)*(this.cameraToCenterDistance||1);return this.centerPoint.add(new t.Point(0,e))}getCameraQueryGeometry(e){const i=this.getCameraPoint();if(1===e.length)return [e[0],i];{let o=i.x,s=i.y,a=i.x,r=i.y;for(const t of e)o=Math.min(o,t.x),s=Math.min(s,t.y),a=Math.max(a,t.x),r=Math.max(r,t.y);return [new t.Point(o,s),new t.Point(a,s),new t.Point(a,r),new t.Point(o,r),new t.Point(o,s)]}}}class ro{constructor(e){this._hashName=e&&encodeURIComponent(e),t.bindAll(["_getCurrentHash","_onHashChange","_updateHash"],this),this._updateHash=function(t,e){let i=!1,o=null;const s=()=>{o=null,i&&(t(),o=setTimeout(s,300),i=!1);};return ()=>(i=!0,o||s(),o)}(this._updateHashUnthrottled.bind(this));}addTo(t){return this._map=t,addEventListener("hashchange",this._onHashChange,!1),this._map.on("moveend",this._updateHash),this}remove(){return removeEventListener("hashchange",this._onHashChange,!1),this._map.off("moveend",this._updateHash),clearTimeout(this._updateHash()),delete this._map,this}getHashString(t){const e=this._map.getCenter(),i=Math.round(100*this._map.getZoom())/100,o=Math.ceil((i*Math.LN2+Math.log(512/360/.5))/Math.LN10),s=Math.pow(10,o),a=Math.round(e.lng*s)/s,r=Math.round(e.lat*s)/s,n=this._map.getBearing(),l=this._map.getPitch();let c="";if(c+=t?`/${a}/${r}/${i}`:`${i}/${r}/${a}`,(n||l)&&(c+="/"+Math.round(10*n)/10),l&&(c+=`/${Math.round(l)}`),this._hashName){const t=this._hashName;let e=!1;const i=window.location.hash.slice(1).split("&").map((i=>{const o=i.split("=")[0];return o===t?(e=!0,`${o}=${c}`):i})).filter((t=>t));return e||i.push(`${t}=${c}`),`#${i.join("&")}`}return `#${c}`}_getCurrentHash(){const t=window.location.hash.replace("#","");if(this._hashName){let e;return t.split("&").map((t=>t.split("="))).forEach((t=>{t[0]===this._hashName&&(e=t);})),(e&&e[1]||"").split("/")}return t.split("/")}_onHashChange(){const t=this._getCurrentHash();if(t.length>=3&&!t.some((t=>isNaN(t)))){const e=this._map.dragRotate.isEnabled()&&this._map.touchZoomRotate.isEnabled()?+(t[3]||0):this._map.getBearing();return this._map.jumpTo({center:[+t[2],+t[1]],zoom:+t[0],bearing:e,pitch:+(t[4]||0)}),!0}return !1}_updateHashUnthrottled(){const t=window.location.href.replace(/(#.+)?$/,this.getHashString());try{window.history.replaceState(window.history.state,null,t);}catch(t){}}}const no={linearity:.3,easing:t.bezier(0,0,.3,1)},lo=t.extend({deceleration:2500,maxSpeed:1400},no),co=t.extend({deceleration:20,maxSpeed:1400},no),ho=t.extend({deceleration:1e3,maxSpeed:360},no),uo=t.extend({deceleration:1e3,maxSpeed:90},no);class _o{constructor(t){this._map=t,this.clear();}clear(){this._inertiaBuffer=[];}record(e){this._drainInertiaBuffer(),this._inertiaBuffer.push({time:t.exported.now(),settings:e});}_drainInertiaBuffer(){const e=this._inertiaBuffer,i=t.exported.now();for(;e.length>0&&i-e[0].time>160;)e.shift();}_onMoveEnd(e){if(this._drainInertiaBuffer(),this._inertiaBuffer.length<2)return;const i={zoom:0,bearing:0,pitch:0,pan:new t.Point(0,0),pinchAround:void 0,around:void 0};for(const{settings:t}of this._inertiaBuffer)i.zoom+=t.zoomDelta||0,i.bearing+=t.bearingDelta||0,i.pitch+=t.pitchDelta||0,t.panDelta&&i.pan._add(t.panDelta),t.around&&(i.around=t.around),t.pinchAround&&(i.pinchAround=t.pinchAround);const o=this._inertiaBuffer[this._inertiaBuffer.length-1].time-this._inertiaBuffer[0].time,s={};if(i.pan.mag()){const a=po(i.pan.mag(),o,t.extend({},lo,e||{}));s.offset=i.pan.mult(a.amount/i.pan.mag()),s.center=this._map.transform.center,mo(s,a);}if(i.zoom){const t=po(i.zoom,o,co);s.zoom=this._map.transform.zoom+t.amount,mo(s,t);}if(i.bearing){const e=po(i.bearing,o,ho);s.bearing=this._map.transform.bearing+t.clamp(e.amount,-179,179),mo(s,e);}if(i.pitch){const t=po(i.pitch,o,uo);s.pitch=this._map.transform.pitch+t.amount,mo(s,t);}if(s.zoom||s.bearing){const t=void 0===i.pinchAround?i.around:i.pinchAround;s.around=t?this._map.unproject(t):this._map.getCenter();}return this.clear(),t.extend(s,{noMoveStart:!0})}}function mo(t,e){(!t.duration||t.duration<e.duration)&&(t.duration=e.duration,t.easing=e.easing);}function po(e,i,o){const{maxSpeed:s,linearity:a,deceleration:r}=o,n=t.clamp(e*a/(i/1e3),-s,s),l=Math.abs(n)/(r*a);return {easing:o.easing,duration:1e3*l,amount:n*(l/2)}}class fo extends t.Event{constructor(e,i,o,s={}){const a=r.mousePos(i.getCanvasContainer(),o),n=i.unproject(a);super(e,t.extend({point:a,lngLat:n,originalEvent:o},s)),this._defaultPrevented=!1,this.target=i;}preventDefault(){this._defaultPrevented=!0;}get defaultPrevented(){return this._defaultPrevented}}class go extends t.Event{constructor(e,i,o){const s="touchend"===e?o.changedTouches:o.touches,a=r.touchPos(i.getCanvasContainer(),s),n=a.map((t=>i.unproject(t))),l=a.reduce(((t,e,i,o)=>t.add(e.div(o.length))),new t.Point(0,0));super(e,{points:a,point:l,lngLats:n,lngLat:i.unproject(l),originalEvent:o}),this._defaultPrevented=!1;}preventDefault(){this._defaultPrevented=!0;}get defaultPrevented(){return this._defaultPrevented}}class xo extends t.Event{constructor(t,e,i){super(t,{originalEvent:i}),this._defaultPrevented=!1;}preventDefault(){this._defaultPrevented=!0;}get defaultPrevented(){return this._defaultPrevented}}class vo{constructor(t,e){this._map=t,this._clickTolerance=e.clickTolerance;}reset(){delete this._mousedownPos;}wheel(t){return this._firePreventable(new xo(t.type,this._map,t))}mousedown(t,e){return this._mousedownPos=e,this._firePreventable(new fo(t.type,this._map,t))}mouseup(t){this._map.fire(new fo(t.type,this._map,t));}click(t,e){this._mousedownPos&&this._mousedownPos.dist(e)>=this._clickTolerance||this._map.fire(new fo(t.type,this._map,t));}dblclick(t){return this._firePreventable(new fo(t.type,this._map,t))}mouseover(t){this._map.fire(new fo(t.type,this._map,t));}mouseout(t){this._map.fire(new fo(t.type,this._map,t));}touchstart(t){return this._firePreventable(new go(t.type,this._map,t))}touchmove(t){this._map.fire(new go(t.type,this._map,t));}touchend(t){this._map.fire(new go(t.type,this._map,t));}touchcancel(t){this._map.fire(new go(t.type,this._map,t));}_firePreventable(t){if(this._map.fire(t),t.defaultPrevented)return {}}isEnabled(){return !0}isActive(){return !1}enable(){}disable(){}}class yo{constructor(t){this._map=t;}reset(){this._delayContextMenu=!1,delete this._contextMenuEvent;}mousemove(t){this._map.fire(new fo(t.type,this._map,t));}mousedown(){this._delayContextMenu=!0;}mouseup(){this._delayContextMenu=!1,this._contextMenuEvent&&(this._map.fire(new fo("contextmenu",this._map,this._contextMenuEvent)),delete this._contextMenuEvent);}contextmenu(t){this._delayContextMenu?this._contextMenuEvent=t:this._map.fire(new fo(t.type,this._map,t)),this._map.listens("contextmenu")&&t.preventDefault();}isEnabled(){return !0}isActive(){return !1}enable(){}disable(){}}class bo{constructor(t,e){this._map=t,this._el=t.getCanvasContainer(),this._container=t.getContainer(),this._clickTolerance=e.clickTolerance||1;}isEnabled(){return !!this._enabled}isActive(){return !!this._active}enable(){this.isEnabled()||(this._enabled=!0);}disable(){this.isEnabled()&&(this._enabled=!1);}mousedown(t,e){this.isEnabled()&&t.shiftKey&&0===t.button&&(r.disableDrag(),this._startPos=this._lastPos=e,this._active=!0);}mousemoveWindow(t,e){if(!this._active)return;const i=e;if(this._lastPos.equals(i)||!this._box&&i.dist(this._startPos)<this._clickTolerance)return;const o=this._startPos;this._lastPos=i,this._box||(this._box=r.create("div","maplibregl-boxzoom mapboxgl-boxzoom",this._container),this._container.classList.add("maplibregl-crosshair","mapboxgl-crosshair"),this._fireEvent("boxzoomstart",t));const s=Math.min(o.x,i.x),a=Math.max(o.x,i.x),n=Math.min(o.y,i.y),l=Math.max(o.y,i.y);r.setTransform(this._box,`translate(${s}px,${n}px)`),this._box.style.width=a-s+"px",this._box.style.height=l-n+"px";}mouseupWindow(e,i){if(!this._active)return;if(0!==e.button)return;const o=this._startPos,s=i;if(this.reset(),r.suppressClick(),o.x!==s.x||o.y!==s.y)return this._map.fire(new t.Event("boxzoomend",{originalEvent:e})),{cameraAnimation:t=>t.fitScreenCoordinates(o,s,this._map.getBearing(),{linear:!0})};this._fireEvent("boxzoomcancel",e);}keydown(t){this._active&&27===t.keyCode&&(this.reset(),this._fireEvent("boxzoomcancel",t));}reset(){this._active=!1,this._container.classList.remove("maplibregl-crosshair","mapboxgl-crosshair"),this._box&&(r.remove(this._box),this._box=null),r.enableDrag(),delete this._startPos,delete this._lastPos;}_fireEvent(e,i){return this._map.fire(new t.Event(e,{originalEvent:i}))}}function wo(t,e){const i={};for(let o=0;o<t.length;o++)i[t[o].identifier]=e[o];return i}class To{constructor(t){this.reset(),this.numTouches=t.numTouches;}reset(){delete this.centroid,delete this.startTime,delete this.touches,this.aborted=!1;}touchstart(e,i,o){(this.centroid||o.length>this.numTouches)&&(this.aborted=!0),this.aborted||(void 0===this.startTime&&(this.startTime=e.timeStamp),o.length===this.numTouches&&(this.centroid=function(e){const i=new t.Point(0,0);for(const t of e)i._add(t);return i.div(e.length)}(i),this.touches=wo(o,i)));}touchmove(t,e,i){if(this.aborted||!this.centroid)return;const o=wo(i,e);for(const t in this.touches){const e=this.touches[t],i=o[t];(!i||i.dist(e)>30)&&(this.aborted=!0);}}touchend(t,e,i){if((!this.centroid||t.timeStamp-this.startTime>500)&&(this.aborted=!0),0===i.length){const t=!this.aborted&&this.centroid;if(this.reset(),t)return t}}}class Eo{constructor(t){this.singleTap=new To(t),this.numTaps=t.numTaps,this.reset();}reset(){this.lastTime=1/0,delete this.lastTap,this.count=0,this.singleTap.reset();}touchstart(t,e,i){this.singleTap.touchstart(t,e,i);}touchmove(t,e,i){this.singleTap.touchmove(t,e,i);}touchend(t,e,i){const o=this.singleTap.touchend(t,e,i);if(o){const e=t.timeStamp-this.lastTime<500,i=!this.lastTap||this.lastTap.dist(o)<30;if(e&&i||this.reset(),this.count++,this.lastTime=t.timeStamp,this.lastTap=o,this.count===this.numTaps)return this.reset(),o}}}class Io{constructor(){this._zoomIn=new Eo({numTouches:1,numTaps:2}),this._zoomOut=new Eo({numTouches:2,numTaps:1}),this.reset();}reset(){this._active=!1,this._zoomIn.reset(),this._zoomOut.reset();}touchstart(t,e,i){this._zoomIn.touchstart(t,e,i),this._zoomOut.touchstart(t,e,i);}touchmove(t,e,i){this._zoomIn.touchmove(t,e,i),this._zoomOut.touchmove(t,e,i);}touchend(t,e,i){const o=this._zoomIn.touchend(t,e,i),s=this._zoomOut.touchend(t,e,i);return o?(this._active=!0,t.preventDefault(),setTimeout((()=>this.reset()),0),{cameraAnimation:e=>e.easeTo({duration:300,zoom:e.getZoom()+1,around:e.unproject(o)},{originalEvent:t})}):s?(this._active=!0,t.preventDefault(),setTimeout((()=>this.reset()),0),{cameraAnimation:e=>e.easeTo({duration:300,zoom:e.getZoom()-1,around:e.unproject(s)},{originalEvent:t})}):void 0}touchcancel(){this.reset();}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}const Po={0:1,2:2};class So{constructor(t){this.reset(),this._clickTolerance=t.clickTolerance||1;}reset(){this._active=!1,this._moved=!1,delete this._lastPoint,delete this._eventButton;}_correctButton(t,e){return !1}_move(t,e){return {}}mousedown(t,e){if(this._lastPoint)return;const i=r.mouseButton(t);this._correctButton(t,i)&&(this._lastPoint=e,this._eventButton=i);}mousemoveWindow(t,e){const i=this._lastPoint;if(i)if(t.preventDefault(),function(t,e){const i=Po[e];return void 0===t.buttons||(t.buttons&i)!==i}(t,this._eventButton))this.reset();else if(this._moved||!(e.dist(i)<this._clickTolerance))return this._moved=!0,this._lastPoint=e,this._move(i,e)}mouseupWindow(t){this._lastPoint&&r.mouseButton(t)===this._eventButton&&(this._moved&&r.suppressClick(),this.reset());}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}class Co extends So{mousedown(t,e){super.mousedown(t,e),this._lastPoint&&(this._active=!0);}_correctButton(t,e){return 0===e&&!t.ctrlKey}_move(t,e){return {around:e,panDelta:e.sub(t)}}}class zo extends So{_correctButton(t,e){return 0===e&&t.ctrlKey||2===e}_move(t,e){const i=.8*(e.x-t.x);if(i)return this._active=!0,{bearingDelta:i}}contextmenu(t){t.preventDefault();}}class Do extends So{_correctButton(t,e){return 0===e&&t.ctrlKey||2===e}_move(t,e){const i=-.5*(e.y-t.y);if(i)return this._active=!0,{pitchDelta:i}}contextmenu(t){t.preventDefault();}}class Ao{constructor(t){this._minTouches=1,this._clickTolerance=t.clickTolerance||1,this.reset();}reset(){this._active=!1,this._touches={},this._sum=new t.Point(0,0);}touchstart(t,e,i){return this._calculateTransform(t,e,i)}touchmove(t,e,i){if(this._active&&!(i.length<this._minTouches))return t.preventDefault(),this._calculateTransform(t,e,i)}touchend(t,e,i){this._calculateTransform(t,e,i),this._active&&i.length<this._minTouches&&this.reset();}touchcancel(){this.reset();}_calculateTransform(e,i,o){o.length>0&&(this._active=!0);const s=wo(o,i),a=new t.Point(0,0),r=new t.Point(0,0);let n=0;for(const t in s){const e=s[t],i=this._touches[t];i&&(a._add(e),r._add(e.sub(i)),n++,s[t]=e);}if(this._touches=s,n<this._minTouches||!r.mag())return;const l=r.div(n);return this._sum._add(l),this._sum.mag()<this._clickTolerance?void 0:{around:a.div(n),panDelta:l}}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}class Mo{constructor(){this.reset();}reset(){this._active=!1,delete this._firstTwoTouches;}_start(t){}_move(t,e,i){return {}}touchstart(t,e,i){this._firstTwoTouches||i.length<2||(this._firstTwoTouches=[i[0].identifier,i[1].identifier],this._start([e[0],e[1]]));}touchmove(t,e,i){if(!this._firstTwoTouches)return;t.preventDefault();const[o,s]=this._firstTwoTouches,a=Lo(i,e,o),r=Lo(i,e,s);if(!a||!r)return;const n=this._aroundCenter?null:a.add(r).div(2);return this._move([a,r],n,t)}touchend(t,e,i){if(!this._firstTwoTouches)return;const[o,s]=this._firstTwoTouches,a=Lo(i,e,o),n=Lo(i,e,s);a&&n||(this._active&&r.suppressClick(),this.reset());}touchcancel(){this.reset();}enable(t){this._enabled=!0,this._aroundCenter=!!t&&"center"===t.around;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}function Lo(t,e,i){for(let o=0;o<t.length;o++)if(t[o].identifier===i)return e[o]}function Ro(t,e){return Math.log(t/e)/Math.LN2}class ko extends Mo{reset(){super.reset(),delete this._distance,delete this._startDistance;}_start(t){this._startDistance=this._distance=t[0].dist(t[1]);}_move(t,e){const i=this._distance;if(this._distance=t[0].dist(t[1]),this._active||!(Math.abs(Ro(this._distance,this._startDistance))<.1))return this._active=!0,{zoomDelta:Ro(this._distance,i),pinchAround:e}}}function Bo(t,e){return 180*t.angleWith(e)/Math.PI}class Fo extends Mo{reset(){super.reset(),delete this._minDiameter,delete this._startVector,delete this._vector;}_start(t){this._startVector=this._vector=t[0].sub(t[1]),this._minDiameter=t[0].dist(t[1]);}_move(t,e){const i=this._vector;if(this._vector=t[0].sub(t[1]),this._active||!this._isBelowThreshold(this._vector))return this._active=!0,{bearingDelta:Bo(this._vector,i),pinchAround:e}}_isBelowThreshold(t){this._minDiameter=Math.min(this._minDiameter,t.mag());const e=25/(Math.PI*this._minDiameter)*360,i=Bo(t,this._startVector);return Math.abs(i)<e}}function Oo(t){return Math.abs(t.y)>Math.abs(t.x)}class Uo extends Mo{reset(){super.reset(),this._valid=void 0,delete this._firstMove,delete this._lastPoints;}_start(t){this._lastPoints=t,Oo(t[0].sub(t[1]))&&(this._valid=!1);}_move(t,e,i){const o=t[0].sub(this._lastPoints[0]),s=t[1].sub(this._lastPoints[1]);if(this._valid=this.gestureBeginsVertically(o,s,i.timeStamp),this._valid)return this._lastPoints=t,this._active=!0,{pitchDelta:(o.y+s.y)/2*-.5}}gestureBeginsVertically(t,e,i){if(void 0!==this._valid)return this._valid;const o=t.mag()>=2,s=e.mag()>=2;if(!o&&!s)return;if(!o||!s)return void 0===this._firstMove&&(this._firstMove=i),i-this._firstMove<100&&void 0;const a=t.y>0==e.y>0;return Oo(t)&&Oo(e)&&a}}const No={panStep:100,bearingStep:15,pitchStep:10};class Zo{constructor(){const t=No;this._panStep=t.panStep,this._bearingStep=t.bearingStep,this._pitchStep=t.pitchStep,this._rotationDisabled=!1;}reset(){this._active=!1;}keydown(t){if(t.altKey||t.ctrlKey||t.metaKey)return;let e=0,i=0,o=0,s=0,a=0;switch(t.keyCode){case 61:case 107:case 171:case 187:e=1;break;case 189:case 109:case 173:e=-1;break;case 37:t.shiftKey?i=-1:(t.preventDefault(),s=-1);break;case 39:t.shiftKey?i=1:(t.preventDefault(),s=1);break;case 38:t.shiftKey?o=1:(t.preventDefault(),a=-1);break;case 40:t.shiftKey?o=-1:(t.preventDefault(),a=1);break;default:return}return this._rotationDisabled&&(i=0,o=0),{cameraAnimation:r=>{const n=r.getZoom();r.easeTo({duration:300,easeId:"keyboardHandler",easing:Vo,zoom:e?Math.round(n)+e*(t.shiftKey?2:1):n,bearing:r.getBearing()+i*this._bearingStep,pitch:r.getPitch()+o*this._pitchStep,offset:[-s*this._panStep,-a*this._panStep],center:r.getCenter()},{originalEvent:t});}}}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}disableRotation(){this._rotationDisabled=!0;}enableRotation(){this._rotationDisabled=!1;}}function Vo(t){return t*(2-t)}const qo=4.000244140625;class Go{constructor(e,i){this._map=e,this._el=e.getCanvasContainer(),this._handler=i,this._delta=0,this._defaultZoomRate=.01,this._wheelZoomRate=.0022222222222222222,t.bindAll(["_onTimeout"],this);}setZoomRate(t){this._defaultZoomRate=t;}setWheelZoomRate(t){this._wheelZoomRate=t;}isEnabled(){return !!this._enabled}isActive(){return !!this._active||void 0!==this._finishTimeout}isZooming(){return !!this._zooming}enable(t){this.isEnabled()||(this._enabled=!0,this._aroundCenter=t&&"center"===t.around);}disable(){this.isEnabled()&&(this._enabled=!1);}wheel(e){if(!this.isEnabled())return;let i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?40*e.deltaY:e.deltaY;const o=t.exported.now(),s=o-(this._lastWheelEventTime||0);this._lastWheelEventTime=o,0!==i&&i%qo==0?this._type="wheel":0!==i&&Math.abs(i)<4?this._type="trackpad":s>400?(this._type=null,this._lastValue=i,this._timeout=setTimeout(this._onTimeout,40,e)):this._type||(this._type=Math.abs(s*i)<200?"trackpad":"wheel",this._timeout&&(clearTimeout(this._timeout),this._timeout=null,i+=this._lastValue)),e.shiftKey&&i&&(i/=4),this._type&&(this._lastWheelEvent=e,this._delta-=i,this._active||this._start(e)),e.preventDefault();}_onTimeout(t){this._type="wheel",this._delta-=this._lastValue,this._active||this._start(t);}_start(e){if(!this._delta)return;this._frameId&&(this._frameId=null),this._active=!0,this.isZooming()||(this._zooming=!0),this._finishTimeout&&(clearTimeout(this._finishTimeout),delete this._finishTimeout);const i=r.mousePos(this._el,e);this._around=t.LngLat.convert(this._aroundCenter?this._map.getCenter():this._map.unproject(i)),this._aroundPoint=this._map.transform.locationPoint(this._around),this._frameId||(this._frameId=!0,this._handler._triggerRenderFrame());}renderFrame(){if(!this._frameId)return;if(this._frameId=null,!this.isActive())return;const e=this._map.transform;if(0!==this._delta){const t="wheel"===this._type&&Math.abs(this._delta)>qo?this._wheelZoomRate:this._defaultZoomRate;let i=2/(1+Math.exp(-Math.abs(this._delta*t)));this._delta<0&&0!==i&&(i=1/i);const o="number"==typeof this._targetZoom?e.zoomScale(this._targetZoom):e.scale;this._targetZoom=Math.min(e.maxZoom,Math.max(e.minZoom,e.scaleZoom(o*i))),"wheel"===this._type&&(this._startZoom=e.zoom,this._easing=this._smoothOutEasing(200)),this._delta=0;}const i="number"==typeof this._targetZoom?this._targetZoom:e.zoom,o=this._startZoom,s=this._easing;let a,r=!1;if("wheel"===this._type&&o&&s){const e=Math.min((t.exported.now()-this._lastWheelEventTime)/200,1),n=s(e);a=t.number(o,i,n),e<1?this._frameId||(this._frameId=!0):r=!0;}else a=i,r=!0;return this._active=!0,r&&(this._active=!1,this._finishTimeout=setTimeout((()=>{this._zooming=!1,this._handler._triggerRenderFrame(),delete this._targetZoom,delete this._finishTimeout;}),200)),{noInertia:!0,needsRenderFrame:!r,zoomDelta:a-e.zoom,around:this._aroundPoint,originalEvent:this._lastWheelEvent}}_smoothOutEasing(e){let i=t.ease;if(this._prevEase){const e=this._prevEase,o=(t.exported.now()-e.start)/e.duration,s=e.easing(o+.01)-e.easing(o),a=.27/Math.sqrt(s*s+1e-4)*.01,r=Math.sqrt(.0729-a*a);i=t.bezier(a,r,.25,1);}return this._prevEase={start:t.exported.now(),duration:e,easing:i},i}reset(){this._active=!1;}}class jo{constructor(t,e){this._clickZoom=t,this._tapZoom=e;}enable(){this._clickZoom.enable(),this._tapZoom.enable();}disable(){this._clickZoom.disable(),this._tapZoom.disable();}isEnabled(){return this._clickZoom.isEnabled()&&this._tapZoom.isEnabled()}isActive(){return this._clickZoom.isActive()||this._tapZoom.isActive()}}class $o{constructor(){this.reset();}reset(){this._active=!1;}dblclick(t,e){return t.preventDefault(),{cameraAnimation:i=>{i.easeTo({duration:300,zoom:i.getZoom()+(t.shiftKey?-1:1),around:i.unproject(e)},{originalEvent:t});}}}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}class Wo{constructor(){this._tap=new Eo({numTouches:1,numTaps:1}),this.reset();}reset(){this._active=!1,delete this._swipePoint,delete this._swipeTouch,delete this._tapTime,this._tap.reset();}touchstart(t,e,i){this._swipePoint||(this._tapTime&&t.timeStamp-this._tapTime>500&&this.reset(),this._tapTime?i.length>0&&(this._swipePoint=e[0],this._swipeTouch=i[0].identifier):this._tap.touchstart(t,e,i));}touchmove(t,e,i){if(this._tapTime){if(this._swipePoint){if(i[0].identifier!==this._swipeTouch)return;const o=e[0],s=o.y-this._swipePoint.y;return this._swipePoint=o,t.preventDefault(),this._active=!0,{zoomDelta:s/128}}}else this._tap.touchmove(t,e,i);}touchend(t,e,i){this._tapTime?this._swipePoint&&0===i.length&&this.reset():this._tap.touchend(t,e,i)&&(this._tapTime=t.timeStamp);}touchcancel(){this.reset();}enable(){this._enabled=!0;}disable(){this._enabled=!1,this.reset();}isEnabled(){return this._enabled}isActive(){return this._active}}class Xo{constructor(t,e,i){this._el=t,this._mousePan=e,this._touchPan=i;}enable(t){this._inertiaOptions=t||{},this._mousePan.enable(),this._touchPan.enable(),this._el.classList.add("maplibregl-touch-drag-pan","mapboxgl-touch-drag-pan");}disable(){this._mousePan.disable(),this._touchPan.disable(),this._el.classList.remove("maplibregl-touch-drag-pan","mapboxgl-touch-drag-pan");}isEnabled(){return this._mousePan.isEnabled()&&this._touchPan.isEnabled()}isActive(){return this._mousePan.isActive()||this._touchPan.isActive()}}class Ho{constructor(t,e,i){this._pitchWithRotate=t.pitchWithRotate,this._mouseRotate=e,this._mousePitch=i;}enable(){this._mouseRotate.enable(),this._pitchWithRotate&&this._mousePitch.enable();}disable(){this._mouseRotate.disable(),this._mousePitch.disable();}isEnabled(){return this._mouseRotate.isEnabled()&&(!this._pitchWithRotate||this._mousePitch.isEnabled())}isActive(){return this._mouseRotate.isActive()||this._mousePitch.isActive()}}class Ko{constructor(t,e,i,o){this._el=t,this._touchZoom=e,this._touchRotate=i,this._tapDragZoom=o,this._rotationDisabled=!1,this._enabled=!0;}enable(t){this._touchZoom.enable(t),this._rotationDisabled||this._touchRotate.enable(t),this._tapDragZoom.enable(),this._el.classList.add("maplibregl-touch-zoom-rotate","mapboxgl-touch-zoom-rotate");}disable(){this._touchZoom.disable(),this._touchRotate.disable(),this._tapDragZoom.disable(),this._el.classList.remove("maplibregl-touch-zoom-rotate","mapboxgl-touch-zoom-rotate");}isEnabled(){return this._touchZoom.isEnabled()&&(this._rotationDisabled||this._touchRotate.isEnabled())&&this._tapDragZoom.isEnabled()}isActive(){return this._touchZoom.isActive()||this._touchRotate.isActive()||this._tapDragZoom.isActive()}disableRotation(){this._rotationDisabled=!0,this._touchRotate.disable();}enableRotation(){this._rotationDisabled=!1,this._touchZoom.isEnabled()&&this._touchRotate.enable();}}const Yo=t=>t.zoom||t.drag||t.pitch||t.rotate;class Jo extends t.Event{}function Qo(t){return t.panDelta&&t.panDelta.mag()||t.zoomDelta||t.bearingDelta||t.pitchDelta}class ts{constructor(e,i){this._map=e,this._el=this._map.getCanvasContainer(),this._handlers=[],this._handlersById={},this._changes=[],this._inertia=new _o(e),this._bearingSnap=i.bearingSnap,this._previousActiveHandlers={},this._eventsInProgress={},this._addDefaultHandlers(i),t.bindAll(["handleEvent","handleWindowEvent"],this);const o=this._el;this._listeners=[[o,"touchstart",{passive:!0}],[o,"touchmove",{passive:!1}],[o,"touchend",void 0],[o,"touchcancel",void 0],[o,"mousedown",void 0],[o,"mousemove",void 0],[o,"mouseup",void 0],[document,"mousemove",{capture:!0}],[document,"mouseup",void 0],[o,"mouseover",void 0],[o,"mouseout",void 0],[o,"dblclick",void 0],[o,"click",void 0],[o,"keydown",{capture:!1}],[o,"keyup",void 0],[o,"wheel",{passive:!1}],[o,"contextmenu",void 0],[window,"blur",void 0]];for(const[t,e,i]of this._listeners)r.addEventListener(t,e,t===document?this.handleWindowEvent:this.handleEvent,i);}destroy(){for(const[t,e,i]of this._listeners)r.removeEventListener(t,e,t===document?this.handleWindowEvent:this.handleEvent,i);}_addDefaultHandlers(t){const e=this._map,i=e.getCanvasContainer();this._add("mapEvent",new vo(e,t));const o=e.boxZoom=new bo(e,t);this._add("boxZoom",o);const s=new Io,a=new $o;e.doubleClickZoom=new jo(a,s),this._add("tapZoom",s),this._add("clickZoom",a);const r=new Wo;this._add("tapDragZoom",r);const n=e.touchPitch=new Uo;this._add("touchPitch",n);const l=new zo(t),c=new Do(t);e.dragRotate=new Ho(t,l,c),this._add("mouseRotate",l,["mousePitch"]),this._add("mousePitch",c,["mouseRotate"]);const h=new Co(t),u=new Ao(t);e.dragPan=new Xo(i,h,u),this._add("mousePan",h),this._add("touchPan",u,["touchZoom","touchRotate"]);const d=new Fo,_=new ko;e.touchZoomRotate=new Ko(i,_,d,r),this._add("touchRotate",d,["touchPan","touchZoom"]),this._add("touchZoom",_,["touchPan","touchRotate"]);const m=e.scrollZoom=new Go(e,this);this._add("scrollZoom",m,["mousePan"]);const p=e.keyboard=new Zo;this._add("keyboard",p),this._add("blockableMapEvent",new yo(e));for(const i of ["boxZoom","doubleClickZoom","tapDragZoom","touchPitch","dragRotate","dragPan","touchZoomRotate","scrollZoom","keyboard"])t.interactive&&t[i]&&e[i].enable(t[i]);}_add(t,e,i){this._handlers.push({handlerName:t,handler:e,allowed:i}),this._handlersById[t]=e;}stop(t){if(!this._updatingCamera){for(const{handler:t}of this._handlers)t.reset();this._inertia.clear(),this._fireEvents({},{},t),this._changes=[];}}isActive(){for(const{handler:t}of this._handlers)if(t.isActive())return !0;return !1}isZooming(){return !!this._eventsInProgress.zoom||this._map.scrollZoom.isZooming()}isRotating(){return !!this._eventsInProgress.rotate}isMoving(){return Boolean(Yo(this._eventsInProgress))||this.isZooming()}_blockedByActive(t,e,i){for(const o in t)if(o!==i&&(!e||e.indexOf(o)<0))return !0;return !1}handleWindowEvent(t){this.handleEvent(t,`${t.type}Window`);}_getMapTouches(t){const e=[];for(const i of t)this._el.contains(i.target)&&e.push(i);return e}handleEvent(t,e){if("blur"===t.type)return void this.stop(!0);this._updatingCamera=!0;const i="renderFrame"===t.type?void 0:t,o={needsRenderFrame:!1},s={},a={},n=t.touches,l=n?this._getMapTouches(n):void 0,c=l?r.touchPos(this._el,l):r.mousePos(this._el,t);for(const{handlerName:r,handler:n,allowed:h}of this._handlers){if(!n.isEnabled())continue;let u;this._blockedByActive(a,h,r)?n.reset():n[e||t.type]&&(u=n[e||t.type](t,c,l),this.mergeHandlerResult(o,s,u,r,i),u&&u.needsRenderFrame&&this._triggerRenderFrame()),(u||n.isActive())&&(a[r]=n);}const h={};for(const t in this._previousActiveHandlers)a[t]||(h[t]=i);this._previousActiveHandlers=a,(Object.keys(h).length||Qo(o))&&(this._changes.push([o,s,h]),this._triggerRenderFrame()),(Object.keys(a).length||Qo(o))&&this._map._stop(!0),this._updatingCamera=!1;const{cameraAnimation:u}=o;u&&(this._inertia.clear(),this._fireEvents({},{},!0),this._changes=[],u(this._map));}mergeHandlerResult(e,i,o,s,a){if(!o)return;t.extend(e,o);const r={handlerName:s,originalEvent:o.originalEvent||a};void 0!==o.zoomDelta&&(i.zoom=r),void 0!==o.panDelta&&(i.drag=r),void 0!==o.pitchDelta&&(i.pitch=r),void 0!==o.bearingDelta&&(i.rotate=r);}_applyChanges(){const e={},i={},o={};for(const[s,a,r]of this._changes)s.panDelta&&(e.panDelta=(e.panDelta||new t.Point(0,0))._add(s.panDelta)),s.zoomDelta&&(e.zoomDelta=(e.zoomDelta||0)+s.zoomDelta),s.bearingDelta&&(e.bearingDelta=(e.bearingDelta||0)+s.bearingDelta),s.pitchDelta&&(e.pitchDelta=(e.pitchDelta||0)+s.pitchDelta),void 0!==s.around&&(e.around=s.around),void 0!==s.pinchAround&&(e.pinchAround=s.pinchAround),s.noInertia&&(e.noInertia=s.noInertia),t.extend(i,a),t.extend(o,r);this._updateMapTransform(e,i,o),this._changes=[];}_updateMapTransform(t,e,i){const o=this._map,s=o.transform;if(!Qo(t))return this._fireEvents(e,i,!0);let{panDelta:a,zoomDelta:r,bearingDelta:n,pitchDelta:l,around:c,pinchAround:h}=t;void 0!==h&&(c=h),o._stop(!0),c=c||o.transform.centerPoint;const u=s.pointLocation(a?c.sub(a):c);n&&(s.bearing+=n),l&&(s.pitch+=l),r&&(s.zoom+=r),s.setLocationAtPoint(u,c),this._map._update(),t.noInertia||this._inertia.record(t),this._fireEvents(e,i,!0);}_fireEvents(e,i,o){const s=Yo(this._eventsInProgress),a=Yo(e),r={};for(const t in e){const{originalEvent:i}=e[t];this._eventsInProgress[t]||(r[`${t}start`]=i),this._eventsInProgress[t]=e[t];}!s&&a&&this._fireEvent("movestart",a.originalEvent);for(const t in r)this._fireEvent(t,r[t]);a&&this._fireEvent("move",a.originalEvent);for(const t in e){const{originalEvent:i}=e[t];this._fireEvent(t,i);}const n={};let l;for(const t in this._eventsInProgress){const{handlerName:e,originalEvent:o}=this._eventsInProgress[t];this._handlersById[e].isActive()||(delete this._eventsInProgress[t],l=i[e]||o,n[`${t}end`]=l);}for(const t in n)this._fireEvent(t,n[t]);const c=Yo(this._eventsInProgress);if(o&&(s||a)&&!c){this._updatingCamera=!0;const e=this._inertia._onMoveEnd(this._map.dragPan._inertiaOptions),i=t=>0!==t&&-this._bearingSnap<t&&t<this._bearingSnap;e?(i(e.bearing||this._map.getBearing())&&(e.bearing=0),this._map.easeTo(e,{originalEvent:l})):(this._map.fire(new t.Event("moveend",{originalEvent:l})),i(this._map.getBearing())&&this._map.resetNorth()),this._updatingCamera=!1;}}_fireEvent(e,i){this._map.fire(new t.Event(e,i?{originalEvent:i}:{}));}_requestFrame(){return this._map.triggerRepaint(),this._map._renderTaskQueue.add((t=>{delete this._frameId,this.handleEvent(new Jo("renderFrame",{timeStamp:t})),this._applyChanges();}))}_triggerRenderFrame(){void 0===this._frameId&&(this._frameId=this._requestFrame());}}class es extends t.Evented{constructor(e,i){super(),this._moving=!1,this._zooming=!1,this.transform=e,this._bearingSnap=i.bearingSnap,t.bindAll(["_renderFrameCallback"],this);}getCenter(){return new t.LngLat(this.transform.center.lng,this.transform.center.lat)}setCenter(t,e){return this.jumpTo({center:t},e)}panBy(e,i,o){return e=t.Point.convert(e).mult(-1),this.panTo(this.transform.center,t.extend({offset:e},i),o)}panTo(e,i,o){return this.easeTo(t.extend({center:e},i),o)}getZoom(){return this.transform.zoom}setZoom(t,e){return this.jumpTo({zoom:t},e),this}zoomTo(e,i,o){return this.easeTo(t.extend({zoom:e},i),o)}zoomIn(t,e){return this.zoomTo(this.getZoom()+1,t,e),this}zoomOut(t,e){return this.zoomTo(this.getZoom()-1,t,e),this}getBearing(){return this.transform.bearing}setBearing(t,e){return this.jumpTo({bearing:t},e),this}getPadding(){return this.transform.padding}setPadding(t,e){return this.jumpTo({padding:t},e),this}rotateTo(e,i,o){return this.easeTo(t.extend({bearing:e},i),o)}resetNorth(e,i){return this.rotateTo(0,t.extend({duration:1e3},e),i),this}resetNorthPitch(e,i){return this.easeTo(t.extend({bearing:0,pitch:0,duration:1e3},e),i),this}snapToNorth(t,e){return Math.abs(this.getBearing())<this._bearingSnap?this.resetNorth(t,e):this}getPitch(){return this.transform.pitch}setPitch(t,e){return this.jumpTo({pitch:t},e),this}cameraForBounds(e,i){e=t.LngLatBounds.convert(e);const o=i&&i.bearing||0;return this._cameraForBoxAndBearing(e.getNorthWest(),e.getSouthEast(),o,i)}_cameraForBoxAndBearing(e,i,o,s){const a={top:0,bottom:0,right:0,left:0};if("number"==typeof(s=t.extend({padding:a,offset:[0,0],maxZoom:this.transform.maxZoom},s)).padding){const t=s.padding;s.padding={top:t,bottom:t,right:t,left:t};}s.padding=t.extend(a,s.padding);const r=this.transform,n=r.padding,l=r.project(t.LngLat.convert(e)),c=r.project(t.LngLat.convert(i)),h=l.rotate(-o*Math.PI/180),u=c.rotate(-o*Math.PI/180),d=new t.Point(Math.max(h.x,u.x),Math.max(h.y,u.y)),_=new t.Point(Math.min(h.x,u.x),Math.min(h.y,u.y)),m=d.sub(_),p=(r.width-(n.left+n.right+s.padding.left+s.padding.right))/m.x,f=(r.height-(n.top+n.bottom+s.padding.top+s.padding.bottom))/m.y;if(f<0||p<0)return void t.warnOnce("Map cannot fit within canvas with the given bounds, padding, and/or offset.");const g=Math.min(r.scaleZoom(r.scale*Math.min(p,f)),s.maxZoom),x=t.Point.convert(s.offset),v=new t.Point((s.padding.left-s.padding.right)/2,(s.padding.top-s.padding.bottom)/2).rotate(o*Math.PI/180),y=x.add(v).mult(r.scale/r.zoomScale(g));return {center:r.unproject(l.add(c).div(2).sub(y)),zoom:g,bearing:o}}fitBounds(t,e,i){return this._fitInternal(this.cameraForBounds(t,e),e,i)}fitScreenCoordinates(e,i,o,s,a){return this._fitInternal(this._cameraForBoxAndBearing(this.transform.pointLocation(t.Point.convert(e)),this.transform.pointLocation(t.Point.convert(i)),o,s),s,a)}_fitInternal(e,i,o){return e?(delete(i=t.extend(e,i)).padding,i.linear?this.easeTo(i,o):this.flyTo(i,o)):this}jumpTo(e,i){this.stop();const o=this.transform;let s=!1,a=!1,r=!1;return "zoom"in e&&o.zoom!==+e.zoom&&(s=!0,o.zoom=+e.zoom),void 0!==e.center&&(o.center=t.LngLat.convert(e.center)),"bearing"in e&&o.bearing!==+e.bearing&&(a=!0,o.bearing=+e.bearing),"pitch"in e&&o.pitch!==+e.pitch&&(r=!0,o.pitch=+e.pitch),null==e.padding||o.isPaddingEqual(e.padding)||(o.padding=e.padding),this.fire(new t.Event("movestart",i)).fire(new t.Event("move",i)),s&&this.fire(new t.Event("zoomstart",i)).fire(new t.Event("zoom",i)).fire(new t.Event("zoomend",i)),a&&this.fire(new t.Event("rotatestart",i)).fire(new t.Event("rotate",i)).fire(new t.Event("rotateend",i)),r&&this.fire(new t.Event("pitchstart",i)).fire(new t.Event("pitch",i)).fire(new t.Event("pitchend",i)),this.fire(new t.Event("moveend",i))}easeTo(e,i){this._stop(!1,e.easeId),(!1===(e=t.extend({offset:[0,0],duration:500,easing:t.ease},e)).animate||!e.essential&&t.exported.prefersReducedMotion)&&(e.duration=0);const o=this.transform,s=this.getZoom(),a=this.getBearing(),r=this.getPitch(),n=this.getPadding(),l="zoom"in e?+e.zoom:s,c="bearing"in e?this._normalizeBearing(e.bearing,a):a,h="pitch"in e?+e.pitch:r,u="padding"in e?e.padding:o.padding,d=t.Point.convert(e.offset);let _=o.centerPoint.add(d);const m=o.pointLocation(_),p=t.LngLat.convert(e.center||m);this._normalizeCenter(p);const f=o.project(m),g=o.project(p).sub(f),x=o.zoomScale(l-s);let v,y;e.around&&(v=t.LngLat.convert(e.around),y=o.locationPoint(v));const b={moving:this._moving,zooming:this._zooming,rotating:this._rotating,pitching:this._pitching};return this._zooming=this._zooming||l!==s,this._rotating=this._rotating||a!==c,this._pitching=this._pitching||h!==r,this._padding=!o.isPaddingEqual(u),this._easeId=e.easeId,this._prepareEase(i,e.noMoveStart,b),this._ease((e=>{if(this._zooming&&(o.zoom=t.number(s,l,e)),this._rotating&&(o.bearing=t.number(a,c,e)),this._pitching&&(o.pitch=t.number(r,h,e)),this._padding&&(o.interpolatePadding(n,u,e),_=o.centerPoint.add(d)),v)o.setLocationAtPoint(v,y);else {const t=o.zoomScale(o.zoom-s),i=l>s?Math.min(2,x):Math.max(.5,x),a=Math.pow(i,1-e),r=o.unproject(f.add(g.mult(e*a)).mult(t));o.setLocationAtPoint(o.renderWorldCopies?r.wrap():r,_);}this._fireMoveEvents(i);}),(t=>{this._afterEase(i,t);}),e),this}_prepareEase(e,i,o={}){this._moving=!0,i||o.moving||this.fire(new t.Event("movestart",e)),this._zooming&&!o.zooming&&this.fire(new t.Event("zoomstart",e)),this._rotating&&!o.rotating&&this.fire(new t.Event("rotatestart",e)),this._pitching&&!o.pitching&&this.fire(new t.Event("pitchstart",e));}_fireMoveEvents(e){this.fire(new t.Event("move",e)),this._zooming&&this.fire(new t.Event("zoom",e)),this._rotating&&this.fire(new t.Event("rotate",e)),this._pitching&&this.fire(new t.Event("pitch",e));}_afterEase(e,i){if(this._easeId&&i&&this._easeId===i)return;delete this._easeId;const o=this._zooming,s=this._rotating,a=this._pitching;this._moving=!1,this._zooming=!1,this._rotating=!1,this._pitching=!1,this._padding=!1,o&&this.fire(new t.Event("zoomend",e)),s&&this.fire(new t.Event("rotateend",e)),a&&this.fire(new t.Event("pitchend",e)),this.fire(new t.Event("moveend",e));}flyTo(e,i){if(!e.essential&&t.exported.prefersReducedMotion){const o=t.pick(e,["center","zoom","bearing","pitch","around"]);return this.jumpTo(o,i)}this.stop(),e=t.extend({offset:[0,0],speed:1.2,curve:1.42,easing:t.ease},e);const o=this.transform,s=this.getZoom(),a=this.getBearing(),r=this.getPitch(),n=this.getPadding(),l="zoom"in e?t.clamp(+e.zoom,o.minZoom,o.maxZoom):s,c="bearing"in e?this._normalizeBearing(e.bearing,a):a,h="pitch"in e?+e.pitch:r,u="padding"in e?e.padding:o.padding,d=o.zoomScale(l-s),_=t.Point.convert(e.offset);let m=o.centerPoint.add(_);const p=o.pointLocation(m),f=t.LngLat.convert(e.center||p);this._normalizeCenter(f);const g=o.project(p),x=o.project(f).sub(g);let v=e.curve;const y=Math.max(o.width,o.height),b=y/d,w=x.mag();if("minZoom"in e){const i=t.clamp(Math.min(e.minZoom,s,l),o.minZoom,o.maxZoom),a=y/o.zoomScale(i-s);v=Math.sqrt(a/w*2);}const T=v*v;function E(t){const e=(b*b-y*y+(t?-1:1)*T*T*w*w)/(2*(t?b:y)*T*w);return Math.log(Math.sqrt(e*e+1)-e)}function I(t){return (Math.exp(t)-Math.exp(-t))/2}function P(t){return (Math.exp(t)+Math.exp(-t))/2}const S=E(0);let C=function(t){return P(S)/P(S+v*t)},z=function(t){return y*((P(S)*(I(e=S+v*t)/P(e))-I(S))/T)/w;var e;},D=(E(1)-S)/v;if(Math.abs(w)<1e-6||!isFinite(D)){if(Math.abs(y-b)<1e-6)return this.easeTo(e,i);const t=b<y?-1:1;D=Math.abs(Math.log(b/y))/v,z=function(){return 0},C=function(e){return Math.exp(t*v*e)};}return e.duration="duration"in e?+e.duration:1e3*D/("screenSpeed"in e?+e.screenSpeed/v:+e.speed),e.maxDuration&&e.duration>e.maxDuration&&(e.duration=0),this._zooming=!0,this._rotating=a!==c,this._pitching=h!==r,this._padding=!o.isPaddingEqual(u),this._prepareEase(i,!1),this._ease((e=>{const d=e*D,p=1/C(d);o.zoom=1===e?l:s+o.scaleZoom(p),this._rotating&&(o.bearing=t.number(a,c,e)),this._pitching&&(o.pitch=t.number(r,h,e)),this._padding&&(o.interpolatePadding(n,u,e),m=o.centerPoint.add(_));const v=1===e?f:o.unproject(g.add(x.mult(z(d))).mult(p));o.setLocationAtPoint(o.renderWorldCopies?v.wrap():v,m),this._fireMoveEvents(i);}),(()=>this._afterEase(i)),e),this}isEasing(){return !!this._easeFrameId}stop(){return this._stop()}_stop(t,e){if(this._easeFrameId&&(this._cancelRenderFrame(this._easeFrameId),delete this._easeFrameId,delete this._onEaseFrame),this._onEaseEnd){const t=this._onEaseEnd;delete this._onEaseEnd,t.call(this,e);}if(!t){const t=this.handlers;t&&t.stop(!1);}return this}_ease(e,i,o){!1===o.animate||0===o.duration?(e(1),i()):(this._easeStart=t.exported.now(),this._easeOptions=o,this._onEaseFrame=e,this._onEaseEnd=i,this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback));}_renderFrameCallback(){const e=Math.min((t.exported.now()-this._easeStart)/this._easeOptions.duration,1);this._onEaseFrame(this._easeOptions.easing(e)),e<1?this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback):this.stop();}_normalizeBearing(e,i){e=t.wrap(e,-180,180);const o=Math.abs(e-i);return Math.abs(e-360-i)<o&&(e-=360),Math.abs(e+360-i)<o&&(e+=360),e}_normalizeCenter(t){const e=this.transform;if(!e.renderWorldCopies||e.lngRange)return;const i=t.lng-e.center.lng;t.lng+=i>180?-360:i<-180?360:0;}}class is{constructor(e={}){this.options=e,t.bindAll(["_toggleAttribution","_updateData","_updateCompact"],this);}getDefaultPosition(){return "bottom-right"}onAdd(t){const e=this.options&&this.options.compact;return this._map=t,this._container=r.create("div","maplibregl-ctrl maplibregl-ctrl-attrib mapboxgl-ctrl mapboxgl-ctrl-attrib"),this._compactButton=r.create("button","maplibregl-ctrl-attrib-button mapboxgl-ctrl-attrib-button",this._container),this._compactButton.addEventListener("click",this._toggleAttribution),this._compactButton.type="button",this._setElementTitle(this._compactButton,"ToggleAttribution"),this._innerContainer=r.create("div","maplibregl-ctrl-attrib-inner mapboxgl-ctrl-attrib-inner",this._container),this._innerContainer.setAttribute("role","list"),e&&this._container.classList.add("maplibregl-compact","mapboxgl-compact"),this._updateAttributions(),this._map.on("styledata",this._updateData),this._map.on("sourcedata",this._updateData),void 0===e&&(this._map.on("resize",this._updateCompact),this._updateCompact()),this._container}onRemove(){r.remove(this._container),this._map.off("styledata",this._updateData),this._map.off("sourcedata",this._updateData),this._map.off("resize",this._updateCompact),this._map=void 0,this._attribHTML=void 0;}_setElementTitle(t,e){const i=this._map._getUIString(`AttributionControl.${e}`);t.title=i,t.setAttribute("aria-label",i);}_toggleAttribution(){this._container.classList.contains("maplibregl-compact-show")||this._container.classList.contains("mapboxgl-compact-show")?(this._container.classList.remove("maplibregl-compact-show","mapboxgl-compact-show"),this._compactButton.setAttribute("aria-pressed","false")):(this._container.classList.add("maplibregl-compact-show","mapboxgl-compact-show"),this._compactButton.setAttribute("aria-pressed","true"));}_updateData(t){!t||"metadata"!==t.sourceDataType&&"visibility"!==t.sourceDataType&&"style"!==t.dataType||this._updateAttributions();}_updateAttributions(){if(!this._map.style)return;let t=[];if(this.options.customAttribution&&(Array.isArray(this.options.customAttribution)?t=t.concat(this.options.customAttribution.map((t=>"string"!=typeof t?"":t))):"string"==typeof this.options.customAttribution&&t.push(this.options.customAttribution)),this._map.style.stylesheet){const t=this._map.style.stylesheet;this.styleOwner=t.owner,this.styleId=t.id;}const e=this._map.style.sourceCaches;for(const i in e){const o=e[i];if(o.used){const e=o.getSource();e.attribution&&t.indexOf(e.attribution)<0&&t.push(e.attribution);}}t.sort(((t,e)=>t.length-e.length)),t=t.filter(((e,i)=>{for(let o=i+1;o<t.length;o++)if(t[o].indexOf(e)>=0)return !1;return !0}));const i=t.join(" | ");i!==this._attribHTML&&(this._attribHTML=i,t.length?(this._innerContainer.innerHTML=i,this._container.classList.remove("maplibregl-attrib-empty","mapboxgl-attrib-empty")):this._container.classList.add("maplibregl-attrib-empty","mapboxgl-attrib-empty"),this._editLink=null);}_updateCompact(){this._map.getCanvasContainer().offsetWidth<=640?this._container.classList.add("maplibregl-compact","mapboxgl-compact"):this._container.classList.remove("maplibregl-compact","maplibregl-compact-show","mapboxgl-compact","mapboxgl-compact-show");}}class os{constructor(){t.bindAll(["_updateLogo"],this),t.bindAll(["_updateCompact"],this);}onAdd(t){this._map=t,this._container=r.create("div","maplibregl-ctrl mapboxgl-ctrl");const e=r.create("a","maplibregl-ctrl-logo mapboxgl-ctrl-logo");return e.target="_blank",e.rel="noopener nofollow",e.href="https://maplibre.org/",e.setAttribute("aria-label",this._map._getUIString("LogoControl.Title")),e.setAttribute("rel","noopener nofollow"),this._container.appendChild(e),this._container.style.display="none",this._map.on("sourcedata",this._updateLogo),this._updateLogo(void 0),this._map.on("resize",this._updateCompact),this._updateCompact(),this._container}onRemove(){r.remove(this._container),this._map.off("sourcedata",this._updateLogo),this._map.off("resize",this._updateCompact);}getDefaultPosition(){return "bottom-left"}_updateLogo(t){t&&"metadata"!==t.sourceDataType||(this._container.style.display=this._logoRequired()?"block":"none");}_logoRequired(){if(!this._map.style)return;const t=this._map.style.sourceCaches;for(const e in t)if(t[e].getSource().maplibreLogo)return !0;return !1}_updateCompact(){const t=this._container.children;if(t.length){const e=t[0];this._map.getCanvasContainer().offsetWidth<250?e.classList.add("maplibregl-compact","mapboxgl-compact"):e.classList.remove("maplibregl-compact","mapboxgl-compact");}}}class ss{constructor(){this._queue=[],this._id=0,this._cleared=!1,this._currentlyRunning=!1;}add(t){const e=++this._id;return this._queue.push({callback:t,id:e,cancelled:!1}),e}remove(t){const e=this._currentlyRunning,i=e?this._queue.concat(e):this._queue;for(const e of i)if(e.id===t)return void(e.cancelled=!0)}run(t=0){const e=this._currentlyRunning=this._queue;this._queue=[];for(const i of e)if(!i.cancelled&&(i.callback(t),this._cleared))break;this._cleared=!1,this._currentlyRunning=!1;}clear(){this._currentlyRunning&&(this._cleared=!0),this._queue=[];}}const as={"AttributionControl.ToggleAttribution":"Toggle attribution","AttributionControl.MapFeedback":"Map feedback","FullscreenControl.Enter":"Enter fullscreen","FullscreenControl.Exit":"Exit fullscreen","GeolocateControl.FindMyLocation":"Find my location","GeolocateControl.LocationNotAvailable":"Location not available","LogoControl.Title":"Mapbox logo","NavigationControl.ResetBearing":"Reset bearing to north","NavigationControl.ZoomIn":"Zoom in","NavigationControl.ZoomOut":"Zoom out","ScaleControl.Feet":"ft","ScaleControl.Meters":"m","ScaleControl.Kilometers":"km","ScaleControl.Miles":"mi","ScaleControl.NauticalMiles":"nm"},rs={center:[0,0],zoom:0,bearing:0,pitch:0,minZoom:-2,maxZoom:22,minPitch:0,maxPitch:60,interactive:!0,scrollZoom:!0,boxZoom:!0,dragRotate:!0,dragPan:!0,keyboard:!0,doubleClickZoom:!0,touchZoomRotate:!0,touchPitch:!0,bearingSnap:7,clickTolerance:3,pitchWithRotate:!0,hash:!1,attributionControl:!0,failIfMajorPerformanceCaveat:!1,preserveDrawingBuffer:!1,trackResize:!0,renderWorldCopies:!0,refreshExpiredTiles:!0,maxTileCacheSize:null,localIdeographFontFamily:"sans-serif",transformRequest:null,fadeDuration:300,crossSourceCollisions:!0};function ns(t){t.parentNode&&t.parentNode.removeChild(t);}const ls={showCompass:!0,showZoom:!0,visualizePitch:!1};class cs{constructor(e,i,o=!1){this._clickTolerance=10,this.element=i,this.mouseRotate=new zo({clickTolerance:e.dragRotate._mouseRotate._clickTolerance}),this.map=e,o&&(this.mousePitch=new Do({clickTolerance:e.dragRotate._mousePitch._clickTolerance})),t.bindAll(["mousedown","mousemove","mouseup","touchstart","touchmove","touchend","reset"],this),r.addEventListener(i,"mousedown",this.mousedown),r.addEventListener(i,"touchstart",this.touchstart,{passive:!1}),r.addEventListener(i,"touchmove",this.touchmove),r.addEventListener(i,"touchend",this.touchend),r.addEventListener(i,"touchcancel",this.reset);}down(t,e){this.mouseRotate.mousedown(t,e),this.mousePitch&&this.mousePitch.mousedown(t,e),r.disableDrag();}move(t,e){const i=this.map,o=this.mouseRotate.mousemoveWindow(t,e);if(o&&o.bearingDelta&&i.setBearing(i.getBearing()+o.bearingDelta),this.mousePitch){const o=this.mousePitch.mousemoveWindow(t,e);o&&o.pitchDelta&&i.setPitch(i.getPitch()+o.pitchDelta);}}off(){const t=this.element;r.removeEventListener(t,"mousedown",this.mousedown),r.removeEventListener(t,"touchstart",this.touchstart,{passive:!1}),r.removeEventListener(t,"touchmove",this.touchmove),r.removeEventListener(t,"touchend",this.touchend),r.removeEventListener(t,"touchcancel",this.reset),this.offTemp();}offTemp(){r.enableDrag(),r.removeEventListener(window,"mousemove",this.mousemove),r.removeEventListener(window,"mouseup",this.mouseup);}mousedown(e){this.down(t.extend({},e,{ctrlKey:!0,preventDefault:()=>e.preventDefault()}),r.mousePos(this.element,e)),r.addEventListener(window,"mousemove",this.mousemove),r.addEventListener(window,"mouseup",this.mouseup);}mousemove(t){this.move(t,r.mousePos(this.element,t));}mouseup(t){this.mouseRotate.mouseupWindow(t),this.mousePitch&&this.mousePitch.mouseupWindow(t),this.offTemp();}touchstart(t){1!==t.targetTouches.length?this.reset():(this._startPos=this._lastPos=r.touchPos(this.element,t.targetTouches)[0],this.down({type:"mousedown",button:0,ctrlKey:!0,preventDefault:()=>t.preventDefault()},this._startPos));}touchmove(t){1!==t.targetTouches.length?this.reset():(this._lastPos=r.touchPos(this.element,t.targetTouches)[0],this.move({preventDefault:()=>t.preventDefault()},this._lastPos));}touchend(t){0===t.targetTouches.length&&this._startPos&&this._lastPos&&this._startPos.dist(this._lastPos)<this._clickTolerance&&this.element.click(),this.reset();}reset(){this.mouseRotate.reset(),this.mousePitch&&this.mousePitch.reset(),delete this._startPos,delete this._lastPos,this.offTemp();}}function hs(e,i,o){if(e=new t.LngLat(e.lng,e.lat),i){const s=new t.LngLat(e.lng-360,e.lat),a=new t.LngLat(e.lng+360,e.lat),r=o.locationPoint(e).distSqr(i);o.locationPoint(s).distSqr(i)<r?e=s:o.locationPoint(a).distSqr(i)<r&&(e=a);}for(;Math.abs(e.lng-o.center.lng)>180;){const t=o.locationPoint(e);if(t.x>=0&&t.y>=0&&t.x<=o.width&&t.y<=o.height)break;e.lng>o.center.lng?e.lng-=360:e.lng+=360;}return e}const us={center:"translate(-50%,-50%)",top:"translate(-50%,0)","top-left":"translate(0,0)","top-right":"translate(-100%,0)",bottom:"translate(-50%,-100%)","bottom-left":"translate(0,-100%)","bottom-right":"translate(-100%,-100%)",left:"translate(0,-50%)",right:"translate(-100%,-50%)"};function ds(t,e,i){const o=t.classList;for(const t in us)o.remove(`maplibregl-${i}-anchor-${t}`,`mapboxgl-${i}-anchor-${t}`);o.add(`maplibregl-${i}-anchor-${e}`,`mapboxgl-${i}-anchor-${e}`);}class _s extends t.Evented{constructor(e,i){if(super(),(e instanceof HTMLElement||i)&&(e=t.extend({element:e},i)),t.bindAll(["_update","_onMove","_onUp","_addDragHandler","_onMapClick","_onKeyPress"],this),this._anchor=e&&e.anchor||"center",this._color=e&&e.color||"#3FB1CE",this._scale=e&&e.scale||1,this._draggable=e&&e.draggable||!1,this._clickTolerance=e&&e.clickTolerance||0,this._isDragging=!1,this._state="inactive",this._rotation=e&&e.rotation||0,this._rotationAlignment=e&&e.rotationAlignment||"auto",this._pitchAlignment=e&&e.pitchAlignment&&"auto"!==e.pitchAlignment?e.pitchAlignment:this._rotationAlignment,e&&e.element)this._element=e.element,this._offset=t.Point.convert(e&&e.offset||[0,0]);else {this._defaultMarker=!0,this._element=r.create("div"),this._element.setAttribute("aria-label","Map marker");const i=r.createNS("http://www.w3.org/2000/svg","svg"),o=41,s=27;i.setAttributeNS(null,"display","block"),i.setAttributeNS(null,"height",`${o}px`),i.setAttributeNS(null,"width",`${s}px`),i.setAttributeNS(null,"viewBox",`0 0 ${s} ${o}`);const a=r.createNS("http://www.w3.org/2000/svg","g");a.setAttributeNS(null,"stroke","none"),a.setAttributeNS(null,"stroke-width","1"),a.setAttributeNS(null,"fill","none"),a.setAttributeNS(null,"fill-rule","evenodd");const n=r.createNS("http://www.w3.org/2000/svg","g");n.setAttributeNS(null,"fill-rule","nonzero");const l=r.createNS("http://www.w3.org/2000/svg","g");l.setAttributeNS(null,"transform","translate(3.0, 29.0)"),l.setAttributeNS(null,"fill","#000000");const c=[{rx:"10.5",ry:"5.25002273"},{rx:"10.5",ry:"5.25002273"},{rx:"9.5",ry:"4.77275007"},{rx:"8.5",ry:"4.29549936"},{rx:"7.5",ry:"3.81822308"},{rx:"6.5",ry:"3.34094679"},{rx:"5.5",ry:"2.86367051"},{rx:"4.5",ry:"2.38636864"}];for(const t of c){const e=r.createNS("http://www.w3.org/2000/svg","ellipse");e.setAttributeNS(null,"opacity","0.04"),e.setAttributeNS(null,"cx","10.5"),e.setAttributeNS(null,"cy","5.80029008"),e.setAttributeNS(null,"rx",t.rx),e.setAttributeNS(null,"ry",t.ry),l.appendChild(e);}const h=r.createNS("http://www.w3.org/2000/svg","g");h.setAttributeNS(null,"fill",this._color);const u=r.createNS("http://www.w3.org/2000/svg","path");u.setAttributeNS(null,"d","M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"),h.appendChild(u);const d=r.createNS("http://www.w3.org/2000/svg","g");d.setAttributeNS(null,"opacity","0.25"),d.setAttributeNS(null,"fill","#000000");const _=r.createNS("http://www.w3.org/2000/svg","path");_.setAttributeNS(null,"d","M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"),d.appendChild(_);const m=r.createNS("http://www.w3.org/2000/svg","g");m.setAttributeNS(null,"transform","translate(6.0, 7.0)"),m.setAttributeNS(null,"fill","#FFFFFF");const p=r.createNS("http://www.w3.org/2000/svg","g");p.setAttributeNS(null,"transform","translate(8.0, 8.0)");const f=r.createNS("http://www.w3.org/2000/svg","circle");f.setAttributeNS(null,"fill","#000000"),f.setAttributeNS(null,"opacity","0.25"),f.setAttributeNS(null,"cx","5.5"),f.setAttributeNS(null,"cy","5.5"),f.setAttributeNS(null,"r","5.4999962");const g=r.createNS("http://www.w3.org/2000/svg","circle");g.setAttributeNS(null,"fill","#FFFFFF"),g.setAttributeNS(null,"cx","5.5"),g.setAttributeNS(null,"cy","5.5"),g.setAttributeNS(null,"r","5.4999962"),p.appendChild(f),p.appendChild(g),n.appendChild(l),n.appendChild(h),n.appendChild(d),n.appendChild(m),n.appendChild(p),i.appendChild(n),i.setAttributeNS(null,"height",o*this._scale+"px"),i.setAttributeNS(null,"width",s*this._scale+"px"),this._element.appendChild(i),this._offset=t.Point.convert(e&&e.offset||[0,-14]);}this._element.classList.add("maplibregl-marker","mapboxgl-marker"),this._element.addEventListener("dragstart",(t=>{t.preventDefault();})),this._element.addEventListener("mousedown",(t=>{t.preventDefault();})),ds(this._element,this._anchor,"marker"),this._popup=null;}addTo(t){return this.remove(),this._map=t,t.getCanvasContainer().appendChild(this._element),t.on("move",this._update),t.on("moveend",this._update),this.setDraggable(this._draggable),this._update(),this._map.on("click",this._onMapClick),this}remove(){return this._map&&(this._map.off("click",this._onMapClick),this._map.off("move",this._update),this._map.off("moveend",this._update),this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler),this._map.off("mouseup",this._onUp),this._map.off("touchend",this._onUp),this._map.off("mousemove",this._onMove),this._map.off("touchmove",this._onMove),delete this._map),r.remove(this._element),this._popup&&this._popup.remove(),this}getLngLat(){return this._lngLat}setLngLat(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._popup&&this._popup.setLngLat(this._lngLat),this._update(),this}getElement(){return this._element}setPopup(t){if(this._popup&&(this._popup.remove(),this._popup=null,this._element.removeEventListener("keypress",this._onKeyPress),this._originalTabIndex||this._element.removeAttribute("tabindex")),t){if(!("offset"in t.options)){const e=38.1,i=13.5,o=Math.sqrt(Math.pow(i,2)/2);t.options.offset=this._defaultMarker?{top:[0,0],"top-left":[0,0],"top-right":[0,0],bottom:[0,-e],"bottom-left":[o,-1*(e-i+o)],"bottom-right":[-o,-1*(e-i+o)],left:[i,-1*(e-i)],right:[-i,-1*(e-i)]}:this._offset;}this._popup=t,this._lngLat&&this._popup.setLngLat(this._lngLat),this._originalTabIndex=this._element.getAttribute("tabindex"),this._originalTabIndex||this._element.setAttribute("tabindex","0"),this._element.addEventListener("keypress",this._onKeyPress);}return this}_onKeyPress(t){const e=t.code,i=t.charCode||t.keyCode;"Space"!==e&&"Enter"!==e&&32!==i&&13!==i||this.togglePopup();}_onMapClick(t){const e=t.originalEvent.target,i=this._element;this._popup&&(e===i||i.contains(e))&&this.togglePopup();}getPopup(){return this._popup}togglePopup(){const t=this._popup;return t?(t.isOpen()?t.remove():t.addTo(this._map),this):this}_update(t){if(!this._map)return;this._map.transform.renderWorldCopies&&(this._lngLat=hs(this._lngLat,this._pos,this._map.transform)),this._pos=this._map.project(this._lngLat)._add(this._offset);let e="";"viewport"===this._rotationAlignment||"auto"===this._rotationAlignment?e=`rotateZ(${this._rotation}deg)`:"map"===this._rotationAlignment&&(e=`rotateZ(${this._rotation-this._map.getBearing()}deg)`);let i="";"viewport"===this._pitchAlignment||"auto"===this._pitchAlignment?i="rotateX(0deg)":"map"===this._pitchAlignment&&(i=`rotateX(${this._map.getPitch()}deg)`),t&&"moveend"!==t.type||(this._pos=this._pos.round()),r.setTransform(this._element,`${us[this._anchor]} translate(${this._pos.x}px, ${this._pos.y}px) ${i} ${e}`);}getOffset(){return this._offset}setOffset(e){return this._offset=t.Point.convert(e),this._update(),this}_onMove(e){if(!this._isDragging){const t=this._clickTolerance||this._map._clickTolerance;this._isDragging=e.point.dist(this._pointerdownPos)>=t;}this._isDragging&&(this._pos=e.point.sub(this._positionDelta),this._lngLat=this._map.unproject(this._pos),this.setLngLat(this._lngLat),this._element.style.pointerEvents="none","pending"===this._state&&(this._state="active",this.fire(new t.Event("dragstart"))),this.fire(new t.Event("drag")));}_onUp(){this._element.style.pointerEvents="auto",this._positionDelta=null,this._pointerdownPos=null,this._isDragging=!1,this._map.off("mousemove",this._onMove),this._map.off("touchmove",this._onMove),"active"===this._state&&this.fire(new t.Event("dragend")),this._state="inactive";}_addDragHandler(t){this._element.contains(t.originalEvent.target)&&(t.preventDefault(),this._positionDelta=t.point.sub(this._pos).add(this._offset),this._pointerdownPos=t.point,this._state="pending",this._map.on("mousemove",this._onMove),this._map.on("touchmove",this._onMove),this._map.once("mouseup",this._onUp),this._map.once("touchend",this._onUp));}setDraggable(t){return this._draggable=!!t,this._map&&(t?(this._map.on("mousedown",this._addDragHandler),this._map.on("touchstart",this._addDragHandler)):(this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler))),this}isDraggable(){return this._draggable}setRotation(t){return this._rotation=t||0,this._update(),this}getRotation(){return this._rotation}setRotationAlignment(t){return this._rotationAlignment=t||"auto",this._update(),this}getRotationAlignment(){return this._rotationAlignment}setPitchAlignment(t){return this._pitchAlignment=t&&"auto"!==t?t:this._rotationAlignment,this._update(),this}getPitchAlignment(){return this._pitchAlignment}}const ms={positionOptions:{enableHighAccuracy:!1,maximumAge:0,timeout:6e3},fitBoundsOptions:{maxZoom:15},trackUserLocation:!1,showAccuracyCircle:!0,showUserLocation:!0};let ps,fs=0,gs=!1;const xs={maxWidth:100,unit:"metric"};function vs(t,e,i){const o=i&&i.maxWidth||100,s=t._container.clientHeight/2,a=t.unproject([0,s]),r=t.unproject([o,s]),n=a.distanceTo(r);if(i&&"imperial"===i.unit){const i=3.2808*n;i>5280?ys(e,o,i/5280,t._getUIString("ScaleControl.Miles")):ys(e,o,i,t._getUIString("ScaleControl.Feet"));}else i&&"nautical"===i.unit?ys(e,o,n/1852,t._getUIString("ScaleControl.NauticalMiles")):n>=1e3?ys(e,o,n/1e3,t._getUIString("ScaleControl.Kilometers")):ys(e,o,n,t._getUIString("ScaleControl.Meters"));}function ys(t,e,i,o){const s=function(t){const e=Math.pow(10,`${Math.floor(t)}`.length-1);let i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:i>=1?1:function(t){const e=Math.pow(10,Math.ceil(-Math.log(t)/Math.LN10));return Math.round(t*e)/e}(i),e*i}(i);t.style.width=e*(s/i)+"px",t.innerHTML=`${s}&nbsp;${o}`;}const bs={closeButton:!0,closeOnClick:!0,focusAfterOpen:!0,className:"",maxWidth:"240px"},ws=["a[href]","[tabindex]:not([tabindex='-1'])","[contenteditable]:not([contenteditable='false'])","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].join(", ");function Ts(e){if(e){if("number"==typeof e){const i=Math.round(Math.sqrt(.5*Math.pow(e,2)));return {center:new t.Point(0,0),top:new t.Point(0,e),"top-left":new t.Point(i,i),"top-right":new t.Point(-i,i),bottom:new t.Point(0,-e),"bottom-left":new t.Point(i,-i),"bottom-right":new t.Point(-i,-i),left:new t.Point(e,0),right:new t.Point(-e,0)}}if(e instanceof t.Point||Array.isArray(e)){const i=t.Point.convert(e);return {center:i,top:i,"top-left":i,"top-right":i,bottom:i,"bottom-left":i,"bottom-right":i,left:i,right:i}}return {center:t.Point.convert(e.center||[0,0]),top:t.Point.convert(e.top||[0,0]),"top-left":t.Point.convert(e["top-left"]||[0,0]),"top-right":t.Point.convert(e["top-right"]||[0,0]),bottom:t.Point.convert(e.bottom||[0,0]),"bottom-left":t.Point.convert(e["bottom-left"]||[0,0]),"bottom-right":t.Point.convert(e["bottom-right"]||[0,0]),left:t.Point.convert(e.left||[0,0]),right:t.Point.convert(e.right||[0,0])}}return Ts(new t.Point(0,0))}const Es={supported:e,setRTLTextPlugin:t.setRTLTextPlugin,getRTLTextPluginStatus:t.getRTLTextPluginStatus,Map:class extends es{constructor(e){if(null!=(e=t.extend({},rs,e)).minZoom&&null!=e.maxZoom&&e.minZoom>e.maxZoom)throw new Error("maxZoom must be greater than or equal to minZoom");if(null!=e.minPitch&&null!=e.maxPitch&&e.minPitch>e.maxPitch)throw new Error("maxPitch must be greater than or equal to minPitch");if(null!=e.minPitch&&e.minPitch<0)throw new Error("minPitch must be greater than or equal to 0");if(null!=e.maxPitch&&e.maxPitch>60)throw new Error("maxPitch must be less than or equal to 60");if(super(new ao(e.minZoom,e.maxZoom,e.minPitch,e.maxPitch,e.renderWorldCopies),{bearingSnap:e.bearingSnap}),this._interactive=e.interactive,this._maxTileCacheSize=e.maxTileCacheSize,this._failIfMajorPerformanceCaveat=e.failIfMajorPerformanceCaveat,this._preserveDrawingBuffer=e.preserveDrawingBuffer,this._antialias=e.antialias,this._trackResize=e.trackResize,this._bearingSnap=e.bearingSnap,this._refreshExpiredTiles=e.refreshExpiredTiles,this._fadeDuration=e.fadeDuration,this._crossSourceCollisions=e.crossSourceCollisions,this._crossFadingFactor=1,this._collectResourceTiming=e.collectResourceTiming,this._renderTaskQueue=new ss,this._controls=[],this._mapId=t.uniqueId(),this._locale=t.extend({},as,e.locale),this._clickTolerance=e.clickTolerance,this._requestManager=new _(e.transformRequest),"string"==typeof e.container){if(this._container=document.getElementById(e.container),!this._container)throw new Error(`Container '${e.container}' not found.`)}else {if(!(e.container instanceof HTMLElement))throw new Error("Invalid type: 'container' must be a String or HTMLElement.");this._container=e.container;}if(e.maxBounds&&this.setMaxBounds(e.maxBounds),t.bindAll(["_onWindowOnline","_onWindowResize","_onMapScroll","_contextLost","_contextRestored"],this),this._setupContainer(),this._setupPainter(),void 0===this.painter)throw new Error("Failed to initialize WebGL.");this.on("move",(()=>this._update(!1))),this.on("moveend",(()=>this._update(!1))),this.on("zoom",(()=>this._update(!0))),"undefined"!=typeof window&&(addEventListener("online",this._onWindowOnline,!1),addEventListener("resize",this._onWindowResize,!1),addEventListener("orientationchange",this._onWindowResize,!1)),this.handlers=new ts(this,e),this._hash=e.hash&&new ro("string"==typeof e.hash&&e.hash||void 0).addTo(this),this._hash&&this._hash._onHashChange()||(this.jumpTo({center:e.center,zoom:e.zoom,bearing:e.bearing,pitch:e.pitch}),e.bounds&&(this.resize(),this.fitBounds(e.bounds,t.extend({},e.fitBoundsOptions,{duration:0})))),this.resize(),this._localIdeographFontFamily=e.localIdeographFontFamily,e.style&&this.setStyle(e.style,{localIdeographFontFamily:e.localIdeographFontFamily}),e.attributionControl&&this.addControl(new is({customAttribution:e.customAttribution})),this.addControl(new os,e.logoPosition),this.on("style.load",(()=>{this.transform.unmodified&&this.jumpTo(this.style.stylesheet);})),this.on("data",(e=>{this._update("style"===e.dataType),this.fire(new t.Event(`${e.dataType}data`,e));})),this.on("dataloading",(e=>{this.fire(new t.Event(`${e.dataType}dataloading`,e));}));}_getMapId(){return this._mapId}addControl(e,i){if(void 0===i&&(i=e.getDefaultPosition?e.getDefaultPosition():"top-right"),!e||!e.onAdd)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.addControl(). Argument must be a control with onAdd and onRemove methods.")));const o=e.onAdd(this);this._controls.push(e);const s=this._controlPositions[i];return -1!==i.indexOf("bottom")?s.insertBefore(o,s.firstChild):s.appendChild(o),this}removeControl(e){if(!e||!e.onRemove)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.removeControl(). Argument must be a control with onAdd and onRemove methods.")));const i=this._controls.indexOf(e);return i>-1&&this._controls.splice(i,1),e.onRemove(this),this}hasControl(t){return this._controls.indexOf(t)>-1}resize(e){const i=this._containerDimensions(),o=i[0],s=i[1];this._resizeCanvas(o,s),this.transform.resize(o,s),this.painter.resize(o,s);const a=!this._moving;return a&&(this.stop(),this.fire(new t.Event("movestart",e)).fire(new t.Event("move",e))),this.fire(new t.Event("resize",e)),a&&this.fire(new t.Event("moveend",e)),this}getBounds(){return this.transform.getBounds()}getMaxBounds(){return this.transform.getMaxBounds()}setMaxBounds(e){return this.transform.setMaxBounds(t.LngLatBounds.convert(e)),this._update()}setMinZoom(t){if((t=null==t?-2:t)>=-2&&t<=this.transform.maxZoom)return this.transform.minZoom=t,this._update(),this.getZoom()<t&&this.setZoom(t),this;throw new Error("minZoom must be between -2 and the current maxZoom, inclusive")}getMinZoom(){return this.transform.minZoom}setMaxZoom(t){if((t=null==t?22:t)>=this.transform.minZoom)return this.transform.maxZoom=t,this._update(),this.getZoom()>t&&this.setZoom(t),this;throw new Error("maxZoom must be greater than the current minZoom")}getMaxZoom(){return this.transform.maxZoom}setMinPitch(t){if((t=null==t?0:t)<0)throw new Error("minPitch must be greater than or equal to 0");if(t>=0&&t<=this.transform.maxPitch)return this.transform.minPitch=t,this._update(),this.getPitch()<t&&this.setPitch(t),this;throw new Error("minPitch must be between 0 and the current maxPitch, inclusive")}getMinPitch(){return this.transform.minPitch}setMaxPitch(t){if((t=null==t?60:t)>60)throw new Error("maxPitch must be less than or equal to 60");if(t>=this.transform.minPitch)return this.transform.maxPitch=t,this._update(),this.getPitch()>t&&this.setPitch(t),this;throw new Error("maxPitch must be greater than the current minPitch")}getMaxPitch(){return this.transform.maxPitch}getRenderWorldCopies(){return this.transform.renderWorldCopies}setRenderWorldCopies(t){return this.transform.renderWorldCopies=t,this._update()}project(e){return this.transform.locationPoint(t.LngLat.convert(e))}unproject(e){return this.transform.pointLocation(t.Point.convert(e))}isMoving(){return this._moving||this.handlers.isMoving()}isZooming(){return this._zooming||this.handlers.isZooming()}isRotating(){return this._rotating||this.handlers.isRotating()}_createDelegatedListener(t,e,i){if("mouseenter"===t||"mouseover"===t){let o=!1;const s=s=>{const a=this.getLayer(e)?this.queryRenderedFeatures(s.point,{layers:[e]}):[];a.length?o||(o=!0,i.call(this,new fo(t,this,s.originalEvent,{features:a}))):o=!1;};return {layer:e,listener:i,delegates:{mousemove:s,mouseout:()=>{o=!1;}}}}if("mouseleave"===t||"mouseout"===t){let o=!1;const s=s=>{(this.getLayer(e)?this.queryRenderedFeatures(s.point,{layers:[e]}):[]).length?o=!0:o&&(o=!1,i.call(this,new fo(t,this,s.originalEvent)));},a=e=>{o&&(o=!1,i.call(this,new fo(t,this,e.originalEvent)));};return {layer:e,listener:i,delegates:{mousemove:s,mouseout:a}}}{const o=t=>{const o=this.getLayer(e)?this.queryRenderedFeatures(t.point,{layers:[e]}):[];o.length&&(t.features=o,i.call(this,t),delete t.features);};return {layer:e,listener:i,delegates:{[t]:o}}}}on(t,e,i){if(void 0===i)return super.on(t,e);const o=this._createDelegatedListener(t,e,i);this._delegatedListeners=this._delegatedListeners||{},this._delegatedListeners[t]=this._delegatedListeners[t]||[],this._delegatedListeners[t].push(o);for(const t in o.delegates)this.on(t,o.delegates[t]);return this}once(t,e,i){if(void 0===i)return super.once(t,e);const o=this._createDelegatedListener(t,e,i);for(const t in o.delegates)this.once(t,o.delegates[t]);return this}off(t,e,i){return void 0===i?super.off(t,e):(this._delegatedListeners&&this._delegatedListeners[t]&&(o=>{const s=this._delegatedListeners[t];for(let t=0;t<s.length;t++){const o=s[t];if(o.layer===e&&o.listener===i){for(const t in o.delegates)this.off(t,o.delegates[t]);return s.splice(t,1),this}}})(),this)}queryRenderedFeatures(e,i){if(!this.style)return [];let o;if(void 0!==i||void 0===e||e instanceof t.Point||Array.isArray(e)||(i=e,e=void 0),i=i||{},(e=e||[[0,0],[this.transform.width,this.transform.height]])instanceof t.Point||"number"==typeof e[0])o=[t.Point.convert(e)];else {const i=t.Point.convert(e[0]),s=t.Point.convert(e[1]);o=[i,new t.Point(s.x,i.y),s,new t.Point(i.x,s.y),i];}return this.style.queryRenderedFeatures(o,i,this.transform)}querySourceFeatures(t,e){return this.style.querySourceFeatures(t,e)}setStyle(e,i){return !1!==(i=t.extend({},{localIdeographFontFamily:this._localIdeographFontFamily},i)).diff&&i.localIdeographFontFamily===this._localIdeographFontFamily&&this.style&&e?(this._diffStyle(e,i),this):(this._localIdeographFontFamily=i.localIdeographFontFamily,this._updateStyle(e,i))}setTransformRequest(t){return this._requestManager.setTransformRequest(t),this}_getUIString(t){const e=this._locale[t];if(null==e)throw new Error(`Missing UI string '${t}'`);return e}_updateStyle(t,e){return this.style&&(this.style.setEventedParent(null),this.style._remove()),t?(this.style=new ne(this,e||{}),this.style.setEventedParent(this,{style:this.style}),"string"==typeof t?this.style.loadURL(t):this.style.loadJSON(t),this):(delete this.style,this)}_lazyInitEmptyStyle(){this.style||(this.style=new ne(this,{}),this.style.setEventedParent(this,{style:this.style}),this.style.loadEmpty());}_diffStyle(e,i){if("string"==typeof e){const o=this._requestManager.transformRequest(e,t.ResourceType.Style);t.getJSON(o,((e,o)=>{e?this.fire(new t.ErrorEvent(e)):o&&this._updateDiff(o,i);}));}else "object"==typeof e&&this._updateDiff(e,i);}_updateDiff(e,i){try{this.style.setState(e)&&this._update(!0);}catch(o){t.warnOnce(`Unable to perform style diff: ${o.message||o.error||o}.  Rebuilding the style from scratch.`),this._updateStyle(e,i);}}getStyle(){if(this.style)return this.style.serialize()}isStyleLoaded(){return this.style?this.style.loaded():t.warnOnce("There is no style added to the map.")}addSource(t,e){return this._lazyInitEmptyStyle(),this.style.addSource(t,e),this._update(!0)}isSourceLoaded(e){const i=this.style&&this.style.sourceCaches[e];if(void 0!==i)return i.loaded();this.fire(new t.ErrorEvent(new Error(`There is no source with ID '${e}'`)));}areTilesLoaded(){const t=this.style&&this.style.sourceCaches;for(const e in t){const i=t[e]._tiles;for(const t in i){const e=i[t];if("loaded"!==e.state&&"errored"!==e.state)return !1}}return !0}addSourceType(t,e,i){return this._lazyInitEmptyStyle(),this.style.addSourceType(t,e,i)}removeSource(t){return this.style.removeSource(t),this._update(!0)}getSource(t){return this.style.getSource(t)}addImage(e,i,{pixelRatio:o=1,sdf:s=!1,stretchX:a,stretchY:r,content:n}={}){if(this._lazyInitEmptyStyle(),i instanceof HTMLImageElement||t.isImageBitmap(i)){const{width:l,height:c,data:h}=t.exported.getImageData(i);this.style.addImage(e,{data:new t.RGBAImage({width:l,height:c},h),pixelRatio:o,stretchX:a,stretchY:r,content:n,sdf:s,version:0});}else {if(void 0===i.width||void 0===i.height)return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.addImage(). The second argument must be an `HTMLImageElement`, `ImageData`, `ImageBitmap`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));{const{width:l,height:c,data:h}=i,u=i;this.style.addImage(e,{data:new t.RGBAImage({width:l,height:c},new Uint8Array(h)),pixelRatio:o,stretchX:a,stretchY:r,content:n,sdf:s,version:0,userImage:u}),u.onAdd&&u.onAdd(this,e);}}}updateImage(e,i){const o=this.style.getImage(e);if(!o)return this.fire(new t.ErrorEvent(new Error("The map has no image with that id. If you are adding a new image use `map.addImage(...)` instead.")));const s=i instanceof HTMLImageElement||t.isImageBitmap(i)?t.exported.getImageData(i):i,{width:a,height:r,data:n}=s;if(void 0===a||void 0===r)return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.updateImage(). The second argument must be an `HTMLImageElement`, `ImageData`, `ImageBitmap`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));if(a!==o.data.width||r!==o.data.height)return this.fire(new t.ErrorEvent(new Error("The width and height of the updated image must be that same as the previous version of the image")));const l=!(i instanceof HTMLImageElement||t.isImageBitmap(i));o.data.replace(n,l),this.style.updateImage(e,o);}hasImage(e){return e?!!this.style.getImage(e):(this.fire(new t.ErrorEvent(new Error("Missing required image id"))),!1)}removeImage(t){this.style.removeImage(t);}loadImage(e,i){t.getImage(this._requestManager.transformRequest(e,t.ResourceType.Image),i);}listImages(){return this.style.listImages()}addLayer(t,e){return this._lazyInitEmptyStyle(),this.style.addLayer(t,e),this._update(!0)}moveLayer(t,e){return this.style.moveLayer(t,e),this._update(!0)}removeLayer(t){return this.style.removeLayer(t),this._update(!0)}getLayer(t){return this.style.getLayer(t)}setLayerZoomRange(t,e,i){return this.style.setLayerZoomRange(t,e,i),this._update(!0)}setFilter(t,e,i={}){return this.style.setFilter(t,e,i),this._update(!0)}getFilter(t){return this.style.getFilter(t)}setPaintProperty(t,e,i,o={}){return this.style.setPaintProperty(t,e,i,o),this._update(!0)}getPaintProperty(t,e){return this.style.getPaintProperty(t,e)}setLayoutProperty(t,e,i,o={}){return this.style.setLayoutProperty(t,e,i,o),this._update(!0)}getLayoutProperty(t,e){return this.style.getLayoutProperty(t,e)}setLight(t,e={}){return this._lazyInitEmptyStyle(),this.style.setLight(t,e),this._update(!0)}getLight(){return this.style.getLight()}setFeatureState(t,e){return this.style.setFeatureState(t,e),this._update()}removeFeatureState(t,e){return this.style.removeFeatureState(t,e),this._update()}getFeatureState(t){return this.style.getFeatureState(t)}getContainer(){return this._container}getCanvasContainer(){return this._canvasContainer}getCanvas(){return this._canvas}_containerDimensions(){let t=0,e=0;return this._container&&(t=this._container.clientWidth||400,e=this._container.clientHeight||300),[t,e]}_setupContainer(){const t=this._container;t.classList.add("maplibregl-map","mapboxgl-map");const e=this._canvasContainer=r.create("div","maplibregl-canvas-container mapboxgl-canvas-container",t);this._interactive&&e.classList.add("maplibregl-interactive","mapboxgl-interactive"),this._canvas=r.create("canvas","maplibregl-canvas mapboxgl-canvas",e),this._canvas.addEventListener("webglcontextlost",this._contextLost,!1),this._canvas.addEventListener("webglcontextrestored",this._contextRestored,!1),this._canvas.setAttribute("tabindex","0"),this._canvas.setAttribute("aria-label","Map"),this._canvas.setAttribute("role","region");const i=this._containerDimensions();this._resizeCanvas(i[0],i[1]);const o=this._controlContainer=r.create("div","maplibregl-control-container mapboxgl-control-container",t),s=this._controlPositions={};["top-left","top-right","bottom-left","bottom-right"].forEach((t=>{s[t]=r.create("div",`maplibregl-ctrl-${t} mapboxgl-ctrl-${t}`,o);})),this._container.addEventListener("scroll",this._onMapScroll,!1);}_resizeCanvas(t,e){const i=devicePixelRatio||1;this._canvas.width=i*t,this._canvas.height=i*e,this._canvas.style.width=`${t}px`,this._canvas.style.height=`${e}px`;}_setupPainter(){const i=t.extend({},e.webGLContextAttributes,{failIfMajorPerformanceCaveat:this._failIfMajorPerformanceCaveat,preserveDrawingBuffer:this._preserveDrawingBuffer,antialias:this._antialias||!1}),o=this._canvas.getContext("webgl",i)||this._canvas.getContext("experimental-webgl",i);o?(this.painter=new eo(o,this.transform),t.exported$1.testSupport(o)):this.fire(new t.ErrorEvent(new Error("Failed to initialize WebGL")));}_contextLost(e){e.preventDefault(),this._frame&&(this._frame.cancel(),this._frame=null),this.fire(new t.Event("webglcontextlost",{originalEvent:e}));}_contextRestored(e){this._setupPainter(),this.resize(),this._update(),this.fire(new t.Event("webglcontextrestored",{originalEvent:e}));}_onMapScroll(t){if(t.target===this._container)return this._container.scrollTop=0,this._container.scrollLeft=0,!1}loaded(){return !this._styleDirty&&!this._sourcesDirty&&!!this.style&&this.style.loaded()}_update(t){return this.style?(this._styleDirty=this._styleDirty||t,this._sourcesDirty=!0,this.triggerRepaint(),this):this}_requestRenderFrame(t){return this._update(),this._renderTaskQueue.add(t)}_cancelRenderFrame(t){this._renderTaskQueue.remove(t);}_render(e){let i,o=0;const s=this.painter.context.extTimerQuery;if(this.listens("gpu-timing-frame")&&(i=s.createQueryEXT(),s.beginQueryEXT(s.TIME_ELAPSED_EXT,i),o=t.exported.now()),this.painter.context.setDirty(),this.painter.setBaseState(),this._renderTaskQueue.run(e),this._removed)return;let a=!1;if(this.style&&this._styleDirty){this._styleDirty=!1;const e=this.transform.zoom,i=t.exported.now();this.style.zoomHistory.update(e,i);const o=new t.EvaluationParameters(e,{now:i,fadeDuration:this._fadeDuration,zoomHistory:this.style.zoomHistory,transition:this.style.getTransition()}),s=o.crossFadingFactor();1===s&&s===this._crossFadingFactor||(a=!0,this._crossFadingFactor=s),this.style.update(o);}if(this.style&&this._sourcesDirty&&(this._sourcesDirty=!1,this.style._updateSources(this.transform)),this._placementDirty=this.style&&this.style._updatePlacement(this.painter.transform,this.showCollisionBoxes,this._fadeDuration,this._crossSourceCollisions),this.painter.render(this.style,{showTileBoundaries:this.showTileBoundaries,showOverdrawInspector:this._showOverdrawInspector,rotating:this.isRotating(),zooming:this.isZooming(),moving:this.isMoving(),fadeDuration:this._fadeDuration,showPadding:this.showPadding,gpuTiming:!!this.listens("gpu-timing-layer")}),this.fire(new t.Event("render")),this.loaded()&&!this._loaded&&(this._loaded=!0,this.fire(new t.Event("load"))),this.style&&(this.style.hasTransitions()||a)&&(this._styleDirty=!0),this.style&&!this._placementDirty&&this.style._releaseSymbolFadeTiles(),this.listens("gpu-timing-frame")){const e=t.exported.now()-o;s.endQueryEXT(s.TIME_ELAPSED_EXT,i),setTimeout((()=>{const o=s.getQueryObjectEXT(i,s.QUERY_RESULT_EXT)/1e6;s.deleteQueryEXT(i),this.fire(new t.Event("gpu-timing-frame",{cpuTime:e,gpuTime:o}));}),50);}if(this.listens("gpu-timing-layer")){const e=this.painter.collectGpuTimers();setTimeout((()=>{const i=this.painter.queryGpuTimers(e);this.fire(new t.Event("gpu-timing-layer",{layerTimes:i}));}),50);}const r=this._sourcesDirty||this._styleDirty||this._placementDirty;return r||this._repaint?this.triggerRepaint():!this.isMoving()&&this.loaded()&&this.fire(new t.Event("idle")),!this._loaded||this._fullyLoaded||r||(this._fullyLoaded=!0),this}redraw(){return this.style&&(this._frame&&(this._frame.cancel(),this._frame=null),this._render(0)),this}remove(){this._hash&&this._hash.remove();for(const t of this._controls)t.onRemove(this);this._controls=[],this._frame&&(this._frame.cancel(),this._frame=null),this._renderTaskQueue.clear(),this.painter.destroy(),this.handlers.destroy(),delete this.handlers,this.setStyle(null),"undefined"!=typeof window&&(removeEventListener("resize",this._onWindowResize,!1),removeEventListener("orientationchange",this._onWindowResize,!1),removeEventListener("online",this._onWindowOnline,!1));const e=this.painter.context.gl.getExtension("WEBGL_lose_context");e&&e.loseContext(),ns(this._canvasContainer),ns(this._controlContainer),this._container.classList.remove("maplibregl-map","mapboxgl-map"),this._removed=!0,this.fire(new t.Event("remove"));}triggerRepaint(){this.style&&!this._frame&&(this._frame=t.exported.frame((t=>{this._frame=null,this._render(t);})));}_onWindowOnline(){this._update();}_onWindowResize(t){this._trackResize&&this.resize({originalEvent:t})._update();}get showTileBoundaries(){return !!this._showTileBoundaries}set showTileBoundaries(t){this._showTileBoundaries!==t&&(this._showTileBoundaries=t,this._update());}get showPadding(){return !!this._showPadding}set showPadding(t){this._showPadding!==t&&(this._showPadding=t,this._update());}get showCollisionBoxes(){return !!this._showCollisionBoxes}set showCollisionBoxes(t){this._showCollisionBoxes!==t&&(this._showCollisionBoxes=t,t?this.style._generateCollisionBoxes():this._update());}get showOverdrawInspector(){return !!this._showOverdrawInspector}set showOverdrawInspector(t){this._showOverdrawInspector!==t&&(this._showOverdrawInspector=t,this._update());}get repaint(){return !!this._repaint}set repaint(t){this._repaint!==t&&(this._repaint=t,this.triggerRepaint());}get vertices(){return !!this._vertices}set vertices(t){this._vertices=t,this._update();}_setCacheLimits(e,i){t.setCacheLimits(e,i);}},NavigationControl:class{constructor(e){this.options=t.extend({},ls,e),this._container=r.create("div","maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group"),this._container.addEventListener("contextmenu",(t=>t.preventDefault())),this.options.showZoom&&(t.bindAll(["_setButtonTitle","_updateZoomButtons"],this),this._zoomInButton=this._createButton("maplibregl-ctrl-zoom-in mapboxgl-ctrl-zoom-in",(t=>this._map.zoomIn({},{originalEvent:t}))),r.create("span","maplibregl-ctrl-icon mapboxgl-ctrl-icon",this._zoomInButton).setAttribute("aria-hidden","true"),this._zoomOutButton=this._createButton("maplibregl-ctrl-zoom-out mapboxgl-ctrl-zoom-out",(t=>this._map.zoomOut({},{originalEvent:t}))),r.create("span","maplibregl-ctrl-icon mapboxgl-ctrl-icon",this._zoomOutButton).setAttribute("aria-hidden","true")),this.options.showCompass&&(t.bindAll(["_rotateCompassArrow"],this),this._compass=this._createButton("maplibregl-ctrl-compass mapboxgl-ctrl-compass",(t=>{this.options.visualizePitch?this._map.resetNorthPitch({},{originalEvent:t}):this._map.resetNorth({},{originalEvent:t});})),this._compassIcon=r.create("span","maplibregl-ctrl-icon mapboxgl-ctrl-icon",this._compass),this._compassIcon.setAttribute("aria-hidden","true"));}_updateZoomButtons(){const t=this._map.getZoom(),e=t===this._map.getMaxZoom(),i=t===this._map.getMinZoom();this._zoomInButton.disabled=e,this._zoomOutButton.disabled=i,this._zoomInButton.setAttribute("aria-disabled",e.toString()),this._zoomOutButton.setAttribute("aria-disabled",i.toString());}_rotateCompassArrow(){const t=this.options.visualizePitch?`scale(${1/Math.pow(Math.cos(this._map.transform.pitch*(Math.PI/180)),.5)}) rotateX(${this._map.transform.pitch}deg) rotateZ(${this._map.transform.angle*(180/Math.PI)}deg)`:`rotate(${this._map.transform.angle*(180/Math.PI)}deg)`;this._compassIcon.style.transform=t;}onAdd(t){return this._map=t,this.options.showZoom&&(this._setButtonTitle(this._zoomInButton,"ZoomIn"),this._setButtonTitle(this._zoomOutButton,"ZoomOut"),this._map.on("zoom",this._updateZoomButtons),this._updateZoomButtons()),this.options.showCompass&&(this._setButtonTitle(this._compass,"ResetBearing"),this.options.visualizePitch&&this._map.on("pitch",this._rotateCompassArrow),this._map.on("rotate",this._rotateCompassArrow),this._rotateCompassArrow(),this._handler=new cs(this._map,this._compass,this.options.visualizePitch)),this._container}onRemove(){r.remove(this._container),this.options.showZoom&&this._map.off("zoom",this._updateZoomButtons),this.options.showCompass&&(this.options.visualizePitch&&this._map.off("pitch",this._rotateCompassArrow),this._map.off("rotate",this._rotateCompassArrow),this._handler.off(),delete this._handler),delete this._map;}_createButton(t,e){const i=r.create("button",t,this._container);return i.type="button",i.addEventListener("click",e),i}_setButtonTitle(t,e){const i=this._map._getUIString(`NavigationControl.${e}`);t.title=i,t.setAttribute("aria-label",i);}},GeolocateControl:class extends t.Evented{constructor(e){super(),this.options=t.extend({},ms,e),t.bindAll(["_onSuccess","_onError","_onZoom","_finish","_setupUI","_updateCamera","_updateMarker"],this);}onAdd(t){var e;return this._map=t,this._container=r.create("div","maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group"),e=this._setupUI,void 0!==ps?e(ps):void 0!==window.navigator.permissions?window.navigator.permissions.query({name:"geolocation"}).then((t=>{ps="denied"!==t.state,e(ps);})):(ps=!!window.navigator.geolocation,e(ps)),this._container}onRemove(){void 0!==this._geolocationWatchID&&(window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0),this.options.showUserLocation&&this._userLocationDotMarker&&this._userLocationDotMarker.remove(),this.options.showAccuracyCircle&&this._accuracyCircleMarker&&this._accuracyCircleMarker.remove(),r.remove(this._container),this._map.off("zoom",this._onZoom),this._map=void 0,fs=0,gs=!1;}_isOutOfMapMaxBounds(t){const e=this._map.getMaxBounds(),i=t.coords;return e&&(i.longitude<e.getWest()||i.longitude>e.getEast()||i.latitude<e.getSouth()||i.latitude>e.getNorth())}_setErrorState(){switch(this._watchState){case"WAITING_ACTIVE":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-active-error","mapboxgl-ctrl-geolocate-active-error");break;case"ACTIVE_LOCK":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-active-error","mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting");break;case"BACKGROUND":this._watchState="BACKGROUND_ERROR",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-background-error","mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting");}}_onSuccess(e){if(this._map){if(this._isOutOfMapMaxBounds(e))return this._setErrorState(),this.fire(new t.Event("outofmaxbounds",e)),this._updateMarker(),void this._finish();if(this.options.trackUserLocation)switch(this._lastKnownPosition=e,this._watchState){case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active-error","mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active");break;case"BACKGROUND":case"BACKGROUND_ERROR":this._watchState="BACKGROUND",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background-error","mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background");}this.options.showUserLocation&&"OFF"!==this._watchState&&this._updateMarker(e),this.options.trackUserLocation&&"ACTIVE_LOCK"!==this._watchState||this._updateCamera(e),this.options.showUserLocation&&this._dotElement.classList.remove("maplibregl-user-location-dot-stale","mapboxgl-user-location-dot-stale"),this.fire(new t.Event("geolocate",e)),this._finish();}}_updateCamera(e){const i=new t.LngLat(e.coords.longitude,e.coords.latitude),o=e.coords.accuracy,s=this._map.getBearing(),a=t.extend({bearing:s},this.options.fitBoundsOptions);this._map.fitBounds(i.toBounds(o),a,{geolocateSource:!0});}_updateMarker(e){if(e){const i=new t.LngLat(e.coords.longitude,e.coords.latitude);this._accuracyCircleMarker.setLngLat(i).addTo(this._map),this._userLocationDotMarker.setLngLat(i).addTo(this._map),this._accuracy=e.coords.accuracy,this.options.showUserLocation&&this.options.showAccuracyCircle&&this._updateCircleRadius();}else this._userLocationDotMarker.remove(),this._accuracyCircleMarker.remove();}_updateCircleRadius(){const t=this._map._container.clientHeight/2,e=this._map.unproject([0,t]),i=this._map.unproject([1,t]),o=e.distanceTo(i),s=Math.ceil(2*this._accuracy/o);this._circleElement.style.width=`${s}px`,this._circleElement.style.height=`${s}px`;}_onZoom(){this.options.showUserLocation&&this.options.showAccuracyCircle&&this._updateCircleRadius();}_onError(e){if(this._map){if(this.options.trackUserLocation)if(1===e.code){this._watchState="OFF",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active-error","mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background-error","mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.disabled=!0;const t=this._map._getUIString("GeolocateControl.LocationNotAvailable");this._geolocateButton.title=t,this._geolocateButton.setAttribute("aria-label",t),void 0!==this._geolocationWatchID&&this._clearWatch();}else {if(3===e.code&&gs)return;this._setErrorState();}"OFF"!==this._watchState&&this.options.showUserLocation&&this._dotElement.classList.add("maplibregl-user-location-dot-stale","mapboxgl-user-location-dot-stale"),this.fire(new t.Event("error",e)),this._finish();}}_finish(){this._timeoutId&&clearTimeout(this._timeoutId),this._timeoutId=void 0;}_setupUI(e){if(this._container.addEventListener("contextmenu",(t=>t.preventDefault())),this._geolocateButton=r.create("button","maplibregl-ctrl-geolocate mapboxgl-ctrl-geolocate",this._container),r.create("span","maplibregl-ctrl-icon mapboxgl-ctrl-icon",this._geolocateButton).setAttribute("aria-hidden","true"),this._geolocateButton.type="button",!1===e){t.warnOnce("Geolocation support is not available so the GeolocateControl will be disabled.");const e=this._map._getUIString("GeolocateControl.LocationNotAvailable");this._geolocateButton.disabled=!0,this._geolocateButton.title=e,this._geolocateButton.setAttribute("aria-label",e);}else {const t=this._map._getUIString("GeolocateControl.FindMyLocation");this._geolocateButton.title=t,this._geolocateButton.setAttribute("aria-label",t);}this.options.trackUserLocation&&(this._geolocateButton.setAttribute("aria-pressed","false"),this._watchState="OFF"),this.options.showUserLocation&&(this._dotElement=r.create("div","maplibregl-user-location-dot mapboxgl-user-location-dot"),this._userLocationDotMarker=new _s(this._dotElement),this._circleElement=r.create("div","maplibregl-user-location-accuracy-circle mapboxgl-user-location-accuracy-circle"),this._accuracyCircleMarker=new _s({element:this._circleElement,pitchAlignment:"map"}),this.options.trackUserLocation&&(this._watchState="OFF"),this._map.on("zoom",this._onZoom)),this._geolocateButton.addEventListener("click",this.trigger.bind(this)),this._setup=!0,this.options.trackUserLocation&&this._map.on("movestart",(e=>{e.geolocateSource||"ACTIVE_LOCK"!==this._watchState||e.originalEvent&&"resize"===e.originalEvent.type||(this._watchState="BACKGROUND",this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active"),this.fire(new t.Event("trackuserlocationend")));}));}trigger(){if(!this._setup)return t.warnOnce("Geolocate control triggered before added to a map"),!1;if(this.options.trackUserLocation){switch(this._watchState){case"OFF":this._watchState="WAITING_ACTIVE",this.fire(new t.Event("trackuserlocationstart"));break;case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":case"BACKGROUND_ERROR":fs--,gs=!1,this._watchState="OFF",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-active-error","mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background-error","mapboxgl-ctrl-geolocate-background-error"),this.fire(new t.Event("trackuserlocationend"));break;case"BACKGROUND":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-background","mapboxgl-ctrl-geolocate-background"),this._lastKnownPosition&&this._updateCamera(this._lastKnownPosition),this.fire(new t.Event("trackuserlocationstart"));}switch(this._watchState){case"WAITING_ACTIVE":this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active");break;case"ACTIVE_LOCK":this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-active","mapboxgl-ctrl-geolocate-active");}if("OFF"===this._watchState&&void 0!==this._geolocationWatchID)this._clearWatch();else if(void 0===this._geolocationWatchID){let t;this._geolocateButton.classList.add("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","true"),fs++,fs>1?(t={maximumAge:6e5,timeout:0},gs=!0):(t=this.options.positionOptions,gs=!1),this._geolocationWatchID=window.navigator.geolocation.watchPosition(this._onSuccess,this._onError,t);}}else window.navigator.geolocation.getCurrentPosition(this._onSuccess,this._onError,this.options.positionOptions),this._timeoutId=setTimeout(this._finish,1e4);return !0}_clearWatch(){window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0,this._geolocateButton.classList.remove("maplibregl-ctrl-geolocate-waiting","mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","false"),this.options.showUserLocation&&this._updateMarker(null);}},AttributionControl:is,ScaleControl:class{constructor(e){this.options=t.extend({},xs,e),t.bindAll(["_onMove","setUnit"],this);}getDefaultPosition(){return "bottom-left"}_onMove(){vs(this._map,this._container,this.options);}onAdd(t){return this._map=t,this._container=r.create("div","maplibregl-ctrl maplibregl-ctrl-scale mapboxgl-ctrl mapboxgl-ctrl-scale",t.getContainer()),this._map.on("move",this._onMove),this._onMove(),this._container}onRemove(){r.remove(this._container),this._map.off("move",this._onMove),this._map=void 0;}setUnit(t){this.options.unit=t,vs(this._map,this._container,this.options);}},FullscreenControl:class{constructor(e){this._fullscreen=!1,e&&e.container&&(e.container instanceof HTMLElement?this._container=e.container:t.warnOnce("Full screen control 'container' must be a DOM element.")),t.bindAll(["_onClickFullscreen","_changeIcon"],this),"onfullscreenchange"in document?this._fullscreenchange="fullscreenchange":"onmozfullscreenchange"in document?this._fullscreenchange="mozfullscreenchange":"onwebkitfullscreenchange"in document?this._fullscreenchange="webkitfullscreenchange":"onmsfullscreenchange"in document&&(this._fullscreenchange="MSFullscreenChange");}onAdd(e){return this._map=e,this._container||(this._container=this._map.getContainer()),this._controlContainer=r.create("div","maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group"),this._checkFullscreenSupport()?this._setupUI():(this._controlContainer.style.display="none",t.warnOnce("This device does not support fullscreen mode.")),this._controlContainer}onRemove(){r.remove(this._controlContainer),this._map=null,window.document.removeEventListener(this._fullscreenchange,this._changeIcon);}_checkFullscreenSupport(){return !!(document.fullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||document.webkitFullscreenEnabled)}_setupUI(){const t=this._fullscreenButton=r.create("button","maplibregl-ctrl-fullscreen mapboxgl-ctrl-fullscreen",this._controlContainer);r.create("span","maplibregl-ctrl-icon mapboxgl-ctrl-icon",t).setAttribute("aria-hidden","true"),t.type="button",this._updateTitle(),this._fullscreenButton.addEventListener("click",this._onClickFullscreen),window.document.addEventListener(this._fullscreenchange,this._changeIcon);}_updateTitle(){const t=this._getTitle();this._fullscreenButton.setAttribute("aria-label",t),this._fullscreenButton.title=t;}_getTitle(){return this._map._getUIString(this._isFullscreen()?"FullscreenControl.Exit":"FullscreenControl.Enter")}_isFullscreen(){return this._fullscreen}_changeIcon(){(window.document.fullscreenElement||window.document.mozFullScreenElement||window.document.webkitFullscreenElement||window.document.msFullscreenElement)===this._container!==this._fullscreen&&(this._fullscreen=!this._fullscreen,this._fullscreenButton.classList.toggle("maplibregl-ctrl-shrink"),this._fullscreenButton.classList.toggle("mapboxgl-ctrl-shrink"),this._fullscreenButton.classList.toggle("maplibregl-ctrl-fullscreen"),this._fullscreenButton.classList.toggle("mapboxgl-ctrl-fullscreen"),this._updateTitle());}_onClickFullscreen(){this._isFullscreen()?window.document.exitFullscreen?window.document.exitFullscreen():window.document.mozCancelFullScreen?window.document.mozCancelFullScreen():window.document.msExitFullscreen?window.document.msExitFullscreen():window.document.webkitCancelFullScreen&&window.document.webkitCancelFullScreen():this._container.requestFullscreen?this._container.requestFullscreen():this._container.mozRequestFullScreen?this._container.mozRequestFullScreen():this._container.msRequestFullscreen?this._container.msRequestFullscreen():this._container.webkitRequestFullscreen&&this._container.webkitRequestFullscreen();}},Popup:class extends t.Evented{constructor(e){super(),this.options=t.extend(Object.create(bs),e),t.bindAll(["_update","_onClose","remove","_onMouseMove","_onMouseUp","_onDrag"],this);}addTo(e){return this._map&&this.remove(),this._map=e,this.options.closeOnClick&&this._map.on("click",this._onClose),this.options.closeOnMove&&this._map.on("move",this._onClose),this._map.on("remove",this.remove),this._update(),this._focusFirstElement(),this._trackPointer?(this._map.on("mousemove",this._onMouseMove),this._map.on("mouseup",this._onMouseUp),this._container&&this._container.classList.add("maplibregl-popup-track-pointer","mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.add("maplibregl-track-pointer","mapboxgl-track-pointer")):this._map.on("move",this._update),this.fire(new t.Event("open")),this}isOpen(){return !!this._map}remove(){return this._content&&r.remove(this._content),this._container&&(r.remove(this._container),delete this._container),this._map&&(this._map.off("move",this._update),this._map.off("move",this._onClose),this._map.off("click",this._onClose),this._map.off("remove",this.remove),this._map.off("mousemove",this._onMouseMove),this._map.off("mouseup",this._onMouseUp),this._map.off("drag",this._onDrag),delete this._map),this.fire(new t.Event("close")),this}getLngLat(){return this._lngLat}setLngLat(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._trackPointer=!1,this._update(),this._map&&(this._map.on("move",this._update),this._map.off("mousemove",this._onMouseMove),this._container&&this._container.classList.remove("maplibregl-popup-track-pointer","mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.remove("maplibregl-track-pointer","mapboxgl-track-pointer")),this}trackPointer(){return this._trackPointer=!0,this._pos=null,this._update(),this._map&&(this._map.off("move",this._update),this._map.on("mousemove",this._onMouseMove),this._map.on("drag",this._onDrag),this._container&&this._container.classList.add("maplibregl-popup-track-pointer","mapboxgl-popup-track-pointer"),this._map._canvasContainer.classList.add("maplibregl-track-pointer","mapboxgl-track-pointer")),this}getElement(){return this._container}setText(t){return this.setDOMContent(document.createTextNode(t))}setHTML(t){const e=document.createDocumentFragment(),i=document.createElement("body");let o;for(i.innerHTML=t;o=i.firstChild,o;)e.appendChild(o);return this.setDOMContent(e)}getMaxWidth(){return this._container&&this._container.style.maxWidth}setMaxWidth(t){return this.options.maxWidth=t,this._update(),this}setDOMContent(t){if(this._content)for(;this._content.hasChildNodes();)this._content.firstChild&&this._content.removeChild(this._content.firstChild);else this._content=r.create("div","maplibregl-popup-content mapboxgl-popup-content",this._container);return this._content.appendChild(t),this._createCloseButton(),this._update(),this._focusFirstElement(),this}addClassName(t){this._container&&this._container.classList.add(t);}removeClassName(t){this._container&&this._container.classList.remove(t);}setOffset(t){return this.options.offset=t,this._update(),this}toggleClassName(t){if(this._container)return this._container.classList.toggle(t)}_createCloseButton(){this.options.closeButton&&(this._closeButton=r.create("button","maplibregl-popup-close-button mapboxgl-popup-close-button",this._content),this._closeButton.type="button",this._closeButton.setAttribute("aria-label","Close popup"),this._closeButton.innerHTML="&#215;",this._closeButton.addEventListener("click",this._onClose));}_onMouseUp(t){this._update(t.point);}_onMouseMove(t){this._update(t.point);}_onDrag(t){this._update(t.point);}_update(t){if(!this._map||!this._lngLat&&!this._trackPointer||!this._content)return;if(this._container||(this._container=r.create("div","maplibregl-popup mapboxgl-popup",this._map.getContainer()),this._tip=r.create("div","maplibregl-popup-tip mapboxgl-popup-tip",this._container),this._container.appendChild(this._content),this.options.className&&this.options.className.split(" ").forEach((t=>this._container.classList.add(t))),this._trackPointer&&this._container.classList.add("maplibregl-popup-track-pointer","mapboxgl-popup-track-pointer")),this.options.maxWidth&&this._container.style.maxWidth!==this.options.maxWidth&&(this._container.style.maxWidth=this.options.maxWidth),this._map.transform.renderWorldCopies&&!this._trackPointer&&(this._lngLat=hs(this._lngLat,this._pos,this._map.transform)),this._trackPointer&&!t)return;const e=this._pos=this._trackPointer&&t?t:this._map.project(this._lngLat);let i=this.options.anchor;const o=Ts(this.options.offset);if(!i){const t=this._container.offsetWidth,s=this._container.offsetHeight;let a;a=e.y+o.bottom.y<s?["top"]:e.y>this._map.transform.height-s?["bottom"]:[],e.x<t/2?a.push("left"):e.x>this._map.transform.width-t/2&&a.push("right"),i=0===a.length?"bottom":a.join("-");}const s=e.add(o[i]).round();r.setTransform(this._container,`${us[i]} translate(${s.x}px,${s.y}px)`),ds(this._container,i,"popup");}_focusFirstElement(){if(!this.options.focusAfterOpen||!this._container)return;const t=this._container.querySelector(ws);t&&t.focus();}_onClose(){this.remove();}},Marker:_s,Style:ne,LngLat:t.LngLat,LngLatBounds:t.LngLatBounds,Point:t.Point,MercatorCoordinate:t.MercatorCoordinate,Evented:t.Evented,config:t.config,prewarm:function(){et().acquire(Y);},clearPrewarmedResources:function(){const t=tt;t&&(t.isPreloaded()&&1===t.numActive()?(t.release(Y),tt=null):console.warn("Could not clear WebWorkers since there are active Map instances that still reference it. The pre-warmed WebWorker pool can only be cleared when all map instances have been removed with map.remove()"));},get workerCount(){return J.workerCount},set workerCount(t){J.workerCount=t;},get maxParallelImageRequests(){return t.config.MAX_PARALLEL_IMAGE_REQUESTS},set maxParallelImageRequests(e){t.config.MAX_PARALLEL_IMAGE_REQUESTS=e;},clearStorage(e){t.clearTileCache(e);},workerUrl:"",addProtocol(e,i){t.config.REGISTERED_PROTOCOLS[e]=i;},removeProtocol(e){delete t.config.REGISTERED_PROTOCOLS[e];}};return Es}));

//

var maplibregl$1 = maplibregl;

return maplibregl$1;

})));

});

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

var _excluded$3 = ["accessToken"];

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


var props$5 = {
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

var events$4 = ['loading', 'results', 'result', 'error'];
var script$7 = {
  name: 'MapboxGeocoder',
  mixins: [injectMap()],
  props: props$5,
  mounted: function mounted() {
    var _this$$props = this.$props,
        accessToken = _this$$props.accessToken,
        $props = _objectWithoutProperties(_this$$props, _excluded$3); // Delete the `reverseMode` property if we are not reverse geocoding as it is not supported by
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

    bindEvents(this, this.control, events$4);
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
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var regenerator = runtime_1;

var script$6 = {
  name: 'MapboxImage',
  mixins: [injectMap()],
  props: {
    /**
     * The ID of the image
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage
     * @type {String}
     */
    id: {
      type: String,
      required: true
    },

    /**
     * The image as String, an HTMLImageElement, ImageData, or object with
     * width, height, and data properties with the same format as ImageData.
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage
     * @type {String|HTMLImageElement|ImageData|Object}
     */
    src: {
      type: [String, HTMLImageElement, ImageData, Object],
      required: true
    },

    /**
     * The options object for the image to add
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage
     * @type {Object}
     */
    options: {
      type: Object,
      default: function _default() {
        return {
          pixelRatio: 1,
          sdf: false
        };
      }
    }
  },
  data: function data() {
    return {
      isReady: false
    };
  },
  watch: {
    src: {
      handler: function handler(newValue) {
        this.map.updateImage(this.id, newValue);
      },
      deep: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var id, src, options, image;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _this.id, src = _this.src, options = _this.options; // If source is not a string, we don't need to load the image and we can
              // add it to the map directly.

              if (!(typeof src !== 'string')) {
                _context.next = 6;
                break;
              }

              _this.map.addImage(id, src, options);

              _this.$emit('add', {
                id: id,
                src: src,
                options: options
              });

              _this.isReady = true;
              return _context.abrupt("return");

            case 6:
              _context.next = 8;
              return _this.loadImage(src);

            case 8:
              image = _context.sent;

              _this.map.addImage(id, image, options);

              _this.$emit('add', {
                id: id,
                src: image,
                options: options
              });

              _this.isReady = true;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  destroyed: function destroyed() {
    if (this.map.hasImage(this.id)) {
      this.map.removeImage(this.id);
    }
  },
  methods: {
    /**
     * Load the given image with the Mapbox `loadImage` method
     *
     * @param  {String}  src The source URL for the image
     * @return {Promise}     A promise which will resolve on load
     */
    loadImage: function loadImage(src) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.map.loadImage(src, function (err, data) {
                    if (err) {
                      return reject(err);
                    }

                    return resolve(data);
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  }, [_vm.isReady ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

//
var script$5 = {
  name: 'MapboxImages',
  components: {
    MapboxImage: __vue_component__$6
  },
  props: {
    /**
     * A list of sources to add to the map
     * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage
     * @see  ./MapboxImage.vue
     * @type {Object}
     */
    sources: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      isReady: false,
      addedImages: new Map()
    };
  },
  methods: {
    addHandler: function addHandler(image, index, total) {
      if (!this.addedImages.has(image.id)) {
        this.addedImages.set(image.id, image);
        this.$emit('add', image, index, total);
      }

      if (this.addedImages.size === this.sources.length) {
        this.isReady = true;
        this.$emit('ready', this.addedImages.values());
      }
    }
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._l(_vm.sources, function (source, index) {
    return _c('mapbox-image', _vm._b({
      key: "mapbox-images-" + source.id,
      on: {
        "add": function add($event) {
          return _vm.addHandler($event, index + 1, _vm.sources.length);
        }
      }
    }, 'mapbox-image', source, false));
  }), _vm._v(" "), _vm.isReady ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

/**
 * Capitalize the first letter of a string
 *
 * @param  {String} string The string to capitalize
 * @return {String}        The capitalized string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Automatically set a mapbox element's props when the vue element props changes
 *
 * @param  {Vue}    vueElement    The Vue component in question
 * @param  {Mixed}  mapboxElement The Mapbox element bound to the component
 * @param  {Object} props         The component's props definition object
 * @return {void}
 */


function bindProps(vueElement, mapboxElement, props) {
  Object.keys(vueElement.$props).filter(function (prop) {
    return prop !== undefined;
  }).forEach(function (prop) {
    var setMethodName = prop === 'mapStyle' ? 'setStyle' : "set".concat(capitalizeFirstLetter(prop));
    var methodExists = typeof mapboxElement[setMethodName] === 'function';
    var propNeedsBinding = 'bind' in props[prop] ? props[prop].bind : true; // Do nothin if `setMethodName` is not a function of `mapBoxElement`
    // or if the props is not to be bounded

    if (!methodExists || !propNeedsBinding) {
      return;
    } // Set deep option to true if prop type is or can be Object


    var type = props[prop].type;
    var options = {
      deep: type === Object || Array.isArray(type) && type.includes(Object)
    };
    vueElement.$watch(prop, function (newValue) {
      mapboxElement[setMethodName](newValue);
    }, options);
  });
}

var _excluded$2 = ["accessToken", "mapStyle"];

if (!maplibreGl) {
  throw new Error('mapboxgl is not installed.');
}
/**
 * Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map
 * @type {Object}
 */


var props$4 = {
  accessToken: {
    type: String,
    default: 'no-token'
  },
  container: {
    type: [HTMLElement, String],
    default: undefined
  },
  minZoom: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: 22
  },
  minPitch: {
    type: Number,
    default: 0
  },
  maxPitch: {
    type: Number,
    default: 60
  },
  mapStyle: {
    type: [Object, String],
    required: true
  },
  hash: {
    type: Boolean,
    default: false
  },
  interactive: {
    type: Boolean,
    default: true
  },
  bearingSnap: {
    type: Number,
    default: 7
  },
  pitchWithRotate: {
    type: Boolean,
    default: true
  },
  clickTolerance: {
    type: Number,
    default: 3
  },
  attributionControl: {
    type: Boolean,
    default: true
  },
  customAttribution: {
    type: [String, Array],
    default: null
  },
  logoPosition: {
    type: String,
    default: 'bottom-left'
  },
  failIfMajorPerformanceCaveat: {
    type: Boolean,
    default: false
  },
  preserveDrawingBuffer: {
    type: Boolean,
    default: false
  },
  antialias: {
    type: Boolean,
    default: false
  },
  refreshExpiredTiles: {
    type: Boolean,
    default: true
  },
  maxBounds: {
    type: [maplibreGl.LngLatBounds, Array],
    default: undefined
  },
  scrollZoom: {
    type: [Boolean, Object],
    default: true
  },
  boxZoom: {
    type: Boolean,
    default: true
  },
  dragRotate: {
    type: Boolean,
    default: true
  },
  dragPan: {
    type: [Boolean, Object],
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  doubleClickZoom: {
    type: Boolean,
    default: true
  },
  touchZoomRotate: {
    type: [Boolean, Object],
    default: true
  },
  trackResize: {
    type: Boolean,
    default: true
  },
  center: {
    type: [maplibreGl.LngLat, Array, Object],
    default: function _default() {
      return [0, 0];
    }
  },
  zoom: {
    type: Number,
    default: 0
  },
  bearing: {
    type: Number,
    default: 0
  },
  pitch: {
    type: Number,
    default: 0
  },
  bounds: {
    type: [maplibreGl.LngLatBounds, Array],
    default: undefined
  },
  fitBoundsOptions: {
    type: Object,
    default: null
  },
  renderWorldCopies: {
    type: Boolean,
    default: true
  },
  maxTileCacheSize: {
    type: Number,
    default: null
  },
  localIdeographFontFamily: {
    type: String,
    default: 'sans-serif'
  },
  transformRequest: {
    type: Function,
    default: null
  },
  collectResourceTiming: {
    type: Boolean,
    default: false
  },
  fadeDuration: {
    type: Number,
    default: 300
  },
  crossSourceCollisions: {
    type: Boolean,
    default: true
  }
};
/**
 * All Map events which will be mapped/bounded to the component
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#map.event:resize
 * @type {Array}
 */

var events$3 = ['resize', 'remove', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseout', 'contextmenu', 'wheel', 'touchstart', 'touchend', 'touchmove', 'touchcancel', 'movestart', 'move', 'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoom', 'zoomend', 'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend', 'boxzoomstart', 'boxzoomend', 'boxzoomcancel', 'webglcontextlost', 'webglcontextrestored', 'load', 'render', 'idle', 'error', 'data', 'styledata', 'sourcedata', 'dataloading', 'styledataloading', 'sourcedataloading', 'styleimagemissing'];
var script$4 = {
  name: 'MapboxMap',
  mixins: [provideMap()],
  props: props$4,
  data: function data() {
    return {
      isLoaded: false
    };
  },
  computed: {
    options: function options() {
      var _this$$props = this.$props;
          _this$$props.accessToken;
          var style = _this$$props.mapStyle,
          options = _objectWithoutProperties(_this$$props, _excluded$2); // Use current component's element if container is not set


      if (!options.container && this.$el) {
        options.container = this.$el;
      }

      return _objectSpread2({
        style: style
      }, options);
    }
  },
  mounted: function mounted() {
    var _this = this;

    maplibreGl.accessToken = this.accessToken;
    this.map = new maplibreGl.Map(this.options);
    this.map.on('load', function () {
      _this.isLoaded = true;
    }); // Bind props and events

    bindProps(this, this.map, props$4);
    bindEvents(this, this.map, events$3);
    this.$emit('mb-created', this.map); // Mapbox has some resize issues
    // Create an observer on this object
    // Call resize on the map when we change szie

    var observer = new ResizeObserver(this.resizeHandler);
    observer.observe(this.options.container);
    this.resizeObserver = observer;
  },
  destroyed: function destroyed() {
    unbindEvents(this, this.map);
    this.resizeObserver.disconnect();
    this.map.remove();
  },
  methods: {
    /**
     * Handler for any change of the map's size
     *
     * @return {void}
     */
    resizeHandler: function resizeHandler() {
      if (this.map) {
        this.map.resize();
      }
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.isLoaded ? _c('div', [_vm._t("default")], 2) : _c('div', [_vm._t("loader")], 2)]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var _excluded$1 = ["lngLat"];
/**
 * Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#popup
 * @type {Object}
 */

var props$3 = {
  lngLat: {
    type: [maplibreGl.LngLat, Array, Object],
    required: true
  },
  closeButton: {
    type: Boolean,
    default: true
  },
  closeOnClick: {
    type: Boolean,
    default: true
  },
  closeOnMove: {
    type: Boolean,
    default: false
  },
  anchor: {
    type: String,
    default: null
  },
  offset: {
    type: [Number, maplibreGl.Point, Array, Object],
    default: null
  },
  className: {
    type: String,
    default: null
  },
  maxWidth: {
    type: String,
    default: '240px'
  },

  /**
   * Do not render the popup on the map.
   * @type {Object}
   */
  renderless: {
    type: Boolean,
    default: false,
    bind: false
  }
};
/**
 * All Map events which will be mapped/bounded to the component
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#popup.event:open
 * @type {Array}
 */

var events$2 = ['open', 'close'];
var script$3 = {
  name: 'MapboxPopup',
  mixins: [injectMap()],
  props: props$3,
  data: function data() {
    return {
      popup: null
    };
  },
  computed: {
    options: function options() {
      var _this$$props = this.$props;
          _this$$props.lngLat;
          var options = _objectWithoutProperties(_this$$props, _excluded$1);

      return options;
    }
  },
  mounted: function mounted() {
    this.popup = new maplibreGl.Popup(this.options).setLngLat(this.lngLat).setDOMContent(this.$el);

    if (!this.renderless) {
      this.popup.addTo(this.map);
    }

    bindProps(this, this.popup, props$3);
    bindEvents(this, this.popup, events$2);
    this.$emit('mb-open', this.popup);
  },
  destroyed: function destroyed() {
    if (this.popup) {
      unbindEvents(this, this.popup);
      this.popup.remove();
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var _excluded = ["lngLat", "popup"];
/**
 * Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#marker
 * @type {Object}
 */

var props$2 = {
  lngLat: {
    type: Array,
    required: true
  },
  popup: {
    type: [Object, Boolean],
    default: false,
    bind: false
  },
  element: {
    type: HTMLElement,
    default: null
  },
  offset: {
    type: [maplibreGl.Point, Array],
    default: null
  },
  anchor: {
    type: String,
    default: 'center'
  },
  color: {
    type: String,
    default: null
  },
  scale: {
    type: Number,
    default: 1
  },
  draggable: {
    type: Boolean,
    default: false
  },
  rotation: {
    type: Number,
    default: 0
  },
  pitchAlignment: {
    type: String,
    default: 'auto'
  },
  rotationAlignment: {
    type: String,
    default: 'auto'
  }
};
/**
 * All Map events which will be mapped/bounded to the component
 * @see  https://docs.mapbox.com/mapbox-gl-js/api/#marker.event:dragstart
 * @type {Array}
 */

var events$1 = ['dragstart', 'drag', 'dragend'];
var script$2 = {
  name: 'MapboxMarker',
  components: {
    MapboxPopup: __vue_component__$3
  },
  mixins: [injectMap()],
  props: props$2,
  computed: {
    hasPopup: function hasPopup() {
      return this.popup !== false && this.$refs.popup !== undefined;
    },
    popupInstance: function popupInstance() {
      return this.hasPopup ? this.$refs.popup.popup : null;
    },
    popupOptions: function popupOptions() {
      return _objectSpread2(_objectSpread2({
        lngLat: this.lngLat
      }, this.popup), {}, {
        renderless: true
      });
    },
    options: function options() {
      var _this$$props = this.$props;
          _this$$props.lngLat;
          _this$$props.popup;
          var options = _objectWithoutProperties(_this$$props, _excluded); // Use current component's element if container is not set


      if (this.$slots.default) {
        options.element = this.$refs.content;
      }

      return options;
    }
  },
  mounted: function mounted() {
    this.marker = new maplibreGl.Marker(this.options).setLngLat(this.lngLat).addTo(this.map); // Bind props and events

    bindProps(this, this.marker, props$2);
    bindEvents(this, this.marker, events$1);

    if (this.hasPopup) {
      this.marker.setPopup(this.popupInstance);
    }
  },
  destroyed: function destroyed() {
    if (this.marker) {
      unbindEvents(this, this.marker);
      this.marker.remove();
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    ref: "content"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.popup ? _c('mapbox-popup', _vm._b({
    ref: "popup"
  }, 'mapbox-popup', _vm.popupOptions, false), [_vm._t("popup")], 2) : _vm._e()], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
/**
 * Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @type {Object}
 */

var props$1 = {
  showCompass: {
    type: Boolean,
    default: true
  },
  showZoom: {
    type: Boolean,
    default: true
  },
  visualizePitch: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'top-right',
    bind: false
  }
};
var script$1 = {
  name: 'MapboxNavigationControl',
  mixins: [injectMap()],
  props: props$1,
  mounted: function mounted() {
    this.control = new maplibreGl.NavigationControl(this.$props);
    bindProps(this, this.control, props$1);
    this.map.addControl(this.control, this.position);
  },
  destroyed: function destroyed() {
    this.map.removeControl(this.control);
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div');
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//

if (!maplibreGl) {
  throw new Error('mapboxgl is not installed.');
}
/**
 * Component's props definition, we need to declare it outside the component
 * to be able to test the default values and the types.
 * @see https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol
 * @type {Object}
 */


var props = {
  positionOptions: {
    type: Object,
    default: function _default() {
      return {
        enableHighAccuracy: false,
        timeout: 6000
      };
    }
  },
  fitBoundsOptions: {
    type: Object,
    default: function _default() {
      return {
        maxZoom: 15
      };
    }
  },
  trackUserLocation: {
    type: Boolean,
    default: false
  },
  showAccuracyCircle: {
    type: Boolean,
    default: true
  },
  showUserLocation: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'top-right',
    bind: false
  }
};
/**
 * All geolocationControl events which will be mapped/bounded to the component
 * @see https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol.event:trackuserlocationend
 * @type {Array}
 */

var events = ['trackuserlocationend', 'error', 'geolocate', 'outofmaxbounds', 'trackuserlocationstart'];
var script = {
  name: 'MapboxGeolocateControl',
  mixins: [injectMap()],
  props: props,
  mounted: function mounted() {
    this.control = new maplibreGl.GeolocateControl(this.$props); // Bind props and events

    bindProps(this, this.control, props);
    bindEvents(this, this.control, events); // Add GeolocationControl to the map

    this.map.addControl(this.control, this.position);
  },
  destroyed: function destroyed() {
    if (this.control) {
      unbindEvents(this, this.control, events);
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

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MapboxCluster: __vue_component__$8,
  MapboxGeocoder: __vue_component__$7,
  MapboxImage: __vue_component__$6,
  MapboxImages: __vue_component__$5,
  MapboxLayer: __vue_component__$a,
  MapboxMap: __vue_component__$4,
  MapboxMarker: __vue_component__$2,
  MapboxNavigationControl: __vue_component__$1,
  MapboxPopup: __vue_component__$3,
  MapboxSource: __vue_component__$9,
  MapboxGeolocateControl: __vue_component__
});

/**
 * Install all components
 *
 * @param  {Vue}  Vue The Vue object
 * @return {void}
 */

function install(Vue) {
  Object.keys(components).forEach(function (name) {
    Vue.component(name, components[name]);
  });
} // Export each components separately

export { __vue_component__$8 as MapboxCluster, __vue_component__$7 as MapboxGeocoder, __vue_component__ as MapboxGeolocateControl, __vue_component__$6 as MapboxImage, __vue_component__$5 as MapboxImages, __vue_component__$a as MapboxLayer, __vue_component__$4 as MapboxMap, __vue_component__$2 as MapboxMarker, __vue_component__$1 as MapboxNavigationControl, __vue_component__$3 as MapboxPopup, __vue_component__$9 as MapboxSource, install as default, install };
//# sourceMappingURL=VueMapboxGl.esm.js.map
