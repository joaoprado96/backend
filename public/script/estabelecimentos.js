// Variável global
let estabelecimentos = [];
let estabelecimentosFiltrados = [];
let diaDaSemanaGlobal;
let filtroTipoEventoAtual = null; // Variável global para armazenar o tipo de evento selecionado


document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
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
            // inicializarCarrosselFiltros(); // Chame esta função depois que os estabelecimentos forem carregados
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
    // Esta função preencherá os elementos de filtro com opções baseadas nos estabelecimentos carregados
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

    const filtroCozinha = document.getElementById('filtro-cozinha');
    cozinhas.forEach(c => filtroCozinha.add(new Option(c, c)));

    const filtroRegiao = document.getElementById('filtro-regiao');
    regioes.forEach(r => filtroRegiao.add(new Option(r, r)));

    const filtroBairro = document.getElementById('filtro-bairro');
    bairros.forEach(b => filtroBairro.add(new Option(b, b)));

    const filtroCartao = document.getElementById('filtro-cartao');
    cartoes.forEach(ct => filtroCartao.add(new Option(ct, ct)));
    
    const filtroLocal = document.getElementById('filtro-local');
    locais.forEach(l => filtroLocal.add(new Option(l, l)));
    
    const filtroEntrada = document.getElementById('filtro-entrada');
    entradas.forEach(ent => filtroEntrada.add(new Option(ent, ent)));

    const filtroMetro = document.getElementById('filtro-metro');
    linhas_metro.forEach(metro => filtroMetro.add(new Option(metro, metro)));

    const filtroEstacao = document.getElementById('filtro-estacao');
    estacoes.forEach(esta => filtroEstacao.add(new Option(esta, esta)));

    const filtroAcessibilidade = document.getElementById('filtro-acessibilidade');
    acessibilidades.forEach(acess => filtroAcessibilidade.add(new Option(acess, acess)));

    const filtroEstiloMusical = document.getElementById('filtro-musical');
    estilos_musicais.forEach(mus => filtroEstiloMusical.add(new Option(mus, mus)));

    const filtroEstiloServico = document.getElementById('filtro-servico');
    estilos_servicos.forEach(serv => filtroEstiloServico.add(new Option(serv, serv)));

    const filtroHobby = document.getElementById('filtro-hobby');
    hobbys.forEach(hoby => filtroHobby.add(new Option(hoby, hoby)));

    const filtroAmbiente = document.getElementById('filtro-ambiente');
    ambientes.forEach(amb => filtroAmbiente.add(new Option(amb, amb)));

    adicionarEventListenersParaFiltros();
}

function adicionarEventListenersParaFiltros() {
    document.getElementById('filtro-cozinha').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-regiao').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-bairro').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-cartao').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-local').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-entrada').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-metro').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-estacao').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-acessibilidade').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-musical').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-servico').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-hobby').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-ambiente').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-musica').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-estacionamento').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-cover').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-kids').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-pet').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-glutenfree').addEventListener('change', () => aplicarFiltros());
    document.getElementById('filtro-lactosefree').addEventListener('change', () => aplicarFiltros());
}
function limparFiltros() {
    // Resetar os filtros de seleção (dropdowns) para o valor padrão
    document.getElementById('filtro-cozinha').value = '';
    document.getElementById('filtro-regiao').value = '';
    document.getElementById('filtro-bairro').value = '';
    document.getElementById('filtro-cartao').value = '';
    document.getElementById('filtro-local').value = '';
    document.getElementById('filtro-entrada').value = '';
    document.getElementById('filtro-metro').value = '';
    document.getElementById('filtro-estacao').value = '';
    document.getElementById('filtro-acessibilidade').value = '';
    document.getElementById('filtro-musical').value = '';
    document.getElementById('filtro-servico').value = '';
    document.getElementById('filtro-hobby').value = '';
    document.getElementById('filtro-ambiente').value = '';

    // Resetar os filtros de checkbox
    document.getElementById('filtro-musica').checked = false;
    document.getElementById('filtro-estacionamento').checked = false;
    document.getElementById('filtro-cover').checked = false;
    document.getElementById('filtro-kids').checked = false;
    document.getElementById('filtro-pet').checked = false;
    document.getElementById('filtro-glutenfree').checked = false;
    document.getElementById('filtro-lactosefree').checked = false;

    // Aplicar os filtros após o reset
    aplicarFiltros();
}

function aplicarFiltros() {
    let resultadosFiltro = estabelecimentos;
    // Filtros de seleção (dropdowns)
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
    const filtroCover = document.getElementById('filtro-cover').checked;
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
        const matchCover = !filtroCover || estabelecimento.cover === (filtroCover ? 'Sim' : 'Não');
        const matchKids = !filtroKids || estabelecimento.kids === (filtroKids ? 'Sim' : 'Não');
        const matchPet = !filtroPet || estabelecimento.pet === (filtroPet ? 'Sim' : 'Não');
        const matchGlutenfree = !filtroGlutenfree || estabelecimento.glutenfree === (filtroGlutenfree ? 'Sim' : 'Não');
        const matchLactosefree = !filtroLactosefree || estabelecimento.lactosefree === (filtroLactosefree ? 'Sim' : 'Não');

        return matchCozinha && matchRegiao && matchBairro && matchCartao && matchLocal &&
               matchEntrada && matchMetro && matchEstacao && matchAcessibilidade &&
               matchEstiloMusical && matchEstiloServico && matchHobby && matchAmbiente &&
               matchMusica && matchEstacionamento && matchCover && matchKids &&
               matchPet && matchGlutenfree && matchLactosefree;
    });

    // Adicionar filtragem adicional para tipo de evento, se necessário
    if (filtroTipoEventoAtual) {
        estabelecimentosFiltrados = estabelecimentosFiltrados.filter(estabelecimento => 
            estabelecimento.tipo_evento.includes(filtroTipoEventoAtual));
    }

    atualizarEstabelecimentos(1); // Reset para a primeira página após filtrar
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
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        responsive: [
            {
                breakpoint: 1024, // Largura máxima de 1024px
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 600, // Largura máxima de 600px
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 480, // Largura máxima de 480px
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            }
        ]
    });
    

    // Adicionar event listener para seleção de tipo de evento
    $('.item-carrossel').on('click', function() {
        const tipoSelecionado = $(this).find('h2').text();
        aplicarFiltroTipoEvento(tipoSelecionado);
    });
}

function buscarImagemParaTipoEvento(tipo) {
    const imagensTipoEvento = {
        "Beber e dançar": "icons/beberedancar.png",
        "Primeiro encontro": "icons/beberedancar.png",
        "Conversar": "icons/conversar.png",
        "Lugares romântico": "icons/romantico.png",
        "Reunião de amigos": "icons/reuniao.png",
        "Encontro familiar": "icons/familiar.png",
        "Festa de aniversário": "icons/aniversario.png",
        "Happy Hour": "icons/happyhour.png",
        "Assistir jogos esportivos": "icons/assistirjogos.png",
        "Clube de comédia": "icons/comedia.png",
        "Balada": "icons/balada.png",
        "Experiência gastronômica": "icons/beberedancar.png",
        "Cabaré/Boates": "icons/beberedancar.png",
        "Música ao vivo": "icons/musica.png",
        "Diferentão": "icons/beberedancar.png",
        "Karaokê": "icons/karaoke.png",
        "LGBTQIA+": "icons/beberedancar.png",
        "Comer e Jogar": "icons/beberedancar.png",
        "Temático": "icons/beberedancar.png",
        "Sair sozinho": "icons/sairsozinha.png",
        // Adicionar mais correspondências de tipos de evento e imagens
    };

    return imagensTipoEvento[tipo] || "icons/icon-gluten.png";
}

function aplicarFiltroTipoEvento(tipoSelecionado) {
    estabelecimentosFiltrados = estabelecimentos.filter(estabelecimento =>
        estabelecimento.tipo_evento.includes(tipoSelecionado)
    );
    atualizarEstabelecimentos(1); // Atualizar para mostrar apenas os estabelecimentos filtrados
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
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${paginaAtual - 1})">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${i})">${i}</button>`;
    }

    if (paginaAtual < totalPaginas) {
        paginacaoContainer.innerHTML += `<button onclick="loadEstabelecimentos(${paginaAtual + 1})">Próxima</button>`;
    }
}

async function criarCard(estabelecimento) {
    const horarioHoje = estabelecimento.horarios_funcionamento[diaDaSemanaGlobal];
    let horarioAbertura = horarioHoje ? horarioHoje.abertura : 'Indisponível';
    let horarioFechamento = horarioHoje ? horarioHoje.fechamento : 'Indisponível';
    const imageUrl = await buscarPrimeiraFoto(estabelecimento._id);

    // Tratar caso de estabelecimento fechado
    let horarioExibicao;
    if (horarioAbertura.toLowerCase() === 'fechado' && horarioFechamento.toLowerCase() === 'fechado') {
        horarioExibicao = '<span class="horario"><i class="fas fa-clock"></i> Fechado</span>';
    } else if (horarioAbertura.toLowerCase() === 'fechado' || horarioFechamento.toLowerCase() === 'fechado') {
        // Caso apenas um dos horários esteja como 'fechado'
        horarioExibicao = '<span class="horario"><i class="fas fa-clock"></i> Horário não disponível</span>';
    } else {
        horarioExibicao = `<span class="horario"><i class="fas fa-clock"></i> ${horarioAbertura} - ${horarioFechamento}</span>`;
    }

    const nivelClasse = `nivel-${estabelecimento.nivel}`;

    return `
    <div class="card-content ${nivelClasse}">
        <div class="card">
            <a href="detalhes.html?id=${estabelecimento._id}" class="">
                <img src="${imageUrl}" alt="Imagem do Estabelecimento">
            </a>
            <div class="overlay">
                <div class="estabelecimento-header">
                    <span class="estabelecimento-nome">${estabelecimento.nome}</span>
                    <span class="icon-container">
                        <i class="fas fa-star"></i> ${estabelecimento.avaliacao_clientes}
                    </span>
                </div>
                <div class="estabelecimento-info">
                    ${horarioExibicao}
                    <span class="localizacao"><i class="fas fa-map-marker-alt"></i> ${estabelecimento.bairro}</span>
                </div>
            </div>
        </div>
    </div>
    `;
}



async function renderizaEstabelecimentos(dados) {
    const container = document.getElementById('estabelecimentos');
    container.innerHTML = '';

    // Cria um array de Promises usando 'criarCard'
    const promises = dados.map(estabelecimento => criarCard(estabelecimento));

    // Aguarda todas as Promises serem resolvidas
    const cards = await Promise.all(promises);

    // Adiciona cada card resolvido ao HTML
    cards.forEach(card => container.innerHTML += card);
}

async function atualizarEstabelecimentos(pagina) {
    const estabelecimentosPorPagina = 28;
    const inicio = (pagina - 1) * estabelecimentosPorPagina;
    const fim = inicio + estabelecimentosPorPagina;
    const dadosPagina = estabelecimentosFiltrados.slice(inicio, fim);
    await renderizaEstabelecimentos(dadosPagina);
    criaPaginacao(estabelecimentosFiltrados.length, estabelecimentosPorPagina, pagina);
}
