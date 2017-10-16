<template>
  <div id="login">
    <h2 class="subtitle">Login</h2>
    <AdaptivePlaceholder theme="light" v-model="username" required="true" title="Username" alt-title="Username" />
    <AdaptivePlaceholder theme="light" type="password" v-model="password" required="true" title="Password" alt-title="Password" />
    <div v-if="error" class="error-box">{{error}}</div>
    <a :href="redirectTo" class="button" v-on:click="login($event)">Login</a>
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
      default() {
        return {}
      }
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
    login(e) {
      e.preventDefault();
      $.ajax({
        url: "http://localhost:4941/api/v2/users/login?" + $.param({
          username: this.username,
          password: this.password,
          email: ''
        }),
        method: 'POST',
        contentType: 'application/json',
        success: (data) => {
          this.$emit('login', {
            session: {
              id: data.id,
              token: data.token,
              username: this.username
            },
            redirect: {
              to: this.redirectTo,
              params: this.redirectParams
            }
          });
        },
        error: (xhr, status, error) => {
          this.error = "Username or Password incorrect.";
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

#login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

</style>
