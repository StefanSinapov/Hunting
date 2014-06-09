/*
 *   Initializes a new instance of the Renderer class.
 */
function Renderer(width, height) {
    this.width = width;
    this.height = height;

    this.drawBackground();

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
    var constants = {
        'BLAZE_LINE_LENGTH': 60,
        'BLAZE_INNER_RADIUS': 10,
        'BLAZE_OUTER_RADIUS': 20,
        'BLAZE_COLOR': 'white',
        'SVG_NS': 'http://www.w3.org/2000/svg',
        'BULLET_WIDTH': 20,
        'BULLET_HEIGHT': 30,
        'BULLET_SPACING': 5
    };

    return {
        get: function (name) {
            return constants[name];
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

/*
 *   Draws the clip (available bullets).
 */
function _drawClip(context, blaze) {
    var sx = 20;
    var sy = context.canvas.height - Renderer.CONFIG.get('BULLET_HEIGHT') - 10;
    var bulletsCount = blaze.bullets;
    var image = new Image();
    image.src = 'imgs/bullet.png';

    for (var i = 0; i < bulletsCount; i += 1) {
        context.drawImage(image, sx, sy);
        sx += Renderer.CONFIG.get('BULLET_WIDTH') + Renderer.CONFIG.get('BULLET_SPACING');
    }
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
    var svg = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'svg');
    svg.setAttribute('height', this.height.toString());
    svg.setAttribute('width', this.width.toString());
    svg.style.position = 'fixed';
    svg.style.top = '0px';
    svg.style.left = '0px';


    var rect = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', this.width.toString());
    rect.setAttribute('height', this.height.toString());
    rect.setAttribute('style', 'fill:blue;');

    svg.appendChild(rect);

    for (var i = 0; i < 50; i++) {
        var obj = this.createRandomStar();
        svg.appendChild(obj);
    }

    document.body.appendChild(svg);
};

/*
 *   Creates a random star.
 */
Renderer.prototype.createRandomStar = function () {
    var polygon = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'polygon');

    var x = getRandomInt(20, this.width - 20);
    var y = getRandomInt(20, this.height - 20);

    var point1X = x + 2.9389;
    var point1Y = y + 9.0451;

    var point2X = x + 4.7553;
    var point2Y = y + 3.4549;

    var point3X = x - 4.7553;
    var point3Y = y + 3.4549;

    var point4X = x - 2.9389;
    var point4Y = y + 9.0451;

    var pointsText = x + "," + y + " " + point1X + "," + point1Y + " " + point3X + "," + point3Y + " " + point2X + "," + point2Y + " " + point4X + "," + point4Y;
    polygon.setAttribute('points', pointsText);
    polygon.setAttribute('style', 'fill:white');

    var angle = getRandomInt(0, 360);
    var rotateText = "rotate(" + angle + " " + x + " " + y + ")";
    polygon.setAttribute('transform', rotateText.toString());

    return polygon;
};





