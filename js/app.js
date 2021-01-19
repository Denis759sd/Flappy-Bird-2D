var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();


bird.src = "assets/images/bird.png";
bg.src = "assets/images/background.png";
fg.src = "assets/images/ground.png";
pipeUp.src = "assets/images/pipeUp.png";
pipeBottom.src = "assets/images/pipeBottom.png";

var gap = 100;
var score = 0;

//Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// Звуковые эффекты
var fly = new Audio();
var score_audio = new Audio();

fly.src = "assets/audio/fly.mp3"
score_audio.src = "assets/audio/score.mp3"

document.addEventListener("keydown", moveUp);

function moveUp () {
    yPos -= 25;
    fly.play();
}

//Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.clientWidth,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x --;

        if (pipe[i].x == 130) {
            pipe.push({
                x: cvs.clientWidth,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        

      
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                grav = 0;
                location.reload();
        }

        
        if(pipe[i].x == 5) {
           score++;
           score_audio.play();
        };
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = '#fff';
    ctx.font = '20px Roboto';
    ctx.fillText("Score: " + score, 10, cvs.height - 485);

    requestAnimationFrame(draw);
}

pipeUp.onload = draw();