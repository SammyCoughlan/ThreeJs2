import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'dat.gui';
import background from '../img/background.jpg';

var height = window.innerHeight;
var width = window.innerWidth;
const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
textureLoader.load(background,
    function(texture){
        scene.background =texture
    });

//lights
const ambLight = new THREE.AmbientLight(0x2c2c2c);
scene.add(ambLight);

const spotLight = new THREE.SpotLight(0x5fcbc9);
spotLight.position.set(0,30,0);
spotLight.castShadow = true;
scene.add(spotLight);




//helpers
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);



camera.position.set(-10,30,30);
orbit.update();



//plane
const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo,planeMat);
plane.rotateX(-.5*Math.PI);
plane.receiveShadow = true;
scene.add(plane);

//ring object
const ringGeo = new THREE.RingGeometry(1, 5, 32);
const ringMat = new THREE.MeshStandardMaterial({color: 0xffff00, side: THREE.DoubleSide});
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.position.set(-10, 10, -5);
ringMesh.castShadow = true;
scene.add(ringMesh);

//torus object
const torusGeo = new THREE.TorusGeometry(5, 3, 16, 100);
const torusMat = new THREE.MeshStandardMaterial({color: 0xffff00});
const torusMesh = new THREE.Mesh(torusGeo, torusMat);
torusMesh.position.set(-10,10,0);
torusMesh.castShadow = true;
scene.add(torusMesh);


//GUI
const gui = new GUI();
const guiOptions = {TorusColor:'#FFFF00', RingColor:'#FFFF00'};
gui.addColor(guiOptions, 'TorusColor').onChange(function(e){
    torusMesh.material.color.set(e);
});
gui.addColor(guiOptions, 'RingColor').onChange(function(e){
    ringMesh.material.color.set(e);
});


//animation
var angle = 0;
var speed = .1;

function animate(time){
    torusMesh.rotation.x = time /1000;
    torusMesh.rotation.y = time /1000;
    angle += speed;
    ringMesh.position.x = 10 * (Math.abs(Math.sin(angle)));
    renderer.render(scene, camera);
}




//render
renderer.setAnimationLoop(animate);

renderer.render(scene, camera);