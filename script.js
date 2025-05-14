const miBody = document.querySelector('body');
let jugadorActual = '✖️';
document.getElementById('JA').textContent = jugadorActual;
let esModoComputadora = false;
let jugandoComputadora = false;

function changeLetra(letra) {
  return letra === '✖️' ? '⭕' : '✖️';
}

let botonJugar = document.getElementById('contraPersona');
let botonJugarCompu = document.getElementById('contraCompu');
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
    const posicionElegida = casillaVacias[indiceAleatorio];
    dentroCuadrado[posicionElegida].innerHTML = '⭕';
    jugandoComputadora = false;
    document.getElementById('computadora-pensando').style.display = 'none';
    calculoGanador('⭕');
    jugadorActual = changeLetra(jugadorActual);
    document.getElementById('JA').textContent = jugadorActual;
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
    document.getElementById('error-mensaje').textContent =
      '⚠️ Elija otra casilla';
    return;
  } else {
    const jugadorEnTurno = jugadorActual;
    cuadro.innerHTML = jugadorEnTurno;
    calculoGanador(jugadorEnTurno);
    if (hayGanador || [...dentroCuadrado].every((c) => c.innerHTML !== '')) {
      return;
    }
    jugadorActual = changeLetra(jugadorActual);
    document.getElementById('JA').textContent = jugadorActual;

    if (jugadorActual === '⭕' && esModoComputadora) {
      turnoComputadora();
    }
  }
}
let valorA, valorB, valorC;
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
  if (g === true) {
    miBody.setAttribute('data-tag', 'ganador');
    document.getElementById('ganador2').innerText = ganador;
    dentroCuadrado.forEach((c) => (c.disabled = true));
    return;
  }

  if (g === false) {
    miBody.setAttribute('data-tag', 'empate');
    dentroCuadrado.forEach((c) => (c.disabled = true));
    return;
  }
}
