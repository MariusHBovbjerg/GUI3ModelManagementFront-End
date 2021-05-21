<template>
<div class="card col-sm">
    <div class="text">
      {{ firstName + " " + lastName }}
    </div>

    <div>
      {{" email: " + email }}
    </div>
    <div>
      <b-button class="cardButton" type="b-button" v-on:click="deleteManager(efManagerId)">
        Delete Model
      </b-button>
    </div>
  </div>

</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    efModelId: Number,
    efAccountId: Number,
    account: Object,
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: String,
    addresLine1: String,
    zip: String,
    city: String,
    country: String,
    birthDate: String,
    nationality: String,
    height: Number,
    shoeSize: Number,
    hairColor: String,
    eyeColor: String,
    comments: String,
    Jobs: Object,
    Expenses: Object,
    deleteModel: {
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