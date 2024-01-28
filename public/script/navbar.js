function criarNavbar() {
    getSessionId();
    var navbarHTML = `
    <nav class="nav">
        <i class="uil uil-bars navOpenBtn"></i>
        <a href="/home" class="logo">
            <img src="icons/logo.png" alt="Logo" style="height: 40px;">
        </a>

        <ul class="nav-links">
            <i class="uil uil-times navCloseBtn"></i>
            <li><a href="/home">Início</a></li>
            <li><a href="/estabelecimentos">Estabelecimentos</a></li>
            <li><a href="/informacoes">Quem somos</a></li>
            <li><a href="/contato">Contato</a></li>

        </ul>

        <div class="search-box">
            <i class="uil uil-search search-icon"></i>
            <input type="text" placeholder="Search here..." />
        </div>

        <div class="user-icon-container">
            <img src="icons/icon-usuario.png" alt="Usuário" class="user-icon">
            <div class="user-submenu">
                <a href="/cadastro">cadastro</a>
                <a href="/editar_estabelecimento">atualizar</a>
            </div>
        </div>
    </nav>
    `;
    // <i class="uil uil-search search-icon" id="searchIcon"></i>
    // Adiciona o navbar ao documento
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Agora, inicialize os event listeners do navbar
    const nav = document.querySelector(".nav"),
        searchIcon = document.querySelector("#searchIcon"),
        navOpenBtn = document.querySelector(".navOpenBtn"),
        navCloseBtn = document.querySelector(".navCloseBtn");

    // searchIcon.addEventListener("click", () => {
    //     nav.classList.toggle("openSearch");
    //     nav.classList.remove("openNav");
    //     if (nav.classList.contains("openSearch")) {
    //         return searchIcon.classList.replace("uil-search", "uil-times");
    //     }
    //     searchIcon.classList.replace("uil-times", "uil-search");
    // });

    navOpenBtn.addEventListener("click", () => {
        nav.classList.add("openNav");
        nav.classList.remove("openSearch");
        searchIcon.classList.replace("uil-times", "uil-search");
    });

    navCloseBtn.addEventListener("click", () => {
        nav.classList.remove("openNav");
    });


    const userIconContainer = document.querySelector(".user-icon");
    const userSubmenu = document.querySelector(".user-submenu");

    let closeTimeout;

    userIconContainer.addEventListener("mouseenter", () => {
        clearTimeout(closeTimeout);
        userSubmenu.classList.add("show");
    });

    userIconContainer.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => {
            userSubmenu.classList.remove("show");
        }, 300);
    });

    userSubmenu.addEventListener("mouseenter", () => {
        clearTimeout(closeTimeout);
    });

    userSubmenu.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => {
            userSubmenu.classList.remove("show");
        }, 300);
    });
}

async function getSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    let tentativas = 0;
  
    // Função para validar o token
    async function validarToken(token) {
      try {
        const response = await fetch('/api/validate-token', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        return response.ok && data.valid;
      } catch (error) {
        console.error('Erro ao validar o token:', error);
        return false;
      }
    }
  
    // Função para obter um novo token
    async function obterNovoToken() {
      try {
        const response = await fetch('/api/generate-token', { method: 'GET' });
        const data = await response.json();
        return response.ok ? data.token : null;
      } catch (error) {
        console.error('Erro ao obter um novo token:', error);
        return null;
      }
    }
  
    // Verifica se o token existe e é válido
    while (tentativas < 3 && (!sessionId || !await validarToken(sessionId))) {
      sessionId = await obterNovoToken();
      if (sessionId) {
        localStorage.setItem('sessionId', sessionId);
      }
      tentativas++;
    }
  
    return sessionId || null;
  }
  