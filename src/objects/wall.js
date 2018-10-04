/**
Descripción: Clase que crea el objeto pared.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
function Wall(coordinateX, coordinateY, canvas) {
    this.ancho = 20;
    this.alto = canvas.height - 20;
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
    this.velocityCoordinateY = 0;
    this.fillColor = "white";
}

Wall.prototype = {
    get pos2D() {
//Devuelve la posición de la pala.
        return new Vector2D(this.coordinateX, this.coordinateY);
    },

    draw: function(context) {
//Dibuja la pared en  el tablero.
        context.fillStyle = this.fillColor;
        context.fillRect(this.coordinateX, this.coordinateY, this.ancho, this.alto);
    }
}