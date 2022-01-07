<template>
  <div>
    <img
      src="../assets/close.png"
      class="close_button"
      @click="$emit('closeModal')"
    />
    <p>{{ header }}</p>
    <input type="text" class="title" v-model="title" placeholder="Title" />
    <textarea
      type="text"
      class="titleDescription"
      v-model="shortDescription"
      placeholder="Short description"
      maxlength="250"
    />
    <div class="date_container">
      <img src="../assets/calendar.png" class="calender" />
      <p v-if="modalType === 0" class="date_text">Due date</p>
      <p v-if="modalType === 1" class="date_text">Today</p>
      <img v-if="modalType === 1" src="../assets/watch.png" class="calender" />
      <p v-if="modalType === 1" class="time_text">12.30 PM</p>
    </div>
    <Button
      :title="buttonText"
      :style="{ backgroundColor: '#534a99', color: '#fff' }"
    />
  </div>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  name: "AddTask",
  components: {
    Button,
  },
  props: {
    modalType: {
      type: Number,
    },
  },
  data() {
    return {
      header: this.modalType === 0 ? "Add your task" : "Edit your task",
      title: "",
      shortDescription: "",
      buttonText: this.modalType === 0 ? "Add" : "Update",
    };
  },
};
</script>
