var canvas, ctx;
var fps = 30;
var filas = 100, columnas = 100;
var tablero;
var blanco = '#FFFFFF', negro = '#000000';

function inicializa() {
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2d');
    
    canvas.width = 500;
    canvas.height = 500;

    // Crear e inicializar tablero con agentes aleatorios
    tablero = creaArray2D(filas, columnas);
    for(let y=0; y<filas; y++){
        for(let x=0; x<columnas; x++){
            let estado = Math.floor(Math.random()*2);
            tablero[y][x] = new Agente(x, y, estado);
        }
    }

    // Una vez creados todos, asignar vecinos a cada uno
    for(let y=0; y<filas; y++){
        for(let x=0; x<columnas; x++){
            tablero[y][x].addVecinos();
        }
    }

    setInterval(function(){ principal(); }, 1000/fps);
}

function creaArray2D(f, c) {
    var obj = new Array(f);
    for(let i=0; i<f; i++) obj[i] = new Array(c);
    return obj;
}

// Objeto Agente (Célula)
function Agente(x, y, estado) {
    this.x = x;
    this.y = y;
    this.estado = estado;
    this.estadoProx = estado;
    this.vecinos = [];

    this.addVecinos = function() {
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                let xV = (x + j + columnas) % columnas;
                let yV = (y + i + filas) % filas;
                if(i !== 0 || j !== 0) this.vecinos.push(tablero[yV][xV]);
            }
        }
    };

    this.dibuja = function() {
        ctx.fillStyle = this.estado === 1 ? blanco : negro;
        ctx.fillRect(this.x * 5, this.y * 5, 5, 5);
    };

    this.nuevoCiclo = function() {
        let suma = 0;
        for(let v of this.vecinos) suma += v.estado;
        
        this.estadoProx = this.estado; // Por defecto igual
        if(suma < 2 || suma > 3) this.estadoProx = 0; // Muerte
        if(suma === 3) this.estadoProx = 1; // Vida/Reproducción
    };

    this.mutacion = function() {
        this.estado = this.estadoProx;
    };
}

function principal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let y=0; y<filas; y++){
        for(let x=0; x<columnas; x++){
            tablero[y][x].dibuja();
            tablero[y][x].nuevoCiclo();
        }
    }
    for(let y=0; y<filas; y++){
        for(let x=0; x<columnas; x++){
            tablero[y][x].mutacion();
        }
    }
}