function init() {

    var renderer = new Renderer(600, 800);
    renderer.drawBackground();
    renderer.drawTest();
    var coord = new Coordinate(5, 1);
    var blaze = new Blaze(coord);
    var controler = new Controler(renderer, blaze);
    var eggman = new Eggman(coord);
    var game = new Game(renderer);

    game.start();
    var d = document.getElementById('container');

    d.addEventListener("click", function (ev) {
        controler.getMouseCoordinates();
    }, false)


}


window.onload = init;