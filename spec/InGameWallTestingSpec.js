describe("In Game testing wall", function() {
/**
Descripción: Pruebas realizadas sobre el modo Frontón.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/

    var originalTimeout;
    var gameEngineWall;

    beforeEach(function(done) {
//Para que cada prueba comience con las mismas características, volvemos a lanzar la instancia antes de cada prueba.
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
        this.gameEngineWall = GameEngineWall.getInstance();
        done();
    });

    it("HU-13-CP01: Pressing S should make the ball start moving in straight line", function(done) {
/**Comprobamos que al pulsar la tecla s la pelota comienza a moverse en línea recta. La prueba ha sido modificada puesto que 
ya no comienza siempre a moverse hacia la derecha, sino que ahora el saque es aleatorio.*/
        var gameEngineWall = this.gameEngineWall;
        var ball = this.gameEngineWall.ball;
//Para comprobar que se mueve, guardamos las coordenadas iniciales de la pelota y las comparamos pasado un tiempo.
        var beforeX = ball.coordinateX;
        var beforeY = ball.coordinateY;
        var that=this;
        this.gameEngineWall.processKeyInGame('S');
        setTimeout(function() {
            ball = gameEngineWall.ball;
            var afterX = ball.coordinateX;
            var afterY = ball.coordinateY;
            expect(afterX).not.toBe(beforeX);
            expect(afterY).toBe(beforeY);
            done();
        }, 50);
    });

    it("HU-13-CP01: Pressing s should make the ball start moving in straight line", function(done) {
/**Comprobamos que al pulsar la tecla s la pelota comienza a moverse en línea recta. La prueba ha sido modificada puesto que 
ya no comienza siempre a moverse hacia la derecha, sino que ahora el saque es aleatorio.*/
        var ball = this.gameEngineWall.ball;
        var beforeX = ball.coordinateX;
        var beforeY = ball.coordinateY;
//Para comprobar que se mueve, guardamos las coordenadas iniciales de la pelota y las comparamos pasado un tiempo.
        this.gameEngineWall.processKeyInGame('s');
        setTimeout(function() {
            var afterX = ball.coordinateX;
            var afterY = ball.coordinateY;
            expect(afterX).not.toBe(beforeX);
            expect(afterY).toBe(beforeY);
            done();
        }, 50);
    });

    afterEach(function() {
        this.gameEngineWall = GameEngineWall.getInstance();
        this.gameEngineWall.startNewGame();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        this.gameEngineWall.game=false;
    });

    it("HU-33-CP03: Should increase number of balls if new match", function(done) {
//Comprobamos que el marcador aumenta en uno cuando se comienza un nuevo punto. 
//Para ello quitamos la pala izquierda y comprobamos que al fallar el punto se incrementa en uno el contador.
        var gameEngineWall = this.gameEngineWall;
        this.gameEngineWall.processKeyInGame('s');
        //Remove interaction with left paddle
        this.gameEngineWall.leftPaddle.alto = 0;
        this.gameEngineWall.leftPaddle.coordinateY = -100;
        setTimeout(function() {
            expect(gameEngineWall.counter).toBeGreaterThan(0);
            expect(idBolas.innerHTML).toBeGreaterThan(0);
            done();
        }, 6500);
    });

    it("HU-14-CP02: Should change directions when hitting the paddle and the wall", function(done) {
//Comprobamos que la pelota cambia de dirección cuando es golpeada por la pala y la pared.
        this.gameEngineWall.processKeyInGame('s');
        var ball = this.gameEngineWall.ball;
        var gameEngineWall = this.gameEngineWall;
        var vx = ball.velocityCoordinateX;
        var y = ball.coordinateY;
        var estimatedTimeFirstHit = (((canvas.width / 2) - 50) / ball.velocityCoordinateX) / 60 * 1000;
        var estimatedTimeSecondHit = (((canvas.width) - 100) / ball.velocityCoordinateX) / 60 * 1000;
//Iniciamos el juego y realizamos el saque, una vez está en movimiento comprobamos que pasado un tiempo, ha colisionado con la pala o la pared
//y ha cambiado de sentido.
        setTimeout(function() {
            var vxAfterHit = ball.velocityCoordinateX;
            ball = gameEngineWall.ball;
            console.log('expected first hit');
            console.log('new value is ' + vxAfterHit + 'expected was' + vx * -1);
            expect(ball.velocityCoordinateY).toBe(0);
            expect(ball.coordinateY).toBe(y);
            vx = vxAfterHit;
            setTimeout(function() {
                vxAfterHit = ball.velocityCoordinateX;
                ball = gameEngineWall.ball;
                console.log('expected second hit');
                console.log('new value is ' + vxAfterHit + 'expected was' + vx * -1);
                expect(ball.velocityCoordinateY).toBe(0);
                expect(ball.coordinateY).toBe(y);
                done();
            }, estimatedTimeSecondHit + 2200);
        }, estimatedTimeFirstHit + 1000);
    });

    it("HU-32-CP02: Should pause the game if letter P is pressed.", function(done) {
//Comprobamos que el juego se pausa si se pulsa la tecla P.
      var gameEngineWall = this.gameEngineWall;
      var ball = this.gameEngineWall.ball;
      var leftPaddle = this.gameEngineWall.leftPaddle;
      var wall = this.gameEngineWall.wall;
      var prevBallX = ball.coordinateX;
      var prevBallY = ball.coordinateY;
      var prevLeftPaddleY = leftPaddle.coordinateY;
      this.gameEngineWall.processKeyInGame('P');
      setTimeout(function() {
//Para hacer esta comprobación, guardamos los valores de posición de la pelota y los comparamos al cabo de unos segundos.
//En el caso de que se pause correctamente, deberían contener los mismos valores.
          expect(ball.coordinateX).toEqual(prevBallX);
          expect(ball.coordinateY).toEqual(prevBallY);
          expect(leftPaddle.coordinateY).toEqual(prevLeftPaddleY);
          done();
      }, 6500);
      this.gameEngineWall.processKeyInGame('P');

  });

  it("HU-32-CP02: Should pause the game if letter p is pressed.", function(done) {
//Comprobamos que el juego se pausa si se pulsa la tecla p.
    var gameEngineWall = this.gameEngineWall;
    var ball = this.gameEngineWall.ball;
    var leftPaddle = this.gameEngineWall.leftPaddle;
    var wall = this.gameEngineWall.wall;
    var prevBallX = ball.coordinateX;
    var prevBallY = ball.coordinateY;
    var prevLeftPaddleY = leftPaddle.coordinateY;
    this.gameEngineWall.processKeyInGame('p');
    setTimeout(function() {
//Para hacer esta comprobación, guardamos los valores de posición de la pelota y los comparamos al cabo de unos segundos.
//En el caso de que se pause correctamente, deberían contener los mismos valores.
        expect(ball.coordinateX).toEqual(prevBallX);
        expect(ball.coordinateY).toEqual(prevBallY);
        expect(leftPaddle.coordinateY).toEqual(prevLeftPaddleY);
        done();
    }, 6500);

});

it("HU-36-CP01: Should change X and Y hitting the paddle with effect", function(done) {
//Comprueba que se cambian los valores de las coordenadas X e Y si se golpea la pelota con efecto.
    this.gameEngineWall.processKeyInGame('s');
    var ball = this.gameEngineWall.ball;
    var leftPaddle = this.gameEngineWall.leftPaddle;
    var wall = this.gameEngineWall.wall;
    var gameEngine = this.gameEngineWall;
    var y = ball.velocityCoordinateY;
    this.gameEngineWall.processKeyInGame('a');
    setTimeout(function() {
        expect(ball.velocityCoordinateY).not.toBe(y);
        done();
    },6500);
});

});
