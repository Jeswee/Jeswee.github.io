// import
//import * as THREE from 'three';


//1. create scene

//2. Add Camera

//3. Create & Add object

//4. Add Lighting

//5. Set up the renderer

//6. Animate scene

//----------------- MAINTAINANCE SECTION -------------------------------


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- Lighting ---
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(3, 10, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// --- Floor ---
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100), 
    new THREE.MeshPhongMaterial({ color: 0x111111, depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

// --- Load the Character ---
let mixer;
const clock = new THREE.Clock();
const loader = new GLTFLoader();

const modelUrl = '/character/QuickFormalBow.glb';

loader.load(modelUrl, (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    model.traverse((object) => {
        if (object.isMesh) object.castShadow = true;
    });

    if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    }
});

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// --- Render Loop ---
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});