<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
<!--      <Audio v-for="audioDevice in allAudioDevices"-->
<!--             :title="audioDevice.inputName"-->
<!--             :active="!audioDevice.inputMuted">-->
<!--      </Audio>-->
      <VerticalSlider v-for="audioDevice in allAudioDevices"
             :title="audioDevice.inputName"
             :active="!audioDevice.inputMuted">
      </VerticalSlider>

    </b-row>
    <b-row class="text-center">
      <b-col cols="2">
        <Scene v-for="(scene) in allScenes"
               :title="scene.sceneName"
               :active="scene.active">
        </Scene>
        <!--        <Scene title="Sample" @counter-increase="log($event)"></Scene>-->
      </b-col>
      <b-col cols="10">
        <b-container class="bv-example-row">
          <b-row>
            <Source v-for="source in allSources"
                    :title="source.sourceName"
                    :active="source.sceneItemEnabled"
                    :itemId="source.sceneItemId"
                    :sceneName="source.currentScene">
            </Source>
          </b-row>
        </b-container>
      </b-col>
    </b-row>

  </b-container>


</template>
<script setup>
import Scene from "./Scene.vue";
import Audio from "./Audio.vue";
import Source from "./Source.vue";
import VerticalSlider from "./VerticalSlider.vue";
import {getAudioInputList, getSceneInfo, getSceneItemList, obs} from "../obs.lib.js";
import {ref} from "vue";
// function showModal() {
//   this.$bvModal.msgBoxOk('Modal from @vue/compat');
// }


//SCENES
let allScenes = ref({});
let allAudioDevices = ref({})
let allSources = ref({})

getSceneInfo().then((result) => {
  let currentScene = result.currentProgramSceneName;
  getSceneItemList(currentScene).then(result => {
    console.log(result.sceneItems)
    result.sceneItems = result.sceneItems.map((item) => ({
      ...item,
      currentScene: currentScene
    }));
    allSources.value = result.sceneItems
  })

  let scenes = result.scenes;
  scenes.sort((a, b) => b.sceneIndex - a.sceneIndex)
  scenes = scenes.filter((scene) => !scene.sceneName.startsWith("[V") && !scene.sceneName.startsWith("[Overlay"))
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

  getSceneItemList(event.sceneName).then(result => {
    console.log(result.sceneItems)


    result.sceneItems = result.sceneItems.map((item) => ({
      ...item,
      currentScene: event.sceneName
    }));
    allSources.value = result.sceneItems

  })

}
obs.on("CurrentProgramSceneChanged", sceneChanged);



function inputShowStateChanged(event) {
  let changedSourceIndex = allSources.value.findIndex(el => el.sceneItemId === event.sceneItemId && el.currentScene === event.sceneName);
  allSources.value[changedSourceIndex].sceneItemEnabled = event.sceneItemEnabled


  console.log("input shown state changed  " + event.sceneName + " " + event.sceneItemId + " " + event.sceneItemEnabled)
}
obs.on("SceneItemEnableStateChanged", inputShowStateChanged);
///////////////////////////////
// Audio
/////////////////////////

getAudioInputList().then((audioInputs) => {
      audioInputs = audioInputs.filter((audio) => !audio.inputName.startsWith("[V"))
      allAudioDevices.value = audioInputs;
}

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
