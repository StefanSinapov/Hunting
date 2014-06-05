function Eggman(coordinate) {
    GameObject.call(this, coordinate);
}

Eggman.prototype = new GameObject();

Eggman.prototype.constructor = GameObject