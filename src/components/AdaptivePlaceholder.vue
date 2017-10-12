<template>
  <div class="adaptive-panel">
      <!-- input must have an required attribute -->
      <input @input="$emit('input', $event.target.value)" :value="value" :type="type" :name="fieldID" :id="fieldID" :class="valid + ' adaptive-input ' + theme" :required="required">
      <!-- labels must have placeholder and alt attributes -->
      <label class="adaptive-label" :for="fieldID" :placeholder="title" :alt="errorText || title"></label>
  </div>
</template>

<script>
export default {
  name: "adaptivePlaceholder",
  props: {
    'theme': String,
    'required': String,
    'title': String,
    'altTitle': String,
    'value': null,
    'type': {
      type: String,
      default: 'text'
    },
    'validate': {
      type: Function,
      default: () => ""
    }
  },
  mounted() {
    this.$on('input', (val) => {
      this.errorText = this.validate(val)
    })
  },
  watch: {
    value() {
      this.errorText = this.validate(this.value)
    }
  },
  computed: {
    valid() {
      if (this.errorText) {
        return "invalid"
      } else {
        return "valid"
      }
    }
  },
  data() {
    return {
      errorText: "",
      fieldID: this.title + Math.floor(Math.random()*100000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../css/variables.scss";

  @import "../css/_adaptive-placeholders";

  $defaults: (
    height: 1.8em,
    margin: 0.5em,
    border: 3px,
    border-radius: 0.3em,
    font-size: 1.5em,
    textarea: false
  );
  $dark: (
    placeholder-background-color: $col-dark,
    border-color: $col-light,
    label-color: $col-light-2
  );
  $light: (
    placeholder-background-color: $col-light,
    border-color: $col-dark,
    label-color: $col-dark-3
  );
  $valid: (
    active-color: $col-orange,
    valid-color: $col-green
  );
  $invalid: (
    active-color: $col-orange,
    valid-color: $col-red
  );
  .adaptive-label {
    pointer-events: none;
    font-family: 'Architects Daughter', cursive;
    //font-size: 1.5em !important;
  }
  .adaptive-input.light {
    width: 10em;
    color: $col-dark;
  }

  .adaptive-input.light.valid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $light), $valid));
  }

  .adaptive-input.light.invalid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $light), $invalid));
  }
  // Calling adaptive placeholder for input
  .adaptive-input.dark {
    width: 10em;
    color: $col-light;
  }
  .adaptive-input.dark.valid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $dark), $valid));
  }

  .adaptive-input.dark.invalid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $dark), $invalid));
  }

</style>
