<template>
  <CustomModal name="pledge-modal">
    <h2>Pledge $<span style="font-family: 'Open Sans'">{{amount}}</span> to {{project.title}}</h2>
    <hr/>
    <AdaptivePlaceholder theme="light" required="true" title="Amount" alt-title="Amount" v-model.number="amount" />
    This gives you the ${{bestReward.amount}}
  </CustomModal>
</template>


<script>
import $ from 'jquery'
import _ from 'lodash'
import CustomModal from "./CustomModal.vue"
import AdaptivePlaceholder from "./AdaptivePlaceholder.vue"

export default {
  name: "pledge-modal",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: ""
    }
  },
  computed: {
    bestReward() {
      return _.chain(this.project.rewards)
        .filter(rew => rew.amount <= this.amount)
        .maxBy(rew => rew.amount);
    }
  },
  mounted() {},
  methods: {},
  components: {
    CustomModal,
    AdaptivePlaceholder
  }
}
</script>


<style scoped lang="scss">
@import "../css/variables.scss";

h2 {
  text-align: center;
  margin: 10px auto;
}

hr {
  margin: 5px 20px;
  border-color: $col-light-2;
}

</style>
