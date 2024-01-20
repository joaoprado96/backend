document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    fetch('/api/sessoes-por-dia')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(dados => {
            // Preparar os dados para o gráfico
            const labels = dados.map(item => `${item.data.day}/${item.data.month}/${item.data.year}`);
            const quantidades = dados.map(item => item.quantidade);

            // Criar o gráfico
            const ctx = document.getElementById('acessosPorDia').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar', // Tipo do gráfico
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quantidade de Acessos',
                        data: quantidades,
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
});


