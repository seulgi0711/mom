<template>
  <div class="wrapper">
    <template v-if="isLoading">
      로딩중...
    </template>
    <template v-else>
      <div>
        <div class="status">{{ status }}</div>
        <div class="city">{{ weather.name }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import useWeather from '@/hooks/useWeather';
import { isNil } from 'ramda';
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Weather',
  setup() {
    const { api, status, weather } = useWeather();
    const isLoading = computed(() => isNil(weather.value));

    onMounted(api.fetchWeather);

    return { isLoading, status, weather };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  right: 10px;
  top: 10px;
  color: #fff;
  z-index: 1;
}

.status {
  font-size: 1.5em;
  text-align: center;
}

.city {
  color: rgba(255, 255, 255, 0.6);
}
</style>
