async function atualizarIndicador(LugarId, nomeIndicador, nomeEstabelecimento) {
  const url = `http://localhost:3000/api/atualizarIndicador/${LugarId}/${nomeIndicador}`;
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
      // Em vez de lançar um erro, considere enviar esses detalhes para um serviço de log ou monitoramento
      console.error(`Erro HTTP: ${response.status}`); // Remova ou substitua por um logger mais discreto
      return null; // Retorna null ou um valor padrão adequado
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Trate os erros silenciosamente em produção, mas você pode querer registrar em algum lugar
    console.error('Erro ao atualizar indicador:', error); // Remova ou substitua por um logger mais discreto
    return null; // Retorna null ou um valor padrão adequado
  }
}

function acaoDoUsuario(LugarId,nomeIndicador ,nomeEstabelecimento) {
    // Chama a função sem aguardar pela resposta
    atualizarIndicador(LugarId, nomeIndicador, nomeEstabelecimento)
        .catch(error => {
            // Trate o erro de forma discreta, se necessário
            console.error('Erro ao atualizar indicador:', error);
        });
}
