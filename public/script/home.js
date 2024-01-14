// Definindo as variáveis
var titulo = "Novo Título";
var url = "https://www.exemplo.com";
var textoHiperlink = "Visite o Exemplo.com";

document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    carregarFotos();

});
function carregarFotos() {
    const carouselContainer = document.getElementById('carouselNovidades');
    carouselContainer.innerHTML = '';

    // Buscar todos os lugarId disponíveis
    fetch('/api/destaques/lugares')
        .then(response => response.json())
        .then(lugares => {
            if (lugares && lugares.length > 0) {
                // Escolher um lugarId aleatoriamente
                const randomIndex = Math.floor(Math.random() * lugares.length);
                const lugarIdSelecionado = lugares[randomIndex];

                // Buscar fotos para o lugarId selecionado
                return fetch(`/api/fotos-destaques/${lugarIdSelecionado}`);
            } else {
                throw new Error('Nenhum lugar encontrado.');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                let carouselIndicators = '';
                let carouselInner = '';
                let fotoIndex = 0;

                data.forEach(item => {
                    // document.getElementById('manchete').textContent = item.manchete;
                    // document.getElementById('linkHiperlink').setAttribute('href', item.link);
                    // document.getElementById('linkHiperlink').textContent = 'visite o estabelecimento';
                    item.fotos.forEach(foto => {
                        const base64String = bufferToBase64(foto.data.data);
                        const isActive = fotoIndex === 0 ? 'active' : '';
            
                        carouselIndicators += `<li data-target="#fotosCarousel" data-slide-to="${fotoIndex}" class="${isActive}"></li>`;
                        carouselInner += `
                            <div class="carousel-item ${isActive}" style="background-image: url('data:${foto.contentType};base64,${base64String}');">
                            </div>`;
                        
                        fotoIndex++;
                    });
                });

                carouselContainer.innerHTML = `
                    <div id="fotosCarousel" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">${carouselIndicators}</ol>
                        <div class="carousel-inner">${carouselInner}</div>
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
            carouselContainer.innerHTML = `<p>${error.message}</p>`;
        });
}