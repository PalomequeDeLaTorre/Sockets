function socket(io){ //io es de input , output
    io.on("connection",(socket)=>{
        io.emit("saludo","Hola soy el servidor"); //para servidor
        socket.on("nombre",(nombre)=>{
            //console.log("Hola "+nombre);
            var saludo="Hola " + nombre;
            io.emit("saludo", saludo);
        });
    });
}
module.exports=socket;