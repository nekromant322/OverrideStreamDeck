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
      width: 50px;
      height: 100%;
      background-color: #ddd;
      position: relative;
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
</style>
<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="vertical-slider">
    <div class="slider">
      <div class="slider-value">{{ Math.round(value) }}</div>
      <div class="slider-hit-area" @click="onClick">
        <div class="slider-container" ref="container">
          <div class="filled" :style="{ height: value + '%' }"></div>
          <div
              class="handle"
              :style="{ bottom: value + '%' }"
              @mousedown="onMouseDown"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
export default {
  data() {
    return {
      value: 30,
      dragging: false
    };
  },
  mounted() {
    document.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;
      this.update(e);
    });
    document.addEventListener("mouseup", (e) => {
      this.dragging = false;
    });
  },
  methods: {
    onMouseDown() {
      this.dragging = true;
    },
    getRect() {
      const container = this.$refs.container;
      return container.getBoundingClientRect();
    },
    update(e) {
      const rect = this.getRect();
      this.value =
          100 -
          ((clamp(e.clientY, rect.top, rect.bottom) - rect.top) / rect.height) *
          100;
    },
    onClick(e) {
      this.update(e);
    }
  }
};
</script>
