import googlemaps
import requests
from PIL import Image
from io import BytesIO

def buscar_restaurantes(api_key, location, radius=5000, type='restaurant'):
    gmaps = googlemaps.Client(key=api_key)

    # Buscar restaurantes em Campinas
    places_result = gmaps.places_nearby(location=location, radius=radius, type=type)

    # Processar resultados
    for place in places_result.get('results', []):
        print(f"Nome: {place.get('name')}")
        print(f"Endereço: {place.get('vicinity')}")
        print(f"Avaliação: {place.get('rating', 'Não disponível')}")
        print(f"Preço: {place.get('price_level', 'Não disponível')}")

        # Obter detalhes para mais informações
        place_details = gmaps.place(place_id=place['place_id'])['result']

        print(f"Telefone: {place_details.get('formatted_phone_number', 'Não disponível')}")
        print(f"Horário de Funcionamento: {place_details.get('opening_hours', {}).get('weekday_text', 'Não disponível')}")
        print("Avaliações de Usuários:")
        for review in place_details.get('reviews', []):
            print(f"- {review.get('author_name')}: {review.get('rating')}/5, \"{review.get('text')}\"")

        # Baixar e salvar fotos
        for i, photo in enumerate(place_details.get('photos', [])):
            # Obter a URL da foto
            photo_url = gmaps.places_photo(photo_reference=photo['photo_reference'], max_width=400)
            
            # Fazer o download da foto
            response = requests.get(photo_url)
            if response.status_code == 200:
                # Abrir a imagem e salvar como JPG
                image = Image.open(BytesIO(response.content))
                image.save(f"{place.get('name')}_foto_{i}.jpg")
                print(f"Foto salva: {place.get('name')}_foto_{i}.jpg")

        print("\n")

# Exemplo de uso
api_key = 'SUA_API_KEY'
location = '-22.907104, -47.063240'  # Coordenadas de Campinas
buscar_restaurantes(api_key, location)