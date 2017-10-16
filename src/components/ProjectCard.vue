<template>
  <div class="outer-card col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <router-link :to="{ name: 'project', params: {id: project.id, project: project} }" class="card inner-card">
      <div class="card-image" :style="'background: center no-repeat url(http://localhost:4941/api/v2' + project.imageUri + ');'"/>
      <h2 class="card-title">
        {{project.title}}
      </h2>
      <div class="card-description">
        {{project.subtitle}}
      </div>
      <div class="progress fund-progress-outer">
        <div class="progress-bar fund-progress-inner" :style="'width:'+progress+'%'">
          {{progress}}% Funded
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'projectCard',
  props: ['project'],
  data() {
    return {
      progress: Math.floor(Math.random()*100)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../css/variables.scss";

.outer-card {
  margin-top: 10px;
}

.inner-card {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;;
  height: 100%;
  padding-bottom: 10px;
}

.inner-card:hover {
  // border-top-width: 5px;
  // padding-bottom: 6px;
  box-shadow: 1px 1px 4px $col-dark;
}

.card-image {
  width:100%;
  padding-top: 300px;
  border-bottom: 4px solid $col-dark-2;
  border-radius: 5px;
  background-color: $col-dark;
}

.card-title {
  flex: 0;
  padding: 5px;
  color: $col-light;
  font-size: 20pt;
}

.fund-progress-outer {
  width: 70%;
  border: 3px solid $col-orange;
  margin-left: auto;
  margin-right: auto;
  background-color: $col-dark;
}
.fund-progress-inner {
  color: $col-light;
  text-align: right;
  padding-right: 3px;
  border-right: 3px solid $col-orange;
  background-color: $col-orange-3;
  white-space: nowrap;
}

.card-description {
  flex:1;
  text-decoration: none;
  color: $col-light;
  margin: 10px;
}
.card-description:hover {
  text-decoration: none;
  color: $col-light;
  margin: 10px;
}
</style>
