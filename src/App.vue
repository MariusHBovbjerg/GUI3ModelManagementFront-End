<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="getClaim() == 'Manager'" to="/manager">Manager Page</router-link>
      <router-link v-else-if="getClaim() == 'Model'" to="/model">Model Page</router-link>
      <span v-if="isLoggedIn()"> | </span>


      <router-link v-if="!isLoggedIn()" to="/login">Log in</router-link>

      <span v-else>
        <router-link to="/changepass">Change Password</router-link> 
        <span v-if="isLoggedIn()"> | <a v-on:click="logout()">Log Out</a> </span>
        
      </span>

    </div>
    <router-view />
  </div>
</template>

<script>
import router from './router/index';
const { isNavigationFailure, NavigationFailureType } = router
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
      if(localStorage.getItem('modelid')){
        localStorage.removeItem("modelid");
      }
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
  font-family: 'Courier New', Courier, monospace;
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
