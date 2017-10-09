<template>
  <div id="app">
    <div id="top-panel">
      <router-link :to="{ name: '', params: {} }"><img src="./assets/logo.gif" width="150" height="150"/></router-link>
      <h1 id="title">CRuDfund</h1>
    </div>
    <div id="main">
      <div id="side-panel">
        <ul>
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        </ul>
      </div>
      <div id="main-panel">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

}
</script>

<style lang="scss">
body, html {
  height: 100%;
  margin: 0px;
  padding: 0;
}

#title {
  justify-content:space-around;
  font-size: 80pt;
  font-family: 'Reenie Beanie', cursive;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#top-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  color: #ddd;
  background-color: #303030;
}

#side-panel {
  font-size: 20pt;
  background: #404040;
  color: #ddd;
  width: 10%;
  height: 100%;
  align-self: flex-start;
}

#top-panel > h1 {
  margin: 0px;
}
#main-panel {
  margin: 30px;
}

#main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #b33;
}
</style>
