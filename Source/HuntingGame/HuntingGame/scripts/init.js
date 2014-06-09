function init() {
    var gameWidth = 800;
    var gameHeight = 600;
    var game = new Game(gameHeight, gameWidth);
    game.start();
}

window.onload = init;