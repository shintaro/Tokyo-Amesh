var lastX=3080/2, lastY=1920/2;

function dragOn() {
    drag = true;
    console.log('dragon');
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
}

function dragImg() {
    if(!drag ||  mode == 0) return;

    mapContext.drawImage(largeCanvas,
        lastX + (mouseDownX - event.offsetX)-mapCanvas.width/2,
        lastY + (mouseDownY - event.offsetY)-mapCanvas.height/2,
        mapCanvas.width, mapCanvas.height,
        0,0,mapCanvas.width,mapCanvas.height);

    return false;
}

function dragOff() {
    drag = false;
    lastX += mouseDownX - event.offsetX;
    lastY += mouseDownY - event.offsetY;
}

function sliderHandler() {
	
}

function smaller() {
	if (mode > 0) {
		mode = 0;
	}
	main();
}

function larger() {
	if (mode == 0) {
		mode = 1;
	}
	main();
}
