import React, { useState } from "react";
import Modal from 'react-modal';
import './App.css'

function MovieCard({ title, release_date, poster_path, vote_count, overview, vote_average, adult}) {

    const [modalOpen, setmodalOpen] = useState(false)
    return (

        <div className='movie'>
            <div>
                <p>Rating: {vote_average}</p>
            </div>

            <div onClick={() => setmodalOpen(true)} style={{cursor:"pointer"}}>
                <img src={poster_path !== 'N/A' ? "https://image.tmdb.org/t/p/original" + poster_path : 'https://via.placeholder.com/400'} alt={title} />
            </div>

            <div onClick={() => setmodalOpen(true)} style={{cursor:"pointer"}}>
                <h3>{title}</h3>
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setmodalOpen(false)}
                style={{
                    content: {
                        margin: "auto 200px",
                        display: "grid",
                        justifyItems: "center",
                        textAlign: "center",
                        backgroundColor:"#212426",
                        color:"#ffffffd4"
                    },
                    overlay: {
                        backgroundColor: "rgba(123, 123, 123, 0.84)"
                    }
                }}
            >
                <h2 style={{margin: "10px", marginBottom: 0}}>{title}</h2>
                <p>Date Released: {release_date}</p>
                <img style={{width: "310px", margin: "20px", borderRadius: "10px"}} src={poster_path !== 'N/A' ? "https://image.tmdb.org/t/p/original" + poster_path : 'https://via.placeholder.com/400'} alt={title} />
                <p style={{width: "80%"}}>{overview}</p>
                <p>Rating: {vote_average}<br/>Vote Count: {vote_count}<br/>{adult == true ? 'Strict 18+' : 'Family Safe'}</p>
                <button className="btn btn-light" onClick={() => setmodalOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default MovieCard;