<template>
  <div class="login-wrapper">
    <template v-if="isSentRequest">
      <div class="check-description">
        로그인 링크를 입력한 메일 주소로 보냈습니다. <br />
        {{ inputValue }} 확인해 보세요!!!
      </div>
    </template>
    <temaplte v-else-if="isLoading">
      로딩중...
    </temaplte>
    <temaplte v-else>
      <div class="input-wrapper">
        <div>Hello, what's your email address?</div>
        <input
          class="login-input"
          v-model="inputValue"
          @keydown.enter="handleEnter"
        />
      </div>
    </temaplte>
  </div>
</template>

<script lang="ts" setup>
import useAuth from '@/hooks/useAuth';
import { ref } from '@vue/reactivity';

const inputValue = ref('');
const isSentRequest = ref(false);
const { api, isLoading } = useAuth();

const handleEnter = () => {
  isSentRequest.value = true;
  api.sendSignInLinkToEmail(inputValue.value);
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  color: rgba(255, 255, 255, 0.9);
  font-size: 4em;
  font-weight: bold;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.check-description {
  font-size: 0.5em;
  text-align: center;
}

.input-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.login-input {
  margin-top: 4em;
  outline: 0;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  box-shadow: none;
  width: 800px;
  font-size: 0.5em;

  &:focus {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
