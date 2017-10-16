<template>
  <div class="adaptive-panel">
      <!-- input must have an required attribute -->
      <textarea v-if="textarea" @input="$emit('input', $event.target.value)" :value="value" :type="type" :name="fieldID" :id="fieldID" :class="valid + ' adaptive-input ' + theme + ' ' + textarea" :required="required"></textarea>
      <input v-else @input="$emit('input', $event.target.value)" :value="value" :type="type" :name="fieldID" :id="fieldID" :class="valid + ' adaptive-input ' + theme + ' ' + textarea" :required="required">
      <!-- labels must have placeholder and alt attributes -->
      <label class="adaptive-label" :for="fieldID" :placeholder="title" :alt="errorText || altTitle"></label>
  </div>
</template>

<script>
export default {
  name: "adaptivePlaceholder",
  props: {
    textarea: {
      default: ""
    },
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
    height: 2em,
    margin: 0.5em,
    border: 3px,
    border-radius: 0.3em,
    font-size: 1.5em,
    textarea: false
  );
  $textarea: (
    height: 15em,
    textarea: true
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
  .adaptive-panel {
    width: 18em;
    padding: 0.6em;
  }

  .adaptive-panel.long {
    width: 100%;
  }
  .adaptive-panel.title {
    font-size: 2em !important;
  }
  .adaptive-panel.small {
    font-size: 0.8em !important;
  }

  .adaptive-label {
    // position: absolute;
    // top: 2.4em;
    // left: 1.8em;
    pointer-events: none;
    font-family: 'Architects Daughter', cursive;
    font-size: 1.5em !important;
    margin-bottom: 0 !important;
  }
  .adaptive-panel.long .adaptive-input {
    text-align: center;
    border-width: 2px !important;
  }

  .adaptive-panel.textarea .adaptive-input {
    text-align: left;
    border-width: 2px !important;
  }

  .adaptive-input.light {
    width: 100%;
    color: $col-dark;
  }

  .adaptive-input.light.valid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $light), $valid));
  }

  .adaptive-input.light.invalid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $light), $invalid));
  }

  .adaptive-input.light.valid.textarea {
    @include adaptive-placeholder(map-merge(map-merge(map-merge($defaults, $light), $valid), $textarea));
  }

  .adaptive-input.light.invalid.textarea {
    @include adaptive-placeholder(map-merge(map-merge(map-merge($defaults, $light), $invalid), $textarea));
  }
  // Calling adaptive placeholder for input
  .adaptive-input.dark {
    width: 100%;
    color: $col-light;
  }
  .adaptive-input.dark.valid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $dark), $valid));
  }

  .adaptive-input.dark.invalid {
    @include adaptive-placeholder(map-merge(map-merge($defaults, $dark), $invalid));
  }
  .adaptive-input.dark.valid.textarea {
    @include adaptive-placeholder(map-merge(map-merge(map-merge($defaults, $dark), $valid), $textarea));
  }

  .adaptive-input.dark.invalid.textarea {
    @include adaptive-placeholder(map-merge(map-merge(map-merge($defaults, $dark), $invalid), $textarea));
  }

</style>
