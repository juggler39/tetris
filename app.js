'use strict';

const GAMEDATA = {
    cols: 10,
    rows: 20,
    linesPerLevel: 10,
    levelLines: 0,
    maxSpeed: 20,
    colors: ['cyan', 'yellow', 'blue', 'orange', 'green', 'purple', 'red'],     //Standard tetromino colors
    tetromino: [//I, O, J, L, S, T, Z - tetromino shapes
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2], [2, 2]],
    [[3, 0, 0], [3, 3, 3], [0, 0, 0]],
    [[0, 0, 4], [4, 4, 4], [0, 0, 0]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]],

    kickData: [
    [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]],

    kickDataI: [
    [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
    [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
    [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
    [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
    [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]]],

    points: {
        single: 100,
        double: 300,
        triple: 500,
        tetris: 800,
        softDrop: 1,
        hardDrop: 2
    },

    level: {
        0: 800,
        1: 720,
        2: 630,
        3: 550,
        4: 470,
        5: 380,
        6: 300,
        7: 220,
        8: 130,
        9: 100,
        10: 80,
        11: 80,
        12: 80,
        13: 70,
        14: 70,
        15: 70,
        16: 50,
        17: 50,
        18: 50,
        19: 30,
        20: 30,
    },

    accountValues: {
        score: 0,
        lines: 0,
        level: 0,
    }
};



class Field {

    arrField;
    tetromino;
    next;
    pressedKeys = {};
    gamePaused=false;
    constructor() {
        for (let y = 0; y < GAMEDATA.rows; y++) {
            for (let x = 0; x < GAMEDATA.cols; x++) {
                let cell = document.createElement('div');
                cell.setAttribute("id", `x${x}y${y}`);
                cell.setAttribute("class", `cell empty`);
                document.getElementById('field').appendChild(cell);
            }
        }
        this.arrField = Array.from({length: GAMEDATA.rows}, () => Array(GAMEDATA.cols).fill(0));
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                let cell = document.createElement('div');
                cell.setAttribute("id", `nextx${x}y${y}`);
                cell.setAttribute("class", `cellnext nextempty`);
                document.getElementById('next').appendChild(cell);
            }
        }
    }

    clearField() {
        let cells=document.getElementsByClassName('cell');
        for (let i = 0; i<cells.length; i++) {
            cells[i].setAttribute ("class", `cell empty`);
        }
        this.arrField = Array.from({length: GAMEDATA.rows}, () => Array(GAMEDATA.cols).fill(0));
    }

    repaint () {
        for (let y = 0; y < GAMEDATA.rows; y++) {
            for (let x = 0; x < GAMEDATA.cols; x++) {
                let cell = document.getElementById(`x${x}y${y}`);
                if (this.arrField[y][x]===0) {
                    cell.setAttribute("class", `cell empty`);
                } else {
                    cell.setAttribute("class", `cell color${GAMEDATA.colors[this.arrField[y][x]-1]}`);
                }
            }
        }
    }

    startGame() {
        document.getElementById('pause').style.display='none';
        document.getElementById('play-button').innerText='Pause';
        document.getElementById('play-button').setAttribute( "onClick", "pauseGame();" );
        account.score = 0;
        account.lines = 0;
        account.level = 0;
        time.level=1000;
        addEventListeners();
        this.clearField();
        this.tetromino=new Tetromino();
        this.tetromino.spawn();
        this.tetromino.draw();
        this.next=new Tetromino;
        this.next.spawn();
        this.next.nextDraw();
        document.querySelector("audio").play();
    }

    gameOver () {
        document.getElementById('pause').innerText='Game over';
        document.getElementById('pause').style.display='block';
        document.getElementById('play-button').innerText='Play';
        document.getElementById('play-button').setAttribute( "onClick", "playTetris();" );
        window.removeEventListener ("keydown", addKeys, true);
        cancelAnimationFrame(requestId);
    }

    clearRows () {
        let lines=0;
        this.arrField.forEach((row, y) => {
             if (row.every(value => value > 0)) {
                this.arrField.splice(y, 1);
                this.arrField.unshift(Array(GAMEDATA.cols).fill(0));
                this.repaint();
                lines++;
            }
        });
            if (lines > 0) {
                account.lines += lines;
                GAMEDATA.levelLines += lines;
                account.score += getLineClearPoints(lines);
                if (GAMEDATA.levelLines >= GAMEDATA.linesPerLevel) {
                    account.level++;
                    GAMEDATA.levelLines -= GAMEDATA.linesPerLevel;
                    time.level = account.level>20?GAMEDATA.maxSpeed:GAMEDATA.level[account.level];
                }
             }

    }

    freeze () {
        for (let y = 0; y < this.tetromino.shape.length; y++) {
            for (let x = 0; x < this.tetromino.shape[y].length; x++) {
                if (this.tetromino.shape[y][x]!==0) {
                    this.arrField[y+this.tetromino.y][x+this.tetromino.x]=this.tetromino.shape[y][x];
                }
            }
        }
    }

    canMove (shape, x, y) {
        return shape.every ((row, dy) => {
            return row.every ((square, dx) => {
                return square === 0 || (this.insideWalls(x+dx)&&
                    this.aboveFloor(y+dy)&&this.notOccupied(x+dx, y+dy));
            });
        });
    };
    insideWalls(x) {
        return x >= 0 && x < GAMEDATA.cols;
    }
    aboveFloor(y) {
        return y < GAMEDATA.rows;
    }
    notOccupied(x, y) {
        return this.arrField[y] && this.arrField[y][x] === 0;
    }
}

class Tetromino {
    x;
    y;
    piece;
    shape;
    rotation;

    constructor() {
        this.rotation=0;
    }

    spawn() {
        let randNumber = this.randomize();
        this.piece = randNumber;
        this.shape = GAMEDATA.tetromino[randNumber];
        randNumber===1?this.x = 4:this.x = 3; //O-tetromino spawns in the center
        this.y = 0;
    }
    randomize() {
         return Math.floor(Math.random() * (GAMEDATA.tetromino.length));
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    document.getElementById(`x${this.x + x}y${this.y + y}`)
                        .setAttribute("class", `cell color${GAMEDATA.colors[this.piece]}`);
                }
            });
        });
    }

    erase() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    document.getElementById(`x${this.x + x}y${this.y + y}`)
                        .setAttribute("class", `cell empty`);
                }
            });
        });
    }

    nextDraw() {
        let cells=document.getElementsByClassName('cellnext');
        for (let i = 0; i < cells.length; i++) {
            cells[i].setAttribute("class", `cellnext nextempty`);
        }
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                 if (value > 0) {
                    document.getElementById(`nextx${x}y${y}`)
                        .setAttribute("class", `cellnext color${GAMEDATA.colors[this.piece]}`);
                }
            });
        });
    }

    moveDown () {
        if (field.canMove (this.shape, this.x, this.y+1)) {
            this.erase();
            this.y=this.y+1;
            this.draw();
        } else {
            if (this.y===0) return false;
            field.freeze ();
            field.clearRows ();
            field.tetromino=field.next;
            field.tetromino.draw();
            field.next=new Tetromino();
            field.next.spawn();
            field.next.nextDraw();
            return 'dropped';
        }
    }

    moveLeft () {
        if (field.canMove (this.shape, this.x-1, this.y)) {
            this.erase();
            this.x=this.x-1;
            this.draw();
        }
    }

    moveRight () {
        if (field.canMove (this.shape, this.x+1, this.y)) {
            this.erase();
            this.x=this.x+1;
            this.draw();
        }
    }

    hardDrop () {
        window.removeEventListener ("keydown", addKeys, true);
        while (this.moveDown () !== 'dropped') {
            account.score+= GAMEDATA.points.hardDrop;
            }
        addEventListeners ();
    }

    rotateClockwise () {

        let clone = JSON.parse(JSON.stringify(this.shape)); //copying of bidimentional array
        for (let y = 0; y < clone.length; y++) {
            for (let x = 0; x < y; x++) {
                [clone[x][y], clone[y][x]] = [clone[y][x], clone[x][y]];
            }
        }
        clone.forEach(row => row.reverse());
        for (let i=0;i<5;i++) {
            let dx = GAMEDATA.kickData[this.rotation][i][0];
            let dy = GAMEDATA.kickData[this.rotation][i][1];
            if (this.piece===0) {
                dx = GAMEDATA.kickDataI[this.rotation][i][0];
                dy = GAMEDATA.kickDataI[this.rotation][i][1];
            }
            if (field.canMove(clone, this.x+dx, this.y+dy)) {
                this.erase();
                this.shape = clone.slice();
                this.x+=dx;
                this.y+=dy;
                this.draw();
                this.rotation++;
                if (this.rotation === 4) this.rotation = 0;
                break;
            }
        }
    }

    rotateCounterClockwise () {
        let clone = JSON.parse(JSON.stringify(this.shape));
        clone.forEach(row => row.reverse());
        for (let y = 0; y < clone.length; y++) {
            for (let x = 0; x < y; x++) {
                [clone[x][y], clone[y][x]] = [clone[y][x], clone[x][y]];
            }
        }
        for (let i=0;i<5;i++) {
            let dx = GAMEDATA.kickData[this.rotation+4][i][0];
            let dy = GAMEDATA.kickData[this.rotation+4][i][1];
            if (this.piece===0) {
                dx = GAMEDATA.kickDataI[this.rotation+4][i][0];
                dy = GAMEDATA.kickDataI[this.rotation+4][i][1];
            }
            if (field.canMove(clone, this.x+dx, this.y+dy)) {
                this.erase();
                this.shape = clone.slice();
                this.x+=dx;
                this.y+=dy;
                this.draw();
                this.rotation--;
                if (this.rotation === -1) this.rotation = 3;
                break;
            }
        }
    }
}


let field = new Field();

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState !== 'visible') {
        pauseGame();
    }
});

function addEventListeners () {
    window.addEventListener ("keydown", addKeys, true);
    window.addEventListener("keyup", (event) => {
        field.pressedKeys[event.code] = event.type === 'keydown';
    });
}

function addKeys(event) {
    field.pressedKeys[event.code] = event.type === 'keydown';
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    switch(event.code) {
        case "Space":
            if (!field.gamePaused) field.tetromino.hardDrop ();
            break;
        case "KeyW":
        case "KeyX":
        case "ArrowUp":
            if (!field.gamePaused) field.tetromino.rotateClockwise ();
            break;
        case "KeyZ":
        case "ControlLeft":
        case "ControlRight":
            if (!field.gamePaused) field.tetromino.rotateCounterClockwise ();
            break;
        case "KeyA":
        case "ArrowLeft":
            if (!field.gamePaused) field.tetromino.moveLeft ();
            break;
        case "KeyD":
        case "ArrowRight":
            if (!field.gamePaused) field.tetromino.moveRight ();
            break;
        case "Escape":
        case "F1":
            if (field.gamePaused) {
                continueGame();
            } else {
                pauseGame();
            }
            break;
    }
    event.preventDefault();
}

const time = { start: 0, elapsed: 0, level: 1000 };
let requestId=0;
function playTetris() {
    field.startGame();
    window.main = function (now= 0) {
        requestId = window.requestAnimationFrame( main );
        time.elapsed = now - time.start;
        if (field.pressedKeys["ArrowDown"]||field.pressedKeys["KeyS"]) {
            time.elapsed += time.level;
            account.score+= GAMEDATA.points.softDrop;
        }
        if (time.elapsed > time.level) {
            time.start = now;
            if (field.tetromino.moveDown ()===false) field.gameOver ();
        }
    };
    main();
}

function pauseGame () {
    field.gamePaused=true;
    document.getElementById('pause').style.display='block';
    document.getElementById('pause').innerText='Game paused';
    document.getElementById('play-button').innerText='Play';
    document.getElementById('play-button').setAttribute( "onClick", "continueGame();" );
    cancelAnimationFrame(requestId);
}

function continueGame () {
    field.gamePaused=false;
    requestId = window.requestAnimationFrame( main );
    document.getElementById('pause').style.display='none';
    document.getElementById('play-button').innerText='Pause';
    document.getElementById('play-button').setAttribute( "onClick", "pauseGame();" );
}



function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

let account = new Proxy(GAMEDATA.accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

function getLineClearPoints(lines) {
    switch (lines) {
        case 1:
            return GAMEDATA.points.single;
        case 2:
            return GAMEDATA.points.double;
        case 3:
            return GAMEDATA.points.triple;
        case 4:
            return GAMEDATA.points.tetris;
        default:
            return 0;
    }

}