function saveUser() {
    const expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if ($("#id").val().length == 0 || $("#identification").val().length == 0 || $("#name").val().length == 0 || $("#address").val().length == 0
        || $("#cellPhone").val().length == 0 || $("#email").val().length == 0 || $("#password").val().length == 0 || $("#zone").val().length == 0
        || $("#type").val().length == 0) {
        alert("Todos los campos son obligatorios")




    } if (expReg.test(email.value) == false) {
        alert("Escribir un correo valido")
        email.focus()
        return 0;
    } else {

        let data = {
            id: $("#id").val(),
            identification: $("#identification").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            cellPhone: $("#cellPhone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            zone: $("#zone").val(),
            type: $("#type").val()
        }
        $.ajax({
            url: "http://144.22.59.33:8080/api/user/new",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json",

            error: function (result) {
                alert("Usuario no registrador..!");
                console.log(result);
            },
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log(respuesta);
                resultado(respuesta)
                $("#userForm").trigger("reset");

            },
        });

    }
}

function resultado(respuesta) {
    let id = respuesta.id
    let nombre = respuesta.name

    if (id == null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " " + nombre)

}

function getUser() {
    $.ajax({
        url: "http://144.22.59.33:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListUser(response);
        }
    });
}

function printListUser(response) {
    let myTable = "<table>"
    myTable += "<tr>";
    myTable += "<td>Identificación</td>";
    myTable += "<td>Nombre</td>";
    myTable += "<td>Direccion</td>";
    myTable += "<td>Telefono</td>";
    myTable += "<td>Correo</td>";
    myTable += "<td>Contraseña</td>";
    myTable += "<td>Zona</td>";
    myTable += "<td>Tipo</td>";
    "</tr>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].identification + "</td>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].address + "</td>";
        myTable += "<td>" + response[i].cellPhone + "</td>";
        myTable += "<td>" + response[i].email + "</td>";
        myTable += "<td>" + response[i].password + "</td>";
        myTable += "<td>" + response[i].zone + "</td>";
        myTable += "<td>" + response[i].type + "</td>";
        myTable += '<td><button class = "btn m-2 btn-dark btn-md" onclick="borrar(' + response[i].id + ')">Borrar producto</button></td>';
        myTable += '<td><button class = "btn m-2 btn-dark btn-md" onclick="updateData(' + response[i].id + ')">Actualizar producto</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#myListUser").html(myTable);
}

function borrar(idUser) {
    var element = {
        id: idUser
    }
    /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://144.22.59.33:8080/api/user/" + idUser,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function (response) {
            console.log(response);
            $("#myListUser").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}


function updateData() {

    const expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (expReg.test(email.value) == false) {
        alert("Escribir un correo valido")
        email.focus()
        return 0;
    } else {
        let element = {
            id: $("#id").val(),
            identification: $("#identification").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            cellPhone: $("#cellphone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            zone: $("#zone").val(),
            type: $("#type").val()
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://144.22.59.33:8080/api/user/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#myListUser").empty();
                getUser();
                alert("se ha Actualizado Correctamente!")
                $("#userForm").trigger("reset");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }


        });
    }
}
