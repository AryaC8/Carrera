$(document).ready(function(){  

    //función para el botón elegir una vez se hace click en él
    $("#botonElegir").click(function(){             
      
        $("#divEleccion").hide(); //Escondo los div del formulario y del botón
        $("#eleccion").hide();        
        
        $("h1").css("font-size", "40px") //aquí modifico el tamaño de letra del h1 
        $("#inicio").show(); //Sentencia para hacer aparecer el botón de inicio anteriormente escondido 
        $("#volver").show(); ////Sentencia para hacer aparecer el botón de nueva carrera 
        
        $("#pista").css("display", "block"); //Sentencia para hacer aparecer el div con los coches y la pista anteriormente escondidos 

        coches = new Array(); //creo un array vacío

        //En este array inserto las rutas de las imágenes con los coches
        arrayCoches = ["img/car1.png", "img/car2.png", "img/car3.png", 
        "img/car4.png", "img/car5.png", "img/car6.png", "img/car7.png", "img/car8.png", "img/car9.png"];       

        //Esta función coge el número elegido en el formulario e inserta ese núemero de coches en el array
        $("#formulario").submit(function(evento){  
            evento.preventDefault();  
            let numero = $("#numeroCoches").val() ;     
            
            for (let i = 0; i < numero; i++) {                                      

                coches[i] = arrayCoches[i];                     
                
                //después va añadiendo esos coches al div 
                $("#coches").append("<img id=coche" + [i+1] + " src=" + coches[i] + "><br>");               
                   
            }              
            
        });     
        
    });      
   

    //función para una vez se hace click en el botón de inicio
    $("#inicio").click(function(){

        //le doy estas medidas porque todos los coches miden lo mismo
        let medidaCoche = $("#coche1").width();

        //Elijo un valor para la meta
        //Declaro una variable con las medidas del div donde se encuentra la carretera
        let suelo = $("#pista").width();    
        
        //La meta es igual a la medida del div menos las medidas que pueda tener el coche para que coincida con el frontal del coche 
        let meta = suelo - medidaCoche;        
       
        //Bucle para animar uno a uno, de forma aleatoria, los coches seleccionados
        for (let i = 0; i < coches.length; i++) {      
           
            //Saca un número aleatorio entre 1 y 10 segundos. 
            let tiempoCoche = (Math.floor((Math.random()*(10000-1000+1)+1000)));

            $("#coche"+[i+1]).animate({
                 left: meta, //los coches tienen que ir hasta la derecha hasta donde está la meta situada
                 } ,tiempoCoche, function() {                     
                    
                    //Va añadiendo el coche y el tiempo que ha tardado en hacer el recorrido
                     $("#tabla").append("<tr><td id='columna1'>Coche " + [i+1] +"</td><td id='columna2'>" + (tiempoCoche/1000) + " s</td></tr>"); 
                     
                     //Aparece la tabla en la ventana
                     $("#tabla").css("display", "block");   
           
             });               
        }       
     
        //Aparece el botón de reinicio 
        $("#reinicio").show();
        

        //se esconde el botón inicio
        $("#inicio").hide();       

    }); 



    //función para una vez se hace click en el botón de reinicio
    $("#reinicio").click(function(){  

        //Escondo la tabla al reiniciar la carrera
        $("#tabla").css("display", "none");         
              

        //Realizo el mismo bucle que antes pero esta vez para que vayan hacia la izquierda
        for (let i = 0; i < coches.length; i++) {     
            
            $("#coche"+[i+1]).stop();

            let tiempoCoche = (Math.floor((Math.random()*(10000-1000+1)+1000)));

            //Con estas dos sentencias vacío las dos columnas de la tabla para volverlas a rellenar 
            //con las posiciones y tiempos nuevos
            $("#columna1").remove();   
            $("#columna2").remove();
                
               $("#coche"+[i+1]).animate({
                left:"-0px",   //sentencia para que vayan hacia atrás
                    } ,tiempoCoche);                
           }      

        //Aparece el botón de inicio y se esconde el de reinicio
        $("#inicio").show();
        $("#reinicio").hide();      
    });
 



    //recarga la página para poder elegir otro número de coches diferente
    $("#volver").click(function(){
        location.reload();       
    });
        
});