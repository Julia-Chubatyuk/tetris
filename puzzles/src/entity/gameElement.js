import {draw, clear} from '../../../tools/drawer';

function gameElement(color, x, y) {

    this.x = x;
    this.y = y;
    this.color = color;
    let that = this;

    this.setPosition = function (position) {
        this.color = position.color;
        let y = this.y;
        while (y >= position.y) {
            clear(this.x, y);
            draw(this.x, y, this.color);
            y--; //draw next position
        }
    };

    this.destroyElement = function() {
        this.color = -1;
        that.draw(this.color);
    };

    this.draw = function (currColor) {
        let Color = currColor || color;

        if (Color === -1) {
            clear(x, y);
        } else {
            draw(x, y, Color);
        }
    };

    this.draw();
}

export { gameElement }
