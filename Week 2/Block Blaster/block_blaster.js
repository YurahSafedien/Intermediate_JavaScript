import player from "./player.js";
import bullet_controller from "./bullet_controller.js";
import enemy from "./enemy.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

//canvas specs
canvas.width = 550;
canvas.height = 500;

const bulletController = new bullet_controller(canvas);
const playerbb = new player(canvas.width / 2.2, canvas.height / 1.3, bulletController); 

const enemies = [
    new enemy(50, 20, "green", 5),
    new enemy(150, 20, "red", 5),
    new enemy(250, 20, "gold", 2),
    new enemy(350, 20, "green", 2),
    new enemy(450, 20, "gold", 10),
    new enemy(50, 100, "green", 5),
    new enemy(150, 100, "gold", 5),
    new enemy(250, 100, "red", 2),
    new enemy(350, 100, "gold", 2),
    new enemy(450, 100, "green", 20),
]
function gameLoop() {
    setCommonStyle();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bulletController.draw(ctx);  
    playerbb.draw(ctx);
    //new enemy(100, 100, "yellow", 10).draw(ctx); 
    enemies.forEach((enemy) => {
        if(bulletController.collideWidth(enemy)) {
            if(enemy.health <= 0) {
                const index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
            }
        } else {
            enemy.draw(ctx);
        }
    });
}

function setCommonStyle() {
    ctx.shadowColor = "#d53";
    ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000/60);