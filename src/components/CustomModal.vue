<template>
  <modal :name="name"
  transition="nice-modal-fade"
  :min-width="300"
  :min-height="200"
  :delay="100"
  :adaptive="true"
  :resizable="false"
  :draggable="false">
    <slot />
  </modal>
</template>


<script>
import $ from 'jquery'
import _ from 'lodash'

export default {
  name: "custom-modal",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  components: {}
}
</script>


<style lang="scss">
@import "../css/variables.scss";

.v--modal-box {
  background-color: $col-light;
  border: 3px solid $col-dark;
  border-radius: 5px;
  padding: 10px;
}

.v--modal-overlay {
  background: rgba($col-dark,0.5);
}

</style>
