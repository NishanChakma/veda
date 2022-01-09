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
        <date-picker
          v-model="$store.state.date"
          value-type="YYYY-MM-DD"
          format="YYYY-MM-DD"
          :placeholder="$store.state.date"
        ></date-picker>
        <img src="../assets/watch.png" class="calender" />
        <date-picker
          v-model="$store.state.time"
          format="hh:mm a"
          value-type="format"
          type="time"
          :placeholder="$store.state.time"
        ></date-picker>
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "AddorEditTask",
  components: {
    Button,
    DatePicker,
  },
};
</script>
