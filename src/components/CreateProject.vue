<template>
  <div class="container">

    <div class="row ">
      <div class="col-md-12">
        <div class="card">
          <AdaptivePlaceholder class="long title" theme="dark" required="true" title="Enter Title Here" alt-title="Title" v-model="project.title" />
          Created on {{new Date().toLocaleDateString()}} by {{session.username}}
          <AdaptivePlaceholder class="long" theme="dark" required="true" title="Enter Subtitle Here" alt-title="Subtitle" v-model="project.subtitle" />
          The subtitle is a brief (one to two line) summary that shows up in the project list.
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <label class="img-area" for="upload-image">
            <div class="imgw">Click Here to Upload Image</div>
            <input type="file" id="upload-image">
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card project-target">
          <h3>$0 Pledged of ${{project.target.toLocaleString()}}</h3>
          <AdaptivePlaceholder :validate="validateAmount" class="long" theme="dark" required="true" title="Enter Target, e.g. $100" alt-title="Target" v-model.number="project.target" />
          The target is the minimum amount of money that your project must reach in order to get funded.
          <br/>
          <br/>
          <div class="progress fund-progress-outer">
            <div class="progress-bar fund-progress-inner" :style="'width:0%'">
              0% Funded
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card project-description">
          <AdaptivePlaceholder class="long" textarea="textarea" theme="dark" required="true" title="Enter Description" alt-title="Description" v-model.number="project.description" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="card">
          <h2 class="project-title"> Rewards </h2>
        </div>
      </div>
      <div v-for="reward in project.rewards" class="col-md-4 col-sm-6 col-xs-12">
        <div class="card">
          <div class="project-reward">
            <AdaptivePlaceholder :validate="validateAmount" class="long" theme="dark" required="true" title="Amount e.g. $100" alt-title="Amount" v-model.number="reward.amount" />
            <AdaptivePlaceholder class="long small" textarea="textarea" theme="dark" required="true" title="Enter Description" alt-title="Description" v-model.number="reward.description" />
            <a href="#" class="button" v-on:click="deleteReward($event, reward)">Remove</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <a href="#" v-on:click="newReward($event)" class="card new-reward">
          + Reward
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import AdaptivePlaceholder from "./AdaptivePlaceholder.vue"
import Dropzone from "../dropzone.js"

export default {
  name: 'createProject',
  props: ['session'],
  data() {
    return {
      project: {
        creators: [],
        target: "",
        title: "",
        subtitle: "",
        description: "",
        rewards: []
      },
      validateAmount(amount) {
        if (isNaN(parseFloat(amount))) {
          return "Invalid number"
        }
        return ""
      }
    }
  },
  computed: {
  },
  beforeRouteUpdate() {
    if (!this.session) {
      this.$router.push({to: "loginRegister", redirectTo: "createProject", redirectParams: {}})
    }
  },
  mounted() {

    this.project.creators.push({
      id: this.session.id
    })
  },
  methods: {
    newReward(e) {
      e.preventDefault();
      this.project.rewards.push({
        amount: "",
        description: ""
      });
    },
    deleteReward(e, reward) {
      e.preventDefault();
      let index = _.findIndex(this.project.rewards, rew => rew.id == reward.id);
      this.project.rewards.splice(index, 1);
    }
  },
  components: {
    AdaptivePlaceholder
  }
}
</script>

<style scoped lang="scss">

@import "../css/variables.scss";

.imgw {
  display: block;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  border-radius: 4px;
  margin: 0px;
  width: 100%;
}

.img-area {
  margin: 5px;
  border: 3px dashed $col-dark-3;
}

.project-description {
  white-space: pre-wrap;
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
  font-size: 24pt;
}

.project-reward {
  padding: 10px;
  min-height: 300px;
}

.project-target {
  padding: 10px;
}

.new-reward {
  font-family: 'Architects Daughter', cursive;
  font-size: 2em;
  color: $col-light;
  min-height: 300px;
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 5% 0%;
  padding-right: 3px;
  color: $col-light;
  text-align: right;
  border-right: 3px solid $col-orange;
  background-color: $col-orange-3;
}

</style>
