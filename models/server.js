// servidor express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');


const Sockets = require('./socket');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;// 8081;
        // HTTP server
        this.server = http.createServer(this.app)
        // configuracion del socket server
        this.io = socketIo(this.server,{/*configuraciones*/});
    }

    middlewares(){
        // Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname,'../public')));
    }
    configurarSockets(){
        new Sockets(this.io);
    }

    start(){
        // Inicializar middlewares
        this.middlewares();
        // Inicializar Sockets
        this.configurarSockets();
        // Inicializar Server
        this.server.listen(this.port,()=>{
            console.log(`Server corriendo en el puerto: ${this.port}`);
        });
    }

}

module.exports = Server