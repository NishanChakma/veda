<template>
  <button class="button-style" @click="buttonClick">{{ title }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    buttonClick() {
      console.log("clicked");
    },
  },
};
</script>
