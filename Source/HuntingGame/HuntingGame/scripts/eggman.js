function Eggman(coordinate) {
    console.log("Eggman constructor");
    GameObject.call(this, coordinate);
}

Eggman.prototype = new GameObject();

Eggman.prototype.constructor = GameObject;