function sortingShow(style = false){
	if(style) {
		Catalog.sorting.show = true;
		document.getElementById('FilterOpen').style.display = "";
		document.getElementById('FilterClose').style.display = "none";
		document.getElementById('SortingBlock').style.display = "none";
	} else {
		Catalog.sorting.show = false;
		document.getElementById('FilterOpen').style.display = "none";
		document.getElementById('FilterClose').style.display = "";
		document.getElementById('SortingBlock').style.display = "";
	}
}