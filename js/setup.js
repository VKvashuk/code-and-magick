'use strict';


var DataWizards = {
  // NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  // SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};


window.setup = document.querySelector('.setup');


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');

var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');
var setupUserName = document.querySelector('.setup-user-name');

  // изменение цвета глаз мага 
  wizardEyes.addEventListener('click', function () {
    var randomEyesColor = window.getRandomElement(DataWizards.EYES_COLORS);
    wizardEyes.style.fill = randomEyesColor;
    inputEyesColor.value = randomEyesColor;
    window.onEyesChange(randomEyesColor);
  });

  // изменение цвета мантии мага 
  wizardCoat.addEventListener('click', function () {
    var randomCoatColor = window.getRandomElement(DataWizards.COAT_COLORS);
    wizardCoat.style.fill = randomCoatColor;
    inputCoatColor.value = randomCoatColor;
    window.onCoatChange(randomCoatColor);
  });

  // изменение цвета фаербола мага 
  wizardFireball.addEventListener('click', function () {
    var randomFireballColor = window.getRandomElement(DataWizards.FIREBALL_COLORS);
    wizardFireball.style.background = randomFireballColor;
    inputFireballColor.value = randomFireballColor;
  });

// функция закрытия модального окна (нажатием Esc)
function onPopupKeyPress (evt){
	if(evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName){
		closePopup();
	}
};

// функция открытия модального окна 
function openPopup (){
	window.setup.classList.remove('hidden');
};
// функция закрытия модального окна 
function closePopup (){
	window.setup.classList.add('hidden');
	window.resetDialogPosition(window.setup);
};

// события закрытия/открытия модального окна
setupOpen.addEventListener('click', function(){
	openPopup();
	document.addEventListener('keydown', onPopupKeyPress);
});

setupClose.addEventListener('click', function(){
	closePopup();
	document.removeEventListener('keydown', onPopupKeyPress);
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


 (function(){

 	// перемещение артифакта
	var shopElement = document.querySelector('.setup-artifacts-shop');
	var draggedItem = null;
	var artifactsElement = document.querySelector('.setup-artifacts');

	// событие начала перемещения
	shopElement.addEventListener('dragstart', function(evt){
		if(evt.target.tagName.toLowerCase() === 'img'){
			draggedItem = evt.target;
			evt.dataTransfer.setData('text/plain', evt.target.alt);
		};
	});

	// событие перемещения артифакта на областю вставки
	artifactsElement.addEventListener('dragover', function(evt){
		artifactsElement.style.outline = '2px dashed red';
		evt.preventDefault();
		return false;
	});

	// событие вставки артивакта в соответсвующее место 
	artifactsElement.addEventListener('drop', function(evt){
		evt.target.style.background = '';
		artifactsElement.style.outline = '';
		if(!evt.target.hasChildNodes()){
			evt.target.appendChild(draggedItem.cloneNode(true));
		}
		evt.preventDefault();
	});

	// событие перемещения артифакта на ячейкой вставки
	artifactsElement.addEventListener('dragenter', function(evt){
		if(!evt.target.hasChildNodes() && evt.target.tagName.toLowerCase() !== 'img'){
			evt.target.style.background = 'yellow';
		};
		evt.preventDefault();
	});

	// событие перемещение артифакта за область вставки
	artifactsElement.addEventListener('dragleave', function(evt){
		evt.target.style.background = '';
		artifactsElement.style.outline = '';
		evt.preventDefault();
	});

})();

 (function(){

 	// отправка данных на сервер
	var form = document.querySelector('.setup-wizard-form');
	form.addEventListener('submit', function(evt){

		evt.preventDefault();
		var formData = new FormData(form);
		var saveHandler = function(){
			window.setup.classList.add('hidden');
		};
	
		window.backend.upload(formData, saveHandler,  window.backend.errorHandler);
	});

})();



 

