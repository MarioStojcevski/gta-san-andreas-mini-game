import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader } from 'three';

class Water extends Group {
  static water;

  constructor() {
    super();

    const textureLoader = new TextureLoader();

    const texture = textureLoader.load('./assets/textures/water.webp');

    this.water = new Mesh(
      new PlaneGeometry(500, 500, 1), 
      new MeshBasicMaterial({ map: texture })
    );

    this.water.position.z = -0.03;

    this.add(this.water);
  }
}

export default Water;