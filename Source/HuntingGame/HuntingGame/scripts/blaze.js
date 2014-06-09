	// var GlobalConsts = require('GlobalConsts.js');

	var _maxBulletsCount = 0,
		_currentBulletsCount = 0,
		_reloadingTime = 0;

	/*
	 *   Blaze object. Inherits GameObject.
	 */
	function Blaze(coordinate) {
		console.log("Blaze constructor.")
		GameObject.call(this, coordinate);

		// _maxBulletsCount = GlobalConsts.PLAYER_BULLETS_COUNT;
		_maxBulletsCount = 3;
		_currentBulletsCount = _maxBulletsCount;
		// _reloadingTime = GlobalConsts.PLAYER_CLIP_REALOADING_TIME;
		_reloadingTime = 3000; //ms
	}

	Blaze.prototype = new GameObject();

	Blaze.prototype.constructor = Blaze;

	Blaze.prototype.getBulletsCount = function() {
		return _currentBulletsCount;
	}

	Blaze.prototype.shoot = function() {
		_currentBulletsCount--;
		if (_currentBulletsCount === 0) {
			this.reload();
		}

		//here to check if hit something?
	}

	Blaze.prototype.reload = function() {
		//here to set timeout?
		_currentBulletsCount = _maxBulletsCount;
	}


	/*
	 *   Prints Blaze's properties on the console.
	 */
	Blaze.prototype.toString = function() {
		var result = "Blaze:\n" + GameObject.prototype.toString.call(this);
		return result;
	}
