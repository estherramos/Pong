/**
Descripción: Clase utilizada para generar el juego en modo jugador vs jugador.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
function GameEngine() {
    this.ball;
    this.leftPaddle;
    this.rightPaddle;
    this.counter1 = 0;
    this.counter2 = 0;
    this.random = Math.random();
    this.timeoutId;
    this.game=false;
    this.lado = false;
    this.numeroPartidas = 21;

}
GameEngine.prototype = {
//Creamos las funciones necesarias para que el juego funcione correctamente.
    setupBall: function(color, pos, velo, radius) {
/**Para configurar la pelota, utilizamos la funcion setupBall.
La función crea una nueva pelota y le asigna una posición en el tablero y una velocidad.
*/
        this.ball = new Ball(radius, color);
        this.ball.pos2D = pos;
        this.ball.velo2D = velo;
    },
     pauseGame: function(player) {
/**La función PauseGame guarda en variables temporales las variables que utiliza la pelota para
 configurar la velocidad y los modifica a cero. Además, muestra el menú de pausa en pantalla.
 La función además distingue entre la pausa del Jugador 1 y la Pausa del Jugador 2.
 */
        if (player == true) {
             if (idPausaP1.style.visibility == 'visible') {
                 idPausaP1.style.visibility = 'hidden';
                 idPausaP2.style.visibility = 'hidden';
                this.ball.velocityCoordinateX = this.previoX;
                this.ball.velocityCoordinateY = this.previoY;
            }
            else {
                this.previoX = this.ball.velocityCoordinateX;
                this.previoY = this.ball.velocityCoordinateY;
                idPausaP1.style.visibility = 'visible';
                this.ball.velocityCoordinateX = 0;
                this.ball.velocityCoordinateY = 0;
            }
        }
        else {
            if (idPausaP2.style.visibility == 'visible') {
                idPausaP2.style.visibility = 'hidden';
                idPausaP1.style.visibility = 'hidden';
                this.ball.velocityCoordinateX = this.previoX;
                this.ball.velocityCoordinateY = this.previoY;
            }
            else {
                this.previoX = this.ball.velocityCoordinateX;
                this.previoY = this.ball.velocityCoordinateY;
                idPausaP2.style.visibility = 'visible';
                this.ball.velocityCoordinateX = 0;
                this.ball.velocityCoordinateY = 0;
            }
        }

    },
    initGame: function() {
//Mostramos en el HTML el marcador del juego, para ello guardamos en las variables el contador utilizada en
//el código JavaScript.
        idBolas1.innerHTML = this.counter1;
        idBolas2.innerHTML = this.counter2;
        this.leftPaddle = new paddle(50, 100);
        this.rightPaddle = new paddle(canvas.width - 50, 100);
        this.setupBall("#ffffff", new Vector2D(canvas.width / 2, canvas.height / 2), new Vector2D(2, 0), 15);
    },
    stopGame: function() {
//Función que pausa el Juego.
        clearInterval(this.timeoutId);
    },
    drawField: function() {
/** 
Dibujamos el tablero, las palas y la pelota.
 */
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.leftPaddle.draw(context);
        this.rightPaddle.draw(context);
        this.ball.draw(context);
    },
    animFrame: function() {
//Llamamos a la función onEachStep.
        this.timeoutId = setInterval(function() {
            GameEngine.getInstance().onEachStep();
        }, 1000 / 60);
    },
    checkForCollision: function() {
//Función que comprueba si la pelota choca con la pala izquierda o derecha. Para reutilizar el código
//Se han unificado las funciones que comprobaban por separado que la pala izquierda o derecha chocaban con la pelota.
        this.checkForCollisionpaddle(this.leftPaddle, true);
        this.checkForCollisionpaddle(this.rightPaddle, false);
    },
    checkForCollisionpaddle: function(paddle, isLeft) {
//Creamos variables auxiliares que nos ayuden a comprobar la colisión de la pelota con la pala.
        var ball = this.ball;
//Comprobamos la colisión con las palas. Para ello comprobamos el parámetro de entrada "isLeft".
//En el caso de que sea la pala izquierda, restamos a la coordenada X de la pelota el radio.
//En el caso de que sea la pala derecha, no realizamos ninguna resta.
        var xpaddle = paddle.coordinateX + (isLeft ? paddle.ancho : 0);
        var xBall = ball.coordinateX + (isLeft ? -ball.radius : ball.radius);
        var y0paddle = paddle.coordinateY;
        var y1paddle = paddle.coordinateY + paddle.alto;
        var y0 = paddle.coordinateY - ball.radius;
        var y1 = paddle.coordinateY + paddle.alto + ball.radius;

        if ((xpaddle >= xBall && isLeft) || (xpaddle <= xBall && !isLeft)) {
//Comprobamos que la pelota se encuentra en rango con la pala y si se da el caso, cambia la dirección.
            if (ball.coordinateY > y0 && ball.coordinateY < y1) {
                ball.velocityCoordinateX *= -1;
                if (ball.coordinateY > y0paddle && ball.coordinateY < y1paddle) {
                    ball.velocityCoordinateY += paddle.velocityCoordinateY;
                } else if (ball.coordinateY < y0paddle) {
                    var incrVY = (y0paddle - ball.coordinateY) % 3 + 1;
                    ball.velocityCoordinateY += paddle.velocityCoordinateY - incrVY;
                } else if (ball.coordinateY > y1paddle) {
                    var incrVY = (ball.coordinateY - y0paddle) % 3 + 1;
                    ball.velocityCoordinateY += paddle.velocityCoordinateY + incrVY;
                }
            }
        }
    },
    moveBall: function() {
//Realizamos un saque aleatorio, para ello creamos una variable que obtiene un número aleatorio.
//En el caso de que el número (que va del 0 al 1) sea menor de 0.5, la pelota irá dirección izquierda.
//Si no obtiene esos valores, la pelota irá dirección derecha.
//Además, dibujará la pelota.
        if (this.random < 0.5) {
            this.ball.pos2D = this.ball.pos2D.addScaled(this.ball.velo2D, -1);
        }
        else { 
            this.ball.pos2D = this.ball.pos2D.addScaled(this.ball.velo2D, 1); 
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.ball.draw(context);
    },
    moveElements: function() {
//Llamamos a las funciones necesarias para mover las palas y la pelota.
        this.rightPaddle.move();
        this.leftPaddle.move();
        this.moveBall();
    },
    ballIsOutside: function() {
//Comprobamos que la pelota no se encuentra fuera del tablero.
//Para ello utilizamos una variable temporal llamada "outside".
//Si la pelota se encuentra fuera del tablero, cambiamos la variable.
        var ball = this.ball;
        var outside = false;
        if (ball.coordinateX > canvas.init().width + ball.radius * 2) {
            outside = true;
            this.lado = false;
        } else if (ball.coordinateX + ball.radius < 0) {
            outside = true;
            this.lado = true;
        } else if (ball.coordinateY - ball.radius < 0) {
//La variable solo se cambia cuando sale por la izquierda o por la derecha,
//En el caso de que choque arriba o abajo, solo se modifica el valor de la velocidad
//en la coordenada Y a su valor contrario.
            ball.velocityCoordinateY *= -1;
        } else if (ball.coordinateY + ball.radius > canvas.init().height) {
            ball.velocityCoordinateY *= -1;
        }
        return outside;
    },
    onEachStep: function() {
//A cada paso se comprueba que la pelota no esté fuera.
//En caso de estar fuera, se comienza un nuevo punto.
        if (this.ballIsOutside()) {
            this.newMatch();
        } else {
//Si la pelota no está fuera, llama a las funciones que
//Comprueban si la pelota colisiona con las palas y las 
//funciones que mueven los elementos y dibuja el tablero.
            this.checkForCollision();
            this.moveElements();
            this.drawField();
        }
    },
    newMatch: function() {
//Cada vez que comienza una nueva partida, se para el juego
//y se comienza uno nuevo.
        this.stopGame();
        this.startNewGame(true);
    },
    processKeyInGame: function(k) {
//Función que recoge los datos enviados mediante el teclado
//Y los utiliza para sus correspondientes funciones.
        var shouldStart = (k == "S" || k == "s");
        var moveUpLeftpaddle = (k == "a" || k == "A");
        var moveDownLeftpaddle = (k == "z" || k == "Z");
        var moveUpRightpaddle = (k == "k" || k == "K");
        var moveDownRightpaddle = (k == "m" || k == "M");
        var pausar2 = (k == "p" || k == "P");
        var pausar1 = (k == "q" || k == "Q");
        if ((shouldStart) && this.game==false) {
//En el caso de que se utilice la tecla s/S, se realiza el saque
//y comienza a funcionar el juego.
            this.game=true;
            this.animFrame();
        }
        else if (pausar1) {
//Si se utiliza la tecla q/Q el jugador 1 realiza la pausa.
            this.pauseGame (true);
        }
        else if (pausar2) {
//Si se utiliza la tecla p/P el jugador 2 realiza la pausa.
            this.pauseGame (false);
        }
        else {
            if (moveUpLeftpaddle) {
//Si se utiliza la tecla a/A, se mueve la pala izquierda hacia arriba.
                this.leftPaddle.velocityCoordinateY += -3;
            } else if (moveDownLeftpaddle) {
//Si se utiliza la tecla z/Z, se mueve la pala izquierda hacia abajo.
                this.leftPaddle.velocityCoordinateY += +3;
            }
            if (moveUpRightpaddle) {
//Si se utiliza la tecla k/K, se mueve la pala derecha hacia arriba.
                this.rightPaddle.velocityCoordinateY += -3;
            } else if (moveDownRightpaddle) {
//Si se utiliza la tecla m/M, se mueve la pala derecha hacia abajo.
                this.rightPaddle.velocityCoordinateY += +3;
            }
        }
    },
    gameOver: function(){
//Función que muestra por pantalla la imagen "Game Over" cuando se acaba el juego.
        if (this.counter1 > this.counter2) {
            gameOver1.style.visibility = 'visible';
        }
        else {
            gameOver2.style.visibility = 'visible';
        }
    },
    startNewGame: function(rematch) {
//Función que comienza un nuevo punto.
        this.numeroPartidas = counternumber;
        if (this.lado == false ) {
//En el caso de que no sea una nueva partida, se incrementa en uno el valor
//Del contador del jugador 1.
            if (rematch){
                this.counter1++
            }
            else {
//Sino se inicializa a cero las variables contador Jugador 1 y Jugador 2.
                this.counter1 = 0;
                this.counter2 = 0;
            }
            if (this.numeroPartidas > this.counter1) {
//En el caso de que ninguno de los contadores haya igualado los puntos elegidos para jugar,
//Se siguen iniciando las partidas.
                this.initGame();
                this.drawField();
                if (rematch) {
                    setTimeout(function() {
                        GameEngine.getInstance().animFrame();
                    }, 1000);
                }
            }
            else {
//Si el contador ya ha llegado al máximo de puntos jugables, se llama a la funcion gameOver.
                this.initGame();
                this.drawField();
                this.gameOver();
            }
        }
        else {
//Aumentamos el contador del Jugador 2 si ha ganado el anterior punto.
            rematch ? this.counter2++ : this.counter2 = 0;
             if (this.numeroPartidas > this.counter2) {
//En el caso de que ninguno de los contadores haya igualado los puntos elegidos para jugar,
//Se siguen iniciando las partidas.
                this.initGame();
                this.drawField();
                //wait for starting new match
                if (rematch) {
                    setTimeout(function() {
                        GameEngine.getInstance().animFrame();
                    }, 1000);
                }
             }
             else {
//Si el contador ya ha llegado al máximo de puntos jugables, se llama a la funcion gameOver.
                this.initGame();
                this.drawField();
                this.gameOver();
             }
        }
    },
}


GameEngine.getInstance = function() {
//Definimos y creamos la instancia.
    if (typeof(GameEngine.instance) === 'undefined') {
        GameEngine.instance = new GameEngine();
        GameEngine.instance.startNewGame(false);
        return GameEngine.instance;
    }
    return GameEngine.instance;
}
