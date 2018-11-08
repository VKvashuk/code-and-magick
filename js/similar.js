'use strict';

(function(){
	var coatColor;
	var eyesColor;
	var wizards = [];

	// определения степени схожести магов
	var getRank = function(wizard){
		var rank = 0;

		if(wizard.colorCoat === coatColor){
			rank += 2;
		};
		if(wizard.colorEyes === eyesColor){
			rank += 1;
		};

		return rank;
	};

	// сортировка списка магов
	var updateWizards = function(){
		window.render(wizards.slice().sort(function(left, right){
			var rankDiff = getRank(right) - getRank(left);
			if(rankDiff === 0){
				rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
			}
			return rankDiff;
		}));
	};

	var prevTimer;

	// обновление цвета глаз
	window.onEyesChange = function(color){
		eyesColor = color;
		window.clearTimeout(prevTimer);
		prevTimer = window.setTimeout( function(){
			updateWizards();
		}, 300);
	};

	// обновление цвета накидки(куртки)
	window.onCoatChange = function(color){
		coatColor = color;
		window.clearTimeout(prevTimer);
		prevTimer = window.setTimeout(function () {
			updateWizards();
		}, 300);
	};

	// обновление списка магов
	var successHandler = function(data){
		wizards = data;
		updateWizards();
	};

	window.backend.save(successHandler,  window.backend.errorHandler);
})();