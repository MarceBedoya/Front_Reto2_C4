function traerInformacionProductos() {
    console.log("test");
    $.ajax({
        url: "http://144.22.59.33:8080/api/cleaningprod/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>MARCA</td>";
    myTable += "<td>CATEGORIA</td>";
    myTable += "<td>PRESENTACIÓN</td>";
    myTable += "<td>DESCRIPCIÓN</td>";
    myTable += "<td>PRICE</td>";
    myTable += "<td>DISPONIBILIDAD</td>";
    myTable += "<td>CANTIDAD</td>";
    myTable += "<td>FOTOGRAFÍA</td>";
    "</tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].category + "</td>";
        myTable += "<td>" + respuesta[i].presentation + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].price + "</td>";
        myTable += "<td>" + respuesta[i].availability + "</td>";
        myTable += "<td>" + respuesta[i].quantity + "</td>";
        myTable += "<td>" + respuesta[i].photography + "</td>";
        myTable += "<td> <button onclick=' actualizar(" + respuesta[i].id + ")'>Actualizar</button></td>";
        myTable += '<td> <button onclick="cargarDatosProductos(' + respuesta[i].id + ')">Editar</button></td>';
        myTable += "<td> <button onclick='borrarProducto(" + respuesta[i].id + ")'>Borrar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);
}


function guardarInformacionProductos() {

    if ($("#Pbrand").val().length == 0 || $("#Pcategory").val().length == 0 || $("#Ppresentation").val().length == 0
        || $("#Pdescription").val().length == 0 || $("#Pprice").val().length == 0 || $("#Pavailability").val().length == 0
        || $("#Pquantity").val().length == 0 || $("#Pphotography").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {

        let var2 = {
            brand: $("#Pbrand").val(),
            category: $("#Pcategory").val(),
            presentation: $("#Ppresentation").val(),
            description: $("#Pdescription").val(),
            price: $("#Pprice").val(),
            availability: $("#Pavailability").val(),
            quantity: $("#Pquantity").val(),
            photography: $("#Pphotography").val()

        }
        $.ajax({
            url: "http://144.22.59.33:8080/api/cleaningprod/new",
            data: JSON.stringify(var2),
            type: "POST",
            contentType: "application/json",


            success: function (respues) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log(respues);
                alert("Se guardo correctamente");
                window.location.reload()



            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });

    }
}



function cargarDatosProductos(id) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.59.33:8080/api/cleaningprod/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#Pbrand").val(item.brand);
            $("#Pcategory").val(item.category);
            $("#Ppresentation").val(item.presentation);
            $("#Pdescription").val(item.description);
            $("#Pprice").val(item.price);
            $("#Pquantity").val(item.quantity);
            $("#Pphotography").val(item.photography);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}





function actualizar(idElemento) {

    if ($("#Pbrand").val().length == 0 || $("#Pcategory").val().length == 0 || $("#Ppresentation").val().length == 0
        || $("#Pdescription").val().length == 0 || $("#Pprice").val().length == 0 || $("#Pavailability").val().length == 0
        || $("#Pquantity").val().length == 0 || $("#Pphotography").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let elemento = {
            id: idElemento,
            brand: $("#Pbrand").val(),
            category: $("#Pcategory").val(),
            presentation: $("#Ppresentation").val(),
            description: $("#Pdescription").val(),
            price: $("#Pprice").val(),
            availability: $("#Pavailability").val(),
            quantity: $("#Pquantity").val(),
            photography: $("#Pphotography").val()
        };

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            url: "http://144.22.59.33:8080/api/cleaningprod/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado").empty();
                $("#id").val("");
                $("#Pbrand").val("");
                $("#Pcategory").val("");
                $("#Ppresentation").val("");
                $("#Pdescription").val("");
                $("#Pprice").val("");
                $("#Pavailability").val("");
                $("#Pquantity").val("");
                $("#Pphotography").val("")
                traerInformacionProductos();
                alert("Se guardo correctamente");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


function borrarProducto(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.59.33:8080/api/cleaningprod/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionProductos();
            alert("Se ha Eliminado.")
        }
    });

}


