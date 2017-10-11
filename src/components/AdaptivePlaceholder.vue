<template>
  <div class="adaptive-panel">
      <!-- input must have an required attribute -->
      <input @input="$emit('input', $event.target.value)" :value="value" :type="type" :name="title" :id="fieldID" :class="'adaptive-input ' + theme" :required="required">
      <!-- labels must have placeholder and alt attributes -->
      <label class="adaptive-label" :for="fieldID" :placeholder="title" :alt="altTitle"></label>
  </div>
</template>

<script>
export default {
  name: "adaptivePlaceholder",
  props: {
    'theme': String,
    'required': Boolean,
    'title': String,
    'altTitle': String,
    'value': String,
    'type': {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      fieldID: this.title + Math.floor(Math.random()*100000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../css/variables.scss";

  @import "../css/_adaptive-placeholders";

  $adaptive-placeholder-dark: (
    height: 1.6em,
    margin: 0.5em,
    border: 3px,
    border-radius: 0.3em,
    font-size: 1.6em,
    textarea: false,
    active-color: $col-orange,
    valid-color: #23a045,
    placeholder-background-color: $col-dark,
    border-color: $col-light,
    label-color: $col-light-2
  );
  $adaptive-placeholder-light: (
    height: 1.8em,
    margin: 1em,
    border: 3px,
    border-radius: 0.3em,
    font-size: 1.5em,
    textarea: false,
    active-color: $col-orange,
    valid-color: $col-green,
    placeholder-background-color: $col-light,
    border-color: $col-dark,
    label-color: $col-light-2
  );
  .adaptive-label {
    font-family: 'Architects Daughter', cursive;
    font-size: 1.6em !important;
  }
  .adaptive-input.light {
    width: 10em;
    color: $col-dark;
    @include adaptive-placeholder($adaptive-placeholder-light);
  }
  // Calling adaptive placeholder for input
  .adaptive-input.dark {
    width: 10em;
    color: $col-light;
    @include adaptive-placeholder($adaptive-placeholder-dark);
  }

</style>
