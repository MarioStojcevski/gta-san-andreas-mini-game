import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader, RepeatWrapping } from 'three';

import Water from './Water.js';
import Clouds from './Clouds.js';

class Road extends Group {
  static roads;

  constructor() {
    super();

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/road.jpeg');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    const repeatX = 1;
    const repeatY = 20;
    texture.repeat.set(repeatX, repeatY);
    this.roads = [];
    
    for(let i=2; i<4; i+=2) {
      const road = new Mesh(
        new PlaneGeometry(4, i*100, 1), 
        new MeshBasicMaterial({ map: texture })
      )

      road.castShadow = true;
      road.receiveShadow = true;
      this.add(road);
      this.roads.push(road);
    };

    this.water = new Water();
    this.clouds = new Clouds();

    this.add(this.water);
    this.add(this.clouds);
  }

  updateRoad(speed) {
    const animate = () => {
      requestAnimationFrame(animate);
      this.roads.forEach((road) => {
        road.position.y -= speed;
        if(road.position.y < -30) {
          road.position.y = 80;
        }
      });
    }
  
    animate();
  }
}

export default Road;