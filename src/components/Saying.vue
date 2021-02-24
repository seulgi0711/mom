<template>
  <div class="saying-wrapper">"{{ satying }}"</div>
</template>

<script>
import { defineComponent } from 'vue';
import { randomRange } from '@/utils/random';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'Saying',
  data() {
    return {
      index: -1,
    };
  },
  created() {
    this.index = randomRange(0, this.sayings.length - 1);
  },
  computed: {
    ...mapState(['sayings']),
    satying() {
      return this.sayings[this.index];
    },
  },
});
</script>

<style scoped>
.saying-wrapper {
  margin-top: 1em;
  font-size: 1.5em;
  opacity: 0.5;
  position: absolute;
  right: 1em;
  bottom: 1em;
}
</style>
