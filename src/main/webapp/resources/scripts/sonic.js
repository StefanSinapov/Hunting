/*
 *   Initializes a new instance of the Sonic class.
 */
function Sonic(coordinate) {
    GameObject.call(this, coordinate);

}

/*
 *   Inherits GameObject
 */
Sonic.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Sonic.prototype.constructor = Sonic;
