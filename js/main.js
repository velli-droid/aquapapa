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

function mobileMenu() {
	let body = document.querySelector('body');
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

// popups

function togglePopupActive(popup) {
	popup.classList.toggle('popup_active')
}
function togglePopupFade(popup) {
	popup.classList.toggle('popup_fade')
}
function showPopup(popup) {
	togglePopupFade(popup);
	setTimeout(togglePopupActive, 200, popup);
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
 

