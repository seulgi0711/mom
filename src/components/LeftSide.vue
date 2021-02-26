<template>
  <div class="leftside-wrapper">
    <Time />
    <Greeting />
  </div>
</template>

<script lang="ts" setup>
import Greeting from '@/components/Greeting.vue';
import Time from '@/components/Time.vue';
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
