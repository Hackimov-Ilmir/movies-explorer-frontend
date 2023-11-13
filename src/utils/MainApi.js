class MainApi {
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

  #request(endpoint, options) {
    return fetch(`${this.#url}${endpoint}`, options).then(
      this.#checkServerStatus
    );
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this.#request('/users/me', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  editProfile(name, email) {
    const token = localStorage.getItem('jwt');
    return this.#request('/users/me', {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  getSavedMovies() {
    const token = localStorage.getItem('jwt');
    return this.#request('/movies', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    const token = localStorage.getItem('jwt');
    return this.#request('/movies', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    });
  }

  deleteMovie(movieId) {
    const token = localStorage.getItem('jwt');
    return this.#request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  register = (name, email, password) => {
    return this.#request(`/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  };

  authorize = (email, password) => {
    return this.#request(`/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  };

  getContent = () => {
    const token = localStorage.getItem('jwt');
    return this.#request(`/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };
}

const mainApi = new MainApi({
  baseUrl: 'https://api.hackimov.movies.nomoredomainsrocks.ru',
});

export default mainApi;
