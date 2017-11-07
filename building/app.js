import {setContext, drawCanvas} from '../tools/drawer';
import {initModel} from './src/model/model';
import {initFigure} from './src/entity/figure';

let canvas, context, size = 20, n;

window.onload = function () {
    canvas = document.getElementById('canvas');
    n = Math.floor(canvas.width / size);
    setContext(canvas, size);
    drawCanvas(canvas);
};

document.getElementById('start').addEventListener('click', function (e) {
    drawCanvas(canvas);
    initModel(n);
    initFigure();
    this.blur();
});

