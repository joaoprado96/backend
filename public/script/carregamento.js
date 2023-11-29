document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
});

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            navbarPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o navbar:', error);
        });
}
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            footerPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o footer:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchLugares();
});

function fetchLugares() {
    fetch('/api/lugares')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('lugarSelect');
            data.forEach(lugar => {
                const option = document.createElement('option');
                option.value = lugar._id;
                option.textContent = `${lugar.nome} (id: ${lugar._id})`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar lugares:', error));
}
document.getElementById('deleteButton').addEventListener('click', function() {
    const lugarId = document.getElementById('lugarSelect').value;
    
    if (!lugarId) {
        alert('Por favor, selecione um lugar antes de tentar apagar.');
        return;
    }

    if (confirm(`Tem certeza que deseja apagar o lugar e suas fotos? Esta ação é irreversível.`)) {
        fetch(`/api/fotos-lugares/${lugarId}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                alert('Lugar e suas fotos foram apagados com sucesso.');
                fetchLugares(); // Atualizar a lista de lugares
            } else {
                alert('Falha ao apagar o lugar e suas fotos.');
            }
        })
        .catch(error => console.error('Erro ao apagar lugar e fotos:', error));
    }
});


document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const lugarId = document.getElementById('lugarSelect').value;
    verificarFotosExistem(lugarId, function(existemFotos) {
        if (existemFotos) {
            alert('Já existem fotos para este LugarId. Não é possível enviar mais fotos.');
        } else {
            enviarFotos(lugarId);
        }
    });
});

function verificarFotosExistem(lugarId, callback) {
    fetch(`/api/fotos-lugares/verificar/${lugarId}`)
        .then(response => response.json())
        .then(data => {
            if (data.fotos && data.fotos.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        })
        .catch(error => {
            console.error('Erro ao verificar fotos:', error);
            callback(false);
        });
}

function enviarFotos(lugarId) {
    const fotos = document.getElementById('fotos').files;
    const formData = new FormData();

    formData.append('lugarId', lugarId);
    for (let i = 0; i < fotos.length; i++) {
        formData.append('fotos', fotos[i]);
    }

    console.log(formData);
    fetch('/api/fotos-lugares', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Falha ao enviar fotos');
        }
    })
    .then(data => {
        alert('Fotos enviadas com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao enviar fotos:', error);
        alert(error.message);
    });
}
