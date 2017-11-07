import {gameElement} from '../entity/gameElement';
import {getRandomColors, isInArray, initCount, writeGameOver} from '../helper';
let matrix, count;

function initMatrix(options) {
    let colors = getRandomColors(options.colors);
    matrix = generateMatrix(options.matrixSize, colors);
    count = initCount();
    count();
}

function generateMatrix(size, colors) {
    let matrix = [];
    for (let x = 0; x < size; x++) {
        matrix[x] = [];
        for (let y = 0; y < size; y++) {
            let color = colors[Math.floor(Math.random()*colors.length)];

            matrix[x].push(
                new gameElement(color, x, y, size)
            );
        }
    }
    return matrix;
}

function checkSiblings(x, y) {
    let findedNodes = [],
        current = {
        x: x,
        y: y
    };

    if(matrix[x][y].color === -1){
        return [];

    } else {
        if ((x < matrix.length - 1)) {

            if (compareColors(current, {x: x + 1, y: y}) === true) { //right
                findedNodes.push({x: x + 1, y: y});
            }
        }

        if ((y < matrix.length - 1 )) {

            if (compareColors(current, {x: x, y: y + 1})) { //bottom
                findedNodes.push({x: x, y: y + 1});
            }
        }

        if ((x !== 0 )) {

            if (compareColors(current, {x: x - 1, y: y})) {//left
                findedNodes.push({x: x - 1, y: y});
            }
        }

        if ((y !== 0)) {

            if (compareColors(current, {x: x, y: y - 1})) {//top
                findedNodes.push({x: x, y: y - 1});
            }
        }
        return findedNodes;
    }
}

function findSiblings( x, y, matrix) {
    let resultArray = [];

    resultArray.push({x:x,y:y});

    let needToFind = checkSiblings(x, y, matrix);//finded simbled elements of current

    while(needToFind.length > 0) {

        if (!isInArray(needToFind[0], resultArray)) {
            resultArray.push(needToFind[0]);
            let checked = checkSiblings(
                needToFind[0].x,
                needToFind[0].y,
                matrix
            );
            for (let i = 0; i < checked.length; i++) {
                if (!isInArray(checked[i], resultArray)) {
                    needToFind.push(checked[i]);
                }
            }
        }
        needToFind.shift();
    }
    return resultArray;
}

function compareColors(current, next) {
    return (matrix[current.x][current.y].color === matrix[next.x][next.y].color);
}

function replaceItems() {
    for (let x = 0; x < matrix.length; x ++) {
        for (let y = 0; y < matrix.length; y ++) {
            if (matrix[x][y].color === -1){
                let Y =y;
                while (Y > 0) {
                    if(matrix[x][Y-1] !== -1){
                        matrix[x][Y].setPosition(matrix[x][Y-1]);
                        matrix[x][Y-1].destroyElement();
                        Y--;
                    } else {
                        Y = 0;
                        matrix[x][Y].destroyElement();
                    }
                }
            }
        }
    }
}

function checkGameOver() {
    for (let x = matrix.length - 1; x > -1; x --) {
        for (let y = matrix.length - 1; y > -1; y--) {
            if (checkSiblings(y, x, matrix).length > 0) {
                return false;
            }
        }
    }
    writeGameOver();
    return true;
}

function getScore(siblings) {
    if (siblings <= 1) {
        return 1;
    }
    return ((siblings + getScore(siblings - 1)));
}

function deleteCheckedItems(siblings) {
    siblings.map(function(j){
        matrix[j.x][j.y].destroyElement();
    });
    replaceItems()
}

function cutChecked(obj) {
    let siblings = findSiblings(obj.x , obj.y);

    if ((siblings.length >= 2)) {
        if((!checkGameOver())) {
            deleteCheckedItems(siblings);
            count(getScore(siblings.length - 1)*10);
            checkGameOver();
        }
    }
}

export { initMatrix, cutChecked }