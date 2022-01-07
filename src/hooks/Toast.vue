<template>
  <div class="toast-wrapper">
    <div class="toast">{{ $store.state.toastText }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  mounted() {
    setTimeout(() => this.$store.commit("triggerToast"), 2500);
  },
};
</script>
