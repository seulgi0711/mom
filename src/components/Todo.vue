<template>
  <div class="todo-wrapper">
    <div class="description">
      What is your main focus for today?
    </div>
    <div class="todo" v-if="hasTodo">{{ todo }}</div>
    <input
      class="todo-input"
      v-else
      v-model="todoInputValue"
      @keydown.enter="handleEnter"
      autofocus
    />
  </div>
</template>

<script lang="ts" setup>
import useTime from '@/hooks/useTime';
import useTodo from '@/hooks/useTodo';
import { onMounted, ref } from 'vue';

const todoInputValue = ref('');
const { currentTime } = useTime();
const { api, hasTodo, setTodo, todo } = useTodo();

function handleEnter() {
  api.setTodo(currentTime.value, todoInputValue.value);
  todoInputValue.value = '';
}

onMounted(() => {
  api.fetchTodo();
});
</script>

<style scoped lang="scss">
.description {
  font-size: 2em;
  font-weight: bold;
}

.todo {
  width: 100%;
  margin-top: 1em;
  outline: 0;
  color: rgba(255, 255, 255, 1);
  font-size: 2em;
  text-align: center;
}

.todo-input {
  width: 100%;
  margin-top: 1em;
  outline: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 2em;
  text-align: center;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  box-shadow: none;

  &:focus {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
