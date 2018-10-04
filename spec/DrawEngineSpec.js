describe('DrawEngine test suite', function() {
/**
Descripción: Comprobamos que se dibujan correctamente el tablero y los componentes del tablero.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
    var gameEngine;

    beforeEach(function() {
//Antes de cada prueba, creamos una nueva instancia del juego para que cada prueba tenga los mismos valores inciales.
        this.gameEngine = GameEngine.getInstance();
    });


    it('should draw a clean board', function() {
//Para pasar la siguiente prueba, debe ser capaz de crear un tablero.
        spyOn(context, 'clearRect').and.callFake(function() {
            expect(arguments[0]).toEqual(0);
            expect(arguments[1]).toEqual(0);
            expect(arguments[2]).toEqual(canvas.width);
            expect(arguments[3]).toEqual(canvas.height);
        });

        this.gameEngine.drawField();

        expect(context.clearRect).toHaveBeenCalled();
    });

    it('should draw the ball', function() {
//Esta prueba comprueba que se crea correctamente la pelota en el tablero.
        spyOn(this.gameEngine.ball, 'draw');

        this.gameEngine.drawField();

        expect(this.gameEngine.ball.draw).toHaveBeenCalled();
    });

    it('should draw the left paddle', function() {
//Esta prueba demuestra que se crea correctamente la pala izquierda en el tablero.
        spyOn(this.gameEngine.leftPaddle, 'draw');

        this.gameEngine.drawField();

        expect(this.gameEngine.leftPaddle.draw).toHaveBeenCalled();
    });

    it('should draw the right paddle', function() {
//Esta prueba demuestra que se crea correctamente la pala derecha en el tablero.
        spyOn(this.gameEngine.rightPaddle, 'draw');

        this.gameEngine.drawField();

        expect(this.gameEngine.rightPaddle.draw).toHaveBeenCalled();
    });

});