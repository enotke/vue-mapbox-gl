<template>
  <div />
</template>

<script>
  import { NavigationControl } from 'maplibre-gl';
  import bindProps from '../utils/bind-props';
  import { injectMap } from '../mixins/provide-inject-map';

  /**
   * Component's props definition, we need to declare it outside the component
   * to be able to test the default values and the types.
   * @type {Object}
   */
  const props = {
    showCompass: {
      type: Boolean,
      default: true,
    },
    showZoom: {
      type: Boolean,
      default: true,
    },
    visualizePitch: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top-right',
      bind: false,
    },
  };

  export default {
    name: 'MapboxNavigationControl',
    mixins: [ injectMap() ],
    props,
    mounted() {
      this.control = new NavigationControl(this.$props);
      bindProps(this, this.control, props);
      this.map.addControl(this.control, this.position);
    },
    destroyed() {
      this.map.removeControl(this.control);
    },
  };
</script>
