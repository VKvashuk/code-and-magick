'use strict';

// отрисовка окна статистики играков, по окончанию игры
window.renderStatistics = function (ctx, names, times) {
	

	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	ctx.fillRect(110, 20, 420, 270);

	ctx.fillStyle = '#fff';
	ctx.fillRect(100, 10, 420, 270);

	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	ctx.fillText('Ура вы победили!\nСписок результатов:', 160, 30);

	var max = -1;
	var maxIndex = -1;
	for(var i = 0; i < times.length; i++){
		var time = times[i];
		if (time > max) {
			max = time;
			maxIndex = i;
		}
	}

	ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 60);

	var histogramHeighth = 150;
	var step = histogramHeighth/(max-0);

	var barHeighth = 40;
	var ident = 115;
	var initY = 120;
	var initX = 80;
	var lineHeight = 40;

	// отрисовка столбцов диаграммы
	for (var i = 0; i < times.length; i++) {
		if(names[i] == "Вы"){
			ctx.fillStyle = '#f0f';
		}else{
			ctx.fillStyle = '#00f';
		}
		ctx.fillRect(initY+ident*i, initX, barHeighth, times[i]*step);
		ctx.fillText(names[i], initX+lineHeight+ident*i,initY + histogramHeighth, initY);

	}
}