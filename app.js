window.addEventListener('DOMContentLoaded', () => {

    const COLS = 10;
    const ROWS = 20;
    const FIELD_SIZE = COLS*ROWS;

    class Field {

        constructor() {
            for (let i = 0; i<FIELD_SIZE; i++) {
                document.getElementById('field').appendChild(document.createElement('div'));
            }
        }
        clearField() {
            return Array.from({length: ROWS}, () => Array(COLS).fill(0));
        }
    }


    let field = new Field();
    field.clearField();

    function play() {
        field.clearField();
    }

});