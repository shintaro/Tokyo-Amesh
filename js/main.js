var mapCanvas, mapContext, largeCanvas, largeContext, mapArea;
var laryerArray, imageSrcArray, loadedCounter;
var mode, drag;

function getLatestTime(dt) {
	return new Date(Math.floor((Date.parse(dt)-(3*60000))/(5*60000))*5*60000);
}

function getTimerVal(dt) {
	return Math.floor((Date.parse(dt)-(3*60000))/(5*60000))*5*60000 + 480000 - Date.parse(dt);
}

function computeDateTimeByMin(dt, min) {
    return new Date(Date.parse(dt)+60000*min);
}


function resize() {
	document.getElementById('mapArea').style.width = window.innerWidth + 'px';
	document.getElementById('mapArea').style.height = 
		Math.round(window.innerWidth * mapSize.small.height / mapSize.small.width) + 'px';
    mapCanvas.width = window.innerWidth;
    mapCanvas.height = Math.round(window.innerWidth * mapSize.small.height / mapSize.small.width);
    
    draw();
}

function setDateStamp(dt) {
	document.getElementById('date').innerText = getDateTimeStamp(dt);
}

function draw() {
	layerArray = new Array(0);
	imageSrcArray = new Array(3);
	if (mode > 0) {
		imageSrcArray[0] = './img/map100.jpg';
		imageSrcArray[2] = './img/msk100.png';		
	} else {
		imageSrcArray[0] = './img/map000.jpg';
		imageSrcArray[2] = './img/msk000.png';		
	}
//	imageSrcArray[1] = getMeshURL(getLatestUpdateTime(new Date())).small;
//	imageSrcArray[0] = 'http://tokyo-ame.jwa.or.jp/map/map000.jpg';
//	imageSrcArray[1] = 'http://tokyo-ame.jwa.or.jp/mesh/000/201304151830.gif';
	imageSrcArray[1] = './img/201304151640.gif';

	loadedCounter = 0;
	loadImages();
}

function loadImages() {
	console.log('loadImages is called');	
    tempImage = new Image();
    tempImage.addEventListener('load', function() {
    	console.log("loaded");
    	loadedCounter++;
		layerArray.push(tempImage);
		if (imageSrcArray.length == loadedCounter) {
			drawImages();
		} else {
			loadImages();
		}
	}, false);
    tempImage.src = imageSrcArray[layerArray.length];
    console.log('loading:' + imageSrcArray[layerArray.length]);
}

function drawImages() {
	console.log('drawImages is called');
    if (mode > 0) {
        for (var i = 0; i < 3; i++) {
            largeContext.drawImage(layerArray[i],0,0);
            layerArray[i] = null;
        }
        mapContext.drawImage(largeCanvas, 3080/2-mapCanvas.width/2, 1920/2-mapCanvas.height/2,
            mapCanvas.width, mapCanvas.height,0,0,mapCanvas.width,mapCanvas.height);
    } else {
        for (var i = 0; i < 3; i++) {
            mapContext.drawImage(layerArray[i], 0, 0, mapCanvas.width, mapCanvas.height);
            layerArray[i] = null;
        }        
    }
}

function main() {
	resize();
	
    getMeshImages(new Date());
}

var init = function () {
    document.getElementById('mapArea').addEventListener('mousedown', dragOn, false);
    document.getElementById('mapArea').addEventListener('mousemove', dragImg, false);
    document.getElementById('mapArea').addEventListener('mouseup', dragOff, false);
    document.getElementById('mapArea').addEventListener('mouseout', dragOff, false);
    document.getElementById('slider').addEventListener('change', sliderHandler, false);
    document.getElementById('small').addEventListener('click', smaller, false);
    document.getElementById('large').addEventListener('click', larger, false);

    mapCanvas = document.getElementById('canvas');
    mapContext = mapCanvas.getContext('2d');
    largeCanvas = document.createElement('canvas');
    largeContext = largeCanvas.getContext('2d');
    largeCanvas.width = mapSize.large.width;
    largeCanvas.height = mapSize.large.height;
    
    mode = 0; drag = 0;
    main();
};
$(document).ready(init);

window.addEventListener('resize', function() {
    clearTimeout( queue );
    queue = setTimeout(function() {
        console.log('Resize');
        main();
    }, wait );
}, false );
