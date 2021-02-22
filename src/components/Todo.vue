<template>
  <div>오늘 뭐하실래요?</div>
  <input v-model="todo" @keydown.enter="handleEnter" autofocus />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Todo',
  data() {
    return {
      todo: '',
    };
  },
  methods: {
    handleEnter() {
      console.log(this.todo);
      this.todo = '';
    },
  },
});
</script>

<style></style>
