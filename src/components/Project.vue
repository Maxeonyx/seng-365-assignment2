<template>
  <div class="container">
    <div class="row ">
      <div class="col-md-12">
        <div class="card">
          <h2 class="project-title">{{project.title}}</h2>
          <hr>
          <p>{{project.subtitle}}</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <img :src="'http://localhost:4941/api/v2/projects/' + id + '/image'"/>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <img :src="'http://localhost:4941/api/v2/projects/' + id + '/image'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project',
  props: ['id', 'project'],
  data() {
    return {
      project: {}
    }
  },
  mounted() {
    $.ajax({
      url: 'http://localhost:4941/api/v2/projects/' + this.id,
      method: 'GET',
      success: (data, error) => {
        this.project = data;
      },
      error: (xhr, status, error) => {
        console.log('failed: ' + error)
      }
    })
  }
}
</script>

<style scoped lang="scss">

@import "../css/variables.scss";

hr {
  margin: 20px;
  border-color: $col-orange-2;
  border-width: 2px;
}

img {
  border-radius: 4px;
  margin: 0px;
  width: 100%;
}

.project-title {
  padding: 10px;
  font-family: 'Architects Daughter', cursive;
}

</style>
