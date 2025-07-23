import {useState, useEffect} from 'react';
import api from '../api';
import './Games.css';

function Games ({onLikeGame}) {
    const [games, setGames] = useState([]);
    const [likedIds, setLikedIds] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await api.get('/games');
                setGames(response.data.results);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        const loadLikedGames = () => {
            const email = localStorage.getItem('userEmail');
            if (email) {
                const stored = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
                const ids = stored.map(game => game.id);
                setLikedIds(ids);
            }
        };

        fetchGames();
        loadLikedGames();
    }, []);

    const handleLike = (game) => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        const stored = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
        const alreadyLiked = stored.some(g => g.id === game.id);

        if (!alreadyLiked) {
            const updated = [...stored, game];
            localStorage.setItem(`wishlist_${email}`, JSON.stringify(updated));
            setLikedIds([...likedIds, game.id]);
            onLikeGame(game);
            console.log(`Game liked: ${game.name}`);
        }
    }

    return (
        <div className='game-container'>
            {games.map(game => (
                <div className='gameCard' key={game.id}>
                    <img src={game.background_image} alt={game.name}/>
                    <h4>{game.name}</h4>
                    <p>Released: {game.released}</p>
                    <p>Rating: {game.rating}</p>
                    <p>Platforms: {game.platforms.join(', ')}</p>
                    <div className='wishlist-button-container'>
                        <button 
                            onClick={() => {handleLike(game)}}
                            className='wishlist-button'
                        >
                            {likedIds.includes(game.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Games;