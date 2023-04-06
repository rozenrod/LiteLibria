// Скрипт перезагрузки страници свайпом.
let app_scroll = false;
let animID = document.getElementById('swipe_updater');
let animIconID = document.getElementById('swipe_icon');
let animBgID =  document.getElementById('swipe_bg');


window.addEventListener('scroll', function(e) {
	if (window.matchMedia('(display-mode: standalone)').matches) {
		let a = window.scrollY;
		let b = 50;
		let c = 125;
		a = -a;
		a = a/2;

		animBgID.style = `top: 127px`;
		animIconID.style.top = a/2;

		if(a > 50){
			b = 50 + (a-50);
			c = 102 + (a/2)
			animBgID.style = `top: ${c}px`;
		}

		if(window.scrollY < 0){
			animBgID.querySelector('svg').setAttribute("width", b);
			animBgID.querySelector('path').setAttribute('d', `
			m 0 0
			h 0
			v 50
			c 0 50  ${a} 50  ${a} 100
			c 0 50 -${a} 50 -${a} 100
			v 50
			h -50
		`);
		}

		if(window.scrollY <= -10){
			animID.style.zIndex = 90;
		} else {
			animID.style.zIndex = 0;
		}

		if(window.scrollY <= -120){
			if(app_scroll == false){
				app_scroll = true;
				animIconID.style.transform = 'rotate(180deg)';
				appReload();
			}
		} else if(window.scrollY >= 0){
			if(app_scroll == true){
				app_scroll = false;
				animIconID.style.transform = 'rotate(0deg)';
			}
			animBgID.style = `top: -127px`;
		}
	}
});