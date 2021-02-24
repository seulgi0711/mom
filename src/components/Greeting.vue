<template>
  <div class="greeting-wrapper">{{ greetingByTime }}</div>
</template>

<script>
import { within } from '@/utils/number';
import { always, cond } from 'ramda';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Greeting',
  computed: {
    ...mapGetters(['currentHours']),
    greetingByTime() {
      return cond([
        [within(0, 5), always('Hello!')],
        [within(6, 11), always('Good Morning!')],
        [within(12, 17), always('Good Afternoon!')],
        [within(18, 20), always('Good Evening!')],
        [within(21, 24), always('Good Night!')],
      ])(this.currentHours);
    },
  },
});
</script>

<style scoped>
.greeting-wrapper {
  font-size: 3em;
  font-weight: 500;
}
</style>
