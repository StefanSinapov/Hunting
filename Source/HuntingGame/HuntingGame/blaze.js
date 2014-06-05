function Blaze(coordinate) {
    GameObject.call(this, coordinate);
}


Blaze.prototype = new GameObject();

Blaze.prototype.constructor = GameObject