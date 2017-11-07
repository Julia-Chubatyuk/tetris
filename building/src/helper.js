const colors = ['#f4e010', '#d60c11', '#32bbb9', '#33cd39', '#6a008e', '#ff8f59', '#5926C9', '#C9319E', '#f6e641'];

function writeGameOver() {
    document.getElementById('gameOver').innerHTML = 'Game Over';
}

function writeCount() {
    let count = -1;
    return function () {
        count++;
        document.getElementById('score').innerHTML = count;
    };
}

function getElement(center) {
    const store = [
        [{x: center, y: 0}, {x: center + 1, y: 0}, {x: center, y: 1}, {x:center + 1, y: 1}],
        [{x: center, y: 0}, {x: center, y: 1}, {x:center + 1, y: 1}],
        [{x: center, y: 0}, {x: center, y: 1}, {x: center, y: 2}],
        [{x: center, y: 0}, {x: center, y: 1}, {x:center + 1, y: 1}, {x: center, y: 2}],
        [{x: center, y: 0}, {x: center + 1, y: 0}, {x:center + 1, y: 1}, {x:center + 2, y: 1}],
        [{x: center, y: 1}, {x: center + 1, y: 1}, {x:center + 2, y: 1}, {x:center + 1, y: 0}]
    ];

    return getRandomValue(store);
}

function getColor() {
    return getRandomValue(colors);
}

function getRandomValue(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

export { writeCount, writeGameOver, getColor, getElement }

