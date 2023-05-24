<template>

  <b-col>
    <b-card :bg-variant="color" text-variant="white" class="text-center"
            @click="changeVisibility()">
      <slot></slot>
      <b-card-text>{{ props.title }}</b-card-text>
    </b-card>
  </b-col>
</template>
<script setup>
import {ref, computed} from "vue";
import {setItemVisible} from "../obs.lib.js";

let color = computed(() => props.active ? "success" : "danger")


const props = defineProps({
  title: String,
  active: {default: false, type: Boolean},
  itemId: Number,
  sceneName: String
})

function changeVisibility() {
  setItemVisible(props.sceneName, props.itemId, !props.active)
}

</script>


<!--let formattedCounter = computed(function () {-->
<!--//   return counter.value + " clicks"-->
<!--// })-->

<!--const emits = defineEmits(['counter-increase', 'hidden'])-->