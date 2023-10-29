import { Group } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player extends Group {
  static player;
  static playerSize;

  constructor() {
    super();

    const loader = new GLTFLoader();

    loader.load('./assets/models/car.glb', (gltf) => {
      this.player = gltf.scene;
      this.player.scale.set(0.2, 0.2, 0.2);
      this.player.position.set(0, -2, 0.2);
      this.player.rotateX(Math.PI/2);

      this.player.castShadow = true;
      this.player.receiveShadow = true;

      this.add(this.player);
    });
  }
};

export default Player;