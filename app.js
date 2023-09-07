const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');


let [horas, minutos, segundos] = [0, 0, 0];

let intervaloDeTiempo;
let estadoCronometro = 'pausado';

function actualizarCronometro() {
   segundos++;

   if(segundos/60 === 1) {
    segundos = 0;
    minutos++;

    if(minutos/60 === 1){
        minutos = 0;
        horas++;
    }
   }

   const segundosConFormato = asignarFormato(segundos);
   const minutosConFormato = asignarFormato(minutos);
   const horasConFormato = asignarFormato(horas);

   cronometro.innerText = `${horasConFormato} : ${minutosConFormato} : ${segundosConFormato}`;
}

function asignarFormato(unidadDeTiempo){
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
        /*al anteponerle el 0, hago que en el reloj se vea el formato 07:08:15..
                     como en la hora 7<10, aparece con el 0 por delante, pero
                     como en los segundos son 15, no aparece un 0 delante, 
                     por lo que el formato siempre queda en dos cifras en cada variable horas, minutos y segundos */

}

/*Asignar Evento */

botonInicioPausa.addEventListener('click', function(){
   if(estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>'; /*Para reemplazar el ícono al de pausa */
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
} else{ /*cuando el estado del cronometro no es pausado, entonces su estado es andando*/
   window.clearInterval(intervaloDeTiempo)
   botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
   botonInicioPausa.classList.remove('pausar');
   botonInicioPausa.classList.add('iniciar');
   estadoCronometro = 'pausado'; }
}
);

botonReiniciar.addEventListener('click', function(){
    window.clearInterval(intervaloDeTiempo);

    segundos = 0;
    minutos = 0;
    horas = 0;
    /*Reiniciar*/
    cronometro.innerText = '00:00:00'; 

    /*Actualizar botones */
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');

    /*Estado */
    estadoCronometro = 'pausado';
})