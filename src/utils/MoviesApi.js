class MoviesApi {
  #url;
  #headers;

  constructor(options) {
    this.#url = options.baseUrl;
    this.#headers = options.headers;
  }

  #checkServerStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this.#url}`, {
      headers: this.#headers,
    }).then((res) => this.#checkServerStatus(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
