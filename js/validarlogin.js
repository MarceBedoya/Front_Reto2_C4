

function ingresar() {
    //capturar los datos que ingreso el usuario en la pagina
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email);
    console.log(password);

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        //url: "http://localhost:8080/api/user/"+ email + "/" + password,
        url: "http://144.22.59.33:8080/api/user/" + email + "/" + password,
        //tipo de peticion
        type: 'GET',

        //tipo de contenido
        dataType: 'json',

        //envio datos capturados por el usuario a la peticion

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {

            resultado(respuesta)
        },

    });
}

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */
function resultado(respuesta) {
    let id = respuesta.id
    let nombre = respuesta.name

    if (id == null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " " + nombre)

}
