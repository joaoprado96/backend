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
        fetch(`http://localhost:3000/api/lugares?_id=${estabelecimentoId}`)
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

function criarCarrosselIndividual(idCarrossel,tamanho , maximo,titulo, itens) {
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



function criarCardDetalhe(estabelecimento) {
    const carrosselCozinha          = criarCarrosselIndividual('carrosselCozinha',          '12', 4,  'culinária', estabelecimento.cozinha);
    const carrosselEstiloMusical    = criarCarrosselIndividual('carrosselEstiloMusical',    '12', 4,  'estilo musical', estabelecimento.estilo_musical);
    const carrosselTipoEvento       = criarCarrosselIndividual('carrosselTipoEvento',       '12', 4,  'tipo de evento', estabelecimento.tipo_evento);
    const carrosselLocal            = criarCarrosselIndividual('carrosselLocal',            '12', 4,  'locais', estabelecimento.local);
    const carrosselAmbiente         = criarCarrosselIndividual('carrosselAmbiente',         '12', 4,  'ambientes', estabelecimento.ambiente);
    const carrosselHobby            = criarCarrosselIndividual('carrosselHobby',            '12', 4,  'hobby', estabelecimento.hobby);
    const carrosselCartao           = criarCarrosselIndividual('carroselCartao',            '10', 6,  'cartao', estabelecimento.cartao);
    const carrosselDias             = criarCarrosselIndividual('carrosselDias',             '9', 8,  'dias', estabelecimento.dias);
    const carrosselHora             = criarCarrosselIndividual('carrosselHora',             '6', 8,  'hora', estabelecimento.hora);
    const carrosselEstiloServico    = criarCarrosselIndividual('carrosselEstiloServico',    '12', 4,  'estilo serviço', estabelecimento.estilo_servico);

    return `
    <div class="container">
        <h1>${estabelecimento.nome}</h1>
        <p>${estabelecimento.descricao}</p>
        <h2>avalicação</h2>
        <div class="row">
            <div class="col-2">
                <h5>estrelas</h5>
                <div class="rating">
                    ${criarAvaliacao(estabelecimento.estrelas)}
                </div>
            </div>
            <div class="col-2">
                <h5>avalição clientes</h5>
                <div class="rating">
                    ${criarAvaliacao(estabelecimento.avaliacao_clientes)}
                </div>
            </div>
            <div class="col-2">
                <h5>preço</h5>
                <div class="rating">
                    ${criarAvaliacao(estabelecimento.preco)}
                </div>
            </div>
        </div>

        <br><h2>comodidades</h2>
        <div class="row">
            <div class="col-3">
                <h6>musica</h6>
                <p>${estabelecimento.musica === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>estacionamento</h6>
                <p>${estabelecimento.estacionamento === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>área kids</h6>
                <p>${estabelecimento.kids === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>taxa de cover</h6>
                <p>${estabelecimento.cover === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>pet</h6>
                <p>${estabelecimento.pet === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>gluten free</h6>
                <p>${estabelecimento.glutenfree === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
            <div class="col-3">
                <h6>lactose free</h6>
                <p>${estabelecimento.lactosefree === 'Sim' ? '<i class="fas fa-check"></i> Sim' : '<i class="fas fa-times"></i> Não'}</p>
            </div>
        </div>

        <br><h2>funcionamento</h2>
        <h5>dias</h5>
        <p>${carrosselDias} </p>
        <h5>horário</h5>
        <p>${carrosselHora} </p>

        <br><h2>detalhes gerais</h2>
        <h5>culinária</h5>
        <p>${carrosselCozinha} </p>
        <h5>estilo serviço</h5>
        <p>${carrosselEstiloServico} </p>
        <h5>tipo de evento</h5>
        <p>${carrosselTipoEvento} </p>
        <h5>estilo musical</h5>
        <p>${carrosselEstiloMusical} </p>
        <h5>caracteristicas locais</h5>
        <p>${carrosselLocal} </p>
        <h5>ambiente</h5>
        <p>${carrosselAmbiente} </p>
        <h5>hobby</h5>
        <p>${carrosselHobby} </p>

        <br><h2>formas de pagamento</h2>
        <h5>cartões aceitos</h5>
        <p>${carrosselCartao} </p>

        <br><h2>localização</h2>
        <p><strong>endereço:</strong> ${estabelecimento.rua}, ${estabelecimento.bairro}, ${estabelecimento.cidade}, ${estabelecimento.cep} </p>
        <p><strong>bairro:</strong> ${estabelecimento.bairro} </p>
        <p><strong>cidade:</strong> ${estabelecimento.cidade} </p>
        
        <br><h2>contato</h2>

        <br><h2>fotos</h2>
    </div>
    `;
}

