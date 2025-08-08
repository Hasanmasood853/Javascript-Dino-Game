const dino = document.querySelector('.dino');
const gameOver = document.querySelector('.gameover');
const obstacle = document.querySelector('.obstacle');
const scoreUpdate = document.querySelector('.score');

let bgAudio = new Audio('/music.mp3');
let goAudio = new Audio('/gameover.mp3');
let score = 0;
let cross = true;

function dinoPositon() {
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    let dinoWidth = dino.offsetWidth;
    let screenWidth = window.innerWidth;

    if (dinoX <= -dinoWidth) {
        dino.style.left = screenWidth + 'px';
    }
    else if (dinoX + dinoWidth >= screenWidth) {
        dino.style.left = "0px";
    }
}

function updateScore() {
    if (cross) {
        score += 1;
        scoreUpdate.innerHTML = `Your score is : ${score}`;
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1500);
    }
}

document.onkeydown = function (e) {
    if (e.which === 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 500);
    }
    if (e.which === 39) {
        dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }
    if (e.which === 37) {
        dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }

    dinoPositon();
}

setInterval(() => {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    let obstacleX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let obstacleY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    let offSetX = Math.abs(dinoX - obstacleX);
    let offSetY = Math.abs(dinoY - obstacleY);

    if (offSetX < 120 && offSetY < 50) {
        console.log('gameover');
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        gameOver.innerHTML = "Game Over! Refresh to Play Again";
        cross = false;
        goAudio.play();
        bgAudio.pause();

    } else if (offSetX < 145 && cross) {
        updateScore();
        bgAudio.play();
    }

}, 100)
