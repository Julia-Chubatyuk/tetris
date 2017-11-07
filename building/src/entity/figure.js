'use strict';

import { writeGameOver } from '../helper';
import { setFigureToModel, checkYAxis,  checkXAxis} from '../model/model';
import { generatePoints } from './point';

let instance, timeout;
const events = new window.EventPubSub();

document.onkeydown = function (e) {
    let keyboard = e.keyCode;
    switch (keyboard) {
        case 37 : //left arrow
            instance.move(-1);
            break;
        case 39 : //right arrow
            instance.move(1);
            break;
        case 32 : // space key
            instance.rotate();
    }
};

function resetTimeOut() {
    if (timeout) {
        clearTimeout(timeout);
    }
}

function Figure() {

    let points = generatePoints();

    this.startAction = function () {
        //if there are free space bottom
        if(checkYAxis(points)) {
            //start moving
            draw();
            moveDown();
        } else {
            //delete figure
            instance = null;
            writeGameOver();
        }
    };

    function draw() {
        points.forEach( point => point.draw());
    }

    function clear() {
        points.forEach( point => point.clear());
    }

    // 'space' keydown event handler
    this.rotate = function () {
        let newPoints = calculateRotating();
        // if there are free space around
        if(checkYAxis(newPoints) && checkXAxis(newPoints)) {
            clear();
            for (let i = 0; i < newPoints.length; i++) {
                // make deep copy
                points[i].x = JSON.parse(JSON.stringify(newPoints[i].x));
                points[i].y = JSON.parse(JSON.stringify(newPoints[i].y));
            }
            draw();
        }
    };

    function calculateRotating() {
        let center = getRotationCenter(),
            f = 90 * (Math.PI / 180),
            newPoints = [];

        points.forEach(point => {
            let x = point.x - center.x,
                y = point.y - center.y,

                // new points
                X = x * Math.cos(f) - y * Math.sin(f),
                Y = x * Math.sin(f) + y * Math.cos(f);

            newPoints.push({
                x: Math.round(X + center.x),
                y: Math.round(Y + center.y)
            })
        });

        return newPoints;
    }

    function getRotationCenter() {
        let x = 0, y = 0, count = 0;
        points.forEach( point => {
            x += point.x;
            y += point.y;
            count++
        });

        return {
            x: Math.floor(x / count),
            y: Math.ceil(y / count)
        }
    }

    // left & right keydown event handler
    this.move = function (direction) {
        if (checkXAxis(points, direction)) {
            clear();
            points.forEach( point => point.x += direction );
            draw();
        }
    };

    function moveDown() {
        // if free space bottom
        if(checkYAxis(points)) {
            clear();
            //move figure down
            points.forEach(point => point.y += 1);
            draw();
        } else {
            // write figure to model
            setFigureToModel(points);
            instance = null;
            events.emit('createFigure');
            return;
        }
        timeout = setTimeout(moveDown, 500);
    }

    return instance;
}

events.on('createFigure', function () {
    if (instance) {
        instance = null;
        resetTimeOut();
    }

    instance = new Figure();
    instance.startAction();
});

function initFigure () {
    events.emit('createFigure');
}

export { initFigure }
