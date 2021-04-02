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
