import { Group, Box3 } from 'three';

import Road from './environment/Road.js';
import Player from './objects/Player.js';
import MoneyPool from './objects/MoneyPool.js';

const score = document.querySelector('#scoreAmount');

class Game extends Group {
  static road;
  static player;
  numberOfMoney;
  isDown;
  rollingStarted;
  speed;
  moneyPool;
  
  constructor() {
    super();

    this.speed = 0.1;
    this.road = new Road();
    this.player = new Player();
    this.moneyPool = new MoneyPool();
    this.numberOfMoney = 30;

    this.add(this.road);
    this.add(this.player);
    this.add(this.moneyPool);

    this.generateMoney();
  }

  onMove(x, isMobile) {
    if(this.isDown) {
      this.player.position.x = !isMobile ? x * 2 : x * 2;
    }
  }

  onDown() {
    this.isDown = true;
    if(!this.rollingStarted) {
      this.rollingStarted = true;
      this.road.updateRoad(this.speed);
      const animate = () => {
        requestAnimationFrame(animate);
        this.moneyPool.updateMoney(this.speed);
        this.detectCollision();
      }

      animate();
    }
  }

  onUp() {
    this.isDown = false;
  }

  generateMoney() {
    for (let i = 0; i < this.numberOfMoney; i++) {
      this.moneyPool.addMoney();
    }
  }

  detectCollision() {
    const playerBoundingBox = new Box3().setFromObject(this.player);
    const moneyBoundingBoxes = this.moneyPool.objects.map((obj) => {
      return new Box3().setFromObject(obj.object);
    });
    for (let i = 0; i < moneyBoundingBoxes.length; i++) {
      const moneyBoundingBox = moneyBoundingBoxes[i];
      const object = this.moneyPool.objects[i];
      if(playerBoundingBox.intersectsBox(moneyBoundingBox)) {
        score.innerHTML = parseInt(score.innerHTML) + (object.isBad ? -1 : 1);
        object.object.position.y += 30;
        object.object.position.x = (Math.random() * 3) - 1.5;
      }
    }
    
  }
}

export default Game;