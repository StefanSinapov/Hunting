/*
 *   Initializes a new instance of the Eggman class.
 */
function Eggman(coordinate) {
    GameObject.call(this, coordinate);
    this.onScreen = false;
    this.cooldown = Eggman.CONFIG.get('EGGMAN_COOLDOWN');
    this.width = Eggman.CONFIG.get('EGGMAN_WIDTH');
    this.height = Eggman.CONFIG.get('EGGMAN_HEIGHT');
    this.maxSpeed = Eggman.CONFIG.get('EGGMAN_MAXSPEED');
}

/*
 *   Inherits GameObject
 */
Eggman.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Eggman.prototype.constructor = Eggman;

/*
 *   Prints the properties of eggman.
 */
Eggman.prototype.toString = function() {
    var result = "Eggman:\n" + GameObject.prototype.toString.call(this);
    return result;
};

/*
 *   Constants for the Eggman object.
 */
Eggman.CONFIG = function () {
    var constants = {
        'EGGMAN_WIDTH': 60,
        'EGGMAN_HEIGHT': 60,
        'EGGMAN_COOLDOWN': 100,
        'EGGMAN_MAXSPEED': 5

    };

    return {
        get: function (name) {
            return constants[name];
        }
    };
}();


// Moves eggman with own speed
Eggman.prototype.Move = function(renderer) {

    this.position.x += this.speedX;
    this.position.y += this.speedY;

    if(this.isHit){

    	if(this.position.y > renderer.height / 2){
			this.onScreen = false;
			this.isHit = false;
			this.cooldown = Eggman.CONFIG.get('EGGMAN_COOLDOWN');
		}

		return;
    }
    
    if(this.onScreen && 
    	(this.position.x > renderer.width || this.position.x + this.width < 0)){

    	this.onScreen = false;
    	this.cooldown = Eggman.CONFIG.get('EGGMAN_COOLDOWN');
    }

    if(this.position.y + this.height > renderer.height / 2
    	|| this.position.y < 0){
    	this.speedY = -this.speedY;
    }
};

// Call when Eggman is hit
Eggman.prototype.Hit = function () {
	this.isHit = true;

	this.score = Math.abs(this.speedY) * 5 + Math.abs(this.speedX) * 10;

	this.speedX = 0;
	this.speedY = 15;

}

Eggman.prototype.update = function(renderer) {
	if(!this.onScreen){
	   	--this.cooldown;
    
    	if(this.cooldown === 0){
    	    this.onScreen = true;
    	    var randomX = parseInt((Math.random() * 2)) * (renderer.width + this.width) - this.width;
    	    var randomY = parseInt(Math.random() * (renderer.height / 2 - this.height));
    	    
    	    this.position = new Coordinate(randomX, randomY);

    	    this.speedX = parseInt(Math.random() * this.maxSpeed + 1);
    	    if(randomX > 0) this.speedX = -this.speedX;

    	    this.speedY = parseInt(Math.random() * this.maxSpeed + 1);
    	}
	}

	this.Move(renderer);
}