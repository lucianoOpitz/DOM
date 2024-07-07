const sectionSeleccionarPersonaje = document.getElementById("seleccionar-personaje")
const personajeSeleccionado = document.getElementById('seleccionar')
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const spanVictoriasJugador = document.getElementById("victorias-personaje")
const spanPersonaje = document.getElementById("personaje-seleccionado")
const sectionAtaqueJugador0 = document.getElementById("ataque-jugador0")
const sectionAtaqueJugador1 = document.getElementById("ataque-jugador1")
const sectionAtaqueJugador2 = document.getElementById("ataque-jugador2")
const sectionAtaqueJugador3 = document.getElementById("ataque-jugador3")
const sectionAtaqueJugador4 = document.getElementById("ataque-jugador4")
const sectionAtaqueEnemigo0 = document.getElementById("ataque-enemigo0")
const sectionAtaqueEnemigo1 = document.getElementById("ataque-enemigo1")
const sectionAtaqueEnemigo2 = document.getElementById("ataque-enemigo2")
const sectionAtaqueEnemigo3 = document.getElementById("ataque-enemigo3")
const sectionAtaqueEnemigo4 = document.getElementById("ataque-enemigo4")
const spanVictoriasPc = document.getElementById("victorias-pc")
const spanPersonajePc = document.getElementById("personaje-enemigo")
const sectionMensajes = document.getElementById("resultado-batalla")
const sectionMensajeFinal = document.getElementById("mensaje-final")
const sectionReiniciar =  document.getElementById("reiniciar")
const botonReiniciar = document.getElementById("boton-reiniciar")
const parrafo = document.createElement("p")
const contenedorLuchadores = document.getElementById("contenedor-luchadores")
const contenedorAtaques = document.getElementById ("contenedor-ataques")
const areaCombate = document.getElementById("area-combate")
const mapa = document.getElementById("mapa")
const anchuraMaximaMapa = 400
const resetear = 1
const cantidadDeAtaques = 5
let nuevoAtaqueJugador0 = document.createElement("p")
let nuevoAtaqueJugador1 = document.createElement("p")
let nuevoAtaqueJugador2 = document.createElement("p")
let nuevoAtaqueJugador3 = document.createElement("p")
let nuevoAtaqueJugador4 = document.createElement("p")
let nuevoAtaqueEnemigo0 = document.createElement("p")
let nuevoAtaqueEnemigo1 = document.createElement("p")
let nuevoAtaqueEnemigo2 = document.createElement("p")
let nuevoAtaqueEnemigo3 = document.createElement("p")
let nuevoAtaqueEnemigo4 = document.createElement("p")
let contadorDePeleas = 0
let ataqueJugador 
let ataquePc = []
let victoriasJugador = 0
let victoriasPc = 0
let luchadores = []
let elegirLuchador 
let luke
let obiWan
let darth
let luchadorJugador
let mostrarElementos
let botones = []
let ataquesEjecutados = []
let ataquesDelEnemigo 
let nombreDelEnemigo
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = ("./personajes/fondo.jpg")
let alturaBuscada
let anchoMapa = window.innerWidth - 60
let jugadorId = null
if(anchoMapa > anchuraMaximaMapa){
    anchoMapa = anchuraMaximaMapa
}
alturaBuscada = anchoMapa * 600 / 800
mapa.width = anchoMapa
mapa.height = alturaBuscada
class Dom{
    constructor (nombre, foto, vida, fotoMapa, x = aleatorio(0, anchoMapa-mapa.width / 9), y=aleatorio(0,alturaBuscada-mapa.width / 9),id = null){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = mapa.width / 9
        this.alto = mapa.width / 9
        this.fotoObjeto = new Image()
        this.fotoObjeto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }
    pintarPersonaje(){
        lienzo.drawImage(
            this.fotoObjeto,
            this.x,
            this.y,
            this.ancho,
            this.alto
         )
    }
}
let objetoMapa 
let objetoEnemigoMapa
let skywalker = new Dom ("Luke-Skywalker", "./personajes/Luke-Skywalker.png", 5, "./personajes/Luke-Skywalker.png")
let kenobi = new Dom("Obi-Wan", "./personajes/obi-wan.png", 5, "./personajes/obi-wan.png")
let darthVader = new Dom ("Darth-Vader", "./personajes/Darth-Vader.png", 5, "./personajes/Darth-Vader.png")
const SKYWALKER_ATACK = [
    {nombre: '🗡', id: 'espada-luz-azul'},
    {nombre: '🗡', id: 'espada-luz-azul'},
    {nombre: '🗡', id: 'espada-luz-azul'},
    {nombre: '👋🏼', id: 'elevar-verde'},
    {nombre: '👉🏼', id: 'blaster-verde'},
]
const KENOBI_ATACK = [   
    {nombre: '🗡', id: 'espada-luz-verde'},
    {nombre: '🗡', id: 'espada-luz-verde'},
    {nombre: '🗡', id: 'espada-luz-verde'},
    {nombre: '👋🏼', id: 'elevar-azul'},
    {nombre: '👉🏼', id: 'blaster-azul'},
]
const DARTH_ATACK = [
    {nombre: '🗡', id: 'espada-luz-roja'},
    {nombre: '🗡', id: 'espada-luz-roja'},
    {nombre: '🗡', id: 'espada-luz-roja'},
    {nombre: '👋🏼', id: 'elevar-rojo'},
    {nombre: '👉🏼', id: 'blaster-rojo'},
]
skywalker.ataques.push (...SKYWALKER_ATACK)
kenobi.ataques.push (...KENOBI_ATACK)
darthVader.ataques.push(...DARTH_ATACK)

luchadores.push(skywalker,kenobi,darthVader)
function iniciarJuego (){
    areaCombate.style.display = "none"
    luchadores.forEach((luchador) => {
        elegirLuchador = `
        <input type="radio" name="personaje" id=${luchador.nombre}>
        <label class="caja-ataque" for=${luchador.nombre}>
            <p>${luchador.nombre}</p>
            <img src="./personajes/${luchador.nombre}.png" alt=${luchador.foto}>
        </label>
        `
        contenedorLuchadores.innerHTML += elegirLuchador
    })
    luke = document.getElementById ("Luke-Skywalker")
    obiWan = document.getElementById ("Obi-Wan")
    darth = document.getElementById("Darth-Vader")
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    personajeSeleccionado.addEventListener ('click', seleccionado)     
    botonReiniciar.addEventListener('click', siguienteJuego)      
    unirseAlJuego()
}
function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                 .then (function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                 })
            }
        })
}
function seleccionado(){
    if(luke.checked){
        areaCombate.style.display = "flex"
        sectionSeleccionarPersonaje.style.display = "none"
        spanPersonaje.innerHTML = luke.id
        luchadorJugador = luke.id
        objetoMapa = skywalker
        extraerAtaques(luchadorJugador)
        iniciarMapa()
    }else if (obiWan.checked){
        areaCombate.style.display = "flex"
        sectionSeleccionarPersonaje.style.display = "none"
        spanPersonaje.innerHTML = obiWan.id
        luchadorJugador = obiWan.id
        objetoMapa = kenobi
        extraerAtaques(luchadorJugador)
        iniciarMapa()
    }else if (darth.checked){
        areaCombate.style.display = "flex"
        sectionSeleccionarPersonaje.style.display = "none"
        spanPersonaje.innerHTML = darth.id
        luchadorJugador = darth.id
        objetoMapa = darthVader
        extraerAtaques(luchadorJugador)
        iniciarMapa()
    }else {
        alert ('tenes que seleccionar un personaje para poder avanzar')
    }
    enviarSeleccionadoBackend(luchadorJugador)
}
function enviarSeleccionadoBackend(luchadorJugador){
    fetch(`http://localhost:8080/starwars/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            luchador: luchadorJugador
        })
    })

}
function extraerAtaques(luchadorJugador){
    let elementos
    for (let i = 0; i < luchadores.length; i++){
        if(luchadorJugador == luchadores[i].nombre){
            elementos = luchadores[i].ataques
        }
    }
    mostrarAtaques(elementos)
}
function mostrarAtaques(elementos){
    elementos.forEach((elemento) =>{
        mostrarElementos = `
        <button id=${elemento.id} class="botonAtaques">${elemento.nombre}</button>
        `
        contenedorAtaques.innerHTML += mostrarElementos
    })
    botones = document.querySelectorAll('.botonAtaques')
    secuenciaAtaque()
}
function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener("click", (e)=>{
            if(e.target.textContent == "🗡"){
                ataquesEjecutados.push ("Sable")
                boton.style.background = "rgba(255,255,255, 0.527)"
                ataqueJugador = "Sable"
                boton.disabled = true
            }else if (e.target.textContent == "👋🏼"){
                ataquesEjecutados.push ("Elevar")
                boton.style.background = "rgba(255,255,255, 0.527)"
                ataqueJugador = "Elevar"
                boton.disabled = true
            }else if (e.target.textContent == "👉🏼" || e.target.textContent == "👉🏼" || e.target.textContent == "👉🏼"){
                ataquesEjecutados.push ("Blaster")
                boton.style.background = "rgba(255,255,255, 0.527)"
                ataqueJugador = "Blaster"
                boton.disabled = true
            }
            ataqueAleatorioPc()
        })
        
    })
}
function seleccionarPersonajePc(enemigo){
    spanPersonajePc.innerHTML = enemigo.nombre
    ataquesDelEnemigo = enemigo.ataques
    nombreDelEnemigo = enemigo.nombre
}
function ataqueAleatorioPc(){
    let atacaPc = aleatorio(0,ataquesDelEnemigo.length-1)
    if (nombreDelEnemigo == "Luke-Skywalker"){
        if(atacaPc == 0 || atacaPc == 1 || atacaPc == 2){
            ataquePc.push ("Sable")
        }else if(atacaPc == 3){
            ataquePc.push ("Elevar")
        }else{
            ataquePc.push ("Blaster")
        }
    }else if (nombreDelEnemigo == "Obi-Wan"){
        if(atacaPc == 0 || atacaPc == 1 || atacaPc == 2){
            ataquePc.push ("Sable")
        }
        else if(atacaPc == 3){
            ataquePc.push ("Elevar")
        }else{
            ataquePc.push ("Blaster")
        }
    }else if (nombreDelEnemigo == "Darth-Vader"){
        if(atacaPc == 0 || atacaPc == 1 || atacaPc == 2){
            ataquePc.push ("Sable")
        }
        else if(atacaPc == 3){
            ataquePc.push ("Elevar")
        }else{
            ataquePc.push ("Blaster")
        }
    }
    inicioCombate()
}
function inicioCombate(){
    if(ataquesEjecutados.length == cantidadDeAtaques){
        ganadorPerdedor()
    }
}
function ganadorPerdedor(){
    for (let i = 0; i < ataquesEjecutados.length; i++) {
        if (ataquesEjecutados[i]  == "Sable" && ataquePc[i] == "Blaster" || ataquesEjecutados[i]  == "Blaster" && ataquePc[i] == "Elevar"){
            victoriasJugador++
        }else if (ataquePc[i]  == "Sable" && ataquesEjecutados[i] == "Blaster" || ataquePc[i]  == "Blaster" && ataquesEjecutados[i] == "Elevar"){
            victoriasPc++
        }
    }
    crearMensaje()
    spanVictoriasPc.innerHTML = victoriasPc
    spanVictoriasJugador.innerHTML = victoriasJugador
    finDelJuego()
}
function crearMensaje(){
    if(ataquesEjecutados.length == 0){
        nuevoAtaqueJugador0.innerHTML = ''
        nuevoAtaqueJugador1.innerHTML = ''
        nuevoAtaqueJugador2.innerHTML = ''
        nuevoAtaqueJugador3.innerHTML = ''
        nuevoAtaqueJugador4.innerHTML = '' 
        nuevoAtaqueEnemigo0.innerHTML = ''
        nuevoAtaqueEnemigo1.innerHTML = ''
        nuevoAtaqueEnemigo2.innerHTML = ''
        nuevoAtaqueEnemigo3.innerHTML = ''
        nuevoAtaqueEnemigo4.innerHTML = ''
    }else{
        nuevoAtaqueJugador0.innerHTML = ataquesEjecutados[0]
        nuevoAtaqueJugador1.innerHTML = ataquesEjecutados[1] 
        nuevoAtaqueJugador2.innerHTML = ataquesEjecutados[2] 
        nuevoAtaqueJugador3.innerHTML = ataquesEjecutados[3] 
        nuevoAtaqueJugador4.innerHTML = ataquesEjecutados[4]  
        nuevoAtaqueEnemigo0.innerHTML = ataquePc[0]
        nuevoAtaqueEnemigo1.innerHTML = ataquePc[1]
        nuevoAtaqueEnemigo2.innerHTML = ataquePc[2]
        nuevoAtaqueEnemigo3.innerHTML = ataquePc[3]
        nuevoAtaqueEnemigo4.innerHTML = ataquePc[4]
    }
    sectionAtaqueJugador0.appendChild(nuevoAtaqueJugador0)
    sectionAtaqueJugador1.appendChild(nuevoAtaqueJugador1)
    sectionAtaqueJugador2.appendChild(nuevoAtaqueJugador2)
    sectionAtaqueJugador3.appendChild(nuevoAtaqueJugador3)
    sectionAtaqueJugador4.appendChild(nuevoAtaqueJugador4)
    sectionAtaqueEnemigo0.appendChild(nuevoAtaqueEnemigo0)
    sectionAtaqueEnemigo1.appendChild(nuevoAtaqueEnemigo1)
    sectionAtaqueEnemigo2.appendChild(nuevoAtaqueEnemigo2)
    sectionAtaqueEnemigo3.appendChild(nuevoAtaqueEnemigo3)
    sectionAtaqueEnemigo4.appendChild(nuevoAtaqueEnemigo4)
}
function finDelJuego(){
    if(victoriasJugador > victoriasPc){
        crearMensajeFinal("GANADO🎉🎉🎉")
    }else if (victoriasPc > victoriasJugador){
        crearMensajeFinal("PERDIDO 🥱😫🥱")
    }else{
        crearMensajeFinal("Empatado")
    }

}
function crearMensajeFinal(resultadoPartida){
    sectionMensajes.style.display = "none"
    sectionReiniciar.style.display = "flex"
    sectionMensajeFinal.style.display = "flex"
    parrafo.innerHTML = "Has " + resultadoPartida + " la partida" 
    sectionMensajeFinal.appendChild(parrafo)
}
function reiniciarJuego(){
    location.reload()
}
function siguienteJuego (){
    sectionSeleccionarAtaque.style.display = "none"
    areaCombate.style.display = "flex"
    sectionReiniciar.style.display = "none"
    sectionMensajes.style.display = "flex"
    sectionMensajeFinal.style.display = "none"
    contadorDePeleas = contadorDePeleas + 1
    pintarCanvas()
    detenerMovimiento()
    reactivarBotones()
    iniciarMapa()
    reiniciarSeccionAtaques()
}
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}
function pintarCanvas(){
    objetoMapa.x = objetoMapa.x + objetoMapa.velocidadX
    objetoMapa.y = objetoMapa.y + objetoMapa.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objetoMapa.pintarPersonaje()
    enviarPosicionAlBackend(objetoMapa.x, objetoMapa.y)
   /* if (objetoMapa.velocidadX !== 0 || objetoMapa.velocidadY !== 0){
        revisarColision(skywalkerEnemigo)
        revisarColision(kenobiEnemigo)
        revisarColision(darthVaderEnemigo)
    }*/
}
function enviarPosicionAlBackend(x,y){
    fetch(`http://localhost:8080/starwars/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    let posicionEnemigo = null
                    enemigos.forEach(function(enemigo){
                        const luchadorNombre = enemigo.luchadores.nombre || ""
                        if(luchadorNombre == "Luke-Skywalker"){
                            posicionEnemigo = new Dom ("Luke-Skywalker", "./personajes/enemigo/Luke-Skywalker.png", 5, "./personajes/enemigo/Luke-Skywalker.png")
                        }else if (luchadorNombre == "Obi-Wan"){
                            posicionEnemigo = new Dom("Obi-Wan", "./personajes/enemigo/obi-wan.png", 5, "./personajes/enemigo/obi-wan.png")
                        }else if (luchadorNombre == "Darth-Vader"){
                            posicionEnemigo = new Dom ("Darth-Vader", "./personajes/enemigo/Darth-Vader.png", 5, "./personajes/enemigo/Darth-Vader.png")
                        }
                        posicionEnemigo.x = enemigo.x
                        posicionEnemigo.y = enemigo.y
                        posicionEnemigo.pintarPersonaje()
                    })
                })
        }
    })
}
function moverPersonajeDerecha(){
    objetoMapa.velocidadX = 10
}
function moverPersonajeIzquierda(){
    objetoMapa.velocidadX = -10
}
function moverPersonajeArriba(){
    objetoMapa.velocidadY = -10
}
function moverPersonajeAbajo(){
    objetoMapa.velocidadY = 10
}
function detenerMovimiento(){
    objetoMapa.velocidadX = 0
    objetoMapa.velocidadY = 0
}
function analisisTecla(event){
    switch (event.key) {
        case 'ArrowRight':
            moverPersonajeDerecha()
            break
        case 'ArrowLeft':
            moverPersonajeIzquierda()
            break
        case 'ArrowDown':
            moverPersonajeAbajo()
            break
        case 'ArrowUp':
            moverPersonajeArriba()
            break
    
        default:
            break
    }
}
function iniciarMapa(){
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', analisisTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function revisarColision(enemigo){
    const extremoAltoEnemigo = enemigo.y
    const extremoBajoEnemigo = enemigo.y + enemigo.alto
    const extremoDerechoEnemigo = enemigo.x + enemigo.ancho
    const extremoIzquierdoEnemigo = enemigo.x
    const extremoBajoLuchador = objetoMapa.y + objetoMapa.alto
    const extremoAltoLuchador = objetoMapa.y
    const extremoDerechoLuchador = objetoMapa.x + objetoMapa.ancho
    const extremoIzquierdoLuchador = objetoMapa.x
    if(
        extremoBajoLuchador < extremoAltoEnemigo ||
        extremoAltoLuchador > extremoBajoEnemigo ||
        extremoDerechoLuchador < extremoIzquierdoEnemigo ||
        extremoIzquierdoLuchador > extremoDerechoEnemigo
    ){
        return
    }
    sectionMensajeFinal.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    areaCombate.style.display = "none"
    seleccionarPersonajePc(enemigo)
    clearInterval(intervalo)
    objetoMapa.x = mapa.width/20
    objetoMapa.y = mapa.height/20
}
function reactivarBotones(){
    botones.forEach((boton) => {
        boton.disabled = false
        if(boton.id == 'espada-luz-azul' || boton.id == 'elevar-azul' || boton.id ==  'blaster-azul'){
            boton.style.background = '#4942E4'
        }else if(boton.id == 'espada-luz-verde' || boton.id == 'elevar-verde' || boton.id ==  'blaster-verde' || boton.id == 'puños'){
            boton.style.background = 'rgba(1, 184, 1, 0.829)'
        }else if(boton.id == 'espada-luz-roja' || boton.id == 'elevar-rojo' || boton.id ==  'blaster-rojo'){
            boton.style.background = 'brown'
        }
        
    });
}
function reiniciarSeccionAtaques(){
    victoriasJugador = 0
    victoriasPc = 0
    spanVictoriasJugador.innerHTML = victoriasJugador
    spanVictoriasPc.innerHTML = victoriasPc
    let limpiarAtaquesEjecutados = ataquesEjecutados.length
    for (let index = 0; index < limpiarAtaquesEjecutados; index++) {
        ataquesEjecutados.shift()
        ataquePc.shift()
    }
    crearMensaje()
}
window.addEventListener('load', iniciarJuego)