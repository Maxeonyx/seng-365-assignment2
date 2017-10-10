<template>
  <div class="container">
    <div class="row">
      <div v-for="project in projects" class="outer-card col-xs-12 col-sm-6 col-md-3 col-lg-4">
        <div class="card inner-card">
          <img class="card-image" v-bind:src="'http://localhost:4941/api/v2/projects/' + project.id + '/image'"/>
          <div class="card-title">
            {{project.title}}
          </div>
          <div class="card-description">
            {{project.subtitle}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {

  data() {
    return {
      projects: []
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

<style>

.outer-card {
  margin-top: 10px;
}

.inner-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 10px;
}

.card-title {
  font-size: 20pt;
}

.card-image {
  width:100%;
  height: auto;
}

.card-description {
  margin: 10px;
}

</style>
