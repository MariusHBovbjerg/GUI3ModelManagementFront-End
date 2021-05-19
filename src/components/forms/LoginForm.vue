<template>
  <section>
    <input v-model="form.email" type="text" />
    <input v-model="form.password" type="password" />
    <button v-on:click="login">Log in</button>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { API_URL } from "../../globals";
export default defineComponent({
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
          let token = await response.json();
          localStorage.setItem("token", token.jwt);
          //TODO Change view to some other component?
          // success
        } else {
          console.log("Server returned: ", response.statusText);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    },
  },
});
</script>
