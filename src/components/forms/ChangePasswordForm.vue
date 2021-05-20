<template>
  <section>
      <input v-model="form.email" type="text" placeholder="Email"/>
      <input v-model="form.password" type="password" placeholder="New Password"/>
      <input v-model="form.oldPassword" type="password" placeholder="Old Password"/>
      <button v-on:click="changePassword">Change Password</button>
  </section>
</template>

<script>
import {API_URL} from "../../globals";
import router from "../../router/index";
export default{
  name:"ChangePassword",
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
    async changePassword() {
      let url = API_URL + "api/Account/Password";
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
          console.log("Unacceptable input.");
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
  },
};
</script>
