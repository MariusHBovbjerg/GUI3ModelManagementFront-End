<template>
  <div id="manager">
    <div>
      <div v-if="$store.state.AddingNewManager">
        <input
          required
          type="text"
          name="Firstname"
          v-model="input.firstName"
          placeholder="First Name"
        />
        <input
          required
          type="text"
          name="Lastname"
          v-model="input.lastName"
          placeholder="Last Name"
        />
        <input
          required
          type="text"
          name="email"
          v-model="input.email"
          placeholder="Email"
        />
        <input
          required
          type="password"
          name="password"
          v-model="input.password"
          placeholder="New Password"
        />
        <button type="button" v-on:click="addManager()">Add</button>
        <button type="button" v-on:click="addManagerToggle()">Cancel</button>
      </div>
      <div v-else>
        <button type="button" v-on:click="addManagerToggle()">
          Add New Manager
        </button>
      </div>
    </div>
    <div v-for="manager in Managers" :key="manager.firstName">
      <div>
        {{
          manager.firstName +
          " " +
          manager.lastName +
          " email: " +
          manager.email +
          " manager id: " +
          manager.efManagerId +
          " Account id: " +
          manager.efAccountId
        }}
        <button type="button" v-on:click="deleteManager(manager.efManagerId)">
          Delete Manager
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {API_URL} from "./../globals"
import store from "../Store/Store.ts";
export default {
  name: "Manager",
  data() {
    return {
      input: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      Managers: [],
    };
  },
  store,
  updated: function () {
    this.GetManagers();
  },
  created () {
    this.GetManagers()
  },
  watch: {
    '$route': 'GetManagers'
  },
  methods: {
    async GetManagers () {
      if (this.$store.state.ManagerHasChanged) {
        this.$store.commit("ManagerHasChangedFalse");
        let url = API_URL + "api/Managers";
        try {
          let response = await fetch(url, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
          });
          if (response.ok) {
            this.Managers = await response.json();
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
    async addManager() {
      let url = API_URL + "api/Managers";
      try {
        let obj = {
          firstName: this.input.firstName,
          lastName: this.input.lastName,
          email: this.input.email,
          password: this.input.password,
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
          this.$store.commit("ManagerHasChangedTrue");
          this.addManagerToggle();
          this.input.firstName = "";
          this.input.lastName = "";
          this.input.email = "";
          this.input.password = "";
          alert("Manager has been added!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async deleteManager(id) {
      let url = API_URL + "api/Managers/" + id;
      try {
        let response = await fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.$store.commit("ManagerHasChangedTrue");
          this.GetManagers();
          alert("Manager has been deleted!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    addManagerToggle() {
      this.$store.commit("ToggleAddManager");
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

