window.addEventListener('DOMContentLoaded', () => {
    const fieldSize=200;
    const field = document.getElementById('field');
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button')

    const WIDTH=10;
    //Terominoes

    const lTetromino = [
        [1, WIDTH + 1, WIDTH * 2 + 1, 2],
        [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2],
        [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2],
        [WIDTH, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2]
    ]
    const zTetromino = [
        [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
        [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
        [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
        [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1]
    ]
    const sTetromino = [
        [WIDTH + 1, WIDTH * 2 + 1, 0, WIDTH],
        [WIDTH * 2, WIDTH * 2 + 1, WIDTH + 1, WIDTH + 2],
        [WIDTH + 1, WIDTH * 2 + 1, 0, WIDTH],
        [WIDTH * 2, WIDTH * 2 + 1, WIDTH + 1, WIDTH + 2]
    ]
    const tTetromino = [
        [1, WIDTH, WIDTH + 1, WIDTH + 2],
        [1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
        [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
        [1, WIDTH, WIDTH + 1, WIDTH * 2 + 1]
    ]
    const oTetromino = [
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1]
    ]

    const iTetromino = [
        [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
        [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
        [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
        [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3]
    ]


    //field initialisation
    for (let i = 0; i<fieldSize; i++) {
        document.getElementById('field').appendChild(document.createElement('div'));
    }
    let squares = Array.from(document.querySelectorAll('.field div'));
    console.log (squares);
});