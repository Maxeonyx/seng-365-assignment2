<template>
  <div class="container project-container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="session" class="card filter-panel">
          <h3>View:</h3>
          <div class="checkbox-wrap">
            <input name="backer-checkbox" id="backer-checkbox" type="checkbox" v-model="filter.backer" />
            <label class="checkbox light" for="backer-checkbox"></label>
            <label for="backer-checkbox" class="checkbox-label">My Backed Projects</label>
          </div>
          <div class="checkbox-wrap">
            <input name="creator-checkbox" id="creator-checkbox" type="checkbox" v-model="filter.creator" />
            <label class="checkbox light" for="creator-checkbox"></label>
            <label for="creator-checkbox" class="checkbox-label">My Created Projects</label>
          </div>
        </div>
      </div>
      <ProjectCard v-for="project in shownProjects" :key="project.id" :project="project"/>
      <h3 v-if="numProjectsShown < searchedProjects.length" class="loading col-md-4 offset-md-4">Loading more projects...</h3>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import ProjectCard from './ProjectCard.vue';
import AdaptivePlaceholder from "./AdaptivePlaceholder.vue";

export default {
  props: {
    searchText: {
      type: String,
      required: true
    },
    session: {
      required: true
    }
  },
  data() {
    return {
      projects: [],
      filter: {
        creator: false,
        backer: false
      },
      projectsPerPage: 6,
      numProjectsShown: 6
    }
  },
  computed: {
    shownProjects() {
      return this.searchedProjects.slice(0, this.numProjectsShown);
    },
    searchedProjects() {
      return this.projects.filter((project) => {
        return (project.title + project.subtitle + project.description).includes(this.searchText);
      });
    }
  },
  watch: {
    'filter.creator': function () {
      console.log(this.session);
      if (this.filter.creator && this.filter.backer) {
        this.filter.backer = false;
      }
      this.getProjects();
    },
    'filter.backer': function () {
      if (this.filter.creator && this.filter.backer) {
        this.filter.creator = false;
      }
      this.getProjects();
    }
  },
  methods: {
    getProjects() {
      let params = {open:true};
      params.startIndex = "0";
      let num =Math.floor(Math.random()*1000);
      for (let i =0;i < num; i++) {
        params.startIndex += "0";
      }
      if (this.session) {
        if (this.filter.backer) {
          params.backer = this.session.id;
        }
        if (this.filter.creator) {
          params.creator = this.session.id;
        }
      }
      // Can't implement pagination because no API support for searching
      $.ajax({
        url: 'http://localhost:4941/api/v2/projects?' + $.param(params),
        method: 'GET',
        success: (data, error) => {
          this.projects = _.uniqBy(data, proj => proj.id);
        },
        error: (xhr, status, error) => {
          console.log('failed: ' + error)
        }
      });
    }
  },
  mounted() {
    /* Get initial set of projects from the API */
    this.getProjects();

    let delayedLoad = _.debounce(() => {
      if (this.numProjectsShown < this.searchedProjects.length)
      this.numProjectsShown += this.projectsPerPage;
      this.loading = false;
    }, 1000)

    $(window).scroll(() => {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        this.loading = true;
      }
      delayedLoad();
    });
  },
  components: {
    ProjectCard,
    AdaptivePlaceholder
  }
}
</script>

<style scoped lang="scss">

.filter-panel {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px 20px;
  align-items: center;
  flex-wrap: wrap;
}

.checkbox-wrap {
  margin: 3px 10px;
}

.loading {
  padding: 10px;
}

</style>
