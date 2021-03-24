import * as request from '@/effects/api';
import { isNil, pick } from 'ramda';
import { computed, ref } from 'vue';

export default function useWeather() {
  const weather = ref();
  const status = computed(() => weather.value.weather[0].main);

  const api = {
    fetchWeather: () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          const storedWeather = localStorage.getItem('mom:weather');

          const lastWeather = isNil(storedWeather)
            ? null
            : JSON.parse(localStorage.getItem('mom:weather') as string);
          if (lastWeather) {
            weather.value = lastWeather;
          } else {
            const newWeater = await request.fetchWeather(
              pick(['latitude', 'longitude'], coords),
            );
            localStorage.setItem('mom:weather', JSON.stringify(newWeater));
            weather.value = newWeater;
          }
        });
      }
    },
  };
  return { api, weather, status };
}
