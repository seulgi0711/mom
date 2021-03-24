<template>
  <div class="todo-wrapper">
    <div class="description">
      What is your main focus for today?
    </div>
    <template v-if="hasTodo">
      <div class="todo">
        <div class="todo-content" :class="{ done: todo.done }">
          {{ todo.content }}
        </div>
        <input
          class="todo-checkbox"
          type="checkbox"
          :checked="todo.done"
          @change="handleChangeDone"
        />
      </div>
    </template>
    <input
      class="todo-input"
      v-model="todoInputValue"
      @keydown.enter="handleEnter"
      autofocus
      v-else
    />
  </div>
</template>

<script lang="ts">
import useTodo from '@/hooks/useTodo';
import { pipe } from 'fp-ts/lib/function';
import { assoc } from 'ramda';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Todo',
  setup() {
    const todoInputValue = ref('');
    const { api, hasTodo, todo } = useTodo();

    const handleEnter = () => {
      api.setTodo({ content: todoInputValue.value, done: false });
      todoInputValue.value = '';
    };

    const handleChangeDone = () => {
      api.setTodo(assoc('done', !todo.done, todo));
    };

    onMounted(api.fetchTodo);

    return {
      hasTodo,
      todo,
      todoInputValue,
      handleEnter,
      handleChangeDone,
    };
  },
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover &-checkbox {
    visibility: visible;
  }

  &-content {
    flex: 1;
    padding: 0 25px;

    &.done {
      text-decoration: line-through;
    }
  }

  &-checkbox {
    visibility: hidden;
    position: absolute;
    right: 0;
    transform: scale(1.5);
  }
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
