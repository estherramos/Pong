function ContextMock() {
    this.fillStyle;
}

ContextMock.prototype = {
    beginPath: function() {},
    arc: function(x, y, radius, n1, n2, n3) {},
    closePath: function() {},
    clearRect: function() {},
    fill: function() {},
    fillRect: function() {},
    stroke: function() {},
}