const COLS = 10;
const ROWS = 20;
const FIELD_SIZE = COLS * ROWS;
const COLORS=['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];
const TETROMINO = [
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],

    [[1, 0, 0],
     [1, 1, 1],
     [0, 0, 0]],

    [[0, 0, 1],
     [1, 1, 1],
     [0, 0, 0]],

    [[1, 1],
     [1, 1]],

    [[0, 1, 1],
     [1, 1, 0],
     [0, 0, 0]],

    [[0, 1, 0],
     [1, 1, 1],
     [0, 0, 0]],

    [[1, 1, 0],
     [0, 1, 1],
     [0, 0, 0]]

];

class Field {

    arrField;

    constructor() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                let cell = document.createElement('div');
                cell.setAttribute("id", `x${x}y${y}`);
                cell.setAttribute("class", `cell empty`);
                document.getElementById('field').appendChild(cell);
            }
        }
        this.arrField = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    clearField() {
        let cells=document.getElementsByClassName('cell');
        for (let i = 0; i<cells.length; i++) {
            cells[i].setAttribute ("class", `cell empty`);
        }
         this.arrField = Array.from({length: ROWS}, () => Array(COLS).fill(0));


        document.getElementById(`x5y5`)
            .setAttribute("class", `cell colorblue`);
        this.arrField[5][5]=1;
    }

    notOccupied(x, y) {
        return this.arrField[y] && this.arrField[y][x] === 0;
    }
}

class Tetromino {
    x;
    y;
    color;
    shape;

    constructor() {
        this.spawn();
    }

    spawn() {
        let randNumber = this.randomize();
        this.color = COLORS[randNumber];
        this.shape = TETROMINO[randNumber];
        randNumber===3?this.x = 4:this.x = 3;
        this.y = 0;
    }
    randomize() {
         return Math.floor(Math.random() * (TETROMINO.length));
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    document.getElementById(`x${this.x + x}y${this.y + y}`)
                        .setAttribute("class", `cell color${this.color}`);
                }
            });
        });
    }

    erase() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    document.getElementById(`x${this.x + x}y${this.y + y}`)
                        .setAttribute("class", `empty`);
                }
            });
        });

    }

    moveDown () {
        if (this.canMove (this.shape, this.x, this.y+1)) {
            this.erase();
            this.y=this.y+1;
            this.draw();
        };
    }

    moveLeft () {
        if (this.canMove (this.shape, this.x-1, this.y)) {
            this.erase();
            this.x=this.x-1;
            this.draw();
        };
    }

    moveRight () {
        if (this.canMove (this.shape, this.x+1, this.y)) {
            this.erase();
            this.x=this.x+1;
            this.draw();
        };
    }
    rotateClockwise () {
        let clone = JSON.parse(JSON.stringify(this.shape));
        for (let y = 0; y < clone.length; y++) {
            for (let x = 0; x < y; x++) {
                [clone[x][y], clone[y][x]] = [clone[y][x], clone[x][y]];
            }
        }
        clone.forEach(row => row.reverse());
         if (this.canMove(clone, this.x, this.y)) {
            this.erase();
            this.shape = clone.slice();
            this.draw();
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
        if (this.canMove(clone, this.x, this.y)) {
            this.erase();
            this.shape = clone.slice();
            this.draw();
        }
    }

    canMove (shape, x, y) {
        return shape.every ((row, dy) => {
            return row.every ((square, dx) => {
                return square === 0 || (this.insideWalls(x+dx)&&
                    this.aboveFloor(y+dy)&&field.notOccupied(x+dx, y+dy)); //надо переделать
            });
        });
    };
    insideWalls(x) {
        return x >= 0 && x < COLS;
    }
    aboveFloor(y) {
        return y < ROWS;
    }
}

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    switch(event.code) {

        case "KeyW":
        case "ArrowUp":
            tetromino.rotateClockwise ();
            break;
        case "KeyZ":
        case "ControlLeft":
        case "ControlRight":
            tetromino.rotateCounterClockwise ();
            break;
        case "KeyA":
        case "ArrowLeft":
            tetromino.moveLeft ();
            break;
        case "KeyD":
        case "ArrowRight":
            tetromino.moveRight ();
            break;
        case "KeyS":
        case "ArrowDown":
            tetromino.moveDown ();
            break;
    }

    event.preventDefault();
}, true);

let field = new Field();
let tetromino = new Tetromino();


function play() {
    field.clearField();
    tetromino.spawn();
    tetromino.draw();

}