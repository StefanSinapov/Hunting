/*
 *   Initializes a new instance of the Game class.
 */
function Game() {
    this.width = Game.CONFIG.get('WIDTH');
    this.height = Game.CONFIG.get('HEIGHT');

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    this.highScores = [];
}

/*
 *   Function that starts the game.
 */
Game.prototype.start = function () {
    var blazeInitialCoordinate = new Coordinate(this.width / 2, this.width / 2);
    var blaze = new Blaze(blazeInitialCoordinate); // blaze object

    var renderer = new Renderer(this.width, this.height); // renderer object
    var eggman = new Eggman(blazeInitialCoordinate); // todo: fix coordinate.

    var controller = new Controller(); // controller object

    if (controller.mousePosition !== undefined) {
        blaze.position = controller.mousePosition;
    }

    setTimeout(function () {
        animationLoop(renderer, controller, blaze, eggman);
    }, Game.CONFIG.get('INITIAL_WAIT_TIME'));
};

/*
 *   Constants for the game object.
 */
Game.CONFIG = function () {
    var constants = {
        WIDTH: 800,
        HEIGHT: 600,
        INITIAL_WAIT_TIME: 100,
        SCORES_MAX_COUNT: 10
    };

    return {
        get: function (name) {
            return constants[name];
        }
    };
}();

/*
 *   Function for animation loop of the game.
 */
function animationLoop(renderer, controller, blaze, eggman) {

    if (controller.mousePosition !== undefined) {
        blaze.position = controller.mousePosition;
    }

    /* 
     *  Blaze Shooting
     */
    if (controller.mouseClick) {
        blaze.shoot();
        controller.mouseClick = undefined;
    }

    /*
     if (eggman.onScreen === true) {
     eggman.Move();
     // When the drawing is done, fix this
     if ((eggman.position.x + 50 > renderer.width) || (eggman.position.x < 0)) {
     eggman.speed = -eggman.speed;
     }

     if (controller.mouseClick) {
     if ((controller.mouseClick.x > eggman.position.x) &&
     (controller.mouseClick.x < eggman.position.x + 20) &&
     (controller.mouseClick.y > eggman.position.y) &&
     (controller.mouseClick.y < eggman.position.y + 20)
     ) {

     eggman.onScreen = false;
     controller.mouseClick = undefined;

     }
     }
     }
     else {
     // if timeForNewEggman
     eggman.MoveTo(new Coordinate(20, 20));
     eggman.onScreen = true;

     } */

    requestAnimFrame(function () {
        animationLoop(renderer, controller, blaze, eggman);
    });

    renderer.drawAll(blaze);
}

/*
 *   Gets the high scores from local storage.
 */
Game.prototype.getHighScores = function () {
    var highScoresText = localStorage['blazeScores'];
    var i, player, spitArray, length, playerName, playerScore;


    if (highScoresText) {
        spitArray = highScoresText.split(",");
        length = spitArray.length;

        for (i = 0; i < length; i += 2) {
            playerName = spitArray[i];
            playerScore = parseInt(spitArray[i + 1]);

            if (playerName !== undefined && !isNaN(playerScore)) {
                player = new Player(playerName, playerScore);
                this.highScores.push(player);
            }
        }
    }
};

/*
 *  Writes the high scores to the local storage.
 */
Game.prototype.logScores = function (highScores, currentName, currentScore) {
    var player = new Player(currentName, currentScore);
    this.highScores.push(player);

    var N = highScores.length;
    var i;

    // sorting
    for (i = 0; i < N; i += 1) {
        for (var j = i + 1; j < N; j += 1) {
            if (highScores[i].score < highScores[j].score) {
                var oldValue = highScores[i];
                highScores[i] = highScores[j];
                highScores[j] = oldValue;
            }
        }
    }

    // preparing string
    var text = "";

    for (i = 0; i < N; i += 1) {
        if (i === 10) {
            break;
        }

        if (highScores[i] instanceof  Object) {
            var name = highScores[i].playerName === null ? "Unknown" : highScores[i].name;
            var score = highScores[i].score.toString();
            text = text + name + "," + score + ",";
        }
    }

    localStorage["blazeScores"] = text;
};

/*
 *   Clears the current high scores.
 */
Game.prototype.clearHighScores = function () {
    this.highScores = [];
    localStorage["blazeScores"] = undefined;
};
