var canvas, ctx;
var fpsJuego = 20;
var fpsEditor = 60;
var fps = fpsJuego;
var canvasX = 500;
var canvasY = 500;
var tileX, tileY;
var tablero;
var filas = 100;
var columnas = 100;
var negro = '#000000', blanco = '#FFFFFF', rojo = '#FF0000';
var modoActivo = 1;
var pausa = false;

var patron = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var Agente = function(y, x, vivo) {
    this.x = x;
    this.y = y;
    this.vivo = vivo;
    this.estadoProx = this.vivo;
    this.vecinos = [];

    this.addVecinos = function() {
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var xVecino = (j + this.x + columnas) % columnas;
                var yVecino = (i + this.y + filas) % filas;
                if (i != 0 || j != 0) this.vecinos.push(tablero[yVecino][xVecino]);
            }
        }
    }

    this.nuevoCiclo = function() {
        var suma = 0;
        for (var i = 0; i < this.vecinos.length; i++) {
            if (this.vecinos[i].vivo == 1) suma++;
        }
        this.estadoProx = this.vivo;
        if (this.vivo == 0 && suma == 3) this.estadoProx = 1;
        if (this.vivo == 1 && (suma < 2 || suma > 3)) this.estadoProx = 0;
    }

    this.mutacion = function() { this.vivo = this.estadoProx; }

    this.dibuja = function() {
        ctx.fillStyle = this.vivo == 1 ? blanco : negro;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    }
}

function creaArray2D(f, c) {
    var obj = new Array(f);
    for (var y = 0; y < f; y++) obj[y] = new Array(c);
    return obj;
}

function inicializaTablero(obj, aleatorio) {
    for (var y = 0; y < filas; y++) {
        for (var x = 0; x < columnas; x++) {
            var estado = aleatorio ? Math.floor(Math.random() * 2) : 0;
            obj[y][x] = new Agente(y, x, estado);
        }
    }
    for (var y = 0; y < filas; y++) {
        for (var x = 0; x < columnas; x++) obj[y][x].addVecinos();
    }
}

function cambiarModo(num) {
    modoActivo = num;
    document.getElementById('btn1').className = num == 1 ? 'activo' : '';
    document.getElementById('btn2').className = num == 2 ? 'activo' : '';
    document.getElementById('controlesEditor').style.display = num == 2 ? 'inline' : 'none';
    
    if (num == 1) {
        pausa = false;
        fps = 30;
    } else {
        pausa = true;
        fps = fpsEditor;
    }
}

function inicia() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasX;
    canvas.height = canvasY;

    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY / columnas);

    tablero = creaArray2D(filas, columnas);
    inicializaTablero(tablero, true);

    canvas.addEventListener('mousemove', posicionRaton);
    canvas.addEventListener('mouseup', function() { if(modoActivo == 2) cambiaRaton(); });

    document.addEventListener('keyup', function(tecla) {
        if (tecla.keyCode == 32) controlaPausa();
        if (tecla.keyCode == 82) inicializaTablero(tablero, false);
        if (tecla.keyCode == 84) inicializaTablero(tablero, true);
        if (tecla.keyCode == 81) aumentaFPS();
        if (tecla.keyCode == 87) reduceFPS();
    });

    setInterval(principal, 1000 / fps);
}

var ratonX = 0, ratonY = 0, posX = 0, posY = 0;
function posicionRaton(e) {
    var rect = canvas.getBoundingClientRect();
    ratonX = e.clientX - rect.left;
    ratonY = e.clientY - rect.top;
    posX = Math.floor(ratonX / tileX);
    posY = Math.floor(ratonY / tileY);
}

function cambiaRaton() {
    for (var py = 0; py < patron.length; py++) {
        for (var px = 0; px < patron[py].length; px++) {
            var ty = (posY + py) % filas;
            var tx = (posX + px) % columnas;
            tablero[ty][tx].vivo = patron[py][px];
        }
    }
}

function controlaPausa() {
    pausa = !pausa;
    fps = pausa ? fpsEditor : fpsJuego;
}

function aumentaFPS() { if (fpsJuego < 60) fpsJuego += 5; actualizarFpsUI(); }
function reduceFPS() { if (fpsJuego > 5) fpsJuego -= 5; actualizarFpsUI(); }
function actualizarFpsUI() { document.getElementById('txtFps').innerText = "FPS: " + fpsJuego; }

function principal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < filas; y++) {
        for (var x = 0; x < columnas; x++) tablero[y][x].dibuja();
    }
    if (!pausa) {
        for (var y = 0; y < filas; y++) {
            for (var x = 0; x < columnas; x++) tablero[y][x].nuevoCiclo();
        }
        for (var y = 0; y < filas; y++) {
            for (var x = 0; x < columnas; x++) tablero[y][x].mutacion();
        }
    }
    if (modoActivo == 2 && pausa) {
        ctx.fillStyle = rojo;
        ctx.fillRect(posX * tileX, posY * tileY, tileX, tileY);
    }
}