<template>
  <div class="app-wrapper">
    <Bg />
    <div class="contents">
      <template v-if="hasAuth">
        <div class="leftside-wrapper">
          <Time />
          <Greeting />
        </div>
        <div class="rightside-wrapper">
          <Todo />
          <Saying />
        </div>
      </template>
      <Login v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/global.css';
import { onMounted, watch } from 'vue';
import Greeting from '@/components/Greeting.vue';
import Time from '@/components/Time.vue';
import Bg from '@/components/Bg.vue';
import Saying from '@/components/Saying.vue';
import Todo from '@/components/Todo.vue';
import Login from '@/components/Login.vue';
import useTime from './hooks/useTime';
import useAuth from './hooks/useAuth';

const { api, hasAuth } = useAuth();
const { initTimeInterval } = useTime();

onMounted(() => {
  api.fetchUsername();
  initTimeInterval();
});
</script>

<style scoped lang="scss">
.app-wrapper {
  width: 100vw;
  height: 100vh;
}

.contents {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(128, 128, 128, 0) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );

  > * {
    flex: 1;
  }
}

.leftside-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
}

.rightside-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}
</style>
