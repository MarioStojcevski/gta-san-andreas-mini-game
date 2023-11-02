import { Group, Mesh, PlaneGeometry, TextureLoader, RepeatWrapping, BoxGeometry, MeshPhongMaterial } from 'three';

class Road extends Group {
  static roads;
  static leftCurb;
  static rightCurb;

  constructor() {
    super();

    this.roads = [];

    this.defineCurbs();

    this.defineRoads();
  }

  defineRoads() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/road.jpeg');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    const repeatX = 1;
    const repeatY = 20;
    texture.repeat.set(repeatX, repeatY);
    
    for(let i=2; i<4; i+=2) {
      const road = new Mesh(
        new PlaneGeometry(4, i*100, 1), 
        new MeshPhongMaterial({ map: texture })
      )

      road.receiveShadow = true;
      this.add(road);
      this.roads.push(road);
    };
  }

  defineCurbs() {
    const curbProperties = {
      width: 0.4,
      height: 40,
      depth: 0.4,
      color: 0x696969,
    }

    this.leftCurb = new Mesh(
      new BoxGeometry(curbProperties.width, curbProperties.height, curbProperties.depth), 
      new MeshPhongMaterial({ color: curbProperties.color })
    );

    this.rightCurb = new Mesh(
      new BoxGeometry(curbProperties.width, curbProperties.height, curbProperties.depth), 
      new MeshPhongMaterial({ color: curbProperties.color})
    );

    this.leftCurb.position.x = -2;
    this.rightCurb.position.x = 2;
    this.add(this.leftCurb);
    this.add(this.rightCurb);
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