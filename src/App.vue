<template>
  <div id="app">
    <div id="top-panel">
      <router-link :to="{ name: 'home', params: {} }"><img src="./assets/logo/logo.gif" width="150" height="150"/></router-link>
      <h1 id="title"><span id="crud">CRuD</span>fund</h1>
      <AdaptivePlaceholder id="searchBox" theme="dark" v-model="searchText" required="true" title="Search" alt-title="Search"></AdaptivePlaceholder>
    </div>
    <div id="nav-panel">
      <router-link class="link" :to="{ name: 'home' }">Home</router-link>|
      <router-link v-show="!loggedIn" class="link link-login" :to="{ name: 'loginRegister' }">Login or Register</router-link>
      <router-link v-show="loggedIn" class="link link-login" :to="{ name: 'createProject' }">Create Project</router-link>
      <a href="/loginRegister" v-on:click="logout($event)" v-show="loggedIn" class="link link-login">Logout</a>
    </div>
    <div id="main">
      <router-view @login="login($event)" :session="session" :search-text="searchText"/>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AdaptivePlaceholder from "./components/AdaptivePlaceholder.vue";

export default {
  name: 'app',
  data() {
    return {
      searchText: "",
      loggedIn: false,
      session: null
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.session = JSON.parse(localStorage.getItem('session'));
      this.loggedIn = !!this.session;
    },
    login(data) {
      console.log('login')
      localStorage.setItem('session', JSON.stringify(data.session));
      this.checkLogin();
      this.$router.push({name: data.redirect.to, params: data.redirect.params})
    },
    logout(e) {
      e.preventDefault();
      $.ajax({
        url: "http://localhost:4941/api/v2/users/logout",
        method: 'POST',
        contentType: 'application/json',
        headers: {'X-Authorization': this.session.token},
        success: (data) => {
          localStorage.clear()
          this.checkLogin();
          this.$router.push({name: 'home', params: {} })
        },
        error: (xhr, status, error) => {
          console.log(xhr);
          if (xhr.status == 401) {
            localStorage.setItem('session', null)
            this.checkLogin();
          }
        }
      })
    }
  },
  components: {
    AdaptivePlaceholder
  }
}
</script>

<style lang="scss">
@import "./css/variables.scss";

body, html {
  background-color: $col-light;
  margin: 0px;
  padding: 0;
}

body {
  overflow-y: scroll;
}

#title {
  //flex: 1;
  font-size: 70pt;
  font-family: 'Reenie Beanie', cursive;
}
#crud {
  font-size: 105pt;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
}

#top-panel {
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  color: #ddd;
  background-color: $col-dark;
}

#nav-panel {
  position: sticky;
  top: 0px;
  z-index:1;
  display: flex;
  justify-content: center;
  font-family: 'Reenie Beanie', cursive;
  border-bottom: 3px solid #000;
  font-size: 40pt;
  background: $col-dark-2;
  color: $col-dark;
  width: 100%;
}
#nav-panel > a {
  margin: 0 30px;
}

#top-panel > h1 {
  margin: 0px;
}

#searchBox {
  align-self: flex-end;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  //margin: 0 10px;
}

.link {
}
.link:hover {
}



///***********************
///


a.router-link-exact-active {
  color: $col-orange !important;
}

a {
  color: $col-blue;
}
a:hover {
  color: lighten($col-blue, 20);
}
a:link, a:active, a:visited {
  color: $col-blue;
  text-decoration: none;
}

.subtitle {
  margin-bottom: 20px;
  margin-top: 10px;
}

.card {
  padding: 0;
  margin: 5px;
  box-shadow: 3px 3px 6px $col-dark;
  background-color: $col-dark;
  color: $col-light;
  border-radius: 5px;
  border: 1px solid $col-dark-2;
  height: auto;
}

h2 {
  font-family: 'Architects Daughter', cursive;
}

h3 {
  font-family: 'Architects Daughter', cursive;
}

hr {
  margin: 20px;
  border-color: $col-orange-2;
  border-width: 2px;
}


.button {
  font-family: 'Architects Daughter', cursive;
  padding: 5px 15px;
  font-size: 15pt;
  color: $col-light !important;
  border-radius: 0.3em;
  border: 3px solid $col-blue-2;
  background-color: $col-blue;
}

.error-box {
  font-size: 1em;
  font-weight: bold;
  border: 3px solid $col-red-2;
  border-radius: 8px;
  font-family: 'Open Sans', sans-serif;
  color: $col-dark;
  width: 15em;
  margin: 0;
  margin-bottom: 10px;
  padding: 3px;
}

input[type=checkbox] {
  width: 1px;
  height: 1px;
  z-index: -1000;
  position: absolute;
  padding: 0;
  margin: -1px;
  border: 0;
}

label.checkbox {
  user-select: none;
  vertical-align: middle;
  display: inline-block;
  border: 3px solid $col-dark;
  border-radius: 5px;
  padding: 0.5em;
  cursor: pointer;
}

label.checkbox.light {
  border: 3px solid $col-light;
  background-color: $col-dark-2;
}

label.checkbox-label {
  user-select: none;
  vertical-align: middle;
  display: inline-block;
  padding: 0.5em;
  cursor: pointer;
}

input[type=checkbox]:checked + label.checkbox {
  background-color: $col-blue;
}
input[type=checkbox]:checked + label.checkbox.light {
  background-color: $col-blue;
}

input[type=checkbox] + label.checkbox {
  background-color: $col-light-2;
}

input[type=checkbox] + label.checkbox.light {
  background-color: $col-dark-3;
}


</style>
