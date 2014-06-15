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
    this.getHighScores();
    var renderer = new Renderer(this.width, this.height); // renderer object
    var controller = new Controller(); // controller object

    renderer.drawIntro();

    var blazeInitialCoordinate = new Coordinate(this.width / 2, this.height / 2);
    var blaze = new Blaze(blazeInitialCoordinate); // blaze object
    var eggman = new Eggman(blazeInitialCoordinate); // todo: fix coordinate.

    setTimeout(function () {
        animationGameLoop(renderer, controller, blaze, eggman);
    }, Game.CONFIG.get('INITIAL_WAIT_TIME'));
};

/*
 *   Constants for the game object.
 */
Game.CONFIG = function () {
    var constants = {
        WIDTH: 800,
        HEIGHT: 600,
        INITIAL_WAIT_TIME: 1000,
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
function animationGameLoop(renderer, controller, blaze, eggman) {
    blaze.update(controller, eggman);
    eggman.update(renderer);

    requestAnimFrame(function () {
        animationGameLoop(renderer, controller, blaze, eggman);
    });

    renderer.drawAll(blaze, eggman);
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
            var name = highScores[i].name === null ? "Unknown" : highScores[i].name;
            var score = highScores[i].score.toString();
            text = text + name + "," + score + ",";
        }
    }

    localStorage["blazeScores"] = text;
};