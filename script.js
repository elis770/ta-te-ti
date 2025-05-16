//PARTE 1. variables globales
const miBody = document.querySelector('body'); //llamando al body para hacer los cambios entre la bienvenida y las tabla
let jugadorActual = '✖️'; //jugador en turno
document.getElementById('JA').textContent = jugadorActual; //para poner de quien es el turno en el html
//para activar turno de computadora
let esModoComputadora = false;
let jugandoComputadora = false;
let valorA, valorB, valorC, comb; //variables para verificar el juego en su version actual
//esto es para confirmar que hay ganador
let hayGanador = false;
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

//llamado de botones de bienvenida
let botonJugar = document.getElementById('contraPersona');
let botonJugarCompuInt = document.getElementById('contraCompuint');

//tabla de juego llamado
const dentroCuadrado = document.querySelectorAll('.boton-invisible');

//PARTE 2. funciones del juego
function changeLetra(letra) {
  return letra === '✖️' ? '⭕' : '✖️'; //para cambiar el jugador
}

//activar el juego por default
function juegoXDefault() {
  miBody.setAttribute('data-tag', 'jugar'); //cambia de formato el body
  dentroCuadrado.forEach((cuadro) => {
    cuadro.innerHTML = ''; //que no contenga nada
    cuadro.classList.remove('ganador'); //que el div ganador se elimite momentaneamente
    cuadro.disabled = false; //que no este bloqueado el juego
  });
  jugadorActual = '✖️'; //el que tiene el turno es x
  hayGanador = false; //confirmamos que empieza en false (mas que nada para cuando reinicia)
  document.getElementById('JA').textContent = jugadorActual; //en ese span va a decir 'turno de = jugadorActual'
  document.getElementById('error-mensaje').textContent = ''; //no hay mensaje de error
  if (esModoComputadora) {
    // Decidir al azar quién empieza
    if (Math.random() < 0.5) {
      document.getElementById('computadora-pensando').style.display = 'block';
      document.getElementById('computadora-pensando').innerHTML =
        'El humano empieza.';
      setTimeout(() => {
        document.getElementById('computadora-pensando').style.display = 'none';
      }, 1000); // Oculta después de 1 segundo
    } else {
      document.getElementById('computadora-pensando').style.display = 'block';
      document.getElementById('computadora-pensando').innerHTML =
        'La computadora empieza. 🤖';
      jugadorActual = '⭕';
      setTimeout(() => {
        turnoCompuInt();
      }, 500); // Pequeño retraso para mostrar el mensaje antes de jugar
    }
  }
}

//fotografia del tablero
function combinacionesActuales() {
  let resultado = []; //array de las pocisiones actuales del tablero
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    //recoremos el array de opciones ganadoras
    let [a, b, c] = combinacionesGanadoras[i];
    let valorA = dentroCuadrado[a].innerHTML || ' '; //conseguimos los valor de las 3 partes tanto en vertical/horizontal/diagonales
    let valorB = dentroCuadrado[b].innerHTML || ' ';
    let valorC = dentroCuadrado[c].innerHTML || ' ';
    resultado.push(valorA + valorB + valorC); //me retorna un array con todas las pocisiones
  }
  return resultado;
}

//opciones para que la computadora juegue
function opcionesActuales(turno) {
  comb = combinacionesActuales(); //comb = resultado
  let pos = comb.indexOf(turno + turno + ' '); //si resultado es 0:x 1:x 2:''
  if (pos >= 0) return combinacionesGanadoras[pos][2]; //posicion seria 2
  pos = comb.indexOf(turno + ' ' + turno);
  if (pos >= 0) return combinacionesGanadoras[pos][1];
  pos = comb.indexOf(' ' + turno + turno);
  if (pos >= 0) return combinacionesGanadoras[pos][0];
  return null; //si no ve algunas de las opciones ejecutara null (luego en el codigo haremos opciones)
}

//casillas vacias para tener opcion para meter
function getCasillasVacias() {
  let vacias = [];
  dentroCuadrado.forEach((cuadro, i) => {
    if (cuadro.innerHTML === '' || cuadro.innerHTML === ' ') {
      vacias.push(i);
    }
  });
  return vacias;
}

//funciones juego vs computadora
function turnoCompuInt() {
  jugandoComputadora = true; //se activa el juego de la compu
  document.getElementById('computadora-pensando').style.display = 'block'; //activa un div de compu pensando
  document.getElementById('computadora-pensando').innerHTML =
    '🤖 Computadora pensando...'; //activa mensaje

  //hacemos tiempo de 1min para que 'piense'
  setTimeout(() => {
    // OPCION 1. Obtener casillas vacías
    let casillaVacias = getCasillasVacias();
    if (casillaVacias.length === 0) {
      //si todo esta ocupado
      jugandoComputadora = false; //que no juegue la compu
      document.getElementById('computadora-pensando').style.display = 'none'; //sacar mensaje
      return;
    }

    // OPCION 2. Buscar jugada ganadora
    let posicionElegida = opcionesActuales('⭕'); //llamar a funcion de recorrer array y obtener los datos actuales deberia volver un numero opcion + numero de la pocision
    if (posicionElegida !== null) {
      //si hay numero elegido
      dentroCuadrado[posicionElegida].innerHTML = '⭕'; //inserta la compu
    } else {
      //OPCION 3. Si no puede ganar → bloquear al jugador
      let posicionBloqueo = opcionesActuales('✖️'); //igual al anterior pero ahora evitando que el otro gane
      if (posicionBloqueo !== null) {
        dentroCuadrado[posicionBloqueo].innerHTML = '⭕';
      } else {
        //OPCION 4. Priorizar centro
        if (dentroCuadrado[4].innerHTML === '') {
          //la posicion 4 es el centro
          dentroCuadrado[4].innerHTML = '⭕';
        } else {
          //OPCION 5. Jugar esquina si hay disponible
          const esquinas = [0, 2, 6, 8]; //posiciones de las ezquinas en esta tabla
          const disponibles = esquinas.filter(
            //saca las ezquinas posibles
            (i) => dentroCuadrado[i].innerHTML === ''
          );

          if (disponibles.length > 0) {
            //si disponibles hay mas de uno elegir de manera random
            const indiceAleatorio = Math.floor(
              Math.random() * disponibles.length
            );
            dentroCuadrado[disponibles[indiceAleatorio]].innerHTML = '⭕';
          } else {
            //OPCION 6. Última opción: lugar aleatorio
            const indiceAleatorio = Math.floor(
              //elije atraves del math random de manera aleatorio
              Math.random() * casillaVacias.length
            );
            dentroCuadrado[casillaVacias[indiceAleatorio]].innerHTML = '⭕';
          }
        }
      }
    }

    // Finalmente: verificar ganador y cambiar turno
    calculoGanador('⭕'); //es una funcion que esta despues
    jugadorActual = changeLetra(jugadorActual);
    document.getElementById('JA').textContent = jugadorActual;

    jugandoComputadora = false;
    document.getElementById('computadora-pensando').style.display = 'none';
  }, 1000); //este es el final del timeOut
}

//llamados al hacer click en botones de bienvenida
botonJugar.addEventListener('click', () => {
  juegoXDefault();
});
botonJugarCompuInt.addEventListener('click', () => {
  esModoComputadora = true; //activa a la compu jugar en o
  juegoXDefault();
});

//accion dentro del cuadrado al hacer click
dentroCuadrado.forEach((cuadro) =>
  cuadro.addEventListener('click', () => juegoT(cuadro))
);

//funcon del juego
function juegoT(cuadro) {
  //si se da algunas condiciones, parar el juego
  if (hayGanador || [...dentroCuadrado].every((c) => c.innerHTML !== '')) {
    //si ya hay un ganador
    return;
  }
  if (jugandoComputadora) {
    //si juega la compu
    return;
  }
  if (cuadro.innerHTML !== '') {
    //si quiere elegir una casilla ocupada
    document.getElementById('error-mensaje').textContent =
      '⚠️ Elija otra casilla';
    return;
  }
  //aplicar el juegp
  cuadro.innerHTML = jugadorActual; //cuando pones en el boton es el valor de jugador actual
  jugadorActual = changeLetra(jugadorActual); //ejecuta el cambio de letra
  document.getElementById('JA').textContent = jugadorActual; //se aplica en el cartel 'turno de: ' + jugador actual

  //hay ganador?
  calculoGanador();

  //si no hay ganador y toca jugar a la compu, ejecutar codigo
  if (!hayGanador && jugadorActual === '⭕' && esModoComputadora) {
    turnoCompuInt();
  }
}

//fotografia del tablero
function combinacionesActuales() {
  let resultado = []; //array de las pocisiones actuales del tablero
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    //recoremos el array de opciones ganadoras
    let [a, b, c] = combinacionesGanadoras[i];
    let valorA = dentroCuadrado[a].innerHTML || ' '; //conseguimos los valor de las 3 partes tanto en vertical/horizontal/diagonales
    let valorB = dentroCuadrado[b].innerHTML || ' ';
    let valorC = dentroCuadrado[c].innerHTML || ' ';
    resultado.push(valorA + valorB + valorC); //me retorna un array con todas las pocisiones
  }
  return resultado;
}

function calculoGanador(jugadorEnTurno) {
  comb = combinacionesActuales(); // comb = array con cada línea del tablero

  for (let i = 0; i < comb.length; i++) {
    let linea = comb[i];
    // Si encuentra tres X o tres O seguidas → hay ganador
    if (linea === '✖️✖️✖️' || linea === '⭕⭕⭕') {
      hayGanador = true;

      // Marcar las casillas ganadoras
      dentroCuadrado[combinacionesGanadoras[i][0]].classList.add('ganador');
      dentroCuadrado[combinacionesGanadoras[i][1]].classList.add('ganador');
      dentroCuadrado[combinacionesGanadoras[i][2]].classList.add('ganador');

      accionDelJuego(true, jugadorEnTurno);
      return;
    }
    if (
      !hayGanador &&
      [...dentroCuadrado].every((celda) => celda.innerHTML !== '')
    ) {
      //si no hay ganador y esta todo cubierto, false al accionar del juego
      hayGanador = false;
      accionDelJuego(false);
      return;
    }
  }
}

//funcion de respuesta de ganador o empate
function accionDelJuego(g, ganador = '') {
  dentroCuadrado.forEach((c) => (c.disabled = true)); //desactivar el juego
  if (g === true) {
    //si lo que enviamos arriba que se escribe g hay entonces sale el div con el jugador ganador
    miBody.setAttribute('data-tag', 'ganador');
    document.getElementById('ganador2').innerText = ganador;
    return;
  }

  if (g === false) {
    //caso contrario
    return miBody.setAttribute('data-tag', 'empate');
  }
}