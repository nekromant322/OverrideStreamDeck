<template>

  <b-col>
    <b-card :bg-variant="color" text-variant="white"  class="text-center"
            @click="changeScene(title)">
      <slot></slot>
      <b-card-text>{{ props.title }}</b-card-text>

      <slot name="footer"></slot>
    </b-card>
  </b-col>
</template>
<script setup>
import {ref, computed} from "vue";
import {setCurrentScene} from "../obs.lib.js";
let color = computed(() => props.active ? "success" : "danger")

function changeScene(title) {
  setCurrentScene(title)
}

const props = defineProps({
  title: String,
  active: {default: false, type: Boolean}
})


</script>


<!--let formattedCounter = computed(function () {-->
<!--//   return counter.value + " clicks"-->
<!--// })-->

<!--const emits = defineEmits(['counter-increase', 'hidden'])-->