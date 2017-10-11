<template>
  <div id="app">
    <div id="top-panel">
      <router-link :to="{ name: 'home', params: {} }"><img src="./assets/logo/logo.gif" width="150" height="150"/></router-link>
      <h1 id="title">CRuDfund</h1>
      <AdaptivePlaceholder id="searchBox" theme="dark" v-model="searchText" required="true" title="Search" alt-title="Search"></AdaptivePlaceholder>
    </div>
      <div id="nav-panel">
        <ul>
            <li class="link"><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li class="link login"><router-link :to="{ name: 'loginRegister' }">Login or Register</router-link></li>
        </ul>
      </div>
    <div id="main">
      <router-view :search-text="searchText"/>
    </div>
  </div>
</template>

<script>
import AdaptivePlaceholder from "./components/AdaptivePlaceholder.vue"

export default {
  name: 'app',
  data() {
    return {
      searchText: ""
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
  font-size: 80pt;
  font-family: 'Reenie Beanie', cursive;
  padding-right: 100px;
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #ddd;
  background-color: $col-dark;
}

#nav-panel {
  font-family: 'Reenie Beanie', cursive;
  border-bottom: 3px solid $col-light-2;
  font-size: 40pt;
  background: lighten($col-dark-2, 5);
  color: $col-dark;
  width: 100%;
}
#nav-panel > a {
  color: lighten($col-dark, 20);
}
#nav-panel > a:hover {
  color: lighten($col-dark, 20);
}

.login {
  float: right;
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
  margin: 0 10px;
}

li.link {
  color: $col-orange;
}
li.link:hover {
  color: lighten($col-orange, 20);
}

a.router-link-exact-active {
  color: $col-blue !important;
}

a, a:hover, a:link, a:active, a:visited {
  color: inherit;
  text-decoration: none;
}

.card {
  padding: 0;
  margin: 5px;
  box-shadow: 3px 3px 5px $col-light-2;
  background-color: $col-dark;
  color: $col-light;
  border-radius: 5px;
  border: 1px solid $col-dark-2;
}

h2 {
  font-family: 'Architects Daughter', cursive;
}


</style>
