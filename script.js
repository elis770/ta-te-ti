const miBody = document.querySelector('body');
let jugadorActual = '✖️';
document.getElementById('JA').textContent = jugadorActual;
let esModoComputadora = false;
let jugandoComputadora = false;
let compuFacil = false
let valorA, valorB, valorC;

function changeLetra(letra) {
  return letra === '✖️' ? '⭕' : '✖️';
}

let botonJugar = document.getElementById('contraPersona');
let botonJugarCompu = document.getElementById('contraCompu');
let botonJugarCompuInt = document.getElementById('contraCompuint');
const dentroCuadrado = document.querySelectorAll('.boton-invisible');

dentroCuadrado.forEach((cuadro) =>
  cuadro.addEventListener('click', () => juegoT(cuadro))
);

let hayGanador = false;

botonJugar.addEventListener('click', () => {
  reiniciar();
});
botonJugarCompu.addEventListener('click', () => {
  esModoComputadora = true;
  compuFacil = true;
  reiniciar();
});
botonJugarCompuInt.addEventListener('click', () => {
  esModoComputadora = true;
  compuFacil = false;
  reiniciar();
});

function reiniciar() {
  miBody.setAttribute('data-tag', 'jugar');
  dentroCuadrado.forEach((cuadro) => {
    cuadro.innerHTML = '';
    cuadro.classList.remove('ganador');
    cuadro.disabled = false;
  });
  jugadorActual = '✖️';
  hayGanador = false;
  document.getElementById('JA').textContent = jugadorActual;
  document.getElementById('error-mensaje').textContent = '';
}

function turnoComputadora() {
  jugandoComputadora = true;
  document.getElementById('computadora-pensando').style.display = 'block';

  setTimeout(() => {
    let casillaVacias = [];
    dentroCuadrado.forEach((cuadro, i) => {
      if (cuadro.innerHTML === '') {
        casillaVacias.push(i);
      }
    });

    if (casillaVacias.length === 0) {
      jugandoComputadora = false;
      document.getElementById('computadora-pensando').style.display = 'none';
      return;
    }

    const indiceAleatorio = Math.floor(Math.random() * casillaVacias.length);
    dentroCuadrado[casillaVacias[indiceAleatorio]].innerHTML = '⭕';

    calculoGanador('⭕');

    jugadorActual = changeLetra(jugadorActual);
    document.getElementById('JA').textContent = jugadorActual;

    jugandoComputadora = false;
    document.getElementById('computadora-pensando').style.display = 'none';
  }, 1000);
}

// function bucleFor() {
//   const combinacionesGanadoras = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//   for (let i = 0; i < combinacionesGanadoras.length; i++) {
//       let [a, b, c] = combinacionesGanadoras[i];
//       let valorA = dentroCuadrado[a].innerHTML;
//       let valorB = dentroCuadrado[b].innerHTML;
//       let valorC = dentroCuadrado[c].innerHTML;
//   }
// }
function turnoCompuInt() {
  jugandoComputadora = true;
  document.getElementById('computadora-pensando').style.display = 'block';

  setTimeout(() => {
    let casillaVacias = [];
    dentroCuadrado.forEach((cuadro, i) => {
      if (cuadro.innerHTML === '') {
        casillaVacias.push(i);
      }
    });

    if (casillaVacias.length === 0) {
      jugandoComputadora = false;
      document.getElementById('computadora-pensando').style.display = 'none';
      return;
    }

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

    let posicionElegida = null;
    let posicionBloqueo = null;

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
      let [a, b, c] = combinacionesGanadoras[i];
      let valorA = dentroCuadrado[a].innerHTML;
      let valorB = dentroCuadrado[b].innerHTML;
      let valorC = dentroCuadrado[c].innerHTML;

      if (
        (valorA === '⭕' && valorB === '⭕' && valorC === '') ||
        (valorA === '⭕' && valorC === '⭕' && valorB === '') ||
        (valorB === '⭕' && valorC === '⭕' && valorA === '')
      ) {
        if (valorA === '') posicionElegida = a;
        else if (valorB === '') posicionElegida = b;
        else if (valorC === '') posicionElegida = c;
        break;
      }
    }

    if (posicionElegida !== null) {
      dentroCuadrado[posicionElegida].innerHTML = '⭕';
    } else {
      for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let [a, b, c] = combinacionesGanadoras[i];
        let valorA = dentroCuadrado[a].innerHTML;
        let valorB = dentroCuadrado[b].innerHTML;
        let valorC = dentroCuadrado[c].innerHTML;

        if (
          (valorA === '✖️' && valorB === '✖️' && valorC === '') ||
          (valorA === '✖️' && valorC === '✖️' && valorB === '') ||
          (valorB === '✖️' && valorC === '✖️' && valorA === '')
        ) {
          if (valorA === '') posicionBloqueo = a;
          else if (valorB === '') posicionBloqueo = b;
          else if (valorC === '') posicionBloqueo = c;
          break;
        }
      }

      if (posicionBloqueo !== null) {
        dentroCuadrado[posicionBloqueo].innerHTML = '⭕';
      } else {
        if (dentroCuadrado[4].innerHTML === '') {
          dentroCuadrado[4].innerHTML = '⭕';
        } else {
          const esquinas = [0, 2, 6, 8];
          const disponibles = [];

          for (let i = 0; i < esquinas.length; i++) {
            if (dentroCuadrado[esquinas[i]].innerHTML === '') {
              disponibles.push(esquinas[i]);
            }
          }

          if (disponibles.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
            dentroCuadrado[disponibles[indiceAleatorio]].innerHTML = '⭕';
          } else {
            // 7. Última opción: lugar vacío al azar
            const indiceAleatorio = Math.floor(Math.random() * casillaVacias.length);
            dentroCuadrado[casillaVacias[indiceAleatorio]].innerHTML = '⭕';
          }
        }
      }
    }
    calculoGanador('⭕');
    jugadorActual = changeLetra(jugadorActual);
    document.getElementById('JA').textContent = jugadorActual;

    jugandoComputadora = false;
    document.getElementById('computadora-pensando').style.display = 'none';
  }, 1000);
}

function juegoT(cuadro) {
  if (hayGanador || [...dentroCuadrado].every((c) => c.innerHTML !== '')) {
    return;
  }

  if (jugandoComputadora) {
    return;
  }

  if (cuadro.innerHTML !== '') {
    document.getElementById('error-mensaje').textContent = '⚠️ Elija otra casilla';
    return;
  }

  cuadro.innerHTML = jugadorActual;
  jugadorActual = changeLetra(jugadorActual);
  document.getElementById('JA').textContent = jugadorActual;

  calculoGanador();

  if (!hayGanador && jugadorActual === '⭕' && esModoComputadora) {
    if (compuFacil) {
      turnoComputadora();
    } else {
      turnoCompuInt();
    }
  }
}

function calculoGanador(jugadorEnTurno) {
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
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    let [a, b, c] = combinacionesGanadoras[i];
    valorA = dentroCuadrado[a].innerHTML;
    valorB = dentroCuadrado[b].innerHTML;
    valorC = dentroCuadrado[c].innerHTML;
    if (valorA === valorB && valorB === valorC && valorA !== '') {
      hayGanador = true;
      dentroCuadrado[a].classList.add('ganador');
      dentroCuadrado[b].classList.add('ganador');
      dentroCuadrado[c].classList.add('ganador');
      accionDelJuego(true, jugadorEnTurno);
      return;
    }
  }
  if (
    !hayGanador &&
    [...dentroCuadrado].every((celda) => celda.innerHTML !== '')
  ) {
    hayGanador = false;
    accionDelJuego(false);
    return;
  }
}

function accionDelJuego(g, ganador = '') {
  dentroCuadrado.forEach((c) => (c.disabled = true));
  if (g === true) {
    miBody.setAttribute('data-tag', 'ganador');
    document.getElementById('ganador2').innerText = ganador;
    return;
  }

  if (g === false) {
    miBody.setAttribute('data-tag', 'empate');
    return;
  }
}