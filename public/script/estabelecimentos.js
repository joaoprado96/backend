// Variável global
let estabelecimentos = [];
let estabelecimentosFiltrados = [];
let diaDaSemanaGlobal;
let filtroTipoEventoAtual = null; // Variável global para armazenar o tipo de evento selecionado
const filtroListeners = {};

const filtrosGlobais = [
    { id: 'filtro-cozinha', tipo: 'dropdown' },
    { id: 'filtro-regiao', tipo: 'dropdown' },
    { id: 'filtro-bairro', tipo: 'dropdown' },
    { id: 'filtro-cartao', tipo: 'dropdown' },
    { id: 'filtro-local', tipo: 'dropdown' },
    { id: 'filtro-entrada', tipo: 'dropdown' },
    { id: 'filtro-metro', tipo: 'dropdown' },
    { id: 'filtro-estacao', tipo: 'dropdown' },
    { id: 'filtro-acessibilidade', tipo: 'dropdown' },
    { id: 'filtro-musical', tipo: 'dropdown' },
    { id: 'filtro-servico', tipo: 'dropdown' },
    { id: 'filtro-hobby', tipo: 'dropdown' },
    { id: 'filtro-ambiente', tipo: 'dropdown' },
    { id: 'filtro-musica', tipo: 'checkbox' },
    { id: 'filtro-estacionamento', tipo: 'checkbox' },
    { id: 'filtro-kids', tipo: 'checkbox' },
    { id: 'filtro-pet', tipo: 'checkbox' },
    { id: 'filtro-glutenfree', tipo: 'checkbox' },
    { id: 'filtro-lactosefree', tipo: 'checkbox' }
];


document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    criarNavbarInferior();
    ObterDiaSemana();
    loadEstabelecimentos(1); // Carregar a primeira página
    inicalizarMenuLateral();
});

function inicalizarMenuLateral(){
    document.getElementById('botao-menu-filtros').addEventListener('click', function() {
        var menu = document.getElementById('menu-lateral-filtros');
        if (menu.style.width === '250px') {
            menu.style.width = '0';
        } else {
            menu.style.width = '250px';
        }
    });
    document.getElementById('botao-fechar-menu').addEventListener('click', function() {
        document.getElementById('menu-lateral-filtros').style.width = '0';
    });
}

function loadEstabelecimentos(pagina) {
    const queryParams = getQueryParams();
    let queryString = Object.entries(queryParams).reduce((query, [key, value]) => {
        if (value) {
            query.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
        return query;
    }, []).join('&');
    
    let url = '/api/lugares';
    if (queryString) {
        url += `?${queryString}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            estabelecimentos = dados;
            estabelecimentosFiltrados = [...estabelecimentos];
            construirFiltros();
            atualizarEstabelecimentos(pagina); 
            construirCarrosselTipoEvento();
            let sessionId = localStorage.getItem('sessionId');
            enviarDadosDeAcesso(sessionId, 'acesso à estabelecimentos')
        })
        .catch(erro => console.error('Erro ao carregar estabelecimentos:', erro));
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        bairro: params.get('bairro'),
        dia: params.get('dia'),
        horario: params.get('horario'),
        cartao: params.get('cartao'),
        preco: params.get('preco'),
        local: params.get('local'),
        cozinha: params.get('cozinha')
    };
}


function sortSetAlphabetically(set) {
    return Array.from(set).sort();
  }

function construirFiltros() {
    // Definição dos conjuntos de filtros
    const conjuntosFiltros = {
        'filtro-cozinha': new Set(),
        'filtro-regiao': new Set(),
        'filtro-bairro': new Set(),
        'filtro-cartao': new Set(),
        'filtro-local': new Set(),
        'filtro-entrada': new Set(),
        'filtro-metro': new Set(),
        'filtro-estacao': new Set(),
        'filtro-acessibilidade': new Set(),
        'filtro-musical': new Set(),
        'filtro-servico': new Set(),
        'filtro-hobby': new Set(),
        'filtro-ambiente': new Set()
    };

    // Armazenar os valores atuais dos filtros
    const valoresAtuais = {};
    Object.keys(conjuntosFiltros).forEach(filtroId => {
        valoresAtuais[filtroId] = document.getElementById(filtroId).value;
    });

    // Limpar os elementos de filtro existentes
    Object.keys(conjuntosFiltros).forEach(filtroId => {
        const selectElement = document.getElementById(filtroId);
        while (selectElement.firstChild) {
            selectElement.removeChild(selectElement.firstChild);
        }
        // Adicionar opção padrão ou vazia
        selectElement.add(new Option(`${filtroId.split('-')[1]}`, ''));
    });

    // Preenchimento dos conjuntos com valores baseados nos estabelecimentos
    estabelecimentos.forEach(estabelecimento => {
        ['cozinha', 'regiao', 'bairro', 'cartao', 'local', 'entrada', 'metro', 'estacao', 'acessibilidade', 'musical', 'servico', 'hobby', 'ambiente'].forEach(campo => {
            const valores = Array.isArray(estabelecimento[campo]) ? estabelecimento[campo] : [estabelecimento[campo]];
            valores.forEach(valor => {
                if (valor) conjuntosFiltros[`filtro-${campo}`].add(valor);
            });
        });
    });

    // Adicionar opções aos elementos de filtro e restaurar o valor selecionado
    Object.entries(conjuntosFiltros).forEach(([filtroId, conjunto]) => {
        addOptionsToFiltro(filtroId, conjunto);
        document.getElementById(filtroId).value = valoresAtuais[filtroId];
    });

    // Adicionar event listeners para os filtros
    removerEventListenersParaFiltros();
    adicionarEventListenersParaFiltros();
}

function addOptionsToFiltro(filtroId, conjunto) {
    const elementoFiltro = document.getElementById(filtroId);
    conjunto.forEach(opcao => {
        elementoFiltro.add(new Option(opcao, opcao));
    });
}

function adicionarEventListenersParaFiltros() {
    ['cozinha', 'regiao', 'bairro', 'cartao', 'local', 'entrada', 'metro', 'estacao', 'acessibilidade', 'musical', 'servico', 'hobby', 'ambiente', 'musica', 'estacionamento', 'kids', 'pet', 'glutenfree', 'lactosefree'].forEach(filtro => {
        const filtroId = `filtro-${filtro}`;
        const element = document.getElementById(filtroId);

        if (!filtroListeners[filtroId]) {
            filtroListeners[filtroId] = function() {
                // Conteúdo da função listener
                if (this.value === "" || this.value === `${filtro}`) {
                    this.classList.remove("ativo");
                    this.classList.add("inativo");
                } else {
                    this.classList.remove("inativo");
                    this.classList.add("ativo");
                }
                aplicarFiltros();
            };
        }

        element.addEventListener('change', filtroListeners[filtroId]);
    });
}

function removerEventListenersParaFiltros() {
    Object.entries(filtroListeners).forEach(([filtroId, listener]) => {
        const element = document.getElementById(filtroId);
        if (element) {
            element.removeEventListener('change', listener);
        }
    });
}

// Função para limpar filtros
function limparFiltros() {
    filtrosGlobais.forEach(filtro => {
        if (filtro.tipo === 'dropdown') {
            const dropdownElement = document.getElementById(filtro.id);
            dropdownElement.value = '';

            // Se for o valor padrão, define como inativo
            if (dropdownElement.value === '') {
                dropdownElement.classList.remove("ativo");
                dropdownElement.classList.add("inativo");
            }
        } else if (filtro.tipo === 'checkbox') {
            const checkboxElement = document.getElementById(filtro.id);
            checkboxElement.checked = false;

            // Se não estiver marcado, define como inativo
            if (!checkboxElement.checked) {
                checkboxElement.classList.remove("ativo");
                checkboxElement.classList.add("inativo");
            }
        }
    });

    // Aplicar os filtros após o reset
    aplicarFiltros();
}


// Função para aplicar filtros
function aplicarFiltros() {
    const filtroCozinha = document.getElementById('filtro-cozinha').value;
    const filtroRegiao = document.getElementById('filtro-regiao').value;
    const filtroBairro = document.getElementById('filtro-bairro').value;
    const filtroCartao = document.getElementById('filtro-cartao').value;
    const filtroLocal = document.getElementById('filtro-local').value;
    const filtroEntrada = document.getElementById('filtro-entrada').value;
    const filtroMetro = document.getElementById('filtro-metro').value;
    const filtroEstacao = document.getElementById('filtro-estacao').value;
    const filtroAcessibilidade = document.getElementById('filtro-acessibilidade').value;
    const filtroEstiloMusical = document.getElementById('filtro-musical').value;
    const filtroEstiloServico = document.getElementById('filtro-servico').value;
    const filtroHobby = document.getElementById('filtro-hobby').value;
    const filtroAmbiente = document.getElementById('filtro-ambiente').value;

    // Filtros de checkbox
    const filtroMusica = document.getElementById('filtro-musica').checked;
    const filtroEstacionamento = document.getElementById('filtro-estacionamento').checked;
    const filtroKids = document.getElementById('filtro-kids').checked;
    const filtroPet = document.getElementById('filtro-pet').checked;
    const filtroGlutenfree = document.getElementById('filtro-glutenfree').checked;
    const filtroLactosefree = document.getElementById('filtro-lactosefree').checked;

    estabelecimentosFiltrados = estabelecimentos.filter(estabelecimento => {
        // Verificações para os filtros de seleção
        const matchCozinha = filtroCozinha ? estabelecimento.cozinha.includes(filtroCozinha) : true;
        const matchRegiao = filtroRegiao ? estabelecimento.regiao === filtroRegiao : true;
        const matchBairro = filtroBairro ? estabelecimento.bairro === filtroBairro : true;
        const matchCartao = filtroCartao ? estabelecimento.cartao.includes(filtroCartao) : true; // Supondo que cartao é um array
        const matchLocal = filtroLocal ? estabelecimento.local.includes(filtroLocal) : true; // Supondo que local é um array
        const matchEntrada = filtroEntrada ? estabelecimento.entrada === filtroEntrada : true;
        const matchMetro = filtroMetro ? estabelecimento.linha_metro.includes(filtroMetro) : true; // Supondo que linha_metro é um array
        const matchEstacao = filtroEstacao ? estabelecimento.estacao.includes(filtroEstacao) : true; // Supondo que estacao é um array
        const matchAcessibilidade = filtroAcessibilidade ? estabelecimento.acessibilidade.includes(filtroAcessibilidade) : true; // Supondo que acessibilidade é um array
        const matchEstiloMusical = filtroEstiloMusical ? estabelecimento.estilo_musical.includes(filtroEstiloMusical) : true; // Supondo que estilo_musical é um array
        const matchEstiloServico = filtroEstiloServico ? estabelecimento.estilo_servico.includes(filtroEstiloServico) : true; // Supondo que estilo_servico é um array
        const matchHobby = filtroHobby ? estabelecimento.hobby.includes(filtroHobby) : true; // Supondo que hobby é um array
        const matchAmbiente = filtroAmbiente ? estabelecimento.ambiente.includes(filtroAmbiente) : true; // Supondo que ambiente é um array

        // Verificações para os filtros de checkbox
        const matchMusica = !filtroMusica || estabelecimento.musica === (filtroMusica ? 'Sim' : 'Não');
        const matchEstacionamento = !filtroEstacionamento || estabelecimento.estacionamento === (filtroEstacionamento ? 'Sim' : 'Não');
        const matchKids = !filtroKids || estabelecimento.kids === (filtroKids ? 'Sim' : 'Não');
        const matchPet = !filtroPet || estabelecimento.pet === (filtroPet ? 'Sim' : 'Não');
        const matchGlutenfree = !filtroGlutenfree || estabelecimento.glutenfree === (filtroGlutenfree ? 'Sim' : 'Não');
        const matchLactosefree = !filtroLactosefree || estabelecimento.lactosefree === (filtroLactosefree ? 'Sim' : 'Não');

        return matchCozinha && matchRegiao && matchBairro && matchCartao && matchLocal &&
               matchEntrada && matchMetro && matchEstacao && matchAcessibilidade &&
               matchEstiloMusical && matchEstiloServico && matchHobby && matchAmbiente &&
               matchMusica && matchEstacionamento && matchKids &&
               matchPet && matchGlutenfree && matchLactosefree;
    });

    // Adicionar filtragem adicional para tipo de evento, se necessário
    if (filtroTipoEventoAtual) {
        estabelecimentosFiltrados = estabelecimentosFiltrados.filter(estabelecimento => 
            estabelecimento.tipo_evento.includes(filtroTipoEventoAtual));
    }

    atualizarEstabelecimentos(1); // Reset para a primeira página após filtrar
    construirFiltros();
}


function construirCarrosselTipoEvento() {
    const tiposEvento = new Set();
    estabelecimentos.forEach(estabelecimento => {
        estabelecimento.tipo_evento.forEach(te => tiposEvento.add(te));
    });


    const carrossel = document.getElementById('carrosselTipoEvento');
    tiposEvento.forEach(tipo => {
        const imageUrl = buscarImagemParaTipoEvento(tipo);
        carrossel.innerHTML += `
            <div class="item-carrossel">
                <img src="${imageUrl}" alt="${tipo}" class="carrosel-icon">
            </div>
        `;
    });

    // Inicializar o carrossel usando Slick
    $('#carrosselTipoEvento').slick({
        dots: false,        // Desativa os pontos de navegação
        arrows: false,      // Desativa os botões de próxima e anterior
        infinite: true,
        autoplay: true,        // Ativa o autoplay
        autoplaySpeed: 2000,   // Velocidade do autoplay (2000 ms = 2 segundos)
        slidesToShow: 7,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024, // Largura máxima de 1024px
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 600, // Largura máxima de 600px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480, // Largura máxima de 480px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });
    

    // Adicionar event listener para seleção de tipo de evento
    $('.item-carrossel').on('click', function() {
        const tipoSelecionado = $(this).find('.carrosel-icon').attr('alt');
        aplicarFiltroTipoEvento(tipoSelecionado);
    });
}

function buscarImagemParaTipoEvento(tipo) {
    const imagensTipoEvento = {
        "beber e dançar": "icons/beberedancar.png",
        "primeiro encontro": "icons/primeiroencontro.png",
        "conversar": "icons/conversar.png",
        "lugar romântico": "icons/romantico.png",
        "rolê de amigos": "icons/reuniao.png",
        "encontro familiar": "icons/familiar.png",
        "aniversário": "icons/aniversario.png",
        "happy hour": "icons/happyhour.png",
        "assistir jogos": "icons/jogos.png",
        "casas noturnas": "icons/balada.png",
        "experiência gastronômica": "icons/experiencia.png",
        "cabaré/boates": "icons/cabare.png",
        "música ao vivo": "icons/musica.png",
        "karaokês": "icons/karaoke.png",
        "LGBTQIA+": "icons/lgbtqia.png",
        "temáticos": "icons/tematicos.png",
        "sair sozinho/a": "icons/sairsozinha.png",
        "rolê geek": "icons/geek.png",
        "brunches": "icons/brunches-1.png",
        "para crianças": "icons/kids.png"
    };

    return imagensTipoEvento[tipo] || "icons/icon-gluten.png";
}

function aplicarFiltroTipoEvento(tipoSelecionado) {
    estabelecimentosFiltrados = estabelecimentos.filter(estabelecimento =>
        estabelecimento.tipo_evento.includes(tipoSelecionado)
    );
    atualizarEstabelecimentos(1); // Atualizar para mostrar apenas os estabelecimentos filtrados
    construirFiltros();
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

function criaPaginacao(totalEstabelecimentos, estabelecimentosPorPagina, paginaAtual) {
    const totalPaginas = Math.ceil(totalEstabelecimentos / estabelecimentosPorPagina);
    const paginacaoContainer = document.getElementById('paginacao');
    paginacaoContainer.innerHTML = '';

    if (paginaAtual > 1) {
        paginacaoContainer.innerHTML += `<button onclick="atualizarEstabelecimentos(${paginaAtual - 1})">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        paginacaoContainer.innerHTML += `<button onclick="atualizarEstabelecimentos(${i})">${i}</button>`;
    }

    if (paginaAtual < totalPaginas) {
        paginacaoContainer.innerHTML += `<button onclick="atualizarEstabelecimentos(${paginaAtual + 1})">Próxima</button>`;
    }
}

function formatarLista2(locais) {
    return locais.map(local => {
        const localMinusculo = local.toLowerCase();

        // Verifica e substitui pela palavra-chave correspondente
        if (localMinusculo.includes('padaria')) {
            return `<i class="fas fa-bread-slice"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('bar')) {
            return `<i class="fas fa-beer"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('baladas')) {
            return `<i class="fas fa-music"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('restaurantes')) {
            return `<i class="fas fa-utensils"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('pizzaria')) {
            return `<i class="fas fa-pizza-slice"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('lanchonete')) {
            return `<i class="fas fa-hamburger"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('hamburgueria')) {
            return `<i class="fas fa-hamburger"></i> ${local.toUpperCase()}`;
        } else if (localMinusculo.includes('bistro')) {
            return `<i class="fas fa-wine-glass-alt"></i> ${local.toUpperCase()}`;
        } else {
            return `<i class="fas fa-glass-cheers"></i> ${local.toUpperCase()}`;
        }
    }).join(' &emsp; '); // Alterado para usar um espaço maior entre os itens
}

function formatarLista(locais) {
    // Substitui o hífen por um ícone de bolinha
    return locais.join(' • ').toUpperCase();
}


async function criarCard(estabelecimento) {
    const horarioHoje = estabelecimento.horarios_funcionamento[diaDaSemanaGlobal];
    let horarioAbertura = horarioHoje ? horarioHoje.abertura : 'Indisponível';
    let horarioFechamento = horarioHoje ? horarioHoje.fechamento : 'Indisponível';
    const imageUrl = await buscarPrimeiraFoto(estabelecimento._id);

    // Tratar caso de estabelecimento fechado
    let horarioExibicao;
    let bairroExibicao = estabelecimento.bairro;
    let resultado = bairroExibicao.toUpperCase();
    let localFormatado = formatarLista2(estabelecimento.local);
    let cozinhaFormatado = formatarLista(estabelecimento.cozinha);

    if (horarioAbertura.toLowerCase() === 'fechado' && horarioFechamento.toLowerCase() === 'fechado') {
        horarioExibicao = '<span class="horario"><i class="fas fa-clock"></i> Fechado</span>';
    } else if (horarioAbertura.toLowerCase() === 'fechado' || horarioFechamento.toLowerCase() === 'fechado') {
        // Caso apenas um dos horários esteja como 'fechado'
        horarioExibicao = '<span class="horario"><i class="fas fa-clock"></i> Horário não disponível</span>';
    } else {
        horarioExibicao = `<span class="horario"><i class="fas fa-clock"></i> ${horarioAbertura} - ${horarioFechamento}</span>`;
    }

    const nivelClasse = `nivel-${estabelecimento.nivel}`;
    const tagPeco     =obterTagHTML(estabelecimento.preco)
    return `
    <div class="card-content ${nivelClasse}">
        <div class="card">
            <a href="detalhes.html?id=${estabelecimento._id}" class="">
                <img src="${imageUrl}" loading="lazy" alt="Imagem do Estabelecimento">
                ${tagPeco}
            </a>
            <div class="overlay">
                <div class="estabelecimento-header">
                    <span class="estabelecimento-nome">${estabelecimento.nome}</span>
                    <span class="icon-container">
                        <i class="fas fa-star"></i> ${estabelecimento.estrelas}
                    </span>
                </div>
                <div class="estabelecimento-info">
                    <span class="localizacao"><i class="fas fa-map-marker-alt"></i> ${resultado}</span>
                    ${horarioExibicao}
                </div>
                <div class="estabelecimento-info">
                    <span class="culinaria"><i class="fa fa-cutlery"></i> ${cozinhaFormatado}</span>
                </div>
                <div class="estabelecimento-info">
                    <span class="localizacao">${localFormatado}</span>
                </div>
            </div>
        </div>
    </div>
    `;
}



async function renderizaEstabelecimentos(dados) {
    const container = document.getElementById('estabelecimentos');
    // Verifica se há estabelecimentos a serem exibidos
    if (dados.length === 0) {
        // Exibe uma mensagem amigável caso não encontre estabelecimentos
        container.innerHTML = `
            <div class="mensagem-vazia">
                <span class="mensagem-vazia-icon">&#128546;</span>
                <p>Desculpe, não encontramos nenhum estabelecimento <br>
                 Ajuste os filtros para enocntrar outras opções.... <br>
                 Em breve teremos mais opções que atendem a essas características!</p>
            </div>`;
        return;
    }
    // Cria um array de Promises usando 'criarCard'
    const promises = dados.map(estabelecimento => criarCard(estabelecimento));

    // Aguarda todas as Promises serem resolvidas
    const cards = await Promise.all(promises);

    // Constrói uma única string HTML com todos os cards
    const cardsHTML = cards.join('');

    // Adiciona a string ao HTML de uma só vez
    container.innerHTML = cardsHTML;
}


async function atualizarEstabelecimentos(pagina) {
    exibirLoader();
    const estabelecimentosPorPagina = 12;
    const inicio = (pagina - 1) * estabelecimentosPorPagina;
    const fim = inicio + estabelecimentosPorPagina;
    const dadosPagina = estabelecimentosFiltrados.slice(inicio, fim);
    await renderizaEstabelecimentos(dadosPagina);
    esconderLoader();
    criaPaginacao(estabelecimentosFiltrados.length, estabelecimentosPorPagina, pagina);
    if (pagina!=1){
        document.getElementById('filtros-container').scrollIntoView({ behavior: 'smooth' });
    }
    else {
        document.getElementById('video-principal').scrollIntoView({ behavior: 'smooth' });
    }
}

function exibirLoader() {
  const overlay = document.getElementById('overlay2');
  overlay.style.display = 'block';

  const loaderContainer = document.getElementById('loader-container');
  const spinner = new Spinner().spin(loaderContainer);
}

// Função para esconder o loader e o overlay
function esconderLoader() {
  const overlay = document.getElementById('overlay2');
  overlay.style.display = 'none';

  const loaderContainer = document.getElementById('loader-container');
  loaderContainer.innerHTML = ''; // Limpa o conteúdo do loader
}

function obterTagHTML(valor) {
    let tagTexto = ''; // Inicialize a tag de texto vazia

    // Determine a tag de texto com base no valor
    switch (valor) {
        case 1:
            tagTexto = 'Até R$30,00';
            break;
        case 2:
            tagTexto = 'De R$30 à R$60';
            break;
        case 3:
            tagTexto = 'De R$60 à R$150';
            break;
        case 4:
            tagTexto = 'De R$150 à R$300';
            break;
        case 5:
            tagTexto = 'Acima de R$300';
            break;
        default:
            tagTexto = 'Valor inválido'; // Valor não corresponde a nenhuma opção
    }

    // Adicione o atributo title para o tooltip
    const tooltip = 'Média por pessoa'; // Comentário que aparecerá no tooltip
    const tagHTML = `<div class="tag-texto" title="${tooltip}">${tagTexto}</div>`;

    // Retorne a tag de texto no formato HTML
    return tagHTML;
}