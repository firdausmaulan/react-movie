import "./App.css";
import { baseImageUrl, searchMovies } from "./Api"
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import Modal from "./Modal";

const App = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    searchMovies("Dragon Ball", 1).then((data) => {
      console.log("data : ")
      console.log(data)
      console.log("data results")
      console.log(data.results)
      setMovies(data.results)
    })
  }, [])

  const search = async (query) => {
    searchMovies(query, 1).then((data) => {
      console.log("data : ")
      console.log(data)
      console.log("data results")
      console.log(data.results)
      setMovies(data.results)
    })
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const MovieListView = () => {
    return movies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i} onClick={() => handleMovieClick(movie)}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-image" src={`${baseImageUrl}/${movie.poster_path}`} />
          <div className="Movie-rate">Rating : {movie.vote_average.toFixed(2)} / 10</div>
          <div className="Movie-date">Release Date : {movie.release_date}</div>
        </div>
      )
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchForm onSearch={search} />
        <div className="Movie-container">
          <MovieListView />
        </div>
      </header>
      {selectedMovie && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
}

export default App;
