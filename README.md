# 👾 Juego de la Vida de Conway - Dual Mode

Esta es una implementación del famoso autómata celular de John Conway, desarrollada con **JavaScript puro** y la API de **Canvas de HTML5**. El proyecto permite explorar la evolución de sistemas complejos a partir de reglas biológicas simples.

## 📺 Demostración en vivo
Aquí puedes ver el proyecto en funcionamiento y cómo interactuar con los patrones:

<video controls src="demostracion.mp4" title="Demostración"></video>

## 🚀 Modos de Juego
El proyecto cuenta con dos modalidades para experimentar:

1. **Modo 1: Automático** - El tablero se inicializa con ruido aleatorio.
   - La simulación corre de forma continua mostrando la autorregulación del sistema.
   
2. **Modo 2: Editor (Interactivo)**
   - **Pausa:** La simulación se detiene para permitir la edición manual.
   - **Puntero:** Un cursor rojo indica la posición exacta en la rejilla.
   - **Estampado:** Al hacer clic, se genera un patrón complejo (Gosper Glider Gun).

## 🎮 Controles (Teclado)
| Tecla | Acción |
| :--- | :--- |
| `Espacio` | Pausar / Reanudar la simulación |
| `T` | Reiniciar el tablero con células aleatorias |
| `R` | Vaciar el tablero por completo |
| `Q` | Aumentar la velocidad (FPS) |
| `W` | Reducir la velocidad (FPS) |

## 🧠 Las Reglas de Conway
La evolución de cada célula depende de sus 8 vecinos:
1. **Supervivencia:** Una célula viva con 2 o 3 vecinos vivos sigue viva.
2. **Muerte:** Por aislamiento (menos de 2 vecinos) o sobrepoblación (más de 3).
3. **Nacimiento:** Una célula muerta con exactamente 3 vecinos vivos "nace".



## 🛠️ Tecnologías utilizadas
- **HTML5 (Canvas)** para el renderizado de gráficos.
- **JavaScript (Vanilla)** para la lógica de autómatas y manejo del DOM.
- **CSS3** para una interfaz moderna y minimalista.

---
Desarrollado por **Jorge Andrés Hernández Pelayo** como parte de un proyecto de lógica y algoritmos.