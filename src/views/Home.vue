<template>
  <div>
    <Toast v-if="$store.state.showToast" />
    <Header />
    <Card />
    <div class="input_home_container">
      <input type="text" class="input color" placeholder="Find your tasks" />
      <img src="../assets/search.png" class="input_img" />
    </div>
    <div class="flex-row">
      <Button title="Todo" />
      <Button title="completed" />
    </div>
    <ul class="no-bullets">
      <li v-for="item in allTasks" :key="item.id">
        <HomeCard
          @showModalWithType="showModalWithType"
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
      <div
        class="bottom-child"
        @click="
          showModal = true;
          modalType = 0;
        "
      >
        <img src="../assets/plus.png" class="plus" />
        <p class="bottom-text">Add Task</p>
      </div>
    </div>
    <transition name="modal">
      <div v-if="showModal" @close="showModal = false">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <AddTask @closeModal="showModal = false" :modalType="modalType" />
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
import Button from "../components/Button.vue";
import HomeCard from "../components/HomeCard.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  components: {
    Toast,
    Header,
    Card,
    Button,
    HomeCard,
    AddTask,
  },
  data() {
    return {
      showToast: true,
      showModal: false,
      modalType: 0, //addTask = 0 and editTask = 1
    };
  },
  computed: {
    allTasks() {
      return JSON.parse(JSON.stringify(this.$store.state.allTasks));
    },
  },
  methods: {
    showModalWithType() {
      // console.log("11111111111111111111111", this.allTasks);
      this.showModal = true;
      this.modalType = 1;
    },
  },
};
</script>
