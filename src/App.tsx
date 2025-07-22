import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetMoviesQuery } from "./store/movieApi";

function App() {
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useGetMoviesQuery({
    _page: 1,
    _limit: 10,
  });

  const movies = moviesResponse?.data || [];
  const totalCount = moviesResponse?.totalCount || 0;

  return (
    <>
      <div>
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React + Redux Toolkit</h1>

      <div className="card">
        <h2>RTK Query Test</h2>
        {isLoading && <p>Loading movies...</p>}
        {error && (
          <p style={{ color: "red" }}>Error: {JSON.stringify(error)}</p>
        )}
        {!isLoading && !error && (
          <div>
            <p>Total movies: {totalCount}</p>
            <p>Loaded movies: {movies.length}</p>
            {movies.length > 0 && (
              <div>
                <h3>First movie:</h3>
                <p>
                  <strong>Title:</strong> {movies[0].title}
                </p>
                <p>
                  <strong>Release Date:</strong> {movies[0].release_date}
                </p>
                <p>
                  <strong>Overview:</strong> {movies[0].overview}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
