document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    loadEstabelecimentos(1); // Carregar a primeira página
});

function loadEstabelecimentos(pagina) {
    fetch('http://localhost:3000/api/lugares')
        .then(response => response.json())
        .then(dados => {
            const estabelecimentosPorPagina = 28;
            const inicio = (pagina - 1) * estabelecimentosPorPagina;
            const fim = inicio + estabelecimentosPorPagina;

            const dadosPagina = dados.slice(inicio, fim);
            renderizaEstabelecimentos(dadosPagina);

            criaPaginacao(dados.length, estabelecimentosPorPagina, pagina);
        })
        .catch(erro => console.error('Erro ao carregar estabelecimentos:', erro));
}

function renderizaEstabelecimentos(dados) {
    const container = document.getElementById('estabelecimentos');
    container.innerHTML = ''; // Limpar conteúdo existente
    dados.forEach(estabelecimento => {
        container.innerHTML += criarCard(estabelecimento);
    });
}

function criaPaginacao(totalEstabelecimentos, estabelecimentosPorPagina, paginaAtual) {
    const totalPaginas = Math.ceil(totalEstabelecimentos / estabelecimentosPorPagina);
    const paginacaoContainer = document.getElementById('paginacao');
    paginacaoContainer.innerHTML = ''; // Limpar a paginação existente

    // Botão Página Anterior
    if (paginaAtual > 1) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${paginaAtual - 1})">Anterior</button>`;
    }

    // Botões de Número de Página
    for (let i = 1; i <= totalPaginas; i++) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${i})">${i}</button>`;
    }

    // Botão Próxima Página
    if (paginaAtual < totalPaginas) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${paginaAtual + 1})">Próxima</button>`;
    }
}


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

function criarCard(estabelecimento) {
    // Função para gerar ícones de preço e avaliação
    const gerarIcones = (quantidade, icone) => Array.from({ length: quantidade }, () => icone).join('');

    // Calcular horário de abertura e fechamento
    const horarios = estabelecimento.hora.sort();
    const horarioAbertura = horarios[0];
    const horarioFechamento = horarios[horarios.length - 1];

    return `
    <div class="col-md-3 mb-4">
    <div class="card-body-est imagem-hover">
            <a href="detalhes.html?id=${estabelecimento._id}" class="">
                <img src="./image/restaurante.jpg" class="img-principal" alt="Imagem do Estabelecimento"></a>

        <div class="card-body d-flex flex-column">
            <div class="row">
                <div class="col-md-9">
                    <div class="let-card">${estabelecimento.nome}</div>
                </div>
                <div class="col-md-3">
                    <div class="icone">⭐${estabelecimento.avaliacao_clientes}</div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <p class="let-card-min"><i class="fas fa-map-marker-alt"></i> ${estabelecimento.bairro}</p>
                </div>
                <div class="col-md-6">
                    <p class="let-card-min"><i class="fas fa-clock"></i> ${horarioAbertura} - ${horarioFechamento}</p>
                </div>
            </div>
        </div>

    </div>
    `;
}


function criarBoxes(lista) {
    return lista.map(item => `<span class="box">${item}</span>`).join('');
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

