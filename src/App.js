import "./App.css";
import { baseImageUrl, searchMovies } from "./Api";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import Modal from "./Modal";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    const data = await searchMovies("Dragon Ball", page);
    console.log("data: ", data);
    console.log("data results: ", data.results);
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const search = async (query) => {
    setCurrentPage(1); // Reset to the first page when searching
    const data = await searchMovies(query, 1);
    console.log("data: ", data);
    console.log("data results: ", data.results);
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const MovieListView = () => {
    return movies.map((movie, i) => (
      <div
        className="Movie-wrapper"
        key={i}
        onClick={() => handleMovieClick(movie)}
      >
        <div className="Movie-title">{movie.title}</div>
        <img
          className="Movie-image"
          src={`${baseImageUrl}/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="Movie-rate">
          Rating: {movie.vote_average.toFixed(2)} / 10
        </div>
        <div className="Movie-date">Release Date: {movie.release_date}</div>
      </div>
    ));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchForm onSearch={search} />
        <div className="Movie-container">
          <MovieListView />
        </div>
        <div className="Pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
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
};

export default App;
