<template>
  <modal :name="name"
  transition="nice-modal-fade"
  :min-width="300"
  :delay="100"
  :adaptive="true"
  :resizable="true"
  :draggable="false"
  :scrollable="true"
  height="auto"
  :pivotY="0.3"
  v-on:before-open="beforeOpen">
    <slot/>
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
    return {
      params: ""
    }
  },
  computed: {},
  mounted() {},
  methods: {
    beforeOpen(e) {
      this.$emit('before-open', e);
    }
  },
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v--modal-overlay {
  background: rgba($col-dark,0.5);
}

</style>
