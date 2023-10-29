import { Group, Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';

class Clouds extends Group {
  static clouds;

  constructor() {
    super();
    this.clouds = new Mesh(
      new PlaneGeometry(5000, 5000, 1), 
      new MeshBasicMaterial({ color: 0x0000ff })
    );

    this.clouds.position.set(0, 25, 0);
    this.clouds.rotation.x = Math.PI / 2;

    this.add(this.clouds);
  }
}

export default Clouds;