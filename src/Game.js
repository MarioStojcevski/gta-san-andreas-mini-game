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
      this.player.position.x = !isMobile ? x * 2 : x;
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

        // Rotate the player
        const playerPosition = this.player.position.x;
        const roadPosition = this.road.position.x;
        const difference = playerPosition - roadPosition;
        const rotation = difference * 0.5;
        this.player.rotation.z = rotation;

        // Out of bounds
        if (playerPosition < -0.85 || playerPosition > 0.85) {
          this.player.position.y -= 0.1;
          this.player.position.z -= 0.05;
        }

        // Flash the player if out of bounds
        if (this.player.position.y < -4) {
          this.player.position.set(0, 0, 0.2);
          const flash = setInterval(() => {
            this.player.visible = !this.player.visible;
          }, 100);
          setTimeout(() => {
            clearInterval(flash);
            this.player.visible = true;
          }, 1000);
        }

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

        const tint = setInterval(() => {
          if(object.isBad) {
            this.player.traverse((child) => {
              if(child.isMesh) {
                child.material.color.setHex(0xff0000);
              }
            });
          } else {
            this.player.traverse((child) => {
              if(child.isMesh) {
                child.material.color.setHex(0x00ff00);
              }
            });
          }
        }, 100);

        setTimeout(() => {
          clearInterval(tint);
          this.player.traverse((child) => {
            if(child.isMesh) {
              child.material.color.setHex(0xffffff);
            }
          });
        }, 500);
      }
    }
    
  }
}

export default Game;