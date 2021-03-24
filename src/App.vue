<template>
  <div class="app-wrapper">
    <Bg />
    <Weather />
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

<script lang="ts">
import Bg from '@/components/Bg.vue';
import Weather from '@/components/Weather.vue';
import Greeting from '@/components/Greeting.vue';
import Login from '@/components/Login.vue';
import Saying from '@/components/Saying.vue';
import Time from '@/components/Time.vue';
import Todo from '@/components/Todo.vue';
import * as storage from '@/effects/storage';
import '@/global.css';
import { pipe } from 'fp-ts/lib/function';
import { defineComponent, onMounted, watch } from 'vue';
import useAuth, { firebaseAuth } from './hooks/useAuth';
import useTime from './hooks/useTime';
import { mapIoOption } from './utils/fn';

export default defineComponent({
  name: 'App',
  components: {
    Bg,
    Weather,
    Greeting,
    Login,
    Saying,
    Time,
    Todo,
  },
  setup() {
    const { api, hasAuth, isLoading } = useAuth();
    const { initTimeInterval } = useTime();

    onMounted(() => {
      initTimeInterval();
    });

    const signInWithEmailLink = () => {
      if (firebaseAuth.isSignInWithEmailLink(location.href)) {
        pipe(
          storage.getItem('emailForSignIn'),
          mapIoOption(api.signInWithEmailLink),
        )();
      }
    };

    const disposer = watch([isLoading, hasAuth], ([isLoading, hasAuth]) => {
      if (!isLoading) {
        if (hasAuth) {
          disposer();
        } else {
          signInWithEmailLink();
        }
      }
    });

    return {
      hasAuth,
    };
  },
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
