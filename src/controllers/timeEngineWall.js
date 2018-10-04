/**
Descripción: Clase utilizada para generar el juego en modo Frontón de Entrenamiento.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
function GameEngineWall() {
    this.ball;
    this.leftPaddle;
    this.wall;
    this.counter;
    this.velocity;
    this.timeoutId;
    this.previoX = 0;
    this.previoY = 0;
    this.radius = 20;
    this.game= false;
    this.numeroPartidas = 21;
    this.velocityBall=2;
}

GameEngineWall.prototype = {
//Creamos las funciones necesarias para que el juego funcione correctamente.
    setupBall: function(color, pos, velo, radius) {
/**Para configurar la pelota, utilizamos la funcion setupBall.
La función crea una nueva pelota y le asigna una posición en el tablero y una velocidad.
*/
        this.ball = new Ball(radius, color);
        this.ball.pos2D = pos;
        this.ball.velo2D = velo;
    },
    pauseGame: function() {
/**La función PauseGame guarda en variables temporales las variables que utiliza la pelota para
 configurar la velocidad y los modifica a cero. Además, muestra el menú de pausa en pantalla.
 */
        if (idPausa.style.visibility == 'visible') {
            idPausa.style.visibility = 'hidden';
            this.ball.velocityCoordinateX = this.previoX;
            this.ball.velocityCoordinateY = this.previoY;
        }
        else {
            this.previoX = this.ball.velocityCoordinateX;
            this.previoY = this.ball.velocityCoordinateY;
            idPausa.style.visibility = 'visible';
            this.ball.velocityCoordinateX = 0;
            this.ball.velocityCoordinateY = 0;
        }
    },
    initGame: function() {
//Mostramos en el HTML el marcador del juego, para ello guardamos en las variables el contador utilizada en
//el código JavaScript.
        this.radius=radiusBall;
        this.velocityBall=velocityBall;
        idBolas.innerHTML = this.counter;
        this.leftPaddle = new paddle(50, 100);
        this.wall = new Wall(canvas.width - 50, 10, canvas);
        this.velocity = new Vector2D(this.velocityBall,0);
        this.setupBall("#ffffff", new Vector2D(canvas.width / 2, canvas.height / 2), this.velocity, this.radius);
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
        this.wall.draw(context);
        this.ball.draw(context);
    },
    animFrame: function() {
//Llamamos a la función onEachStep.
        this.timeoutId = setInterval(function() {
            GameEngineWall.getInstance().onEachStep();
        }, 1000 / 60);
    },
    checkForCollision: function() {
//Función que comprueba si la pelota choca con la pala izquierda o la pared. Para reutilizar el código
//Se han unificado las funciones que comprobaban por separado que la pala izquierda o derecha chocaban con la pelota.
        this.checkForCollisionpaddle(this.leftPaddle, true);
        this.checkForCollisionpaddle(this.wall, false);
    },
    checkForCollisionpaddle: function(paddle, isLeft) {
//Creamos variables auxiliares que nos ayuden a comprobar la colisión de la pelota con la pala.
        var ball = this.ball;
//Comprobamos la colisión con las palas. Para ello comprobamos el parámetro de entrada "isLeft".
//En el caso de que sea la pala izquierda, restamos a la coordenada X de la pelota el radio.
//En el caso de que sea la pared situada a la derecha, no realizamos ninguna resta.
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
    moveElements: function() {
//Llamamos a las funciones necesarias para mover las palas y la pelota.
        this.leftPaddle.move();
        this.ball.move();
    },
    ballIsOutside: function() {
//Comprobamos que la pelota no se encuentra fuera del tablero.
//Para ello utilizamos una variable temporal llamada "outside".
//Si la pelota se encuentra fuera del tablero, cambiamos la variable.
        var ball = this.ball;
        var outside = false;
        if (ball.coordinateX > canvas.width + ball.radius * 2) {
            outside = true;
        } else if (ball.coordinateX + ball.radius < 0) {
            outside = true;
        } else if (ball.coordinateY - ball.radius < 0) {
//La variable solo se cambia cuando sale por la izquierda o por la derecha,
//En el caso de que choque arriba o abajo, solo se modifica el valor de la velocidad
//en la coordenada Y a su valor contrario.
            ball.velocityCoordinateY *= -1;
        } else if (ball.coordinateY + ball.radius > canvas.height) {
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
        var pausar = (k == "p" || k == "P");
        if (shouldStart && this.game == false) {
//En el caso de que se utilice la tecla s/S, se realiza el saque
//y comienza a funcionar el juego.
            this.game=true;
            this.animFrame();
        }
        else if (pausar) {
//Si se utiliza la tecla q/Q el jugador realice la pausa.
            this.pauseGame ();
        }
        else {
            if (moveUpLeftpaddle) {
//Si se utiliza la tecla a/A, se mueve la pala izquierda hacia arriba.
                this.leftPaddle.velocityCoordinateY += -3;
            } else if (moveDownLeftpaddle) {
//Si se utiliza la tecla z/Z, se mueve la pala izquierda hacia abajo.
                this.leftPaddle.velocityCoordinateY += +3;
            }
        }
    },
    gameOver: function(){
//Función que muestra por pantalla la imagen "Game Over" cuando se acaba el juego.
        gameOver.style.visibility = 'visible';
    },
    startNewGame: function(rematch) {
//Función que comienza un nuevo punto.
//En el caso de que no sea una nueva partida, se incrementa en uno el valor
//Del contador del jugador 1.
        this.numeroPartidas = counternumber;
            rematch ? this.counter++ : this.counter = 0;
            if (this.numeroPartidas > this.counter){
//En el caso de que el contador no haya igualado los puntos elegidos para jugar,
//Se siguen iniciando las partidas.
                 this.initGame();
                this.drawField();
                if (rematch) {
                    setTimeout(function() {
                        GameEngineWall.getInstance().animFrame();
                    }, 1000);
                }
            }
            else{
//Si el contador ya ha llegado al máximo de puntos jugables, se llama a la funcion gameOver.
                this.initGame();
                this.drawField();
                this.gameOver();
            }
    },
}
GameEngineWall.getInstance = function() {
//Definimos y creamos la instancia.
    if (typeof(GameEngineWall.instance) === 'undefined') {
        GameEngineWall.instance = new GameEngineWall();
        GameEngineWall.instance.startNewGame(false);
        return GameEngineWall.instance;
    }
    return GameEngineWall.instance;
}
