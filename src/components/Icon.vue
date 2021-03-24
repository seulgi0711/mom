<template>
  <font-awesome-icon :icon="['fal', 'user-secret']" />
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      iconName: computed(() => `fas  ${props.name}`),
    };
  },
});
</script>
