'use strict';

(function(){
	var OK_STATUS = 200;

	window.backend = {
		// функция для отправки данных игрока на сервер
		upload: function(data, onSuccess, onError){
			var URL = 'https://js.dump.academy/code-and-magick';
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'json';

			xhr.addEventListener('load', function(){
				
				var error;
				//определение статуса выполнения запроса
				if(xhr.status === OK_STATUS){
					onSuccess(xhr.response);
				}
				else{
					error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
				}

				if(error){
					onError(error);
				}
			});

			// проверка наличия ошибки
			xhr.addEventListener('error', function(){
				onError('Произошла ошибка соединения');
			});

			// проверка длительности выполнения запроса
			xhr.addEventListener('timeout', function(){
				onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
			});

			xhr.open('POST', URL);
			xhr.send(data);
		},

		// функция для получения данных игрока из сервера
		save: function(onSuccess, onError){
			var URL = 'https://js.dump.academy/code-and-magick/data';
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'json';

			xhr.open('GET', URL);
			xhr.addEventListener('load', function(){
				
				var error;
				//определение статуса выполнения запроса
				if(xhr.status === OK_STATUS){
					onSuccess(xhr.response);
				}
				else{
					error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
				}

				if(error){
					onError(error);
				}
			});

			// проверка наличия ошибки
			xhr.addEventListener('error', function(){
				onError('Произошла ошибка соединения');
			});

			// проверка длительности выполнения запроса
			xhr.addEventListener('timeout', function(){
				onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
			});

			xhr.timeout = 10000; // 10s
			xhr.send();
		},

		// функция вывода ошибки
		errorHandler: function (errorMessage) {
		    window.node = document.createElement('div');
		    window.node.classList.add('modal');
		    window.node.classList.add('modal--error');
		    window.node.tabIndex = 0;

		    window.node.textContent = errorMessage;
		    document.body.insertBefore(window.node, document.body.firstChild);

		    //функция скрытия окна
		    window.closeError = function () {
		      window.node.classList.add('hidden');
		    };

		    window.node.addEventListener('click', function () {
		      window.closeError();
	    	});
	  	}

	}
	
	window.backend.save(window.render,  window.backend.errorHandler);

})();






