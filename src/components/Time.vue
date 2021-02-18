<template>
  <div class="time-wrapper">Current Time: {{ formattedCurrentTime }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Time',
  computed: {
    ...mapGetters(['formattedCurrentTime'])
  }
});
</script>

<style>
.time-wrapper {
  display: flex;
}
</style>
