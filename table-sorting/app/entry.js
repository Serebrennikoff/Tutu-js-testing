import Controller from './controller.js';
import View from './view.js';

new Promise( resolve => {
	window.onload = resolve;
}).then( () => {

	document.querySelector('#btnGroup').addEventListener('click', e => {
		results.innerHTML = '<p>Загрузка данных с сервера...</p>';
		Controller.outputData(e.target.getAttribute('data-type'));
	});

})