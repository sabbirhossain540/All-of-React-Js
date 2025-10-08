
import { Children, useEffect, useRef, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";



const KEY = "339b30d2";

export default function MovieDetails({selectedId, onCloseMovie, onAddWatch, watched}){
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

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
      countRatingDecisions: countRef.current
    }

    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function(){
    if(countRef) countRef.current = countRef.current + 1;
  }, [userRating]);

  useEffect(function(){
    document.addEventListener('keydown', function(e){
      if(e.code === 'Escape'){
        onCloseMovie();
      }
    })
  }, [onCloseMovie])

  useEffect(function(){
    if(!movie.Title) return;
    document.title = `MOVIE || ${movie.Title}`;

    return function(){
      document.title = "usePopcorn";
    }
  }, [movie.Title]);

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