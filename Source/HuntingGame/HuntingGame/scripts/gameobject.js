function GameObject(coordinate) {
    this.position = coordinate;
    this.layer = null;
}

GameObject.prototype.toString = function () {
    var result = "Current position = " + this.position.toString();
    return result;
}