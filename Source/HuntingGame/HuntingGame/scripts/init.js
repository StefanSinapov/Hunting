function init() {

    var renderer = new Renderer(600, 800);
    renderer.drawBackground();
    renderer.drawTest();
    var coord = new Coordinate(5, 1);
    var blaze = new Blaze(coord);
    var controller = new Controller(renderer, blaze);
    var eggman = new Eggman(coord);
    console.log(eggman.toString());
    var game = new Game(renderer);

    game.start();
    var d = document.getElementById('container');




}


window.onload = init;