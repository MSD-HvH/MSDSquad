const screen = Render.GetScreenSize();

interface SnakeGameStructure {
    gameBoxSize: number;

    lastMove: number;
    currentMovingDirection: number;
    snake: [{ x: number; y: number; }, { x: number; y: number; }, { x: number; y: number; }];

    playerScore: number;
    highestScore: number;
    gameOver: boolean;
    gameOverShowTime: number;

    food: {x: number, y: number};
};

class SnakeGame implements SnakeGameStructure {
    public readonly gameBoxSize: number = 300

    public lastMove: number = 0;
    public currentMovingDirection: number = 0;
    public snake: [{ x: number; y: number; }, { x: number; y: number; }, { x: number; y: number; }] = [
        {x: 150, y: 150}, 
        {x: 140, y: 150}, 
        {x: 130, y: 150}
    ];
    
    public playerScore: number = 0;
    public highestScore: number = 0;
    public gameOver: boolean = false;
    public gameOverShowTime: number = 0;

    public food: {x: number, y: number} = null;

    public readonly randomPositionInBox = <F extends number, S extends number>(min: F, max: S) => {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    };

    public readonly generateFood = () => {
        let good_positions: boolean = true;

        do {
            good_positions = true;
            
            const x: number = this.randomPositionInBox(0, this.gameBoxSize - 10);
            const y: number = this.randomPositionInBox(0, this.gameBoxSize - 10);

            for(let i: number = 0; i < this.snake.length; i++) {
                if(this.snake[i].x == x && this.snake[i].y == y) {
                    good_positions = false;

                    break;
                };
            };
            
            this.food = {x: x, y: y};
        } while(good_positions == false);
    };

    public readonly moveSnake = () => {
        let x_axis: number = 0;
        let y_axis: number = 0;

        switch(this.currentMovingDirection) {
            case 0:
                x_axis = 10;
            break;

            case 1:
                x_axis = -10
            break;

            case 2:
                y_axis = -10;
            break;

            case 3:
                y_axis = 10;
            break;
        };

        if(this.snake[0].x + x_axis >= this.gameBoxSize || this.snake[0].x + x_axis < 0 || this.snake[0].y + y_axis >= this.gameBoxSize || this.snake[0].y + y_axis < 0) {
            this.gameOver = true;
            this.gameOverShowTime = Globals.Realtime() + 5;

            return;
        } else {
            for(let i: number = 1; i < this.snake.length; i++) {
                if(this.snake[i].x == this.snake[0].x + x_axis && this.snake[i].y == this.snake[0].y + y_axis) {
                    this.gameOver = true;
                    this.gameOverShowTime = Globals.Realtime() + 5;

                    return;
                }
            };

            this.snake.unshift({x : this.snake[0].x + x_axis, y : this.snake[0].y + y_axis });
            this.snake.pop();

            if(!this.food) {
                this.generateFood();
            } else {
                if(this.snake[0].x == this.food.x && this.snake[0].y == this.food.y) {
                    this.playerScore++;
    
                    if(this.playerScore > this.highestScore) this.highestScore = this.playerScore;
    
                    this.snake.unshift({x : this.snake[0].x + x_axis, y : this.snake[0].y + y_axis });
    
                    this.generateFood();
                };
            };
        };
    };

    public readonly onDrawEvent = () => {
        Render.GradientRect(screen[0] / 2 - this.gameBoxSize / 2 - 5, screen[1] / 2 - this.gameBoxSize / 2 - 34 - 2, this.gameBoxSize + 10, 4, 1, [217, 157, 86, 255], [223, 174, 97, 255]);
        Render.FilledRect(screen[0] / 2 - this.gameBoxSize / 2 - 5, screen[1] / 2 - this.gameBoxSize / 2 - 30 - 2, this.gameBoxSize + 10, 25, [44, 48, 55, 255]);
        Render.String(screen[0] / 2, screen[1] / 2 - this.gameBoxSize / 2 - 25 - 2, 1, `Snake Game [score: ${this.playerScore}]`, [255, 255, 255, 255], 1);

        Render.FilledRect(screen[0] / 2 - this.gameBoxSize / 2 - 5, screen[1] / 2 - this.gameBoxSize / 2 - 5, this.gameBoxSize + 10, this.gameBoxSize + 10, [44, 48, 55, 255]);
        Render.Rect(screen[0] / 2 - this.gameBoxSize / 2, screen[1] / 2 - this.gameBoxSize / 2, this.gameBoxSize, this.gameBoxSize, [100, 100, 100, 150]);

        if(this.gameOver) {   
            Render.String(screen[0] / 2, screen[1] / 2 - 25, 1, "Game over!", [255, 0, 0, 255], 1);
            Render.String(screen[0] / 2, screen[1] / 2 - 10, 1, "Score: " + this.playerScore, [255, 0, 0, 255], 1);
            Render.String(screen[0] / 2, screen[1] / 2 + 5, 1, "Highest score: " + this.highestScore, [255, 0, 0, 255], 1);
    
            if(Globals.Realtime() > this.gameOverShowTime) {
                this.playerScore = 0;
                this.gameOver = false;
                this.gameOverShowTime = 0;
                this.currentMovingDirection = 0;

                this.snake = [{x : 150, y: 150}, {x : 140, y: 150}, {x : 130, y: 150}];
            }
            
            return;
        }

        if(!this.gameOver) {
            if(this.food) {
                Render.FilledRect(screen[0] / 2 - this.gameBoxSize / 2 + this.food.x, screen[1] / 2 - this.gameBoxSize / 2 + this.food.y, 10, 10, [255, 0, 0, 255]);
                Render.Rect(screen[0] / 2 - this.gameBoxSize / 2 + this.food.x, screen[1] / 2 - this.gameBoxSize / 2 + this.food.y, 10, 10, [0, 0, 0, 255]);
            };
    
            for(let i: number = 0; i < this.snake.length; i++) {
                Render.FilledRect(screen[0] / 2 - this.gameBoxSize / 2 + this.snake[i].x, screen[1] / 2 - this.gameBoxSize / 2 + this.snake[i].y, 10, 10, [17, 102, 9, 255]);
                Render.Rect(screen[0] / 2 - this.gameBoxSize / 2 + this.snake[i].x, screen[1] / 2 - this.gameBoxSize / 2 + this.snake[i].y, 10, 10, [0, 0, 0, 255]);
            };
        };

        if(Input.IsKeyPressed(0x26) && this.currentMovingDirection != 3) this.currentMovingDirection = 2;
        if(Input.IsKeyPressed(0x28) && this.currentMovingDirection != 2) this.currentMovingDirection = 3;
        if(Input.IsKeyPressed(0x27) && this.currentMovingDirection != 1) this.currentMovingDirection = 0;
        if(Input.IsKeyPressed(0x25) && this.currentMovingDirection != 0) this.currentMovingDirection = 1;

        if(Globals.Realtime() - this.lastMove > 0.2) {
            this.moveSnake();

            this.lastMove = Globals.Realtime();
        };
    };
};

/**
 * Snake Game
 * 
 * @author Recode by Mased, original by kseny
 * @version 1.0.0
 * 
 * Discord: Mased#1854
 */