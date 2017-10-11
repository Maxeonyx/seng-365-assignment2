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
        <div class="card project-stats">
          <div class="progress fund-progress-outer">
            <div class="progress-bar fund-progress-inner" v-bind:style="'width:'+progress+'%'">
              {{progress}}% Funded
            </div>
          </div>
          <div class="pledge">
            <div>Every little bit makes a difference!</div>
          <router-link class="pledge-button button" :to="{ name: 'pledge', params: {} }">Pledge</router-link>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card project-description">
          {{project.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'project',
  props: ['id'],
  data() {
    return {
      project: {}
    }
  },
  computed: {
    progress() {
      return Math.floor(Math.random()*100)
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
.project-description {
  padding: 10px;
}

.project-title {
  padding: 10px;
}

.pledge {
  //font-family: 'Architects Daughter', cursive;
  font-size: 14pt;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.pledge-button {
  align-self: flex-end;
}

.project-stats {
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
}

.fund-progress-outer {
  margin-bottom: 5px;
  border: 3px solid $col-orange;
  background-color: $col-dark;
}

.fund-progress-inner {
  font-family: 'Architects Daughter', cursive;
  font-size: 16pt;
  height: 100%;
  padding: 5%;
  padding-right: 3px;
  color: $col-light;
  text-align: right;
  border-right: 3px solid $col-orange;
  background-color: $col-orange-3;
}

</style>
