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
