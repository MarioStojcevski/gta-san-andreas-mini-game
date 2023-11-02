import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader, RepeatWrapping } from 'three';

class Water extends Group {
  static water;

  constructor() {
    super();

    this.defineWater();
  }

  defineWater() {
    const waterProperties = {
      width: 500,
      height: 500,
    }
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/water.webp');

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    const repeatX = 100;
    const repeatY = 100;
    texture.repeat.set(repeatX, repeatY);

    this.water = new Mesh(
      new PlaneGeometry(waterProperties.width, waterProperties.height, 1), 
      new MeshBasicMaterial({ map: texture })
    );

    this.water.position.z = -0.2;

    this.add(this.water);
  }

  updateWater(speed) {
    const animate = () => {
      requestAnimationFrame(animate);
      this.water.position.y -= speed;
        if(this.water.position.y < -30) {
          this.water.position.y = 80;
        }
    }
  
    animate();
  }
}

export default Water;