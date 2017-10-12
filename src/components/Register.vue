<template>
  <div id="register">
    <h2 class="subtitle">Register</h2>
    <form action="#">
      <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
      <AdaptivePlaceholder theme="light" v-model="password" required="true" title="Password" alt-title="Password" />
      <AdaptivePlaceholder theme="light" v-model="confirmPassword" required="true" title="Confirm Password" alt-title="Confirm Password" />
      <AdaptivePlaceholder theme="light" v-model="email" required="true" title="Email" alt-title="Email" />
      <AdaptivePlaceholder theme="light" v-model="location" required="false" title="Location" alt-title="Location" />
      <a class="button">Register</a>
    </form>
  </div>
</template>

<script>
import AdaptivePlaceholder from './AdaptivePlaceholder.vue'

export default {
  name: 'register',
  props: {
    redirectTo: {
      type: String,
      default: 'home'
    },
    redirectParams: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      location: ""
    }
  },
  components: {
    AdaptivePlaceholder
  }

}
</script>


<style scoped lang="scss">



</style>
