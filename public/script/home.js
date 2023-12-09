document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    initializeFormOptions();
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
    const horarioAbertura = document.getElementById('horario_abertura').value;
    const horarioFechamento = document.getElementById('horario_fechamento').value;
    const cartao = document.getElementById('cartao').value;
    const preco = document.getElementById('preco').value;
    const local = document.getElementById('local').value;
    const cozinha = document.getElementById('cozinha').value;

    // Construir a query string
    const queryParams = new URLSearchParams();
    if (bairro) queryParams.append('bairro', bairro);
    if (dia) queryParams.append('dia', dia);
    if (horarioAbertura) queryParams.append('horario_abertura', horarioAbertura);
    if (horarioFechamento) queryParams.append('horario_fechamento', horarioFechamento);
    if (cartao) queryParams.append('cartao', cartao);
    if (preco) queryParams.append('preco', preco);
    if (local) queryParams.append('local', local);
    if (cozinha) queryParams.append('cozinha', cozinha);

    // Redirecionar para a página de estabelecimentos com os parâmetros da query string
    window.location.href = `estabelecimentos.html?${queryParams.toString()}`;
});