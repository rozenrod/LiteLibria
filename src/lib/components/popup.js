const Popup = {
	init: function (){
		const ppp = document.getElementById('popup');
		const ppp_close = document.getElementById('popup_close');

		ppp.setAttribute('data-state', 'active');

		document.body.setAttribute("style", "touch-action: none;-ms-touch-action: none;");

		ppp_close.addEventListener('click', async function(e) {
			ppp.setAttribute('data-state', '');
			document.body.setAttribute("style", "");
		});
	},
	update: function (){
		this.init();

		const ppp_title = document.getElementById('popup_title');
		const ppp_content = document.getElementById('popup_content');

		ppp_title.innerHTML = `Описание обновления`;

		let more_text = (json) => {
			let a = '';
			for (let j = 0; j < json.length; j++) {
				a += `
					<li class="d-flex">
						<div class="change-badge his_${json[j]['type']}">${json[j]['type']}</div>
						<div class="change-description">${json[j]['text']}</div>
					</li>
				`;
			}
			return a;
		}


		ppp_content.innerHTML = `
			<p class="his-block-popup"><span class="his_block_v2">${updateNotes[0]['prefix']} - ${updateNotes[0]['version']}</span> <span>${updateNotes[0]['date']}</span></p>
			<ul class="change-log-popup">
				${more_text(updateNotes[0]['update'])}
			</ul>
		`;
	}
}