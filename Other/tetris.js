//Developer for onetap: W1zMa1337
//For weave - Mased
var screenSize = render.get_screen_size();
var boxWidth = 240;
var boxHeight = 400;
ui.add_checkbox("Restart", "res")
ui.add_slider("Speed", "speed", 0, 50)

const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function createGamePiece(type) {
    switch(type) {
        case 't': return [[0,0,0], [5,5,5], [0,5,0]];
        case 'o': return [[7,7], [7,7]];
        case 'l': return [[0,4,0], [0,4,0], [0,4,4]];
        case 'j': return [[0,1,0], [0,1,0], [1,1,0]]; 
        case 'i': return [[0,2,0,0], [0,2,0,0], [0,2,0,0], [0,2,0,0]];
        case 's': return [[0,3,3], [3,3,0], [0,0,0]];
        case 'z': return [[6,6,0], [0,6,6], [0,0,0]];
    }
}

var tetrominoesColors = [null, [255, 0, 0, 255], [255, 20, 147, 255], [255, 69, 0, 255], [255, 255, 0, 255], [128, 0, 128, 255], [50, 205, 50, 255], [0, 139, 139, 255]];

function makeMatrix(w, h) {
    var matrix = [];
  
    for(var i = 0; i < h; i++) {
        matrix[i] = [];
        for(var j = 0; j < w; j++) matrix[i][j] = 0;
    }

    return matrix; 
}

var area = makeMatrix(12,20);
var player = { pos: {x : 0, y : 0}, matrix: null, score: 0 };
var move = 1;
var pieces = "ijlostz";
var gameRun = true;

function points() {
    var rowCount = 1;

    outer:for(var y = area.length-1; y > 0; --y) {
        for(var x = 0; x < area[y].length; ++x) {
            if(area[y][x] === 0) {
                continue outer;
            }
        }

        var row = area.splice(y, 1)[0];

        for(var k = 0; k < row.length; k++) row[k] = 0;

        area.unshift(row);
        ++y;

        player.score += rowCount*100;
        rowCount *= 2;
    }
}

function collide(area, player) {
    var m = player.matrix;
    var o = player.pos;

    for(var y = 0; y < m.length; ++y) {
        for(var x = 0; x < m[y].length; ++x) {
            if(m[y][x] !== 0 && (area[y+o.y] && area[y+o.y][x+o.x]) !==0) {
                return true;
            }
        }
    }
    return false;
};


function drawMatrix(matrix, offset) {
    for(var i = 0; i < matrix.length; i++) {
        for(var j = 0; j < matrix[i].length; j ++) {
            if(matrix[i][j] != 0) {
                render.filled_rect([screenSize[0]/2 - boxWidth/2 + j * 20 + offset.x * 20, screenSize[1]/2 - boxHeight/2 + i *20 +offset.y * 20], [20, 20], tetrominoesColors[matrix[i][j]], 0);
                render.rect([screenSize[0]/2 - boxWidth/2 + j * 20 + offset.x * 20, screenSize[1]/2 - boxHeight/2 + i *20 +offset.y * 20], [20, 20], [0, 0, 0, 255], 0);
            }
        }
    }
};


function merge(area, player) {
    for(var y = 0; y < player.matrix.length; y++)   
        for(var x = 0; x < player.matrix[y].length; x++)
            if(player.matrix[y][x]) area[y+player.pos.y][x+player.pos.x] = player.matrix[y][x];
}

function rotate(matrix, dir) {
    for(var y = 0; y < matrix.length; ++y) {
        for(var x = 0; x < y; ++x) {
            var tmp = matrix[x][y];
            matrix[x][y] = matrix[y][x];
            matrix[y][x] = tmp;
        }
    }
  
    if(dir > 0)
        for(var i = 0; i < matrix.length; i++)
            matrix[i].reverse(); 
    else
        matrix.reverse();
}

function playerReset() {
    player.matrix = createGamePiece(pieces[Math.floor(Math.random()*pieces.length)]);
    player.pos.y = 0;
    player.pos.x = (Math.floor(area[0].length/2))-(Math.floor(player.matrix[0].length/2));

    if(collide(area, player)) {
        for(var i = 0; i < area.length; i++)
            for(var j = 0; j < area[i].length; j++)
                area[i][j] = 0;
      
        player.score = 0;
        gameRun = false;
    }
}

function playerDrop() {
    player.pos.y ++;

    if(collide(area, player)) {
        player.pos.y --;
      
        merge(area, player);
        points();
        playerReset();
    }
}

function playerMove(dir) {
    player.pos.x += dir;

    if(collide(area,player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    var pos = player.pos.x;
    var offset = 1;

    rotate(player.matrix, dir);
  
    while(collide(area, player)) {
        player.pos.x += offset;
        offset = -(offset+(offset > 0 ? 1 :-1));

        if(offset > player.matrix[0].length) {
            rotate(player.matrix,-dir);
            player.pos.x=pos;
            return;
        }
    }
}

var lastUpdate = 0;
var lastKeyPress = 0;
const keyboard = {
    "left": [screenSize[0]/2 - 60, screenSize[1]/2 + boxHeight/2 + 69],
    "right": [screenSize[0]/2 + 27, screenSize[1]/2 + boxHeight/2 + 69],
    "up": [screenSize[0]/2 - 16, screenSize[1]/2 + boxHeight/2 + 25],
    "down": [screenSize[0]/2 - 16, screenSize[1]/2 + boxHeight/2 + 69]
}

function onDrawEvent() {
    var pos = ui.get_cursor_position()
    if(ui.get_menu_alpha() < 1) return

    render.filled_rect([screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 34 - 2], [boxWidth + 10, 25], [20, 20, 20, 255], 5);
    render.filled_rect([screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 34 - 2], [boxWidth + 10, 3], [23, 98, 219, 255], 5);
    render.text([screenSize[0]/2 - 50, screenSize[1]/2 - boxHeight/2 - 23], [255, 255, 255, 255], 12, 2, "Tetris Game" + " [score: "+ player.score +"]");

    render.filled_rect([screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 5], [boxWidth + 10, boxHeight + 10], [20, 20, 20, 255], 5);
    render.rect([screenSize[0]/2 - boxWidth/2, screenSize[1]/2 - boxHeight/2], [boxWidth, boxHeight], [100, 100, 100, 150], 0);

    render.filled_rect([screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 + boxHeight/2 + 17], [boxWidth + 10, 100], [20, 20, 20, 255], 5);
    render.rect([screenSize[0]/2 - boxWidth/2, screenSize[1]/2 + boxHeight/2 + 22], [boxWidth, 90], [100, 100, 100, 150], 0);

    render.filled_rect(keyboard.left, [40, 40], [30, 30, 30, 255], 5);
    render.text([keyboard.left[0] + 7, keyboard.left[1] + 19], [255, 255, 255, 255], 12, 1, "Move\nLeft")
    
    render.filled_rect(keyboard.right, [40, 40], [30, 30, 30, 255], 5);
    render.text([keyboard.right[0] + 5, keyboard.right[1] + 19], [255, 255, 255, 255], 12, 1, "Move\nRight")

    render.filled_rect(keyboard.up, [40, 40], [30, 30, 30, 255], 5);
    render.text([keyboard.up[0] + 5, keyboard.up[1] + 19], [255, 255, 255, 255], 12, 1, "Rotate")

    render.filled_rect(keyboard.down, [40, 40], [30, 30, 30, 255], 5);
    render.text([keyboard.down[0] + 5, keyboard.down[1] + 19], [255, 255, 255, 255], 12, 1, "Move\nDown")

    if(!gameRun) {
        render.text([screenSize[0]/2 - 30, screenSize[1]/2 - 15], [0, 0, 255, 255], 12, 2, "Game over!");
        render.text([screenSize[0]/2 - 60, screenSize[1]/2], [0, 0, 255, 255], 12, 2, "Press Restart to start again");

        if(vars.get_uint("js.res"))
            gameRun = true;
            vars.set_uint("js.res", 0)
        return;
    }

    var realTime = global_vars.realtime()

    if(realTime - lastKeyPress > 0.1) {
        if(ui.is_mouse_down()) {
            if(in_bounds(pos, keyboard.left[0], keyboard.left[1], keyboard.left[0] + 40, keyboard.left[1] + 40)) { playerMove(-move) }
            if(in_bounds(pos, keyboard.right[0], keyboard.right[1], keyboard.right[0] + 40, keyboard.right[1] + 40)) { playerMove(+move) }
            if(in_bounds(pos, keyboard.up[0], keyboard.up[1], keyboard.up[0] + 40, keyboard.up[1] + 40)) { playerRotate(-move) }
            if(in_bounds(pos, keyboard.down[0], keyboard.down[1], keyboard.down[0] + 40, keyboard.down[1] + 40)) { playerDrop() }
        lastKeyPress = realTime;
        }
    }

    if(realTime - lastUpdate > (vars.get_uint("js.speed") / 100)) {
        playerDrop();
        lastUpdate = realTime;
    }
    
    drawMatrix(area, {x : 0, y:0});
    drawMatrix(player.matrix, player.pos);
}

register_callback("render", onDrawEvent) 

function onScriptInit() {
    gameRun = true;
    playerReset();
}

onScriptInit();
