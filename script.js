class Pelota {
    constructor(parent, x, y, color, diametro, texto) {
        this.x = x
        this.y = y
        this.color = color
        this.diametro = diametro < 200 ? diametro : 200
        this.texto = texto
        this.crearEnDom(parent)
    }

    crearEnDom(parent) {
        if (this.div) return;
        this.div = document.createElement("div")
        this.div.classList.add("pelota")
        this.div.innerHTML = `<p style="font-size:${Math.floor(this.diametro / 5) + "px"}">${this.texto}</p>`

        // agregar las propiedades del objeto
        this.div.style.left = this.x + "px"
        this.div.style.top = this.y + "px"
        this.div.style.backgroundColor = this.color
        this.div.style.width = this.diametro + "px"

        parent.appendChild(this.div)
    }
}

class Jugador extends Pelota {
    constructor(parent, texto) {
        super(parent, 100, 100, "gray", 100, texto)
        this.speed = 10
        this.div.style.color = "white"
        this.selected = false
        this.addEvents()
    }
    addEvents() {
        // detectar click
        this.div.addEventListener("click", () => {
            this.selected = !this.selected
            this.div.style.border = this.selected ? "5px solid red" : "none"
        })

        // detectar flechas
        window.addEventListener("keydown", (e) => {
            if (!this.selected) return;
            const tecla = e.key;
            switch (tecla) {
                case "ArrowRight":
                    this.div.style.left = parseInt(this.div.style.left) + this.speed + "px";
                    break;
                case "ArrowUp":
                    this.div.style.top = parseInt(this.div.style.top) - this.speed + "px";
                    break;
                case "ArrowDown":
                    this.div.style.top = parseInt(this.div.style.top) + this.speed + "px";
                    break;
                case "ArrowLeft":
                    this.div.style.left = parseInt(this.div.style.left) - this.speed + "px";
                    break;
                default:
                    console.log("la tecla que apretaste fue", tecla);
            }
        })
    }

}

class PelotaNombre extends Pelota {
    constructor(parent, x, y, color, diametro, texto) {
        super(parent, x, y, color, diametro, texto)
        this.selected = false
        this.addEvents()
    }
    addEvents() {
        // detectar click
        this.div.addEventListener("click", () => {
            if ((ultimaApretada) && (ultimaApretada.texto == this.texto) && (ultimaApretada !== this)) {
                this.div.style.display = "none"
                ultimaApretada.div.style.display = "none"
                sumarPuntos(1)
            } else if (ultimaApretada) {
                sumarPuntos(-1)
            }

            this.selected = !this.selected
            this.div.style.border = this.selected ? "5px solid red" : "1px solid black"

            if (ultimaApretada) {
                ultimaApretada.deselect()
                this.deselect()
                ultimaApretada = undefined
            } else {
                ultimaApretada = this
            }

        })
    }
    deselect() {
        this.selected = false
        this.div.style.border = this.selected ? "5px solid red" : "1px solid black"
    }
}

pelotero = document.querySelector("#pelotero")
ultimaApretada = undefined
inicio = new Date()

function sumarPuntos(n) {
    span_puntos = document.querySelector("#puntos")
    span_puntos.innerHTML = Number(span_puntos.innerHTML) + n
}

function randColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgb(${r},${g},${b})`
}

function timer() {
    tiempo_transcurrido = new Date - inicio
    document.querySelector("#tiempo").innerHTML = `${Math.floor((tiempo_transcurrido / 1000 / 60) % 60)}:${Math.floor((tiempo_transcurrido / 1000) % 60)}:${tiempo_transcurrido % 1000}`

    setTimeout(timer, 1)
}


window.addEventListener("load", () => {
    timer()
})

let nombres = [
    "Ana", "Carlos", "María", "Juan", "Sofía", "Pedro", "Laura", "Miguel", "Julia", "Jorge",
    "Lucía", "Fernando", "Elena", "Raúl", "Cristina", "David", "Sara", "Pablo", "Gabriela", "Diego",
    "Valeria", "Luis", "Natalia", "Alberto", "Andrea", "Javier", "Patricia", "Manuel", "Isabel", "Ricardo",
    "Alejandra", "Santiago", "Daniela", "Enrique", "Victoria", "Hugo", "Paula", "Francisco", "Claudia", "Tomás",
    "Rosa", "Mario", "Teresa", "Felipe", "Verónica", "Álvaro", "Adriana", "Iván", "Carmen", "Rubén",
    "Esther", "Oscar", "Marta", "Emilio", "Eva", "Nicolás", "Blanca", "Gonzalo", "Inés", "Jesús",
    "Irene", "Marcos", "Silvia", "Samuel", "Alicia", "Ignacio", "Beatriz", "Matías", "Carolina", "Ángel",
    "Lorena", "Rafael", "Gloria", "Sergio", "Elsa", "Roberto", "Monica", "Vicente", "Olga", "Jaime",
    "Bárbara", "Esteban", "Lidia", "Alonso", "Celia", "Eugenio", "Nuria", "Julio", "Marina", "Joaquín",
    "Rocío", "Agustín", "Carla", "Víctor", "Pilar", "Rodrigo", "Luz", "Ramón", "Berta", "Mariano", "Ana"
].flatMap((nombre) => { return [nombre, nombre] })

for (i of nombres) {
    const x = (Math.random() * window.innerWidth) - 100
    const y = (Math.random() * window.innerHeight) - 100
    const color = randColor()
    const diametro = (Math.random() * 200) + 20
    // const nombre = nombres[Math.floor(Math.random() * nombres.length)]
    const nombre = i

    new PelotaNombre(pelotero, x, y, color, diametro, nombre)
}

