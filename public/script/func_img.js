function bufferToBase64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function buscarPrimeiraFoto(lugarId) {
    return fetch(`/api/primeira-foto-lugar/${lugarId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar foto');
            }
            return response.blob(); // Converte a resposta em um Blob
        })
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob); // Cria uma URL a partir do Blob
            return imageUrl;
        })
        .catch(error => {
            console.error('Erro ao carregar a primeira foto:', error);
            return './image/restaurante.jpg'; // Imagem padrão em caso de erro
        });
}
