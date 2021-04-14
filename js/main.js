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
						console.log(input.value[0])
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
				input.onfocus = function() {
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

showPopupLinks.forEach(el => {
	el.onclick = function(event) {
		event.preventDefault();
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
 

