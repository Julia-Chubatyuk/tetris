import {getCenter} from '../model/model';
import {getElement, getColor} from '../helper';
import {draw} from '../../../tools/drawer'

function Point(coord, color) {

    this.x = coord.x;
    this.y = coord.y;
    this.color = color;

    this.draw = function () {
        draw(this.x, this.y, color);
    };

    this.clear = function () {
        draw(this.x, this.y, '#ededed');
    };
}

function generatePoints () {
    let center = getCenter(),
        figure = getElement(center),
        color = getColor();

    figure = figure.map(point => new Point(point, color));
    return figure;
}



export { Point, generatePoints }
