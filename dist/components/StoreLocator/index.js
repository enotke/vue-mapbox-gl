import { c as _asyncToGenerator, a as _objectWithoutProperties, b as _objectSpread2 } from '../../_chunks/_rollupPluginBabelHelpers.c63527b4.js';
import { r as regenerator } from '../../_chunks/index.d84f178f.js';
import __vue_component__$2 from '../MapboxCluster.js';
import __vue_component__$3 from '../MapboxGeocoder.js';
import __vue_component__$4 from '../MapboxMap.js';
import { n as normalizeComponent } from '../../_chunks/normalize-component.d57baabe.js';
import '../../_chunks/_commonjsHelpers.04bfb82e.js';
import '../../utils/uniq-id.js';
import '../../mixins/provide-inject-map.js';
import '../MapboxLayer.js';
import '../../utils/bind-events.js';
import '../MapboxSource.js';
import '../../_chunks/maplibre-gl.1a7f3a3e.js';
import '@mapbox/mapbox-gl-geocoder';
import '../../utils/bind-props.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  data: function data() {
    return {
      scrollTop: 0,
      scrollMax: Infinity
    };
  },
  updated: function updated() {
    this.setVars();
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var timer;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$refs.scroller.addEventListener('scroll', function () {
                return _this.setVars();
              }, {
                passive: true
              });

              _this.debouncedSetVars = function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                  return _this.setVars();
                }, 300);
              };

              window.addEventListener('resize', _this.debouncedSetVars);
              _context.next = 5;
              return _this.$nextTick();

            case 5:
              _this.setVars();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.scroller.removeEventListener('scroll', this.setVars);
    window.removeEventListener('resize', this.debouncedSetVars);
  },
  methods: {
    setVars: function setVars() {
      var scroller = this.$refs.scroller;

      if (!scroller) {
        return;
      }

      this.scrollTop = scroller.scrollTop;
      this.scrollMax = scroller.scrollHeight - scroller.clientHeight;

      if (this.scrollTop === 0) {
        this.$emit('scroll-top');
      }

      if (this.scrollTop === this.scrollMax) {
        this.$emit('scoll-bottom');
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "scroller",
    class: {
      'scroller--is-top': _vm.scrollTop === 0,
      'scroller--is-bottom': _vm.scrollTop === _vm.scrollMax,
      'scroller--has-no-scroll': _vm.scrollTop === 0 && _vm.scrollMax === 0
    }
  }, [_c('div', {
    ref: "scroller",
    staticClass: "scroller__inner"
  }, [_c('div', {
    staticClass: "scroller__content"
  }, [_vm._t("default")], 2)])]);
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

var _excluded = ["lat", "lng"];
var script = {
  components: {
    MapboxCluster: __vue_component__$2,
    MapboxGeocoder: __vue_component__$3,
    MapboxMap: __vue_component__$4,
    VueScroller: __vue_component__$1
  },
  props: {
    /**
     * A list of items to display.
     * The only required properties are `lat` and `lng` and `id`.
     *
     * @type {Array<{ lat: Number, lng: number, id: string, [prop: string]: unknown }>}
     */
    items: {
      type: Array,
      required: true
    },

    /**
     * The zoom level to use when zooming in on an item.
     *
     * @type {Number}
     */
    itemZoomLevel: {
      type: Number,
      default: 14
    },

    /**
     * A Mapbox access token.
     * @type {Object}
     */
    accessToken: {
      type: String,
      default: 'no-token'
    },

    /**
     * Props for the MapboxMap component.
     *
     * @see  https://vue-mapbox-gl.meta.fr/components/MapboxMap.html#props
     * @type {Object}
     */
    mapboxMap: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Props fof the MapboxCluster component.
     *
     * @see  https://vue-mapbox-gl.meta.fr/components/MapboxCluster.html#props
     * @type {Object}
     */
    mapboxCluster: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Props for the MapboxGeocoder component.
     *
     * @see  https://vue-mapbox-gl.meta.fr/components/MapboxGeocoder.html#props
     * @type {Object}
     */
    mapboxGeocoder: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Configuration for each transition component.
     * @type {Object}
     */
    transitions: {
      type: Object,
      default: function _default() {
        return {
          loader: {
            map: {},
            search: {},
            list: {},
            default: {}
          },
          panel: {}
        };
      }
    },

    /**
     * Define custom classes for each element of the component.
     * @type {Object}
     */
    classes: {
      type: Object,
      default: function _default() {
        var root = 'store-locator';

        var bem = function bem(name) {
          var modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          return "".concat(root, "__").concat(name).concat(modifier ? "--".concat(modifier) : '');
        };

        return {
          root: root,
          region: {
            map: [bem('region'), bem('region', 'map')],
            search: [bem('region'), bem('region', 'search')],
            list: [bem('region'), bem('region', 'list')],
            panel: [bem('region'), bem('region', 'panel')]
          },
          map: bem('map'),
          search: bem('search'),
          list: bem('list'),
          listItem: bem('list-item'),
          panel: bem('panel')
        };
      }
    }
  },
  data: function data() {
    return {
      isLoading: true,
      map: null,
      mapIsMoving: false,
      selectedItem: null,
      filteredItems: this.items.map(function (item) {
        return item;
      }),
      listIsLoading: false
    };
  },
  computed: {
    geoJson: function geoJson() {
      return {
        type: 'FeatureCollection',
        features: this.items.map(this.itemToGeoJsonFeature)
      };
    },
    filteredGeoJson: function filteredGeoJson() {
      return {
        type: 'FeatureCollection',
        features: this.filteredItems.map(this.itemToGeoJsonFeature)
      };
    }
  },
  methods: {
    /**
     * Transform an item into a valid GeoJSON feature.
     *
     * @param  {Object} item The item to format.
     * @return {Feature}     A GeoJSON feature.
     */
    itemToGeoJsonFeature: function itemToGeoJsonFeature(_ref) {
      var lat = _ref.lat,
          lng = _ref.lng,
          properties = _objectWithoutProperties(_ref, _excluded);

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: properties
      };
    },

    /**
     * Transform a GeoJSON feature into an item.
     *
     * @param  {Geometry} options.geometry   A GeoJSON geometry object.
     * @param  {Object}   options.properties The feature properties.
     * @return {Object}                      An item.
     */
    geoJsonFeatureToItem: function geoJsonFeatureToItem(_ref2) {
      var geometry = _ref2.geometry,
          properties = _ref2.properties;
      return _objectSpread2({
        lat: geometry.coordinates[1],
        lng: geometry.coordinates[0]
      }, properties);
    },

    /**
     * Handler for the geocoder result event.
     *
     * @param {Object} result The place selected in the geocoder component.
     */
    onGeocoderResult: function onGeocoderResult(_ref3) {
      var result = _ref3.result;

      if (result.bbox) {
        this.map.fitBounds(result.bbox);
      } else if (result.center) {
        this.map.flyTo({
          center: result.center
        });
      }
    },

    /**
     * Propagate the `mb-created` event from the MapboxGeocoder component.
     *
     * @param  {Geocoder} geocoder The geocoder instance.
     * @return {void}
     */
    onGeocoderCreated: function onGeocoderCreated(geocoder) {
      this.$emit('geocoder-created', geocoder);
    },

    /**
     * Handler for the map created event.
     *
     * @param  {MapboxMap} instance The Mapbox instance.
     */
    onMapCreated: function onMapCreated(instance) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.map = instance;

                _this.$emit('map-created', instance);

                _this.filterFeaturesInView();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * Handler for the map load event.
     */
    onMapLoad: function onMapLoad() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.$nextTick();

              case 2:
                _this2.isLoading = false;

                if (_this2.$listeners.load) {
                  console.warn('[StoreLocator]', 'The `@load` event is deprecated, replace it with the `@map-load` event instead.');
                }

                _this2.$emit('load', _this2.map);

                _this2.$emit('map-load', _this2.map);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * Handler for the map's movestart event.
     */
    onMapMovestart: function onMapMovestart() {
      var _this3 = this;

      this.mapIsMoving = true;
      this.$nextTick(function () {
        _this3.listIsLoading = true;
      });
    },

    /**
     * Handler for the map's moveend event.
     */
    onMapMoveend: function onMapMoveend() {
      this.mapIsMoving = false;
      this.filterFeaturesInView();
    },

    /**
     * Filter the features in view.
     */
    filterFeaturesInView: function filterFeaturesInView() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        var mapBounds, center;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this4.listIsLoading = true;
                mapBounds = _this4.map.getBounds();
                center = _this4.map.getCenter();
                _this4.filteredItems = _this4.items.filter(function (_ref4) {
                  var lng = _ref4.lng,
                      lat = _ref4.lat;
                  return mapBounds.contains([lng, lat]);
                }).sort(function (a, b) {
                  var distanceFromA = center.distanceTo(a);
                  var distanceFromB = center.distanceTo(b);

                  if (distanceFromA < distanceFromB) {
                    return -1;
                  }

                  if (distanceFromA > distanceFromB) {
                    return 1;
                  }

                  return 0;
                });
                _context3.next = 6;
                return _this4.$nextTick();

              case 6:
                _this4.listIsLoading = false;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * Handler for the click event on a list item.
     * @param {Feature} store A GeoJSON feature.;
     */
    onListItemClick: function onListItemClick(item) {
      this.selectedItem = item;
      this.$emit('select-item', item);

      var _this$map$getCenter = this.map.getCenter(),
          lat = _this$map$getCenter.lat,
          lng = _this$map$getCenter.lng; // Do not trigger flyTo if the map is almost already centered


      if (Math.abs(lng - item.lng) > 0.0001 && Math.abs(lat - item.lat) > 0.0001) {
        this.map.flyTo({
          center: [item.lng, item.lat],
          zoom: this.itemZoomLevel
        });
      }
    },

    /**
     * Handler for the click event on a GeoJSON feature.
     *
     * @param  {Feature} feature The GeoJSON feature being clicked.
     */
    onClusterFeatureClick: function onClusterFeatureClick(feature, event) {
      var item = this.items.find(function (_ref5) {
        var id = _ref5.id;
        return id === feature.properties.id;
      });
      this.$emit('cluster-feature-click', feature, event);

      if (item) {
        this.$emit('select-item', item);
        this.selectedItem = item;
        this.map.flyTo({
          center: feature.geometry.coordinates,
          zoom: this.itemZoomLevel
        });
      }
    },
    onClusterFeatureMouseenter: function onClusterFeatureMouseenter() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['cluster-feature-mouseenter'].concat(args));
    },
    onClusterFeatureMouseleave: function onClusterFeatureMouseleave() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['cluster-feature-mouseleave'].concat(args));
    },
    onClusterClusterClick: function onClusterClusterClick() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.$emit.apply(this, ['cluster-cluster-click'].concat(args));
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

  return _c('div', {
    class: _vm.classes.root || {}
  }, [_c('div', {
    class: (_vm.classes.region || {}).map || {}
  }, [_vm.isLoading ? [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).map || {}, false), [_vm._t("map-loader", function () {
    return [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).default || {}, false), [_vm._t("loader", function () {
      return [_vm._v("\n              Loading...\n            ")];
    })], 2)];
  })], 2)] : _vm._e(), _vm._v(" "), _vm._t("before-map"), _vm._v(" "), _c('mapbox-map', _vm._b({
    class: _vm.classes.map || {},
    on: {
      "mb-created": _vm.onMapCreated,
      "mb-movestart": _vm.onMapMovestart,
      "mb-moveend": _vm.onMapMoveend,
      "mb-load": _vm.onMapLoad
    }
  }, 'mapbox-map', Object.assign({}, _vm.mapboxMap, {
    accessToken: _vm.accessToken
  }), false), [_c('mapbox-cluster', _vm._b({
    on: {
      "mb-feature-click": _vm.onClusterFeatureClick,
      "mb-feature-mouseenter": _vm.onClusterFeatureMouseenter,
      "mb-feature-mouseleave": _vm.onClusterFeatureMouseleave,
      "mb-cluster-click": _vm.onClusterClusterClick
    }
  }, 'mapbox-cluster', Object.assign({}, _vm.mapboxCluster, {
    data: _vm.filteredGeoJson
  }), false)), _vm._v(" "), _vm._t("map", null, {
    "map": _vm.map,
    "geojson": _vm.geoJson,
    "filteredGeojson": _vm.filteredGeoJson,
    "items": _vm.items,
    "filteredItems": _vm.filteredItems,
    "selectedItem": _vm.selectedItem
  })], 2), _vm._v(" "), _vm._t("after-map")], 2), _vm._v(" "), _c('div', {
    class: (_vm.classes.region || {}).search || {}
  }, [_vm.isLoading ? [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).search || {}, false), [_vm._t("search-loader", function () {
    return [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).default || {}, false), [_vm._t("loader", function () {
      return [_vm._v("\n              Loading...\n            ")];
    })], 2)];
  })], 2)] : _vm._e(), _vm._v(" "), _vm._t("before-search", null, {
    "items": _vm.items,
    "filteredItems": _vm.filteredItems,
    "selectedItem": _vm.selectedItem
  }), _vm._v(" "), _c('mapbox-geocoder', _vm._b({
    class: _vm.classes.search || {},
    on: {
      "mb-result": _vm.onGeocoderResult,
      "mb-created": _vm.onGeocoderCreated
    }
  }, 'mapbox-geocoder', Object.assign({}, _vm.mapboxGeocoder, {
    accessToken: _vm.accessToken
  }), false)), _vm._v(" "), _vm._t("after-search", null, {
    "items": _vm.items,
    "filteredItems": _vm.filteredItems,
    "selectedItem": _vm.selectedItem
  })], 2), _vm._v(" "), _c('div', {
    class: (_vm.classes.region || {}).list || {}
  }, [_vm.isLoading || _vm.listIsLoading ? [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).list || {}, false), [_vm._t("list-loader", function () {
    return [_c('transition', _vm._b({}, 'transition', (_vm.transitions.loader || {}).default || {}, false), [_vm._t("loader", function () {
      return [_vm._v("\n              Loading...\n            ")];
    })], 2)];
  })], 2)] : [_vm._t("before-list", function () {
    return [_c('p', [_vm._v("Result(s): " + _vm._s(_vm.filteredItems.length.toFixed(0)))])];
  }, {
    "items": _vm.items,
    "filteredItems": _vm.filteredItems,
    "selectedItem": _vm.selectedItem
  }), _vm._v(" "), _vm.filteredItems.length > 0 ? _c('vue-scroller', [_c('ul', {
    class: _vm.classes.list || {}
  }, _vm._l(_vm.filteredItems, function (item, index) {
    return _c('li', {
      key: item.id,
      class: _vm.classes.listItem || {},
      on: {
        "click": function click($event) {
          return _vm.onListItemClick(item);
        }
      }
    }, [_vm._t("list-item", function () {
      return [_vm._v("\n              Lat: " + _vm._s(item.lat) + " "), _c('br'), _vm._v("\n              Lng: " + _vm._s(item.lng) + "\n            ")];
    }, {
      "item": item,
      "index": index,
      "selectedItem": _vm.selectedItem
    })], 2);
  }), 0)]) : _vm._e(), _vm._v(" "), _vm._t("after-list", null, {
    "items": _vm.items,
    "filteredItems": _vm.filteredItems,
    "selectedItem": _vm.selectedItem,
    "filterFeaturesInView": _vm.filterFeaturesInView
  })]], 2), _vm._v(" "), _c('div', {
    class: (_vm.classes.region || {}).panel || {}
  }, [_c('transition', _vm._b({}, 'transition', _vm.transitions.panel || {}, false), [_vm.selectedItem ? _c('div', {
    key: _vm.selectedItem.id,
    class: _vm.classes.panel || {}
  }, [_vm._t("panel", function () {
    return [_c('div', [_vm._v(_vm._s(_vm.selectedItem))])];
  }, {
    "item": _vm.selectedItem,
    "close": function close() {
      return _vm.selectedItem = null;
    }
  })], 2) : _vm._e()])], 1)]);
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
//# sourceMappingURL=index.js.map
