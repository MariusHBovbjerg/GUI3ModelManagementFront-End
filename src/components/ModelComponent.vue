<template>
  <div id="model">
    <h2>Models</h2>
    <div>
      <div v-if="$store.state.AddingNewModel" class="molrow">
        <b-form-input
          class="text-center molform"
          required
          type="text"
          name="Firstname"
          v-model="input.FirstName"
          placeholder="First Name"
        />
        <b-form-input
          class="text-center molform"
          required
          type="text"
          name="Lastname"
          v-model="input.LastName"
          placeholder="Last Name"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="email"
          v-model="input.Email"
          placeholder="Email"
        />
        <b-form-input
          class="text-center molform"
          required
          type="text"
          name="phonenumber"
          v-model="input.PhoneNo"
          placeholder="Phone Number"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="addresLine1"
          v-model="input.AddresLine1"
          placeholder="AddresLine1"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="addresLine2"
          v-model="input.AddresLine2"
          placeholder="AddresLine2"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="zip"
          v-model="input.Zip"
          placeholder="Zip"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="city"
          v-model="input.City"
          placeholder="City"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="country"
          v-model="input.Country"
          placeholder="Country"
        />
        <b-form-input
          class="text-center molform"
          type="datetime-local"
          name="date"
          v-model="input.BirthDate"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="nationality"
          v-model="input.Nationality"
          placeholder="Nationality"
        />
        <b-form-input
          class="text-center molform"
          type="number"
          name="height"
          v-model="input.Height"
        />
        <b-form-input
          class="text-center molform"
          type="number"
          name="shoeSize"
          v-model="input.ShoeSize"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="hairColor"
          v-model="input.HairColor"
          placeholder="Hair Color"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="eyeColor"
          v-model="input.EyeColor"
          placeholder="Eye Color"
        />
        <b-form-input
          class="text-center molform"
          type="text"
          name="comments"
          v-model="input.Comments"
          placeholder="Comments"
        />
        <b-form-input
          class="text-center molform"
          type="password"
          name="password"
          v-model="input.Password"
          placeholder="Password"
        />
        <b-button class="manbutton" type="b-button" v-on:click="addModel()"
          >Confirm</b-button
        >
        <b-button
          class="manbutton"
          type="b-button"
          v-on:click="addModelToggle()"
          >Cancel</b-button
        >
      </div>
      <div v-else>
        <b-button
          class="AddManButton"
          type="b-button"
          v-on:click="addModelToggle()"
        >
          Add New Model
        </b-button>
      </div>
    </div>
    <b-container>
      <b-row>
        <b-col v-for="model in this.Models" :key="model.firstName">
          <ModelCard
            class="molCard"
            :efModelId="model.efModelId"
            :efAccountId="model.efAccountId"
            :account="model.account"
            :firstName="model.firstName"
            :lastName="model.lastName"
            :email="model.email"
            :phoneNo="model.phoneNo"
            :addresLine1="model.addresLine1"
            :zip="model.zip"
            :city="model.city"
            :country="model.country"
            :birthDate="model.birthDate"
            :nationality="model.nationality"
            :height="model.height"
            :shoeSize="model.shoeSize"
            :hairColor="model.hairColor"
            :eyeColor="model.eyeColor"
            :comments="model.comments"
            :Jobs="model.jobModels"
            :Expenses="model.Expenses"
            :deleteModel="deleteModel"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API_URL } from "./../globals";
import store from "../Store/Store.ts";
import ModelCard from "./cards/ModelCard.vue";
export default {
  name: "ModelComponent",
  components: { ModelCard },
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
        Password: "",
      },
      Models: [],
    };
  },
  store,
  updated: function() {
    this.GetModels();
  },
  created() {
    this.RefreshModelState();
  },
  watch: {
    $route: "RefreshModelState",
  },
  methods: {
    RefreshModelState() {
      this.$store.commit("ModelHasChangedTrue");
      this.GetModels();
    },
    async GetModels() {
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
          password: this.input.Password,
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

<style scoped>
.molCard {
  margin: auto;
  min-width: 15rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.molrow {
  margin: auto;
  width: 30rem;
  margin-bottom: 1rem;
}

.molbutton {
  margin-top: 1rem;
}
.AddmolButton {
  margin: 1rem;
}
</style>