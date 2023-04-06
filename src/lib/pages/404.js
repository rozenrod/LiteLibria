function page_404() {
	document.title = 'Страница не найдена — LiteLibria';

  document.getElementById('app').innerHTML = `
	<!-- Блок 404	 -->
	<div class="CatalogBlock">
		<div class="CatalogList">

		<!-- Картинка в случае отсутствия ответа  -->
		<div id="FilterNone" data-state="active">
			<img src="img/libriatyan/4.webp">
			<br /><br />
			<p style="color: var(--ColorThemes3);">Ничего не найдено...</p>
		</div>

		</div>
	</div>
  `;

	preloaderHide();
}