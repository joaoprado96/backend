document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    fetchLugares();
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
    const carouselContainer = document.getElementById('carouselContainer');
    carouselContainer.innerHTML = '';

    fetch(`http://localhost:3000/api/fotos-lugares/${lugarId}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                let carouselIndicators = '';
                let carouselInner = '';
                let fotoIndex = 0; // Índice para cada foto

                data.forEach(item => {
                    item.fotos.forEach(foto => {
                        const base64String = bufferToBase64(foto.data.data);
                        const isActive = fotoIndex === 0 ? 'active' : ''; // Apenas a primeira foto é 'active'
                        
                        carouselIndicators += `<li data-target="#fotosCarousel" data-slide-to="${fotoIndex}" class="${isActive}"></li>`;
                        carouselInner += `
                            <div class="carousel-item ${isActive}">
                                <img class="d-block w-100" src="data:${foto.contentType};base64,${base64String}">
                            </div>`;
                        
                        fotoIndex++;
                    });
                });

                carouselContainer.innerHTML = `
                    <div id="fotosCarousel" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            ${carouselIndicators}
                        </ol>
                        <div class="carousel-inner">
                            ${carouselInner}
                        </div>
                        <a class="carousel-control-prev" href="#fotosCarousel" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#fotosCarousel" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>`;

                // Inicializar o carrossel
                $('#fotosCarousel').carousel();
            } else {
                carouselContainer.innerHTML = '<p>Nenhuma foto encontrada para este lugar.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
            carouselContainer.innerHTML = '<p>Erro ao carregar fotos.</p>';
        });
}
