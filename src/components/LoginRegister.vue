<template>
  <div class="container">
    <div class="row">
      <div id="login" class="col-sm-12 col-md-3 offset-md-3">
        <h2>Login</h2>
        <form action="#">
          <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
        </form>
      </div>
      <div class="col-xs-1 or">
        OR
      </div>
      <div id="register" class="col-sm-12 col-md-3">
        <h2>Register</h2>
        <form action="#">
          <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
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

.button {
  font-family: 'Architects Daughter', cursive;
  padding: 5px;
  font-size: 15pt;
  color: $col-light !important;
  margin: 0px 15px;
  border-radius: 0.3em;
  border: 2px solid $col-dark;
  background-color: $col-blue;
}

.or {
  font-family: 'Architects Daughter', cursive;
  color: $col-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 15pt;
}

</style>
