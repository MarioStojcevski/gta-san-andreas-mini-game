import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader } from 'three';

import Water from './Water.js';
import Clouds from './Clouds.js';

class Road extends Group {
  static road;

  constructor() {
    super();

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/road.jpeg');
    this.road = new Mesh(
      new PlaneGeometry(4, 200, 1), 
      new MeshBasicMaterial({ map: texture })
    );

    this.water = new Water();
    this.clouds = new Clouds();

    this.road.castShadow = true;
    this.road.receiveShadow = true;

    this.add(this.road);
    this.add(this.water);
    this.add(this.clouds);
  }
}

export default Road;