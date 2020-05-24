window.addEventListener('DOMContentLoaded', () => {

    const width=10;
    const height=20;
    const fieldSize=width*height;
    const field = document.getElementById('field');
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button');

    
    //Terominoes

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];
    const sTetromino = [
        [width + 1, width * 2 + 1, 0, width],
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [width + 1, width * 2 + 1, 0, width],
        [width * 2, width * 2 + 1, width + 1, width + 2]
    ];
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];
    const tetrominoes=[lTetromino, zTetromino, sTetromino, tTetromino, oTetromino, iTetromino];

    //field initialisation
    for (let i = 0; i<fieldSize; i++) {
        document.getElementById('field').appendChild(document.createElement('div'));
    }
    for (let i = 0; i<width; i++) {
        let El=document.createElement('div');
        El.classList.add('taken');
        document.getElementById('field').appendChild(El);
    }
    let squares = Array.from(document.querySelectorAll('.field div'));

    let currentPosition = 4;
    let currentRotation = 0;
    let current=tetrominoes[random()][0];

    window.addEventListener("keydown", function(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if event already handled
        }

        switch(event.code) {
            case "KeyS":
            case "ArrowDown":
                break;
            case "KeyW":
            case "ArrowUp":
                break;
            case "KeyA":
            case "ArrowLeft":
                moveLeft();
                break;
            case "KeyD":
            case "ArrowRight":

                break;
        }

        refresh();

        // Consume the event so it doesn't get handled twice
        event.preventDefault();
    }, true);

    function random() {
        return Math.floor(Math.random()*tetrominoes.length);
    }

    function draw() {
        current.forEach(index=>{
            squares[currentPosition+index].classList.add('tetromino');
        })
    }

    function erase() {
        current.forEach(index=>{
            squares[currentPosition+index].classList.remove('tetromino');
        })
    }

    function moveDown() {
        erase();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[currentPosition+index+width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition+index].classList.add('taken'));
            current=tetrominoes[random()][currentRotation];
            currentPosition=4;
            draw();
        }
    }

    function moveLeft() {
        erase();
        const isAtLeftEdge=current.some(index => (currentPosition+index)%width===0);
        if (!isAtLeftEdge) currentPosition -=1;
        if (current.some(index => squares[currentPosition+index].classList.contains('taken'))) currentPosition +=1;
        draw();
    }


    //move down
    draw();
    let timerId=setInterval(moveDown, 500);


































});