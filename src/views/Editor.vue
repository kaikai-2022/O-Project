<template>
  <div class="editor-container">
    <div class="component-container2">
      <TiptapComponent :documentid='documentid' />
      <button @click="goBack">返回</button>
    </div>

    <div class="containerRain">
      <div class="cloud"></div>
    </div>
  </div>
</template>
  
<script>

import 'element-tiptap/lib/index.css';
import introJs from 'intro.js'
import 'intro.js/introjs.css';
import TiptapComponent from '@/components/TiptapComponent.vue';
// import TittleTiptap from '@/components/TittleTiptap.vue';
import { changeyNewB } from '@/api/api';
export default {
  data() {
    return {
      timer: null
    }
  },
  methods: {
    goBack() {
      this.$router.push('/project/documentlist')
    }
    ,
    randomText() {
      const text = ('abcdefghijklmnopqrstuvwsyz0123456789');
      const letter = text[Math.floor(Math.random() * text.length)];
      return letter;
    },
    rain() {
      console.log('1@')
      const cloud = document.querySelector('.cloud');
      const e = document.createElement('div');
      const left = Math.floor(Math.random() * 640);
      const size = Math.random() * 1.2;
      const duration = Math.random() * 1;
      e.classList.add('text');
      cloud.appendChild(e);
      e.innerText = this.randomText();
      e.style.marginLeft = left + 'px';
      e.style.fontSize = 0.5 + size + 'em';
      e.style.animationDuration = 1 + duration + 's';
      setTimeout(() => {
        cloud.removeChild(e)
      }, 2000)
    },
  },
  mounted() {
    console.log('1@')
    this.timer = setInterval(this.rain, 20);
    // this.startIntro()
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    TiptapComponent,
    // TittleTiptap
  },
  props: ['documentid']

};
</script>

<style lang="scss">
* {
  font-family: JingNanFont;
}

.component-container1 {
  margin-left: 0px;
  /* 左侧边距 */
  margin-right: 70px;
  position: relative;
  /* 右侧边距 */
}

.component-container2 {
  margin-left: 0px;
  /* 左侧边距 */
  margin-right: 70px;
  /* 右侧边距 */
  height: 400px;
  z-index: 10;
  position: relative;

}

.editor-container {
  height: 570px;
  margin-left: 65px;
  z-index: 10;
}

//rain
body {
  // display: flex;
  justify-content: center;
  align-items: center;
  // min-height: 100vh;
  // z-index: -10;
  // position: absolute;
}

.containerRain {
  // position: relative;
  width: 100%;
  // height: 400px;
  display: flex;
  // justify-content: center;
  opacity: 0.6;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, transparent, transparent, #0005);
}

.text {
  position: absolute;
  top: 255px;
  height: 10px;
  line-height: 10px;
  text-transform: lowercase;
  color: #000;
  text-shadow: 0 0 5px #000,
    0 0 15px #000,
    0 0 30px #000;
  transform-origin: bottom;
  animation: animate 2s linear forwards;
  // z-index: -5;
}

@keyframes animate {
  0% {
    transform: translateY(0) scale(1);
  }

  70% {
    transform: translateY(390px) scale(1);
  }

  100% {
    transform: translateY(390px) scale(1);
  }
}
</style>

