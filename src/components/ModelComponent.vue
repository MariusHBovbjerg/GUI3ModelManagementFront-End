<template>
  <div id="model" v-if="this.$store.state.LoggedIn">
    <h1>Models</h1>
    <div>
      <div v-if="$store.state.AddingNewModel">
        <input
          required
          type="text"
          name="Firstname"
          v-model="input.FirstName"
          placeholder="First Name"
        />
        <input
          required
          type="text"
          name="Lastname"
          v-model="input.LastName"
          placeholder="Last Name"
        />
        <input
          required
          type="text"
          name="phonenumber"
          v-model="input.phoneNo"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="email"
          v-model="input.Email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          v-model="input.password"
          placeholder="New Password"
        />


        <button type="button" v-on:click="addModel()">Add</button>
        <button type="button" v-on:click="addModelToggle()">Cancel</button>
      </div>
      <div v-else>
        <button type="button" v-on:click="addModelToggle()">
          Add New Model
        </button>
      </div>
    </div>
    <div v-for="model in this.Models" :key="model.firstName">
      <div>
        {{
          model.firstName +
          " " +
          model.lastName +
          " email: " +
          model.email +
          " Model id: " +
          model.efModelId +
          " Account id: " +
          model.efAccountId
        }}
        <button type="button" v-on:click="deleteModel(model.efModelId)">
          Delete Model
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../Store/Store.js";
export default {
  name: "Model",
  data() {
    return {
      input: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        AddresLine1: "",
        AddresLine2: "",
        Zip: "",
        City: "",
        Country: "",
        BirthDate: "",
        Nationality: "",
        Height: 0,
        ShoeSize: 0,
        HairColor: "",
        EyeColor: "",
        Comments: "",
        Password: ""
      },
      Models: [],
    };
  },
  store,
  updated: function () {
    this.$nextTick(this.GetModels());
  },
  methods: {
    async GetModels () {
      if (this.$store.state.LoggedIn & this.$store.state.ModelHasChanged) {
        this.$store.commit("ModelHasChangedFalse");
        let url = "https://localhost:44368/api/Models";
        try {
          let response = await fetch(url, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
          });
          if (response.ok) {
            this.Models = await response.json();
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
    async addModel() {
      let url = "https://localhost:44368/api/Models";
      try {
        let obj = {
            firstName: "string",
            lastName: "string",
            email: "string",
            phoneNo: "string",
            addresLine1: "string",
            addresLine2: "string",
            zip: "string",
            city: "string",
            country: "string",
            birthDate: "2021-05-19T17:29:24.364Z",
            nationality: "string",
            height: 0,
            shoeSize: 0,
            hairColor: "string",
            eyeColor: "string",
            comments: "string",
            password: "string"
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
          this.$store.commit("ModelHasChangedTrue");
          this.addModelToggle();
          this.input.firstName = "";
          this.input.lastName = "";
          this.input.email = "";
          this.input.password = "";
          alert("Model has been added!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    async deleteModel(id) {
      let url = "https://localhost:44368/api/Models/" + id;
      try {
        let response = await fetch(url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          this.$store.commit("ModelHasChangedTrue");
          this.GetModels();
          alert("Model has been deleted!");
          //Change view to some other component// ...
        } else {
          alert("Server returned: " + response.statusText);
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
    addModelToggle() {
      this.$store.commit("ToggleAddModel");
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

