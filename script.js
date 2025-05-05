// Selecciona el contenedor principal donde inyectaremos todo el contenido del juego
let g = document.querySelector('.g');

// Inyectamos un mensaje de bienvenida y un botón para comenzar a jugar
g.innerHTML = `
  <h1 id="titulo"><u>TIC-TAC-TOE</u></h1>
  <div id="diseñores">
    <div id="mensaje">
      <p>👋 Hola! Bienvenido al juego del TIC-TAC-TOE</p>
    </div>
    <button class="reinicio">Vamos a jugar!</button>
  </div>
`;

// Seleccionamos el botón "Vamos a jugar!" para agregarle un evento click
let botonJugar = document.querySelector('.reinicio');

// Agregamos el evento click al botón, que iniciará el juego (ejecutará la función juegoT)
botonJugar.addEventListener('click', () => {
  juegoT();
});

// Función principal del juego: crea el tablero y maneja la lógica del turno de los jugadores
function juegoT() {
  // Inyectamos el tablero de juego (3x3) en el contenedor principal
  g.innerHTML = `
    <h1 id="titulo"><u>TIC-TAC-TOE</u></h1>
    <table>
      <tbody>
        <tr>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
        </tr>
        <tr>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
        </tr>
        <tr>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
          <td><button class="boton-invisible"></button></td>
        </tr>
      </tbody>
    </table>
  `;

  // Seleccionamos todos los botones del tablero (casillas)
  let dentroCuadrado = document.querySelectorAll('.boton-invisible');

  // Variable que indica quién juega primero ('✖️' o '⭕')
  let jugadorActual = '✖️';

  // Lista de combinaciones ganadoras posibles (índices de las casillas)
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Recorremos cada casilla del tablero para agregarle un evento click
  dentroCuadrado.forEach((cuadro) => {
    cuadro.addEventListener('click', () => {
      // Si ya tiene una ficha, no permite sobreescribirla
      if (cuadro.innerHTML !== '') {
        console.error('Elija otra casilla');
        return;
      }

      // Asigna la ficha del jugador actual a la casilla seleccionada
      cuadro.innerHTML = jugadorActual;

      // Variable para saber si hay un ganador después de esta jugada
      let hayGanador = false;

      // Verifica todas las combinaciones ganadoras
      for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i];

        // Obtiene el valor de las tres casillas de la combinación actual
        const valorA = dentroCuadrado[a].innerHTML;
        const valorB = dentroCuadrado[b].innerHTML;
        const valorC = dentroCuadrado[c].innerHTML;

        // Si las tres son iguales y no están vacías → hay ganador
        if (valorA === valorB && valorB === valorC && valorA !== '') {
          hayGanador = true;
          break;
        }
      }

      // Si hay ganador, mostramos el mensaje y desactivamos las casillas
      if (hayGanador) {
        g.innerHTML = `<h1 id="titulo"><u>TIC-TAC-TOE</u></h1> 
          <div id="diseñores">
            <div id="mensaje">🎉 Ganó el jugador ${jugadorActual} 😄🎉</div>
            <button class="reinicio" onclick="vacio()">Volver a jugar</button>
          </div>`;
        dentroCuadrado.forEach((c) => (c.disabled = true));
        return;
      }

      // Si no hay ganador y todas las casillas están llenas → es empate
      if (
        hayGanador === false &&
        [...dentroCuadrado].every((cuadro) => cuadro.innerHTML !== '')
      ) {
        g.innerHTML =
          '<h1 id="titulo"><u>TIC-TAC-TOE</u></h1> <div id="diseñores"><div id="mensaje"> <p>⚠️ Es un Empate. </p></div> <button class="reinicio" onclick = "vacio()"> Volver a jugar</button></div>';
      }

      // Cambia al otro jugador para el siguiente turno
      jugadorActual = change(jugadorActual);
    });
  });
}

// Función para cambiar entre '✖️' y '⭕'
function change(letra) {
  return letra === '✖️' ? '⭕' : '✖️';
}

// Función para reiniciar el juego
function vacio() {
  g.innerHTML = '';
  juegoT(); // Ejecuta de nuevo el juego desde el principio
}
