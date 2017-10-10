<template>
  <div class="adaptive-panel">
      <!-- input must have an required attribute -->
      <input @input="$emit('input', $event.target.value)" :value="value" type="text" name="input" id="input" class="adaptive-input" :required="required">
      <!-- labels must have placeholder and alt attributes -->
      <label for="input" :placeholder="title" :alt="placeholder"></label>
  </div>
</template>

<script>
export default {
  name: "adaptivePlaceholder",
  props: ['required', 'title', 'placeholder', 'value']
}
</script>

<style scoped lang="scss">

  @import "../css/_adaptive-placeholders";

  $adaptive-placeholder: (
    height: 1.6em,
    margin: 0.5em,
    border: 3px,
    border-radius: 0.3em,
    font-size: 1.6em,
    border-color: #ddd,
    label-color: #bbb,
    active-color: #e87e22,
    valid-color: #23a045,
    placeholder-background-color: #303030,
    textarea: false
  );

  .adaptive-panel {
    font-family: 'Reenie Beanie', cursive;
  }
  // Calling adaptive placeholder for input
  .adaptive-input {
    width: 10em;
    color: #ddd;
    @include adaptive-placeholder();
  }

</style>
