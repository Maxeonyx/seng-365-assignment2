<template>
  <div class="container project-container">
    <div class="row">
      <ProjectCard v-for="project in searchedProjects" :key="project.id" :project="project"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import ProjectCard from './ProjectCard.vue'

export default {
  props: {
    searchText: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      projects: [],
      searchedProjects: []
    }
  },
  watch: {
    searchText() {
      this.updateSearchedProjects();
    },
    projects() {
      this.updateSearchedProjects();
    }
  },
  methods: {
    updateSearchedProjects() {
      this.searchedProjects = this.projects.filter((project) => {
        return (project.title + project.subtitle + project.description).includes(this.searchText);
      });
    }
  },
  mounted() {
    /* Get initial set of projects from the API */
    $.ajax({
      url: 'http://localhost:4941/api/v2/projects',
      method: 'GET',
      success: (data, error) => {
        this.projects = data;
      },
      error: (xhr, status, error) => {
        console.log('failed: ' + error)
      }
    });

    $(window).scroll(_.debounce(() => {
      // if ()
    }), 100);
  },
  components: {
    ProjectCard
  }
}
</script>

<style scoped lang="scss">



</style>
