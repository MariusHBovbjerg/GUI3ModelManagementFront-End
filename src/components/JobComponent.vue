<template>
  <div id="job">
    <h2>Jobs</h2>
    <div v-if="getClaim() =='Manager'">
      <div v-if="$store.state.AddingNewJob" class="jobrow">
        <b-form-input
          class="text-center"
          required
          type="text"
          name="customer"
          v-model="input.customer"
          placeholder="Customer"
        />
        <b-form-input
          class="text-center"
          required
          type="datetime-local"
          name="startDate"
          v-model="input.startDate"
        />
        <b-form-input
          class="text-center"
          required
          type="number"
          name="days"
          v-model="input.days"
          placeholder="Days"
        />
        <b-form-input
          class="text-center"
          required
          type="text"
          name="location"
          v-model="input.location"
          placeholder="Location"
        />
        <b-form-input
          class="text-center"
          required
          type="text"
          name="comments"
          v-model="input.comments"
          placeholder="Comments"
        />

        <b-button
          class="jobbutton"
          type="b-button cardButton"
          v-on:click="addJob()"
          >Confirm</b-button
        >
        <b-button
          class="jobbutton"
          type="b-button cardButton"
          v-on:click="addJobToggle()"
          >Cancel</b-button
        >
      </div>
      <div v-else>
        <b-button
          class="AddJobButton"
          type="b-button"
          v-on:click="addJobToggle()"
          >Add New Job</b-button
        >
      </div>
    </div>
    <b-container>
      <b-row>
        <b-col sm v-for="job in Jobs" :key="job.efJobId">
          <JobCard
            class="jobCard"
            :jobId="job.efJobId"
            :comments="job.comments"
            :customer="job.customer"
            :days="job.days"
            :location="job.location"
            :startDate="job.startDate"
            :models="job.jobModels"
            :deleteJob="deleteJob"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API_URL } from "./../globals";
import store from "../Store/Store";
import JobCard from "./cards/JobCard.vue";
export default {
  components: { JobCard },
  name: "Job",
  data() {
    return {
      input: {
        customer: "",
        startDate: "",
        days: 0,
        location: "",
        comments: "",
      },
      Jobs: [],
      CurrentlyEdited: null,
    };
  },
  store,
  updated: function() {
    this.GetJobs();
  },
  created() {
    this.RefreshJobState();
  },
  watch: {
    $route: "RefreshJobState",
  },
  methods: {
    getClaim(){
      return localStorage.getItem("claim");
    },
    RefreshJobState() {
      this.$store.commit("JobHasChangedTrue");
      this.GetJobs();
    },
    async GetJobs() {
      if (this.$store.state.JobHasChanged) {
        this.$store.commit("JobHasChangedFalse");
        let url = API_URL + "api/Jobs";
        try {
          let response = await fetch(url, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
          });
          if (response.ok) {
            this.Jobs = await response.json();
            //Change view to some other component// ...
          } else {
            alert("Server returned: " + response.statusText);
          }
        } catch (err) {
          alert("Error: " + err);
        }

        return;
      }
    },
    async addJob() {
      let url = API_URL + "api/Jobs";
      try {
        let obj = {
          customer: this.input.customer,
          startDate: this.input.startDate,
          days: this.input.days,
          location: this.input.location,
          comments: this.input.comments,
        };

        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(obj), //Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.$store.commit("JobHasChangedTrue");
          this.addJobToggle();
          this.input.customer = "";
          this.input.startDate = "";
          this.input.days = 0;
          this.input.location = "";
          this.input.comments = "";
          alert("Job has been added!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async deleteJob(id) {
      let url = API_URL + "api/Jobs/" + id;
      try {
        let response = await fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.$store.commit("JobHasChangedTrue");
          this.GetJobs();
          alert("Job has been deleted!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    addJobToggle() {
      this.$store.commit("ToggleAddJob");
      return;
    },
  },
};
</script>

<style scoped>
.jobCard {
  margin: auto;
  min-width: 20rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.jobrow {
  margin: auto;
  width: 30rem;
  margin-bottom: 1rem;
}

.jobbutton {
  margin-top: 1rem;
}
.AddjobButton {
  margin: 1rem;
}
</style>
