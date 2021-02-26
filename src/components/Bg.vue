<template>
  <div class="bg-wrapper" :style="wrapperStyle"></div>
</template>

<script lang="ts" setup>
import * as api from '@/effects/api';
import { computed, onMounted, ref } from 'vue';

const background = ref('');
const wrapperStyle = computed(() => ({
  background: background.value,
}));

async function fetchBackground() {
  const { color, urls } = await api.fetchBgUrl();
  background.value = `center / cover no-repeat url("${urls.full}"), ${color}`;
}

onMounted(() => {
  fetchBackground();
});
</script>

<style scoped>
.bg-wrapper {
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
