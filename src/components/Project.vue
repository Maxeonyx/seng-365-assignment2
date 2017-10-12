<template>
  <div class="container">

    <PledgeModal :project="project" />

    <div class="row ">
      <div class="col-md-12">
        <div class="card">
          <h2 class="project-title">{{project.title}}</h2>
          Created on {{new Date(project.creationDate).toLocaleString({formatMatcher: 'basic'})}} by {{creatorString}}
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
          <h2>${{project.progress.currentPledged.toLocaleString()}} Pledged of ${{project.target.toLocaleString()}}</h2>
          <br/>
          <h2>{{project.progress.numberOfBackers.toLocaleString()}} Backers </h2>
          <br/>
          <div class="progress fund-progress-outer">
            <div class="progress-bar fund-progress-inner" v-bind:style="'width:'+percentFunded+'%'">
              {{percentFunded}}% Funded
            </div>
          </div>
          <div class="pledge">
            <div>Every little bit makes a difference!</div>
          <a href="#" class="pledge-button button" v-on:click="pledge()">Pledge</a>
          </div>
          <div class="recent-pledges">
            <div v-for="pledge in project.backers">
              {{pledge.username}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card project-description">
          <hr/>
          {{project.description}}
          <hr/>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card">
          <h2 class="project-title"> Rewards </h2>
        </div>
      </div>
      <div v-for="reward in sortedRewards" class="col-md-4 col-sm-6 col-xs-12">
        <div class="card">
          {{reward.amount}}
          {{reward.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import PledgeModal from './PledgeModal.vue'

export default {
  name: 'project',
  props: ['id'],
  data() {
    return {
      project: {
        creators: [],
        progress: {
          currentPledged: 0,
          numberOfBackers: 0
        },
        target: 1,
        title: "",
        subtitle: "",
        description: "",
        rewards: []
      }
    }
  },
  computed: {
    /** grammatically correct list of creators */
    creatorString() {
      let copy = this.project.creators.map(x => x.username);
      if (copy.length > 1) {
        let lastTwo = copy.slice(copy.length-2, copy.length).join(" and ");
        copy.splice(copy.length-1);
        copy.splice(copy.length-1);
        copy.push(lastTwo);
      }
      return copy.join(", ");
    },
    /** current funding percentage */
    percentFunded() {
      return this.project.progress.currentPledged / this.project.target * 100;
    },
    sortedRewards() {
      return _.sortBy(this.project.rewards, ['amount']);
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
  },
  methods: {
    pledge() {
      this.$modal.show('pledge-modal')
    }
  },
  components: {
    PledgeModal
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
  font-size: 24pt;
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
  padding: 5% 0%;
  padding-right: 3px;
  color: $col-light;
  text-align: right;
  border-right: 3px solid $col-orange;
  background-color: $col-orange-3;
}

</style>
