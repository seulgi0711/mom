<template>
  <div class="time-wrapper">{{ formattedCurrentTime }}</div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore();
const formattedCurrentTime = computed(() => store.getters.formattedCurrentTime);
</script>

<style scoped>
.time-wrapper {
  font-size: 10em;
  font-weight: bold;
}
</style>
