var canvas;
var ctx;
var fps = 30;

var canvasX = 500;
var canvasY = 500;
var tileX, tileY;

var tablero;
var filas = 100;
var columnas = 100;

var blanco = '#FFFFFF';
var negro = '#000000';

function creaArray2D(f, c) {
  var obj = new Array(f);
  for (y = 0; y < f; y++) {
    obj[y] = new Array(c);
  }
  return obj;
}

var Agente = function(x, y, estado) {
  this.x = x;
  this.y = y;
  this.estado = estado;
  this.estadoProx = this.estado;
  this.vecinos = [];

  this.addVecinos = function() {
    var xVecino;
    var yVecino;

    for (i = -1; i < 2; i++) {
      for (j = -1; j < 2; j++) {
        xVecino = (this.x + j + columnas) % columnas;
        yVecino = (this.y + i + filas) % filas;

        if (i != 0 || j != 0) {
          this.vecinos.push(tablero[yVecino][xVecino]);
        }
      }
    }
  }

  this.dibuja = function() {
    var color;
    if (this.estado == 1) {
      color = blanco;
    } else {
      color = negro;
    }

    ctx.fillStyle = color;
    ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
  }

  this.nuevoCiclo = function() {
    var suma = 0;
    for (i = 0; i < this.vecinos.length; i++) {
      suma += this.vecinos[i].estado;
    }

    this.estadoProx = this.estado;

    if (suma < 2 || suma > 3) {
      this.estadoProx = 0;
    }

    if (suma == 3) {
      this.estadoProx = 1;
    }
  }

  this.mutacion = function() {
    this.estado = this.estadoProx;
  }
}

function inicializaTablero(obj) {
  var estado;
  for (y = 0; y < filas; y++) {
    for (x = 0; x < columnas; x++) {
      estado = Math.floor(Math.random() * 2);
      obj[y][x] = new Agente(x, y, estado);
    }
  }

  for (y = 0; y < filas; y++) {
    for (x = 0; x < columnas; x++) {
      obj[y][x].addVecinos();
    }
  }
}

function borraCanvas() {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}

function inicializa() {
  canvas = document.getElementById('pantalla');
  ctx = canvas.getContext('2d');

  canvas.width = canvasX;
  canvas.height = canvasY;

  tileX = Math.floor(canvasX / filas);
  tileY = Math.floor(canvasY / columnas);

  tablero = creaArray2D(filas, columnas);
  inicializaTablero(tablero);

  setInterval(function() {
    principal();
  }, 1000 / fps);
}

function dibujaTablero(obj) {
  for (y = 0; y < filas; y++) {
    for (x = 0; x < columnas; x++) {
      obj[y][x].dibuja();
    }
  }

  for (y = 0; y < filas; y++) {
    for (x = 0; x < columnas; x++) {
      obj[y][x].nuevoCiclo();
    }
  }

  for (y = 0; y < filas; y++) {
    for (x = 0; x < columnas; x++) {
      obj[y][x].mutacion();
    }
  }
}

function principal() {
  borraCanvas();
  dibujaTablero(tablero);
}