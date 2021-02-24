<template>
  <div class="app-wrapper">
    <Bg />
    <div class="contents">
      <LeftSide />
      <RightSide />
    </div>
  </div>
</template>

<script lang="ts">
import '@/global.css';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import LeftSide from '@/components/LeftSide.vue';
import Bg from '@/components/Bg.vue';
import RightSide from '@/components/RightSide.vue';

export default defineComponent({
  name: 'App',
  components: {
    RightSide,
    Bg,
    LeftSide,
  },
  created() {
    this.initTimeInterval();
  },
  methods: {
    ...mapActions(['initTimeInterval']),
  },
});
</script>

<style scoped lang="scss">
.app-wrapper {
  width: 100vw;
  height: 100vh;
}

.contents {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(128, 128, 128, 0) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );

  > * {
    flex: 1;
  }
}
</style>
