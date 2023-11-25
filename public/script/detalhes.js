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



function criarCardDetalhe(estabelecimento) {
    console.log(estabelecimento);
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
        
        <br><h2>localização</h2>
        <p><strong>endereço:</strong> ${estabelecimento.rua}, ${estabelecimento.bairro}, ${estabelecimento.cidade}, ${estabelecimento.cep} </p>
        <p><strong>bairro:</strong> ${estabelecimento.bairro} </p>
        <p><strong>cidade:</strong> ${estabelecimento.cidade} </p>
        
        <br><h2>contato</h2>

        <br><h2>fotos</h2>
        <br>
    </div>
    `;
}

