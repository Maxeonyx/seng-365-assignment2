<template>
  <div class="container">
    <div class="row">
      <div id="login" class="col-sm-12 col-md-4 offset-md-2">
        <h2 class="subtitle">Login</h2>
        <form action="#">
          <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
        </form>
      </div>
      <div class="col-xs-1 or">
        OR
      </div>
      <div id="register" class="col-sm-12 col-md-4 subtitle">
        <h2 class="subtitle">Register</h2>
        <form action="#">
          <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
          <AdaptivePlaceholder theme="light" v-model="password" required="true" title="Password" alt-title="Password" />
          <AdaptivePlaceholder theme="light" v-model="confirmPassword" required="true" title="Confirm Password" alt-title="Confirm Password" />
          <AdaptivePlaceholder type="email" theme="light" v-model="email" required="true" title="Email" alt-title="Email" />
          <router-link class="button" :to="{ name: redirectTo, params: redirectParams }">Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import AdaptivePlaceholder from './AdaptivePlaceholder.vue'

export default {
  name: 'loginRegister',
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
  components: {
    AdaptivePlaceholder
  }
}
</script>

<style scoped  lang="scss">

@import '../css/variables.scss';

.or {
  font-family: 'Architects Daughter', cursive;
  color: $col-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 15pt;
}

.subtitle {
  margin-bottom: 20px;
  margin-top: 10px;
}

</style>
