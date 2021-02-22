<template>
  <div class="time-wrapper">{{ formattedCurrentTime }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Time',
  computed: {
    ...mapGetters(['formattedCurrentTime']),
  },
});
</script>

<style>
.time-wrapper {
  font-size: 10em;
  font-weight: bold;
}
</style>
