import * as storage from '@/effects/storage';
import { ref } from '@vue/reactivity';
import firebase from 'firebase/app';
import 'firebase/auth';
import { pipe } from 'fp-ts/lib/function';
import { chain, fromNullable, map } from 'fp-ts/lib/Option';
import { head, prop, split } from 'ramda';
import { computed } from 'vue';

const firebaseConfig = {
  apiKey: 'AIzaSyAYM4bjAy1bw5YEihWsiG4z-Gqj3EiaBoM',
  authDomain: 'momentum-clone-8dbf2.firebaseapp.com',
  projectId: 'momentum-clone-8dbf2',
  storageBucket: 'momentum-clone-8dbf2.appspot.com',
  messagingSenderId: '23877194911',
  appId: '1:23877194911:web:f9a879a0cd150e70683eaa',
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

const email = ref('');

const isLoading = ref(true);

const hasAuth = computed(() => {
  return email.value !== '';
});

const username = computed(() => pipe(split('@', email.value), head));

firebaseAuth.onAuthStateChanged(auth => {
  pipe(
    fromNullable(auth),
    map(prop('email')),
    chain(fromNullable),
    map(value => (email.value = value)),
  );
  isLoading.value = false;
});

export default function useAuth() {
  function setEmail(value: string) {
    email.value = value;
  }

  const api = {
    sendSignInLinkToEmail: (value: string) => {
      return firebaseAuth
        .sendSignInLinkToEmail(value, {
          url: location.href,
          handleCodeInApp: true,
        })
        .then(storage.setItem('emailForSignIn', value));
    },
    signInWithEmailLink: (email: string) => {
      firebaseAuth
        .signInWithEmailLink(email, location.href)
        .then(storage.removeItem('emailForSignIn'));
    },
  };

  return {
    api,
    isLoading,
    setEmail,
    email,
    username,
    hasAuth,
  };
}
