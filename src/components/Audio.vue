<template>
  <b-card :bg-variant="color" text-variant="white" class="text-center" @click="changeActive">
    <slot></slot>
    <b-card-text>{{ props.title }}</b-card-text>

    <slot name="footer"></slot>
  </b-card>
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
let color = computed(() => props.active ? "success": "danger")


// watchEffect(() => muteAudio(props.title, active.value) )
function changeActive() {
  muteAudio(props.title, props.active)
}


</script>