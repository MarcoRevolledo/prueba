function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/api/inventarios/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#cantidadActual").val(item.cantidadActual)
        $("#fecha").val(item.fecha)
        $("#producto").val(item.idProducto.id)       
    })
}

//Cargar de manera automatica los datos registrados
function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/api/inventarios',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += "<tr class='table-success'><td><a href='#' onclick='findById(" + item.id + ")'>" + item.id + "</a></td><td>" + item.cantidadActual + "</td><td>" + item.fecha + "</td</tr>";
        })
        $("#tbSalidaDatos").html(registros);
        $("#id").val("");
        $("#cantidadActual").val("");
        $("#fecha").val("");
        $("#producto").val("0");


    })
}
//Cargar de manera automatica los datos regostrados
function loadProducto() {
    $.ajax({
        url: 'http://localhost:9000/api/inventarios',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        registros="<option id='producto' value='0'>--Seleccione el producto--</option>";
        items.forEach(function (item, index, array) {
            registros+="<option id='idProducto' value='"+item.id+"'>"+item.nombre+" "+item.apellido+"</option>";
            registros += "";
        }) 
        $("#producto").html(registros);            
    })
}

//Accion de adicionar un registro
$("#btnAdicionar").on('click', function () {
    $.ajax({
        url: 'http://localhost:9000/api/inventarios',
        data: JSON.stringify({
            cantidadActual: $("#cantidadActual").val(),
            fecha: $("#fecha").val(),
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTable();
    })
})

//Accion de modificar el registro que este seleccionado
$("#btnModificar").on('click', function () {
    $.ajax({
        url: 'http://localhost:9000/api/inventarios/' + $("#id").val(),
        data: JSON.stringify({
            cantidadActual: $("#cantidadActual").val(),
            fecha: $("#fecha").val(),

        }),
        method: "put",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTable();
    })
})

//Accion para eliminar un registro seleccionado 
$("#btnEliminar").on('click', function () {
    if (confirm("Está seguro de eliminar?")) {
        $.ajax({
            url: 'http://localhost:9000/api/usuarios/' + $("#id").val(),
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (result) {
            loadTable();
        })
    }
})

//Eveto cargar tabla
$(document).ready(function () {
    loadTable();
})