var TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked"
}

function createBoard(boardSize, numberOfMines) {
    const board = new Array;
    const minePositions = getMinePositions(boardSize, numberOfMines)
    for(var x = 0; x < boardSize; x++) {
        const row = new Array;
        for(var y = 0; y < boardSize; y++) {
            const status = TILE_STATUSES["HIDDEN"]

            const tile = {
                status, color: [186, 186, 186, 255], color2: [115, 115, 115, 255], x, y, mine: minePositions.some(positionMatch.bind(null, {x, y}))
            }

            row.push(tile)
        }

        board.push(row)
    }

    return board
}

function getMinePositions(boardSize, numberOfMines) {
    const positions = new Array;

    while(positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize), y: randomNumber(boardSize)
        }

        if(!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }

    return positions
}

var cache = new Object
var chislo = 0;

function revealTile(board, tile) {
    var count = 0
    if(tile.status !== TILE_STATUSES["HIDDEN"]) return

    if(tile.mine) {
        tile.status = TILE_STATUSES["MINE"];
        return;
    }

    tile.status = TILE_STATUSES["NUMBER"]
    const aT = nearbyTiles(board, tile)
    const mines = aT.filter(function(t) {
        if(t.mine == true) count++
    })

    cache[chislo++] = {
        x: tile.x * 25,
        y: tile.y * 25,
        count: count == 0 ? "" : count++
    }
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

function nearbyTiles(board, tile) {
    const tiles = new Array

    for(var xOffset = -1; xOffset <= 1; xOffset++) {
        for(var yOffset = -1; yOffset <= 1; yOffset++) {
            if(board[tile.x + xOffset] == undefined || board[tile.x + xOffset][tile.y + yOffset] == undefined) continue;
            const tile2 = board[tile.x + xOffset][tile.y + yOffset]
            tiles.push(tile2)
        }
    }

    return tiles
}

var screen = Render.GetScreenSize()
UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "MineSweeper")
UI.AddSliderInt(["Visuals", "MineSweeper", "MineSweeper"], "Position X", 5, screen[0])
UI.AddSliderInt(["Visuals", "MineSweeper", "MineSweeper"], "Position Y", 5, screen[1])
UI.AddCheckbox(["Visuals", "MineSweeper", "MineSweeper"], "Hardcore Mode (RageQuit On bomb)")

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10;
var breakGame = false
var board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
var cache = [0, 0]; var drg = 0
var CursorBox = function(mouse_pos, x, y, x2, y2) { return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) }
function StringShadow(x, y, centered, text, color, font) {
    Render.String(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x, y, centered, text, color, font)
}
function Drag(pos, x, y, x2, y2) {
    if(Input.IsKeyPressed(0x01)) {
        if(CursorBox(pos, x, y, x2, y2) && drg == 0) {
            cache[0] = x - pos[0]
            cache[1] = y - pos[1]
            drg = 1
        }
    }
    if (!Input.IsKeyPressed(0x01)) drg = 0
    if(UI.IsMenuOpen() > 0 && drg == 1) {
        UI.SetValue(["Visuals", "MineSweeper", "MineSweeper", "Position X"], pos[0] + cache[0])
        UI.SetValue(["Visuals", "MineSweeper", "MineSweeper", "Position Y"], pos[1] + cache[1])
    }
}

function draw() {
    if(!UI.IsMenuOpen()) return;
    var x_pos = UI.GetValue(["Visuals", "MineSweeper", "MineSweeper", "Position X"]);
    var y_pos = UI.GetValue(["Visuals", "MineSweeper", "MineSweeper", "Position Y"]);
    Drag(Input.GetCursorPosition(), x_pos, y_pos, x_pos + (25 * BOARD_SIZE + 5), y_pos + 40)
    var font = Render.GetFont("Verdanab.ttf", 12, true)
    Render.FilledRect(x_pos, y_pos, 25 * BOARD_SIZE + 5, 25 * BOARD_SIZE + 40, [25, 25, 25, 255])
    StringShadow(x_pos + 5, y_pos + 5, 0, "MineSweeper", [255, 255, 255, 255], font)

    if(breakGame){
        if(UI.GetValue(["Visuals", "MineSweeper", "MineSweeper", "Hardcore Mode (RageQuit On bomb)"])) {
            Cheat.ExecuteCommand("quit")
        }
        StringShadow(x_pos + 15, y_pos + (25 * BOARD_SIZE) / 2, 0, "You lost!\npress enter to play again!", [255, 255, 255, 255], font)
        if(Input.IsKeyPressed(0x0D)) {
            breakGame = false
            chislo = -1
            board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
        }

        return
    }

    board.forEach(function(row) {
        row.forEach(function(tile) {
            if(CursorBox(Input.GetCursorPosition(), x_pos + 5 + tile.x * 25, y_pos + 40 + tile.y * 25, x_pos + 5 + tile.x * 25 + 20, y_pos + 40 + tile.y * 25 + 20) && Input.IsKeyPressed(0x04) && tile.status !== "marked") {
                tile.status = "marked"
            }

            if(CursorBox(Input.GetCursorPosition(), x_pos + 5 + tile.x * 25, y_pos + 40 + tile.y * 25, x_pos + 5 + tile.x * 25 + 20, y_pos + 40 + tile.y * 25 + 20) && Input.IsKeyPressed(0x02) && tile.status == "marked") {
                tile.status = "hidden"
            }

            switch (tile.status) {
                case TILE_STATUSES["HIDDEN"]:
                    tile.color = [186, 186, 186, 255]
                    tile.color2 = [115, 115, 115, 255]
                break;

                case TILE_STATUSES["NUMBER"]:
                    tile.color = [115, 115, 115, 255]
                    tile.color2 = [186, 186, 186, 255]
                break;

                case TILE_STATUSES["MINE"]:
                    tile.color = [255, 105, 105, 255]
                    tile.color2 = [115, 115, 115, 255]
                break;

                case TILE_STATUSES["MARKED"]:
                    tile.color = [255, 246, 120, 255]
                    tile.color2 = [115, 115, 115, 255]
                break;
            }
          
            Render.FilledRect(x_pos + 5 + tile.x * 25, y_pos + 40 + tile.y * 25, 20, 20, tile.color)
            Render.Rect(x_pos + 5 + tile.x * 25, y_pos + 40 + tile.y * 25, 20, 20, tile.color2)
      
            if(CursorBox(Input.GetCursorPosition(), x_pos + 5 + tile.x * 25, y_pos + 40 + tile.y * 25, x_pos + 5 + tile.x * 25 + 20, y_pos + 40 + tile.y * 25 + 20) && Input.IsKeyPressed(0x01)) {
                revealTile(board, tile)
                if(tile.mine) {
                    breakGame = true
                }
            }
        })
    })

    for(var i = 0; i < chislo; i++) {
        Render.String(x_pos + 9 + cache[i].x, y_pos + 35 + cache[i].y, 0, cache[i].count.toString(), [255, 255, 255, 255], 3)
    }
}

Cheat.RegisterCallback("Draw", "draw")
