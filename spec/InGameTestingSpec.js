describe("In Game testing", function() {
/**
Descripción: Pruebas sobre el modo jugador contra jugador.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/

    var originalTimeout;
    var gameEngine;

    beforeEach(function(done) {
//Antes de cada prueba, volvemos a crear una instancia.
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
        this.gameEngine = GameEngine.getInstance();
        done();
    });

    it("HU-13-CP01: Pressing S should make the ball start moving in straight line", function(done) {
/** 
Comprobamos que se comienza a mover la bola cuando utilizas la tecla S. Esta prueba ha sido modificada 
porque el saque ahora es aleatorio, así que comprobamos que las coordenadas iniciales de la pelota no sean 
las mismas pasadas un tiempo.
 */
        var gameEngine = this.gameEngine;
        var ball = this.gameEngine.ball;
        var beforeX = ball.coordinateX;
        var beforeY = ball.coordinateY;
        var that=this;
        this.gameEngine.processKeyInGame('S');
        setTimeout(function() {
            ball = gameEngine.ball;
            var afterX = ball.coordinateX;
            var afterY = ball.coordinateY;
            expect(afterX).not.toBe(beforeX);
            expect(afterY).toBe(beforeY);
            done();
        }, 50);
    });

    it("HU-13-CP01: Pressing s should make the ball start moving in straight line", function(done) {
/** 
Comprobamos que se comienza a mover la bola cuando utilizas la tecla s. Esta prueba ha sido modificada 
porque el saque ahora es aleatorio, así que comprobamos que las coordenadas iniciales de la pelota no sean 
las mismas pasadas un tiempo.
 */
        var ball = this.gameEngine.ball;
        var beforeX = ball.coordinateX;
        var beforeY = ball.coordinateY;
        this.gameEngine.processKeyInGame('s');
        setTimeout(function() {
            var afterX = ball.coordinateX;
            var afterY = ball.coordinateY;
            expect(afterX).not.toBe(beforeX);
            expect(afterY).toBe(beforeY);
            done();
        }, 50);
    });

    afterEach(function() {
        this.gameEngine = GameEngine.getInstance();
        this.gameEngine.startNewGame();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        this.gameEngine.game=false;
    });

    /*it("HU-33-CP03: Should increase number of balls if new match", function(done) {
        var gameEngine = this.gameEngine;
        this.gameEngine.processKeyInGame('s');

        //Remove interaction with right paddle
        this.gameEngine.rightPaddle.alto = 0;
        this.gameEngine.rightPaddle.coordinateY = -100;

        setTimeout(function() {
            expect(gameEngine.contaBolas).toBeGreaterThan(1);
            expect(idBolas.innerHTML).toBeGreaterThan(1);
            done();
        }, 6500);
    });*/

    it("HU-35-CP01: Should change directions when hitting the paddle in initial state, must be in a straight line", function(done) {
/**
Comprobamos que la pelota cambia de dirección cuando es golpeada por una pala. Para la prueba, guardamos los valores iniciales
de la pelota y comprobamos las coordenadas pasado un tiempo.
 */
        this.gameEngine.processKeyInGame('s');
        var ball = this.gameEngine.ball;
        var gameEngine = this.gameEngine;
        var vx = ball.velocityCoordinateX;
        var y = ball.coordinateY;
        var estimatedTimeFirstHit = (((canvas.width / 2) - 50) / ball.velocityCoordinateX) / 60 * 1000;
        var estimatedTimeSecondHit = (((canvas.width) - 100) / ball.velocityCoordinateX) / 60 * 1000;
        setTimeout(function() {
            var vxAfterHit = ball.velocityCoordinateX;
            ball = gameEngine.ball;
            console.log('expected first hit');
            console.log('new value is ' + vxAfterHit + 'expected was' + vx * -1);
            expect(ball.velocityCoordinateY).toBe(0);
            expect(ball.coordinateY).toBe(y);
            vx = vxAfterHit;
            setTimeout(function() {
                vxAfterHit = ball.velocityCoordinateX;
                ball = gameEngine.ball;
                console.log('expected second hit');
                console.log('new value is ' + vxAfterHit + 'expected was' + vx * -1);
                expect(ball.velocityCoordinateY).toBe(0);
                expect(ball.coordinateY).toBe(y);
                done();
            }, estimatedTimeSecondHit + 2200);
        }, estimatedTimeFirstHit + 1000);
    });

    it("HU-32-CP02: Should pause the game if letter P is pressed.", function(done) {
//Comprobamos que el juego se pausa si se utiliza la tecla P.
      var gameEngine = this.gameEngine;
      var ball = this.gameEngine.ball;
      var leftPaddle = this.gameEngine.leftPaddle;
      var rightPaddle = this.gameEngine.rightPaddle;
      var prevBallX = ball.coordinateX;
      var prevBallY = ball.coordinateY;
      var prevLeftPaddleY = leftPaddle.coordinateY;
      var prevRightPaddleY= rightPaddle.coordinateY;
      this.gameEngine.processKeyInGame('P');
      setTimeout(function() {
          expect(ball.coordinateX).not.toBe(prevBallX);
          expect(ball.coordinateY).toEqual(prevBallY);
          expect(leftPaddle.coordinateY).toEqual(prevLeftPaddleY);
          expect(rightPaddle.coordinateY).toEqual(prevRightPaddleY);
          done();
      }, 6500);
      this.gameEngine.processKeyInGame('P');
  });

  it("HU-32-CP02: Should pause the game if letter p is pressed.", function(done) {
//Comprobamos que el juego se pausa si se utiliza la tecla p.
    var gameEngine = this.gameEngine;
    var ball = this.gameEngine.ball;
    var leftPaddle = this.gameEngine.leftPaddle;
    var rightPaddle = this.gameEngine.rightPaddle;
    var prevBallX = ball.coordinateX;
    var prevBallY = ball.coordinateY;
    var prevLeftPaddleY = leftPaddle.coordinateY;
    var prevRightPaddleY= rightPaddle.coordinateY;
    this.gameEngine.processKeyInGame('p');
    setTimeout(function() {
        expect(ball.coordinateX).toEqual(prevBallX);
        expect(ball.coordinateY).toEqual(prevBallY);
        expect(leftPaddle.coordinateY).toEqual(prevLeftPaddleY);
        expect(rightPaddle.coordinateY).toEqual(prevRightPaddleY);
        done();
    }, 6500);
});

it("HU-36-CP01: Should change X and Y hitting any paddle with effect", function(done) {
//Comprobamos que se cambian las coordenadas iniciales cuando la pelota es golpeada con efecto por una pala.
    this.gameEngine.processKeyInGame('s');
    var ball = this.gameEngine.ball;
    var leftPaddle = this.gameEngine.leftPaddle;
    var rightPaddle = this.gameEngine.rightPaddle;
    var gameEngine = this.gameEngine;
    var y = ball.velocityCoordinateY;
    this.gameEngine.processKeyInGame('a');
    this.gameEngine.processKeyInGame('k');
    setTimeout(function() {
        expect(ball.velocityCoordinateY).not.toBe(y);
        done();
    },6500);
});

});
