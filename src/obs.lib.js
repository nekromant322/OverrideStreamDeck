import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

export const obs = new OBSWebSocket();
const host = "127.0.0.1"
const pass = "y0WofIyuUGs9Nf5R"
await obs.connect('ws://' + host + ':4455', pass);

export function getOBSConnection() {
    return obs;
}

export function muteAudio(inputName, mute) {
    obs.call('SetInputMute', {
        inputName: inputName,
        inputMuted: mute
    });
}

export async function getCurrentScene() {
    return await obs.call('GetCurrentProgramScene');
}

export async function getSceneInfo() {
    return (await obs.call('GetSceneList'));
}


export function setCurrentScene(sceneName) {
    obs.call('SetCurrentProgramScene', {
        sceneName: sceneName
    });
}

export async function getInputList() {
    return (await obs.call('GetInputList'));
}

export async function getAudioInputList() {
    let response = await obs.call('GetInputList');
    const audioInputKinds =
        ["wasapi_input_capture",
            "wasapi_output_capture",
            "wasapi_process_output_capture",
            "ffmpeg_source"]


    let inputs = response.inputs.filter(
        (el) => audioInputKinds.includes(el.unversionedInputKind)
    )
    inputs = inputs.sort(
        (a, b) =>
            audioInputKinds.indexOf(a.unversionedInputKind) - audioInputKinds.indexOf(b.unversionedInputKind))
    let inputMuted = await Promise.all(
        inputs.map((input) => obs.call('GetInputMute', { inputName: input.inputName }))
    )

    inputs = inputs.map((input, key) => (Object.assign(input, { inputMuted: inputMuted[key].inputMuted })));
    return inputs
}


export function setItemVisible(sceneName, sceneItemId, visible) {
    obs.call('SetSceneItemEnabled', {
        sceneName: sceneName,
        sceneItemId: sceneItemId,
        sceneItemEnabled: visible
    });
}

export async function getVirtualCamStatus() {
    return await obs.call('GetVirtualCamStatus');
}

export async function toggleVirtualCam() {
    return await obs.call('ToggleVirtualCam');
}

export async function getSceneItemList(sceneName) {
    return await obs.call('GetSceneItemList', {
        sceneName: sceneName,
    });
}


//смена состояния сорса (скрыт/не скрыт)
function inputShowStateChanged(event) {
    console.log("input shown state changed  " + event.sceneName + " " + event.sceneItemId + " " + event.sceneItemEnabled)
}

// obs.on("SceneItemEnableStateChanged", inputShowStateChanged);


//Мут аудиодевайсов
// function inputMuteStateChanged(event) {
//     console.log("mute state changed  " + event.inputName + " " + event.inputMuted)
// }
// obs.on("InputMuteStateChanged", inputMuteStateChanged);


//Смена сцены
function sceneChanged(event) {
    console.log("scene changed to " + event.sceneName)
}

// obs.on("CurrentProgramSceneChanged", sceneChanged);


//Изменение левелов звука
function inputVolumeChanged(event) {
    console.log("inputVolumeChanged")
    console.log(event.inputName)
    console.log(event.inputVolumeMul)
    console.log(event.inputVolumeDb)
}

// obs.on("InputVolumeChanged", inputVolumeChanged);
