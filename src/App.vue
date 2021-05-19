<template>
    <div id="app">
        <Login/>
        <Manager/>
        <Model/>
        <Job/>
    </div>
</template>

<script>
    import store from './Store/Store.js';
    import Login from './components/LoginComponent.vue';
    import Manager from './components/ManagerComponent.vue';
    import Model from './components/ModelComponent.vue';
    import Job from './components/JobComponent.vue';
    export default {
        name: 'app',
        store,
        components: {
            Login,
            Manager,
            Model,
            Job
        }
    };
</script>

<style>
</style>

