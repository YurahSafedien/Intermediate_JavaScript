import bullet from "./bullet.js";

export default class bullet_controller{
    bullets = [];
    timerTillNextBullet = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    shoot(x, y, speed, damage, delay) {
       if(this.timerTillNextBullet <= 0) {
            if(this.bullets.length < 3){
                this.bullets.push(new bullet(x, y, speed, damage));
            }
           this.timerTillNextBullet = delay;
        }

        this.timerTillNextBullet--;
    }

    draw(ctx) {
        this.bullets.forEach((bulletbc) => {
            if(this.isBulletOffScreen(bulletbc)) {
                const index = this.bullets.indexOf(bulletbc);
                this.bullets.splice(index, 1);
            }
            bulletbc.draw(ctx)
        });
    }

    collideWidth(sprite) {
        return this.bullets.some(bulletbc => {
            if(bulletbc.collideWidth(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bulletbc), 1);
                return true;
            }
            return false;
        })
    }

    isBulletOffScreen(bulletbc) {
         return bulletbc.y <= -bulletbc.height; 
    }
}