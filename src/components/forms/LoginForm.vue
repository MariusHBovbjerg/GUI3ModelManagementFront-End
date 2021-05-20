<template>
  <section>
    <input v-model="form.email" type="text" placeholder="Email"/>
    <input v-model="form.password" type="password" placeholder="Password"/>
    <button v-on:click="login">Log in</button>
  </section>
</template>

<script>
import { API_URL } from "../../globals";
import router from "../../router/index";

export default{
  name:"Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        oldPassword: "",
      },
    };
  },
  methods: {
    async login() {
      if ((this.form.email === "") | (this.form.password === "")) {
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
          router.push("/");
        } else {
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
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
  },
};
</script>
