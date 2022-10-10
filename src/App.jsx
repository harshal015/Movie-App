import React, { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
import searchIcon from './search.svg';

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sort, setSort] = useState(0);

    const searchMovies = async () => {
        const response = await fetch('https://movie-task.vercel.app/api/popular?page=1')
        const res = await response.json();
        const arr = res.data.results

        setMovies(arr);
    }

    useEffect(() => {
        searchMovies();
    }, [])

    const sortDate = movies.sort((a, b) => {
        if(sort == 2)return b.vote_count - a.vote_count;
        if(sort == 3)return b.vote_average - a.vote_average;
        if(sort == 1){
            const date1 = new Date(a.release_date)
            const date2 = new Date(b.release_date)
            return date2-date1
        }
    })


    return (
        <div className='app'>
            <h1>MoviesAdda</h1>

            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={searchIcon} alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
 
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="0">Apply Filer</option>
                <option value="1">Date Released</option>
                <option value="2">Most Voted</option>
                <option value="3">Ratings</option>
            </select>

            <div className='container'>
                {
                    movies.map((movie) => {
                        return <MovieCard {...movie} />
                    })
                }
            </div>
        </div>
    )
}

export default App;