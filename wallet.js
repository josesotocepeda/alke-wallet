// wallet.js - Funciones compartidas para la billetera digital
// Maneja el estado (saldo, movimientos, contactos) usando localStorage
// para que persista entre las distintas pantallas.

(function ($) {
    const SALDO_KEY = 'wallet_saldo';
    const MOVIMIENTOS_KEY = 'wallet_movimientos';
    const CONTACTOS_KEY = 'wallet_contactos';

    function initWallet() {
        if (localStorage.getItem(SALDO_KEY) === null) {
            localStorage.setItem(SALDO_KEY, '1250000');
        }
        if (localStorage.getItem(MOVIMIENTOS_KEY) === null) {
            localStorage.setItem(MOVIMIENTOS_KEY, JSON.stringify([]));
        }
        if (localStorage.getItem(CONTACTOS_KEY) === null) {
            localStorage.setItem(CONTACTOS_KEY, JSON.stringify([]));
        }
    }

    function getSaldo() {
        initWallet();
        return parseInt(localStorage.getItem(SALDO_KEY), 10);
    }

    function setSaldo(nuevoSaldo) {
        localStorage.setItem(SALDO_KEY, String(Math.round(nuevoSaldo)));
    }

    function getMovimientos() {
        initWallet();
        return JSON.parse(localStorage.getItem(MOVIMIENTOS_KEY));
    }

    function addMovimiento(movimiento) {
        const movimientos = getMovimientos();
        movimientos.unshift(movimiento); // el mas reciente primero
        localStorage.setItem(MOVIMIENTOS_KEY, JSON.stringify(movimientos));
    }

    function getContactos() {
        initWallet();
        return JSON.parse(localStorage.getItem(CONTACTOS_KEY));
    }

    function addContacto(contacto) {
        const contactos = getContactos();
        contactos.push(contacto);
        localStorage.setItem(CONTACTOS_KEY, JSON.stringify(contactos));
    }

    function formatCurrency(numero) {
        return '$' + Number(numero).toLocaleString('es-CL');
    }

    function fechaActual() {
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString('es-CL');
        const hora = ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        return fecha + ' ' + hora;
    }

    // Inyecta una alerta de Bootstrap dentro del contenedor indicado.
    // El boton de cierre no depende del JS de Bootstrap, asi funciona
    // incluso en paginas que no cargan el bundle de Bootstrap.
    function mostrarAlerta(contenedorId, mensaje, tipo) {
        tipo = tipo || 'success';
        const $contenedor = $('#' + contenedorId);
        if (!$contenedor.length) return;
        $contenedor.html(
            '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
                mensaje +
                '<button type="button" class="btn-close" onclick="$(this).closest(\'.alert\').remove()"></button>' +
            '</div>'
        );
    }

    // Exponer utilidades globales para compatibilidad con las páginas existentes
    window.initWallet = initWallet;
    window.getSaldo = getSaldo;
    window.setSaldo = setSaldo;
    window.getMovimientos = getMovimientos;
    window.addMovimiento = addMovimiento;
    window.getContactos = getContactos;
    window.addContacto = addContacto;
    window.formatCurrency = formatCurrency;
    window.fechaActual = fechaActual;
    window.mostrarAlerta = mostrarAlerta;

    // También dejar una API jQuery accesible si se desea usarla desde otros módulos.
    $.wallet = {
        initWallet,
        getSaldo,
        setSaldo,
        getMovimientos,
        addMovimiento,
        getContactos,
        addContacto,
        formatCurrency,
        fechaActual,
        mostrarAlerta
    };
}(jQuery));
