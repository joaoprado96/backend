import requests
import json

# URL da API para adicionar opções (substitua pela URL real da sua API)
url = "http://localhost:3000/api/opcoes-sair"

# Dados a serem enviados
dados = {
    "opcoes_cidades": ["São Paulo"],
    "opcoes_bairros": ["Moóca", "Tatuapé", "Penha", "Itaquera"],
    "opcoes_regiao": ["Centro", "Zona Leste", "Zona Oeste", "Zona Norte", "Zona Sul"],
    "opcoes_entrada": ["Gratuita", "10", "20", "Variável"],
    "opcoes_estacao": ["Linha 1", "Linha 2"],
    "opcoes_estrelas": [1, 2, 3, 4, 5],
    "opcoes_avaliacao": [1, 2, 3, 4, 5],
    "opcoes_acessibilidade": ["banheiro acessível", "cardápio em braile", "Entrada de cão-guia", "vagas especiais", "rampas de acesso", "espaço adequado para cadeira de rodas"],
    "opcoes_musica": ["Sim", "Não"],
    "opcoes_estacionamento": ["Sim", "Não"],
    "opcoes_cover": ["Sim", "Não"],
    "opcoes_kids": ["Sim", "Não"],
    "opcoes_musical": ["Axé", "Black Music", "Blues", "Bossa Nova", "Clássica", "Dance", "Disco", "Eletrônica", "Emocore", "Funk", "Funk Carioca", "Folk", "Forró", "Gospel/Religioso", "Gótico", "Hard Rock", "Hip-Hop", "Heavy Metal", "House", "Infantil", "Indie", "Instrumental", "J-Pop/J-Rock", "Jazz", "K-pop/K-rock", "Latina", "Lo-Fi", "MPB", "Metal", "Pop", "Pagode", "Psicodelia", "Pop/Rock", "Punk Rock", "Rock", "Rock Alternativo", "Reggae", "Rap", "Reggaeton", "Sertanejo", "Samba", "Samba Enredo", "Soul", "Trap"],
    "opcoes_cozinha": ["Africana", "Alemã", "Árabe", "Armênia", "Brasileira", "Brunch", "Bares/Pubs", "Cafeterias", "Coreana", "Chinesa", "Churrasco", "Espanhola", "Francesa", "Frutos do mar", "Grega", "Hamburgueria", "Ibérica", "Italiana", "Indiana", "Japonesa", "Lanches", "Libanesa", "Mediterrânea", "Mexicana", "Peruana", "Pizza", "Poke", "Portuguesa", "Russa", "Saudável", "Sobremesas", "Tailandesa", "Vietnamita", "Vegetariana", "Vegana"],
    "opcoes_local": ["padaria", "restaurante", "lanchonete", "hamburgueria", "bar", "pub", "cafeterias", "Casa de Show", "Clube de comédia", "Parques e áreas ao ar livre", "Cervejaria", "doceria", "Bolaria", "confeitaria"],
    "opcoes_preco": [1, 2, 3, 4, 5],
    "opcoes_tipo_evento": ["Primeiro encontro", "Beber e dançar", "Conversar", "Lugares romântico", "Reunião de amigos", "Encontro familiar", "Festa de aniversário", "Happy Hour", "Assistir jogos esportivos", "Sair sozinho", "Clube de comédia", "Balada", "Experiência gastronômica", "Cabaré/Boates", "Música ao vivo", "Diferentão", "Próprio para crianças", "Show de Comédia", "Karaokê", "Rodízio", "Open bar/food", "LGBTQIA+", "Comer e Jogar"],
    "opcoes_ambiente": ["Jardim", "Jantar ao ar livre", "Rooftop", "Fumódromo", "Terraço", "Melhores vistas", "Intimista", "Temático", "Vista para o mar", "Térreo", "Despojado"],
    "opcoes_cartao": ["American Express", "Banricompras – Crédito", "Banricompras", "Ben Refeição", "Cooper Card", "Cheque", "Dinheiro", "Diners", "Elo – Crédito", "Elo", "Hipercard", "Goodcard", "Mastercard – Crédito", "Mastercard", "Refeisul", "Ticket", "Card", "Vale Alelo Refeição", "Verocard", "Visa – Crédito", "Visa", "VR Refeição"],
    "opcoes_dias": ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo", "feriado"],
    "opcoes_hora": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    "opcoes_pet": ["Sim", "Não"],
    "opcoes_estilo_servico": ["Buffet", "à la carte", "rodízio", "serviço de entrega"],
    "opcoes_glutenfree": ["Sim", "Não"],
    "opcoes_lactosefree": ["Sim", "Não"]
}

# Realizando a requisição POST
resposta = requests.post(url, json=dados)

# Verificando a resposta
if resposta.status_code == 201:
    print("Registro inserido com sucesso:", resposta.json())
else:
    print("Erro ao inserir registro:", resposta.status_code, resposta.text)
