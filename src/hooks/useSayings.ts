import { randomRange } from '@/utils/random';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

export default function useSayings() {
  const sayings = ref([
    'Seeing is believing',
    'Whatever you do, make it pay.',
    'You will never know until you try.',
    'No sweat, no sweet.',
    'Let bygones be bygones.',
    'Do not count the eggs beore they hatch.',
    'Life is venture or nothing.',
    'She can do, he can do, why not me?',
    'Pain past is pleasure.',
    'Time is gold.',
    'Step by step goes a long way.',
  ]);

  const currnetSaying = computed(() => {
    const index = randomRange(0, sayings.value.length - 1);
    return sayings.value[index];
  });

  return { currnetSaying };
}
