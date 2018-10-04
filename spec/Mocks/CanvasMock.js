function CanvasMock() {
    this.width = "600"
    this.height = "300";
	  this.idContainer="canvasMock";
    this.canvasElement = this.init();
}
CanvasMock.prototype.init = function() {
    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = this.width;
    canvas.height = this.height;
    return canvas;
}
CanvasMock.prototype.draw = function() {
		document.getElementById(this.idContainer).appendChild(this.canvasElement);
}
CanvasMock.prototype.delete = function() {
		document.getElementById(this.idContainer).removeChild(this.canvasElement);
}
