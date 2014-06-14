/*
 *   Initializes the game.
 */
function init() {
    console.log("Init");
    var game = new Game();
    game.start();
}

/*
 *  On window load function.
 */
window.onload = init;