<template>
  <div class="container">
    <div class="row">
      <Login class="col-sm-12 col-md-4 offset-md-2" :redirect-to="redirectTo" :redirect-params="redirectParams" />
      <div class="col-xs-12 col-md-1 or">
        OR
      </div>
      <Register class=" col-sm-offset-2 col-md-4" :redirect-to="redirectTo" :redirect-params="redirectParams" />
    </div>
  </div>
</template>


<script>
import Login from './Login.vue'
import Register from './Register.vue'

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
    Login,
    Register
  }
}
</script>

<style scoped lang="scss">

@import '../css/variables.scss';

.or {
  margin: 20px 0px 0px 20px;
  font-family: 'Architects Daughter', cursive;
  color: $col-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15pt;
}

</style>
