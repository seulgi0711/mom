<template>
  <div class="greeting-wrapper">
    {{ greetingByTime }} <span class="username">{{ username }}</span>
    <Icon name="fa-sign-out-alt" />
  </div>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';
import useAuth from '@/hooks/useAuth';
import useTime from '@/hooks/useTime';
import { within } from '@/utils/number';
import { pipe } from 'fp-ts/lib/function';
import { always, cond } from 'ramda';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Greeting',
  components: {
    Icon,
  },
  setup() {
    const { username } = useAuth();
    const { currentHours } = useTime();
    const greetingByTime = computed(() =>
      pipe(
        parseInt(currentHours.value),
        cond<number, string>([
          [within(0, 5), always('Hello!')],
          [within(6, 11), always('Good Morning!')],
          [within(12, 17), always('Good Afternoon!')],
          [within(18, 20), always('Good Evening!')],
          [within(21, 24), always('Good Night!')],
        ]),
      ),
    );

    return {
      username,
      greetingByTime,
    };
  },
});
</script>

<style scoped>
.greeting-wrapper {
  font-size: 3em;
  text-align: center;
}

.username {
  font-weight: bold;
}
</style>
