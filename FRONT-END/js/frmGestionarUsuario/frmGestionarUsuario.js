function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/api/usuarios/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        // $("#codigo").val(item.codigo)
        $("#correo").val(item.correo) 
        $("#nombre").val(item.nombre)
        $("#identificacion").val(item.identificacion) 
        $("#apellido").val(item.apellidos)
        $("#contrasena").val(item.clave)
        $("#rol").val(item.rol)       
    })
}

//Cargar de manera automatica los datos registrados
function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/api/usuarios',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += "<tr class='table-success'><td><a href='#' onclick='findById(" + item.id + ")'>" + item.id + "</a></td><td>" + item.correo + "</td><td>" + item.nombre + 
                         "</td><td>" + item.identificacion + "</td><td>" + item.apellido + "</td></td>" + item.contrasena + "</td></td>" + item.rol + "</td></tr>";
        })
        $("#tbSalidaDatos").html(registros);
        $("#id").val("");
        // $("#codigo").val("");
        $("#correo").val("");
        $("#nombre").val("");
        $("#identificacion").val("");
        $("#apellido").val("");
        $("#contrasena").val("");
        $("#rol").val("");        
    })
}

//Accion de adicionar un registro
$("#btnAdicionar").on('click', function () {
    $.ajax({
        url: 'http://localhost:9000/api/usuarios',
        data: JSON.stringify({
            // // codigo: $("#codigo").val(),
            correo: $("#correo").val(),
            nombre: $("#nombre").val(),
            identificacion: $("#identificacion").val(),
            apellido: $("#apeliido").val(),
            contrasena: $("#clave").val(),
            rol: $("#rol").val()
     
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
        url: 'http://localhost:9000/api/usuarios/' + $("#id").val(),
        data: JSON.stringify({
            // // codigo: $("#codigo").val(),
            correo: $("#correo").val(),
            nombre: $("#nombre").val(),
            identificacion: $("#identificacion").val(),
            apellido: $("#apeliido").val(),
            contrasena: $("#clave").val(),
            rol: $("#rol").val()
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