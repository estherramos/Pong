/**
Descripción: Clase que crea el objeto Pelota y le añade atributos.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
// dependencies: Vector2D
function Ball(radius, color) {

    if (typeof(radius) === 'undefined') radius = 20;
    if (typeof(color) === 'undefined') color = '#0000ff';

    this.radius = radius;
    this.color = color;

    this.coordinateX = 0;
    this.coordinateY = 0;
    this.velocityCoordinateX = 0;
    this.velocityCoordinateY = 0;
}
Ball.prototype = {
    get pos2D() {
//Obtiene la posición de la pelota.
        return new Vector2D(this.coordinateX, this.coordinateY);
    },
    set pos2D(pos) {
//almacena la posicion de la pelota.
        this.coordinateX = pos.x;
        this.coordinateY = pos.y;
    },
    get velo2D() {
//Devuelve la velocidad de la pelota.
        return new Vector2D(this.velocityCoordinateX, this.velocityCoordinateY);
    },
    set velo2D(velo) {
//Almacena la velocidad de la pelota.
        this.velocityCoordinateX = velo.x;
        this.velocityCoordinateY = velo.y;
    },

    draw: function(context) {
//Dibuja la pelota en el tablero.
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.coordinateX, this.coordinateY, this.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    },

    move: function() {
//Mueve la pelota por el tablero.
        this.pos2D = this.pos2D.addScaled(this.velo2D, -1);
    }
};