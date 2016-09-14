import Model from './model.js';
import View from './view.js';

export default {
	outputData(dataType) {
		return Model.getData(dataType).then( response => {
			Model.cacheResponse(response);

			let numOfPages = parseInt(response.length/50);
			response = (response.length >= 50) ? response.slice(0, 50) : response;

			results.innerHTML = View.render('table');
			tableBody.innerHTML = View.render('tableBody', {list: response});

			if(View.createPagination(numOfPages)) {
				document.querySelector('#pagination').addEventListener('click', e => {
					let pageNum = e.target.textContent;
					let pageData = Model.loadPageData(pageNum);
					View.changeActivePage(pageNum);
					tableBody.innerHTML = View.render('tableBody', {list: pageData});
				});
			}

			document.querySelector('#tableHeader').addEventListener('click', e => {
				let result = Model.sortColumn(e.target.getAttribute('data-sort'),
																			e.target.getAttribute('data-state'));
				if(result.length >= 50) {
					result = Model.loadPageData(View.getCurPage());
				}
				tableBody.innerHTML = View.render('tableBody', {list: result});
				if(e.target.className === 'sort-down') {
					e.target.className = 'sort-up';
					e.target.setAttribute('data-state', 'up');
				} else {
					e.target.className = 'sort-down';
					e.target.setAttribute('data-state', 'down')
				}
			});

			document.querySelector('#searchInput').addEventListener('keyup', e => {
				let [itemsToHide, itemsToShow] = Model.filterList(e.target.value.trim().toLowerCase());
				View.manageElemDisplay(itemsToHide, 'hide');
				View.manageElemDisplay(itemsToShow);
			});

			document.querySelector('#searchBtn').addEventListener('click', e => {
				e.preventDefault();
				e.target.parentNode.reset();
				document.querySelector('#searchInput').dispatchEvent(new Event('keyup'));
			});

			document.querySelector('#tableBody').addEventListener('click', e => {
				let personEmail = e.target.parentNode.children[3].textContent;
				let personData = Model.retrieveData(personEmail, View.getCurPage());
				let dataContainer = document.querySelector('#personInfo');
				dataContainer.style.display = 'block';
				dataContainer.innerHTML = View.render('personDataOutput', personData);
			});

		}).catch( err => {
			alert(err);
		});
	},

	showDownloadStatus(e) {
		results.innerHTML = View.displayStatus(e.loaded);
	}
}