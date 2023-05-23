<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <Audio v-for="audioDevice in allAudioDevices"
             :title="audioDevice.inputName"
             :active="!audioDevice.inputMuted">
      </Audio>
    </b-row>
    <b-row class="text-center">
      <b-col  cols="2">
        <Scene v-for="(scene) in allScenes"
               :title="scene.sceneName"
               :active="scene.active">
        </Scene>
<!--        <Scene title="Sample" @counter-increase="log($event)"></Scene>-->
      </b-col>
      <b-col cols="10">
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>

  </b-container>


</template>
<script setup>
import Scene from "./Scene.vue";
import Audio from "./Audio.vue";
import {getAudioInputList, getSceneInfo, obs} from "../obs.lib.js";
import {ref} from "vue";
// function showModal() {
//   this.$bvModal.msgBoxOk('Modal from @vue/compat');
// }



//SCENES
let allScenes = ref({});
let allAudioDevices = ref({})
getSceneInfo().then((result) =>  {
  let currentScene = result.currentProgramSceneName;
  let scenes = result.scenes;
  scenes.sort((a, b) => b.sceneIndex - a.sceneIndex)
  scenes = scenes.map((scene) => ({
    ...scene,
    active: scene.sceneName === currentScene
  }));
  allScenes.value = scenes
});


function sceneChanged(event) {
  allScenes.value = allScenes.value.map((scene) => ({
    ...scene,
    active: scene.sceneName === event.sceneName
  }))
  console.log("scene changed to " + event.sceneName)
}
obs.on("CurrentProgramSceneChanged", sceneChanged);
///////////////////////////////
// Audio
/////////////////////////

getAudioInputList().then((audioInputs) =>
    allAudioDevices.value = audioInputs
)

function inputMuteStateChanged(event) {

  let changedDeviceIndex = allAudioDevices.value.findIndex(el => el.inputName === event.inputName);
  allAudioDevices.value[changedDeviceIndex].inputMuted = event.inputMuted;

  console.log("mute state changed  " + event.inputName + " " + event.inputMuted)
}
obs.on("InputMuteStateChanged", inputMuteStateChanged);








function log(smth) {
  console.log(smth)
}



</script>
