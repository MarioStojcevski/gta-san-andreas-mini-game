import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Fog, Vector2, AudioListener, AudioLoader, Audio } from 'three';

import Game from './src/Game.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
const directionalLight = new DirectionalLight(0xffffff);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;
directionalLight.position.set(2, -3, 3);

const listener = new AudioListener();
camera.add(listener);
export const sound = new Audio(listener);
export const audioLoader = new AudioLoader();

const game = new Game(scene);

const initializeGame = () => {
  document.body.appendChild(renderer.domElement);
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

export const animate = () => {
  requestAnimationFrame(animate);
  rotateTheCamera();
  renderer.render(scene, camera);
}

initializeGame();

const mouse = new Vector2();
const onDocumentMouseMove = (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  game.onMove(mouse.x, false);
};

const onDocumentTouchMove = (event) => {
  event.preventDefault();
  mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  game.onMove(mouse.x, true);
}

const onMouseDown = () => {
  game.onDown();
};

const onMouseUp = () => {
  game.onUp();
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize);

document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('touchmove', onDocumentTouchMove);

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('touchstart', onMouseDown, { passive: false });

document.addEventListener('mouseup', onMouseUp);
document.addEventListener('touchend', onMouseUp);