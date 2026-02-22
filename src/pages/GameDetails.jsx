import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate.js";
import './GameDetails.css';

const GameDetails = () => {
    const {id} = useParams(); 
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
        const response = await fetch(
            `http://localhost:3000/api/games/${id}`
        );
        const data = await response.json();
        setGame(data);
        setLoading(false);
        };

        fetchGame();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!game) return <p>Jeu introuvable</p>;

    return(
        <>
            <div id='game-details'>
                <h2>{game.title}</h2>
                <h2><small><i>({game.series})</i></small></h2>
                <img src={game.image} alt={game.title} />
                <div className='details'>
                    <ul>Date de sortie :
                        <li><u>Amérique du Nord</u> : {formatDate(game.releaseDate?.america)}</li>
                        <li><u>Europe</u> : {formatDate(game.releaseDate?.europe)}</li>
                        <li><u>Japon</u> : {formatDate(game.releaseDate?.japon)}</li>
                    </ul>
                    <p><u>Éditeur :</u> {game.editor}</p>
                    <p><u>Studio :</u> {game.studio}</p>
                    <p><u>Genres :</u> {game.genres.join(", ")}</p>
                    <p><u>Plateformes :</u> {game.platforms.join(" / ")}</p>
                </div>
                <div className='text'>
                    {game.description.map((paragraph,index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <button><Link to="/">Retour à la page d'accueil</Link></button>
        </>
    );
}
export default GameDetails;