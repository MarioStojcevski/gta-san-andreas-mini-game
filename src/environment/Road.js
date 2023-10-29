import { Group, Mesh, PlaneGeometry, TextureLoader, RepeatWrapping, BoxGeometry, MeshPhongMaterial } from 'three';

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

    // Create curb
    const leftCurb = new Mesh(
      new BoxGeometry(0.4, 40, 0.4), 
      new MeshPhongMaterial({ color: 0x696969 })
    );

    const rightCurb = new Mesh(
      new BoxGeometry(0.4, 40, 0.4), 
      new MeshPhongMaterial({ color: 0x696969 })
    );

    leftCurb.position.x = -2;
    rightCurb.position.x = 2;
    this.add(leftCurb);
    this.add(rightCurb);
    
    for(let i=2; i<4; i+=2) {
      const road = new Mesh(
        new PlaneGeometry(4, i*100, 1), 
        new MeshPhongMaterial({ map: texture })
      )

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