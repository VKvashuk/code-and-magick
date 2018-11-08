'use strict';

(function(){

	// генерируем шаблон волшебника
	function renderWizard(wizard) {
		var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
		var wizardElement = similarWizardTemplate.cloneNode(true);
		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

		return wizardElement;
	};

	// добавляем магов в целевой блок.
	window.render = function(wizards){
		var similarListElement = document.querySelector('.setup-similar-list');
		var fragment = document.createDocumentFragment();
		similarListElement.innerHTML = '';
		
		for (var i = 0; i < 4; i++) {
			fragment.appendChild(renderWizard(wizards[i]));
		}
		similarListElement.appendChild(fragment);

		document.querySelector('.setup-similar').classList.remove('hidden');
		};

})();