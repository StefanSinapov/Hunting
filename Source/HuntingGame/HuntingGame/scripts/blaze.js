function Blaze(coordinate) {
    console.log("Blaze constructor.")
    GameObject.call(this, coordinate);
}

Blaze.prototype = new GameObject();

Blaze.prototype.constructor = Blaze;

Blaze.prototype.toString = function () {
    var result =  "Blaze:\n" + GameObject.prototype.toString.call(this);
    return result;
}