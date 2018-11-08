'use strict';

(function(){
	// Функция, возвращающая новый массив из старого в случайном порядке
	window.shuffleArray = function(array) {
	  var mixedArray = array.slice();
	  for (var i = mixedArray.length - 1; i > 0; i--) {
	    var randomIndex = Math.floor(Math.random() * (i + 1));
	    var tempValue = mixedArray[i];
	    mixedArray[i] = array[randomIndex];
	    mixedArray[randomIndex] = tempValue;
	  }
	  return mixedArray;
	};

	// Функция, возвращающая случайный элемемент массива
	window.getRandomElement = function(array) {
	  for (var i = 0; i < array.length; i++) {
	    var randomIndex = Math.floor(Math.random() * array.length);
	    var randomElement = array[randomIndex];
	  }
	  return randomElement;
	};
})();