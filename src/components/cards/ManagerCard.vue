<template>
    <div class="card">
      <div class="text">
        {{ firstName + " " + lastName }}
      </div>

      <div>
        {{ " email: " + email }}
      </div>
      <div>
        <b-button
          class="cardButton"
          type="b-button"
          v-on:click="deleteManager(efManagerId)"
        >
          Delete Manager
        </b-button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    efManagerId: Number,
    efAccountId: Number,
    account: Object,
    firstName: String,
    lastName: String,
    email: String,
    deleteManager: {
      required: true,
      type: Function as PropType<() => void>,
    },
  },
});
</script>
<style scoped>
.text{
  margin-top:0.3rem;
}
.card {
  margin: auto;
  background-color: ivory;
  min-width: 15rem;
}
.cardButton {
  background: crimson;
  margin-bottom:0.5rem;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
