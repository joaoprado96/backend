async function atualizarIndicador(LugarId, nomeIndicador, nomeEstabelecimento) {
  const url = `/api/atualizarIndicador/${LugarId}/${nomeIndicador}`;
  const body = {
    nome: nomeEstabelecimento
  };

  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    // Verifica se a resposta é do tipo JSON antes de tentar analisar
    if (response.headers.get('Content-Type').includes('application/json')) {
        const responseData = await response.json();
        return responseData;
    } else {
        const responseText = await response.text();
        return null;
    }
} catch (error) {
    console.error('Erro ao atualizar indicador:', error);
}
}

function acaoDoUsuario(LugarId, nomeIndicador ,nomeEstabelecimento) {
    // Chama a função sem aguardar pela resposta
    atualizarIndicador(LugarId, nomeIndicador, nomeEstabelecimento)
        .catch(error => {
            // Trate o erro de forma discreta, se necessário
            console.error('Erro ao atualizar indicador:', error);
        });
}
