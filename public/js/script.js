const socket = io();

var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");

//MOSTRAR DATOS DE MONGODB

socket.on("servidorEnviarUsuarios", (usuarios) => {
    var tr = "";
    usuarios.forEach((usuario, idLocal) => {
        tr += `
         <tr>
             <td>${(idLocal + 1) * 100}</td>
             <td>${usuario.nombre}</td>
             <td>${usuario.usuario}</td>
             <td>${usuario.password}</td>

             <td>
                 <a href="#" onClick="editarUsuario('${usuario._id}')">Editar</a> /
                 <a href="#" onClick="borrarUsuario('${usuario._id}')">Borrar</a>
             </td>
         </tr>
        `;
    });

    datos.innerHTML = tr;
});


//GUARDAR DATOS A MONGODB

var enviarDatos = document.getElementById("enviarDatos");

enviarDatos.addEventListener("submit", (e) => {
    e.preventDefault();

    //RECIBIR LOS DATOS DEL FORMULARIO

    var usuario = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };
    socket.emit("clienteGuardarUsuario", usuario);

    //MUESTRA MENSAJE DE USUARIO REGISTRADO

    socket.on("ServidorUsuarioRegistrado", (mensaje) => {
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 3000);

        //REINICIAR EL FORMULARIO

        document.getElementById("nombre").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("password").value = "";
        document.getElementById("nombre").focus();
    });
});


//MODIFICAR UN REGISTRO DE MONGODB

function editarUsuario(id) {
    socket.emit("clienteEditarUsuario", id);
}

//ELIMINAR UN REGISTRO DE MONGODB

function borrarUsuario(id) {
    socket.emit("clienteBorrarUsuario", id);
}

 //MUESTRA MENSAJE DE USUARIO BORRADO

socket.on("ServidorUsuarioBorrado", (mensaje) => {
    console.log(mensaje);
    mensajeDiv.innerHTML = mensaje;
    setTimeout(() => {
        mensajeDiv.innerHTML = "";
    }, 3000);
});


//RECIBIR DATOS DEL USUARIO PARA EDITAR
socket.on("servidorEnviarDatosUsuario", (usuario) => {
    document.getElementById("editId").value = usuario._id;
    document.getElementById("editNombre").value = usuario.nombre;
    document.getElementById("editUsuario").value = usuario.usuario;
    document.getElementById("editPassword").value = usuario.password;

    document.getElementById("enviarDatos").style.display = "none";
    document.getElementById("editarDatos").style.display = "block";
});

// BOTÓN DE CANCELAR EN EL FORMULARIO DE EDITAR 

document.getElementById("cancelarEdicion").addEventListener("click", () => {
    document.getElementById("editarDatos").style.display = "none";
    document.getElementById("enviarDatos").style.display = "block";
});

// ACTUALIZAR UN USUARIO 

var editarDatos = document.getElementById("editarDatos");

editarDatos.addEventListener("submit", (e) => {
    e.preventDefault();

    var usuario = {
        id: document.getElementById("editId").value,
        datosActualizar: {
            nombre: document.getElementById("editNombre").value,
            usuario: document.getElementById("editUsuario").value,
            password: document.getElementById("editPassword").value,
        },
    };

    socket.emit("clienteActualizarUsuario", usuario);

    //MUESTRA MENSAJE DE USUARIO ACTUALIZADO

    socket.on("ServidorUsuarioActualizado", (mensaje) => {
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 3000);
    });
    

    // RENICIAR EL FORMULARIO 

    document.getElementById("editarDatos").reset();
    document.getElementById("enviarDatos").style.display = "block";
    document.getElementById("editarDatos").style.display = "none";
});
