/**
Descripción: Clase que crea el objeto pala.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
function paddle(coordinateX, coordinateY) {
    this.ancho = 20;
    this.alto = 50;
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
    this.velocityCoordinateY = 0;
    this.fillColor = "white";
}

paddle.prototype = {
    get pos2D() {
//Obtiene la posición de la pala.
        return new Vector2D(this.coordinateX, this.coordinateY);
    },
    move: function() {
//Mueve la pala en el tablero.
        if (this.velocityCoordinateY > 0) {
            if (this.coordinateY + this.alto + 10 < canvas.height) {
                this.coordinateY += this.velocityCoordinateY;
            }
            this.velocityCoordinateY--;
        } else if (this.velocityCoordinateY < 0) {
            if (this.coordinateY - 10 > 0) {
                this.coordinateY += this.velocityCoordinateY;
            }
            this.velocityCoordinateY++;
        }
    },
    draw: function(context) {
//Dibuja la pala en el tablero.
        context.fillStyle = this.fillColor;
        context.fillRect(this.coordinateX, this.coordinateY, this.ancho, this.alto);
    }
}