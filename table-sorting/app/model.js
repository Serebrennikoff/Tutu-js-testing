import Controller from './controller.js';

export default {
	dataPaths: {
		small: ' http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
		big: ' http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'
	},
	dataStorage: [],

	cacheResponse(response) {
		this.dataStorage = response;
	},

	getData(dataType) {
		return new Promise( (resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', this.dataPaths[dataType]);
			xhr.responseType = 'json';
			xhr.onprogress = function(e) {
				Controller.showDownloadStatus(e);
			};
			xhr.onload = function() {
				if(xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject(Error(xhr.statusText));
				}
			};
			xhr.onerror = function() {
				reject(Error('There was a network error.'));
			}
			xhr.send();
		});
	},

	sortById(dataState) {
		return this.dataStorage.sort( (a,b) => {
			let res = a.id - b.id;
			return (dataState === 'down') ? res : -res;
		});
	},
	sortByLetters(columnName, dataState) {
		return this.dataStorage.sort( (a,b) => {
			if(a[columnName] > b[columnName]) {
				return (dataState === 'down') ? 1 : -1;
			}
			if(a[columnName] < b[columnName]) {
				return (dataState === 'down') ? -1 : 1;
			}
			return 0;
		});
	},
	sortByPhone(dataState) {
		return this.dataStorage.sort( (a,b) => {
			let res = parseInt(a.phone.substr(1, 3)) - parseInt(b.phone.substr(1, 3));
			if(res === 0) {
				res = parseInt(a.phone.substr(5, 3)) - parseInt(b.phone.substr(5, 3));
			}
			return (dataState === 'down') ? res : -res;
		})
	},

	sortColumn(columnName, dataState) {
		switch(columnName) {
			case 'firstName':
			case 'lastName':
			case 'email':
				return this.sortByLetters(columnName, dataState);
			case 'id':
				return this.sortById(dataState);
			case 'phone':
				return this.sortByPhone(dataState);
		}
	},

	loadPageData(pageNum) {
		return this.dataStorage.slice(50*(pageNum-1), 50*(pageNum-1)+50);
	},

	filterList(str) {
		let itemsToHide = [],
				itemsToShow = [],
				tableItems = document.querySelector('#tableBody').children;
		for(let item of tableItems) {
			let cells = item.children,
					isValid = Array.prototype.some.call(cells, cell => {
						return cell.textContent.toLowerCase().includes(str)
					});
			if(!isValid) {
				itemsToHide.push(item);
			} else {
				itemsToShow.push(item);
			}
		}
		return [itemsToHide, itemsToShow];
	},

	retrieveData(key, searchRange) {
		let pageData = (this.dataStorage.length > 50) ? this.loadPageData(searchRange) :
																										this.dataStorage;
		for(let item of pageData) {
			if(item.email === key) {
				return item;
			}
		}
	}
};