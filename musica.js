// CONFIGURACIÓN DE AUDIO
const rutaMusica = 'BTPI.mp3'; // Asegúrate que el nombre sea correcto

if (!window.audioGlobal) {
    window.audioGlobal = new Audio(rutaMusica);
    window.audioGlobal.loop = true;
}
const musica = window.audioGlobal;

// FUNCIÓN PARA EL BOTÓN (Solo se activa al hacer clic en el portal)
function desbloquearSistema() {
    const portal = document.getElementById('portal-negro');
    
    // Inicia la música si no estaba sonando
    musica.play().catch(e => console.log("Error de audio:", e));
    
    // Quitamos el portal con la animación
    if (portal) {
        portal.classList.add('portal-fuera');
    }
    
    // Habilitamos el scroll
    document.body.classList.remove('bloquear-scroll');
    
    // IMPORTANTE: No guardamos nada en localStorage para que pida entrar de nuevo la próxima vez
}

// LÓGICA DE CARGA (Corre en todas las páginas)
window.addEventListener('load', () => {
    const portal = document.getElementById('portal-negro');
    const tiempoGuardado = localStorage.getItem('segundo_musica');

    // Recuperar por qué segundo iba la música
    if (tiempoGuardado) {
        musica.currentTime = parseFloat(tiempoGuardado);
    }

    // SI ESTAMOS EN EL INDEX (donde existe el portal)
    if (portal) {
        // Obligamos a que el portal sea visible y bloquee el scroll
        portal.style.display = 'flex'; 
        document.body.classList.add('bloquear-scroll');
        
        // Si ya venía sonando desde otra página, que siga sonando de fondo
        if (tiempoGuardado) {
            musica.play().catch(() => console.log("Se requiere interacción para sonar"));
        }
    } else {
        // EN PÁGINAS SIN PORTAL (Contacto, Clases, etc.)
        document.body.classList.remove('bloquear-scroll');
        musica.play().catch(() => {});
    }
});

// GUARDAR PROGRESO DE LA MÚSICA CADA SEGUNDO
setInterval(() => {
    if (!musica.paused) {
        localStorage.setItem('segundo_musica', musica.currentTime);
    }
}, 1000);