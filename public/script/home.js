// Definindo as variáveis
var titulo = "Novo Título";
var url = "https://www.exemplo.com";
var textoHiperlink = "Visite o Exemplo.com";


document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    initializeFormOptions();
    carregarFotos();

});

function sortSetAlphabetically(set) {
    return Array.from(set).sort();
  }
function initializeFormOptions() {
    fetch('/api/lugares')
        .then(response => response.json())
        .then(estabelecimentos => {
            var cozinhas = new Set();
            var regioes = new Set();
            var bairros = new Set();
            var cartoes = new Set();
            var locais = new Set();
            const entradas = new Set();
            var linhas_metro = new Set();
            var estacoes = new Set();
            var acessibilidades = new Set();
            var estilos_musicais = new Set();
            var estilos_servicos = new Set();
            var hobbys = new Set();
            var ambientes = new Set();
            const dias = new Set();
        
            estabelecimentos.forEach(estabelecimento => {
                estabelecimento.cozinha.forEach(c => cozinhas.add(c));
                regioes.add(estabelecimento.regiao);
                bairros.add(estabelecimento.bairro);
                estabelecimento.dias.forEach(ct => dias.add(ct));
                estabelecimento.cartao.forEach(ct => cartoes.add(ct));
                estabelecimento.local.forEach(l => locais.add(l));
                entradas.add(estabelecimento.entrada);
                estabelecimento.linha_metro.forEach(lm => linhas_metro.add(lm));
                estabelecimento.estacao.forEach(est => estacoes.add(est));
                estabelecimento.acessibilidade.forEach(acess => acessibilidades.add(acess));
                estabelecimento.estilo_musical.forEach(em => estilos_musicais.add(em));
                estabelecimento.estilo_servico.forEach(es => estilos_servicos.add(es));
                estabelecimento.hobby.forEach(hb => hobbys.add(hb));
                estabelecimento.ambiente.forEach(amb => ambientes.add(amb));
                
            });

            cozinhas = sortSetAlphabetically(cozinhas);
            regioes = sortSetAlphabetically(regioes);
            bairros = sortSetAlphabetically(bairros);
            cartoes = sortSetAlphabetically(cartoes);
            locais = sortSetAlphabetically(locais);
            linhas_metro = sortSetAlphabetically(linhas_metro);
            estacoes = sortSetAlphabetically(estacoes);
            acessibilidades = sortSetAlphabetically(acessibilidades);
            estilos_musicais = sortSetAlphabetically(estilos_musicais);
            estilos_servicos = sortSetAlphabetically(estilos_servicos);
            hobbys = sortSetAlphabetically(hobbys);
            ambientes = sortSetAlphabetically(ambientes);

            populateSelect('bairro', bairros);
            populateSelect('local', locais);
            populateSelect('cozinha', cozinhas);
            populateSelect('cartao', cartoes);
            populateSelect('estilo_servico', estilos_servicos);
            populateSelect('dia', dias);
        })
        .catch(error => console.error('Erro ao carregar opções do formulário:', error));
}

function populateSelect(elementId, optionsSet) {
    const selectElement = document.getElementById(elementId);
    optionsSet.forEach(option => {
        selectElement.add(new Option(option, option));
    });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar valores dos campos do formulário
    const bairro = document.getElementById('bairro').value;
    const dia = document.getElementById('dia').value;
    // const horarioAbertura = document.getElementById('horario_abertura').value;
    // const horarioFechamento = document.getElementById('horario_fechamento').value;
    const cartao = document.getElementById('cartao').value;
    const preco = document.getElementById('preco').value;
    const local = document.getElementById('local').value;
    const cozinha = document.getElementById('cozinha').value;

    // Construir a query string
    const queryParams = new URLSearchParams();
    if (bairro) queryParams.append('bairro', bairro);
    if (dia) queryParams.append('dia', dia);
    // if (horarioAbertura) queryParams.append('horario_abertura', horarioAbertura);
    // if (horarioFechamento) queryParams.append('horario_fechamento', horarioFechamento);
    if (cartao) queryParams.append('cartao', cartao);
    if (preco) queryParams.append('preco', preco);
    if (local) queryParams.append('local', local);
    if (cozinha) queryParams.append('cozinha', cozinha);

    // Redirecionar para a página de estabelecimentos com os parâmetros da query string
    window.location.href = `estabelecimentos.html?${queryParams.toString()}`;
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
                    document.getElementById('manchete').textContent = item.manchete;
                    document.getElementById('linkHiperlink').setAttribute('href', item.link);
                    document.getElementById('linkHiperlink').textContent = 'visite o estabelecimento';
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