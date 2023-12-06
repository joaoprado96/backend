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
  "estacao": "Linha 3",
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
  "link_cardapio":"www.qrcode.com",
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
  "estacao": "Linha 9",
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
  "link_cardapio":"www.qrcode.com",
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
  "estacao": "Linha 4",
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
  "link_cardapio":"www.qrcode.com",
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