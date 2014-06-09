/*
*   Renderer object responsible for drawing gama objects on the canvas.
 */
function Renderer(width, height) {

    this.width= width;
    this.height = height;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'drawing');
    canvas.setAttribute('width', width.toString());
    canvas.setAttribute('height', height.toString());

    document.body.appendChild(canvas);

    this.ctx = canvas.getContext('2d');

   // this.myCanvas = new MyCanvas(this.ctx);
}

/*
*   Draws all objects.
 */
Renderer.prototype.drawAll = function (blaze) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawBlaze(this.ctx, blaze);
}

/*
*   Draws Blaze.
 */
function drawBlaze(context, blaze) {

    var LINE_LENGTH = 30;
    var RADIUS_1 = 20;
    var RADIUS_2 = 10;
    var centerX = blaze.position.x;
    var centerY = blaze.position.y;

    var point1X = centerX + LINE_LENGTH;
    var point1Y = centerY;

    var point2X = centerX - LINE_LENGTH;
    var point2Y = centerY;

    var point3X = centerX ;
    var point3Y = centerY+LINE_LENGTH;
    var point4X = centerX ;
    var point4Y = centerY-LINE_LENGTH;

    context.beginPath();
    context.moveTo(point1X, point1Y);
    context.lineTo(point2X, point2Y);
    context.moveTo(point3X, point3Y);
    context.lineTo(point4X, point4Y);
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, RADIUS_1, 0, 2 * Math.PI, false);
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, RADIUS_2, 0, 2 * Math.PI, false);
    context.strokeStyle='red';
    context.stroke();
};

/*
 *   Draws Eggman.
 */
function drawEggman(context, eggman) {


};