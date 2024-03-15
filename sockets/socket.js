const Usuario=require("../modelos/usuario");
function socket(io){ //io es de input , output
    io.on("connection",(socket)=>{
    //MOSTRAR USUARIOS
    mostrarUsuarios();
    async function mostrarUsuarios(){
        const usuarios=await Usuario.find();
        io.emit("ServidorEnviarUsuarios", usuarios);
        
       }

    //GUARDAR USUARIOS
    socket.on("clienteGuardarUsuario", async (usuario)=>{
        console.log("Guardar usuario");
        console.log(usuario);
        try{
            await new Usuario(usuario).save();
            io.emit("ServidorUsuarioGuardado","Usuario guardado");
            console.log("Usuario guardado");
        }
        catch(err){
            console.log("Error al registrar al usuario"+err);
        }

    });

        
    }); //FIN IO.ON
}
module.exports=socket;