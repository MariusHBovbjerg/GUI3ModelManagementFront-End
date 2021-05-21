<template>
  <b-container>
    <h2>Job Overview</h2>
    <div class="text">
      {{ "Customer: " + job.customer }}
    </div>
    <div class="text">
      {{ "Start Date: " + new Date(job.startDate).toDateString() }}
    </div>
    <div class="text">
      {{ "Duration: " + job.days + " days." }}
    </div>
    <div class="text">
      {{ "Location: " + job.location }}
    </div>
    <div v-if="job.comments != ''" class="text">
      {{ "Comments: " + job.comments }}
    </div>
    <b-dropdown class="dropdown" size="md" text="All models available">
      <b-dropdown-item
        active-class="active"
        class="dropdown"
        size="md"
        v-for="(item, key) in models"
        :key="key"
      >
        {{ item.firstName }} {{ item.lastName }}
        <a
          class="rightfloat"
          v-if="item.exists"
          size="sm"
          type="b-button"
          v-on:click="RemoveModelFromJob(id, item.efModelId)"
        >
          Remove
        </a>
        <a
          class="rightfloat"
          v-else
          size="sm"
          type="b-button"
          v-on:click="AddModelToJob(id, item.efModelId)"
        >
          Add
        </a>
      </b-dropdown-item>
    </b-dropdown>
  </b-container>
</template>

<script>
import { API_URL } from "../globals";
import Vue from "vue";
export default Vue.extend({
  props: ["id"],
  data() {
    return {
      job: {},
      models: [],
    };
  },
  async beforeMount() {
    await this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    async fetchData() {
      this.job = await this.getJob(this.id);
      this.models = await this.filterModels(this.job, await this.GetModel());
    },
    async filterModels(jobs, models) {
      models.forEach((element) => {
        element.exists = false;
        jobs.models.forEach((model) => {
          if (
            element.firstName == model.firstName &&
            element.lastName == model.lastName
          ) {
            element.exists = true;
            console.log(element);
          }
        });
      });
      return models;
    },
    async GetModel() {
      let url = API_URL + "api/Models";
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          return await response.json();
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async getJob(id) {
      let url = API_URL + "api/Jobs/" + id;
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          return await response.json();
        } else {
          alert("error");
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async AddModelToJob(jobid, modelid) {
      let url = API_URL + "api/Jobs/" + jobid + "/model/" + modelid;
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.fetchData();
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async RemoveModelFromJob(jobid, modelid) {
      let url = API_URL + "api/Jobs/" + jobid + "/model/" + modelid;
      try {
        let response = await fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.fetchData();
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
  },
});
</script>

<style scoped>
.rightfloat {
  float: right;
}

.dropdown {
  min-width: 20rem;
}
.text {
  margin-top: 0.3rem;
}
</style>
