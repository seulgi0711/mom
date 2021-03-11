// import firebase from 'firebase/app';
// import 'firebase/auth';

import * as storage from '@/effects/storage';
import { mapIoOption } from '@/utils/fn';
import { ref } from '@vue/reactivity';
import { pipe } from 'fp-ts/lib/function';
import { computed } from 'vue';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYM4bjAy1bw5YEihWsiG4z-Gqj3EiaBoM',
//   authDomain: 'momentum-clone-8dbf2.firebaseapp.com',
//   projectId: 'momentum-clone-8dbf2',
//   storageBucket: 'momentum-clone-8dbf2.appspot.com',
//   messagingSenderId: '23877194911',
//   appId: '1:23877194911:web:f9a879a0cd150e70683eaa',
// };

// firebase.initializeApp(firebaseConfig);
const username = ref('');

const hasAuth = computed(() => {
  return username.value !== '';
});

export default function useAuth() {
  function setUsername(value: string) {
    username.value = value;
  }

  const api = {
    fetchUsername: () => {
      pipe(storage.getItem('username'), mapIoOption(setUsername))();
    },
    setUsername: (value: string) => {
      storage.setItem('username', value)();
    },
  };

  return {
    api,
    setUsername,
    username,
    hasAuth,
  };
}
