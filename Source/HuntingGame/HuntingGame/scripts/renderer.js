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
Renderer.prototype.drawAll = function (blaze, eggman) {
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
Renderer.CONFIG = function () {
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
        get: function (name) {
            return constants[playerName];
        }
    };
}();

/*
 *   Draws Blaze.
 */
Renderer.prototype.drawBlaze = function (blaze) {

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
Renderer.prototype.drawClip = function (blaze) {
    var sx = 20;
    var sy = this.height - Renderer.CONFIG.get('BULLET_HEIGHT') - sx;
    var bulletsCount = blaze.bullets;
    var image = new Image();
    image.src = 'imgs/bullet.png';

    for (var i = 0; i < bulletsCount; i += 1) {
        this.ctx.drawImage(image, sx, sy);
        sx += Renderer.CONFIG.get('BULLET_WIDTH') + Renderer.CONFIG.get('BULLET_SPACING');
    }
};

/*
 *   Draws Eggman.
 */
Renderer.prototype.drawEggman = function (eggman) {
    var eggmanTopLeftX = eggman.position.x;
    var eggmanTopLeftY = eggman.position.y;
    this.ctx.strokeStyle = 'green';
    this.ctx.strokeRect(eggmanTopLeftX, eggmanTopLeftY, eggman.width, eggman.height);
};

/*
 *   Creates the background.
 */
Renderer.prototype.createBackground = function () {
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

Renderer.prototype.creteCanvas = function () {
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
Renderer.prototype.createRandomStar = function () {
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
Renderer.prototype.createRandomPlanet = function () {
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
Renderer.prototype.drawScore = function (blaze) {
    var scoreText = "Score: " + (blaze.score | 0); //todo: add blaze score
    this.ctx.font = "30px Comic Sans MS, Arial, Sans";
    this.ctx.fillStyle = '#dcdcdc';
    this.ctx.fillText(scoreText, 10, 30);
};

/*
 *   Draws the Intro screen.
 */
Renderer.prototype.drawIntro = function () {

};

/*
 *   Draws the Exit screen
 */
Renderer.prototype.drawExit = function () {

};




