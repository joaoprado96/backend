function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            buscarRestaurantes(latitude,longitude,10000)
            console.log("Latitude:", latitude, "Longitude:", longitude);
            const dist = calculateDistance(latitude, longitude, latitude, longitude);
            if (dist <= 3) {
                console.log("A coordenada está dentro do raio.");
            } else {
                console.log("A coordenada está fora do raio.");
            }
            getCityFromCoordinates(latitude,longitude);
            
            // Você pode usar a latitude e longitude aqui para carregar estabelecimentos próximos, por exemplo
        }, function(error) {
            console.error("Erro ao obter a localização:", error);
            // Trate o erro conforme necessário
        });
    } else {
        console.log("Geolocalização não está disponível em seu navegador.");
        // Trate a situação em que a geolocalização não está disponível
    }
}

function getCityFromCoordinates(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village || "Indisponível";
                const road = data.address.road || "Indisponível";
                const state = data.address.state || "Indisponível";
                const suburb = data.address.suburb || "Indisponível"; // Bairro
                const country = data.address.country || "Indisponível"; // País


                if (city && state) {
                    return {
                        pais: country,
                        cidade: city,
                        rua: road,
                        estado: state,
                        bairro: suburb
                    };
                } else {
                    throw new Error("Cidade não encontrada.");
                }
            } else {
                throw new Error("Nenhum resultado encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao obter a cidade:", error);
            throw error; // Propague o erro ou retorne um valor padrão
        });
}


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distância em km
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function buscarRestaurantes(latitude, longitude, raio) {
    // Construir a consulta Overpass API
    const consulta = `
        [out:json];
        (
          node["amenity"="restaurant"](around:${raio},${latitude},${longitude});
          way["amenity"="restaurant"](around:${raio},${latitude},${longitude});
          rel["amenity"="restaurant"](around:${raio},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
    `;
    // URL da API Overpass
    const url = 'http://overpass-api.de/api/interpreter';

    // Fazer a requisição à API
    fetch(url, {
        method: 'POST',
        body: consulta,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Restaurantes encontrados:', data.elements);
        // Processar os dados aqui
    })
    .catch(error => {
        console.error('Erro ao buscar restaurantes:', error);
    });
}