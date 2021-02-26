<template>
  <div class="greeting-wrapper">{{ greetingByTime }}</div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { within } from '@/utils/number';
import { always, cond } from 'ramda';
import { computed } from 'vue';

const store = useStore();
const greetingByTime = computed(() => {
  return cond<number, string>([
    [within(0, 5), always('Hello!')],
    [within(6, 11), always('Good Morning!')],
    [within(12, 17), always('Good Afternoon!')],
    [within(18, 20), always('Good Evening!')],
    [within(21, 24), always('Good Night!')],
  ])(store.getters.currentHours);
});
</script>

<style scoped>
.greeting-wrapper {
  font-size: 3em;
  font-weight: 500;
}
</style>
