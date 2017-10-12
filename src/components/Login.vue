<template>
  <div id="login" class="col-sm-12 col-md-4 offset-md-2">
    <h2 class="subtitle">Login</h2>
    <form action="#">
      <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
      <AdaptivePlaceholder theme="light" v-model="password" required="true" title="Password" alt-title="Password" />
      <div v-if="error" class="errorBox">{{error}}</div>
      <a :href="redirectTo" class="button" v-on:click="login()">Login</a>
    </form>
  </div>
</template>

<script>
import AdaptivePlaceholder from './AdaptivePlaceholder.vue'
import $ from 'jquery'

export default {
  name: 'login',
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
      error: null
    }
  },
  methods: {
    login() {
      $.ajax({
        url: "http://localhost:4941/api/v2/users/login?" + $.param({
          username: this.username,
          password: this.password
        }),
        method: 'POST',
        success: (data) => {
          localStorage.setItem('authToken', data.token)
          this.$router.push({name: redirectTo, params: redirectParams})
        },
        error: (xhr, status, error) => {
          this.error = status;
        }
      })
    }
  },
  components: {
    AdaptivePlaceholder
  }

}

</script>


<style scoped lang="scss">



</style>
