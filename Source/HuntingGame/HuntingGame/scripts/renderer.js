/*
 *   Initializes a new instance of the Renderer class.
 */
function Renderer(width, height) {


    this.width = width;
    this.height = height;

    this.drawBackground();

    //  this.drawBackground();
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'drawing');
    canvas.setAttribute('width', width.toString());
    canvas.setAttribute('height', height.toString());
    canvas.style.position = 'fixed';
    canvas.style.left = '0px';
    canvas.style.top = '0px';


    document.body.appendChild(canvas);

    this.ctx = canvas.getContext('2d');
}

/*
 *   Draws all objects.
 */
Renderer.prototype.drawAll = function (blaze, eggman) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    _drawBlaze(this.ctx, blaze);
    _drawClip(this.ctx, blaze);

    if (eggman) {
        _drawEggman(this.ctx, eggman);
    }
};

/*
 *   Constants for the game object.
 */
Renderer.CONFIG = function () {
    var private = {
        'BLAZE_LINE_LENGTH': 60,
        'BLAZE_INNER_RADIUS': 10,
        'BLAZE_OUTER_RADIUS': 20,
        'BLAZE_COLOR': 'red'
    };

    return {
        get: function (name) {
            return private[name];
        }
    };
}();

/*
 *   Draws Blaze.
 */
function _drawBlaze(context, blaze) {

    var LINE_LENGTH = Renderer.CONFIG.get('BLAZE_LINE_LENGTH');
    var INNER_RADIUS = Renderer.CONFIG.get('BLAZE_INNER_RADIUS');
    var OUTER_RADIUS = Renderer.CONFIG.get('BLAZE_OUTER_RADIUS');

    var centerX = blaze.position.x;
    var centerY = blaze.position.y;

    var point1X = centerX + LINE_LENGTH / 2;
    var point1Y = centerY;

    var point2X = centerX - LINE_LENGTH / 2;
    var point2Y = centerY;

    var point3X = centerX;
    var point3Y = centerY + LINE_LENGTH / 2;

    var point4X = centerX;
    var point4Y = centerY - LINE_LENGTH / 2;

    context.beginPath();
    context.moveTo(point1X, point1Y);
    context.lineTo(point2X, point2Y);
    context.moveTo(point3X, point3Y);
    context.lineTo(point4X, point4Y);
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, INNER_RADIUS, 0, 2 * Math.PI, false);
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, OUTER_RADIUS, 0, 2 * Math.PI, false);
    context.strokeStyle = Renderer.CONFIG.get('BLAZE_COLOR');
    context.stroke();
}

//Draws Bullets // TODO: add global consts and change here.
function _drawClip(context, blaze) {
    var BULLET_WIDHT = 20,
        BULLET_HEIGHT = 30,
        SPACING = 5,
        sx = 20,
        sy = context.canvas.height - BULLET_HEIGHT - 10,
        bulletsCount = blaze.getBulletsCount();

    context.beginPath();
    for (var i = 0; i < bulletsCount; i += 1) {
        context.moveTo(sx, sy);
        context.strokeRect(sx, sy, BULLET_WIDHT, BULLET_HEIGHT);
        sx = sx + BULLET_WIDHT + SPACING;
    }
    ;
    context.stroke();
}

/*
 *   Draws Eggman.
 */
function _drawEggman(context, eggman) {

    var eggmanTopLeftX = eggman.position.x;
    var eggmanTopLeftY = eggman.position.y;
    context.strokeStyle = 'green';
    context.strokeRect(eggmanTopLeftX, eggmanTopLeftY, eggman.width, eggman.height);
}

/*
 *   Draws the background.
 */
Renderer.prototype.drawBackground = function () {
    // var fragment = document.createDocumentFragment();
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('height', this.height.toString());
    svg.setAttribute('width', this.width.toString());
    svg.style.position = 'fixed';
    svg.style.top = '0px';
    svg.style.left = '0px';


    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '60');
    rect.setAttribute('width', '50');
    rect.setAttribute('height', '50');
    rect.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)');

    svg.appendChild(rect);
    // var canvas = document.getElementById('drawing')
    // document.body.insertBefore(svg,canvas);

    document.body.appendChild(svg);


};


