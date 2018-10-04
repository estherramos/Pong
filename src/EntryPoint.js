/**
Descripción: Llamada al juego.
@Author: TADS-LEGANES//GRUPO3
@Subject: Técnicas Ágiles de Desarrollo de Software.
@year: 2017
*/
function processKeyWall(event) {
    console.log('event : ' + event.charCode + ' ' + String.fromCharCode(event.charCode));
    if (event) {
        var k = String.fromCharCode(event.charCode);
        GameEngineWall.getInstance().processKeyInGame(k);
    }
}
//Creamos las funciones que recogen las llamadas del teclado.
//Creamos variables que recogen los datos necesarios del HTML.
var fronton = document.getElementById('fronton');
var twoP = document.getElementById('max2players');
var canvas = new CanvasMock();
var context = canvas.canvasElement.getContext('2d');
var idBolas = document.getElementById('id_bolas');
var idBolas1 = document.getElementById('id_bolas1');
var idBolas2 = document.getElementById('id_bolas2');
var idPausa = document.getElementById('pause');
var idPausaP1 = document.getElementById('pauseP1');
var idPausaP2 = document.getElementById('pauseP2');
var mP = document.getElementById('menuPrincipal');
var sub_menu_1 = document.getElementById('sub-menu-1');
var sub_menu_2 = document.getElementById('sub-menu-2');
var sub_menu_3 = document.getElementById('sub-menu-3');
var sub_menu_4 = document.getElementById('sub-menu-4');
var gameOver = document.getElementById('GameOver');
var gameOver1 = document.getElementById('GameOver1');
var gameOver2 = document.getElementById('GameOver2');
var radiusBall = 20;
var velocityBall = 2;
var counternumber = 21;



var modo = false;

//Iniciamos el modo frontón.
function initWall() {
    GameEngineWall.getInstance();
};

function init() {
//Iniciamos el modo jugador contra jugador
    GameEngine.getInstance();
};
//Reanudamos el juego pausado.
function reanudar() {
    GameEngineWall.getInstance().pauseGame(true);
}
//Reanudamos el juego pausado por el jugador 1.
function reanudar1() {
    GameEngine.getInstance().pauseGame(true);
}
//Reanudamos el juego pausado por el jugador 2.
function reanudar2() {
    GameEngine.getInstance().pauseGame(false);
}

var modo = false;
//Modificamos la variable que asigna el radio y la velocidad a la pelota.
function pruebaRadio(idDificultad) {
    if (idDificultad == 'easy') {
        radiusBall = 20;
        velocityBall = 2;
        cambiarMenuAdelenteF();
    }
    else if (idDificultad == 'medium') {
        radiusBall = 15;
        velocityBall = 4;
        cambiarMenuAdelenteF();
    }
    else if (idDificultad == 'hard') {
        radiusBall = 10;
        velocityBall = 6;
        cambiarMenuAdelenteF();
    }
    else if (idDificultad == 'GOD') {
        radiusBall = 5;
        velocityBall = 10;
        cambiarMenuAdelenteF();
    }
}

function cambiarMenuAdelenteF() {
//Cuando seleccionamos un modo en el menú o utilizamos el botón de avance, cambiamos la visibilidad de la pantalla.
    if (sub_menu_1.style.visibility === 'visible') {
        sub_menu_1.style.visibility = 'hidden';
        sub_menu_2.style.visibility = 'visible';
    }
    else if (sub_menu_2.style.visibility = 'visible') {
        sub_menu_2.style.visibility = 'hidden';
        sub_menu_3.style.visibility = 'visible';
    }
}

function endGame() {
    window.location.reload(true);
}

function cambiarMenuAtrasF() {
//Cuando utilizamos el botón de retroceso, cambiamos la visibilidad de la pantalla.
    if (modo == true){
         if (sub_menu_3.style.visibility === 'visible') {
            sub_menu_1.style.visibility = 'visible';
            sub_menu_3.style.visibility = 'hidden';
         }

    }

    else{
        if (sub_menu_3.style.visibility === 'visible') {
            sub_menu_3.style.visibility = 'hidden';
            sub_menu_2.style.visibility = 'visible';
        }
        else if (sub_menu_2.style.visibility = 'visible') {
            sub_menu_2.style.visibility = 'hidden';
            sub_menu_1.style.visibility = 'visible';
        }
    }
}

function modeFronton() {
//Una vez seleccionamos el modo fronton, cambiamos el menú a la selección de dificultad.
    if (sub_menu_1.style.visibility === 'visible') {
        sub_menu_1.style.visibility = 'hidden';
        sub_menu_2.style.visibility = 'visible';
        modo = false;
    }

}

function playerVsPlayer() {
//Una vez seleccionamos el modo fronton, cambiamos el menú a la selección de número de puntos.
     if (sub_menu_1.style.visibility === 'visible') {
        sub_menu_4.style.visibility = 'visible';
        sub_menu_1.style.visibility = 'hidden';
        modo = true;
    }
}

function homeF() {
//Cuando utilizamos el botón "Home", volvemos al menú inicial que selecciona el modo de juego.
    sub_menu_1.style.visibility = 'visible';
    sub_menu_3.style.visibility = 'hidden';
}

function home2P (){
//Cuando utilizamos el botón "Home", volvemos al menú inicial que selecciona el modo de juego.
    sub_menu_1.style.visibility = 'visible';
    sub_menu_4.style.visibility = 'hidden';
}

function comenzarWall(idNumeroBolas) {
//Seleccionamos el número de bolas para el modo frontón.
    if (idNumeroBolas == 'cinco') {
       counternumber = 5;
    }
    else if (idNumeroBolas == 'siete') {
       counternumber = 7;
    }
    else if (idNumeroBolas == 'once') {
      counternumber = 11;
    }
    else if (idNumeroBolas == 'vUno') {
       counternumber = 21;
    }

     initWall();
     mP.style.visibility = 'hidden';
     sub_menu_1.style.visibility = 'hidden';
     sub_menu_2.style.visibility = 'hidden';
     sub_menu_3.style.visibility = 'hidden';
     fronton.style.visibility = 'visible';
     canvas.draw();
}

function processKey(event) {
    if (modo == true) {
        console.log('event : ' + event.charCode + ' ' + String.fromCharCode(event.charCode));
        if (event) {
            var k = String.fromCharCode(event.charCode);
            GameEngine.getInstance().processKeyInGame(k);
        }
    }
    else{
        console.log('event : ' + event.charCode + ' ' + String.fromCharCode(event.charCode));
        if (event) {
            var k = String.fromCharCode(event.charCode);
            GameEngineWall.getInstance().processKeyInGame(k);
        }
    }
}

function comenzar2P(idNumeroBolas) {
    if (idNumeroBolas === 'cinco'){
       counternumber = 5;
    }
    else if (idNumeroBolas == 'siete') {
       counternumber = 7;
    }
    else if (idNumeroBolas == 'once') {
       counternumber = 11;
    }
    else if (idNumeroBolas == 'vUno') {
       counternumber = 21;
    }

     init();
     mP.style.visibility = 'hidden';
     sub_menu_1.style.visibility = 'hidden';
     sub_menu_2.style.visibility = 'hidden';
     sub_menu_3.style.visibility = 'hidden';
     sub_menu_4.style.visibility = 'hidden';
     twoP.style.visibility = 'visible';
     canvas.draw();
}
window.onload = init;
