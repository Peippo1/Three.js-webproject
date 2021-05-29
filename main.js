import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

// camera perspectives - view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// setting the renderer with id of background
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

// making canvas full screen canvas
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
// camera position moved along z axis for better view when adding shapes.
camera.position.setZ(30);
camera.position.setX(-3);

// render == DRAW
renderer.render( scene, camera );

// TORUS

// Creating objects and vectors to define the shape
// GEOMETRY - the {x,y,z} points that make up a shape 
const geometry = new THREE.TorusGeometry (10, 3, 16, 100);
// MATERIAL - the wrapping paper for an object
// No light source required for basic material >
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 });
// MESH (geometry + material)
const torus = new THREE.Mesh( geometry, material);

scene.add(torus);

// LIGHTS

// Using a pointLight and white hexidecimal literal to light object
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


// Adding stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);


  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Avatar

const davidTexture = new THREE.TextureLoader().load('david.jpg');

const david = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: davidTexture }));

scene.add(david);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// using normal map image to enhance realisim

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

david.position.z = -5;
david.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  david.rotation.y += 0.01;
  david.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();



	// Animation Loop

// Below is a Function that creates an infinite loop that calls the render method automatically, updating the ui
// This is our GAME LOOP
function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

    // controls.update();

  renderer.render( scene, camera );
}

animate();