import {useState, useEffect, useRef, useCallback} from 'react';
import api from '../api';
import './Games.css';

function Games ({onLikeGame, sortOption, genreFilter}) {
    const [games, setGames] = useState([]);
    const [likedIds, setLikedIds] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    const fetchGames = useCallback(async (reset = false) => {
        if(loading || (!hasMore && !reset)) return;
        setLoading(true);

        try {
            const response = await api.get('/games', {
                params: {
                    page: reset ? 1 : page,
                    ...(sortOption && {ordering: sortOption}),
                    ...(genreFilter && {genre: genreFilter}),
                },
            });

            const newGames = response.data.results;

            console.log(`Fetched page: ${reset ? 1 : page}, Total games: ${newGames.length}`);

            if (reset) {
                setGames(newGames);
                setPage(2);
                setHasMore(newGames.length > 0);
            } else {
                setGames((prev) => {
                    const combined = [...prev, ...newGames];
                    const unique = Array.from(new Map(combined.map(g => [g.id, g])).values());
                    return unique;
                });
                setPage((prev) => prev + 1);
                setHasMore(newGames.length > 0);
            }
        } catch (error) {
            console.error ('Error fetching games:', error);

        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, sortOption, genreFilter]);

    useEffect(() => {
        const container = scrollRef.current;
        if (container && typeof container.scrollTo === 'function') {
            container.scrollTo({left: 0, behavior: 'smooth'});
        }
        setPage(1);
        setHasMore(true);
        fetchGames(true);

        const email = localStorage.getItem('userEmail');
        if (email) {
            const stored = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
            setLikedIds(stored.map(game => game.id));
        }
    }, [sortOption, genreFilter]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const {scrollLeft, scrollWidth, clientWidth} = container;
            if (scrollLeft + clientWidth >= scrollWidth - 200 && !loading && hasMore) {
                fetchGames();
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [fetchGames, loading, hasMore]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let scrollAmount = 1.5;
        let intervalId;

        const startAutoScroll = () => {
            if (intervalId) clearInterval(intervalId);

            intervalId = setInterval(() => {
                if (
                    container.scrollLeft + container.clientWidth >= container.scrollWidth
                ) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += scrollAmount;
                }
            }, 16);
        };

        const stopAutoScroll = () => clearInterval(intervalId);

        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();

        return () => {
            clearInterval(intervalId);
            container.removeEventListener('mouseenter', stopAutoScroll);
            container.removeEventListener('mouseleave', startAutoScroll);
        }
    },[]);

    const handleLike = (game) => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        const stored = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
        if (stored.some((g) => g.id === game.id)) return;

        const updated = [...stored, game];
        localStorage.setItem(`wishlist_${email}`, JSON.stringify(updated));
        setLikedIds([...likedIds, game.id]);
        onLikeGame(game);
    }

    return (
        <>
        <h4 className='games-title'>Games</h4>
        <div className='game-container' ref={scrollRef}>
            {games.map(game => (
                <div className='gameCard' key={game.id}>
                    <img src={game.background_image} alt={game.name}/>
                    <h4 className='game-name'>{/^[\x00-\x7F\s\w\d.,!?'":;\-()]+$/.test(game.name) ? game.name : game.slug.replace(/-/g, ' ')}</h4>
                    <p><strong>Released: </strong>{game.released}</p>
                    <p><strong>Rating: </strong>{game.rating}</p>
                    <p><strong>Genres: </strong>{game.genres.join(', ')}</p>
                    <p><strong>Platforms: </strong>{game.platforms.join(', ')}</p>
                    <div className='wishlist-button-container'>
                        <button 
                            onClick={() => {handleLike(game)}}
                            className='wishlist-button'
                        >
                            {likedIds.includes(game.id) ? '💜' : '🤍'}
                        </button>
                    </div>
                </div>
            ))}
            {loading && <p>Loading more games...</p>}
        </div>
        </>
    )
}

export default Games;