/*
 *   Initializes a new instance of the Eggman class.
 */
function Eggman(coordinate) {
    GameObject.call(this, coordinate);
    this.onScreen = false;
    this.speed = Eggman.CONFIG.get('EGGMAN_SPEED');
    this.width = Eggman.CONFIG.get('EGGMAN_WIDTH');
    this.height = Eggman.CONFIG.get('EGGMAN_HEIGHT');
}

/*
 *   Inherits GameObject
 */
Eggman.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Eggman.prototype.constructor = Eggman;

/*
 *   Prints the properties of eggman.
 */
Eggman.prototype.toString = function() {
    var result = "Eggman:\n" + GameObject.prototype.toString.call(this);
    return result;
};

/*
 *   Constants for the Blaze object.
 */
Eggman.CONFIG = function () {
    var constants = {
        'EGGMAN_WIDTH': 60,
        'EGGMAN_HEIGHT': 60,
        'EGGMAN_SPEED': 2

    };

    return {
        get: function (name) {
            return constants[name];
        }
    };
}();


// Moves eggman with own speed
Eggman.prototype.Move = function() {
    this.position.x += this.speed;
    this.position.y += 0;
};

Eggman.prototype.MoveTo = function(coordinate) {
    this.position = coordinate;
};

Eggman.prototype.Hide = function() {
    this.onScreen = false;
};
