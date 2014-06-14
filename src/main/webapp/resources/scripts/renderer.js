/*
 *   Initializes a new instance of the Renderer class.
 */
function Renderer(width, height) {
    this.width = width;
    this.height = height;

    var fragment = document.createDocumentFragment();
    var svg = this.createBackground();
    var canvas = this.creteCanvas();

    fragment.appendChild(svg);
    fragment.appendChild(canvas);
    document.body.appendChild(fragment);

    this.ctx = canvas.getContext('2d');
}

/*
 *   Draws all objects.
 */
Renderer.prototype.drawAll = function(blaze, eggman) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBlaze(blaze);
    this.drawClip(blaze);
    this.drawScore(blaze);

    if (eggman) {
        this.drawEggman(eggman);
    }
};

/*
 *   Constants for the game object.
 */
Renderer.CONFIG = function() {
    var constants = {
        BLAZE_LINE_LENGTH: 60,
        BLAZE_INNER_RADIUS: 10,
        BLAZE_OUTER_RADIUS: 20,
        BLAZE_COLOR: 'white',
        SVG_NS: 'http://www.w3.org/2000/svg',
        BULLET_WIDTH: 20,
        BULLET_HEIGHT: 30,
        BULLET_SPACING: 5,
        BACKGROUND_COLOR: '#181e4b',
        BACKGROUND_STARS_COUNT: 50,
        BACKGROUND_PLANETS_COUNT: 5
    };

    return {
        get: function(name) {
            return constants[name];
        }
    };
}();

/*
 *   Draws Blaze.
 */
Renderer.prototype.drawBlaze = function(blaze) {

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

    this.ctx.beginPath();
    this.ctx.moveTo(point1X, point1Y);
    this.ctx.lineTo(point2X, point2Y);
    this.ctx.moveTo(point3X, point3Y);
    this.ctx.lineTo(point4X, point4Y);
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, INNER_RADIUS, 0, 2 * Math.PI, false);
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, OUTER_RADIUS, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = Renderer.CONFIG.get('BLAZE_COLOR');
    this.ctx.stroke();
};

/*
 *   Draws the clip (available bullets).
 */
Renderer.prototype.drawClip = function(blaze) {
    var sx = 20;
    var sy = this.height - Renderer.CONFIG.get('BULLET_HEIGHT') - sx;
    var bulletsCount = blaze.bullets;
    var image = new Image();
    image.src = 'resources/imgs/bullet.png';

    for (var i = 0; i < bulletsCount; i += 1) {
        this.ctx.drawImage(image, sx, sy);
        sx += Renderer.CONFIG.get('BULLET_WIDTH') + Renderer.CONFIG.get('BULLET_SPACING');
    }
};

/*
 *   Draws Eggman.
 */
Renderer.prototype.drawEggman = function(eggman) {
    var eggmanTopLeftX = eggman.position.x;
    var eggmanTopLeftY = eggman.position.y;
    this.ctx.strokeStyle = 'green';
    this.ctx.strokeRect(eggmanTopLeftX, eggmanTopLeftY, eggman.width, eggman.height);
};

/*
 *   Creates the background.
 */
Renderer.prototype.createBackground = function() {
    // Creates the svg element
    var svg = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'svg');
    svg.setAttribute('height', this.height.toString());
    svg.setAttribute('width', this.width.toString());
    svg.style.position = 'fixed';
    svg.style.top = '31px';
    svg.style.left = '31px';

    // Sets the background color.
    var rect = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', this.width.toString());
    rect.setAttribute('height', this.height.toString());
    var backgroundColorText = 'fill:' + Renderer.CONFIG.get('BACKGROUND_COLOR') + ';';
    rect.setAttribute('style', backgroundColorText);
    svg.appendChild(rect);

    var rectAmmo = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'rect');
    rectAmmo.setAttribute('x', '15');
    rectAmmo.setAttribute('y', (this.height - 55).toString());
    rectAmmo.setAttribute('width', (20 * 3 + 10 * 2 + 10).toString());
    rectAmmo.setAttribute('height', '40');

    rectAmmo.setAttribute('style', 'fill: #dcdcdc;');

    svg.appendChild(rectAmmo);

    // Creates the stars
    var starsCount = Renderer.CONFIG.get('BACKGROUND_STARS_COUNT');

    for (var i = 0; i < starsCount; i++) {
        svg.appendChild(this.createRandomStar());
    }

    // Creates the planets
    var planetsCount = Renderer.CONFIG.get('BACKGROUND_PLANETS_COUNT');

    for (i = 0; i < planetsCount; i++) {
        svg.appendChild(this.createRandomPlanet());
    }


    return svg;
};

Renderer.prototype.creteCanvas = function() {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'drawing');
    canvas.setAttribute('width', this.width.toString());
    canvas.setAttribute('height', this.height.toString());
    canvas.style.position = 'fixed';
    canvas.style.left = '30px';
    canvas.style.top = '30px';
    return canvas;
};

/*
 *   Creates a random star.
 */
Renderer.prototype.createRandomStar = function() {
    var polygon = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'polygon');

    var x = getRandomInt(50, this.width - 50);
    var y = getRandomInt(50, this.height - 50);

    var point1X = x + 2.9389;
    var point1Y = y + 9.0451;

    var point2X = x + 4.7553;
    var point2Y = y + 3.4549;

    var point3X = x - 4.7553;
    var point3Y = y + 3.4549;

    var point4X = x - 2.9389;
    var point4Y = y + 9.0451;

    var pointsText = x + ',' + y + ' ' + point1X + ',' + point1Y + ' ' + point3X + ',' + point3Y + ' ' + point2X + ',' + point2Y + ' ' + point4X + ',' + point4Y;
    polygon.setAttribute('points', pointsText);
    polygon.setAttribute('style', 'fill:#dcdcdc');

    var angle = getRandomInt(0, 360);
    var rotateText = 'rotate(' + angle + ' ' + x + ' ' + y + ')';
    polygon.setAttribute('transform', rotateText.toString());

    return polygon;
};

/*
 *   Creates a random planet.
 */
Renderer.prototype.createRandomPlanet = function() {
    var circle = document.createElementNS(Renderer.CONFIG.get('SVG_NS'), 'circle');
    var cx = getRandomInt(50, this.width - 50);
    var cy = getRandomInt(50, this.height - 50);
    var radius = 10;
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', radius.toString());
    circle.setAttribute('fill', '#dd5f22');
    return circle;
};

/*
 *   Draws the score.
 */
Renderer.prototype.drawScore = function(blaze) {
    var scoreText = "Score: " + (blaze.score | 0); //todo: add blaze score
    this.ctx.font = "30px Comic Sans MS, Arial, Sans";
    this.ctx.fillStyle = '#dcdcdc';
    this.ctx.fillText(scoreText, 10, 30);
};

/*
 *   Draws the Intro screen.
 */
Renderer.prototype.drawIntro = function() {
var canvas = document.getElementById("drawing");
    var ctx = canvas.getContext("2d");
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');

    //canvas background
    var grd = ctx.createLinearGradient(0, 0, 600, 0);
    grd.addColorStop(0, "#f210e6");
    grd.addColorStop(1, "#f41118");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.font = "100px Georgia";
    centerText(ctx, "Blaze Laserlight", 100);

    //buttons
    var buttonX = [
        getXCoordsOfMenuItem(ctx, 'Play'),
        getXCoordsOfMenuItem(ctx, 'Highscores'),
        getXCoordsOfMenuItem(ctx, 'Exit')
    ];
    var buttonY = [height / 2 - 100, height / 2 - 50, height / 2];
    var menuItems = ['Play', 'Highscores', 'Exit'];
    ctx.fillStyle = 'yellow';
    ctx.font = "40px Verdana";
    centerText(ctx, menuItems[0], buttonY[0]);
    centerText(ctx, menuItems[1], buttonY[1]);
    centerText(ctx, menuItems[2], buttonY[2]);
    centerText(ctx, menuItems[3], buttonY[3]);

    //draw eggman
    var eggmanImage = new Image();
    eggmanImage.onload = function () {
        ctx.drawImage(eggmanImage, 500, 270);
    }
    eggmanImage.src = 'http://img4.wikia.nocookie.net/__cb20130617124441/robotsupremacy/images/0/04/Eggman-eggman-club.gif';
    //draw blaze
    var blazeImage = new Image();
    blazeImage.onload = function () {
        ctx.drawImage(blazeImage, 100, 300, 150, 300);
    }
    blazeImage.src = 'http://fc04.deviantart.net/fs71/f/2012/213/2/a/blaze_the_cat_by_bloomphantom-d59gqef.png';

    function centerText(ctx, text, y) {
        var x = getXCoordsOfMenuItem(ctx, text);
        ctx.fillText(text, x, y);
    }

    function getXCoordsOfMenuItem(ctx, text) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        return x;
    }

    //checking the mouse position
    var mouseX;
    var mouseY;
    var time = 0.0;
    canvas.addEventListener("mouseup", checkClick);

    function checkClick(mouseEvent) {
        if (mouseEvent.pageX || mouseEvent.pageY == 0) {
            mouseX = mouseEvent.pageX - this.offsetLeft;
            mouseY = mouseEvent.pageY - this.offsetTop;
        } else if (mouseEvent.offsetX || mouseEvent.offsetY == 0) {
            mouseX = mouseEvent.offsetX;
            mouseY = mouseEvent.offsetY;
        }
        for (var i = 0; i < buttonX.length; i++) {
            var measure = ctx.measureText(menuItems[i]).width;
            if (mouseX > buttonX[i] + 2 * measure / 3 && mouseX < buttonX[i] + 5 * measure / 3) {
                if (mouseY < buttonY[i] && mouseY > buttonY[i] - 40) {
                    ctx.fillStyle = 'blue';
                    ctx.font = "40px Verdana";
                    centerText(ctx, menuItems[i], buttonY[i]);
                    ctx.fillStyle = 'blue';
                    fadeOut();
                    //invoke button finctions here (Play,Highscores or Exit)

                    //
                }
            }
        }
    }

    function fadeOut() {
        window.requestAnimationFrame(fadeOut);
        var alpha = 0.2;
        alpha += 0.1;
        ctx.fillStyle = "rgba(0,0,0, "+alpha+")";
        ctx.fillRect(0, 0, width, height);
    }
};

/*
 *   Draws the Exit screen
 */
Renderer.prototype.drawExit = function() {

};

Renderer.prototype.drawB1 = function () {

    var paper = Raphael(container, 800, 600);
    var x = 40,
    y = 40;

    /*Draw background - sky*/

    paper.rect(x, y, 800, 600)
    .attr({
        fill: 'lightblue',
        'stroke-width': 0
    });

    /* Draw sand.*/

    paper.rect(x, (y + 400), 800, 200)
    .attr({
        fill: '100-darkgoldenrod-gold',
        opacity: 0.8,
        'stroke-width': 0
    });

    /* Draw sea. */
    paper.rect(x, (y + 350), 800, 50)
    .attr({
        fill: '100-blue:2-darkblue:100',
        opacity: 1,
        'stroke-width': 3,
        stroke: '40-blue-darkblue',
        'stroke-linecap': 'round'
    });

    /*
*   Draw waves.
*/
    paper.path("M" + (x + 0) + "," + (y + 400)
        + "C" + (x + 50) + "," + (y + 450) + "," + (x + 150) + "," + (y + 400) + "," + (x + 170) + "," + (y + 400)
        + "C" + (x + 170) + "," + (y + 400) + "," + (x + 380) + "," + (y + 470) + "," + (x + 450) + "," + (y + 400)
        + "C" + (x + 450) + "," + (y + 400) + "," + (x + 570) + "," + (y + 440) + "," + (x + 650) + "," + (y + 400)
        + "C" + (x + 650) + "," + (y + 400) + "," + (x + 700) + "," + (y + 450) + "," + (x + 800) + "," + (y + 400)
        + "Z")
    .attr({
        fill: '90-white-blue',
        opacity: 0.9,
        stroke: '90-#000f48-#ffffff',
        'stroke-width': 5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    });

    /*Draw cloud.*/

    paper.path("M" + (x + 700) + "," + (y + 50)
        + "C" + (x + 720) + "," + (y + 70) + "," + (x + 710) + "," + (y + 100) + "," + (x + 690) + "," + (y + 90)
        + "C" + (x + 680) + "," + (y + 110) + "," + (x + 660) + "," + (y + 95) + "," + (x + 650) + "," + (y + 90)
        + "C" + (x + 630) + "," + (y + 100) + "," + (x + 620) + "," + (y + 90) + "," + (x + 650) + "," + (y + 70)
        + "C" + (x + 620) + "," + (y + 60) + "," + (x + 655) + "," + (y + 50) + "," + (x + 660) + "," + (y + 45)
        + "C" + (x + 675) + "," + (y + 35) + "," + (x + 680) + "," + (y + 45) + "," + (x + 690) + "," + (y + 40)
        + "Z")
    .attr({
        fill: '270-white-azure',
        opacity: 0.2,
        stroke: '100-gray-white-blue',
        'stroke-width': 5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'

    });

    /* Draw mountains */

    paper.path("M" + (x + 0) + "," + (y + 350)
        + "C" + (x + 130) + "," + (y + 100) + "," + (x + 260) + "," + (y + 340) + "," + (x + 300) + "," + (y + 320)
        + "C" + (x + 300) + "," + (y + 320) + "," + (x + 350) + "," + (y + 280) + "," + (x + 400) + "," + (y + 310)
        + "C" + (x + 400) + "," + (y + 310) + "," + (x + 530) + "," + (y + 280) + "," + (x + 630) + "," + (y + 320)
        + "C" + (x + 630) + "," + (y + 320) + "," + (x + 900) + "," + (y + 20) + "," + (x + 800) + "," + (y + 350)
        + "Z")
    //paper.path("M"+(x -10) 350 C 130 100 260 340 300 320 C 300 320 350 280 400 310 C 400 310 530 280 630 320 C 630 320 900 20 800 350 Z ')
    .attr({
        fill: "100-darkgreen-white",
        opacity: 0.1,
        stroke: "100-darkgreen-white",
        'stroke-width': 5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    })
    /*контролна черта*/
    paper.path("M" + (x + 50) + "," + (y + 50) + " L" + (x + 100) + "," + (y + 100));

};




