const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext =  document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "white";
const snakecolor = "green";
const snakeborder = "black";
const foodcolor = "red";
const unitSize = 25;
let running = false;
let xvelocity = unitSize;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize *2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    
];
window.addEventListener("keydown", changeDirection);
resetbtn.addEventListener("click", resetGame);
gameStart();
 


function gameStart(){
    running = true;
    scoretext.textContent = score;
    createFood();
    drawfood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawfood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();

            }, 150)
    }
    else{
        displayGameOver();

    }
};

function clearBoard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight)

};

function createFood(){
    function randomFood(min, max){
       const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
       return randNum;
    
    }
    foodX = randomFood(0, gamewidth - unitSize);
    foodY = randomFood(0, gamewidth - unitSize);


};

function drawfood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX, foodY, unitSize,unitSize);

};
function moveSnake(){
    const head = {x: snake[0].x + xvelocity,
                    y: snake[0].y + yvelocity};
                    snake.unshift(head);
                    if(snake[0].x == foodX && snake[0].y == foodY){
                        score+=1;
                        scoretext.textContent = score;
                        createFood();


                    }
                    else{
                        snake.pop();
                    }
};  

function drawSnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yvelocity == -unitSize);
    const goingDown = (yvelocity == unitSize);
    const goingRight = (xvelocity == unitSize);
    const goingLeft = (xvelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
        xvelocity = -unitSize;
        yvelocity = 0;
        break;

        case(keyPressed == UP && !goingDown):
        xvelocity = 0;
        yvelocity = -unitSize;
        break;

        case(keyPressed == RIGHT && !goingLeft ):
        xvelocity = unitSize;
        yvelocity = 0;
        break;

        case(keyPressed == DOWN && !goingUP):
        xvelocity = 0;
        yvelocity = unitSize;
        break;
        
    }

};  
function checkGameOver(){
    switch(true){
        case(snake[0].x <0):
        running = false;
        break;

        case(snake[0].x >= gamewidth):
        running = false;
        break;

        case(snake[0].y < 0):
        running = false;
        break;

        case(snake[0].y >= gameheight):
        running = false;
        break;

    }
    for(let i =1; i < snake.length; i+=1){
        if(snake[1].x == snake[0].x &&snake[i].y == snake[0].y )
        running= false;
    }
}; 
function displayGameOver(){
    ctx.font ="50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gamewidth/ 2, gameheight/2); 
    running= false;

}; 
function resetGame(){
    score = 0;
    xvelocity =unitSize;
    yvelocity = 0;
    snake = [
    
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize *2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    
];
gameStart();


};






