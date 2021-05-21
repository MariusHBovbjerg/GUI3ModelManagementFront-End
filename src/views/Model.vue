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
  components: {
      JobComponent,
      Expenses
  }
}
</script>
