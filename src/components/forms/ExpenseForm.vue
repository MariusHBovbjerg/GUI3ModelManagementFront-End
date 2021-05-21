<template>
  <section class="expenseform">
    <label for="jobid">Job Id</label>
    <b-form-input id="jobid" v-model="form.jobId" type="number" placeholder="Job number" />
    
    <label for="jobid">Date</label>
    <b-form-input
      v-model="form.date"
      type="datetime-local"
      placeholder="date"
    />
    
    <label for="jobid">Reason</label>
    <b-form-input v-model="form.text" type="text" placeholder="Reason" />
    
    <label for="jobid">Amount</label>
    <b-form-input v-model="form.amount" type="text" placeholder="amount" />
    <b-button class="expensebutton" v-on:click="addExpense">Add Expense</b-button>
  </section>
</template>

<script>
import { API_URL } from "../../globals";

export default {
  name: "ExpenseForm",
  props: [ 'AddedModelCallback'],
  data() {
    return {
      form: {
        modelId: localStorage.getItem('modelid'),
        jobId: 0,
        date:"",
        text: "",
        amount: 0,
      },
    };
  },
  methods: {
    async addExpense() {
      if ((this.form.jobId === 0) | (this.form.amount === "") | (this.form.text === "") | (this.form.date === "")) {
        return;
      }
      let url = API_URL + "api/Expenses";
      try {
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.form), // Assumes data is in an object called form
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
            console.log("Expense added");
            this.form.jobId = 0;
            this.form.  date = "";
            this.form.text = "";
            this.form.amount = 0;
            this.AddedModelCallback();
        }
        else {
          console.log("Failed to add expense");
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    }
  },
};
</script>

<style scoped>
.expenseform {
  width: 30rem;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.expensebutton {
  margin: 0.5rem;
}
</style>
