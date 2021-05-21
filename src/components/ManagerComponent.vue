<template>
  <div id="manager">
    <h2>
      Manager List
    </h2>
    <div>
      <div v-if="$store.state.AddingNewManager" class="manform">
        <b-form-input
          class="text-center"
          required
          type="text"
          name="Firstname"
          v-model="input.firstName"
          placeholder="First Name"
        />
        <b-form-input
          class="text-center"
          required
          type="text"
          name="Lastname"
          v-model="input.lastName"
          placeholder="Last Name"
        />
        <b-form-input
          class="text-center"
          required
          type="text"
          name="email"
          v-model="input.email"
          placeholder="Email"
        />
        <b-form-input
          class="text-center"
          required
          type="password"
          name="password"
          v-model="input.password"
          placeholder="New Password"
        />
        <b-button class="manbutton" type="b-button" v-on:click="addManager()"
          >Confirm</b-button
        >
        <b-button
          class="manbutton"
          type="b-button"
          v-on:click="addManagerToggle()"
          >Cancel</b-button
        >
      </div>
      <div v-else>
        <b-button
          class="AddManButton"
          type="b-button"
          v-on:click="addManagerToggle()"
        >
          Add New Manager
        </b-button>
      </div>
    </div>
    <b-container>
      <b-row>
        <b-col sm v-for="manager in Managers" :key="manager.firstName">
          <ManagerCard
            class="manCard"
            :efManagerId="manager.efManagerId"
            :efAccountId="manager.efAccountId"
            :account="manager.account"
            :firstName="manager.firstName"
            :lastName="manager.lastName"
            :email="manager.email"
            :deleteManager="deleteManager"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API_URL } from "./../globals";
import store from "../Store/Store.ts";
import ManagerCard from "./cards/ManagerCard.vue";
export default {
  name: "Manager",
  components: { ManagerCard },
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
  updated: function() {
    this.GetManagers();
  },
  created() {
    this.RefreshManagerState();
  },
  watch: {
    $route: "RefreshManagerState",
  },
  methods: {
    RefreshManagerState() {
      this.$store.commit("ManagerHasChangedTrue");
      this.GetManagers();
    },
    async GetManagers() {
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

<style scoped>
.manCard {
  margin: auto;
  min-width: 15rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.manform {
  width: 30rem;
  margin: auto;
  margin-bottom: 1rem;
}

.manbutton {
  margin-top: 1rem;
}
.AddManButton {
  margin: 1rem;
}
</style>
