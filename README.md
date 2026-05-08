# 👾 Juego de la Vida de Conway - Dual Mode

Esta es una implementación del famoso autómata celular de John Conway, desarrollada con **JavaScript puro** y la API de **Canvas de HTML5**. El proyecto permite explorar la evolución de sistemas complejos a partir de reglas biológicas simples directamente desde el navegador.

## 🔗 Demo en vivo
Puedes probar la simulación aquí:  
👉 **[https://yourchh.github.io/Juego-Vida-Conway/](https://yourchh.github.io/Juego-Vida-Conway/)**

## 📺 Demostración de funcionamiento
### 🎥 Funcionamiento del Modo Automático y Editor
<div align="center">
  <video src="https://github.com/Yourchh/Juego-Vida-Conway/raw/main/demo.mp4" width="100%" controls></video>
</div>

## 🚀 Modos de Juegos
El proyecto cuenta con dos modalidades para experimentar:

1. **Modo 1: Automático** - El tablero se inicializa con ruido aleatorio.
   - Ideal para observar cómo se forman estructuras estables y osciladores de forma natural.
   
2. **Modo 2: Editor (Interactivo)** - **Pausa Automática:** Al entrar en este modo, la simulación se detiene para permitir la edición.
   - **Puntero:** Un cursor rojo indica la posición exacta en la rejilla.
   - **Estampado de Patrones:** Al hacer clic, se estampa un patrón complejo (**Gosper Glider Gun**) para verlo evolucionar.

## 🎮 Controles (Teclado)
| Tecla | Acción |
| :--- | :--- |
| `Espacio` | Pausar / Reanudar la simulación |
| `T` | Reiniciar el tablero con células aleatorias |
| `R` | Vaciar el tablero (Reset) |
| `Q` / `W` | Aumentar / Reducir la velocidad (FPS) |

## 🧠 Las Reglas de Conway
La evolución de cada célula se rige por su vecindad (8 células circundantes):
1. **Supervivencia:** Una célula viva con 2 o 3 vecinos vivos sigue viva.
2. **Muerte:** Por aislamiento (menos de 2 vecinos) o sobrepoblación (más de 3).
3. **Nacimiento:** Una célula muerta con exactamente 3 vecinos vivos cobra vida.



## 🛠️ Tecnologías
- **HTML5 (Canvas):** Renderizado de alto rendimiento para los agentes.
- **JavaScript (ES6+):** Lógica de estados y algoritmos de vecindad.
- **CSS3:** Interfaz de usuario moderna con diseño oscuro.

---
Desarrollado por **Jorge Andrés Hernández Pelayo**.