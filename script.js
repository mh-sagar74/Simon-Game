let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let gameStarted = false;
let level = 0;

let h3 = document.querySelector("h3");

let startBtn = document.querySelector("#startGame");

startBtn.addEventListener("click",()=>{
    if(gameStarted == false){
        gameStarted = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> </br> Press 'RESTART GAME' button to re-start the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "#dbe4ee";
        }, 200);
        reset();
        resetBtn.hidden = false;
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let resetBtn = document.querySelector("#resetGame");
resetBtn.addEventListener("click",()=>{
    if(gameStarted == false){
        gameStarted = true;
        levelUp();
        resetBtn.hidden = true;
    }
})