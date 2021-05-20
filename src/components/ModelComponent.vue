<template>
  <div id="model">
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
          type="text"
          name="email"
          v-model="input.Email"
          placeholder="Email"
        />
        <input
          required
          type="text"
          name="phonenumber"
          v-model="input.PhoneNo"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="addresLine1"
          v-model="input.AddresLine1"
          placeholder="AddresLine1"
        />
        <input
          type="text"
          name="addresLine2"
          v-model="input.AddresLine2"
          placeholder="AddresLine2"
        />
        <input
          type="text"
          name="zip"
          v-model="input.Zip"
          placeholder="Zip"
        />
        <input
          type="text"
          name="city"
          v-model="input.City"
          placeholder="City"
        />
        <input
          type="text"
          name="country"
          v-model="input.Country"
          placeholder="Country"
        />
        <input
          type="datetime-local"
          name="date"
          v-model="input.BirthDate"
        />
        <input
          type="text"
          name="nationality"
          v-model="input.Nationality"
          placeholder="Nationality"
        />
        <input
          type="number"
          name="height"
          v-model="input.Height"
        />
        <input
          type="number"
          name="shoeSize"
          v-model="input.ShoeSize"
        />
        <input
          type="text"
          name="hairColor"
          v-model="input.HairColor"
          placeholder="Hair Color"
        />
        <input
          type="text"
          name="eyeColor"
          v-model="input.EyeColor"
          placeholder="Eye Color"
        />
        <input
          type="text"
          name="comments"
          v-model="input.Comments"
          placeholder="Comments"
        />
        <input
          type="password"
          name="password"
          v-model="input.Password"
          placeholder="Password"
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
import {API_URL} from "./../globals"
import store from "../Store/Store.ts";
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
  created() {
    this.RefreshModelState();
  },
  watch: {
    $route: 'RefreshModelState'
  },
  methods: {
    RefreshModelState() {
      this.$store.commit("ModelHasChangedTrue");
      this.GetModels();
    },
    async GetModels () {
      if (this.$store.state.ModelHasChanged) {
        this.$store.commit("ModelHasChangedFalse");
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
      let url = API_URL + "api/Models";
      try {
        let obj = {
            firstName: this.input.FirstName,
            lastName: this.input.LastName,
            email: this.input.Email,
            phoneNo: this.input.PhoneNo,
            addresLine1: this.input.AddresLine1,
            addresLine2: this.input.AddresLine2,
            zip: this.input.Zip,
            city: this.input.City,
            country: this.input.Country,
            birthDate: this.input.BirthDate,
            nationality: this.input.Nationality,
            height: this.input.Height,
            shoeSize: this.input.ShoeSize,
            hairColor: this.input.HairColor,
            eyeColor: this.input.EyeColor,
            comments: this.input.Comments,
            password: this.input.Password
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
      let url = API_URL + "api/Models/" + id;
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

