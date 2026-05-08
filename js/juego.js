var canvas, ctx, tablero;
var fpsJuego = 20, fpsEditor = 60, fps = fpsJuego;
var canvasX = 500, canvasY = 500, tileX, tileY;
var filas = 100, columnas = 100;
var negro = '#000000', blanco = '#FFFFFF', rojo = '#FF0000';
var modoActivo = 1, pausa = false;

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
    this.x = x; this.y = y; this.vivo = vivo;
    this.estadoProx = vivo; this.vecinos = [];
    this.addVecinos = function() {
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var xV = (j + this.x + columnas) % columnas;
                var yV = (i + this.y + filas) % filas;
                if (i != 0 || j != 0) this.vecinos.push(tablero[yV][xV]);
            }
        }
    };
    this.nuevoCiclo = function() {
        var suma = 0;
        for (var i = 0; i < this.vecinos.length; i++) if (this.vecinos[i].vivo == 1) suma++;
        this.estadoProx = this.vivo;
        if (this.vivo == 0 && suma == 3) this.estadoProx = 1;
        if (this.vivo == 1 && (suma < 2 || suma > 3)) this.estadoProx = 0;
    };
    this.mutacion = function() { this.vivo = this.estadoProx; };
    this.dibuja = function() {
        ctx.fillStyle = this.vivo == 1 ? blanco : negro;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    };
};

function inicializaTablero(obj, aleatorio) {
    for (var y = 0; y < filas; y++) {
        for (var x = 0; x < columnas; x++) {
            obj[y][x] = new Agente(y, x, aleatorio ? Math.floor(Math.random() * 2) : 0);
        }
    }
    for (var y = 0; y < filas; y++) for (var x = 0; x < columnas; x++) obj[y][x].addVecinos();
}

function inicia() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasX; canvas.height = canvasY;
    tileX = canvasX / columnas; tileY = canvasY / filas;
    tablero = Array.from({ length: filas }, () => new Array(columnas));
    inicializaTablero(tablero, true);
    
    canvas.addEventListener('mousemove', (e) => {
        var rect = canvas.getBoundingClientRect();
        posX = Math.floor((e.clientX - rect.left) / tileX);
        posY = Math.floor((e.clientY - rect.top) / tileY);
    });
    canvas.addEventListener('mousedown', () => { if(modoActivo == 2) cambiaRaton(); });
    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) controlaPausa();
        if (e.keyCode == 82) inicializaTablero(tablero, false);
        if (e.keyCode == 84) inicializaTablero(tablero, true);
    });
    setInterval(principal, 1000 / fps);
}

function cambiarModo(n) {
    modoActivo = n;
    document.getElementById('btn1').className = n == 1 ? 'activo' : '';
    document.getElementById('btn2').className = n == 2 ? 'activo' : '';
    document.getElementById('controlesEditor').style.display = n == 2 ? 'inline' : 'none';
    pausa = (n == 2);
}

function cambiaRaton() {
    for (var py = 0; py < patron.length; py++) {
        for (var px = 0; px < patron[py].length; px++) {
            var ty = (posY + py) % filas, tx = (posX + px) % columnas;
            tablero[ty][tx].vivo = patron[py][px];
        }
    }
}

var posX = 0, posY = 0;
function controlaPausa() { pausa = !pausa; }
function aumentaFPS() { if(fpsJuego < 60) fpsJuego += 5; actualizarFps(); }
function reduceFPS() { if(fpsJuego > 5) fpsJuego -= 5; actualizarFps(); }
function actualizarFps() { document.getElementById('txtFps').innerText = "FPS: " + fpsJuego; }

function principal() {
    ctx.clearRect(0, 0, canvasX, canvasY);
    for (var y = 0; y < filas; y++) for (var x = 0; x < columnas; x++) tablero[y][x].dibuja();
    if (!pausa) {
        for (var y = 0; y < filas; y++) for (var x = 0; x < columnas; x++) tablero[y][x].nuevoCiclo();
        for (var y = 0; y < filas; y++) for (var x = 0; x < columnas; x++) tablero[y][x].mutacion();
    }
    if (modoActivo == 2 && pausa) {
        ctx.fillStyle = rojo;
        ctx.fillRect(posX * tileX, posY * tileY, tileX, tileY);
    }
}