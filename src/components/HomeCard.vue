<template>
  <div class="container_card">
    <v-swipeout
      :autoClose="true"
      :right="[
        {
          text: 'cancel',
          onPress: cancelBtn,
          style: { backgroundColor: '#534A99', color: 'white' },
        },
        {
          text: 'delete',
          onPress: deleteBtn,
          style: { backgroundColor: 'red', color: 'white' },
        },
      ]"
    >
      <div class="home-card-container">
        <div class="home-card">
          <p class="big-font text-bold">{{ title }}</p>
          <p class="small-font small-text-color">
            {{ description }}
          </p>
          <div class="home-card-flex">
            <img src="../assets/calendar.png" class="card-image" />
            <p class="date">{{ date }}</p>
            <img src="../assets/watch.png" class="card-image" />
            <p class="time">{{ time }}</p>
          </div>
        </div>
        <div
          class="circle"
          @click="$emit('showModalWithType', id, date, time)"
        ></div>
      </div>
    </v-swipeout>
  </div>
</template>

<script>
import VSwipeout from "v-swipeout";
export default {
  name: "HomeCard",
  props: {
    title: String,
    description: String,
    date: String,
    time: String,
    id: Number,
  },
  methods: {
    deleteBtn() {
      this.$store.commit("deleteData", this.id);
    },
    cancelBtn() {
      console.log("cancel");
    },
  },
  components: {
    VSwipeout,
  },
};
</script>
