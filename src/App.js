import React, { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showWatched, setShowWatched] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };

  const handleSearch = () => {
    const results = userMovies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddMovie = () => {
    if (searchQuery.trim() !== '') {
      const newMovie = { name: searchQuery, watched: false };
      setUserMovies((prevMovies) => [...prevMovies, newMovie]);
      setSearchQuery('');
    }
  };

  const handleDeleteMovie = (movie) => {
    setUserMovies((prevMovies) =>
      prevMovies.filter((m) => m.name !== movie.name)
    );
  };

  const handleToggleWatched = (movie) => {
    setUserMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.name === movie.name ? { ...m, watched: !m.watched } : m
      )
    );
  };

  const handleToggleList = () => {
    setShowWatched((prevShowWatched) => !prevShowWatched);
  };

  const filteredMovies = showWatched
    ? userMovies.filter((movie) => movie.watched)
    : userMovies.filter((movie) => !movie.watched);

  return (
    <div>
      <h1>List of Movies</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div>
        <button onClick={handleToggleList}>
          {showWatched ? 'To Watch' : 'Watched'}
        </button>
      </div>
      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <li key={index}>
              {movie.name}{' '}
              <button onClick={() => handleToggleWatched(movie)}>
                {movie.watched ? 'Unwatch' : 'Watch'}
              </button>{' '}
              <button onClick={() => handleDeleteMovie(movie)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
