import {initMatrix, cutChecked} from './src/model/model'
import {setContext, drawCanvas} from '../tools/drawer'

let ctx,
    opts = {
    colors: 5,
    size: 20
};

window.onload = function () {
    opts.container = document.getElementById('canvas');
    ctx = opts.container.getContext('2d');

    opts.matrixSize = ctx.canvas.clientWidth/opts.size;
    setContext(opts.container, opts.size);
    drawCanvas();

    opts.container.onclick = function(args) {
        let obj = {};
        obj.x = Math.floor(args.layerX/opts.size);
        obj.y = Math.floor(args.layerY/opts.size);
        cutChecked(obj)
    };
};


document.getElementById('start').addEventListener('click', function () {
    initMatrix(opts);
});