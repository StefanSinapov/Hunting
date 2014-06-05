function Blaze(coordinate) {
    console.log("Blaze constructor.")
    GameObject.call(this, coordinate);
}

Blaze.prototype = new GameObject();

Blaze.prototype.constructor = GameObject;