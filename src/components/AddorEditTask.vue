<template>
  <div>
    <img
      src="../assets/close.png"
      class="close_button"
      @click="$emit('closeModal')"
    />
    <p>{{ $store.state.header }}</p>
    <form
      class="form_container"
      @submit="$store.commit('addOrEditData', $event)"
    >
      <input
        type="text"
        class="title"
        v-model="$store.state.title"
        placeholder="Title"
        required
      />
      <textarea
        type="text"
        class="titleDescription"
        v-model="$store.state.shortDescription"
        placeholder="Short description"
        maxlength="250"
        required
      />
      <div class="date_container">
        <img src="../assets/calendar.png" class="calender" />
        <p v-if="$store.state.modalType === 0" class="date_text">Due date</p>
        <p v-if="$store.state.modalType === 1" class="date_text">Today</p>
        <img
          v-if="$store.state.modalType === 1"
          src="../assets/watch.png"
          class="calender"
        />
        <p v-if="$store.state.modalType === 1" class="time_text">12.30 PM</p>
      </div>
      <Button
        :title="$store.state.buttonText"
        :style="{ backgroundColor: '#534a99', color: '#fff' }"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "AddorEditTask",
  components: {
    Button,
  },
  data() {
    return {
      input: "",
    };
  },
};
</script>
