/*
 *   Initializes the game.
 */
function init() {
    var game = new Game();
    game.start();
}

var CONFIG = (function() {
    var private = {
        'WIDTH': 800,
        'HEIGHT': 600
    };

    return {
        get: function(name) { return private[name]; }
    };
})();

/*
 *  On window load function.
 */
window.onload = init;