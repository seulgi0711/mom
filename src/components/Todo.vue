<template>
  <div class="todo-wrapper">
    <div class="description">What is your main focus for today?</div>
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
import { useStore } from '@/store';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const todoInputValue = ref('');
const todo = computed(() => store.state.todo);
const hasTodo = computed(() => todo.value !== '');
const getTodo = () => store.dispatch('getTodo');
const setTodo = (value: string) => store.dispatch('setTodo', value);

function handleEnter() {
  setTodo(todoInputValue.value);
  todoInputValue.value = '';
}

onMounted(() => {
  getTodo();
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
