import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Fog, Vector2 } from 'three';

import Game from './src/Game.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.shadowMap.enabled = true;

const game = new Game(scene);

const initializeGame = () => {
  document.body.appendChild( renderer.domElement );
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, -5, 3);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  scene.fog = new Fog(0xffffff, 10, 30);
  camera.position.z = 5;
  scene.add(game);
}

const rotateTheCamera = () => {
  let valueToAdjust = 0.04;
  const timeout = setTimeout(() => {
    valueToAdjust -= 0.01;
    camera.position.y -= valueToAdjust;
    camera.position.z -= valueToAdjust;
    camera.rotateX(0.01);
  }, 10);

  if (camera.position.y < -3.5) {
    clearTimeout(timeout);
  }

};

const animate = () => {
  requestAnimationFrame(animate);
  rotateTheCamera();
  renderer.render(scene, camera);
}

initializeGame();
animate();

const onDocumentMouseMove = (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  game.onMove(mouse.x, mouse.y);
};

const onMouseDown = () => {
  game.onDown(mouse.x, mouse.y);
};

const onMouseUp = () => {
  game.onUp();
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const mouse = new Vector2();
window.addEventListener('resize', onWindowResize);

document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('touchmove', onDocumentMouseMove);

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('touchstart', onMouseDown);

document.addEventListener('mouseup', onMouseUp);
document.addEventListener('touchend', onMouseUp);