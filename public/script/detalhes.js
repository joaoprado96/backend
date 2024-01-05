document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
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
                    adicionarEventosDeCompartilhamento(); 
                    initMap(dados[0].latitude, dados[0].longitude);
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

function buscarPrimeiraFoto(lugarId) {
    return fetch(`/api/fotos-lugares/${lugarId}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].fotos.length > 0) {
                const foto = data[0].fotos[0];
                return `data:${foto.contentType};base64,${bufferToBase64(foto.data.data)}`;
            }
            return './image/restaurante.jpg'; // Imagem padrão se não houver fotos
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
            return './image/restaurante.jpg'; // Imagem padrão em caso de erro
        });
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
                        const isActive = fotoIndex === 0 ? 'active' : '';
            
                        carouselIndicators += `<li data-target="#fotosCarousel" data-slide-to="${fotoIndex}" class="${isActive}"></li>`;
                        carouselInner += `
                            <div class="carousel-item ${isActive}">
                                <img class="d-block w-100 carousel-image" src="data:${foto.contentType};base64,${base64String}" data-index="${fotoIndex}">
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

                // Adicionar o manipulador de eventos após as imagens serem carregadas
                adicionarEventosDeClique();
            } else {
                carouselContainer.innerHTML = '<p>Nenhuma foto encontrada para este lugar.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
            carouselContainer.innerHTML = '<p>Erro ao carregar fotos.</p>';
        });
}

function adicionarEventosDeClique() {
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('click', function() {
            abrirImagemEmModal(this.src);
        });
    });
}

function abrirImagemEmModal(src) {
    // Definir a fonte da imagem no modal
    document.getElementById('imagemModalSrc').src = src;

    // Exibir o modal
    $('#imagemModal').modal('show');
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
            <div class="div-icon-title">
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
            <div class="div-icon-title">
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
    const infoMusica                =criarInformacaoHtml('musica','./icons/icon-musica.png',estabelecimento.musica)
    const infoEstacionamento        =criarInformacaoHtml('estacionamento','./icons/icon-estacionamento.png',estabelecimento.estacionamento)
    const infoKids                  =criarInformacaoHtml('espaço criança','./icons/kids.png',estabelecimento.kids)
    const infoPet                   =criarInformacaoHtml('pet friendly','./icons/icon-petfriendly.png',estabelecimento.pet)
    const infoGluten                =criarInformacaoHtml('gluten free','./icons/icon-glutenfree.png',estabelecimento.glutenfree)
    const infoLactose               =criarInformacaoHtml('lactose free','./icons/icon-lactosefree.png',estabelecimento.lactosefree)

    // Elementos que são listas
    const infoCozinha               =criarInformacaoHtmlLista('culinária','./icons/icon-culinaria.png',estabelecimento.cozinha)
    const infoEstiloMusical         =criarInformacaoHtmlLista('estilo musical','./icons/icon-estilomusical.png',estabelecimento.estilo_musical)
    const infoTipoEvento            =criarInformacaoHtmlLista('evento','./icons/icon-tipoevento.png',estabelecimento.tipo_evento)
    const infoLocal                 =criarInformacaoHtmlLista('tipo de local','./icons/icon-tipolocal.png',estabelecimento.local)
    const infoAmbiente              =criarInformacaoHtmlLista('ambiente','./icons/icon-ambiente.png',estabelecimento.ambiente)
    const infoHobby                 =criarInformacaoHtmlLista('hobby','./icons/icon-hobby.png',estabelecimento.hobby)
    const infoCartao                =criarInformacaoHtmlLista('cartões','./icons/icon-cartao.png',estabelecimento.cartao)

    const cardHtml = `
    <div class="container-custom">
        <div class="tab-nav-container">
            <ul class="nav2" id="estabelecimentoTab">
                <li class="nav2-item">
                    <a class="nav2-link active" href="#descricao">descrição</a>
                </li>
                <li class="nav2-item">
                    <a class="nav2-link" href="#localizacao">localização</a>
                </li>
                <li class="nav2-item">
                    <a class="nav2-link" href="#informacoes">informações</a>
                </li>
                <li class="nav2-item">
                    <a class="nav2-link" href="#horario">horário</a>
                </li>
                <li class="nav2-item">
                    <a class="nav2-link" href="#menu">menu</a>
                </li>
            </ul>
        </div>
        <h1 class="nome-estabelecimento">${estabelecimento.nome}</h1>
        <div class="tab-content-custom" id="estabelecimentoTabContent">
            <div class="tab-pane active" id="descricao">
                <p>${estabelecimento.descricao}</p>
                <div class="info-row">
                    <div class="info-column">
                        <h4 class="h4-small">estrelas</h4>
                        <div class="rating">${criarAvaliacao(estabelecimento.estrelas)}</div>
                    </div>
                    <div class="info-column">
                        <h4 class="h4-small">avaliação</h4>
                        <div class="rating">${criarAvaliacao(estabelecimento.avaliacao_clientes)}</div>
                    </div>
                    <div class="info-column">
                        <h4 class="h4-small">preço</h4>
                        <div class="rating">${criarAvaliacao(estabelecimento.preco)}</div>
                    </div>
                </div>
                <p class="p-small">compartilhe através de:</p>
                <button id="whatsapp-share"> whatsApp</button>
                <button id="instagram-share">instagram</button>
            </div>
            <div class="tab-pane" id="localizacao">
                <p><strong>endereço:</strong> ${estabelecimento.rua}, ${estabelecimento.bairro}, ${estabelecimento.cidade}, ${estabelecimento.cep}</p>
                <button id="copy-address">Copiar Endereço</button>
                <div id="mapa"></div>
                <p><strong>bairro:</strong> ${estabelecimento.bairro}</p>
                <p><strong>região:</strong> ${estabelecimento.regiao}</p>
                <p><strong>cidade:</strong> ${estabelecimento.cidade}</p>
                <p><strong>linha metro:</strong> ${estabelecimento.linha_metro}</p>
                <p><strong>estacao mais próxima:</strong> ${estabelecimento.estacao}</p>
            </div>
            <div class="tab-pane" id="informacoes">
                <div class="info-row">
                    ${infoMusica}
                    ${infoEstacionamento}
                    ${infoKids}
                    ${infoPet}
                    ${infoGluten}
                    ${infoLactose}
                    ${infoAmbiente}
                    ${infoCozinha}
                    ${infoEstiloMusical}
                    ${infoTipoEvento}
                    ${infoLocal}
                    ${infoHobby}
                    ${infoCartao}
                </div>
            </div>
            <div class="tab-pane" id="horario">
                ${htmlHorarios}
            </div>
            <div class="tab-pane" id="menu">
                <p><strong>Instagram:</strong> ${estabelecimento.link_pagina}</p>
                <p><strong>Cardápio:</strong> ${estabelecimento.link_cardapio}</p>
            </div>
        </div>
    </div>
    `;
    return cardHtml;
}

function adicionarEventosDeCompartilhamento() {
    // Adicione aqui os manipuladores de eventos para os botões e outros elementos
    const btnWhatsapp = document.getElementById('whatsapp-share');
    const btnInstagram = document.getElementById('instagram-share');
    const btnCopiar = document.getElementById('copy-address');
    
    var tabs = document.querySelectorAll('.nav2 .nav2-link');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
    
            // Remover a classe 'active' de todas as abas e seus conteúdos
            document.querySelectorAll('.nav2 .nav2-link').forEach(function(navLink) {
                navLink.classList.remove('active');
            });
    
            document.querySelectorAll('.tab-pane').forEach(function(tabPane) {
                tabPane.classList.remove('active');
            });
    
            // Ativa a aba clicada
            this.classList.add('active');
    
            // Obter o ID do conteúdo da aba
            var contentId = this.getAttribute('href').substring(1);
    
            // Selecionar o conteúdo da aba
            var content = document.getElementById(contentId);
            if (content) {
                content.classList.add('active');
            } else {
                console.error('Conteúdo da aba não encontrado:', contentId);
            }
        });
    });
    
    
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', function() {
            // Lógica para compartilhamento no WhatsApp
            var url = window.location.href;
            var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(url);
            window.open(whatsappUrl, '_blank');
        });
    }

    if (btnInstagram) {
        btnInstagram.addEventListener('click', function() {
            // Lógica para compartilhamento no Instagram
            alert('O Instagram não suporta compartilhamento direto de links via web. Copie o link para compartilhar no Instagram.');
        });
    }
    
    if (btnCopiar) {
        btnCopiar.addEventListener('click', copiarEndereco);
    }

}
function copiarEndereco() {
    const endereco = document.querySelector('#localizacao p').innerText;
    navigator.clipboard.writeText(endereco).then(() => {
        alert("Endereço copiado com sucesso!");
    }).catch(err => {
        console.error('Erro ao copiar endereço:', err);
    });
}

function initMap(latitude, longitude) {
    var mapa = L.map('mapa').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Contribuidores do OpenStreetMap'
    }).addTo(mapa);

    L.marker([latitude, longitude]).addTo(mapa);

    // Garantir que o mapa seja responsivo e redimensionado corretamente
    window.addEventListener('resize', function() {
        mapa.invalidateSize();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if (e.target.href.includes('#localizacao')) {
            mapa.invalidateSize();
        }
    });
    
}

