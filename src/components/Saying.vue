<template>
  <div class="saying-wrapper">"{{ saying }}"</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { randomRange } from '@/utils/random';
import { useStore } from '@/store';

const store = useStore();
const index = ref(-1);

const sayings = computed(() => store.state.sayings);
const saying = computed(() => sayings.value[index.value]);

onMounted(() => {
  index.value = randomRange(0, sayings.value.length - 1);
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
