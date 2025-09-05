# FilmFinder - Aplicação de Descoberta de Filmes
Uma aplicação de filmes com tema escuro e visual inspirado no cinema, desenvolvida em React.
O projeto oferece recursos de descoberta, busca e lista de favoritos, permitindo ao usuário explorar e organizar seus filmes preferidos de forma prática e intuitiva.

## Funcionalidades
- **Descoberta de Filmes** - Explore filmes em alta, populares e mais votados
- **Busca Avançada** - Sistema de busca com paginação e filtros
- **Sistema de Favoritos** - Salve seus filmes preferidos com persistência em localStorage
- **Tema Cinematográfico** - Interface escura com detalhes em vermelho e efeitos visuais
- **Performance Otimizada** - Carregamento rápido com Vite e React
- **Detalhes Completos** - Informações detalhadas sobre cada filme

## Tecnologias Utilizadas
- **Framework:** React 18.2+
- **Build Tool:** Vite 4.4+
- **Estilização:** CSS Modules + CSS custom properties
- **Roteamento:** React Router DOM
- **Ícones:** Lucide React
- **Animações:** CSS Transitions e Transformações
- **API:** The Movie Database (TMDB) API v3
- **Gerenciamento de Estado:** React Hooks (useState, useContext)
- **Persistência:** localStorage para favoritos

## Estrutura do Projeto

```
filmfinder/
├── public/
├── src/
│   ├── components/
│   │   ├── MovieCard/
│   │   │   ├── MovieCard.jsx
│   │   │   └── MovieCard.module.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.module.css
│   │   └── ...outros componentes
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Favorites/
│   │   │   ├── Favorites.jsx
│   │   │   └── Favorites.module.css
│   │   └── MovieDetails/
│   │       ├── MovieDetails.jsx
│   │       └── MovieDetails.module.css
│   ├── lib/
│   │   ├── tmdb.js          # Serviço da API TMDB
│   │   └── utils.js         # Funções utilitárias
│   ├── context/
│   │   └── FavoritesContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.jsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── App.jsx
├── eslint.config.json
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js 16+
-Chave API do TMDB [obtenha aqui]("https://www.themoviedb.org/")

### Instalação
1. Clone o repositório
```
    git clone https://github.com/seu-usuario/filmfinder.git
    cd filmfinder
```

2. Instale as dependências
```
    npm install
    # ou
    pnpm install
    # ou
    yarn install
```

3. Configure a chave API
Busque este caminho `src/lib/tmdb.js`, na linha 3 dentro da constante *TMDB_API_KEY* está indicado o local onde você deve colar sua chave entre as haspas.
Por exemplo: `const TMDB_API_KEY = "srfv141449v49e9"; `

4. Execute o servidor de desenvolvimento
No terminal do Git Bash, execute um destes comandos:
```
    npm run dev
    # ou
    pnpm dev
    # ou
    yarn dev
```
5. Acesse a aplicação
Abra *http://localhost:5173* no seu navegador.

## Configuração da API
O projeto utiliza a **TMDB API** para obter dados dos filmes. As principais endpoints utilizadas são:

- `/trending/movie/week` - Filmes em alta
- `/movie/popular` - Filmes populares
- `/movie/top_rated` - Filmes mais votados
- `/search/movie` - Busca de filmes
- `/movie/{id}` - Detalhes do filme

## Links Úteis
- [Documentação da TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Documentação do React](https://legacy.reactjs.org/)
- [Documentação do Vite](https://vite.dev/guide/)
- [Lucide Icons](https://lucide.dev/)