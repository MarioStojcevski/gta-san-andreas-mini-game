import { Group } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Collectables extends Group {
  static radius;
  static objects;
  static loader;

  constructor() {
    super();
    this.objects = [];
    this.loader = new GLTFLoader();
  }

  addCollectable() {
    const isBad = Math.random() < 0.5;

    const collectableProperties = {
      scaleX: isBad ? 1 : 3,
      scaleY: isBad ? 1 : 3,
      scaleZ: isBad ? 1 : 3,
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 50 + 1,
      z: 0.2,
    };

    this.loader.load(!isBad ? './assets/models/money.glb': './assets/models/bomb.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if(child.isMesh) {
          child.castShadow = true;
        }
      });
      const collectable = gltf.scene;
      collectable.scale.set(collectableProperties.scaleX, collectableProperties.scaleY, collectableProperties.scaleZ);
      collectable.position.set(collectableProperties.x, collectableProperties.y, collectableProperties.z);

      this.add(collectable);
      this.spinCollectable(collectable);

      this.objects.push({
        isBad,
        collectable,
      });
    });
  }

  spinCollectable(collectable) {
    const animate = () => {
      collectable.rotateZ(0.0003);
    }

    animate();
  }

  updateCollectables(speed) {
    this.objects.forEach((obj) => {
      obj.collectable.position.y -= speed;

      if(obj.collectable.position.y < -10) {
        obj.collectable.position.y = 50;
        obj.collectable.position.x = (Math.random() * 3) - 1.5;
      }
    });
  }
}

export default Collectables;