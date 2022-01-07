<template>
  <div id="auth">
    <img alt="bg logo" src="../assets/bg.png" class="bgImage" />
    <img alt="app logo" src="../assets/app-logo.png" class="logo" />
    <form class="form_container" @submit="$store.commit('register', $event)">
      <div class="input_container">
        <input
          required
          type="text"
          class="input"
          placeholder="Full name"
          v-model="$store.state.name"
        />
        <img src="../assets/user.png" class="input_img" />
      </div>
      <div class="input_container">
        <input
          required
          type="email"
          class="input"
          placeholder="Email"
          v-model="$store.state.email"
        />
        <img src="../assets/mail.png" class="input_img" />
      </div>
      <div class="input_container">
        <input
          required
          type="password"
          class="input"
          placeholder="Password"
          v-model="$store.state.password"
          autocomplete="on"
        />
        <img src="../assets/password.png" class="input_img" />
      </div>
      <div class="input_container">
        <input
          required
          type="password"
          class="input"
          placeholder="Confirm Password"
          v-model="$store.state.confirmPass"
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
        <button class="button" type="submit">Sign Up</button>
      </div>
    </form>
    <div class="last_text">
      <h3 class="left_text">Already have an account?</h3>
      <h3 class="right_text" @click="gotoLogin">LOGIN</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  methods: {
    async gotoLogin() {
      await this.$store.commit("clearField");
      this.$router.replace({ name: "login" });
    },
  },
};
</script>
