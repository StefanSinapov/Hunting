/*
 *   Game object.
 */
function Game() {
    console.log("Game constructor.");

    this.width = 800;
    this.height = 600;

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

/*
 *   Function that starts the game.
 */
Game.prototype.start = function () {
    var INITIAL_WAIT_TIME = 100;
    var blazeInitialCoordinate = new Coordinate(this.width / 2, this.width / 2);
    var blaze = new Blaze(blazeInitialCoordinate);

    var renderer = new Renderer(this.width, this.height);

    var controller = new Controller();
   // renderer.drawAll(blaze);

    setTimeout(function () {
        animationLoop(renderer, controller, blaze);
    }, INITIAL_WAIT_TIME);


};

/*
*   Function for animation loop of the game.
 */
function animationLoop(renderer, controller, blaze) {

    if (controller.mousePosition !== undefined) {
        blaze.position = controller.mousePosition;
    }

    requestAnimFrame(function () {
        animationLoop(renderer, controller, blaze);
    });

    renderer.drawAll(blaze);
}