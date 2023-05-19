import Vue, { createApp } from '@vue/compat';
import BootstrapVue from 'bootstrap-vue';
import HelloBootstrap from './components/HelloBootstrap.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import * as OBSlib from './obs.lib.js';

Vue.use(BootstrapVue);



const app = createApp(HelloBootstrap);
app.mount('#app');




//examples
// muteAudio("Микрфон", false)

// console.log(await getCurrentScene())
// let itemList = await OBSlib.getSceneItemList("Центр экрана")
// console.log(itemList)


// setVisible("Макро", 4, true)
// await toggleVirtualCam();
// console.log(OBSlib.obs)





