import requests

# URL da API
url = 'http://localhost:3000/api/lugares'  # Substitua pela URL correta da sua API

lugar = {
  "nome": "Casa do Raimundo",
  "descricao": "Bar e restaurante com uma mistura de culinária brasileira e portuguesa,situado no famoso edifício Copan e comandando pelo chef Raimundo Oliveira,que já comandou restaurantes conceituados e agora comanda a cozinha da Casa do Raimundo",
  "rua": "Rua Araújo,331",
  "cep": "05416-011",
  "cidade": "São Paulo",
  "bairro": "República",
  "regiao": "Centro",
  "entrada": "Gratuita",
  "linha_metro": ["Linha 3 (Vermelha)", "Linha 4 (Amarela)"],
  "estacao": ["República"],
  "estrelas": 5,
  "avaliacao_clientes": 5,
  "avaliacao_pagina": 2,
  "descricao_pagina": "None.",
  "link_pagina": "https://www.instagram.com/casadoraimundo/",
  "midia_pagina":"None",
  "acessibilidade": [
    "Banheiro acessível"
    "Rampas de acesso"
  ],
  "musica": "Sim",
  "estacionamento": "Não",
  "cover": "Não",
  "kids": "Não",
  "website": "none",
  "premio": [
    "Os Melhores da Gastronomia 2023"
  ],
  "estilo_musical": [
    "MPB"
  ],
  "cozinha": [
    "Brasileira",
    "Portuguesa"
  ],
  "local": [
    "Restaurante",
    "Bar"
  ],
  "preco": 3,
  "tipo_evento": [
    "Experiência gastrônomica",
    "Happy Hour"
  ],
  "hobby": [
  ],
  "ambiente": [
    "Térreo"
  ],
  "cartao": [
    "Alelo"
    "American Express"
    "Crédito",
    "Débito",
    "Dinners",
    "Dinheiro",
    "Elo",
    "Goodcard",
    "Hipercard",
    "Mastercard",
    "Ticket Card",
    "Sodexo",
    "Verocard",
    "Visa",
    "VR"
  ],
  "dias": [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "feriados"
  ],
  "nivel":1,
  "link_cardapio":"https://linktree.casadoraimundo.com.br/cardapio",
  "horarios_funcionamento": {
    "segunda-feira": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "terca-feira": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "quarta-feira": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "quinta-feira": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "sexta-feira": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "sabado": {
      "abertura": "11:00",
      "fechamento": "23:00"
    },
    "domingo": {
      "abertura": "Fechado",
      "fechamento": "Fechado"
    },
    "feriados": {
     "abertura": "11:00",
     "fechamento":"23:00"
    }
  },
  "pet": "Sim",
  "estilo_servico": [
    "À la carte"
  ],
  "glutenfree": "Não",
  "lactosefree": "Sim"
}
response = requests.post(url, json=lugar)
if response.status_code == 201:
    print(f"Lugar {lugar['nome']} adicionado com sucesso.")
else:
    print(f"Erro ao adicionar lugar {lugar['nome']}: {response.status_code}")


lugar = {
  "nome": "Bar São Paulo",
  "descricao": "Bar com clima de praia situado às margens da represa do Guarapiranga com porções generosas e drinks autorais.A casa oferece open bar e rodizio de churrasco em dias específicos da semana então fique atento às informações de funcionamento.",
  "rua": " Av. Atlântica ,4002 - Interlagos ",
  "cep": "04772-001",
  "cidade": "São Paulo",
  "bairro": "Interlagos",
  "regiao": "Zona Sul",
  "entrada": "Entre R$10 a R$30",
  "linha_metro": ["Linha 9 (Esmeralda)"],
  "estacao": ["Autódromo"],
  "estrelas": 1,
  "avaliacao_clientes": 4,
  "avaliacao_pagina": 2,
  "descricao_pagina": "None.",
  "link_pagina": "https://www.instagram.com/barsaopauloo/",
  "midia_pagina": "None",
  "acessibilidade": [
    "none"
  ],
  "musica": "Sim",
  "estacionamento": "Sim",
  "cover": "Não",
  "kids": "Sim",
  "website": "none",
  "premio": [
    "none"
  ],
  "estilo_musical": [
    "Sertanejo",
    "Funk",
    "Pagode"
  ],
  "cozinha": [
    "Brasileira"
  ],
  "local": [
    "Bar",
    "Balada"
  ],
  "preco": 3,
  "tipo_evento": [
    "Beber e dançar",
    "Assistir jogos esportivos",
    "Open bar",
    "Open food"
  ],
  "hobby": [
    "none"
  ],
  "ambiente": [
    "Melhores vistas"
  ],
  "cartao": [
    "Crédito",
    "Débito",
    "Dinheiro",
    "Elo",
    "Mastercard",
    "Sodexo",
    "Visa"
  ],
  "dias": [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  ],
  "nivel":1,
  "link_cardapio":"https://qrco.de/bcLxI1?trackSharing=1",
  "horarios_funcionamento": {
    "segunda-feira": {
      "abertura": "12:00",
      "fechamento": "02:00"
    },
    "terca-feira": {
      "abertura": "12:00",
      "fechamento": "18:00"
    },
    "quarta-feira": {
      "abertura": "12:00",
      "fechamento": "18:00"
    },
    "quinta-feira": {
      "abertura": "12:00",
      "fechamento": "01:00"
    },
    "sexta-feira": {
      "abertura": "12:00",
      "fechamento": "04:00"
    },
    "sabado": {
      "abertura": "12:00",
      "fechamento": "04:00"
    },
    "domingo": {
      "abertura": "12:00",
      "fechamento": "00:00"
    }
  },
  "pet": "Não",
  "estilo_servico": [
    "Buffet",
    "À la carte",
    "Rodízio"
  ],
  "glutenfree":  "Não",
  "lactosefree": "Não",
}

response = requests.post(url, json=lugar)
if response.status_code == 201:
    print(f"Lugar {lugar['nome']} adicionado com sucesso.")
else:
    print(f"Erro ao adicionar lugar {lugar['nome']}: {response.status_code}")

lugar = {
  "nome": "Anexo Pinheiros",
  "descricao": "Localizado em uma das 10 ruas mais visitadas de São Paulo,o Anexo Pinheiros oferece uma atmosfera única.Composta por dois ambientes, a casa possui uma decoração baseada na arte urbana e de rua. Do nosso Rooftop, é possível apreciar um por do sol de brilhar os olhos.Além disso, a energia da balada sempre fica por conta dos diferentes DJs que comandam a pista.Venha desfrutar de um lugar aconchegante e animado, localizado no CORAÇÃO de Pinheiros.",
  "rua": "Rua Guaicuí,82",
  "cep": "05416-011",
  "cidade": "São Paulo",
  "bairro": "Pinheiros",
  "regiao": "Zona Oeste",
  "entrada": "R$20",
  "linha_metro":["Linha 4 (Amarela)"],
  "estacao": ["Faria Lima"],
  "estrelas": 4,
  "avaliacao_clientes": 4,
  "avaliacao_pagina": 2,
  "descricao_pagina": "None.",
  "link_pagina": "https://www.instagram.com/anexopinheiros/",
  "midia_pagina": "None",
  "acessibilidade": [
    "não possui"
  ],
  "musica": "Sim",
  "estacionamento": "Não",
  "cover": "Não",
  "kids": "Não",
  "website": "none",
  "premio": [
    "não possui"
  ],
  "estilo_musical": [
    "Funk",
    "Trap"
  ],
  "cozinha": [
    "Brasileira"
  ],
  "local": [
    "Bar",
    "Balada"
  ],
  "preco": 3,
  "tipo_evento": [
    "Beber e dançar"
  ],
  "hobby": [
    "Cantar"
  ],
  "ambiente": [
    "Despojado",
    "Fumódromo"
  ],
  "cartao": [
    "American Express",
    "Crédito",
    "Débito",
    "Dinners",
    "Dinheiro",
    "Elo",
    "Hipercard",
    "Mastercard",
    "Visa"
  ],
  "dias": [
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "feriados"
  ],
  "nivel":1,
  "link_cardapio":"https://cardapio.meep.cloud/96f35786-182c-16f6-04e1-3ae1810c7dbf",
  "horarios_funcionamento": {
    "segunda-feira": {
      "abertura": "Fechado",
      "fechamento": "Fechado"
    },
    "terca-feira": {
      "abertura": "Fechado",
      "fechamento": "Fechado"
    },
    "quarta-feira": {
      "abertura": "Fechado",
      "fechamento": "Fechado"
    },
    "quinta-feira": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "sexta-feira": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "sabado": {
      "abertura": "16:00",
      "fechamento": "05:00"
    },
    "domingo": {
      "abertura": "Fechado",
      "fechamento": "Fechado"
    },
    "feriados": {
     "abertura": "Consultar",
     "fechamento":"Consultar"
    }
  },
  "pet": "Sim",
  "estilo_servico": [
    "À la carte"
  ],
  "glutenfree": "Não",
  "lactosefree": "Não",
}

response = requests.post(url, json=lugar)
if response.status_code == 201:
    print(f"Lugar {lugar['nome']} adicionado com sucesso.")
else:
    print(f"Erro ao adicionar lugar {lugar['nome']}: {response.status_code}")

lugar = {
  "nome": "Candy São Paulo",
  "descricao": "A Candy é um Sushi Bar, com gastronomia japonesa alto padrão e DJ deixando o ambiente do restaurante sempre bem animado! Tem diversos pontos instagramaveis,drinks premiados e claro,uma balada secreta com uma pista de dança que vai até o amanhecer!",
  "rua": "Alameda Lorena,2119",
  "cep": "01424-007",
  "cidade": "São Paulo",
  "bairro": "Jardim Paulista",
  "regiao": "Zona Oeste",
  "entrada": "R$70 à R$150",
  "linha_metro":["Linha 4 (Amarela)"],
  "estacao": ["Oscar Freire"],
  "estrelas": 4,
  "avaliacao_clientes": 4,
  "avaliacao_pagina": 2,
  "descricao_pagina": "None.",
  "link_pagina": "https://www.instagram.com/candysaopaulo/",
  "midia_pagina": "",
  "acessibilidade": [
    "Banheiro acessível",
    "Rampas de acesso"
  ],
  "musica": "Sim",
  "estacionamento": "Sim",
  "cover": "Não",
  "kids": "Não",
  "website": "https://candysp.com.br/",
  "premio": [
    "não possui"
  ],
  "estilo_musical": [
    "House",
    "Hip-Hop"
  ],
  "cozinha": [
    "Japonesa"
  ],
  "local": [
    "Bar",
    "Balada",
    "Restaurante"
  ],
  "preco": 4,
  "tipo_evento": [
    "Beber e dançar"
  ],
  "hobby": [
    "None"
  ],
  "ambiente": [
    "Temático",
    "Fumódromo"
  ],
  "cartao": [
    "American Express",
    "Crédito",
    "Débito",
    "Dinheiro",
    "Elo",
    "Mastercard",
    "Visa"
  ],
  "dias": [
    "domingo",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "feriados"
  ],
  "nivel":1,
  "link_cardapio":"https://acuolina.com/en/candy-sushi-bar-and-club",
  "horarios_funcionamento": {
    "segunda-feira": {
      "abertura": "fechado",
      "fechamento": "fechado"
    },
    "terca-feira": {
      "abertura": "fechado",
      "fechamento": "fechado"
    },
    "quarta-feira": {
      "abertura": "fechado",
      "fechamento": "fechado"
    },
    "quinta-feira": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "sexta-feira": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "sabado": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "domingo": {
      "abertura": "18:00",
      "fechamento": "05:00"
    },
    "feriados": {
     "abertura": "18:00",
     "fechamento":"05:00"
    }
  },
  "pet": "Sim",
  "estilo_servico": [
    "À la carte"
  ],
  "glutenfree": "Sim",
  "lactosefree": "Sim",
}

response = requests.post(url, json=lugar)
if response.status_code == 201:
    print(f"Lugar {lugar['nome']} adicionado com sucesso.")
else:
    print(f"Erro ao adicionar lugar {lugar['nome']}: {response.status_code}")

lugar = {
  "nome": "Butiquim da Cidade",
  "descricao": "O Butiquim da Cidade é um bar no coração da Vila Madalena, muito alegre e contagiante com drinks incríveis e música ao vivo para a galera aproveitar. De quarta e sexta temos o nosso rodízio de petisco por apenas R$29,90 que viralizou nas redes sociais.",
  "rua": "R. Fradique Coutinho,1127",
  "cep": "05416-011",
  "cidade": "São Paulo",
  "bairro": "Pinheiros",
  "regiao": "Zona Oeste",
  "entrada": "Gratuito",
  "linha_metro":["Linha 4 (Amarela)"],
  "estacao": ["Fradique Coutinho", "Faria Lima"],
  "estrelas": 4,
  "avaliacao_clientes": 4,
  "avaliacao_pagina": 2,
  "descricao_pagina": "None.",
  "link_pagina": "https://www.instagram.com/butiquimdacidade/",
  "midia_pagina": "",
  "acessibilidade": [
    "Banheiro acessível",
  ],
  "musica": "Sim",
  "estacionamento": "Não",
  "cover": "Não",
  "kids": "Não",
  "website": "None",
  "premio": [
    "não possui"
  ],
  "estilo_musical": [
    "Samba",
    "MPB",
    "Pagode",
    "Sertaneja"
  ],
  "cozinha": [
    "Brasileira"
  ],
  "local": [
    "Bar"
  ],
  "preco": 2,
  "tipo_evento": [
    "Beber e dançar",
    "Happy Hour",
    "Rodízio"
  ],
  "hobby": [
    "None"
  ],
  "ambiente": [
    "Despojado"
  ],
  "cartao": [
    "American Express",
    "Crédito",
    "Débito",
    "Dinheiro",
    "Elo",
    "Hipercard"
    "Mastercard",
    "Visa"
  ],
  "dias": [
    "domingo",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "feriados"
  ],
  "nivel":1,
  "link_cardapio":"https://drive.google.com/file/d/1hcA79TnOftSICY-Whgp39N98fAMF1pw8/view?usp=drive_link",
  "horarios_funcionamento": {
    "segunda-feira": {
      "abertura": "fechado",
      "fechamento": "fechado"
    },
    "terca-feira": {
      "abertura": "fechado",
      "fechamento": "fechado"
    },
    "quarta-feira": {
      "abertura": "16:00",
      "fechamento": "01:00"
    },
    "quinta-feira": {
      "abertura": "16:00",
      "fechamento": "01:00"
    },
    "sexta-feira": {
      "abertura": "16:00",
      "fechamento": "01:00"
    },
    "sabado": {
      "abertura": "12:00",
      "fechamento": "02:00"
    },
    "domingo": {
      "abertura": "12:00",
      "fechamento": "01:00"
    },
    "feriados": {
     "abertura": "Consultar",
     "fechamento":"Consultar"
    }
  },
  "pet": "Sim",
  "estilo_servico": [
    "À la carte",
    "Rodízio"
  ],
  "glutenfree": "Não",
  "lactosefree": "Não",
}
response = requests.post(url, json=lugar)
if response.status_code == 201:
    print(f"Lugar {lugar['nome']} adicionado com sucesso.")
else:
    print(f"Erro ao adicionar lugar {lugar['nome']}: {response.status_code}")