const Notes = {
	list: [],
	q: '',
	init: async function() {
		// let html = await fetch('/lib/pages/notes/index.html').then((response) => response.text());
		let html = `<div class="CatalogBlock"><div class="CatalogList"><div style="display:flow-root"><h1 style="float:left">Примечания к обновлениям</h1></div><div class="his" id="his"></div></div></div>`;
		app.innerHTML = html;

		document.title = 'Примечания к обновлениям — LiteLibria';

		preloaderHide();

		this.setHTML();
	},
	setHTML: function () {
		for (var i = 0; i < updateNotes.length; i++) {
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


			var div = document.createElement('div');
			document.getElementById('his').appendChild(div);
			div.className = 'his_block';
			div.innerHTML += `
					<p class="his_block_v1"><span class="his_block_v2">${updateNotes[i]['prefix']} - ${updateNotes[i]['version']}</span> <span>${updateNotes[i]['date']}</span></p>
					<ul class="change-log">
						${more_text(updateNotes[i]['update'])}
					</ul>
					`;
		}
	}
}