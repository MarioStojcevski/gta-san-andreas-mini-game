import { Group } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class MoneyPool extends Group {
  static radius;
  static objects;

  constructor() {
    super();
    this.objects = [];
  }

  addMoney() {
    const loader = new GLTFLoader();

    const isBad = Math.random() < 0.5;

    loader.load(!isBad ? './assets/models/money.glb': './assets/models/bomb.glb', (gltf) => {
      this.money = gltf.scene;
      if(!isBad) {
        this.money.scale.set(3, 3, 3);
      } else {
        this.money.scale.set(0.1, 0.1, 0.1);
        this.money.rotation.x = Math.PI / 2;
      }

      const x = (Math.random() * 3) - 1.5;
      const y = Math.random() * 200 + 1;
      this.money.position.set(x, y, 0.2);
      this.money.castShadow = true;
      this.money.receiveShadow = true;

      this.add(this.money);
      this.objects.push({
        isBad,
        object: this.money,
      });
    });

    this.spinMoney();
  }

  spinMoney() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.objects.forEach((obj) => {
        obj.object.rotateZ(0.0003);
      });
    }

    animate();
  }

  updateMoney(speed) {
    this.objects.forEach((obj) => {
      obj.object.position.y -= speed;
    });
  }
}

export default MoneyPool;