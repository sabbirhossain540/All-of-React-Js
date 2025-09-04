import { Children, useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


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
const tempQuery = "mission impossible";


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

function Loader(){
  return <p className="loader">Loading...</p>
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


function MovieList({ movies, onSelectMovie }){
  
  return(
    <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID}/>
              ))}
            </ul>
  );
}

function Movie({movie, onSelectMovie}){
  return (
    <div>
      <li key={movie.imdbID} onClick={()=>onSelectMovie(movie.imdbID)} >
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
    </div>
  );
}

// function WatchedBox({children}){
//   const [isOpen2, setIsOpen2] = useState(true);

  
//   return (
//     <>
//       <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen2((open) => !open)}
//           >
//             {isOpen2 ? "–" : "+"}
//           </button>
//           {isOpen2 && (
//             <>
//               {children}   
//             </>
//           )}
//         </div>
//     </>
//   );
// }

function MovieDetails({selectedId, onCloseMovie, onAddWatch, watched}){
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(movie=>movie.imdbID === selectedId)?.userRating;


  function handleAdd(){
    const newWatchedMovie ={
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster:movie.Poster,
      runtime: Number(movie.Runtime.split("").at(0)),
      imdbRating: Number(movie.imdbRating),
      userRating,
    }

    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function(){
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);


  return(
    <div className="details">
      {isLoading ? <Loader /> :
      <>
      <header>
        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        <img src={movie.Poster} alt={`Poster of  ${movie} movie`}  />
        <div className="details">
          <h2>{movie.Title}</h2>
          <p>{movie.Released} &bull; {movie.Runtime}</p>
          <p>{movie.Genre}</p>
          <p>
            {movie.imdbRating} IMDb Rating
          </p>
        </div>
        
      </header>
      <section>
        
        <div className="rating">
          {!isWatched ? (
            <>
            <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>

            {userRating > 0 ? <button className="btn-add" onClick={handleAdd}>+ Add to list</button> : ""}
              
            </>
          )
          :
          (
            <p>You rated with this movie {watchUserRating}</p>

          )}
        </div>
        
        <p><em/>{movie.Plot}</p>
        <p>Starting {movie.Actors}</p>
        <p>Directed By {movie.Director}</p>
        <p>Country : {movie.Country}</p>
      </section>
      </>
      }
      
    </div>
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