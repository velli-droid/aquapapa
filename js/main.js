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