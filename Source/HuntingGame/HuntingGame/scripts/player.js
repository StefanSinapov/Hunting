/*
 *   Initializes a new instance of the Player class.
 */
function Player(name, score) {
    this.playerName = playerName;
    this.score = score;
}

/*
 *   Prints the properties of the player on the console.
 */
Player.prototype.toString = function () {
    return "Name: " + this.playerName + " Score: " + this.score;
};
