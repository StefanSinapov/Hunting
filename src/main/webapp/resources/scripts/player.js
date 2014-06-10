/*
 *   Initializes a new instance of the Player class.
 */
function Player(name, score) {
    this.name = name;
    this.score = score;
}

/*
 *   Prints the properties of the player on the console.
 */
Player.prototype.toString = function () {
    return "Name: " + this.name + " Score: " + this.score;
};
