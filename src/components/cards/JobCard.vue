<template>
  <div class="card col-sm ">
    <div class="text" v-if="getClaim() == 'Model'">
      {{ "Job ID: " + jobId }}
    </div>
    <div class="text">
      {{ "Customer: " + customer }}
    </div>
    <div class="text">
      {{ "Start Date: " + new Date(startDate).toDateString() }}
    </div>
    <div class="text">
      {{ "Duration: " + days + " days." }}
    </div>
    <div class="text">
      {{ "Location: " + location }}
    </div>
    <div v-if="comments != ''" class="text">
      {{ "Comments: " + comments }}
    </div>
    <router-link
      class="link"
      v-if="getClaim() == 'Manager'"
      :to="'/job/' + jobId"
      >Edit Job</router-link
    >
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    jobId: Number,
    customer: String,
    startDate: String,
    days: Number,
    location: String,
    comments: String,
    models: [],
    deleteJob: {
      required: true,
      type: Function as PropType<() => void>,
    },
  },
  data() {
    return {
      EnableEditor: false,
      Models: [],
    };
  },
  methods: {
    getClaim() {
      return localStorage.getItem("claim");
    },
  },
});
</script>

<style scoped>
.text {
  margin-top: 0.3rem;
}
.card {
  margin: auto;
  background-color: ivory;
  min-width: 15rem;
}
.cardButton {
  background: crimson;
  margin-bottom: 0.5rem;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.link {
  border: none;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;
  color: black;
  width: 5rem;
  margin: auto;
}
</style>