<template>
  <div class="saying-wrapper">"{{ currnetSaying }}"</div>
</template>

<script lang="ts" setup>
import useSayings from '@/hooks/useSayings';

const { currnetSaying } = useSayings();
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
