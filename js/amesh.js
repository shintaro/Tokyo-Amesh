var mapSize = {
	small: { width: 770, height: 480 },
	large: { width: 3080, height: 1920 }
}

var meshCounter, meshURLArray;

var meshURLHeader = {
	small: 'http://tokyo-ame.jwa.or.jp/mesh/000/', large: 'http://tokyo-ame.jwa.or.jp/mesh/100/'
}

var mapURL = {
	small: 'http://tokyo-ame.jwa.or.jp/map/map000.jpg', large: 'http://tokyo-ame.jwa.or.jp/map/map100.jpg'
}

var maskURL = {
	small: 'http://tokyo-ame.jwa.or.jp/map/msk000.png', large: 'http://tokyo-ame.jwa.or.jp/map/msk000.png'
}

function getMeshURL(n) {
	return {small: meshURLHeader.small + n + '.gif', large: meshURLHeader.large + n + '.gif'};
}

function getLatestUpdateTime(dt) {
	return new Date((Math.floor(Date.parse(dt)/(5*60000))*5*60000)-2*60000);	
}

function getOffsetTime(dt, offset) {
	return new Date((Math.floor(Date.parse(dt)/(5*60000))*5*60000) - 5*++offset*60000);	
}

function getDateTimeFormat(dt) {
    var name = dt.getFullYear();
    name += ("0" + (dt.getMonth()+1)).slice(-2);
    name += ("0" + dt.getDate()).slice(-2);
    name += ("0" + dt.getHours()).slice(-2);
    name += ("0" + dt.getMinutes()).slice(-2);
	
	return name;
}

function getDateTimeStamp(dt) {
    var name = dt.getFullYear() + '/';
    name += ("0" + (dt.getMonth()+1)).slice(-2) + '/';
    name += ("0" + dt.getDate()).slice(-2) + ' ';
    name += ("0" + dt.getHours()).slice(-2) + ':';
    name += ("0" + dt.getMinutes()).slice(-2);
	
	return name;
}

function getMeshImages(dt) {
	meshCounter = 0;
	meshURLArray = new Array(24);
	for (var i = 0; i < 24; i++) {
		meshURLArray[i] = getMeshURL(getDateTimeFormat(getOffsetTime(dt, i)));
	}
	storeMeshImages(dt);
}

function storeMeshImages(dt) {
	console.log(meshURLArray[meshCounter].small);
	var downloadRequest = new tizen.DownloadRequest(meshURLArray[meshCounter].small, "downloads");
	downloadId = tizen.download.start(downloadRequest, listener);	
}

var listener = 
{
   onprogress: function(id, receivedSize, totalSize) 
   {
      console.log('Received with id: ' + id + ', ' + receivedSize + '/' + totalSize);
   },

   onpaused: function(id) 
   {
      console.log('Paused with id: ' + id);
   },

   oncanceled: function(id) 
   {
      console.log('Canceled with id: ' + id);
   },

   oncompleted: function(id, fullPath) 
   {
      console.log('Completed with id: ' + id + ', full path: ' + fullPath);
      if (meshCounter < 24) {
    	  meshCounter++;
    	  storeMeshImages(new Date());
      }
   },

   onfailed: function(id, error) 
   {
      console.log('Failed with id: ' + id + ', error name: ' + error.name);
   }
};

