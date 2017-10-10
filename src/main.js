import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Projects from './components/Projects.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home
    },
      {
        name: 'projects',
        path: '/',
        component: Projects
      }
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
