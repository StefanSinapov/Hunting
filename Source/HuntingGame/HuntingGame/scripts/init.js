//require(['renderer']);


function init() {

    var renderer = new Renderer(600, 800);

    renderer.drawTest();

    var game = new Game(renderer);

    game.start();



}

window.onload = init;