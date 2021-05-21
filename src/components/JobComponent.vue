<template>
  <div id="job">
    <h2>Jobs</h2>
    <div>
      <div v-if="$store.state.AddingNewJob">
        <input
          required
          type="text"
          name="customer"
          v-model="input.customer"
          placeholder="Customer"
        />
        <input
          required
          type="datetime-local"
          name="startDate"
          v-model="input.startDate"
        />
        <input
          required
          type="number"
          name="days"
          v-model="input.days"
          placeholder="Days"
        />
        <input
          required
          type="text"
          name="location"
          v-model="input.location"
          placeholder="Location"
        />
        <input
          required
          type="text"
          name="comments"
          v-model="input.comments"
          placeholder="Comments"
        />

        <button type="button" v-on:click="addJob()">Confirm</button>
        <button type="button" v-on:click="addJobToggle()">Cancel</button>
      </div>
      <div v-else>
        <button type="button" v-on:click="addJobToggle()">Add New Job</button>
      </div>
    </div>
    <div v-for="job in Jobs" :key="job.efJobId">
      <div>
        {{
          "JobId: " +
          job.efJobId +
          "Customer: " +
          job.customer +
          ". Start Date " +
          job.startDate +
          ". Duration: " +
          job.days +
          " days. Location: " +
          job.location +
          ". Comments: " +
          job.comments +
          ". Models" +
          job.models
        }}
        <div v-if="$store.state.AddModelToJob && CurrentlyEdited == job.efJobId">
          <div>
            <button type="button" v-on:click="addModelToJob()">
              Add model
            </button>
          </div>
          <button type="button" v-on:click="addModelToJobToggle(null)">
            Cancel
          </button>
        </div>
        <div v-else>
          <button type="button" v-on:click="addModelToJobToggle(job.efJobId)">
            Add Model To Job
          </button>
        </div>
        <button type="button" v-on:click="deleteJob(job.efJobId)">
          Delete Job
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from "./../globals";
import store from "../Store/Store";
export default {
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
  updated: function () {
    this.GetJobs();
  },
  created() {
    this.RefreshJobState();
  },
  watch: {
    $route: "RefreshJobState",
  },
  methods: {
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
    addModelToJobToggle(id) {
      this.$store.commit("ToggleAddModelToJob");
      this.CurrentlyEdited == id;
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

