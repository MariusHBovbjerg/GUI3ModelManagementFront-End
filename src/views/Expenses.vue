<template>
  <div>
    <ExpenseForm :AddedModelCallback="fetchData"/>
    <b-dropdown class="dropdown" size="md" text="All expenses">
      <b-dropdown-item active-class="active" class="dropdown" size="md" v-for="(item, key) in expenses" :key="key" >
      Date: {{ new Date(item.date).toDateString() }} Reason: {{ item.text }} Amount: {{ item.amount }} dkk
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { API_URL } from "../globals";
import ExpenseForm from "../components/forms/ExpenseForm"
import Vue from "vue";
export default Vue.extend({
  name: "ExpensesView",
  components: {
    ExpenseForm
  },
  data() {
    return {
      expenses: {},
    };
  },
  async beforeMount() {
    await this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    async fetchData() {
      this.expenses = await this.getExpenses();
    },
    async getExpenses() {
      let url = API_URL + "api/Expenses/model/" + localStorage.getItem('modelid');
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
        if (response.ok) {
          return await response.json();
        } else {
          alert("error");
        }
      } catch (err) {
        alert("Error: " + err);
      }

      return;
    },
  },
});
</script>

<style scoped>
.rightfloat {
  float: right;
}

.dropdown {
    min-width: 15rem;
}
</style>