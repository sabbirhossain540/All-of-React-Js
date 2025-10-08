import { Children, useEffect, useState } from "react";
import MovieList from "./components/movie";
import MovieDetails from "./components/movieDetails";
import Loader from "./components/Loader";




/*
AS OF MY UNDERSTANDING:
01. Props: Like a argument of the function
02. State: State is like varble of a function. It has local state means local variable and global state means global variable.
03. useSte as like variable
04. useEffect as like event handaler machanism

*/

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "339b30d2";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);


  /*
  useEffect(function(){
    console.log("it never execute because there have array but no dependency");
  }, []);

  useEffect(function(){
    console.log("then its execute secondly because  without dependency arry");
  });

  useEffect(function(){
    console.log("this execute  serial three because of dependecy array");
  }, [query]);

  
  console.log("Execute this massenge first beacuse of main app access directly");

  */

  function handleSelectModie(id){
    setSelectedId((selectedId)=> (id===selectedId ? null : id));
  }

  function handleCloseMovie(id){
    setSelectedId(null);
  }

  function handleWatchedMovie(movie){
    setWatched((watched)=>[...watched, movie]);
  }

  function handleDeleteMovie(id){
    setWatched((watched)=>watched.filter((movie)=>
      movie.imdbID !== id
    ))
  }


  useEffect(function(){
    async function fetchMovie() {
      try{
        setIsLoading(true);
        setError("");
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if(!res.ok)
          throw new Error("Something went to wrong!!");

        const data = await res.json();
        if(data.Response === "False") throw new Error("Data not Found");
        setMovies(data.Search);
        setIsLoading(false);

      } catch(err){
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      
    }

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    }
    fetchMovie();
  }, [query]);


  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
      </Navbar>
      <Main>
        {/* <Box element={<MovieList movies={movies}/>} />
        <Box element={
            <>
              <Summury watched={watched}/>
              <WatchedList watched={watched}/>
            </>
            
          } /> */}


        <Box>
          {isLoading && !error ? <Loader /> : <MovieList movies={movies} onSelectMovie={handleSelectModie} />}
          {error && <ErrorMessage message={error} />}
          
        </Box>
          
        <Box>
          {selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatch={handleWatchedMovie} watched={watched}  /> ) : 
          (<>
            <Summury watched={watched}/>
            <WatchedList watched={watched} onDelete={handleDeleteMovie}/>
          </> )
          }
        </Box>

        
        {/* <WatchedBox>
          <Summury watched={watched}/>
          <WatchedList watched={watched}/>
        </WatchedBox> */}
      </Main>
    </>
  );
}



function ErrorMessage({message}){
  return <p className="error">
    {message}
  </p>
}

function Main({children}){
  return (
    <>
      <main className="main">
        {children}
      </main>
    </>
  );
}

function Box( { children }){
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children}
        </div>
    </>
  );
}



function Summury({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                  </p>
                </div>
              </div>
    </>
  );
}

function WatchedList({watched, onDelete}){
  return (
    <>
      <ul className="list">
                {watched.map((movie) => (
                  <WatchMovie movie={movie} key={movie.imdbID} onDeleteWatched = {onDelete} />
                ))}
              </ul>
    </>
  );
}


function WatchMovie({movie, onDeleteWatched}){
  return (
    <>
    <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>

                      <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
                    </div>
                  </li>
    </>
  );
}

function Navbar({children}){
  
  return (
    <div>
      <nav className="nav-bar">
        <Logoarea/>
        {children}
      </nav>
    </div>
  );
}

function Logoarea(){
  return (
    <div className="logo">
          {/* <span role="img">🍿</span> */}
          <h1>OGUSU</h1>
        </div>
  );
}

function NumResult({movies}){
  return (
    <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
  );
}

function Search({query, setQuery}){

  return (
    <div>
      <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    </div>
  );
}