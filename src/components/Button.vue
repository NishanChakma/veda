<template>
  <button class="button-style" type="submit">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
  },
};
</script>
