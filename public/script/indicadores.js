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

function enviarDadosDeAcesso(sessionId, evento) {
    // Captura o sistema operacional, tipo de dispositivo e navegador
    const sistemaOperacional = navigator.platform;
    const tipoDispositivo = /Mobi/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    const navegador = navigator.userAgent;
  
    // Captura a resolução da tela
    const resolucaoTela = `${window.screen.width}x${window.screen.height}`;
  
    // Estrutura do objeto de dados a ser enviado
    const dadosDeAcesso = {
      idSessao: sessionId,
      sistemaOperacional: sistemaOperacional,
      tipoDispositivo: tipoDispositivo,
      navegador: navegador,
      resolucaoTela: resolucaoTela,
      localizacao: {}, // Localização será adicionada posteriormente
      eventos: [
        {
          tipo: evento
        }
      ]
    };
  
    // Obter a localização geográfica, se possível
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        dadosDeAcesso.localizacao = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
  
        // Enviar os dados para o servidor
        enviarParaServidor(dadosDeAcesso);
      }, () => {
        // Em caso de erro, ou se a localização não estiver disponível
        enviarParaServidor(dadosDeAcesso);
      });
    } else {
      // Se a geolocalização não for suportada pelo navegador
      enviarParaServidor(dadosDeAcesso);
    }
  }
  
  function enviarParaServidor(dados) {
    fetch('/api/adicionar-evento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .catch(error => console.error('Erro ao enviar dados:', error));
  }
  