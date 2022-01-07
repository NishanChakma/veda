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
          <p class="big-font text-bold">Online group discussion</p>
          <p class="small-font small-text-color">
            Have a meeting with my friends
          </p>
          <div class="home-card-flex">
            <img src="../assets/calendar.png" class="card-image" />
            <p class="date">Today</p>
            <img src="../assets/watch.png" class="card-image" />
            <p class="time">12.30PM</p>
          </div>
        </div>
        <div class="circle" @click="$emit('showModalWithType')"></div>
      </div>
    </v-swipeout>
  </div>
</template>

<script>
import VSwipeout from "v-swipeout";
export default {
  name: "HomeCard",
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    deleteBtn() {
      console.log("delete");
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
