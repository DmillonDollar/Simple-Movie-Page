import React, { useState, useEffect } from "react";
import Search from "./Search";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import { useDebounce } from "react-use";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [debounceTerm, setDebounceTerm]= useState("")

  useDebounce(()=>setDebounceTerm(searchTerm), 700, [searchTerm])


  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
     };

 

  const fetchData = async (query = " ") => {
    try {
        setIsLoading(true)
        setError(null)
        const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok){
          throw new Error("Failed to fetch Data")
        }

        

        const data = await response.json()
        if(data.response == false){
           setError("Error Fetching Data");
           setMovieList([])
        }
        setMovieList(data.results || [])
       
    } catch (error) {
      console.error(`Error while fetching movie: ${error}`);
      setError("Error Fetching Data");
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(debounceTerm)
  }, [debounceTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without The Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

           {isLoading ? (<Spinner/>) : error ? (<p className="text-red-700">{error}</p>) :(
          <ul>
            {movieList.map((movie)=>(
              <li key={movie.id}>
                <MovieCard key={movie.id} movie={movie}/>
              </li>
            ))}
          </ul>
        )}
        </section>
       
      </div>
    </main>
  );
};

export default App;
