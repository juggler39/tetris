const COLS = 10;
const ROWS = 20;
const COLORS=['cyan', 'yellow', 'blue', 'orange',  'green', 'purple', 'red'];
const TETROMINO = [//I, O, J, L, S, T, Z - tetromino shapes
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],

    [[1, 1],
     [1, 1]],

    [[1, 0, 0],
     [1, 1, 1],
     [0, 0, 0]],

    [[0, 0, 1],
     [1, 1, 1],
     [0, 0, 0]],

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

const kickData =[
        [[0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
        [[0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
        [[0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]],
        [[0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
        [[0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]],
        [[0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
        [[0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
        [[0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]]];

const kickDataI =[
        [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
        [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],
        [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
        [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
        [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],
        [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
        [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
        [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]]];

class Field {

    arrField;
    tetromino;

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

    startGame() {
        this.tetromino=new Tetromino();
        this.tetromino.spawn();
        this.tetromino.draw();
    }

    moveDown () {
        if (this.canMove (this.tetromino.shape, this.tetromino.x, this.tetromino.y+1)) {
            this.tetromino.erase();
            this.tetromino.y=this.tetromino.y+1;
            this.tetromino.draw();
        };
    }

    moveLeft () {
        if (this.canMove (this.tetromino.shape, this.tetromino.x-1, this.tetromino.y)) {
            this.tetromino.erase();
            this.tetromino.x=this.tetromino.x-1;
            this.tetromino.draw();
        };
    }

    moveRight () {
        if (this.canMove (this.tetromino.shape, this.tetromino.x+1, this.tetromino.y)) {
            this.tetromino.erase();
            this.tetromino.x=this.tetromino.x+1;
            this.tetromino.draw();
        };
    }

    rotateClockwise () {

        let clone = JSON.parse(JSON.stringify(this.tetromino.shape)); //copying of bidimentional array
        for (let y = 0; y < clone.length; y++) {
            for (let x = 0; x < y; x++) {
                [clone[x][y], clone[y][x]] = [clone[y][x], clone[x][y]];
            }
        }
        clone.forEach(row => row.reverse());
        for (let i=0;i<5;i++) {
            let dx = kickData[this.tetromino.rotation][i][0];
            let dy = kickData[this.tetromino.rotation][i][1];
            if (this.tetromino.piece===0) {
                dx = kickDataI[this.tetromino.rotation][i][0];
                dy = kickDataI[this.tetromino.rotation][i][1];
            }
            if (this.canMove(clone, this.tetromino.x+dx, this.tetromino.y+dy)) {
                this.tetromino.erase();
                this.tetromino.shape = clone.slice();
                this.tetromino.x+=dx;
                this.tetromino.y+=dy;
                this.tetromino.draw();
                this.tetromino.rotation++;
                if (this.tetromino.rotation === 4) this.tetromino.rotation = 0;
                break;
            }
        }
    }

    rotateCounterClockwise () {
        let clone = JSON.parse(JSON.stringify(this.tetromino.shape));
        clone.forEach(row => row.reverse());
        for (let y = 0; y < clone.length; y++) {
            for (let x = 0; x < y; x++) {
                [clone[x][y], clone[y][x]] = [clone[y][x], clone[x][y]];
            }
        }
        for (let i=0;i<5;i++) {
            let dx = kickData[this.tetromino.rotation+4][i][0];
            let dy = kickData[this.tetromino.rotation+4][i][1];
            if (this.tetromino.piece===0) {
                dx = kickDataI[this.tetromino.rotation+4][i][0];
                dy = kickDataI[this.tetromino.rotation+4][i][1];
            }
            if (this.canMove(clone, this.tetromino.x+dx, this.tetromino.y+dy)) {
                this.tetromino.erase();
                this.tetromino.shape = clone.slice();
                this.tetromino.x+=dx;
                this.tetromino.y+=dy;
                this.tetromino.draw();
                this.tetromino.rotation--;
                if (this.tetromino.rotation === -1) this.tetromino.rotation = 3;
                break;
            }
        }
    }

    canMove (shape, x, y) {
        return shape.every ((row, dy) => {
            return row.every ((square, dx) => {
                return square === 0 || (this.insideWalls(x+dx)&&
                    this.aboveFloor(y+dy)&&this.notOccupied(x+dx, y+dy)); //надо переделать
            });
        });
    };
    insideWalls(x) {
        return x >= 0 && x < COLS;
    }
    aboveFloor(y) {
        return y < ROWS;
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
        this.spawn();
        this.rotation=0;
    }

    spawn() {
        let randNumber = this.randomize();
        this.piece = randNumber;
        this.shape = TETROMINO[randNumber];
        randNumber===1?this.x = 4:this.x = 3; //O-tetromino spawns in the center
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
                        .setAttribute("class", `cell color${COLORS[this.piece]}`);
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
}

window.addEventListener("keydown", function(event) {


    switch(event.code) {
        case "KeyW":
        case "ArrowUp":

            break;
        case "KeyZ":
        case "ControlLeft":
        case "ControlRight":

            break;
        case "KeyA":
        case "ArrowLeft":

            break;
        case "KeyD":
        case "ArrowRight":

            break;
        case "KeyS":
        case "ArrowDown":
            field.moveDown ();
            break;
   }
   let key = event.code;
   if ((key==="KeyW")||(key==="ArrowUp")) field.rotateClockwise ();
   if (key==="KeyZ"||key==="ControlLeft"||key==="ControlRight") field.rotateCounterClockwise ();
   if (key==="KeyD"||key==="ArrowRight") field.moveRight ();
   if (key==="KeyA"||key==="ArrowLeft") field.moveLeft ();


}, true);

let field = new Field();

function play() {
    field.clearField();
    field.startGame();


}