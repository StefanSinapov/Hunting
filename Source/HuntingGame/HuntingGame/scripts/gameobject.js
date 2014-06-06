function GameObject(coordinate, layer) {
    this.position = coordinate;
    this.layer = layer;
}

GameObject.prototype.toString = function () {
    var result = "Current position = " + this.position.toString();
    return result;
}