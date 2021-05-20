<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>



      <span v-if="getClaim() == 'Manager'"> | </span>
      <router-link v-if="getClaim() == 'Manager'" to="/manager">Manager Page</router-link>
      <span> | </span>


      <router-link v-if="!isLoggedIn()" to="/login">Log in</router-link>

      <span v-else>
        <router-link to="/changepass">Change Password</router-link> 
        <span v-if="isLoggedIn()"> | </span>
        <a class="nav"  v-on:click="logout()">Log Out</a>
      </span>

    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import router from './router/index';
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter
export default {
  name: "app",
  methods:{
    isLoggedIn(){
      return localStorage.getItem('token');
    },
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('claim');
      localStorage.removeItem('id');
      this.$forceUpdate();
      router.push("/").catch(failure =>{
        if(isNavigationFailure(failure,NavigationFailureType.duplicated)){
          return;
        }
      })
      return;
    },
    getClaim(){
      return localStorage.getItem("claim");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a{
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}
#nav a:hover{
  color: #42b983;
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
