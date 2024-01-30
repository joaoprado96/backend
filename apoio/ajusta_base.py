from pymongo import MongoClient

# Conexão com o MongoDB usando a string de conexão fornecida
client = MongoClient('mongodb+srv://joaoprado:Eletrica16!@cluster01.4f55ixx.mongodb.net/')

# Selecionando o banco de dados e a coleção
db = client['test']  # Substitua pelo nome do seu banco de dados
colecao = db['lugars']  # Usando a coleção 'Lugar' conforme o seu esquema Mongoose

# # Recuperando e exibindo todas as informações do banco de dados
# print("Exibindo todos os documentos da coleção:")
# for documento in colecao.find():
#     print(documento)

# # Campos para remover e campos para converter de int para float
# # ATENÇÃO: Certifique-se de que estes campos existem no seu esquema e precisam ser modificados
# campos_para_remover = ['dias', 'cover','midia_pagina','descricao_pagina','avaliacao_pagina']  # Substitua com as chaves reais do seu esquema
# campos_para_converter = ['estrelas', 'avaliacao_clientes']  # Substitua com os campos reais do seu esquema

# # Removendo campos
# unset_fields = { chave: "" for chave in campos_para_remover }
# colecao.update_many({}, {'$unset': unset_fields})

# # Convertendo int para float e tratando campos não numéricos ou ausentes
# for campo in campos_para_converter:
#     for documento in colecao.find():
#         # Verifica se o campo existe e é numérico (int ou float)
#         if campo in documento and isinstance(documento[campo], (int, float)):
#             novo_valor = float(documento[campo])
#         else:
#             # Se o campo não existe ou não é numérico, define como 0
#             novo_valor = 0

#         # Atualiza o documento
#         colecao.update_one({'_id': documento['_id']}, {'$set': {campo: novo_valor}})

# print("Modificações concluídas de remoção e Float.")

# Dados de pausa padrão para inserir
# dados_pausa = {
#     "pausa1": "Sim",
#     "inicio1": "12:00",
#     "fim1": "13:00",
#     "pausa2": "Sim",
#     "inicio2": "17:00",
#     "fim2": "18:00"
# }

# # Atualizando cada documento
# for documento in colecao.find():
#     if "horarios_funcionamento" in documento:
#         # Atualiza cada dia da semana com os dados de pausa
#         for dia in documento["horarios_funcionamento"]:
#             documento["horarios_funcionamento"][dia].update(dados_pausa)

#         # Salva as alterações no banco de dados
#         colecao.update_one({'_id': documento['_id']}, {'$set': {'horarios_funcionamento': documento["horarios_funcionamento"]}})


# Dados para adicionar
novo_telefone = '(19) 99999-9999'
novo_email = 'precisadecadastri@email.com'

# Atualizando cada documento, se necessário
for documento in colecao.find():
    atualizacoes = {}

    print(documento)

    # Verifica se o campo telefone existe, senão, adiciona
    if 'telefone' not in documento:
        atualizacoes['telefone'] = novo_telefone

    # Verifica se o campo email existe, senão, adiciona
    if 'email' not in documento:
        atualizacoes['email'] = novo_email

    # Se existirem atualizações a serem feitas, faz a atualização
    if atualizacoes:
        colecao.update_one({'_id': documento['_id']}, {'$set': atualizacoes})


print("Atualização dos horários de funcionamento concluída.")