<template>
  <div class="time-wrapper">{{ formattedCurrentTime }}</div>
</template>

<script lang="ts" setup>
import useTime from '@/hooks/useTime';

const { formattedCurrentTime } = useTime();
</script>

<style scoped>
.time-wrapper {
  font-size: 10em;
  font-weight: bold;
}
</style>
