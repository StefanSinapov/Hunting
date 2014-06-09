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
    var blaze = new Blaze(blazeInitialCoordinate); // blaze object

    var renderer = new Renderer(this.width, this.height); // renderer object
    var eggmen = []; // array to hold eggmen.

    var controller = new Controller(); // controller object
    // renderer.drawAll(blaze);

    setTimeout(function () {
        animationLoop(renderer, controller, blaze, eggmen);
    }, INITIAL_WAIT_TIME);
};

/*
 *   Function for animation loop of the game.
 */
function animationLoop(renderer, controller, blaze, eggmen) {

    if (controller.mousePosition !== undefined) {
        blaze.position = controller.mousePosition;
    }

    requestAnimFrame(function () {
        animationLoop(renderer, controller, blaze, eggmen);
    });

    renderer.drawAll(blaze);
}

/*
 *   Returns a random integer between min and max
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 *   Gets the high scores from local storage.
 */
function getScores() {
    var highScoresText = localStorage['blazeScores'];

    if (highScoresText) {
        return;
    }

    var highScores = [];
    var splitted = highScoresText.split(",");
    var length = splitted.length;
    var i, player;
    var stringForWeb = "<ol>";

    for (i = 0; i < length; i += 2) {
        var name = splitted[i];
        var playerScore = parseInt(splitted[i + 1]);

        if (name !== undefined && !isNaN(playerScore)) {
            player = {
                'name': name,
                'score': playerScore
            };

            highScores.push(player);
            stringForWeb = stringForWeb + "<li>" + name + " " + playerScore + "</li>";
        }
    }

    stringForWeb = stringForWeb + "</ol>";

    document.getElementById("scores").innerHTML = stringForWeb;
}

/*
 *  Sets the scores to the local storage.
 */
function logScore(highScores, currentName, currentScore) {
    var player = {
        'name': currentName,
        'score': currentScore
    };

    highScores.push(player);
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
}
