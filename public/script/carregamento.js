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

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const lugarId = document.getElementById('lugarId').value;
    const fotos = document.getElementById('fotos').files;
    const formData = new FormData();

    formData.append('lugarId', lugarId);
    for (let i = 0; i < fotos.length; i++) {
        formData.append('fotos', fotos[i]);
    }

    fetch('http://your-api-url.com/fotos-lugares', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => alert('Fotos enviadas com sucesso!'))
    .catch(error => console.error('Erro ao enviar fotos:', error));
});
