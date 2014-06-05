function Coordinate(x,y){
    this.x = x;
    this.y = y;
}

Coordinate.prototype.equals = function(other){
    var result = false;
    if(other.x === this.x && other.y === this.y){
        result = true;
    }

    return result;
};