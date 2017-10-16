<template>
  <div class="container">

    <PledgeModal @refresh-project="refreshProject" :project="project" />

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
              {{Math.round(percentFunded)}}% Funded
            </div>
          </div>
          <div class="pledge">
            <div>Every little bit makes a difference!</div>
          <a href="#" class="pledge-button button" v-on:click="pledge()">Pledge</a>
          </div>
          <div class="recent-pledges">
            <h2>Recent Pledges</h2>
            <div v-for="pledge in condensedBackers">
              <div style="padding: 0 30px;display: flex; flex-direction: row; justify-content: space-between">
                <h3>{{pledge.username}}</h3>
                <h3>${{pledge.amount}}</h3>
              </div>
            </div>
            <!-- <div style="text-align: left; white-space: pre">{{JSON.stringify(project.backers, null, 4)}}</div>
            <hr/>
            <div style="text-align: left; white-space: pre">{{JSON.stringify(condensedBackers, null, 4)}}</div> -->
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
        <a href="#" v-on:click="pledgeReward($event, reward)" class="card project-reward">
          <h3>${{reward.amount}}</h3>{{reward.description}}
          <a href="#" class="button" v-on:click="pledgeReward($event, reward)">Pledge ${{reward.amount}}</a>
        </a>
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
    condensedBackers() {
      return _.take(_.reduce(this.project.backers, (reducedBackers, bac) => {
        let index = _.findIndex(reducedBackers, b => b.username === bac.username)
        if (index == -1) {
          reducedBackers.push({
            username: bac.username,
            amount: bac.amount
          });
        } else {
        reducedBackers[index].amount += bac.amount;
        }
        return reducedBackers;
      }, []), 5);
    },
    sortedRewards() {
      return _.sortBy(this.project.rewards, ['amount'])
    }
  },
  mounted() {
    this.refreshProject()
  },
  methods: {
    pledge() {
      this.$modal.show('pledge-modal')
    },
    pledgeReward(e, reward) {
      e.preventDefault();
      this.$modal.show('pledge-modal', {amount: reward.amount})
    },
    refreshProject() {
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
  },
  components: {
    PledgeModal
  }
}
</script>

<style scoped lang="scss">

@import "../css/variables.scss";

img {
  border-radius: 4px;
  margin: 0px;
  width: 100%;
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

.project-stats {
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
}

.project-reward {
  color: $col-light;
  text-align: left;
  white-space: pre-wrap;
  padding: 20px;
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
  white-space: nowrap;
}

</style>
