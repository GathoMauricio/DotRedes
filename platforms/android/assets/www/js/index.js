var expediente_photo="TeSt";
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
    console.log(navigator.camera);
     pictureSource = navigator.camera.PictureSourceType;
     destinationType = navigator.camera.DestinationType;
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_expedientes.php",{
                id_empleado:window.localStorage.getItem("id_empleado")
                },function(data){
                    $("#contenedor_servicios").html(data);

                });


        //Mensajes push
        /*if(PushbotsPlugin.isAndroid()){
        //Clave api  AIzaSyCUOSdX9DITxbKfg0LzoOLuy__UpZVnX20

            PushbotsPlugin.initializeAndroid("55de92ce17795950558b4569", "13352094760");

        }*/
                window.plugin.backgroundMode.enable();
         cordova.plugins.backgroundMode.setDefaults(
        //habilitando 2do plano
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
if(hayConexion())
{


var usuario=$("#txt_usuario_login").prop("value");
var contrasena=$("#txt_contrasena_login").prop("value");
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/iniciar_sesion.php",{usuario:usuario,contrasena:contrasena},function(data){
        //validando
        if(data >= 1){
            //seteando variable de sesion
            window.localStorage.setItem("id_empleado",data);

            loadInicio();
        }else{
            alert("Los datos introducidos son incorrectos");
        }
    });
}
}
// Solo permite ingresar numeros.
function soloNumeros(evt){
	evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        status = "This field accepts numbers only."
        return false
    }
    status = ""
    return true
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
        if(data > 9 ){// la versión se controla desde aquí
        //vibrando y reproduciendo notificación
        navigator.notification.vibrate(1000)
        $("audio").trigger("play");
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
            //swal("","No hay actualizaciones disponibles","error");
            console.log("No hay actualizaciones disponibles");
        }
    });

}

function getLocation(location){
$(".received").html("Lat: "+location.coords.latitude+"<br>Lon"+location.coords.longitude);
$.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/update_geolocalizacion.php",
{
id_empleado:window.localStorage.getItem("id_empleado"),
lat:location.coords.latitude,
lon:location.coords.longitude,
aprox:location.coords.accuracy
},function(data){
console.log(data);
});
}
function onError(error){
$(".received").html("Ha ocurrido un error");
}
function loadInicio()
{
    if(hayConexion())
        window.location ="inicio.html";
    else swal("El dispositivo no esta conectado a internet!!!","Por favor revisa que tengas una conexion activa e intenta de nuevo.","error");
}
function loadUbicacion()
{
   if(hayConexion())
    window.location ="ubicacion.html";
    else swal("El dispositivo no esta conectado a internet!!!","Por favor revisa que tengas una conexion activa e intenta de nuevo.","error");
}
function hayConexion() {
    var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
    if(states[networkState]=='No network connection')
    {
        return false;
    }else
    {
        return true;
    }
}
function cambiarEstatus(expediente,estatus)
{
    switch(estatus){
        case 1:
            swal(
            					{
            						title: "Está a punto de cambiar el estatus a 'Pendiente' ",
            						text: "",
            						type: "warning",
            						showCancelButton: true,
            						confirmButtonColor: "#F78181",
            						confirmButtonText: "Aceptar",
            						cancelButtonText: "Cancelar",
            						closeOnConfirm: false
            					},
            					function()
            					{
            							$.post("http://dotredes.dyndns.biz:18888/dot_izzi/control/cambiar_estatus.php",{
            								estatus:estatus,
            								expediente:expediente,
            								solucion:""
            							},function(data)
            								{
            								$.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_caja.php",{id_expediente:expediente},function(data){

            								$("#caja_"+expediente).html(data);
            								swal("El cambio se realizó con éxito.","","success");
            								});
            							});
            					});
            break;
        case 2:

            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/validar_estatus_anterior.php",{
            id_empleado:window.localStorage.getItem("id_empleado"),
            id_expediente:expediente
            },function(data){
                //si data es mayor q 0 osea 1 significa q el expediente anterior ya esta cerrado OK
                //en caso de ser el primer expediente y lo exista un anterior regresa un Warning cuyo tamaño es mayor de 10
                //asi se sabe q no encontró el indice anterior por lo tanto es el primer expediente de este técnico
                if(data > 0 || data.length>10)
                {
                    swal(
                                  {
                                     title: "Está a punto de cambiar el estatus a 'En proceso' ",
                                     text: "",
                                     type: "warning",
                                     showCancelButton: true,
                                     confirmButtonColor: "#FE642E",
                                     confirmButtonText: "Aceptar",
                                     cancelButtonText: "Cancelar",
                                     closeOnConfirm: false
                                   },
                                     function()
                                     {
                                        $.post("http://dotredes.dyndns.biz:18888/dot_izzi/control/cambiar_estatus.php",
                                        {
                                            estatus:estatus,
                                            expediente:expediente,
                                            solucion:""
                                        },function(data)
                                          {
                                            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_caja.php",{id_expediente:expediente},function(data){
                                            $("#caja_"+expediente).html(data);
                                            swal("El cambio se realizó con éxito.","","success");
                                          });
                                            });
                                    });
                }else{
                    swal("Alto!!!","No has cerrado el expediente anterior","error");
                 }
            });

            break;
        case 3:
            validaEncuesta(expediente);
            break;
    }
}

function validaEncuesta(expediente)
{

    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/valida_encuesta.php",{expediente:expediente},function(data){
        //alert("ENCUESTA "+data);
        if( data < 2 ){
            swal("Alto!!!","Falta contestar la encuesta","error");
        }else{
            validaFirma(expediente);

        }


    });


}
function validaFirma(expediente)
{

    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/valida_firma.php",{expediente:expediente},function(data){
        //alert("FIRMA"+data)
        if( data.length <= 0 ){
            swal("Alto","Falta la firma del usuario","error");
        }else{
            validaAdjunto(expediente,3);
        }
    });

}
function validaAdjunto(expediente,estatus)
{
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/valida_adjunto.php",{expediente:expediente},function(data){
            //alert("adjunto "+data);
            if(data <= 0)
            {
                swal("Alto","No has adjuntado ninguna imagen","error");
            }else{
                swal(
                     {
                     title: "Está a punto de cambiar el estatus a 'Finalizado' ",
                     text: "",
                     type: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#2EFE64",
                     confirmButtonText: "Aceptar",
                     cancelButtonText: "Cancelar",
                     closeOnConfirm: false
                     },
                    function()
                    {
                     var diagnostico=$("#txt_diagnostico_"+expediente).prop("value");
                      $.post("http://dotredes.dyndns.biz:18888/dot_izzi/control/cambiar_estatus.php",{
                      estatus:estatus,
                      expediente:expediente,
                      solucion:diagnostico
                      },function(data)
                      {
                      $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_caja.php",{id_expediente:expediente},function(data){
                       $("#caja_"+expediente).html(data);
                         swal("El cambio se realizó con éxito.","","success");
                        });
                       });
                      });
                }
    });
}
function comentar(expediente)
{
    swal({
    title: "Comentar!",
    text: "Escribe algo a cerca de este servicio:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Ingresa el texto" },
    function(inputValue){
    if (inputValue === false) return false;
    if (inputValue === "") {
    swal.showInputError("El campo no debe estár vacio!");
    return false   }
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/control/agregar_comentario.php",{
        id_empleado:window.localStorage.getItem("id_empleado"),
        id_expediente:expediente,
        comentario:inputValue
    },function(data){
        $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_caja.php",{id_expediente:expediente},function(data){
           $("#caja_"+expediente).html(data);
           swal("OK!", "Tu comentario se ha insertado con éxito", "success"); });
           });
     });



}

function buscarFecha()
{
   var fecha = $("#txt_buscar_fecha").prop("value");
   $("#div_buscar").hide();
   isBuscar=false;
    if(fecha.length>0)
    {
        if(hayConexion)
        {
            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_expedientes_fecha.php",{
            id_empleado:window.localStorage.getItem("id_empleado"),
            fecha:fecha
            },function(data){

                if(data.length>0)
                $("#contenedor_servicios").html(data);
                else swal("Oops!","No se encontraron expedientes para esta fecha","warning");
            });
        }
    }
}
function buscarExpediente()
{
    var expediente = $("#txt_buscar_expediente").prop("value");
    $("#div_buscar").hide();
    isBuscar=false;
    if(expediente.length>0)
        {
            //if(hayConexion)
            //{
                $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_expedientes_expediente.php",{
                id_empleado:window.localStorage.getItem("id_empleado"),
                expediente:expediente
                },function(data){

                    if(data.length>0)
                    {
                        $("#contenedor_servicios").html(data);
                        $("#txt_buscar_expediente").prop("value","");
                    }else
                    {
                        swal("El expediente solicitado no existe","Favor de verificar el número de expediente","warning");
                        $("#txt_buscar_expediente").prop("value","");
                    }

                });
            //}
        }
}

function abrirMapa(lat,lon)
{
    if(lat==0&&lon==0)
    {
        swal("Oops!!!","El usuario no ha confirmado aun su posición","warning");
    }else{
        window.location="geo:"+lat+","+lon+"?q="+lat+","+lon+"(Servicio)";
    }
}
function adjuntar(expediente){
expediente_photo=expediente;
    capturePhoto();
}
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        swal("OK!!!","La imagen se almacenó con éxito","success");

    }

    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert('Ups. Something wrong happens!');
        }
    }

    var options = new FileUploadOptions();
    options.fileKey = "imagen";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.expediente = expediente_photo;
    options.params = params;
    swal("Espera!!!","La imagen se está procesando");
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://dotredes.dyndns.biz:18888/dot_izzi/control/guardar_imagen.php"),win, fail, options);
}

function capturePhoto() {

    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 10,
        destinationType: destinationType.FILE_URI
    });
}

function onFail(message) {
    //alert('Failed because: ' + message);
}

//http://dotredes.dyndns.biz:18888/dot_izzi/test.php
function verAdjuntos(expediente){
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/get_imagenes.php",{expediente:expediente},function(data){
    swal({ html:true, title:'<h6>Imagenes adjuntas</h6>', text:data});
    });

}
function eliminarFoto(id,expediente)
{
    if(confirm("¿Realmente deseas eliminar esta foto?"))
    {
        $.post("http://dotredes.dyndns.biz:18888/dot_izzi/mobile/eliminar_foto.php",{id:id},function(data){
                alert("Imagen eliminada");
                verAdjuntos(expediente);
            });
    }
}

function encuesta(expediente){
var encuesta='1.-¿El tiempo de respuesta a su solicitud fue:?<br>';
encuesta+='<select id="r1" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='2.-¿Nuestro representante de soporte técnico fue coordial y paciente?<br>';
encuesta+='<select id="r2" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='3.-¿Nuestro representante estaba informado y escucho con atención su problema?<br>';
encuesta+='<select id="r3" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='4.-¿Le explicaron cual era el problema de su equipo y la solución?<br>';
encuesta+='<select id="r4" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='5.-¿Cómo calificaría el proceso para q le resolvieran su problema?<br>';
encuesta+='<select id="r5" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='6.-¿Considera que nuestros técnicos han entendido perfectamente su problema?<br>';
encuesta+='<select id="r6" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='7.-¿Recomentaria nuestros servicios?<br>';
encuesta+='<select id="r7" style="background:transparent"><option value="Excelente">Excelente</option><option value="Bueno">Bueno</option><option value="Regular">Regular</option><option value="Malo" selected>Malo</option></select><br>';
encuesta+='Comentarios extras<br>';
encuesta+='<textarea id="r8" style="width:90%;" placeholder="Déjenos saber su opinión...."></textarea><br>';
swal({
html:true,
title:'Encuesta de calidad',
text:'<div style="width:100%;height:300px;overflow:scroll;">'+encuesta+'</div>'
},function(){
//callBack
var r1=$("#r1").prop("value");
var r2=$("#r2").prop("value");
var r3=$("#r3").prop("value");
var r4=$("#r4").prop("value");
var r5=$("#r5").prop("value");
var r6=$("#r6").prop("value");
var r7=$("#r7").prop("value");
var r8=$("#r8").prop("value");
$.post("http://dotredes.dyndns.biz:18888/dot_izzi/control/guardar_encuesta.php",{
expediente:expediente,
r1:r1,
r2:r2,
r3:r3,
r4:r4,
r5:r5,
r6:r6,
r7:r7,
r8:r8

},function(data){
swal("Ok!!!","Encuesta almacenada con éxito","success");
});
});
}

function firma(expediente)
{
     window.open('http://dotredes.dyndns.biz:18888/dot_izzi/mobile/firma/index.php?exp='+expediente,'_blank','location=yes');

}
function verFirma(expediente)
{

    var ruta='<img src="http://dotredes.dyndns.biz:18888/dot_izzi/mobile/firma/img_firmas/firma_'+expediente+'.png" style="width:200px" />';

    swal({
    html:true,
    title:'Firma del usuario',
    text:ruta
    },function(){
        ruta='';
    });
}
var isBuscar=false;
function showBuscar()
{
   $(document).scrollTop(0);
    if(isBuscar)
    {
        $("#div_buscar").hide();
        isBuscar=false;
    }else{
        $("#div_buscar").show();
        isBuscar=true;
    }

}