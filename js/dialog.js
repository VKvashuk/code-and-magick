'use strict';
// передвижение диалового окна
(function () {
	var dialogHandler = document.querySelector('.setup-user-pic');
	var defaultDialogCoords = {
	    beginX: window.setup.style.left,
	    beginY: window.setup.style.top
	  };

	dialogHandler.style.zIndex = 3;

	// установка начальных координат диалового окна
	window.resetDialogPosition = function (elem) {
	    elem.style.left = defaultDialogCoords.beginX;
	    elem.style.top = defaultDialogCoords.beginY;
	  };

	dialogHandler.addEventListener('mousedown', function(evt){
		evt.preventDefault();

		//начальные координаты события
		var startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};

		var onMouseMove = function (moveEvt){
			moveEvt.preventDefault();

			//смещение координат
			var shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y - moveEvt.clientY
			};

			//переопределение координат
			startCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};

			// ограничение области перемещения диалового окна
			if ((window.setup.offsetTop - shift.y) > 450 || (window.setup.offsetTop - shift.y) < 0) {
				shift.y = 0;
			}else {
				window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
			}
			if ((window.setup.offsetLeft - shift.x) > (+document.documentElement.clientWidth - 400) || (window.setup.offsetLeft - shift.x) < 400) {
				shift.y = 0;
			}else {
				window.setup.style.left = (window.setup.offsetLeft - shift.x)  + 'px';
			}
		};

		// окончание перемещения диалового окна
		var onMouseUp = function(upEvt){
			upEvt.preventDefault();
			
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});
})();