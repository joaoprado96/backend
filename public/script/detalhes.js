//testando uma coisa



//testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee


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
    const urlParams = new URLSearchParams(window.location.search);
    const estabelecimentoId = urlParams.get('id');
    carregarFotos(estabelecimentoId);
    
    if (estabelecimentoId) {
        fetch(`/api/lugares?_id=${estabelecimentoId}`)
            .then(response => response.json())
            .then(dados => {
                const detalhesContainer = document.getElementById('detalhe-estabelecimento');
                if (dados.length > 0) {
                    detalhesContainer.innerHTML = criarCardDetalhe(dados[0]);
                } else {
                    detalhesContainer.innerHTML = '<p>Estabelecimento não encontrado.</p>';
                }
            })
            .catch(erro => console.error('Erro ao carregar detalhes do estabelecimento:', erro));
    }
});

function criarAvaliacao(avaliacao) {
    const maxEstrelas = 5;
    const estrelasPreenchidas = Math.round(avaliacao);

    let estrelasHtml = '';
    for (let i = 1; i <= maxEstrelas; i++) {
        if (i <= estrelasPreenchidas) {
            estrelasHtml += '<span class="star">&#9733;</span>'; // Estrela preenchida
        } else {
            estrelasHtml += '<span class="unfilled-star">&#9733;</span>'; // Estrela vazia
        }
    }

    return `<div class="rating">${estrelasHtml}</div>`;
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

function carregarFotos(lugarId) {
    const carouselContainer = document.getElementById('carouselContainer');
    carouselContainer.innerHTML = '';

    fetch(`/api/fotos-lugares/${lugarId}`)
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

function criarCarrosselIndividual(idCarrossel,tamanho , maximo, titulo, itens) {
    if (!itens || itens.length === 0) {
        return '<p>Nenhuma informação disponível</p>';
    }

    let carouselIndicators = '<ol class="carousel-indicators">';
    let carouselInner = '<div class="carousel-inner">';
    const maxCardsPorSlide = maximo;
    
    for (let i = 0; i < itens.length; i += maxCardsPorSlide) {
        let slideContent = '';
        for (let j = i; j < i + maxCardsPorSlide && j < itens.length; j++) {
            slideContent += `
                <div class="card" style="flex: 0 0 auto; width: ${tamanho}rem; margin-right: 15px;">
                    <div class="card-body">
                        <p class="card-text">${itens[j]}</p>
                    </div>
                </div>`;
        }

        carouselIndicators += `<li data-target="#${idCarrossel}" data-slide-to="${i / maxCardsPorSlide}" class="${i === 0 ? 'active' : ''}"></li>`;
        carouselInner += `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <div class="d-flex">${slideContent}</div>
            </div>`;
    }

    carouselIndicators += '</ol>';
    carouselInner += '</div>';

    return `
        <div id="${idCarrossel}" class="carousel slide" data-ride="carousel">
            ${carouselIndicators}
            ${carouselInner}
            <a class="carousel-control-prev" href="#${idCarrossel}" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#${idCarrossel}" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;
}

function criarInformacaoHtml(titulo, icone, valor) {
    // Verifica se o valor é uma lista
    if (Array.isArray(valor)) {
        // Usa apenas o primeiro elemento da lista
        valor = valor.length > 0 ? valor[0] : '';
    }

    // Se o valor for 'Nao' ou uma lista vazia, retorna string vazia
    if (valor !== 'Sim') {
        return '';
    } else {
        // Retorna o HTML formatado com o valor (que pode ser string ou primeiro elemento da lista)
        return `
            <div class="col-3">
                <h6><img src="${icone}" alt="${titulo}" width="50" height="50"> ${titulo} </h6>
            </div>
        `;
    }
}

function criarInformacaoHtmlLista(titulo, icone, valor) {
    let conteudoHtml = '';

    // Verifica se o valor é uma lista
    if (Array.isArray(valor)) {
        // Itera sobre todos os elementos da lista e os adiciona ao conteudoHtml
        valor.forEach(item => {
            conteudoHtml += `<p>${item}</p>`;
        });
    } else {
        // Se o valor não for uma lista, trata como uma string
        conteudoHtml = `<p>${valor}</p>`;
    }

    // Se o valor for 'Nao' ou uma lista vazia, retorna string vazia
    if (conteudoHtml === '') {
        return '';
    } else {
        // Retorna o HTML formatado com o valor (que pode ser string ou elementos da lista)
        return `
            <div class="col-3">
                <h6><img src="${icone}" alt="${titulo}" width="50" height="50"> ${titulo} </h6>
                ${conteudoHtml}
            </div>
        `;
    }
}

function exibirHorariosFuncionamento(horarios) {
    let htmlHorarios = '';
    for (const [dia, horario] of Object.entries(horarios)) {
        htmlHorarios += `
            <div class="dia">
                ${capitalizeFirstLetter(dia)}: 
                <span class="horario">${horario.abertura} - ${horario.fechamento}</span>
            </div>`;
    }
    return htmlHorarios;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function criarCardDetalhe(estabelecimento) {
    const htmlHorarios              =exibirHorariosFuncionamento(estabelecimento.horarios_funcionamento)
    //  Elementos que são "Sim" ou "Não"
    const infoMusica                =criarInformacaoHtml('musica','./icons/icon1.png',estabelecimento.musica)
    const infoEstacionamento        =criarInformacaoHtml('estacionamento','./icons/icon1.png',estabelecimento.estacionamento)
    const infoKids                  =criarInformacaoHtml('espaço criança','./icons/icon1.png',estabelecimento.kids)
    const infoPet                   =criarInformacaoHtml('pet friendly','./icons/icon1.png',estabelecimento.pet)
    const infoGluten                =criarInformacaoHtml('gluten free','./icons/icon-gluten.png',estabelecimento.glutenfree)
    const infoLactose               =criarInformacaoHtml('lactose free','./icons/icon1.png',estabelecimento.lactosefree)

    // Elementos que são listas
    const infoCozinha               =criarInformacaoHtmlLista('culinária','./icons/icon1.png',estabelecimento.cozinha)
    const infoEstiloMusical         =criarInformacaoHtmlLista('estilo musical','./icons/icon1.png',estabelecimento.estilo_musical)
    const infoTipoEvento            =criarInformacaoHtmlLista('evento','./icons/icon1.png',estabelecimento.tipo_evento)
    const infoLocal                 =criarInformacaoHtmlLista('tipo de local','./icons/icon1.png',estabelecimento.local)
    const infoAmbiente              =criarInformacaoHtmlLista('ambiente','./icons/icon1.png',estabelecimento.ambiente)
    const infoHobby                 =criarInformacaoHtmlLista('hobby','./icons/icon1.png',estabelecimento.hobby)
    const infoCartao                =criarInformacaoHtmlLista('cartões','./icons/icon1.png',estabelecimento.cartao)

    return `
    <div class="container">
        <div class="container">
            <div class="row link-background">
                <!-- Abas de Navegação -->
                <ul class="nav nav-tabs nav-details" id="estabelecimentoTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link letra-nav" id="descricao-tab" data-toggle="tab" href="#descricao" role="tab" aria-controls="descricao" aria-selected="true">descrição</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link letra-nav" id="localizacao-tab" data-toggle="tab" href="#localizacao" role="tab" aria-controls="localizacao" aria-selected="false">localização</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link letra-nav" id="informacoes-tab" data-toggle="tab" href="#informacoes" role="tab" aria-controls="informacoes" aria-selected="false">informações</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link letra-nav" id="horario-tab" data-toggle="tab" href="#horario" role="tab" aria-controls="horario" aria-selected="false">horário</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link letra-nav" id="menu-tab" data-toggle="tab" href="#menu" role="tab" aria-controls="menu" aria-selected="false">menu</a>
                    </li>
                </ul>
                <h1 class="mt-4 mb-4">${estabelecimento.nome}</h1>
                <!-- Conteúdo das Abas -->
                <div class="tab-content" id="estabelecimentoTabContent">
                    <div class="tab-pane fade show active" id="descricao" role="tabpanel" aria-labelledby="descricao-tab">
                        <!-- Conteúdo da aba Descrição -->
                        <p>${estabelecimento.descricao}</p>
                        <div class="row descricao-star">
                        <div class="col-4">
                            <h5>estrelas</h5>
                            <div class="rating">
                                ${criarAvaliacao(estabelecimento.estrelas)}
                            </div>
                        </div>
                        <div class="col-4">
                            <h5>avalição clientes</h5>
                            <div class="rating">
                                ${criarAvaliacao(estabelecimento.avaliacao_clientes)}
                            </div>
                        </div>
                        <div class="col-4">
                            <h5>preço</h5>
                            <div class="rating">
                                ${criarAvaliacao(estabelecimento.preco)}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="tab-pane fade" id="localizacao" role="tabpanel" aria-labelledby="localizacao-tab">
                        <!-- Conteúdo da aba Localização -->
                        <p><strong>endereço:</strong> ${estabelecimento.rua}, ${estabelecimento.bairro}, ${estabelecimento.cidade}, ${estabelecimento.cep} </p>
                        <p><strong>bairro:</strong> ${estabelecimento.bairro} </p>
                        <p><strong>região:</strong> ${estabelecimento.regiao} </p>
                        <p><strong>cidade:</strong> ${estabelecimento.cidade} </p>
                        <p><strong>linha metro:</strong> ${estabelecimento.linha_metro} </p>
                        <p><strong>estacao mais próxima:</strong> ${estabelecimento.estacao} </p>
                    </div>
                    <div class="tab-pane fade" id="informacoes" role="tabpanel" aria-labelledby="informacoes-tab">
                        <!-- Conteúdo da aba Informações -->
                        <div class="row">
                            <p>${infoMusica}</p>
                            <p>${infoEstacionamento}</p>
                            <p>${infoKids}</p>
                            <p>${infoPet}</p>
                            <p>${infoGluten}</p>
                            <p>${infoAmbiente}</p>
                            <p>${infoHobby}</p>
                            <p>${infoLactose}</p>
                            <p>${infoMusica}</p>
                            <p>${infoCozinha}</p>
                            <p>${infoEstiloMusical}</p>
                            <p>${infoTipoEvento}</p>
                            <p>${infoLocal}</p>
                            <p>${infoCartao}</p>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="horario" role="tabpanel" aria-labelledby="horario-tab">
                        <!-- Conteúdo da aba Horário -->
                        ${htmlHorarios}
                    </div>
                    <div class="tab-pane fade" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                        <!-- Conteúdo da aba Menu -->
                        <p><strong>região:</strong> ${estabelecimento.link_pagina} </p>
                        <p><strong>Cardápio:</strong> ${estabelecimento.link_cardapio} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

