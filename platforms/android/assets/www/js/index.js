var app = {
    // Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Agregando escuchadores
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Se dispara cuando el dispositivo ha terminado de cargar
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //habilitando 2do plano
                window.plugin.backgroundMode.enable();
         cordova.plugins.backgroundMode.setDefaults(
         {
            title:'DotRedes-DesafiandoRetos.',
            text:'Esta App funciona en segundo plano.'
         });
    },
    // Recibe el evento disparado y lo muestra en consola
    receivedEvent: function(id) {
       console.log('Evento recibido: ' + id);
    }
};
//inicializa la aplicaci�n
app.initialize();
$(document).ready(function(e) {
  $("div:jqmData(role='panel')").css('margin-top',  ($("div:jqmData(role='header')").height()));
});

function iniciarSesion(){
var usuario=$("#txt_usuario_login").prop("value");
var contrasena=$("#txt_contrasena_login").prop("value");
$.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/iniciar_sesion.php",{usuario:usuario,contrasena:contrasena},function(data){
    //validando
    if(data >= 1){
        //seteando variable de sesion
        window.localStorage.setItem("id_empleado",data);

        window.location ="inicio.html";
    }else{
        alert("Los datos introducidos son incorrectos");
    }
});
}

function cerrarSesion()
{

    /*swal({

            title: "atencion",
            text: "Al cerrar sesion se detendra el envio de ubicacion y otras funciones",
            showCancelButton: true,
            confirmButtonColor: "#086A87",
            type:'warning',
            confirmButtonText: "Cerrar sesion",
            closeOnConfirm: false },
            function(){
                //detener segundo plano e hilo decoordenadas
                window.plugin.backgroundMode.disable();
                window.localStorage.clear();
                window.location ="index.html";

            });*/
            swal("Oops!!","Esta funcion no esta disponible por el momento");

}

function buscarActualizacion(version)
{
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_version.php",{},function(data){
        if(data > 2 ){// la versión se controla desde aquí
        swal({
        title: "Nueva version encontrada",
        text: "Descargar nueva version?",
        showCancelButton: true,
        confirmButtonColor: "#086A87",
        confirmButtonText: "Descargar",
        closeOnConfirm: false },
        function(){
        swal("","La descarga comenzara en un momento", "success");
        navigator.app.loadUrl("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/DotRedes.apk", { openExternal:true });
        });
        }else{
            swal("","No hay actualizaciones disponibles","error");
        }
    });
}

function getLocation(location){
$(".received").html("Lat: "+location.coords.latitude+"<br>Lon"+location.coords.longitude);
$.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/update_geolocalizacion.php",
{
id_empleado:window.localStorage.getItem("id_empleado"),
lat:location.coords.latitude,
lon:location.coords.longitude
},function(data){
console.log(data);
});
}
function onError(error){
$(".received").html("Ha ocurrido un error");
}

function loadUbicacion()
{
    window.location ="ubicacion.html";
}
