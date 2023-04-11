let graph;
let engine;
let trackerAnnounce;
let downloadStats = [];
let downloadTotals = { http: 0, p2p: 0 };
let uploadStats = [];
let uploadTotal = 0;
let loadSpeedTimespan = 10;

// Rickshaw
function initChart() {
	let chartConf = {
		element: document.querySelector("#chart"),
		renderer: 'multi',
		interpolation: "basis",
		stack: false,
		min: 'auto',
		strokeWidth: 2,
		series: [
			{name: "Upload P2P", color: "#39d33a", data: [], renderer: 'area'},
			{name: " - P2P", color: "#5DAEFF", data: [], renderer: 'area'},
			{name: " - HTTP", color: "#F37751", data: [], renderer: 'area'},
			{name: "Download", color: "let(--PrimaryColor)", data: [], renderer: 'line'}
		]
	};

	chart = new Rickshaw.Graph(chartConf);

	new Rickshaw.Graph.Axis.X({
		graph: chart,
		tickFormat: () => ''
	});

	new Rickshaw.Graph.Axis.Y({
		graph: chart,
		orientation: 'left',
		element: document.getElementById('y_axis')
	});

	legend = new Rickshaw.Graph.Legend({
		graph: chart,
		element: document.getElementById('legend')
	});

	legendTotals = new Rickshaw.Graph.Legend({
		graph: chart,
		element: document.getElementById("legend-totals")
	});

	chart.render();
	setInterval(updateChartData.bind(this), 500);

	let chartResize = () => {
		chartConf.width = chart.element.clientWidth;
		chart.configure(chartConf);
		chart.render();
	};

	chartResize();
	window.addEventListener("resize", chartResize);
}
function refreshChart() {
	if (!chart) {
		return;
	}

	let data0 = chart.series[0].data;
	let data1 = chart.series[1].data;
	let data2 = chart.series[2].data;
	let data3 = chart.series[3].data;
	let lastX = data0.length > 0 ? data0[data0.length - 1].x : -1;

	let seriesDataMapper = (currentValue, index) => ({x: index + lastX + 1, y: 0});

	data0.length = 0;
	data1.length = 0;
	data2.length = 0;
	data3.length = 0;

	let stubData = Array.apply(null, Array(200)).map(seriesDataMapper);
	data0.push.apply(data0, stubData.slice(0));
	data1.push.apply(data1, stubData.slice(0));
	data2.push.apply(data2, stubData.slice(0));
	data3.push.apply(data3, stubData.slice(0));

	chart.update();
}
function updateChartData() {
	let downloadSpeed = getDownloadSpeed();
	let http = Number((downloadSpeed.http * 8 / 1000000).toFixed(2));
	let p2p = Number((downloadSpeed.p2p * 8 / 1000000).toFixed(2));
	let total = Number((http + p2p).toFixed(2));
	let upload = Number(getUploadSpeed() * 8 / 1000000).toFixed(2);

	let data0 = chart.series[0].data;
	let data1 = chart.series[1].data;
	let data2 = chart.series[2].data;
	let data3 = chart.series[3].data;
	let x = data0.length > 0 ? data0[data0.length - 1].x + 1 : 0;

	data0.shift();
	data1.shift();
	data2.shift();
	data3.shift();
	data0.push({x: x, y: -upload});
	data1.push({x: x, y: total});
	data2.push({x: x, y: http});
	data3.push({x: x, y: total});

	chart.update();

	formatChartLegendLine(0, total);
	formatChartLegendLine(1, http);
	formatChartLegendLine(2, p2p);
	formatChartLegendLine(3, upload);

	updateLegendTotals();
}
function formatChartLegendLine(index, speed) {
	if (legend) {
		let line = legend.lines[index];
		line.element.childNodes[1].textContent = line.series.name + ' - ' + speed + ' Mbit/s';
	}
}
function updateLegendTotals() {
	if (!legendTotals) {
		return;
	}

	let httpMb = downloadTotals.http / 1048576;
	let p2pMb = downloadTotals.p2p / 1048576;
	let totalMb = httpMb + p2pMb;
	let uploadMb = uploadTotal / 1048576;

	if (totalMb != 0) {
		legendTotals.lines[0].element.childNodes[1].textContent
				= "Download - "
				+ Number(totalMb).toFixed(1) + " MiB";

		legendTotals.lines[1].element.childNodes[1].textContent
				= " - HTTP - "
				+ Number(httpMb).toFixed(1) + " MiB - "
				+ Number((httpMb * 100) / totalMb).toFixed(0) + "%";

		legendTotals.lines[2].element.childNodes[1].textContent
				= " - P2P - "
				+ Number(p2pMb).toFixed(1) + " MiB - "
				+ Number((p2pMb * 100) / totalMb).toFixed(0) + "%";

		legendTotals.lines[3].element.childNodes[1].textContent
				= "Upload P2P - "
				+ Number(uploadMb).toFixed(1) + " MiB";
	}
}
function getDownloadSpeed() {
	let startingPoint = performance.now() - (loadSpeedTimespan * 1000);
	let httpSize = 0;
	let p2pSize = 0;

	let i = downloadStats.length;
	while (i--) {
		let stat = downloadStats[i];
		if (stat.timestamp < startingPoint) {
			break;
		}

		if (stat.method === "p2p") {
			p2pSize += stat.size;
		} else if (stat.method === "http") {
			httpSize += stat.size;
		}
	}

	downloadStats.splice(0, i + 1);

	return {p2p: p2pSize / loadSpeedTimespan, http: httpSize / loadSpeedTimespan};
}
function getUploadSpeed() {
	let startingPoint = performance.now() - (loadSpeedTimespan * 1000);
	let size = 0;

	let i = uploadStats.length;
	while (i--) {
		let stat = uploadStats[i];
		if (stat.timestamp < startingPoint) {
			break;
		}

		size += stat.size;
	}

	uploadStats.splice(0, i + 1);

	return size / loadSpeedTimespan;
}
function onBytesDownloaded(method, peerId, size) {
	downloadStats.push({method: method, size: size, timestamp: performance.now()});
	downloadTotals[method] += size;
}
function onBytesUploaded(method, peerId, size) {
	uploadStats.push({size: size, timestamp: performance.now()});
	uploadTotal += size;
}


// p2p-graph
function initGraph(){
	graph = new window.P2PGraph('#graph')
	graph.add({
		id: 'You',
		me: true,
		name: myLogin || 'Я'
	})
}
function onPeerConnect(peer) {
	if (!graph.hasPeer(peer.id)) {
		graph.add({id: peer.id, name: 'Либрийц'});
		graph.connect("You", peer.id);
	}
}
function onPeerClose(id) {
	if (graph.hasPeer(id)) {
		graph.disconnect("You", id);
		graph.remove(id);
	}
}