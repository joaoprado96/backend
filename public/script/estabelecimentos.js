// Variável global
let estabelecimentos = [];
let estabelecimentosFiltrados = [];
let diaDaSemanaGlobal;
atualizarDiaDaSemana();

function atualizarDiaDaSemana() {
    let hoje = new Date();
    let diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    diaDaSemanaGlobal = diasDaSemana[hoje.getDay()];
}

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    loadEstabelecimentos(1); // Carregar a primeira página
});

function loadEstabelecimentos(pagina) {
    fetch('/api/lugares')
        .then(response => response.json())
        .then(dados => {
            estabelecimentos = dados;
            estabelecimentosFiltrados = [...estabelecimentos];
            construirFiltros();
            aplicarFiltros();
            atualizarEstabelecimentos(pagina);
        })
        .catch(erro => console.error('Erro ao carregar estabelecimentos:', erro));
}

function construirFiltros() {
    // Esta função preencherá os elementos de filtro com opções baseadas nos estabelecimentos carregados
    const cozinhas = new Set();
    const regioes = new Set();
    const bairros = new Set();
    const cartoes = new Set();
    const locais = new Set();

    estabelecimentos.forEach(estabelecimento => {
        estabelecimento.cozinha.forEach(c => cozinhas.add(c));
        regioes.add(estabelecimento.regiao);
        bairros.add(estabelecimento.bairro);
        cartoes.add(estabelecimento.cartao);
        locais.add(estabelecimento.local);
    });

    const filtroCozinha = document.getElementById('filtro-cozinha');
    cozinhas.forEach(c => filtroCozinha.add(new Option(c, c)));

    const filtroRegiao = document.getElementById('filtro-regiao');
    regioes.forEach(r => filtroRegiao.add(new Option(r, r)));

    const filtroBairro = document.getElementById('filtro-bairro');
    bairros.forEach(b => filtroBairro.add(new Option(b, b)));

    const filtroCartao = document.getElementById('filtro-cartao');
    bairros.forEach(ct => filtroCartao.add(new Option(ct, ct)));
    
    const filtroLocal = document.getElementById('filtro-local');
    locais.forEach(l => filtroLocal.add(new Option(l, l)));

    adicionarEventListenersParaFiltros();
}

function adicionarEventListenersParaFiltros() {
    document.getElementById('filtro-cozinha').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-regiao').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-bairro').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-cartao').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-local').addEventListener('change', () => aplicarFiltros());
    // Adicione event listeners para outros elementos de filtro conforme necessário
}

function aplicarFiltros() {
    const filtroCozinha = document.getElementById('filtro-cozinha').value;
    const filtroRegiao = document.getElementById('filtro-regiao').value;
    const filtroBairro = document.getElementById('filtro-bairro').value;
    const filtroCartao = document.getElementById('filtro-cartao').value;
    const filtroLocal = document.getElementById('filtro-local').value;

    estabelecimentosFiltrados = estabelecimentos.filter(estabelecimento => {
        const matchCozinha = filtroCozinha ? estabelecimento.cozinha.includes(filtroCozinha) : true;
        const matchRegiao = filtroRegiao ? estabelecimento.regiao === filtroRegiao : true;
        const matchBairro = filtroBairro ? estabelecimento.bairro === filtroBairro : true;
        const matchCartao = filtroCartao ? estabelecimento.cartao === filtroCartao : true;
        const matchLocal = filtroLocal ? estabelecimento.local === filtroLocal : true;

        return matchCozinha && matchRegiao && matchBairro && matchCartao && matchLocal;
    });

    atualizarEstabelecimentos(1); // Reset para a primeira página após filtrar
}

function ordenarEstabelecimentos(criterio, ascending = true) {
    estabelecimentosFiltrados.sort((a, b) => {
        if (criterio === 'estrelas' || criterio === 'preco') {
            return ascending ? a[criterio] - b[criterio] : b[criterio] - a[criterio];
        }
        // Aqui você pode adicionar mais critérios se necessário
    });

    atualizarEstabelecimentos(1); // Reset para a primeira página após ordenar
}

function atualizarEstabelecimentos(pagina) {
    const estabelecimentosPorPagina = 28;
    const inicio = (pagina - 1) * estabelecimentosPorPagina;
    const fim = inicio + estabelecimentosPorPagina;
    const dadosPagina = estabelecimentosFiltrados.slice(inicio, fim);
    renderizaEstabelecimentos(dadosPagina);
    criaPaginacao(estabelecimentosFiltrados.length, estabelecimentosPorPagina, pagina);
}

function renderizaEstabelecimentos(dados) {
    const container = document.getElementById('estabelecimentos');
    container.innerHTML = '';
    dados.forEach(estabelecimento => {
        container.innerHTML += criarCard(estabelecimento);
    });
}

function criaPaginacao(totalEstabelecimentos, estabelecimentosPorPagina, paginaAtual) {
    const totalPaginas = Math.ceil(totalEstabelecimentos / estabelecimentosPorPagina);
    const paginacaoContainer = document.getElementById('paginacao');
    paginacaoContainer.innerHTML = '';

    if (paginaAtual > 1) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${paginaAtual - 1})">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${i})">${i}</button>`;
    }

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

    // // Calcular horário de abertura e fechamento
    const horarioAbertura = estabelecimento.horarios_funcionamento[diaDaSemanaGlobal].abertura;
    const horarioFechamento = estabelecimento.horarios_funcionamento[diaDaSemanaGlobal].fechamento;
    

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

