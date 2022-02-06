<template>
  <section class="changepwdform">
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
      v-on:update="passwordState=null"
      class="text-center"
      v-model="form.password"
      type="password"
      placeholder="New Password"
    />
    <b-form-input
      :state="oldpasswordState"
      v-on:update="oldpasswordState=null"
      class="text-center"
      v-model="form.oldPassword"
      type="password"
      placeholder="Old Password"
    />
    <b-button class="changepwdbutton" v-on:click="changePassword">Change Password</b-button>
  </section>
</template>

<script>
import { API_URL } from "../../globals";
import router from "../../router/index";
export default {
  name: "ChangePasswordComponent",
  data() {
    return {
      form: {
        email: "",
        password: "",
        oldPassword: "",
      },
      emailState:null,
      passwordState:null,
      oldpasswordState:null
    };
  },
  methods: {
    async changePassword() {
      if ((this.form.email === "") | (this.form.password === "") | (this.form.oldpassword === "")) {
        this.emailState=false;
        this.passwordState=false;
        this.oldpasswordState=false;
        return;
      }
      
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
          this.emailState=false;
          this.passwordState=false;
          this.oldpasswordState=false;
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

<style scoped>
.changepwdform {
  width: 30rem;
  margin: auto;
  margin-top: -1rem;
  margin-bottom: 0.5rem;
}

.changepwdbutton {
  margin: 0.5rem;
}
</style>