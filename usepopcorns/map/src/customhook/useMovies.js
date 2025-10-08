import { Children, useEffect, useRef, useState } from "react";

export function useMovies(query, KEY){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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

      return {movies, isLoading, error};

}