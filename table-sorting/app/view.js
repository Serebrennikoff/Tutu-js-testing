export default {
	curActivePage: 1,

	render(templateName, model) {
		templateName = `${templateName}Template`;

		let templateElement = document.getElementById(templateName),
				templateSource = templateElement.innerHTML,
				renderFn = Handlebars.compile(templateSource);

				return renderFn(model);
	},

	displayStatus(dataVolume=0) {
		return `<p>Загрузка данных с сервера...</p><p>Загружено ${dataVolume} байт</p>`;
	},

	createPagination(numOfPages) {
		this.curActivePage = 1;
		if(numOfPages > 1) {
			let code = '<nav id="pagination"><ul class="pagination"><li class="active"><span>1</span></li>'
			for(let i = 2; i <= numOfPages; i++) {
				code += `<li><span>${i}</span></li>`;
			}
			code += '</ul></nav>';
			results.innerHTML += code;
			return true;
		}
		return false;
	},

	changeActivePage(pageNum) {
		let pages = document.querySelector('#pagination').firstElementChild.children;
		pages[this.curActivePage-1].classList.remove('active');
		pages[pageNum-1].classList.add('active');
		this.curActivePage = pageNum;
	},

	getCurPage() {
		return this.curActivePage;
	},

	manageElemDisplay(listOfElements, display='show') {
		for(let element of listOfElements) {
			element.style.display = (display === 'show') ? 'table-row' : 'none';
		}
	}
};