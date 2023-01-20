//import './style.css';

import * as THREE from  "https://unpkg.com/three@0.127.0/build/three.module.js";



const scene = new THREE.Scene();

//setup scene and camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bckg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

//torus
const geometry = new THREE.TorusGeometry(10,3,10,100);

const material = new THREE.MeshStandardMaterial({ color: 0x4da6ff});

const torus = new THREE.Mesh(geometry,material);


scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5,5,5);

const ambientlight = new THREE.AmbientLight(0xffffff);

scene.add(ambientlight,pointlight);

//const lighthelper = new THREE.PointLightHelper(pointlight);

//const gridhelper = new THREE.GridHelper(200,50);

//const controls = new OrbitControls(camera,renderer.domElement);
//scene.add(lighthelper,gridhelper);

function addstar(){

  const geometry = new THREE.SphereGeometry(0.25,20,20);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(500).fill().forEach(addstar);

//background
const spacetexture = new THREE.TextureLoader().load('space1.jpg');

scene.background = spacetexture;



//mypicture
const mytexture = new THREE.TextureLoader().load('me3.png');
const me = new THREE.Mesh(
  new THREE.BoxGeometry(8,8,8),
  new THREE.MeshBasicMaterial({ map : mytexture})
);

scene.add(me);

//moon

const normaltexture = new THREE.TextureLoader().load('normal.jpg');
const moontexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moontexture,
    normalMap: normaltexture
  })
);

scene.add(moon);

moon.position.z = 10;
moon.position.setX(-10);

me.position.z = -5;
me.position.x  = 2; 

 function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.07;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.x += 0.01;
  me.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
} 




document.body.onscroll = moveCamera;
moveCamera(); 

//animate and render
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.03;
  torus.rotation.y += 0.004;
  torus.rotation.z += 0.05;

  moon.rotation.x += 0.005;
  //controls.update();
  renderer.render(scene,camera);
}

animate();