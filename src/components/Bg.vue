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
  // const { color, urls } = await api.fetchBgUrl();
  // background.value = `center / cover no-repeat url("${urls.full}"), ${color}`;
  background.value = `center / cover no-repeat url("https://images.unsplash.com/photo-1615779912133-c503e7c3a43a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMDk0NTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTU5NjU4NDE&ixlib=rb-1.2.1&q=85"), rgb(64, 115, 115)`;
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
