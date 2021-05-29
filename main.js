import './style.css'

import * as THREE from 'three';


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

// render == DRAW
renderer.render( scene, camera );

// Creating objects and vectors to define the shape
// GEOMETRY - the {x,y,z} points that make up a shape 
const geometry = new THREE.TorusGeometry (10, 3, 16, 100);
// MATERIAL - the wrapping paper for an object
// No light source required for basic material >
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 });
// MESH (geometry + material)
const torus = new THREE.Mesh( geometry, material);

scene.add(torus);

// using a pointLight and white hexidecimal literal to light object
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Below is a Function that creates an infinite loop that calls the render method automatically, updating the ui
// This is our GAME LOOP
function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  renderer.render( scene, camera );
}

animate()