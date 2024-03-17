const Usuario=require("../modelos/usuario");
function socket(io){ //IO ES DE INPUT (OUTPUT)
    io.on("connection", async (socket) => {

    //MOSTRAR USUARIOS
    
    mostrarUsuarios();

    async function mostrarUsuarios(){
        const usuarios=await Usuario.find();
        io.emit("servidorEnviarUsuarios", usuarios); 
    }

    //GUARDAR USUARIOS

    socket.on("clienteGuardarUsuario", async (usuario)=>{
        console.log("Guardar usuario");
        console.log(usuario);
        try{
            await new Usuario(usuario).save();
            io.emit("ServidorUsuarioRegistrado", "Usuario registrado");
            mostrarUsuarios();
            console.log("Usuario guardado");
        }
        catch(err){
            console.log("Error al registrar al usuario"+err);
        }

    });

     //EDITAR UN USUARIO

     socket.on("clienteEditarUsuario", async (id) => {
        try {
            const usuario = await Usuario.findById(id);
            socket.emit("servidorEnviarDatosUsuario", usuario);
        } catch (error) {
            console.log("Error al obtener usuario para edición:", error);
        }
    });

    //ACTUALIZAR UN USUARIO

    socket.on("clienteActualizarUsuario", async (datosUsuario) => {
        const { id, datosActualizar } = datosUsuario;
        try {
            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, datosActualizar, { new: true });
            console.log("Usuario actualizado:", usuarioActualizado);
            io.emit("ServidorUsuarioActualizado", "Usuario actualizado");
            mostrarUsuarios(); //VUELVE A MOSTRAR LA LISTA DE USUARIOS DESPUES DE ACTUALIZAR UNO
        } catch (error) {
            console.log("Error al actualizar usuario:", error);
        }
    });

    //ELIMINAR UN USUARIO

        socket.on("clienteBorrarUsuario", async (id) => {
            try {
                await Usuario.findByIdAndDelete(id);
                console.log("Usuario eliminado:", id);
                io.emit("ServidorUsuarioBorrado", "Usuario borrado");
                mostrarUsuarios(); //VUELVE A MOSTRAR LA LISTA DE USUARIOS DESPUES DE ELIMINAR UNO
            } catch (error) {
                console.log("Error al borrar usuario:", error);
            }
        });
        
    }); //FIN IO (ON)
}
module.exports=socket;