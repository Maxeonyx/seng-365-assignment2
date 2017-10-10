<template>
  <div class="container project-container">
    <div class="row">
      <div v-for="project in searchedProjects" class="outer-card col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <a href="#" class="card inner-card">
          <img class="card-image" v-bind:src="'http://localhost:4941/api/v2/projects/' + project.id + '/image'"/>
          <div class="card-title">
            {{project.title}}
          </div>
          <div class="card-description">
            {{project.subtitle}}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

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
      searchedProjects: [],
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
  }
}
</script>

<style lang="scss">
@import "../css/variables.scss";

.outer-card {
  margin-top: 10px;
}

.inner-card {
  background-color: $col-dark-main;
  border-color: $col-light-main;
  border: 1px solid $col-dark-2;
  color: $col-light-main;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 10px;
}

.inner-card:hover {
  border-top-width: 5px;
  padding-bottom: 6px;
}

.card-title {
  color: $col-three;
  font-size: 20pt;
}

.card-image {
  border-bottom: 4px solid $col-three-2;
  border-radius: 5px;
  background-color: #ddd;
  width:100%;
  height: auto;
}

.card-description {
  text-decoration: none;
  color: $col-light-main;
  margin: 10px;
}
.card-description:hover {
  text-decoration: none;
  color: $col-light-main;
  margin: 10px;
}

</style>
