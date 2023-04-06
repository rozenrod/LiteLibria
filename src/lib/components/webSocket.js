// Запуск WebSocket
function WebSocketStatusEpisode(){
  socket = new WebSocket("wss://api.anilibria.tv/v3.0/ws/");

  socket.onopen = function(e) {
    if(styleDebug) console.log("[WebSocket | open] Соединение установлено");
  };

  socket.onmessage = function(event) {
    var data = JSON.parse(event.data)

    if(styleDebug) console.log("[WebSocket | data] " + JSON.stringify(data));

    if(data['type'] == 'encode_start'){
      if(styleDebug) console.log("[WebSocket | encode_start] " + JSON.stringify(data['data']));
			LoadWSStatusEpisode(data['data'], 'encode');
    }

		if(data['type'] == 'encode_progress'){
      if(styleDebug) console.log("[WebSocket | encode_progress] " + JSON.stringify(data['data']));
			LoadWSStatusEpisode(data['data'], 'encode');
    }

		if(data['type'] == 'encode_finish'){
      if(styleDebug) console.log("[WebSocket | encode_finish] " + JSON.stringify(data['data']));
			LoadWSStatusEpisode(data['data'], 'finish');
    }
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[WebSocket | close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      console.log('[WebSocket | close] Соединение прервано');
    }
  };

  socket.onerror = function(error) {
    console.log(`[WebSocket | error]`);
  };
}

// Изменение состояния релизов из сообщения WebSocket
function LoadWSStatusEpisode(data, status){
  if(StatusEpisode.length > 0){

    var indexEpisode = StatusEpisode.filter(function(items) {
      return items.id == data.id;
    });
    if(StatusEpisode.indexOf(indexEpisode[0]) > -1){
      StatusEpisode.splice(StatusEpisode.indexOf(indexEpisode[0]), 1)
      data['status'] = status;
      StatusEpisode.push(data);
    } else {
      data['status'] = status;
      StatusEpisode.push(data);
    }
  } else {
    StatusEpisode = [data];
  }
  GeneratorStatusEpisode();
}