/*
 *   Initializes a new instance of the Sonic class.
 */
function Sonic(coordinate) {
    GameObject.call(this, coordinate);
    this.onScreen = false;
    this.width = Sonic.CONFIG.get('SONIC_WIDTH');
    this.height = Sonic.CONFIG.get('SONIC_HEIGHT');
    this.speed = Sonic.CONFIG.get('SONIC_MIN_SPEED');
    this.isDrawed = false;
    this.isRunning = false;
    this.destination = {
        x: 0,
        y: 0
    };
}

/*
 *   Inherits GameObject
 */
Sonic.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Sonic.prototype.constructor = Sonic;

/*
 *   Prints the properties of Sonic.
 */
Sonic.prototype.toString = function () {
    var result = "Sonic:\n" + GameObject.prototype.toString.call(this);
    return result;
};

/*
 *   Constants for the Sonic object.
 */
Sonic.CONFIG = function () {
    var animations = {
        idle: [
            6, 7, 69, 104
        ],
        walk: [
            115, 7, 67, 102,
            222, 11, 68, 99,
            325, 9, 77, 97,
            424, 8, 80, 97,
            530, 6, 67, 95,
            631, 9, 70, 102,
            734, 8, 72, 103,
            836, 6, 82, 90,
            939, 6, 81, 98,
            325, 9, 77, 97
        ],
        run: [
            19, 130, 76, 100,
            126, 131, 72, 99,
            231, 130, 69, 100,
            330, 131, 78, 99
        ],
        roll: [
            11, 242, 77, 78,
            118, 241, 72, 78,
            218, 243, 76, 76,
            320, 245, 78, 73,
            422, 234, 77, 76,
            527, 243, 73, 75,
            626, 243, 78, 76,
            731, 245, 75, 73,
            832, 241, 77, 78
        ]
    };

    var constants = {
        'SONIC_WIDTH': 60,
        'SONIC_HEIGHT': 60,
        "SONIC_MIN_SPEED": 2,
        "SONIC_MAX_SPEED": 10,
        'SONIC_FRAME_RATE': 18,
        'SONIC_MIN_MOVE_STEP': 8,
        'SONIC_ANIMATIONS': animations,
        'SONIC_SPRITE': "resources/imgs/sonic-sprite.png",
        'SONIC_ANIMATION_INIT': 'idle',
        "SONIC_OFFSET_X": 80
    };

    return {
        get: function (name) {
            return constants[name];
        }
    };
}();

Sonic.prototype.update = function (renderer, eggman) {
    if (eggman.isHit) {
        this.destination = eggman.position;
        this.isRunning = true;
    }

    if (this.isRunning) {
        var travelPercent = Math.max(this.position.x, 0) / this.destination.x,
            minSpeed = Sonic.CONFIG.get('SONIC_MIN_SPEED'),
            maxSpeed = Sonic.CONFIG.get('SONIC_MAX_SPEED'),
            minMoveStep = Sonic.CONFIG.get('SONIC_MIN_MOVE_STEP'),
            acceleration = travelPercent * (maxSpeed - minSpeed + 1) + minSpeed;

        this.position.x += minMoveStep + acceleration; // TODO: to implement logic more complicated logic (jump, catch the eggman and escape from screen)
    }

    if (this.position.x > renderer.width) {
        this.isRunning = false;
        this.position.x = 0 - Sonic.CONFIG.get('SONIC_OFFSET_X');
    }
}