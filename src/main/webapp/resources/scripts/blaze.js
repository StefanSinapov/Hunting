/*
 *   Initializes a new instance of the Blaze class.
 */
function Blaze(coordinate) {
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
Blaze.prototype.shoot = function (target) {
    this.bullets--;
    if (this.bullets === Blaze.CONFIG.get('MIN_BULLETS_COUNT')) {
        this.reload();
    }

    if (target.position.x <= this.position.x && this.position.x <= target.position.x + target.width
        && target.position.y <= this.position.y && this.position.y <= target.position.y + target.height) {
        // console.log('hit at x:' + this.position.x + " y:" + this.position.y);
        // TODO: if target have health call its method a.k.a target.getHit();
    }
};

/*
 *   Reloads the bullets to max bullet count.
 */
Blaze.prototype.reload = function () {
    this.bullets = Blaze.CONFIG.get('MAX_BULLETS_COUNT');
};

/*
 *   Constants for the Blaze object.
 */
Blaze.CONFIG = function () {
    var constants = {
        'MAX_BULLETS_COUNT': 3,
        'MIN_BULLETS_COUNT': 0,
        'RELOADING_TIME': 3000

    };

    return {
        get: function (name) {
            return constants[name];
        }
    };
}();

/*
 *   Prints Blaze's properties on the console.
 */
Blaze.prototype.toString = function () {
    return "Blaze:\n" + GameObject.prototype.toString.call(this);
};

/*
 *   Updates the state of Blaze.
 */
Blaze.prototype.update = function (controller, eggman) {

    if (controller.mousePosition !== null) {
        //  console.log(controller.mousePosition);
        GameObject.prototype.update.call(this, controller.mousePosition);
    }

    if (controller.mouseClick !== null) {
        this.shoot(eggman);
        // console.log(controller.mouseClick);
        controller.mouseClick = null;
    }
};