<template>
  <CustomModal @before-open="beforeOpen" name="pledge-modal">
    <h2>Pledge to {{project.title}}</h2>
    <hr/>
      <AdaptivePlaceholder :validate="validateAmount" theme="light" required="true" title="$100.00" alt-title="Amount" v-model.number="state.amount" />
      {{bestRewardText}}
          <br/>
      <div>
        <input name="anon-checkbox" id="anon-checkbox" type="checkbox" v-model="state.anonymous" />
        <label class="checkbox" for="anon-checkbox"></label>
        <label for="anon-checkbox" class="checkbox-label">Pledge Anonymously?</label>
      </div>
      <hr/>
      <AdaptivePlaceholder theme="light" required="false" title="Credit Card" alt-title="Credit Card" />

    <div style="width: 100%;display: flex; flex-direction: row; justify-content: flex-end;">
      <div v-if="state.error" class="error-box">{{state.error}}</div>
      <a href="#" class="button" v-on:click="pledge($event)">Pledge ${{state.amount}}</a>
    </div>
  </CustomModal>
</template>


<script>
import $ from 'jquery'
import _ from 'lodash'
import CustomModal from "./CustomModal.vue"
import AdaptivePlaceholder from "./AdaptivePlaceholder.vue"

function state() {
  return {
    amount: "",
    error: "",
    anonymous: false
  }
}

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
      state: state(),
      validateAmount(amount) {
        if (isNaN(parseFloat(amount))) {
          return "Invalid number"
        }
        return ""
      }
    }
  },
  computed: {
    bestReward() {
      return _(this.project.rewards)
        .filter(rew => rew.amount <= this.state.amount)
        .sort(rew => rew.amount)
        .first();
    },
    bestRewardText() {
      if (isNaN(parseFloat(this.state.amount))) {
        return "Please input an amount of money to pledge."
      }

      if (this.bestReward == null) {
        return "Pledging this amount gets you: A feeling of satisfaction (No rewards)."
      }

      return "Pledging this amount gets you: The $" + this.bestReward.amount + " reward."
    }
  },
  methods: {
    beforeOpen(event) {
      this.clearModal()
      if (event.params && event.params.amount) {
        this.state.amount = event.params.amount;
      }
    },
    pledge(e) {
      e.preventDefault();
      let session = JSON.parse(localStorage.getItem('session'));
      console.log(session)
      if (session === null) {
        this.state.error = "Not Logged In";
        return
      }
      $.ajax({
        url: "http://localhost:4941/api/v2/projects/"+ this.project.id +"/pledge",
        method: 'POST',
        contentType: 'application/json',
        headers: {
          'X-Authorization': session.token
        },
        data: JSON.stringify({
          id: session.id,
          amount: this.state.amount,
          anonymous: this.state.anonymous,
          card: {
            authToken: "none"
          }
        }),
        success: (data) => {
          this.$emit('refresh-project');
          this.clearModal();
          this.$modal.hide('pledge-modal');
        },
        error: (xhr, status, error) => {
          if (xhr.status === 401) {
            this.state.error = "Not Logged In";
          } else if (xhr.status === 403) {
            this.state.error = "Can't pledge to your own project.";
          } else {
            this.state.error = "Invalid Pledge. Check amount is valid."
          }
        }
      })
    },
    clearModal() {
      this.state = state();
    }
  },
  components: {
    CustomModal,
    AdaptivePlaceholder
  }
}
</script>


<style scoped lang="scss">
@import "../css/variables.scss";

hr {
  width: 100%;
  margin: 20px 40px;
  border: 1.5px solid $col-light-2;
}

h2 {
  text-align: center;
  margin: 10px auto;
}

.button {
  align-self: flex-end;
  display: block;
  margin-top: auto;
  margin-left: auto;
}

</style>
