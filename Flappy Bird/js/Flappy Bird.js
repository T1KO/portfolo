let cvs=document.getElementById("canvas");
let ctx=cvs.getContext("2d");

let bird=new Image()
let bg=new Image()
let frontBg=new Image()
let pipeUp=new Image()
let pipeDowun=new Image()

bird.src="img/flappy_bird_bird.png"
bg.src="img/flappy_bird_bg.png"
frontBg.src="img/flappy_bird_fg.png"
pipeUp.src="img/flappy_bird_pipeUp.png"
pipeDowun.src="img/flappy_bird_pipeBottom.png"
let gap=90;



//ձայնաին էֆեկտներ
let fly= new Audio();
let score_audio =new Audio();

fly.src="audio/fly.mp3"
score_audio.src="audio/score.mp3"

// Որևիցէ ստեղնի սխման ժամանակ

document.addEventListener("keydown",moveUP)

function moveUP(){
     yPos-=25;
     fly.play();
    
}
//



//Բլոկների ստեղծում

let pipe=[];
pipe[0]={
    x : cvs.width,
    y : 0
}
//



//Ծտի պոզիցիանները

let xPos=10;
let yPos=150;
let grav=1.5;
let score=0

//


function draw(){

 
    ctx.drawImage(bg,0,0);
    for(i=0;i<pipe.length;i++){
        ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeDowun,pipe[i].x,pipe[i].y+pipeUp.height+gap);
        pipe[i].x--;

        if(pipe[i].x== 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >=pipe[i].x && xPos <= pipe[i].x +pipeUp.width 
            &&(yPos <= pipe[i].y+pipeUp.height
            || yPos+bird.height >= pipe[i].y+pipeUp.height+gap) || yPos+ bird.height >=cvs.height-frontBg.height){
                location.reload()
  
            }
            if(pipe[i].x == 5){
                score++;
                score_audio.play()
            }
    }
    
    ctx.drawImage(frontBg,0,cvs.height-frontBg.height)
    ctx.drawImage(bird,xPos,yPos)
    yPos+=grav;

    ctx.fillStyle="#000";
    ctx.font ="24px Verdana";
    ctx.fillText("СЧЁТ: " + score, 10 ,cvs.height-20)

    requestAnimationFrame(draw)
    
    
}

yPos+=grav

pipeDowun.onload=draw