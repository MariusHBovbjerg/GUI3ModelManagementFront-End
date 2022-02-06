<template>
    <div>
        <JobComponent/>
        <Expenses/>
    </div>
</template>

<script>
import JobComponent from '../components/JobComponent';
import Expenses from './Expenses';
export default {
    name: "ModelView",
    components: {
        JobComponent,
        Expenses
  }
}
</script>