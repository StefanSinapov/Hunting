/*
*   Eggman object. Inherits GameObject.
 */
function Eggman(coordinate) {
    console.log("Eggman constructor");
    GameObject.call(this, coordinate);
}

Eggman.prototype = new GameObject();

Eggman.prototype.constructor = Eggman;

Eggman.prototype.toString = function () {
    var result =  "Eggman:\n" + GameObject.prototype.toString.call(this);
    return result;
}