document.getElementById("aceptarBtn").addEventListener("click", function () {
    mostrarProcesando();
    realizarCobro(500)
        .then(() => {
            ocultarProcesando();
            window.location.href = 'confirmacion.html';
        })
        .catch((error) => {
            ocultarProcesando();
            console.error('Error en realizarCobro:', error.message);
        });
});

document.getElementById("cancelarBtn").addEventListener("click", function () {
    mostrarCancelado();
    setTimeout(function () {
        ocultarCancelado();
        window.location.href = 'index.html';
    }, 5000);
});

function mostrarProcesando() {
    document.getElementById("popup").style.display = "flex";
}

function mostrarCancelado() {
    document.getElementById("popup-cancelado").style.display = "flex";
}

function ocultarProcesando() {
    document.getElementById("popup").style.display = "none";
}

function ocultarCancelado() {
    document.getElementById("popup-cancelado").style.display = "none";
}

function realizarCobro(monto) {
    return new Promise((resolve, reject) => {
        fetch('https://api-gw.payclip.com/paymentrequest', {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.com.payclip.v1+json',
                'content-type': 'application/json; charset=UTF-8',
                'x-api-key': 'Basic MzRhNzBmM2MtMTNhNS00ZTIxLTljZWQtN2E1OWQzNDJlNDBlOjI4OGYyZThiLTUzNDItNDY0Ny1hMDY9LWEzMGE5MjhlNGQyNg=='
            },
            body: JSON.stringify({
                amount: monto,
                assigned_user: "usuario@example.com",
                reference: "89bc679b",
                message: "cobro-septiembre17"
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        })
        .then(data => {
            console.log('Respuesta:', data);
            resolve();
        })
        .catch(error => {
            console.error('Error en realizarCobro:', error.message);
            reject(error);
        });
    });
}
