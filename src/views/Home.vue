<template>
  <div>
    <Toast v-if="$store.state.showToast" />
    <Header />
    <Card />
    <div class="input_home_container">
      <input
        type="text"
        class="input color"
        placeholder="Find your tasks"
        v-model="search"
      />
      <img src="../assets/search.png" class="input_img" />
    </div>
    <!-- <div class="flex-row">
      <Button title="Todo" />
      <Button title="completed" />
    </div> -->
    <ul class="no-bullets">
      <li v-for="item in allTasks" :key="item.id">
        <HomeCard
          @showModalWithType="showModalEditTask"
          :id="item.id"
          :title="item.title"
          :description="item.description"
          :date="item.date"
          :time="item.time"
        />
      </li>
    </ul>
    <div
      :class="
        allTasks.length >= 3 ? 'bottom-container' : 'bottom-container-position'
      "
    >
      <img src="../assets/bottom-bg.png" class="bottom-bg" />
      <div class="bottom-child" @click="showModalAddTask">
        <img src="../assets/plus.png" class="plus" />
        <p class="bottom-text">Add Task</p>
      </div>
    </div>
    <transition name="modal">
      <div
        v-if="$store.state.showModal"
        @close="$store.state.showModal = false"
      >
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <AddorEditTask @closeModal="$store.state.showModal = false" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Toast from "../hooks/Toast.vue";
import Header from "../components/Header.vue";
import Card from "../components/Card.vue";
// import Button from "../components/Button.vue";
import HomeCard from "../components/HomeCard.vue";
import AddorEditTask from "../components/AddorEditTask.vue";

export default {
  name: "Home",
  components: {
    Toast,
    Header,
    Card,
    // Button,
    HomeCard,
    AddorEditTask,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    allTasks() {
      return JSON.parse(JSON.stringify(this.$store.state.allTasks));
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(val) {
        this.$store.commit("searchHandle", val);
      },
    },
  },
  methods: {
    async showModalAddTask() {
      await this.$store.commit("addorEditModal", 0);
    },
    async showModalEditTask(id, date, time) {
      await this.$store.commit("addorEditModal", 1);
      await this.$store.commit("setTaskId", {
        id,
        date,
        time,
      });
    },
  },
};
</script>
