<template>
  <div id="app">
    <login-component/>
    <manager-component/>
    <model-component/>
    <job-component/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import JobComponent from './components/JobComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import ManagerComponent from './components/ManagerComponent.vue';
import ModelComponent from './components/ModelComponent.vue';

@Component({
  components: {
    LoginComponent,
    ManagerComponent,
    ModelComponent,
    JobComponent,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
