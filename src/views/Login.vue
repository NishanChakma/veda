<template>
  <div id="auth">
    <Toast v-if="$store.state.showToast" />
    <img alt="bg logo" src="../assets/bg.png" class="bgImage" />
    <img alt="app logo" src="../assets/app-logo.png" class="logo" />
    <form class="form_container" @submit="$store.commit('loginHandle', $event)">
      <div class="input_container">
        <input
          required
          type="email"
          class="input"
          v-model="$store.state.email"
          placeholder="Email"
        />
        <img src="../assets/mail.png" class="input_img" />
      </div>
      <div class="input_container">
        <input
          required
          type="password"
          class="input"
          v-model="$store.state.password"
          placeholder="Password"
          autocomplete="on"
        />
        <img src="../assets/password.png" class="input_img" />
      </div>
      <span v-if="$store.state.error">
        <p class="errorText">{{ $store.state.errorText }}</p>
      </span>
      <span v-if="$store.state.loading">
        <p class="loadingText">Loading...</p>
      </span>
      <div class="input_container">
        <button class="button" type="submit">Login</button>
      </div>
    </form>
    <div class="last_text">
      <h3 class="left_text">Don't have an account?</h3>
      <h3 class="right_text" @click="gotoRegistration">SIGN UP</h3>
    </div>
  </div>
</template>

<script>
import Toast from "../hooks/Toast.vue";
export default {
  name: "Login",
  components: {
    Toast,
  },
  methods: {
    gotoRegistration() {
      this.$store.commit("clearField");
      this.$router.replace({ name: "register" });
    },
  },
};
</script>
