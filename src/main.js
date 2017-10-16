import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueModal from 'vue-js-modal'

import Projects from './components/Projects.vue'
import LoginRegister from './components/LoginRegister.vue'
import Project from './components/Project.vue'
import CreateProject from './components/CreateProject.vue'

Vue.use(VueRouter)
Vue.use(VueModal)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Projects
    },
    {
      name: 'loginRegister',
      path: '/loginRegister',
      component: LoginRegister
    },
    {
      name: 'project',
      path: '/projects/:id',
      component: Project,
      props: true
    },
    {
      name: 'createProject',
      path: '/createProject',
      component: CreateProject,
      props: true
    }
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
