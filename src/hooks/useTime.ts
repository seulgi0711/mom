import {
  getHours,
  getMinutes,
  getSeconds,
  getStartTimestampOfDay,
} from '@/utils/date';
import { padLeft } from '@/utils/pad';
import { delayed } from '@/utils/timer';
import { computed, ref } from '@vue/runtime-core';
import { pipe } from 'fp-ts/lib/function';
import { join, multiply, subtract, toString } from 'ramda';

const SECOND = 1000;
const MINUTE = SECOND * 60;

const currentTime = ref(new Date());

const today = computed(() => getStartTimestampOfDay(currentTime.value));

const currentHours = computed(() =>
  pipe(getHours(currentTime.value), toString, padLeft(2, '0')),
);

const currentMinutes = computed(() =>
  pipe(getMinutes(currentTime.value), toString, padLeft(2, '0')),
);

const formattedCurrentTime = computed(() => {
  return join(':', [currentHours.value, currentMinutes.value]);
});

const setCurrentTime = () => {
  currentTime.value = new Date();
};

const startTimeInterval = () => {
  setCurrentTime();
  setInterval(setCurrentTime, MINUTE);
};

const initTimeInterval = () => {
  pipe(
    getSeconds(currentTime.value),
    multiply(1000),
    subtract(MINUTE),
    delayed(startTimeInterval),
  );
};

export default function useTime() {
  return {
    currentTime,
    currentHours,
    today,
    formattedCurrentTime,
    initTimeInterval,
  };
}
