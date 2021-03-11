<template>
  <div class="login-wrapper">
    <div>Hello, what's your name?</div>
    <input
      class="login-input"
      v-model="inputValue"
      @keydown.enter="handleEnter"
    />
  </div>
</template>

<script lang="ts" setup>
import useAuth from '@/hooks/useAuth';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

const inputValue = ref('');
const { api, setUsername } = useAuth();

const handleEnter = () => {
  api.setUsername(inputValue.value);
  setUsername(inputValue.value);
  inputValue.value = '';
};

onMounted(api.fetchUsername);
</script>

<style lang="scss" scoped>
.login-wrapper {
  color: rgba(255, 255, 255, 0.9);
  font-size: 4em;
  font-weight: bold;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login-input {
  margin-top: 4em;
  outline: 0;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  box-shadow: none;
  width: 800px;
  font-size: 1em;

  &:focus {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
