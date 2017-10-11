<template>
  <div class="container project-container">
    <div class="row">
      <ProjectCard v-for="project in searchedProjects" :project="project"/>
    </div>
  </div>
</template>

<script>
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
      console.log("here");
      this.searchedProjects = this.projects.filter((project) => {
        return (project.title + project.subtitle + project.description).includes(this.searchText);
      });
    }
  },
  mounted() {
    $.ajax({
      url: 'http://localhost:4941/api/v2/projects',
      method: 'GET',
      success: (data, error) => {
        console.log(data)
        this.projects = data;
      },
      error: (xhr, status, error) => {
        console.log('failed: ' + error)
      }
    })
  },
  components: {
    ProjectCard
  }
}
</script>

<style scoped lang="scss">



</style>
