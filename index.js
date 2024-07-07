const express = require("express")
const cors = require ("cors")
const app = express ()
app.use(cors())
app.use(express.json())
const jugadores = []
class Jugador {
    constructor(id){
        this.id = id
    }
    asignarLuchador(luchadores){
        this.luchadores = luchadores
    }
    actualizarPosicion(x,y){
        this.x = x,
        this.y = y
    }
}
class classLuchadores {
    constructor (nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador (id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})
app.post("/starwars/:jugadorId", (req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.luchador || ""
    const luchador = new classLuchadores (nombre)
    const jugadorVerificado = jugadores.findIndex((jugador)=>jugadorId == jugador.id)
    if (jugadorVerificado >=0){
        jugadores[jugadorVerificado].asignarLuchador(luchador)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})
app.post("/starwars/:jugadorId/posicion", (req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || ""
    const y = req.body.y || ""
    const jugadorVerificado = jugadores.findIndex((jugador)=>jugadorId == jugador.id)
    if (jugadorVerificado >=0){
        jugadores[jugadorVerificado].actualizarPosicion(x,y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id)
    res.send({
        enemigos
    })
})
app.listen(8080, ()=> {
    console.log("Servidor Funcionando")
})