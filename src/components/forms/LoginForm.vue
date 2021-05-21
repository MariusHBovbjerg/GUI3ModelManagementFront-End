<template>
  <section class="loginform">
    <p>Please enter your email and password to login</p>
    <b-form-input
      :state="emailState"
      v-on:update="emailState=null"
      class="text-center"
      v-model="form.email"
      type="text"
      placeholder="Email"
    />
    <b-form-input
      :state="passwordState"
      class="text-center"
      v-on:update="passwordState=null"
      v-model="form.password"
      type="password"
      placeholder="Password"
    />
    <b-button class="loginbutton" v-on:click="login">Log in</b-button>
  </section>
</template>

<script>
import { API_URL } from "../../globals";
import router from "../../router/index";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        oldPassword: "",
      },
      emailState:null,
      passwordState:null
    };
  },
  methods: {
    async login() {
      if ((this.form.email === "") | (this.form.password === "")) {
        this.emailState=false;
        this.passwordState=false;
        return;
      }
      let url = API_URL + "api/Account/login";
      try {
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.form), // Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          let claimkey =
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
          let idkey =
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
          let token = await response.json();
          localStorage.setItem("token", token.jwt);
          let jwt = this.parseJwt(token.jwt);
          localStorage.setItem("claim", jwt[claimkey]);
          localStorage.setItem("id", jwt[idkey]);
          localStorage.setItem("modelid", jwt["ModelId"]);
          if(jwt[claimkey]=="Manager"){
            
          router.push("/manager");
          return;
          }else if(jwt[claimkey]=="Model"){
          
          router.push("/model");
          return;
          }
        } else {
          this.emailState=false;
          this.passwordState=false;
          console.log("Invalid Password.");
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style scoped>
.loginform {
  width: 30rem;
  margin: auto;
  margin-top: -1rem;
  margin-bottom: 0.5rem;
}

.loginbutton {
  margin: 0.5rem;
}
</style>
