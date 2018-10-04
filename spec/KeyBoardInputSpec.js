describe('Keyboard Input suite', function() {
/**
Descripción: Pruebas realizadas sobre las teclas utilizadas en el juego.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/

    var gameEngine;

    beforeEach(function() {
//Para que cada prueba comience con las mismas características, volvemos a lanzar la instancia antes de cada prueba.
        this.gameEngine = GameEngine.getInstance();
        this.gameEngine.leftPaddle.velocityCoordinateY = 0;
        spyOn(this.gameEngine, 'pauseGame');
    });

    it('should apply intention of movement up for left paddle when keystroking letter A/a', function() {
//Esta prueba comprueba que se mueve correctamente hacia arriba la pala izquierda. PAra moverla, se usán la letra a/A.
        var inputLetter = 'A'

        var before = this.gameEngine.leftPaddle.velocityCoordinateY;
        this.gameEngine.processKeyInGame(inputLetter);
        var after = this.gameEngine.leftPaddle.velocityCoordinateY;

        expect(after).toBeLessThan(before);

        inputLetter = 'a'

        var before = this.gameEngine.leftPaddle.velocityCoordinateY;
        this.gameEngine.processKeyInGame(inputLetter);
        var after = this.gameEngine.leftPaddle.velocityCoordinateY;

        expect(after).toBeLessThan(before);
    });

    it('HU-32-CP01: Should display the pause menu when pressing P', function() {
//Comprobamos que al pulsar la p/P se abre el menu de pausa, con los cambios necesarios en el tablero.
      this.gameEngine.processKeyInGame('P');
      expect(this.gameEngine.pauseGame).toHaveBeenCalled();

    });

    it('HU-32-CP01: Should display the pause menu when pressing p', function() {
      this.gameEngine.processKeyInGame('p');
      expect(this.gameEngine.pauseGame).toHaveBeenCalled();

    });
});
