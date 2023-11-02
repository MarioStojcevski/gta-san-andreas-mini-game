import { Group, Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';

class Clouds extends Group {
  static clouds;

  constructor() {
    super();
    
    this.defineClouds();
  }

  defineClouds() {
    const cloudProperties = {
      width: 5000,
      height: 5000,
      color: 0x0000ff,
    }

    this.clouds = new Mesh(
      new PlaneGeometry(cloudProperties.width, cloudProperties.height, 1), 
      new MeshBasicMaterial({ color: cloudProperties.color })
    );

    this.clouds.position.set(0, 25, 0);
    this.clouds.rotation.x = Math.PI / 2;

    this.add(this.clouds);
  }
}

export default Clouds;