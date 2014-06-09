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


Renderer.prototype.drawTest = function () {

    this.ctx.strokeRect(50, 50, 50, 50);

};


Renderer.prototype.drawAll = function (blaze) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawBlaze(this.ctx, blaze);
}


function drawBlaze(context, blaze) {

    var LINE_LENGTH = 50;
    var RADIUS = 20;
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
    context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false);
    context.strokeStyle='red';
    context.stroke();
};