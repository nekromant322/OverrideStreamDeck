<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
.vertical-slider {
  height: 100%;
}
.vertical-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slider {
  background-color: #f4f4f4;
  padding: 1em 0;
  width: 2.6em;
  border-radius: 0.25em;
  .slider-value {
    text-align: center;
    width: 100%;
    margin-bottom: 1em;
    font-family: sans-serif;
  }
  .slider-hit-area {
    height: 10em;
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    .slider-container {
      width: 60px;
      height: 100%;
      background-color: #ddd;
      position: relative;
    .name-container {
      letter-spacing: 0px;
      writing-mode: vertical-rl;
      text-orientation: upright;
      position: absolute;
      inset: 0;
      z-index: 289;
      pointer-events: none;
      user-select: none;
    }
      .filled {
        background-color: red;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;

      }
      .handle {
        width: 3em;
        height: 1em;
        border-radius: 100%;
        background-color: red;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 50%);
      }
    }
  }
}
.mute-button-container {
  background-color: #28a644; /* Green */
  width: 15px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range][orient=vertical]
{
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 20px;
  height: 200px;
  padding: 0 5px;
}

.green {
  background-color: #28a644;
}
.red {
  background-color: #ff0000;
}
</style>
<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
<!--  <div class="vertical-slider">-->
<!--    <div class="slider">-->
<!--      <div class="slider-value">{{ Math.round(value) }}</div>-->
<!--      <div class="slider-hit-area" @click="onClick">-->
<!--        <div class="slider-container" ref="container">-->
<!--          <div class="name-container">{{ props.title }}</div>-->

<!--          <div class="filled" :style="{ height: value + '%' }">-->
<!--          </div>-->
<!--          <div-->
<!--              class="handle"-->
<!--              :style="{ bottom: value + '%' }"-->
<!--              @mousedown="onMouseDown"-->
<!--          ></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  <b-card>
    <b-card-text > <input type="range" orient="vertical" /></b-card-text>
    <b-card-text :class="color" @click="changeActive" >{{ props.title }}</b-card-text>
  </b-card>
<!--  <input type="range" orient="vertical" />-->
<!--    <div :class="color" @click="changeActive" >{{ props.title }}</div>-->
<!--  </div>-->
</template>

<script setup>
import {ref, computed, watchEffect} from "vue";
import {muteAudio, obs} from "../obs.lib.js";
const props = defineProps({
  title: String,
  active: Boolean
})
// let active = ref(props.active);
//call to obs
//then((result) =>  active.value = result)
let color = computed(() => props.active ? "device-text mute-button-container green": "mute-button-container red")


// watchEffect(() => muteAudio(props.title, active.value) )
function changeActive() {
  muteAudio(props.title, props.active)
}




//
//
// function clamp(val, min, max) {
//   return Math.max(min, Math.min(max, val));
// }
// export default {
//   data() {
//     return {
//       value: 30,
//       dragging: false
//     };
//   },
//   mounted() {
//     document.addEventListener("mousemove", (e) => {
//       if (!this.dragging) return;
//       this.update(e);
//     });
//     document.addEventListener("mouseup", (e) => {
//       this.dragging = false;
//     });
//   },
//   methods: {
//     onMouseDown() {
//       this.dragging = true;
//     },
//     getRect() {
//       const container = this.$refs.container;
//       return container.getBoundingClientRect();
//     },
//     update(e) {
//       const rect = this.getRect();
//       this.value =
//           100 -
//           ((clamp(e.clientY, rect.top, rect.bottom) - rect.top) / rect.height) *
//           100;
//     },
//     onClick(e) {
//       this.update(e);
//     }
//   }
// };
</script>
