<template>
  <div class="leftside-wrapper">
    <Time />
    <Greeting />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Greeting from '@/components/Greeting.vue';
import Time from '@/components/Time.vue';

export default defineComponent({
  name: 'LeftSide',
  components: {
    Greeting,
    Time,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.leftside-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
}
</style>
