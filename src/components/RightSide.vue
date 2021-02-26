<template>
  <div class="rightside-wrapper"><Todo /> <Saying /></div>
</template>

<script lang="ts" setup>
import Saying from '@/components/Saying.vue';
import Todo from '@/components/Todo.vue';
</script>

<style scoped>
.rightside-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}
</style>
