<template>
  <div id="app">
    <div id="top-panel">
      <router-link :to="{ name: '', params: {} }"><img src="./assets/logo/logo.gif" width="150" height="150"/></router-link>
      <h1 id="title">CRuDfund</h1>
    </div>
      <div id="nav-panel">
        <ul>
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
        </ul>
      </div>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body, html {
  height: 100%;
  margin: 0px;
  padding: 0;
}

#title {
  font-size: 80pt;
  font-family: 'Reenie Beanie', cursive;
  padding-right: 100px;
}

#app {
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
  justify-content: center;
  align-items: center;
  margin: 0px;
  color: #ddd;
  background-color: #303030;
}

#nav-panel {
  font-size: 20pt;
  background: #404040;
  color: #ddd;
  width: 100%;
}

#top-panel > h1 {
  margin: 0px;
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

</style>
