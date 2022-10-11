import React, { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
import searchIcon from './search.svg';

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sort, setSort] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();
    const [search, setSearch] = useState(false)
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const showMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://movie-task.vercel.app/api/popular?page=${page}`)
            const res = await response.json();

            setMovies(res.data.results);
            setPages(res.data.total_pages);
            setLoading(false);
        }
        catch (e) {
            setErr(true);
            setLoading(false);
        }
    }

    const searchMovies = async (term) => {
        setLoading(true)
        const response = await fetch(`https://movie-task.vercel.app/api/search?page=${page}&query=${term}`)
        const res = await response.json();
        setMovies(res.data.results);

        setPages(res.data.total_pages);
        setLoading(false)
    }

    useEffect(() => {
        search == false ? showMovies() : searchMovies(searchTerm);
    }, [page])

    const sortDate = movies.sort((a, b) => {
        if (sort == 2) return b.vote_count - a.vote_count;
        if (sort == 3) return b.vote_average - a.vote_average;
        if (sort == 1) {
            const date1 = new Date(a.release_date)
            const date2 = new Date(b.release_date)
            return date2 - date1
        }
    })

    const customStyle1 = {
        display: "flex",
        marginBottom: "20px"
    }

    const customStyle2 = {
        alignSelf: "center",
        margin: "10px",
        color: "azure"
    }


    return (
        loading == false ? 
        <div className='app'>
            <h1 style={{ cursor: "pointer" }} onClick={() => {showMovies(); setSearch(false); setPage(1)}}>MoviesAdda</h1>

            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {e.key == 'Enter' && searchMovies(searchTerm); setPage(1); setSearch(true)}}
                />
                <img src={searchIcon} alt='search'
                    onClick={() => { searchMovies(searchTerm); setPage(1); setSearch(true)}}
                />
            </div>

            {err == false && pages != 0 && <> <div style={customStyle1}>
                <button className='btn btn-secondary' style={{ margin: "10px" }} onClick={() => { if (page > 1) setPage(page - 1) }}>PREV</button>
                <p style={customStyle2}>Page {page} of {pages}</p>
                <button className='btn btn-secondary' style={{ margin: "10px" }} onClick={() => { if (page < pages) setPage(page + 1) }}>NEXT</button>
            </div>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="0">Apply Filter</option>
                    <option value="1">Date Released</option>
                    <option value="2">Most Voted</option>
                    <option value="3">Ratings</option>
                </select> </>}

            <div className='container'>
                {
                    movies.map((movie) => {
                        return <MovieCard {...movie} />
                    })
                }
            </div>

            {err == true && pages != 0 && <h2>Oh No! Looks like there's some issue :(</h2>}

            {pages != 0 ? <div style={customStyle1}>
                <button className='btn btn-secondary' style={{ margin: "10px" }} onClick={(e) => { if (page > 1) setPage(page - 1) }}>PREV</button>
                <p style={customStyle2}>Page {page} of {pages}</p>
                <button className='btn btn-secondary' style={{ margin: "10px" }} onClick={(e) => { if (page < pages) setPage(page + 1) }}>NEXT</button>
            </div> : <><h2>Oh! Nothing Found</h2><h2>Check the entered words again!</h2></>}

        </div> : <h1 style={{position: "absolute", top:"43%", right: "43%"}}>Loading..</h1>
    )
}

export default App;