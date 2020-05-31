const COLS = 10;
const ROWS = 20;
const FIELD_SIZE = COLS * ROWS;
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

    constructor() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                let cell = document.createElement('div');
                cell.setAttribute("id", `x${x}y${y}`);
                document.getElementById('field').appendChild(cell);
            }
        }
    }

    clearField() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
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
        this.color = 'blue';
        this.shape = TETROMINO[this.randomize()];

        // Starting position.
        this.x = 3;
        this.y = 0;
    }
    randomize() {
        return Math.floor(Math.random() * TETROMINO.length + 1);
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    document.getElementById(`x${this.x + x}y${this.y + y}`)
                        .setAttribute("class", `color${this.color}`);
                }
            });
        });
    }
}


window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
            alert("ArrowDown");
            break;
        case "KeyW":
        case "ArrowUp":
            alert("ArrowUp");
            break;
        case "KeyA":
        case "ArrowLeft":
            alert("ArrowLeft");
            break;
        case "KeyD":
        case "ArrowRight":
            alert("ArrowRight");
            break;
    }

    // Consume the event so it doesn't get handled twice
    event.preventDefault();
}, true);

    let field = new Field();
    let tetromino = new Tetromino();
    console.log(this);

    function play() {
        field.clearField();
        tetromino.draw();
        console.table(field.clearField());

    }

