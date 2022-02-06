<template>
    <div>
        <ManagerComponent/>
        <ModelComponent/>
        <JobComponent/>
    </div>
</template>

<script>
// @ is an alias to /src
import ManagerComponent from '../components/ManagerComponent';
import ModelComponent from '../components/ModelComponent';
import JobComponent from '../components/JobComponent';
export default {
    name: "ManagerView",
    components: {
        ManagerComponent,
        ModelComponent,
        JobComponent,
  }
}
</script>