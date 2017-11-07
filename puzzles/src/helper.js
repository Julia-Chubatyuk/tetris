
function getRandomColors(colorsCount) {
    let colors = [];
    for (let i = 0; i < colorsCount; i++) {
        colors.push(
            hslToRgb(
                (1 / colorsCount) * i,
                1,
                0.5
            )
        );
    }
    return colors;
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s===0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);


        b = Math.floor(b * 255);
        r = Math.floor(r * 255);
        g = Math.floor(g * 255);

    }
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).replace("1", "#");
}

function isInArray(el, arr){
    for (let i = 0; i < arr.length; i++){
        if (arr[i].x === el.x && arr[i].y === el.y){
            return true
        }
    }
    return false
}

function initCount() {
    let count = -1;
    return function (k) {
        k ? count +=k : count ++;
        document.getElementById('score').innerHTML = count;
    };
}

function writeGameOver () {
    document.getElementById('gameOver').innerHTML = 'Game over';
}

export { getRandomColors, isInArray, initCount, writeGameOver }