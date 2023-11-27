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
    fetch('http://localhost:3000/api/lugares')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('lugarSelect');
            data.forEach(lugar => {
                const option = document.createElement('option');
                option.value = lugar._id;
                option.textContent = `${lugar.nome} (ID: ${lugar._id})`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar lugares:', error));
}

function bufferToBase64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function carregarFotos() {
    const lugarId = document.getElementById('lugarSelect').value;
    const fotosContainer = document.getElementById('fotosContainer');
    fotosContainer.innerHTML = '';

    fetch(`http://localhost:3000/api/fotos-lugares/${lugarId}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(item => {
                    item.fotos.forEach(foto => {
                        const img = document.createElement('img');
                        img.src = `data:${foto.contentType};base64,${bufferToBase64(foto.data.data)}`;
                        img.classList.add('foto-img');
                        fotosContainer.appendChild(img);
                    });
                });
            } else {
                fotosContainer.innerHTML = '<p>Nenhuma foto encontrada para este lugar.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
            fotosContainer.innerHTML = '<p>Erro ao carregar fotos.</p>';
        });
}