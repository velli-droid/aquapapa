function rudr_favorite(a) {
	pageTitle=document.title;
	pageURL=document.location;
	try {
		eval("window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g,''));
	}
	catch (e) {
		try {
			window.sidebar.addPanel(pageTitle, pageURL, "");
		}
		catch (e) {
			if (typeof(opera)=="object") {
				a.rel="sidebar";
				a.title=pageTitle;
				a.url=pageURL;
				return true;
			} else {
				alert('Нажмите ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D чтобы добавить эту страницу в закладки.');
			}
		}
	}
	return false;
}

// mobile menu
let body = document.querySelector('body');

function mobileMenu() {
	let mobileMenu = document.querySelector('.mobile-menu');
	let jumpMenu = mobileMenu.querySelector('.jump-menu');
	let burgerBtn = mobileMenu.querySelector('.burger-menu');
	let menuCloseBtn = mobileMenu.querySelector('.jump-menu__close');

	burgerBtn.onclick = function() {
		jumpMenu.classList.add('jump-menu_active');
		body.classList.add('no-scroll');
	}
	menuCloseBtn.onclick = function() {
		jumpMenu.classList.remove('jump-menu_active');
		body.classList.remove('no-scroll');
	}
}
mobileMenu();

// EMAIL VALIDATE
let validateEmail = function(email) {
	let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(String(email).toLowerCase());
}

// PHONE MASK
let elementsWithMask = document.getElementsByClassName('imaskjs__input_tel');
for (let i = 0; i < elementsWithMask.length; i++) {
	let mask = IMask(elementsWithMask[i], {
		mask: '+{7}(000)000-00-00',
	});
	elementsWithMask[i].addEventListener('keyup', function() {
		if(mask.value == '+7(8') {
			mask.destroy();
			mask = IMask(elementsWithMask[i], {
				mask: '{8}(000)000-00-00',
			});
			mask.value = '8('
		}
		if(mask.value == '8(7') {
			mask.destroy();
			mask = IMask(elementsWithMask[i], {
				mask: '+{7}(000)000-00-00',
			});
			mask.value = '+7('
		}
	});
}



// form validation



let forms = [...document.querySelectorAll('form')];
if(forms.length) {
	const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
	forms.forEach(el => {
		let formInputs = [...el.querySelectorAll('.form-input')];
		for(let input of formInputs) {
			let inputName = input.getAttribute('name');
			if(inputName != 'userEmail' && inputName != 'userPhone') {
				input.addEventListener('input', function() {
					input.value = input.value.replace(/[a-z]/gi,'');

				})
			}
		}
		let formSubmitBtn = el.querySelector('.form-button');
		let formCheckbox = el.querySelector('.form-checkbox');
		formSubmitBtn.onclick = function(event) {
			for(let input of formInputs) {
				switch (input.getAttribute('name')) {
					case 'userEmail':
						if(!validateEmail(input.value)) {
							input.classList.add('input_invalidated');
						}
						break;
					case 'userPhone': 
						if(input.value[0] == '+') {
							if(input.value.length < 16) {
								input.classList.add('input_invalidated');
							}
						} else if(input.value.length < 15) {
							input.classList.add('input_invalidated');
						}
						
						break;	
					default:
						if(!input.value) {
							input.classList.add('input_invalidated');
						} else if(!cyrillicPattern.test(input.value)) {
							input.classList.add('input_invalidated');
						}
						break;
				}
				input.onfocus = () => {
					input.classList.remove('input_invalidated');
				}
				formCheckbox.onclick = () => {
					formCheckbox.classList.remove('input_invalidated')
				}
				if(!formCheckbox.checked) {
					formCheckbox.classList.add('input_invalidated')
				}
			} 
			let invalidatedInput = el.querySelector('.input_invalidated');
			if(invalidatedInput) {
				event.preventDefault();
			}
		}
	})
}



// popups

function togglePopupActive(popup) {
	popup.classList.toggle('popup_active')
}
function togglePopupFade(popup) {
	popup.classList.toggle('popup_fade')
}
function showPopup(popup) {
	let pagePupups = [...document.querySelectorAll('.page-popup')];
	for(let item of pagePupups) {
		if(item.classList.contains('popup_active')) {
			hidePopup(item)
		}
	}
	togglePopupFade(popup);
	setTimeout(togglePopupActive, 200, popup);
	body.classList.add('no-scroll');
	let closePopupBtn = popup.querySelector('.popup-close-btn');
	closePopupBtn.onclick = function() {
		hidePopup(popup);
	}
	window.onclick = function(event) {
		if(event.target === popup) {
			hidePopup(popup);
		}
	}
}
function hidePopup(popup) {
	body.classList.remove('no-scroll');
	togglePopupActive(popup);
	setTimeout(togglePopupFade, 200, popup);
}

let formPopup = document.querySelector('.popup-form');
let showPopupLinks = [...document.querySelectorAll('.show-popup__link')];
let formPopupTitle = formPopup.querySelector('.popup-title');
let formPopupBtn = formPopup.querySelector('.form-button');
let formPopupSubject = formPopup.querySelector('.form-subject');

let consultationTitle = `Зкажите <span class="color-red">бесплатную</span> консультацию эксперта и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;

let consultationBtn = 'ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ';
let consultationSubject = "Консультация";



let calculateTitle = `Зкажите прямо сейчас расчет стоимости и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let calculateBtn = 'РАССЧИТАТЬ СТОИМОСТЬ'
let calculateSubject = "Рассчет стоимости";

let callbackTitle = `Зкажите обратный звонок и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let callbackBtn = 'ЗАКАЗАТЬ ЗВОНОК';
let callbackSubject = "Обратный звонок";

let orderTitle = `Зкажите <span class="color-red">бесплатный</span> выезд специалиста и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let orderBtn = 'ЗАКАЗАТЬ ВЫЕЗД';
let orderSubject = "Выезд специалиста";

let montageSepticTitle = `Узнайте стоимость монтажа септика и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let montageSepticBtn = 'УЗНАТЬ СТОИМОСТЬ';
let montageSubject = "Стоимость монтажа";


let detailsTitle = `Узнайте подробности, мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let detailsBtn = 'УЗНАТЬ СТОИМОСТЬ';
let detailsSubject = "Узнать подробности";

let scvaginaTitle = `Зкажите <span class="color-red">бесплатную</span> консультацию по работам с вашей скважиной и мы 
перезвоним вам в течение <span class="color-red">5 минут!</span>`;
let scvaginaBtn = 'ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ';
let scvaginaSubject = "Консультация по работе со скважиной";

showPopupLinks.forEach(el => {
	el.onclick = function(event) {
		event.preventDefault();
		let linkTitle = el.dataset.linkTitle;
		switch (linkTitle) {
			case 'consultation':
				formPopupTitle.innerHTML = consultationTitle;
				formPopupBtn.innerHTML = consultationBtn;
				formPopupSubject.value = consultationSubject;
				break;
			case 'calculate':
				formPopupTitle.innerHTML = calculateTitle;
				formPopupBtn.innerHTML = calculateBtn;
				formPopupSubject.value = calculateSubject;
				break;
			case 'callback':
				formPopupTitle.innerHTML = callbackTitle;
				formPopupBtn.innerHTML = callbackBtn;
				formPopupSubject.value = callbackSubject;
				break;	
			case 'order':
				formPopupTitle.innerHTML = orderTitle;
				formPopupBtn.innerHTML = orderBtn;
				formPopupSubject.value = orderSubject;
				break;	
			case 'montage-septic': 
				formPopupTitle.innerHTML = montageSepticTitle;
				formPopupBtn.innerHTML = montageSepticBtn;
				formPopupSubject.value = montageSubject;
				break;	
			case 'scvagina': 
				formPopupTitle.innerHTML = scvaginaTitle;
				formPopupBtn.innerHTML = scvaginaBtn;
				formPopupSubject.value = scvaginaSubject;
				break;	
			case 'details':	
				formPopupTitle.innerHTML = detailsTitle;
				formPopupBtn.innerHTML = detailsBtn;
				formPopupSubject.value = detailsSubject;
				break;	
			default:
				formPopupTitle.innerHTML = consultationTitle;
				formPopupBtn.innerHTML = consultationBtn;
				formPopupSubject.value = consultationSubject;
				break;
		}
		showPopup(formPopup);
	}
});

let privacyPolicyPopup = document.querySelector('.popup-privacy-policy');
let showPrivacyPolicyPopupLinks = [...document.querySelectorAll('.privacy-policy-popup__link')];

showPrivacyPolicyPopupLinks.forEach(el => {
	el.onclick = function(event) {
		event.preventDefault();
		showPopup(privacyPolicyPopup);
	}
});

// viseo popup

let videoPopup = document.querySelector('.video-popup');
if(videoPopup) {
	let videoPopupIframe = videoPopup.querySelector('.responsive-iframe');
	let videoLinks = [...document.querySelectorAll('.video-list__link')];
	videoLinks.forEach(el => {
		el.onclick = function(event) {
			event.preventDefault();
			let ItemSrc = el.dataset.src;
			videoPopupIframe.setAttribute('src', ItemSrc);
			showPopup(videoPopup);
		}
	});
}

// photo popup

let photoPopup = document.querySelector('.popup-photo');
if(photoPopup) {
	let photoFrame = photoPopup.querySelector('img');
	let photoLinks = [...document.querySelectorAll('.photo__link')];
	photoLinks.forEach(el => {
		el.onclick = function(event) {
			event.preventDefault();
			let ItemSrc = el.dataset.src;
			photoFrame.setAttribute('src', ItemSrc);
			showPopup(photoPopup);
		}
	});
}
 
// table
let differencesTable = document.querySelector('.differences-table');
if(differencesTable) {
	tableRows = differencesTable.querySelectorAll('.differences-table__row');
	tableCols = [];
	let tableFirstRow = tableRows[0];
	let tableFirstRowCells = tableFirstRow.querySelectorAll('.differences-table__cell');
	tableFirstRowCells.forEach(element => {
		let tableCol = [];
		tableCols.push(tableCol);
	});
	for(let i = 0; i < tableRows.length; i++) {
		let tableRow = tableRows[i];
		let tableRowCells = tableRow.querySelectorAll('.differences-table__cell');
		for(let j = 0; j < tableRowCells.length; j++) {
			tableCols[j].push(tableRowCells[j])
		}
	}
	tableCols.forEach(element => {
		element.forEach(colItem => {
			colItem.onmouseover = function() {
				for(cell of element) {
					cell.classList.add('_hover');
				}
			}
			colItem.onmouseout = function() {
				for(cell of element) {
					cell.classList.remove('_hover');
				}
			}
		});
	});
}
