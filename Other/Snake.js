/*
    Snake Game
    by kseny :D
*/

var screenSize = Global.GetScreenSize();
var gameBoxSize = 300;

var lastMove = 0;
var currentMovingDirection = 0;
var snake = [{x : 150, y: 150}, {x : 140, y: 150}, {x : 130, y: 150}];

var playerScore = 0;
var highestScore = 0;
var gameOver = false;
var gameOverShowTime = 0;

var food = null;

function randomPositionInBox(min, max)
{
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function generateFood()
{
    var good_positions = true;

    do
    {
        good_positions = true;
        var x = randomPositionInBox(0, gameBoxSize - 10);
        var y = randomPositionInBox(0, gameBoxSize - 10);

        for(var i = 0; i < snake.length; i ++)
        {
            if(snake[i].x == x && snake[i].y == y)
            {
                good_positions = false;
                break;
            }
        }
    }
    while(good_positions == false);

    food = {x: x, y: y};
}

function moveSnake()
{

    var x_axis = 0;
    var y_axis = 0;

    switch(currentMovingDirection)
    {
        case 0:
        {
            x_axis = 10;
            break;
        }
        case 1:
        {
            x_axis = -10;
            break;
        }
        case 2:
        {
            y_axis = -10;
            break;
        }
        case 3:
        {
            y_axis = 10;
            break;
        }
    }

    if(snake[0].x + x_axis >= gameBoxSize || snake[0].x + x_axis < 0 || snake[0].y + y_axis >= gameBoxSize || snake[0].y + y_axis < 0)
    {
        gameOver = true;
        gameOverShowTime = Global.Realtime() + 5;
        return;
    }
    else
    {
        for(var i = 1; i < snake.length; i ++)
        {
            if(snake[i].x == snake[0].x + x_axis && snake[i].y == snake[0].y + y_axis)
            {
                gameOver = true;
                gameOverShowTime = Global.Realtime() + 5;
                return;
            }
        }

        snake.unshift({x : snake[0].x + x_axis, y : snake[0].y + y_axis });
        snake.pop();

        if(food == null)
        {
            generateFood();
        }
        else
        {
            if(snake[0].x == food.x && snake[0].y == food.y)
            {
                playerScore ++;

                if(playerScore > highestScore)
                    highestScore = playerScore;

                snake.unshift({x : snake[0].x + x_axis, y : snake[0].y + y_axis });

                generateFood();
            }
        }
    }
}

function onDrawEvent()
{
    if(!UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Play Snake Game") || !UI.IsMenuOpen())
        return;

    Render.GradientRect(screenSize[0]/2 - gameBoxSize/2 - 5, screenSize[1]/2 - gameBoxSize/2 - 34 - 2, gameBoxSize + 10, 4, 1, [217, 157, 86, 255], [223, 174, 97, 255]);
    Render.FilledRect(screenSize[0]/2 - gameBoxSize/2 - 5, screenSize[1]/2 - gameBoxSize/2 - 30 - 2, gameBoxSize + 10, 25, [44, 48, 55, 255]);
    Render.String(screenSize[0]/2, screenSize[1]/2 - gameBoxSize/2 - 25 - 2, 1, "Snake Game" + " [score: "+ playerScore +"]", [255, 255, 255, 255]);

    
    Render.FilledRect(screenSize[0]/2 - gameBoxSize/2 - 5, screenSize[1]/2 - gameBoxSize/2 - 5, gameBoxSize + 10, gameBoxSize + 10, [44, 48, 55, 255]);
    Render.Rect(screenSize[0]/2 - gameBoxSize/2, screenSize[1]/2 - gameBoxSize/2, gameBoxSize, gameBoxSize, [100, 100, 100, 150]);

    var snakeIsPaused = UI.IsHotkeyActive("MISC", "JAVASCRIPT", "Script Items", "Pause Snake Game");

    if(snakeIsPaused)
    {
        Render.String(screenSize[0]/2, screenSize[1]/2 - 5, 1, "The game is paused", [255, 0, 0, 255]);
    }

    if(gameOver)
    {   
        Render.String(screenSize[0]/2, screenSize[1]/2 - 25, 1, "Game over!", [255, 0, 0, 255]);
        Render.String(screenSize[0]/2, screenSize[1]/2 - 10, 1, "Score: " + playerScore, [255, 0, 0, 255]);
        Render.String(screenSize[0]/2, screenSize[1]/2 + 5, 1, "Highest score: " + highestScore, [255, 0, 0, 255]);

        if(Global.Realtime() > gameOverShowTime)
        {
            playerScore = 0;
            gameOver = false;
            gameOverShowTime = 0;
            currentMovingDirection = 0;
            snake = [{x : 150, y: 150}, {x : 140, y: 150}, {x : 130, y: 150}];
        }
        return;
    }

    if(!snakeIsPaused && !gameOver)
    {

        if(food != null)
        {
            Render.FilledRect(screenSize[0]/2 - gameBoxSize/2 + food.x, screenSize[1]/2 - gameBoxSize/2 + food.y, 10, 10, [255, 0, 0, 255]);
            Render.Rect(screenSize[0]/2 - gameBoxSize/2 + food.x, screenSize[1]/2 - gameBoxSize/2 + food.y, 10, 10, [0, 0, 0, 255]);
        }

        for(var i = 0; i < snake.length; i++)
        {
            Render.FilledRect(screenSize[0]/2 - gameBoxSize/2 + snake[i].x, screenSize[1]/2 - gameBoxSize/2 + snake[i].y, 10, 10, [17, 102, 9, 255]);
            Render.Rect(screenSize[0]/2 - gameBoxSize/2 + snake[i].x, screenSize[1]/2 - gameBoxSize/2 + snake[i].y, 10, 10, [0, 0, 0, 255]);
        }
    }

    if(snakeIsPaused)
        return;

    if(Global.IsKeyPressed(0x26) && currentMovingDirection != 3)
    {
        currentMovingDirection = 2;
    }
    else if(Global.IsKeyPressed(0x28) && currentMovingDirection != 2)
    {
        currentMovingDirection = 3;
    }
    else if(Global.IsKeyPressed(0x27) && currentMovingDirection != 1)
    {
        currentMovingDirection = 0;
    }
    else if(Global.IsKeyPressed(0x25) && currentMovingDirection != 0)
    {
        currentMovingDirection = 1;
    }

    if(Global.Realtime() - lastMove > 0.2)
    {
        moveSnake();
        lastMove = Global.Realtime();
    }
}

Global.RegisterCallback("Draw", "onDrawEvent");

UI.AddCheckbox("Play Snake Game");
UI.AddHotkey("Pause Snake Game");