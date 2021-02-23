<template>
  <div>{{ this.greetingByTime }}</div>
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
        [within(6, 12), always('Good Morning!')],
        [within(13, 18), always('Good Afternoon!')],
        [within(19, 21), always('Good Evening!')],
        [within(20, 24), always('Good Night!')],
      ])(this.currentHours);
    },
  },
});
</script>

<style></style>
