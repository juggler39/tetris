window.addEventListener('DOMContentLoaded', () => {

    const COLS = 10;
    const ROWS = 20;
    const FIELD_SIZE = COLS*ROWS;

    //field initialisation
    for (let i = 0; i<FIELD_SIZE; i++) {
        document.getElementById('field').appendChild(document.createElement('div'));
    }

    class Field {
        grid;

        // Reset the field when we start a new game.
        reset() {
            this.grid = this.getEmptyBoard();
        }

        // Get matrix filled with zeros.
        getEmptyBoard() {
            return Array.from(
                {length: ROWS}, () => Array(COLS).fill(0)
            );
        }
    }


    let field = new Field();

    function play() {
        field.reset();
        console.table(field.grid);
    }

});