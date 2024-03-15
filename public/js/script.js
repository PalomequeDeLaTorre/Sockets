const socket = io();

var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");

//MOSTRAR DATOS DE MONGODB
socket.on("servidorEnviarUsuarios",(usuarios)=>{
    var tr = "";
    usuarios.forEach((usuario, idLocal) => {
        tr = tr + `
         <tr>
             <td>${(idLocal+1)*100}</td>
             <td>${usuario.nombre}</td>
             <td>${usuario.usuario}</td>
             <td>${usuario.password}</td>

             <td>
                 <a href="#" onClick="editarUsuario('${usuario._id}')">Editar</a> /
                 <a href="#" onClick="borrarUsuario('${usuario._id}')">Editar</a>
             </td>
         </tr>

        `;
        
    });

    datos.innerHTML=tr;

});

//GUARDAR DATOS A MONGODB


var enviarDatos = document.getElementById("enviarDatos");

enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();

    //RECIBIR LOS DATOS DEL FORMULARIO
    var usuario={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value,

    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorEnviarUsuarios", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML=mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML="";

        }, 3000);

        //REINICIAR EL FORMULARIO
        document.getElementById("nombre").value="";
        document.getElementById("usuario").value="";
        document.getElementById("password").value="";
        document.getElementById("nombre").focus();

    });
   
});


//MODIFICAR UN REGISTRO DE MONGODB

function editarUsuario(id){
    console.log(id);
}
//ELIMINAR UN REGISTRO DE MONGODB

function borrarUsuario(id){
    console.log(id);
}