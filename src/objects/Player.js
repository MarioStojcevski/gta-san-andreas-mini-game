import { Group } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player extends Group {
  static player;
  static playerSize;
  static loader;

  constructor() {
    super();

    this.definePlayer();
  }

  definePlayer() {
    this.loader = new GLTFLoader();

    this.loader.load('./assets/models/car.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if(child.isMesh) {
          child.castShadow = true;
        }
      });
      this.player = gltf.scene;
      this.player.scale.set(0.2, 0.2, 0.2);
      this.player.position.set(0, -2, 0.2);
      this.player.rotateX(Math.PI/2);
      this.player.castShadow = true;

      this.add(this.player);
    });
  }
};

export default Player;