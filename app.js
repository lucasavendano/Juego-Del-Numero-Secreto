let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let listaNumerosSorteados = [];
let reinicio = 0;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector (elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Función llamada desde index.html al hacer click en botón "Intentar"
function verificarIntento() {
    if (reinicio === 1) {
        reinicioTotal();
    } else {
    let numeroDeUsuario = parseInt(document.getElementById(`valorUsuario`).value);
    console.log(`El número escogido por el usuario es: ${numeroDeUsuario}`);
    console.log(`De tipo: ${typeof(numeroDeUsuario)}`);
    console.log(numeroDeUsuario === numeroSecreto);
    console.log(`Número de intentos del usuario: ${intentos}`);
    if (isNaN(numeroDeUsuario) || numeroDeUsuario === 0) {
        asignarTextoElemento(`p`,`Por favor introduce un número entre 1 y ${numeroMaximo}`);
        limpiaCaja();
    } else if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento(`p`,`¡Acertaste!, el número secreto es ${numeroSecreto}. Lo lograste en ${intentos} ${intentos === 1 ? `intento.` : `intentos.`}`);
        document.querySelector(`#intentar`).setAttribute(`disabled`,`true`);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else {
        numeroDeUsuario > numeroSecreto ? asignarTextoElemento(`p`,`El número secreto es menor`) : asignarTextoElemento(`p`,`El número secreto es mayor`);
        intentos++;
        limpiaCaja();
    }
    return;
}
}

function limpiaCaja() {
    document.querySelector(`#valorUsuario`).value = ``;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(`El número secreto generado es: ${numeroGenerado}`);
    console.log(`De tipo: ${typeof(numeroGenerado)}`);
    console.log(`Lista de números generados: ${listaNumerosSorteados}`);
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento(`p`, `Ya han sido sorteados todos los números posibles del 1 al ${numeroMaximo}.`);
        asignarTextoElemento(`#intentar`,`Reiniciar Juego`);
        reinicio = 1;
        return reinicio;
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento (`h1`,`Juego del número secreto`);
    asignarTextoElemento (`p`, `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

//Función llamada desde index.html al hacer click en "Nuevo juego"
function reiniciarJuego() {
    //Limpiar caja
    limpiaCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Desahabilitar el botón "Nuevo juego"
    document.querySelector(`#reiniciar`).setAttribute(`disabled`,`true`);
    //Habilita botón Intentar
    document.getElementById(`intentar`).removeAttribute(`disabled`);
    }

condicionesIniciales();

function reinicioTotal() {
    location.reload(true);
}