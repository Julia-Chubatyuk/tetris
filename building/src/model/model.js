'use strict';

import {writeCount} from '../helper';
import {Point} from '../entity/point';

let model, count;

function initModel (n) {
    model = createModel(n);
    count = writeCount();
    count();
}

function createModel (size) {
    let array = new Array(size);
    for (let i = 0; i < size; i++) {
        array[i] = new Array(size).fill(false);
    }
    return array;
}

function getCenter() {
    return (model.length -1) / 2;
}

function setFigureToModel (figure) {
    figure.forEach(point => model[point.x][point.y] = point);
    checkRows();
}

function checkXAxis (points, direction) {
    let directions = [];
    if (direction) {
        directions = [direction];
    } else {
        directions = [-1, 1];
    }

    return directions.every( direction =>
        points.every( point =>
            (point.x + direction) < model.length &&
            (point.x + direction) >= 0 &&
            !model[point.x + direction][point.y]
        )
    )
}

function checkYAxis (figure) {
    return figure.every(point => {
        if (point.x >= 0 && point.y+1 >= 0) {
            return model[point.x][point.y+1] === false;
        }
    })
}

function checkRows() {
    let y = model.length-1;
    // while count not gets top of play field
    while (y >= 0) {
        let currentArr = [];
        for (let x = 0; x <= model.length-1; x++) {
            currentArr.push(model[x][y]);
        }
        // if row is empty => go to top
        if(currentArr.every(point => !point)) {
            y = 0;
        // if row is full => cut off
        } else if (currentArr.every(point => !!point)) {
            for (let x = 0; x <= model.length-1; x++) {
                model[x][y].clear();
                model[x][y] = false;
            }
            updateCanvas(y);
            count();
        }
        y--;
    }
}

function updateCanvas(startY) {
    for(let x = 0; x <= model.length-1; x++) {
        let y = startY;
        while (y >= 0) {
            if (model[x][y-1]) {
                model[x][y] = new Point({x,y}, model[x][y-1].color);
                model[x][y-1].clear();
                model[x][y-1] = false;
                model[x][y].draw();
            } else {
                model[x][y] = false;
            }
            y--;
        }
        checkRows();
    }
}

export { initModel, setFigureToModel, checkYAxis,  checkXAxis, getCenter }
