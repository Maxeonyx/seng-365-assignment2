<template>
  <div id="register">
    <h2 class="subtitle">Register</h2>
    <AdaptivePlaceholder theme="light" :validate="validUsername" v-model="username" required="true" title="Username" alt-title="Username" />
    <AdaptivePlaceholder theme="light" :validate="validPassword" type="password" v-model="password" required="true" title="Password" alt-title="Password" />
    <AdaptivePlaceholder theme="light" :validate="validConfirmPassword" type="password" v-model="confirmPassword" required="true" title="Confirm Password" alt-title="Confirm Password" />
    <AdaptivePlaceholder theme="light" :validate="validEmail" v-model="email" required="true" title="Email" alt-title="Email" />
    <AdaptivePlaceholder theme="light" v-model="location" required="false" title="Location" alt-title="Location" />
    <div v-if="error" class="error-box">{{error}}</div>
    <a :href="redirectTo" v-on:click="register($event)" class="button">Register</a>
  </div>
</template>

<script>
import $ from 'jquery'
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
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      location: "",
      error: "",
      inBetweenValidatingPasswords: false,
      validUsername: (username) => {
        return ""
      },
      validEmail: (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(email)) {
          return "Invalid email"
        }
        return ""
      },
      validPassword: (password) => {
        if (password.length < 6) {
          return "Must be 6 chars"
        }
        if (this.inBetweenValidatingPasswords) return "";
        if (password != this.confirmPassword) {
          return "Passwords do not match"
        }
        return ""
      },
      validConfirmPassword: (password) => {
        if (this.inBetweenValidatingPasswords) return "";
        if (password != this.password) {
          return "Passwords do not match"
        }
        this.password = password.slice(1, password.length) + "_"
        this.inBetweenValidatingPasswords = true;
        setTimeout(() => {
          this.password = password;
          this.inBetweenValidatingPasswords = false;
        }, 100);
        return ""
      }
    }
  },
  methods: {
    register(e) {
      e.preventDefault();
      $.ajax({
        url: "http://localhost:4941/api/v2/users",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
          location: this.location
        }),
        success: (data) => {
          $.ajax({
            url: "http://localhost:4941/api/v2/users/login?" + $.param({
              username: this.username,
              password: this.password
            }),
            method: 'POST',
            contentType: 'application/json',
            success: (data) => {
              localStorage.setItem('session', JSON.stringify(data));
              this.$emit('login');
              this.$router.push({name: this.redirectTo, params: this.redirectParams})
            },
            error: (xhr, status, error) => {
              this.error = "Network Error";
            }
          })
        },
        error: (xhr, status, error) => {
          this.error = "Username or Email already used";
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

#register {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

</style>
