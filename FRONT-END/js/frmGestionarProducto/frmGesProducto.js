function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/api/productos/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#nombre").val(item.nombre)
        $("#cantidad").val(item.cantidad) 
        // $("#referencia").val(item.referencia)
        $("#nrolote").val(item.nrolote)
        $("#descripcion").val(item.descripcion)
        $("#prccompra").val(item.prccompra)        
        $("#prcventa").val(item.prcventa)  
        $("#categoria").val(item.categoria)        
    })
}

//Cargar de manera automatica los datos registrados
function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/api/productos',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += "<tr class='table-success'><td><a href='#' onclick='findById(" + item.id + ")'>" + item.id + "</a></td><td>" + item.nombre + "</td><td>" + item.cantidad + "</td></td>" + item.nrolote + "</td><td>" + item.descripcion + "</td><td>" + item.prccompra + "</td></td>" + item.prcventa + "</td></td>"+ "</td></td>" + item.categoria + "</td></tr>";
        })
        $("#tbSalidaDatos").html(registros);
        $("#id").val("");
        $("#nombre").val("");
        $("#cantidad").val("");
        // $("#referencia").val("");
        $("#nrolote").val("");
        $("#descripcion").val("");
        $("#prccompra").val("");
        $("#prcventa").val("");
        $("#categoria").val("");
        
    })
}

//Accion de adicionar un registro
$("#btnAdicionar").on('click', function () {
    $.ajax({
        url: 'http://localhost:9000/api/productos',
        data: JSON.stringify({
            nombre: $("#nombre").val(),
            cantidad: $("#cantidad").val(),
            // // referencia: $("#referencia").val(),
            nrolote: $("#nrolote").val(),
            descripcion: $("#descripcion").val(),
            prccompra: $("#prccompra").val(),
            prcventa: $("#prcventa").val(),
            categoria: $("#categoria").val()
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
        url: 'http://localhost:9000/api/productos/' + $("#id").val(),
        data: JSON.stringify({
            nombre: $("#nombre").val(),
            cantidad: $("#cantidad").val(),
            // // referencia: $("#referencia").val(),
            nrolote: $("#nrolote").val(),
            descripcion: $("#descripcion").val(),
            prccompra: $("#prccompra").val(),
            prcventa: $("#prcventa").val(),
            categoria: $("#categoria").val()
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
            url: 'http://localhost:9000/api/productos/' + $("#id").val(),
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