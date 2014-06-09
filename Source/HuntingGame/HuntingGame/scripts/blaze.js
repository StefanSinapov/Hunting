/*
 *   Initializes a new instance of the Blaze class.
 */
function Blaze(coordinate) {
    console.log("Blaze constructor.")
    GameObject.call(this, coordinate);

    this.bullets = Blaze.CONFIG.get('MAX_BULLETS_COUNT');
}

/*
 *   Inherits GameObject
 */
Blaze.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Blaze.prototype.constructor = Blaze;

/*
 *   Shoots and lowers the count of the total bullets.
 */
Blaze.prototype.shoot = function () {
    this.bullets--;

    if (this.bullets === 0) {
        this.reload();
    }

    //here to check if hit something?
}

/*
 *   Reloads the bullets to max bullet count.
 */
Blaze.prototype.reload = function () {
    this.bullets = Blaze.CONFIG.get('MAX_BULLETS_COUNT');
}

/*
 *   Constants for the game object.
 */
Blaze.CONFIG = function () {
    var private = {
        'MAX_BULLETS_COUNT': 3,
        'RELOADING_TIME': 3000


    };

    return {
        get: function (name) {
            return private[name];
        }
    };
}();

/*
 *   Prints Blaze's properties on the console.
 */
Blaze.prototype.toString = function () {
    var result = "Blaze:\n" + GameObject.prototype.toString.call(this);
    return result;
}
