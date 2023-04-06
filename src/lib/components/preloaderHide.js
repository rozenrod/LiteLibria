let preloader = document.getElementById("preloader");
let preloader_preload = document.getElementById("preloader_preload");
let preloader_text = document.getElementById("preloader_text");

function preloaderHide() {
  function fadeOutnojquery(el){
    el.style.opacity = 1;
    let interpreloader = setInterval(
      function(){
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <=0.05){
          clearInterval(interpreloader);
          preloader_preload.style.display = "none";
          preloader.style.display = "none";
        }
      },16
    );
  }
  setTimeout(function(){
    fadeOutnojquery(preloader_preload);
    fadeOutnojquery(preloader);
		clearInterval(intervalTimer);
		intervalTimer = 0;
	},200);
};

let text_json = meetingTips[Math.floor(Math.random()*meetingTips.length)];
preloader_text.innerHTML = text_json;

let intervalTimer = setInterval(
	function(){
		text_json = meetingTips[Math.floor(Math.random()*meetingTips.length)];
		preloader_text.innerHTML = text_json;
	},4000
);

preloader_preload.addEventListener('click', function () {
	preloaderHide();
});