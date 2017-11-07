let ctx, size, canvas, colsSize;

function setContext (canvs, colSize) {
    canvas = canvs;
    size = colSize;

    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
}

function draw(x, y, color) {
    ctx.strokeStyle = ctx.fillStyle = color;

    ctx.strokeRect(
        x * size,
        y * size,
        size - 3,
        size - 3
    );

    ctx.fillRect(
        x * size + 4,
        y * size + 4,
        9,
        9
    );
}

function clear(x, y) {
    draw(x, y, '#ededed');
}

function drawCanvas() {
    let n = Math.round(canvas.width / size);
    for (let x = 0; x < n; x ++) {
        for (let y = 0; y < n; y ++) {
            draw(x, y, '#ededed');
        }
    }
}

export { setContext, draw, clear, drawCanvas }