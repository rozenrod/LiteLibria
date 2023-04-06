const ScrollToTop = {
	'init': function(){
		let goTopBtn = document.getElementById('backToTop');
	
		window.addEventListener('scroll', function() {
			let scrolled = window.pageYOffset;
			let coords = document.documentElement.clientHeight;
	
			if (scrolled > coords && localStorage.getItem('backToTop') != 'false') {
				goTopBtn.setAttribute('data-state', 'active');
			}
			if (scrolled < coords) {
				goTopBtn.setAttribute('data-state', '');
			}
			
		});

		function backToTop() {
			if (window.pageYOffset > 0) {
				window.scrollBy(0, -80);
				setTimeout(backToTop, 0);
			}
		}

		goTopBtn.addEventListener('click', function(){
			backToTop()
		});
	}
}